import type { Axis, Pole } from "../types";

/** 축 표시 순서 (동점 처리·화면 표시에 사용하는 고정 순서) */
export const AXIS_ORDER: Axis[] = ["intensity", "sweetness", "tempo"];

/** 축 이름 */
export const AXIS_LABELS: Record<Axis, string> = {
  intensity: "커피의 진하기",
  sweetness: "단맛 취향",
  tempo: "움직이는 템포",
};

/** 축의 양 끝 이름 */
export const POLE_LABELS: Record<Axis, Record<Pole, string>> = {
  intensity: { high: "진한형", low: "부드러운형" },
  sweetness: { high: "달콤형", low: "담백형" },
  tempo: { high: "빠른형", low: "여유형" },
};

/** 결과 키를 만들 때 쓰는 한 글자 코드 */
export const POLE_CODES: Record<Axis, Record<Pole, string>> = {
  intensity: { high: "r", low: "l" },
  sweetness: { high: "w", low: "p" },
  tempo: { high: "q", low: "s" },
};

export const AXIS_DESCRIPTIONS: Record<Axis, string> = {
  intensity: "진하고 확실한 자극에 끌리는지, 부드럽고 순한 자극이 편안한지",
  sweetness: "달콤한 것으로 기분을 채우는 편인지, 담백하고 꾸밈없는 것이 편안한지",
  tempo: "빠르고 신속하게 움직이는 편인지, 여유를 갖고 천천히 움직이는 편인지",
};
