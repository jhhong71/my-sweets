/** 나·상대방의 성씨·본관 입력 4가지. */
export type PairInput = {
  mySurname: string;
  myBongwan: string;
  partnerSurname: string;
  partnerBongwan: string;
};

/** 궁합 케미를 이루는 세 축. 각 축은 입력 조합의 해시로 결정된다. */
export type Axis = "tension" | "combo" | "vibe";

/** 축의 두 극 */
export type Pole = "high" | "low";

/** 8개 케미 유형 키 = 세 축의 극 조합 (tension: p/j · combo: c/r · vibe: e/h) */
export type ResultId = "pce" | "pch" | "pre" | "prh" | "jce" | "jch" | "jre" | "jrh";

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
};

/** 입력 조합으로 계산한 최종 결과 */
export type Outcome = {
  input: PairInput;
  /** 궁합 지수 (65~99) */
  score: number;
  axes: Record<Axis, Pole>;
  result: ResultProfile;
};
