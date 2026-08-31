import type { Axis, Pole } from "../types";

/** 축 표시 순서 (동점 처리·화면 표시에 사용하는 고정 순서) */
export const AXIS_ORDER: Axis[] = ["approach", "curiosity", "warmth"];

/** 축 이름 */
export const AXIS_LABELS: Record<Axis, string> = {
  approach: "접근 방식",
  curiosity: "질문 방식",
  warmth: "친밀감 형성 속도",
};

/** 축의 양 끝 이름 */
export const POLE_LABELS: Record<Axis, Record<Pole, string>> = {
  approach: { high: "적극 인사형", low: "지켜보기형" },
  curiosity: { high: "질문 탐색형", low: "자연 관찰형" },
  warmth: { high: "빠른 친밀형", low: "신중 예의형" },
};

/** 결과 키를 만들 때 쓰는 한 글자 코드 */
export const POLE_CODES: Record<Axis, Record<Pole, string>> = {
  approach: { high: "p", low: "w" },
  curiosity: { high: "q", low: "o" },
  warmth: { high: "f", low: "c" },
};

export const AXIS_DESCRIPTIONS: Record<Axis, string> = {
  approach: "새 동료에게 내가 먼저 다가가는지, 상대가 다가올 때까지 기다리는지",
  curiosity: "궁금한 점을 직접 물어보는지, 시간을 두고 자연스럽게 알아가는지",
  warmth: "금방 편하게 대하는지, 예의를 갖추며 천천히 거리를 좁히는지",
};
