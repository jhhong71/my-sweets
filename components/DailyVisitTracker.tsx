"use client";

import { useEffect } from "react";
import { recordDailyVisit } from "@/lib/visits";

/**
 * 페이지 최초 진입 시 오늘 방문 1회를 기록한다. 화면에는 아무것도 그리지
 * 않으며, 루트 레이아웃에 한 번만 두면 어떤 페이지로 들어와도 동작한다.
 */
export function DailyVisitTracker() {
  useEffect(() => {
    void recordDailyVisit();
  }, []);

  return null;
}
