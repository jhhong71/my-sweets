import type { Axis, Pole } from "../types";

/** 축 표시 순서 (동점 처리·화면 표시에 사용하는 고정 순서) */
export const AXIS_ORDER: Axis[] = ["energy", "stay", "depth"];

/** 축 이름 */
export const AXIS_LABELS: Record<Axis, string> = {
  energy: "사교 에너지",
  stay: "자리 지속력",
  depth: "대화 온도",
};

/** 축의 양 끝 이름 */
export const POLE_LABELS: Record<Axis, Record<Pole, string>> = {
  energy: { high: "리액터", low: "관찰자" },
  stay: { high: "완주", low: "조기 이탈" },
  depth: { high: "진심", low: "스몰토크" },
};

/** 결과 키를 만들 때 쓰는 한 글자 코드 */
export const POLE_CODES: Record<Axis, Record<Pole, string>> = {
  energy: { high: "r", low: "o" },
  stay: { high: "m", low: "e" },
  depth: { high: "d", low: "l" },
};

export const AXIS_DESCRIPTIONS: Record<Axis, string> = {
  energy: "대화를 적극적으로 이끄는 편인지, 조용히 지켜보다 참여하는 편인지",
  stay: "끝까지 자리를 지키는 편인지, 적당히 즐기고 먼저 자리를 뜨는 편인지",
  depth: "진솔하고 깊은 대화를 선호하는지, 가볍고 유쾌한 잡담을 선호하는지",
};
