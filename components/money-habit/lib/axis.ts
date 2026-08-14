import type { Axis, ResultId } from "../types";

export const AXIS_ORDER: Axis[] = ["plan", "save", "credit"];

export const AXIS_LABELS: Record<Axis, string> = {
  plan: "계획적 현금흐름 관리 ↔ 흐름에 맡김",
  save: "저축 우선 ↔ 현재 소비 우선",
  credit: "신중한 카드 사용 ↔ 편한 카드 사용",
};

/** 축 점수가 높을 때(5에 가까울 때)를 가리키는 쪽 이름. */
export const AXIS_HIGH_LABEL: Record<Axis, string> = {
  plan: "계획적 관리형",
  save: "저축 우선형",
  credit: "신중한 카드 사용형",
};

/** 축 점수가 낮을 때(1에 가까울 때)를 가리키는 쪽 이름. */
export const AXIS_LOW_LABEL: Record<Axis, string> = {
  plan: "흐름에 맡기는형",
  save: "현재 소비 우선형",
  credit: "편한 카드 사용형",
};

/** 결과 화면 축 점수 행에 쓰는 축별 캐릭터(결과 유형 캐릭터와는 별개의 고정 값). */
export const AXIS_ICON: Record<Axis, ResultId> = {
  plan: "steady-planner",
  save: "quiet-saver",
  credit: "careful-improviser",
};
