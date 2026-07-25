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

/** 선택지: 문장 + 내부 강도 점수(0~3). 화면 표시 순서는 섞여도 점수는 고정. */
export type QuestionOption = {
  text: string;
  score: 0 | 1 | 2 | 3;
};

/** 문항: 하나의 성향(trait)만 측정하는 상황형 문항. 4지선다. */
export type Question = {
  id: string;
  trait: Axis;
  situation: string;
  options: QuestionOption[];
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
  summary: string;
  strengths: string[];
  cautions: string[];
  tips: string[];
  /** 보조 결과와의 관계 설명 */
  relations: string;
  shareText: string;
  color: string;
};

/** 성향별 정규화 점수(0~100). 다섯 성향은 서로 독립적으로 계산된다. */
export type ScoreOutcome = {
  /** 정규화 점수 0~100 */
  scores: AxisScores;
  /** 원점수 0~9 (강도·동점 처리에 사용) */
  rawScores: AxisScores;
  primaryTrait: Axis;
  secondaryTrait: Axis;
  primary: ResultProfile;
  secondary: ResultProfile;
};

/**
 * 두 번째 성향 강도 구간 (내부 기준 — 화면에 노출하지 않음).
 * 실측 분포상 3단계는 한쪽에 쏠려 2단계로 축소했다.
 */
export type Intensity = "moderate" | "strong";

/**
 * 계층형 결과: [행동 수식어 + 맛 + 기본 간식].
 * 기본 간식 = 1위 성향, 수식어 계열 = 2위 성향, 강도 = 2위 성향 원점수.
 * 맛은 성격 상징이 아니라 간식별 대표 맛 3종에서 고른 감각적 보조 요소.
 */
export type GeneratedResult = {
  baseSnack: ResultId;
  primaryTrait: Axis;
  secondaryTrait: Axis;
  intensity: Intensity;
  modifier: string;
  flavor: string;
  title: string;
  imageKey: string;
};
