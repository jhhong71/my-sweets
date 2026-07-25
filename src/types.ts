/**
 * Big Five(5대 성격요인)에서 착안한 5개 취향 축.
 * open 개방성 / conscientious 성실성 / extravert 외향성 /
 * agreeable 우호성 / stable 정서안정. (검증된 심리검사가 아닌 엔터테인먼트용)
 */
export type Axis =
  | "open"
  | "conscientious"
  | "extravert"
  | "agreeable"
  | "stable";

export type AxisScores = Record<Axis, number>;

/** 선택지: 라벨 + 그 선택지가 대표하는 축 1개(선택 시 해당 축에 1점). */
export type Choice = {
  label: string;
  axis: Axis;
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
