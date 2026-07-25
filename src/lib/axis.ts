import type { Axis } from "../types";

/** 축 표시 순서 (동점 처리·화면 표시에 사용하는 고정 순서) */
export const AXIS_ORDER: Axis[] = [
  "open",
  "conscientious",
  "extravert",
  "agreeable",
  "stable",
];

export const AXIS_LABELS: Record<Axis, string> = {
  open: "개방성",
  conscientious: "성실성",
  extravert: "외향성",
  agreeable: "우호성",
  stable: "정서안정",
};

export const AXIS_DESCRIPTIONS: Record<Axis, string> = {
  open: "새로운 걸 즉흥적으로 시도하고 호기심을 즐기는 성향",
  conscientious: "좋아하는 게 확실하고 하나에 깊이 몰입하는 성향",
  extravert: "사람들과 어울리며 활력을 얻는 성향",
  agreeable: "상대 마음을 먼저 살피고 관계를 챙기는 성향",
  stable: "웬만한 일엔 흔들리지 않고 차분함을 지키는 성향",
};
