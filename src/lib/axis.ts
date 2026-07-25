import type { Axis } from "../types";

/** 축 표시 순서 (동점 처리·화면 표시에 사용하는 고정 순서) */
export const AXIS_ORDER: Axis[] = [
  "open",
  "conscientious",
  "extravert",
  "agreeable",
  "stable",
];

export const AXIS_LABELS: Record<Axis, string> = {
  open: "개방성",
  conscientious: "성실성",
  extravert: "외향성",
  agreeable: "우호성",
  stable: "정서안정",
};

export const AXIS_DESCRIPTIONS: Record<Axis, string> = {
  open: "새로운 경험과 아이디어를 받아들이는 방식",
  conscientious: "계획, 책임, 정리, 꾸준함을 다루는 방식",
  extravert: "생각과 에너지를 외부로 표현하는 방식",
  agreeable: "배려, 협력, 관계를 고려하는 방식",
  stable: "예상하지 못한 상황에서 침착함을 회복하는 방식",
};
