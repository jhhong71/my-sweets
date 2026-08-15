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
  /**
   * 궁합이 맞는 캐릭터(결과 유형)의 id. 응답 점수와 무관하게 유형마다
   * 고정으로 정해둔 값이라 항상 같은 응답에는 같은 궁합 결과가 나온다.
   */
  matchId: string;
  /** 위 matchId 유형과 어떤 시너지가 있는지 설명하는 문장. */
  relation: string;
  shareText: string;
  color: string;
  iconKey: IconKey;
  /** 결과 매핑 기준 프로필. 축 순서는 AxisScores와 동일한 1~5 척도. */
  profile: AxisScores;
};

export type ResultOutcome = {
  primary: ResultProfile;
  scores: AxisScores;
};

export type Screen = "start" | "quiz" | "calculating" | "result" | "privacy" | "notfound";
