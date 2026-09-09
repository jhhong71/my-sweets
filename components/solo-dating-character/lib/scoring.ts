import type {
  Answers,
  Axis,
  AxisRatios,
  AxisResult,
  NameSet,
  Outcome,
  Pole,
  RawScores,
  ResultProfile,
} from "../types";
import { QUESTIONS } from "../data/questions";
import { RESULTS, resultsOf } from "../data/results";
import { AXIS_ORDER } from "./axis";

/** 축별 가중치 합. 문항 데이터에서 계산하므로 하드코딩된 값과 어긋날 수 없다. */
export const AXIS_TOTALS: RawScores = (() => {
  const totals: RawScores = { pace: 0, spotlight: 0, basis: 0 };
  for (const q of QUESTIONS) totals[q.axis] += q.weight;
  return totals;
})();

/** 모든 문항에 유효한 선택지 인덱스가 있는지 확인한다. */
export function isComplete(answers: Answers): boolean {
  return QUESTIONS.every((q) => {
    const idx = answers[q.id];
    return idx != null && Number.isInteger(idx) && idx >= 0 && idx < q.choices.length;
  });
}

/** 문항 ID → 선택한 극. 미응답이거나 범위를 벗어나면 예외. */
function chosenPole(answers: Answers, questionId: string): Pole {
  const q = QUESTIONS.find((item) => item.id === questionId);
  if (!q) throw new Error(`존재하지 않는 문항 ID: ${questionId}`);
  const idx = answers[q.id];
  if (idx == null || !Number.isInteger(idx) || idx < 0 || idx >= q.choices.length) {
    throw new Error(`미응답이거나 잘못된 응답 문항: ${q.id}`);
  }
  return q.choices[idx].pole;
}

/**
 * 응답 → 축별 결과. high 극 선택지를 고른 문항의 가중치를 더하고,
 * 축 가중치 합으로 나눠 0~1 비율을 만든다. 이 비율이 캐릭터 기준 프로필과의
 * 거리 계산에 그대로 쓰인다.
 *
 * pole은 화면 표시용 요약값이다(0.5보다 크면 high). 정확히 0.5인 경우에는
 * 무작위 대신 low(=신중형/은은형/감정형)로 표기하되, 결과 캐릭터 자체는
 * pole이 아니라 연속값(ratio)으로 정해지므로 이 표기가 결과를 바꾸지 않는다.
 */
export function computeAxisResults(answers: Answers): Record<Axis, AxisResult> {
  const raw: RawScores = { pace: 0, spotlight: 0, basis: 0 };

  for (const q of QUESTIONS) {
    if (chosenPole(answers, q.id) === "high") raw[q.axis] += q.weight;
  }

  const results = {} as Record<Axis, AxisResult>;
  for (const axis of AXIS_ORDER) {
    const total = AXIS_TOTALS[axis];
    const ratio = total === 0 ? 0.5 : raw[axis] / total;
    results[axis] = {
      axis,
      raw: raw[axis],
      total,
      pole: ratio > 0.5 ? "high" : "low",
      ratio,
      strength: Math.abs(ratio - 0.5),
    };
  }
  return results;
}

/** 축 결과 → 축별 0~1 비율만 뽑아낸다. */
export function ratiosOf(axes: Record<Axis, AxisResult>): AxisRatios {
  return {
    pace: axes.pace.ratio,
    spotlight: axes.spotlight.ratio,
    basis: axes.basis.ratio,
  };
}

/**
 * 두 프로필 사이의 유클리드 거리(축 3개, 가중치 동일).
 * 세 축을 같은 비중으로 두는 이유는 어느 한 축이 캐릭터를 대표하지 않고
 * 세 축의 조합으로 캐릭터가 구분되기 때문이다. (docs/test-design.md 참고)
 */
export function distance(a: AxisRatios, b: AxisRatios): number {
  let sum = 0;
  for (const axis of AXIS_ORDER) {
    const d = a[axis] - b[axis];
    sum += d * d;
  }
  return Math.sqrt(sum);
}

/**
 * 선택한 이름표 세트 안에서 거리가 가까운 순으로 캐릭터를 정렬한다.
 * 거리가 완전히 같으면 무작위 대신 데이터에 정의된 고정 순서를 따른다.
 */
export function rankCharacters(set: NameSet, ratios: AxisRatios): ResultProfile[] {
  const list = resultsOf(set);
  return [...list].sort((a, b) => {
    const diff = distance(ratios, a.target) - distance(ratios, b.target);
    if (Math.abs(diff) > 1e-9) return diff;
    return list.indexOf(a) - list.indexOf(b);
  });
}

