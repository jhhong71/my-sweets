import type { Axis, Pole } from "../types";

/** 축 표시 순서 (동점 처리·화면 표시에 사용하는 고정 순서) */
export const AXIS_ORDER: Axis[] = ["decide", "company", "use"];

/** 축 이름 */
export const AXIS_LABELS: Record<Axis, string> = {
  decide: "결정 방식",
  company: "동행 방식",
  use: "시간 활용",
};

/** 축의 양 끝 이름 */
export const POLE_LABELS: Record<Axis, Record<Pole, string>> = {
  decide: { high: "계획형", low: "즉흥형" },
  company: { high: "동행형", low: "단독형" },
  use: { high: "재충전형", low: "활용형" },
};

/** 결과 키를 만들 때 쓰는 한 글자 코드 */
export const POLE_CODES: Record<Axis, Record<Pole, string>> = {
  decide: { high: "p", low: "s" },
  company: { high: "w", low: "a" },
  use: { high: "r", low: "u" },
};

export const AXIS_DESCRIPTIONS: Record<Axis, string> = {
  decide: "점심 메뉴와 장소를 미리 정해두는지, 그 자리에서 즉흥적으로 정하는지",
  company: "점심시간을 동료와 함께 보내는지, 혼자 보내는지",
  use: "점심시간을 쉬는 데 쓰는지, 개인 용무나 자기계발에 쓰는지",
};
