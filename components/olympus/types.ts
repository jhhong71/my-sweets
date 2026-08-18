/** 4개의 연속형 행동 축. */
export type Axis = "wisdom" | "passion" | "bond" | "order";

/** 축별 원점수(문항 배점의 합) 또는 0~10 정규화 점수에 공통으로 쓰는 형태 */
export type AxisScores = Record<Axis, number>;

/**
 * 선택지: 라벨 + 이 선택지를 고르면 더해질 축별 점수.
 * 언급되지 않은 축은 0점이 더해진다.
 */
export type Choice = {
  label: string;
  scores: Partial<AxisScores>;
};

export type Question = {
  id: string;
  text: string;
  description?: string;
  /** 항상 2개. */
  choices: [Choice, Choice];
};

/** 응답: 문항 ID → 선택한 선택지 인덱스(미응답 null) */
export type Answers = Record<string, number | null>;

/** 12신 결과 ID */
export type GodId =
  | "zeus"
  | "hera"
  | "poseidon"
  | "demeter"
  | "athena"
  | "apollo"
  | "artemis"
  | "ares"
  | "aphrodite"
  | "hephaestus"
  | "hermes"
  | "dionysus";

export type TestResult = {
  id: GodId;
  title: string;
  subtitle: string;
  /** 기준 프로필 (0~10, wisdom/passion/bond/order) */
  profile: AxisScores;
  summary: string;
  mythNote: string;
  traits: string[];
  strengths: string[];
  cautions: string[];
  tips: string[];
  color: string;
  shareText: string;
};

/** 축 하나의 계산 결과 */
export type AxisResult = {
  axis: Axis;
  /** 원점수 (0~18) */
  raw: number;
  /** 정규화 점수 (0~10) */
  normalized: number;
};

export type Outcome = {
  axes: Record<Axis, AxisResult>;
  primary: TestResult;
  /** 나와 가장 가까운(거리가 짧은) 다른 신 — "잘 맞을 것 같은 유형" */
  goodMatch: TestResult;
  /** 나와 가장 먼(거리가 긴) 신 — "가장 다른 성향의 유형" */
  differentMatch: TestResult;
};
