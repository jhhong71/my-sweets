import type { Axis, Outcome, PairInput, Pole, ResultId } from "../types";
import { RESULTS } from "../data/results";
import { AXIS_ORDER, POLE_CODES } from "./axis";
import { NO_BONGWAN } from "../data/surnames";

/** 입력 네 항목이 모두 채워졌는지 확인한다. */
export function isComplete(input: Partial<PairInput>): input is PairInput {
  return Boolean(
    input.mySurname?.trim() &&
      input.myBongwan?.trim() &&
      input.partnerSurname?.trim() &&
      input.partnerBongwan?.trim(),
  );
}

/**
 * FNV-1a 32비트 해시. 같은 입력이면 항상 같은 값을 내는 결정적 함수이며,
 * 응답을 서버로 보내지 않고 브라우저 안에서만 계산한다.
 */
function hash32(str: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/** 입력 조합 + salt로 만드는 서로 다른 해시값 (축마다, 점수마다 독립적으로 갈리게 한다). */
function pairHash(input: PairInput, salt: string): number {
  const key = `${input.mySurname}|${input.myBongwan}|${input.partnerSurname}|${input.partnerBongwan}|${salt}`;
  return hash32(key);
}

const AXIS_SALT: Record<Axis, string> = {
  tension: "tension",
  combo: "combo",
  vibe: "vibe",
};

/** 입력 → 축별 극. 축마다 다른 salt로 해시해 서로 독립적으로 갈리게 한다. */
export function computeAxes(input: PairInput): Record<Axis, Pole> {
  const axes = {} as Record<Axis, Pole>;
  for (const axis of AXIS_ORDER) {
    axes[axis] = pairHash(input, AXIS_SALT[axis]) % 2 === 0 ? "high" : "low";
  }
  return axes;
}

/** 입력 → 궁합 지수 (65~99). 완전히 부정적인 값이 나오지 않도록 하한을 둔다. */
export function computeScore(input: PairInput): number {
  return 65 + (pairHash(input, "score") % 35);
}

/** 축별 극 조합 → 결과 유형 ID */
export function resultIdFromAxes(axes: Record<Axis, Pole>): ResultId {
  const key = AXIS_ORDER.map((axis) => POLE_CODES[axis][axes[axis]]).join("");
  if (!(key in RESULTS)) {
    throw new Error(`결과 데이터에 없는 유형 키: ${key}`);
  }
  return key as ResultId;
}

/** 입력 → 최종 결과. 미완성이면 null. */
export function computeOutcome(input: Partial<PairInput>): Outcome | null {
  if (!isComplete(input)) return null;
  const axes = computeAxes(input);
  return {
    input,
    score: computeScore(input),
    axes,
    result: RESULTS[resultIdFromAxes(axes)],
  };
}

/** 결과 카드·공유 문구에 쓰는 '본관 성씨' 표기. 본관이 없으면 성씨만 표기한다. */
export function pairLabel(surname: string, bongwan: string): string {
  return bongwan && bongwan !== NO_BONGWAN ? `${bongwan} ${surname}씨` : `${surname}씨`;
}
