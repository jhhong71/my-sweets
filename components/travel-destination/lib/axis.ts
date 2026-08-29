import type { Axis, Pole } from "../types";

/** 축 표시 순서 (동점 처리·화면 표시에 사용하는 고정 순서) */
export const AXIS_ORDER: Axis[] = ["pace", "scene", "plan"];

/** 축 이름 */
export const AXIS_LABELS: Record<Axis, string> = {
  pace: "동선 강도",
  scene: "선호 풍경",
  plan: "여행 방식",
};

/** 축의 양 끝 이름 */
export const POLE_LABELS: Record<Axis, Record<Pole, string>> = {
  pace: { high: "활동형", low: "여유형" },
  scene: { high: "도시형", low: "자연형" },
  plan: { high: "계획형", low: "즉흥형" },
};

/** 결과 키를 만들 때 쓰는 한 글자 코드 */
export const POLE_CODES: Record<Axis, Record<Pole, string>> = {
  pace: { high: "a", low: "r" },
  scene: { high: "c", low: "n" },
  plan: { high: "p", low: "f" },
};

export const AXIS_DESCRIPTIONS: Record<Axis, string> = {
  pace: "여행 중 얼마나 부지런히 움직이며 일정을 채우는지, 얼마나 여유 있게 쉬어가는지",
  scene: "활기찬 도심을 더 좋아하는지, 탁 트인 자연을 더 좋아하는지",
  plan: "일정을 미리 촘촘히 짜두는지, 그때그때 즉흥적으로 정하는지",
};
