"use client";

import { useEffect, useState } from "react";
import { onValue, ref, runTransaction } from "firebase/database";
import { ensureAnonymousAuth, getFirebaseDb } from "@/lib/firebase";

const PATH = "visits";
const STORAGE_KEY_PREFIX = "daily_visit_recorded_";

/**
 * 한국 기준(KST) 오늘 날짜 키(YYYY-MM-DD). UTC 자정이 아니라 한국 자정에
 * 날짜가 바뀌어야 "오늘"이 사용자가 체감하는 하루와 맞는다.
 */
function todayKey(): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return `${get("year")}-${get("month")}-${get("day")}`;
}

type CountState = { available: boolean; count: number | null };

/**
 * visits/{오늘 날짜} 하나만 구독하는 캐시. participants.ts의 단일 리스너
 * 패턴과 동일하되, 날짜가 바뀌면(자정을 넘겨 페이지를 계속 보고 있는 드문
 * 경우) 구독 경로를 새 날짜로 다시 건다.
 */
let cache: CountState = { available: false, count: null };
let cachedKey: string | null = null;
const listeners = new Set<() => void>();

function notify() {
  for (const l of listeners) l();
}

function ensureSubscription(key: string) {
  if (cachedKey === key) return;
  cachedKey = key;
  cache = { available: false, count: null };

  const db = getFirebaseDb();
  if (!db) return; // Firebase 미설정 -> available:false 유지, 숫자는 계속 숨김

  onValue(
    ref(db, `${PATH}/${key}`),
    (snapshot) => {
      const val = snapshot.val();
      cache = { available: true, count: typeof val === "number" ? val : 0 };
      notify();
    },
    () => {
      cache = { available: false, count: null };
      notify();
    },
  );
}

/** 오늘(한국 기준) 실제 집계된 방문자 수. 로딩 중이거나 미설정이면 null. */
export function useTodayVisitCount(): number | null {
  const key = todayKey();
  const [state, setState] = useState(cache);

  useEffect(() => {
    ensureSubscription(key);
    const onChange = () => setState(cache);
    listeners.add(onChange);
    onChange(); // 구독 시점에 이미 도착해 있던 값 반영
    return () => {
      listeners.delete(onChange);
    };
  }, [key]);

  return state.available ? state.count : null;
}

/**
 * 오늘 방문 1회를 기록한다. sessionStorage가 아니라 localStorage로 하루
 * 단위 중복을 막는다 — 같은 날 여러 페이지·여러 방문(새 탭 포함)에도 한 번만
 * 집계되고, 날짜가 바뀌면(키가 달라지므로) 자연히 다시 집계된다.
 *
 * 참여수 집계(participants.ts)와 동일하게 익명 인증 후 runTransaction으로
 * 안전하게 +1 하며, Firebase 미설정이거나 실패해도 조용히 무시한다.
 */
export async function recordDailyVisit(): Promise<void> {
  const key = todayKey();
  const storageKey = STORAGE_KEY_PREFIX + key;
  try {
    if (localStorage.getItem(storageKey)) return;
  } catch {
    // localStorage를 못 쓰는 환경(프라이빗 모드 등)이면 중복 방지 없이 계속 진행
  }

  const db = getFirebaseDb();
  if (!db) return; // Firebase 미설정 -> 집계 없이 조용히 종료

  try {
    const authed = await ensureAnonymousAuth();
    if (!authed) return; // 인증 실패 시 기록하지 않음. 플래그도 남기지 않아 다음 방문에서 재시도.

    const result = await runTransaction(ref(db, `${PATH}/${key}`), (current: number | null) => {
      return (typeof current === "number" ? current : 0) + 1;
    });

    if (result.committed) {
      try {
        localStorage.setItem(storageKey, "1");
      } catch {
        // 기록 성공은 했으니 무시해도 된다 — 최악의 경우 같은 브라우저에서 한 번 더 집계될 뿐.
      }
    }
  } catch {
    // 네트워크 오류 등 — 조용히 무시, 다음 방문에서 재시도.
  }
}
