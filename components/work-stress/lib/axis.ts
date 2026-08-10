import type { Axis, ResultId } from "../types";

export const AXIS_ORDER: Axis[] = ["focus", "engage"];

export const AXIS_LABELS: Record<Axis, string> = {
  focus: "문제중심형 ↔ 감정중심형",
  engage: "접근형 ↔ 거리두기형",
};

/** 축 점수가 높을 때(5에 가까울 때)를 가리키는 쪽 이름. */
export const AXIS_HIGH_LABEL: Record<Axis, string> = {
  focus: "문제중심형",
  engage: "접근형",
};

/** 축 점수가 낮을 때(1에 가까울 때)를 가리키는 쪽 이름. */
export const AXIS_LOW_LABEL: Record<Axis, string> = {
  focus: "감정중심형",
  engage: "거리두기형",
};

/** 결과 화면 축 점수 행에 쓰는 축별 캐릭터(결과 유형 캐릭터와는 별개의 고정 값). */
export const AXIS_ICON: Record<Axis, ResultId> = {
  focus: "solver",
  engage: "distancer",
};
