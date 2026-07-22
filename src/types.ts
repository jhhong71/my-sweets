export type Axis = "rich" | "playful" | "warm";

export type AxisScores = Record<Axis, number>;

/** 선택지: 라벨 + 축별 가산점(0~2). 결과 이름이 아니라 축 점수에만 영향을 준다. */
export type Choice = {
  label: string;
  scores: AxisScores;
};

export type Question = {
  id: string;
  text: string;
  choices: Choice[];
};

/** 응답: 문항 ID → 선택한 선택지 인덱스(미응답 null) */
export type Answers = Record<string, number | null>;

export type ResultId =
  | "chocolate"
  | "candy"
  | "biscuit"
  | "marshmallow"
  | "pudding";

export type ResultProfile = {
  id: ResultId;
  title: string;
  subtitle: string;
  /** 축별 기준 프로필 (1~5) — 거리 비교에 사용 */
  profile: AxisScores;
  summary: string;
  strengths: string[];
  cautions: string[];
  tips: string[];
  /** 보조 결과와의 관계 설명 */
  relations: string;
  shareText: string;
  color: string;
};

export type ScoreOutcome = {
  scores: AxisScores;
  primary: ResultProfile;
  secondary: ResultProfile;
};
