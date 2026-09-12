import type { Axis, Pole } from "../types";

/** 축 표시 순서 (동점 처리·화면 표시에 사용하는 고정 순서) */
export const AXIS_ORDER: Axis[] = ["routine", "care", "explore"];

/** 축 이름 */
export const AXIS_LABELS: Record<Axis, string> = {
  routine: "관리 루틴",
  care: "관찰 밀도",
  explore: "새로움 추구",
};

/** 축의 양 끝 이름 */
export const POLE_LABELS: Record<Axis, Record<Pole, string>> = {
  routine: { high: "루틴형", low: "즉흥형" },
  care: { high: "밀착형", low: "여유형" },
  explore: { high: "탐험형", low: "안정형" },
};

/** 결과 키를 만들 때 쓰는 한 글자 코드 */
export const POLE_CODES: Record<Axis, Record<Pole, string>> = {
  routine: { high: "r", low: "i" },
  care: { high: "c", low: "e" },
  explore: { high: "x", low: "s" },
};

export const AXIS_DESCRIPTIONS: Record<Axis, string> = {
  routine: "물 주기나 영양제 챙기기를 정해진 주기와 계획대로 관리하는지, 그때그때 상황에 맞춰 즉흥적으로 챙기는지",
  care: "잎 색이나 흙 상태 같은 작은 변화를 얼마나 자주, 세심하게 살피는지",
  explore: "새로운 식물이나 관리 방법을 계속 시도하는지, 익숙한 식물과 방식을 오래 유지하는지",
};
