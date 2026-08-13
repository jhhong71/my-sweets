import type { Axis, Pole } from "../types";

/** 축 표시 순서 (동점 처리·화면 표시에 사용하는 고정 순서) */
export const AXIS_ORDER: Axis[] = ["approach", "research", "collab"];

/** 축 이름 */
export const AXIS_LABELS: Record<Axis, string> = {
  approach: "착수 방식",
  research: "정보 활용",
  collab: "협업 방식",
};

/** 축의 양 끝 이름 */
export const POLE_LABELS: Record<Axis, Record<Pole, string>> = {
  approach: { high: "계획형", low: "실행형" },
  research: { high: "자료형", low: "직관형" },
  collab: { high: "협업형", low: "독립형" },
};

/** 결과 키를 만들 때 쓰는 한 글자 코드 */
export const POLE_CODES: Record<Axis, Record<Pole, string>> = {
  approach: { high: "p", low: "a" },
  research: { high: "r", low: "i" },
  collab: { high: "t", low: "s" },
};

export const AXIS_DESCRIPTIONS: Record<Axis, string> = {
  approach: "새 업무를 맡으면 전체 계획부터 세우는 편인지, 일단 부딪히며 시작하는 편인지",
  research: "결정할 때 자료와 사례를 먼저 찾아보는 편인지, 경험과 감각에 의존하는 편인지",
  collab: "동료와 상의하며 진행하는 편인지, 혼자 먼저 진행해보는 편인지",
};
