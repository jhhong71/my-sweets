/** 목표 분야. 프리셋 추천과 제휴 상품군 연결의 기준이 된다. */
export type ThemeId = "health" | "study" | "work" | "mind";

export type Theme = {
  id: ThemeId;
  label: string;
  emoji: string;
  hint: string;
};

/**
 * 만다라트 한 장의 내용.
 * - core: 한가운데 핵심 목표 1개
 * - subGoals: 핵심 목표를 둘러싼 세부 목표 8개 (바깥 블록의 가운데 칸으로 그대로 비친다)
 * - actions: 세부 목표별 실천 과제 8개 × 8세트 = 64개
 */
export type MandalartData = {
  owner: string;
  core: string;
  subGoals: string[];
  actions: string[][];
};

export type MandalartPreset = {
  id: string;
  themeId: ThemeId;
  title: string;
  data: Omit<MandalartData, "owner">;
};

/** 결과(완성) 화면에서 보여줄 제휴 상품군 */
export type AffiliateCategory = {
  label: string;
  keyword: string;
};
