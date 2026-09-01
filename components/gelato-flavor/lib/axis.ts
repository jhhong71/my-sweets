import type { Axis, Pole } from "../types";

/** 축 표시 순서 (동점 처리·화면 표시에 사용하는 고정 순서) */
export const AXIS_ORDER: Axis[] = ["richness", "energy", "style"];

/** 축 이름 */
export const AXIS_LABELS: Record<Axis, string> = {
  richness: "맛의 진하기",
  energy: "기분의 발랄함",
  style: "취향의 개성",
};

/** 축의 양 끝 이름 */
export const POLE_LABELS: Record<Axis, Record<Pole, string>> = {
  richness: { high: "진한맛형", low: "상큼형" },
  energy: { high: "발랄형", low: "차분형" },
  style: { high: "개성형", low: "클래식형" },
};

/** 결과 키를 만들 때 쓰는 한 글자 코드 */
export const POLE_CODES: Record<Axis, Record<Pole, string>> = {
  richness: { high: "r", low: "f" },
  energy: { high: "v", low: "m" },
  style: { high: "u", low: "c" },
};

export const AXIS_DESCRIPTIONS: Record<Axis, string> = {
  richness: "진하고 묵직한 맛에 끌리는지, 산뜻하고 가벼운 맛에 끌리는지",
  energy: "설레고 들뜬 기분을 더 많이 느끼는지, 잔잔하고 편안한 기분을 더 많이 느끼는지",
  style: "남들과 다른 개성 있는 선택을 즐기는지, 익숙하고 검증된 선택을 편안해하는지",
};
