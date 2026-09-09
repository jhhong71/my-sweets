import type { Axis, Pole } from "../types";

/** 축 표시 순서 (거리 계산·화면 표시에 사용하는 고정 순서) */
export const AXIS_ORDER: Axis[] = ["pace", "spotlight", "basis"];

/** 축 이름 */
export const AXIS_LABELS: Record<Axis, string> = {
  pace: "감정 속도",
  spotlight: "표현 방식",
  basis: "선택 기준",
};

/** 축의 양 끝 이름 */
export const POLE_LABELS: Record<Axis, Record<Pole, string>> = {
  pace: { high: "직진형", low: "신중형" },
  spotlight: { high: "주목형", low: "은은형" },
  basis: { high: "현실형", low: "감정형" },
};

export const AXIS_DESCRIPTIONS: Record<Axis, string> = {
  pace: "호감이 생겼을 때 바로 표현하고 다가가는 편인지, 확신이 설 때까지 천천히 지켜보는 편인지",
  spotlight: "여러 사람 속에서 먼저 나서고 크게 표현하는 편인지, 조용히 스며들며 필요한 말만 하는 편인지",
  basis: "가치관·생활 조건이 맞는지를 먼저 따지는 편인지, 함께 있을 때의 느낌과 직감을 먼저 믿는 편인지",
};
