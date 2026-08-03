"use client";

import { useEffect, useState } from "react";

type CountsResponse = {
  available: boolean;
  counts: Record<string, number>;
};

/** 카드가 여러 개여도 네트워크 요청은 한 번만 나가도록 모듈 레벨에서 공유한다. */
let pending: Promise<CountsResponse> | null = null;

function loadCounts(): Promise<CountsResponse> {
  pending ??= fetch("/api/participants")
    .then((r) => (r.ok ? r.json() : { available: false, counts: {} }))
    .catch(() => ({ available: false, counts: {} }));
  return pending;
}

/**
 * 실제 집계된 참여수를 반환한다.
 * 아직 로딩 중이거나 집계가 없으면 null — 호출부는 숫자를 감춰야 한다.
 * (집계 전에 임의의 숫자를 보여주지 않는 것이 이 훅의 계약이다.)
 */
export function useParticipantCount(id: string): number | null {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let alive = true;
    loadCounts().then(({ available, counts }) => {
      if (alive && available && typeof counts[id] === "number") setCount(counts[id]);
    });
    return () => {
      alive = false;
    };
  }, [id]);

  return count;
}

/** 전체 테스트 참여수 합계. 집계가 없으면 null. */
export function useTotalParticipants(): number | null {
  const [total, setTotal] = useState<number | null>(null);

  useEffect(() => {
    let alive = true;
    loadCounts().then(({ available, counts }) => {
      if (!alive || !available) return;
      const values = Object.values(counts);
      if (values.length > 0) setTotal(values.reduce((a, b) => a + b, 0));
    });
    return () => {
      alive = false;
    };
  }, []);

  return total;
}

/**
 * 참여 1회를 기록한다. 같은 세션에서 중복 집계되지 않게 한 번만 보낸다.
 * 집계 실패는 조용히 무시한다 — 테스트 진행이 카운터에 의존하면 안 되기 때문.
 */
export function recordParticipation(id: string): void {
  const key = `participated:${id}`;
  try {
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");
  } catch {
    // 프라이빗 모드 등으로 sessionStorage를 못 쓰면 중복 방지 없이 진행
  }
  void fetch("/api/participants", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ id }),
  }).catch(() => {});
}
