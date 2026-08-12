import type { Axis, ResultId } from "../types";

export const AXIS_ORDER: Axis[] = ["qual", "trend", "impulse"];

export const AXIS_LABELS: Record<Axis, string> = {
  qual: "품질 추구 ↔ 가성비 추구",
  trend: "브랜드·유행 민감도",
  impulse: "충동 구매 ↔ 계획 구매",
};

/** 축 점수가 높을 때(5에 가까울 때)를 가리키는 쪽 이름. */
export const AXIS_HIGH_LABEL: Record<Axis, string> = {
  qual: "품질 추구형",
  trend: "브랜드·유행 민감형",
  impulse: "즉흥 구매형",
};

/** 축 점수가 낮을 때(1에 가까울 때)를 가리키는 쪽 이름. */
export const AXIS_LOW_LABEL: Record<Axis, string> = {
  qual: "가성비 추구형",
  trend: "실용·안정 선호형",
  impulse: "계획 구매형",
};

/** 결과 화면 축 점수 행에 쓰는 축별 캐릭터(결과 유형 캐릭터와는 별개의 고정 값). */
export const AXIS_ICON: Record<Axis, ResultId> = {
  qual: "precision-analyst",
  trend: "perfect-hunter",
  impulse: "mood-splurger",
};
