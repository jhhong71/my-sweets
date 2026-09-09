/** 연애 성향 축 3개. 각 축은 서로 반대되는 두 극(pole)을 가진다. */
export type Axis = "pace" | "spotlight" | "basis";

/** 축의 두 극. high = 직진형/주목형/현실형, low = 신중형/은은형/감정형 */
export type Pole = "high" | "low";

/** 축별 원점수(0 ~ 축 가중치 합) */
export type RawScores = Record<Axis, number>;

/** 축별 0~1로 정규화된 점수 */
export type AxisRatios = Record<Axis, number>;

/** 결과로 받을 이름표 세트. 성별 정체성이 아니라 "어떤 이름표를 받을지"의 선택이다. */
export type NameSet = "male" | "female";

/**
 * 선택지: 라벨 + 이 선택지가 향하는 극.
 * 선택지는 결과 캐릭터에 직접 점수를 주지 않는다. 문항이 담당하는 축 하나에만,
 * 문항에 정해진 가중치만큼 기여한다(high 선택 시 weight, low 선택 시 0).
 */
export type Choice = {
  label: string;
  pole: Pole;
};

export type Question = {
  id: string;
  text: string;
  /** 이 문항이 측정하는 축 */
  axis: Axis;
  /** 이 문항이 축에 기여하는 가중치 */
  weight: number;
  /** 항상 2개. 하나는 high, 하나는 low 극이다. */
  choices: [Choice, Choice];
};

/** 응답: 문항 ID → 선택한 선택지 인덱스(미응답 null) */
export type Answers = Record<string, number | null>;

/** 12명의 캐릭터 ID (남자 이름표 6 · 여자 이름표 6) */
export type ResultId =
  | "yeongsu"
  | "yeongho"
  | "yeongsik"
  | "yeongcheol"
  | "gwangsu"
  | "sangcheol"
  | "yeongsuk"
  | "jeongsuk"
  | "oksun"
  | "sunja"
  | "yeongja"
  | "hyeonsuk";

export type ResultProfile = {
  id: ResultId;
  set: NameSet;
  /** 이름표에 적히는 이름 */
  name: string;
  /** 캐릭터 한 줄 별명 */
  title: string;
  /** 축 조합 요약 (예: "신중형 · 은은형 · 현실형") */
  subtitle: string;
  /** 이 캐릭터의 기준 프로필 (축별 0~1). 응답 점수와의 거리로 결과가 정해진다. */
  target: AxisRatios;
  color: string;
  summary: string;
  strengths: string[];
  cautions: string[];
  tips: string[];
  shareText: string;
};

/** 축 하나의 계산 결과 */
export type AxisResult = {
  axis: Axis;
  /** 원점수 (0 ~ total) */
  raw: number;
  /** 이 축 문항 가중치의 합 */
  total: number;
  /** 확정된 극 */
  pole: Pole;
  /** high 쪽으로 치우친 비율 (0~1) */
  ratio: number;
  /** 중간(0.5)에서 떨어진 정도 — 클수록 뚜렷한 성향 */
  strength: number;
};

export type Outcome = {
  set: NameSet;
  axes: Record<Axis, AxisResult>;
  /** 가장 가까운 캐릭터 */
  primary: ResultProfile;
  /** 두 번째로 가까운 캐릭터 */
  secondary: ResultProfile;
  /** 반대 이름표 세트에서 찾은 잘 맞는 상대 캐릭터 */
  match: ResultProfile;
};