/**
 * 축을 "뚜렷한 순서"(중간값 0.5에서 멀리 떨어진 순서)로 정렬한다.
 * 동률이면 무작위 대신 AXIS_ORDER를 유지한다.
 */
export function axesByStrength(ratios: AxisRatios): Axis[] {
  return [...AXIS_ORDER].sort((a, b) => {
    const diff = Math.abs(ratios[b] - 0.5) - Math.abs(ratios[a] - 0.5);
    if (Math.abs(diff) > 1e-9) return diff;
    return AXIS_ORDER.indexOf(a) - AXIS_ORDER.indexOf(b);
  });
}

/**
 * 궁합을 볼 때 축에 주는 가중치. 이번 응답에서 가장 뚜렷하게 나온 축을 가장 크게
 * 본다(4 : 2 : 1). 덕분에 대표 캐릭터가 같아도 어느 축이 얼마나 뚜렷했는지에 따라
 * 잘 맞는 상대가 달라진다.
 */
const MATCH_WEIGHTS = [4, 2, 1];

export function matchAxisWeights(ratios: AxisRatios): Record<Axis, number> {
  const weights = {} as Record<Axis, number>;
  axesByStrength(ratios).forEach((axis, index) => {
    weights[axis] = MATCH_WEIGHTS[index];
  });
  return weights;
}

/** 축별 가중치를 반영한 거리 */
export function weightedDistance(
  a: AxisRatios,
  b: AxisRatios,
  weights: Record<Axis, number>,
): number {
  let sum = 0;
  for (const axis of AXIS_ORDER) {
    const d = a[axis] - b[axis];
    sum += weights[axis] * d * d;
  }
  return Math.sqrt(sum);
}

/**
 * 반대 이름표 세트에서 잘 맞는 상대를 찾는다.
 *
 * 기준: 표현 방식(spotlight)은 서로 반대일 때 대화가 편하고(한쪽이 이끌면
 * 한쪽이 받아주는 흐름), 감정 속도(pace)와 선택 기준(basis)은 비슷해야
 * 관계의 속도와 방향이 어긋나지 않는다. 그래서 "표현 방식만 뒤집은 나"와
 * 가까운 캐릭터를 상대 세트에서 고르되, 이번 응답에서 뚜렷하게 나온 축일수록
 * 크게 반영한다(matchAxisWeights).
 *
 * 대표 캐릭터가 같아도 축 점수가 다르면 상대가 달라질 수 있다.
 * 거리가 완전히 같으면 무작위 대신 데이터에 정의된 고정 순서를 따른다.
 */
export function findMatch(set: NameSet, ratios: AxisRatios): ResultProfile {
  const otherSet: NameSet = set === "male" ? "female" : "male";
  const wanted: AxisRatios = {
    pace: ratios.pace,
    spotlight: 1 - ratios.spotlight,
    basis: ratios.basis,
  };
  const weights = matchAxisWeights(ratios);

  const candidates = resultsOf(otherSet);
  let best = candidates[0];
  let bestDistance = Infinity;
  for (const candidate of candidates) {
    const d = weightedDistance(wanted, candidate.target, weights);
    if (d < bestDistance - 1e-9) {
      bestDistance = d;
      best = candidate;
    }
  }
  return best;
}

/** 축 결과 + 이름표 세트 → 대표·보조 캐릭터와 잘 맞는 상대. */
export function resolveOutcome(
  set: NameSet,
  axes: Record<Axis, AxisResult>,
): Outcome {
  const ratios = ratiosOf(axes);
  const ranked = rankCharacters(set, ratios);
  return {
    set,
    axes,
    primary: ranked[0],
    secondary: ranked[1],
    match: findMatch(set, ratios),
  };
}

/** 응답 → 최종 결과. 미완성이면 null. */
export function scoreAnswers(set: NameSet, answers: Answers): Outcome | null {
  if (!isComplete(answers)) return null;
  return resolveOutcome(set, computeAxisResults(answers));
}

/** 성향이 뚜렷한 순으로 정렬된 축 목록. 궁합 가중치와 같은 기준을 쓴다. */
export function rankedAxes(axes: Record<Axis, AxisResult>): Axis[] {
  return axesByStrength(ratiosOf(axes));
}

/** 공유 링크(?c=)로 받은 캐릭터 ID인지 확인한다. */
export function isResultId(value: string): value is keyof typeof RESULTS {
  return value in RESULTS;
}
