/** 회식 행동 축 3개. 각 축은 서로 반대되는 두 극(pole)을 가진다. */
export type Axis = "energy" | "stay" | "depth";

/** 축의 두 극. high = 리액터/완주/진심, low = 관찰자/조기이탈/스몰토크 */
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

/** 8개 결과 유형 키 = 축별 극의 조합 (r/o · m/e · d/l) */
export type ResultId =
  | "rmd"
  | "rml"
  | "red"
  | "rel"
  | "omd"
  | "oml"
  | "oed"
  | "oel";

/** 결과 카드에 쓰는 일러스트 종류 */
export type IconId =
  | "mic"
  | "confetti"
  | "comet"
  | "flash"
  | "bubble"
  | "cup"
  | "candle"
  | "cloud";

export type ResultProfile = {
  id: ResultId;
  /** 이 유형을 만드는 축별 극 조합 */
  poles: Record<Axis, Pole>;
  title: string;
  subtitle: string;
  icon: IconId;
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
   * 나와 궁합이 맞는 유형. 근소했던 축을 뒤집은 "비슷한 유형"이 아니라,
   * 사교 에너지(energy) 극만 반대이고 자리 지속력·대화 온도는 나와 같은
   * 유형이다 — 대화를 주고받는 밀당은 되면서 같은 리듬으로 어울릴 수 있는
   * 상대라는 뜻. (src/lib/scoring.ts의 compatibleResultId 참고)
   */
  compatible: ResultProfile;
};
