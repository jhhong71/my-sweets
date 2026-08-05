import type { Axis, Pole } from "../types";

/** 축 표시 순서 (동점 처리·화면 표시에 사용하는 고정 순서) */
export const AXIS_ORDER: Axis[] = ["speed", "express", "initiative"];

/** 축 이름 */
export const AXIS_LABELS: Record<Axis, string> = {
  speed: "응답 속도",
  express: "표현 밀도",
  initiative: "대화 주도성",
};

/** 축의 양 끝 이름 */
export const POLE_LABELS: Record<Axis, Record<Pole, string>> = {
  speed: { high: "즉답형", low: "여유형" },
  express: { high: "풍성형", low: "간결형" },
  initiative: { high: "주도형", low: "반응형" },
};

/** 결과 키를 만들 때 쓰는 한 글자 코드 */
export const POLE_CODES: Record<Axis, Record<Pole, string>> = {
  speed: { high: "q", low: "w" },
  express: { high: "v", low: "c" },
  initiative: { high: "l", low: "r" },
};

export const AXIS_DESCRIPTIONS: Record<Axis, string> = {
  speed: "메시지를 받으면 바로 답장하는 편인지, 여유를 두고 답장하는 편인지",
  express: "답장에 이모티콘과 말을 풍성하게 담는 편인지, 짧고 간결하게 답하는 편인지",
  initiative: "먼저 연락해 대화를 이끄는 편인지, 오는 연락에 반응하는 편인지",
};
