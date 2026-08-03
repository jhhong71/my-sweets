"use client";

import { useEffect, useState } from "react";
import { onValue, ref, runTransaction } from "firebase/database";
import { ensureAnonymousAuth, getFirebaseDb } from "@/lib/firebase";

const PATH = "participants";
const SESSION_KEY_PREFIX = "participation_recorded_";

type CountsState = { available: boolean; counts: Record<string, number> };

/**
 * participants/ 전체를 실시간 구독하는 단 하나의 리스너.
 * 카드가 몇 개든 Firebase 조회는 이 리스너 하나로만 발생하고,
 * 모든 훅은 아래 캐시를 구독해 값을 나눠 받는다.
 */
let cache: CountsState = { available: false, counts: {} };
const listeners = new Set<() => void>();
let subscribed = false;

function notify() {
  for (const l of listeners) l();
}

function ensureSubscription() {
  if (subscribed) return;
  const db = getFirebaseDb();
  if (!db) return; // Firebase 미설정 -> available:false 유지, 숫자는 계속 숨김
  subscribed = true;

  onValue(
    ref(db, PATH),
    (snapshot) => {
      const val = (snapshot.val() as Record<string, number> | null) ?? {};
      cache = { available: true, counts: val };
      notify();
    },
    () => {
      cache = { available: false, counts: {} };
      notify();
    },
  );
}

function useCountsCache(): CountsState {
  const [state, setState] = useState(cache);

  useEffect(() => {
    ensureSubscription();
    const onChange = () => setState(cache);
    listeners.add(onChange);
    onChange(); // 구독 시점에 이미 도착해 있던 값 반영
    return () => {
      listeners.delete(onChange);
    };
  }, []);

  return state;
}

/**
 * 실제 집계된 참여수를 반환한다.
 * 아직 로딩 중이거나 집계가 없으면 null — 호출부는 숫자를 감춰야 한다.
 */
export function useParticipantCount(id: string): number | null {
  const { available, counts } = useCountsCache();
  return available && typeof counts[id] === "number" ? counts[id] : null;
}

/** 전체 테스트 참여수 합계. 집계가 없으면 null(호출부는 대체 문구를 보여준다). */
export function useTotalParticipants(): number | null {
  const { available, counts } = useCountsCache();
  if (!available) return null;
  const values = Object.values(counts);
  return values.length > 0 ? values.reduce((a, b) => a + b, 0) : null;
}

/**
 * 참여 1회를 기록한다. 익명 인증 후 runTransaction으로 안전하게 +1 한다
 * (동시 접속 시에도 read-modify-write 경쟁 없이 정확히 1씩 증가).
 *
 * 같은 브라우저 세션에서는 sessionStorage로 중복 집계를 막는다.
 * 실패 시에는 sessionStorage에 완료 표시를 남기지 않아 다음 시도에서 재시도된다.
 */
export async function recordParticipation(id: string): Promise<void> {
  const sessionKey = SESSION_KEY_PREFIX + id;
  try {
    if (sessionStorage.getItem(sessionKey)) return;
  } catch {
    // sessionStorage를 못 쓰는 환경(프라이빗 모드 등)이면 중복 방지 없이 계속 진행
  }

  const db = getFirebaseDb();
  if (!db) return; // Firebase 미설정 -> 집계 없이 조용히 종료(테스트 진행에는 무관)

  try {
    const authed = await ensureAnonymousAuth();
    if (!authed) return; // 인증 실패 시 기록하지 않음. 세션 플래그도 남기지 않아 재시도 가능.

    const result = await runTransaction(ref(db, `${PATH}/${id}`), (current: number | null) => {
      return (typeof current === "number" ? current : 0) + 1;
    });

    if (result.committed) {
      try {
        sessionStorage.setItem(sessionKey, "1");
      } catch {
        // 기록 성공은 했으니 무시해도 된다 — 최악의 경우 같은 세션에서 한 번 더 카운트될 뿐.
      }
    }
  } catch {
    // 네트워크 오류 등 — 테스트 진행에는 영향 없이 조용히 무시. 세션 플래그 남기지 않음(재시도 가능).
  }
}
