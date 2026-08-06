import type { Theme, ThemeId } from "../types";

/** 목표 분야. 예시 채우기와 완성 화면의 제휴 상품군 연결에 쓰인다. */
export const THEMES: Theme[] = [
  { id: "health", label: "건강·체력", emoji: "🍓", hint: "잘 자고 잘 먹고 잘 움직이기" },
  { id: "study", label: "공부·성장", emoji: "📖", hint: "배우고 싶은 걸 끝까지 해내기" },
  { id: "work", label: "일·커리어", emoji: "🎀", hint: "하고 싶은 일에 가까워지기" },
  { id: "mind", label: "마음·일상", emoji: "☕", hint: "나를 다정하게 돌보는 하루" },
];

export const THEME_BY_ID: Record<ThemeId, Theme> = Object.fromEntries(
  THEMES.map((t) => [t.id, t]),
) as Record<ThemeId, Theme>;
