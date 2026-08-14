export type Axis = "plan" | "save" | "credit";

export type Question = {
  /** 문항 고유 ID (q1~q18). */
  id: string;
  text: string;
  axis: Axis;
  /** true면 역방향 문항 — 채점 시 6 - 응답값으로 반전한다. */
  reverse: boolean;
};

export type AxisScores = Record<Axis, number>;

/** 결과 유형 ID. 세 축(계획성·저축·신용관리)의 고/저 조합 8가지. */
export type ResultId =
  | "steady-planner"
  | "smart-saver"
  | "mindful-spender"
  | "planned-flexer"
  | "quiet-saver"
  | "freeform-saver"
  | "careful-improviser"
  | "free-today-spender";

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
  /** 결과 매핑 기준 프로필. 축 순서는 AxisScores와 동일한 1~5 척도(고=4, 저=2). */
  profile: AxisScores;
};

export type ResultOutcome = {
  primary: ResultProfile;
  secondary: ResultProfile;
  scores: AxisScores;
};

export type Screen = "start" | "quiz" | "calculating" | "result" | "privacy" | "notfound";
