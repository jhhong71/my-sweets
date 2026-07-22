import type { Axis } from "../types";

/** 축 표시 순서 (동점 처리·화면 표시에 사용하는 고정 순서) */
export const AXIS_ORDER: Axis[] = ["rich", "playful", "warm"];

export const AXIS_LABELS: Record<Axis, string> = {
  rich: "진함",
  playful: "발랄함",
  warm: "다정함",
};

export const AXIS_DESCRIPTIONS: Record<Axis, string> = {
  rich: "진하고 강렬한 맛·취향에 끌리는 정도",
  playful: "톡톡 튀고 활발한 재미를 즐기는 정도",
  warm: "부드럽고 포근하게 곁을 챙기는 정도",
};
