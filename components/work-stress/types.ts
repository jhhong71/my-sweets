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
  /**
   * 16개 원응답(역채점 전, 1~5)의 표준편차. 0이면 모든 문항에 정확히
   * 같은 번호를 골랐다는 뜻이다. 정방향·역방향 문항이 축마다 4:4로
   * 완전히 균형 잡혀 있어서, 이 값이 0이면 focus/engage가 어떤 번호를
   * 골랐든 항상 정확히 3.0/3.0으로 계산된다(lib/scoring.ts 설명 참고).
   */
  answerSpread: number;
  /**
   * 대처 스타일을 판별할 만한 응답 다양성이 없는 경우(straightlining 등).
   * true면 primary/secondary는 의미가 없으므로 유형 결과를 표시하지 말고
   * 재검사를 안내해야 한다.
   */
  lowInformation: boolean;
};

export type Screen = "start" | "quiz" | "calculating" | "result" | "privacy";
