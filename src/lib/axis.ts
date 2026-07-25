import type { Axis } from "../types";

/** 축 표시 순서 (동점 처리·화면 표시에 사용하는 고정 순서) */
export const AXIS_ORDER: Axis[] = ["rich", "playful", "warm"];

export const AXIS_LABELS: Record<Axis, string> = {
  rich: "진함",
  playful: "발랄함",
  warm: "다정함",
};

export const AXIS_DESCRIPTIONS: Record<Axis, string> = {
  rich: "좋아하는 게 확실하고 하나에 깊이 몰입하는 성향",
  playful: "새로운 걸 즉흥적으로 시도하고 분위기를 띄우는 성향",
  warm: "상대 마음을 먼저 살피고 관계를 챙기는 성향",
};
