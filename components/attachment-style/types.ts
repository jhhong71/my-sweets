/** 연애 성향 축 3개. 각 축은 서로 반대되는 두 극(pole)을 가진다. */
export type Axis = "closeness" | "openness" | "steadiness";

/** 축의 두 극. high = 밀착형/표현형/안정형, low = 독립형/절제형/예민형 */
export type Pole = "high" | "low";

/** 축별 원점수(0 ~ 축 가중치 합) */
export type RawScores = Record<Axis, number>;

/**
 * 선택지: 라벨 + 이 선택지가 향하는 극.
 * 선택지는 결과 유형에 직접 점수를 주지 않는다. 문항이 담당하는 축 하나에만,
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

/** 8개 결과 유형 키 = 축별 극의 조합 (밀착도 · 표현도 · 안정도) */
export type ResultId =
  | "cos"
  | "cof"
  | "crs"
  | "crf"
  | "dos"
  | "dof"
  | "drs"
  | "drf";

export type ResultProfile = {
  id: ResultId;
  /** 이 유형을 만드는 축별 극 조합 */
  poles: Record<Axis, Pole>;
  title: string;
  subtitle: string;
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
  axes: Record<Axis, AxisResult>;
  primary: ResultProfile;
  /**
   * 나와 연애 궁합이 잘 맞는 유형. `openness`(표현 방식) 극만 반대이고
   * `closeness`(밀착도)·`steadiness`(안정도)는 나와 같은 유형이다 —
   * 감정을 표현하는 방식은 서로 보완하면서, 서로 원하는 거리감과 마음의
   * 안정감은 결이 맞는 상대라는 뜻. (src/lib/scoring.ts의 compatiblePoles 참고)
   */
  compatible: ResultProfile;
};
