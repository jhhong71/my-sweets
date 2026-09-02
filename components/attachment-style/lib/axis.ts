import type { Axis, Pole } from "../types";

/** 축 표시 순서 (동점 처리·화면 표시에 사용하는 고정 순서) */
export const AXIS_ORDER: Axis[] = ["closeness", "openness", "steadiness"];

/** 축 이름 */
export const AXIS_LABELS: Record<Axis, string> = {
  closeness: "밀착도",
  openness: "표현도",
  steadiness: "안정도",
};

/** 축의 양 끝 이름 */
export const POLE_LABELS: Record<Axis, Record<Pole, string>> = {
  closeness: { high: "밀착형", low: "독립형" },
  openness: { high: "표현형", low: "절제형" },
  steadiness: { high: "안정형", low: "예민형" },
};

/** 결과 키를 만들 때 쓰는 한 글자 코드 */
export const POLE_CODES: Record<Axis, Record<Pole, string>> = {
  closeness: { high: "c", low: "d" },
  openness: { high: "o", low: "r" },
  steadiness: { high: "s", low: "f" },
};

export const AXIS_DESCRIPTIONS: Record<Axis, string> = {
  closeness: "연인과 얼마나 자주, 가까이 붙어 있고 싶어 하는지, 아니면 각자의 시간을 더 중요하게 여기는지",
  openness: "서운함이나 애정을 얼마나 적극적으로 표현하는지, 아니면 마음속에 담아두는 편인지",
  steadiness: "관계의 작은 변화에도 마음이 얼마나 담담한지, 아니면 쉽게 흔들리는지",
};
