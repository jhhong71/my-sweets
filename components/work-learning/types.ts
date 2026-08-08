export type Axis = "concept" | "action";

export type Question = {
  /** 문항 고유 ID (q01~q16). */
  id: string;
  text: string;
  axis: Axis;
  /** true면 역방향 문항 — 채점 시 6 - 응답값으로 반전한다. */
  reverse: boolean;
};

export type AxisScores = Record<Axis, number>;

export type IconKey = "rocket" | "telescope" | "book" | "bolt" | "compass";

export type ResultProfile = {
  id: string;
  title: string;
  subtitle: string;
  summary: string;
  strengths: string[];
  cautions: string[];
  tip: string;
  /** 보조 결과와의 관계를 설명하는 문장. */
  relation: string;
  shareText: string;
  color: string;
  iconKey: IconKey;
  /** 결과 매핑 기준 프로필. 축 순서는 AxisScores와 동일한 1~5 척도. */
  profile: AxisScores;
};

export type ResultOutcome = {
  primary: ResultProfile;
  secondary: ResultProfile;
  scores: AxisScores;
};

export type Screen = "start" | "quiz" | "calculating" | "result" | "privacy" | "notfound";
