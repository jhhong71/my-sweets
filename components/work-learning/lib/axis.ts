import type { Axis, IconKey } from "../types";

export const AXIS_ORDER: Axis[] = ["concept", "action"];

export const AXIS_LABELS: Record<Axis, string> = {
  concept: "개념형 ↔ 경험형",
  action: "실행형 ↔ 관찰형",
};

/** 축 점수가 높을 때(5에 가까울 때)를 가리키는 쪽 이름. */
export const AXIS_HIGH_LABEL: Record<Axis, string> = {
  concept: "개념형",
  action: "실행형",
};

/** 축 점수가 낮을 때(1에 가까울 때)를 가리키는 쪽 이름. */
export const AXIS_LOW_LABEL: Record<Axis, string> = {
  concept: "경험형",
  action: "관찰형",
};

/** 결과 화면 축 점수 행에 쓰는 축별 아이콘(결과 유형 아이콘과는 별개로, 축 자체를 상징). */
export const AXIS_ICON: Record<Axis, IconKey> = {
  concept: "book",
  action: "bolt",
};
