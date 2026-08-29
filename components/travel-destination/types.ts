/** 여행 성향 축 3개. 각 축은 서로 반대되는 두 극(pole)을 가진다. */
export type Axis = "pace" | "scene" | "plan";

/** 축의 두 극. high = 활동형/도시형/계획형, low = 여유형/자연형/즉흥형 */
export type Pole = "high" | "low";

/** 축별 원점수(0 ~ 축 가중치 합) */
export type RawScores = Record<Axis, number>;

/**
 * 선택지: 라벨 + 이 선택지가 향하는 극.
 * 선택지는 결과 여행지에 직접 점수를 주지 않는다. 문항이 담당하는 축 하나에만,
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

/** 8개 여행지 결과 키 = 축별 극의 조합 (a/r · c/n · p/f) */
export type ResultId =
  | "acp"
  | "acf"
  | "anp"
  | "anf"
  | "rcp"
  | "rcf"
  | "rnp"
  | "rnf";

export type ResultProfile = {
  id: ResultId;
  /** 이 여행지를 만드는 축별 극 조합 */
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
   * 나와 함께 여행하면 잘 맞는 여행 메이트 유형. `plan`(여행 방식) 극만
   * 반대이고 `pace`(동선 강도)·`scene`(선호 풍경)은 나와 같은 유형이다 —
   * 여행 방식은 서로 보완하면서 움직이는 속도와 선호하는 풍경의 결은 맞는
   * 상대라는 뜻. (src/lib/scoring.ts의 compatiblePoles 참고)
   */
  compatible: ResultProfile;
};
