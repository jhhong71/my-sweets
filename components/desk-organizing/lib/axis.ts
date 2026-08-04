import type { Axis, Pole } from "../types";

/** 축 표시 순서 (동점 처리·화면 표시에 사용하는 고정 순서) */
export const AXIS_ORDER: Axis[] = ["plan", "keep", "rhythm"];

/** 축 이름 */
export const AXIS_LABELS: Record<Axis, string> = {
  plan: "정리 방식",
  keep: "보관 성향",
  rhythm: "정리 리듬",
};

/** 축의 양 끝 이름 */
export const POLE_LABELS: Record<Axis, Record<Pole, string>> = {
  plan: { high: "계획적", low: "즉흥적" },
  keep: { high: "보관", low: "비움" },
  rhythm: { high: "틈틈이", low: "몰아서" },
};

/** 결과 키를 만들 때 쓰는 한 글자 코드 */
export const POLE_CODES: Record<Axis, Record<Pole, string>> = {
  plan: { high: "p", low: "f" },
  keep: { high: "k", low: "m" },
  rhythm: { high: "t", low: "b" },
};

export const AXIS_DESCRIPTIONS: Record<Axis, string> = {
  plan: "정리하기 전에 순서와 기준을 미리 정해두는 편인지, 손이 가는 대로 바로 시작하는 편인지",
  keep: "나중의 쓸모를 생각해 남겨두는 편인지, 지금 필요 없으면 바로 비우는 편인지",
  rhythm: "평소에 조금씩 정리해두는 편인지, 쌓아뒀다가 한 번에 몰아서 정리하는 편인지",
};
