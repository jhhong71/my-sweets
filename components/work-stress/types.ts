export type Axis = "focus" | "engage";

export type Question = {
  /** 문항 고유 ID (q01~q16). */
  id: string;
  text: string;
  axis: Axis;
  /** true면 역방향 문항 — 채점 시 6 - 응답값으로 반전한다. */
  reverse: boolean;
};

export type AxisScores = Record<Axis, number>;

/** 결과 유형 ID. 유형별 캐릭터 이미지도 이 값으로 직접 키를 맞춘다. */
export type ResultId = "solver" | "expresser" | "strategist" | "distancer" | "balanced";

export type ResultProfile = {
  id: ResultId;
  title: string;
  subtitle: string;
  summary: string;
  strengths: string[];
  cautions: string[];
  tip: string;
  shareText: string;
  color: string;
  colorDeep: string;
  /** 결과 매핑 기준 프로필. 축 순서는 AxisScores와 동일한 1~5 척도. */
  profile: AxisScores;
};

export type ResultOutcome = {
  primary: ResultProfile;
  secondary: ResultProfile;
  scores: AxisScores;
};

/**
 * recheck는 응답이 거의 차별화되지 않아 결과를 계산하기 전에 답변 확인을
 * 안내하는 화면이다(lib/scoring.ts의 isLowInformationResponse 참고).
 */
export type Screen = "start" | "quiz" | "recheck" | "calculating" | "result" | "privacy";
