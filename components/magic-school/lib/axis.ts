import type { Axis, Pole } from "../types";

/** 축 표시 순서 (동점 처리·화면 표시에 사용하는 고정 순서) */
export const AXIS_ORDER: Axis[] = ["courage", "heart", "stage"];

/** 축 이름 */
export const AXIS_LABELS: Record<Axis, string> = {
  courage: "행동 방식",
  heart: "마음 vs 원칙",
  stage: "무리 속 위치",
};

/** 축의 양 끝 이름 */
export const POLE_LABELS: Record<Axis, Record<Pole, string>> = {
  courage: { high: "저돌적 행동파", low: "신중한 관찰형" },
  heart: { high: "마음 우선형", low: "원칙 우선형" },
  stage: { high: "이끄는 리더형", low: "소신 개인형" },
};

/** 결과 키를 만들 때 쓰는 한 글자 코드 */
export const POLE_CODES: Record<Axis, Record<Pole, string>> = {
  courage: { high: "b", low: "c" },
  heart: { high: "h", low: "m" },
  stage: { high: "l", low: "s" },
};

export const AXIS_DESCRIPTIONS: Record<Axis, string> = {
  courage: "새로운 상황 앞에서 곧장 부딪히는지, 충분히 살피고 움직이는지",
  heart: "결정할 때 마음이 가는 쪽을 따르는지, 원칙과 근거를 따르는지",
  stage: "무리 안에서 앞장서서 이끄는지, 내 속도로 조용히 움직이는지",
};
