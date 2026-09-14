import type { Axis, Pole } from "../types";

/** 축 표시 순서 (동점 처리·화면 표시에 사용하는 고정 순서) */
export const AXIS_ORDER: Axis[] = ["pace", "judge", "express"];

/** 축 이름 */
export const AXIS_LABELS: Record<Axis, string> = {
  pace: "행동 속도",
  judge: "판단 기준",
  express: "감정 표현",
};

/** 축의 양 끝 이름 */
export const POLE_LABELS: Record<Axis, Record<Pole, string>> = {
  pace: { high: "돌진형", low: "신중형" },
  judge: { high: "마음형", low: "원칙형" },
  express: { high: "표현형", low: "담담형" },
};

/** 결과 키를 만들 때 쓰는 한 글자 코드 */
export const POLE_CODES: Record<Axis, Record<Pole, string>> = {
  pace: { high: "b", low: "c" },
  judge: { high: "h", low: "m" },
  express: { high: "o", low: "i" },
};

/** 결과 화면에서 "이 캐릭터가 나온 이유" 문장에 쓰는 표현 */
export const POLE_PHRASES: Record<Axis, Record<Pole, string>> = {
  pace: { high: "생각보다 몸이 먼저 움직이는 편", low: "움직이기 전에 상황을 충분히 살피는 편" },
  judge: { high: "사람의 마음을 기준으로 판단하는 편", low: "지켜야 할 원칙을 기준으로 판단하는 편" },
  express: { high: "느낀 감정을 그대로 드러내는 편", low: "감정을 속으로 정리하고 담담하게 보이는 편" },
};
