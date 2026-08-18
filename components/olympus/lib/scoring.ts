import type { Answers, Axis, AxisResult, AxisScores, GodId, Outcome } from "../types";
import { QUESTIONS } from "../data/questions";
import { GODS, RESULT_ORDER } from "../data/gods";
import { AXIS_ORDER, AXIS_RAW_MAX } from "./axis";

/** 모든 문항에 유효한 선택지 인덱스가 있는지 확인한다. */
export function isComplete(answers: Answers): boolean {
  return QUESTIONS.every((q) => {
    const idx = answers[q.id];
    return idx != null && Number.isInteger(idx) && idx >= 0 && idx < q.choices.length;
  });
}

/** 응답 → 축별 원점수(0~18). */
export function computeRawScores(answers: Answers): AxisScores {
  const raw: AxisScores = { wisdom: 0, passion: 0, bond: 0, order: 0 };
  for (const q of QUESTIONS) {
    const idx = answers[q.id];
    if (idx == null) throw new Error(`미응답 문항: ${q.id}`);
    const choice = q.choices[idx];
    for (const axis of AXIS_ORDER) {
      raw[axis] += choice.scores[axis] ?? 0;
    }
  }
  return raw;
}

/** 축별 결과(원점수 + 0~10 정규화 점수) 계산. */
export function computeAxisResults(answers: Answers): Record<Axis, AxisResult> {
  const raw = computeRawScores(answers);
  const results = {} as Record<Axis, AxisResult>;
  for (const axis of AXIS_ORDER) {
    results[axis] = {
      axis,
      raw: raw[axis],
      normalized: (raw[axis] / AXIS_RAW_MAX) * 10,
    };
  }
  return results;
}

/** 두 프로필 사이의 가중 유클리드 거리. 모든 축 가중치는 1로 균등하다. */
function distance(a: AxisScores, b: AxisScores): number {
  let sumSq = 0;
  for (const axis of AXIS_ORDER) {
    const diff = a[axis] - b[axis];
    sumSq += diff * diff;
  }
  return Math.sqrt(sumSq);
}

const TIE_EPSILON = 0.001;

/**
 * 정규화된 사용자 점수와 가장 가까운 신을 찾는다.
 * 거리가 TIE_EPSILON 이내로 동률이면 RESULT_ORDER(고정 순서)에서 먼저 나오는
 * 신을 결정적으로 선택한다(무작위 요소 없음). `exclude`에 담긴 ID는 후보에서 뺀다.
 */
function nearestGod(userNormalized: AxisScores, exclude: Set<GodId> = new Set()): GodId {
  let best: GodId | null = null;
  let bestDist = Infinity;
  for (const id of RESULT_ORDER) {
    if (exclude.has(id)) continue;
    const d = distance(userNormalized, GODS[id].profile);
    if (d < bestDist - TIE_EPSILON) {
      bestDist = d;
      best = id;
    }
  }
  if (best === null) throw new Error("후보 신을 찾지 못했습니다");
  return best;
}

/** 정규화된 사용자 점수와 가장 먼 신을 찾는다. 동률 처리 방식은 nearestGod과 동일하다. */
function farthestGod(userNormalized: AxisScores, exclude: Set<GodId> = new Set()): GodId {
  let best: GodId | null = null;
  let bestDist = -Infinity;
  for (const id of RESULT_ORDER) {
    if (exclude.has(id)) continue;
    const d = distance(userNormalized, GODS[id].profile);
    if (d > bestDist + TIE_EPSILON) {
      bestDist = d;
      best = id;
    }
  }
  if (best === null) throw new Error("후보 신을 찾지 못했습니다");
  return best;
}

/** 축 결과 → 대표 신 + 잘 맞을 것 같은 유형 + 가장 다른 유형. */
export function resolveOutcome(axes: Record<Axis, AxisResult>): Outcome {
  const userNormalized: AxisScores = {
    wisdom: axes.wisdom.normalized,
    passion: axes.passion.normalized,
    bond: axes.bond.normalized,
    order: axes.order.normalized,
  };

  const primaryId = nearestGod(userNormalized);
  const goodMatchId = nearestGod(userNormalized, new Set([primaryId]));
  const differentMatchId = farthestGod(userNormalized);

  return {
    axes,
    primary: GODS[primaryId],
    goodMatch: GODS[goodMatchId],
    differentMatch: GODS[differentMatchId],
  };
}

/** 응답 → 최종 결과. 미완성이면 null. */
export function scoreAnswers(answers: Answers): Outcome | null {
  if (!isComplete(answers)) return null;
  return resolveOutcome(computeAxisResults(answers));
}

/** 정규화 점수가 높은 순으로 정렬된 축 목록. 동률이면 AXIS_ORDER를 유지한다. */
export function rankedAxes(axes: Record<Axis, AxisResult>): Axis[] {
  return [...AXIS_ORDER].sort((a, b) => {
    const diff = axes[b].normalized - axes[a].normalized;
    if (Math.abs(diff) > 1e-9) return diff;
    return AXIS_ORDER.indexOf(a) - AXIS_ORDER.indexOf(b);
  });
}
