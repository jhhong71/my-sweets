import type { Axis } from "../types";

/** 축 표시 순서 (동점 처리·화면 표시에 사용하는 고정 순서) */
export const AXIS_ORDER: Axis[] = ["wisdom", "passion", "bond", "order"];

/** 축 이름 */
export const AXIS_LABELS: Record<Axis, string> = {
  wisdom: "지혜",
  passion: "열정",
  bond: "유대",
  order: "질서",
};

export const AXIS_DESCRIPTIONS: Record<Axis, string> = {
  wisdom: "감정보다 이성적 분석과 전략을 앞세우는 정도",
  passion: "망설임 없이 감정과 충동을 행동으로 옮기는 정도",
  bond: "관계와 사람들의 마음을 먼저 챙기는 정도",
  order: "규칙·역할·계획을 중시하는 정도",
};

/** 문항당 배점, 축당 문항 수. 정규화·설계 문서와 항상 일치해야 한다. */
export const POINTS_PER_QUESTION = 3;
export const QUESTIONS_PER_AXIS = 6;
export const AXIS_RAW_MAX = POINTS_PER_QUESTION * QUESTIONS_PER_AXIS; // 18
