import type {
  Answers,
  Axis,
  AxisResult,
  Outcome,
  Pole,
  RawScores,
  ResultId,
} from "../types";
import { QUESTIONS } from "../data/questions";
import { RESULTS } from "../data/results";
import { AXIS_ORDER, POLE_CODES } from "./axis";

/** 축별 가중치 합. 문항 데이터에서 계산하므로 하드코딩된 값과 어긋날 수 없다. */
export const AXIS_TOTALS: RawScores = (() => {
  const totals: RawScores = { pace: 0, judge: 0, express: 0 };
  for (const q of QUESTIONS) totals[q.axis] += q.weight;
  return totals;
})();

/**
 * 축별 동점 판정용 문항(가중치가 가장 작은 문항, 같으면 뒤에 오는 문항).
 * 축 가중치 합이 홀수면 동점 자체가 생기지 않지만, 문항이 바뀌어 합이 짝수가 되는
 * 경우에도 결과가 무작위가 되지 않도록 결정적인 기준을 미리 정해둔다.
 */
const TIEBREAK_QUESTION: Record<Axis, string> = (() => {
  const map = {} as Record<Axis, string>;
  for (const axis of AXIS_ORDER) {
    const candidates = QUESTIONS.filter((q) => q.axis === axis);
    let pick = candidates[0];
    for (const q of candidates) if (q.weight <= pick.weight) pick = q;
    map[axis] = pick.id;
  }
  return map;
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
 * 합계가 축 총점의 절반을 넘으면 high로 확정한다.
 * 정확히 절반인 경우(현재 문항 구성에서는 발생하지 않음)에는 무작위 없이
 * 해당 축의 판정 문항 응답을 따른다.
 */
export function computeAxisResults(answers: Answers): Record<Axis, AxisResult> {
  const raw: RawScores = { pace: 0, judge: 0, express: 0 };

  for (const q of QUESTIONS) {
    if (chosenPole(answers, q.id) === "high") raw[q.axis] += q.weight;
  }

  const results = {} as Record<Axis, AxisResult>;
  for (const axis of AXIS_ORDER) {
    const total = AXIS_TOTALS[axis];
    const ratio = total === 0 ? 0.5 : raw[axis] / total;
    const tied = raw[axis] * 2 === total;
    const pole: Pole = tied
      ? chosenPole(answers, TIEBREAK_QUESTION[axis])
      : ratio > 0.5
        ? "high"
        : "low";

    results[axis] = {
      axis,
      raw: raw[axis],
      total,
      pole,
      ratio,
      strength: Math.abs(ratio - 0.5),
    };
  }
  return results;
}

/** 축별 극 조합 → 결과 캐릭터 ID */
export function resultIdFromPoles(poles: Record<Axis, Pole>): ResultId {
  const key = AXIS_ORDER.map((axis) => POLE_CODES[axis][poles[axis]]).join("");
  if (!(key in RESULTS)) {
    throw new Error(`결과 데이터에 없는 캐릭터 키: ${key}`);
  }
  return key as ResultId;
}

/**
 * 나와 잘 맞는 캐릭터의 축 조합. `express`(감정 표현) 극만 뒤집고,
 * `pace`(행동 속도)와 `judge`(판단 기준)는 나와 같은 캐릭터를 찾는다.
 *
 * 근거: 행동 속도와 판단 기준이 같으면 함께 움직일 때 호흡과 가치관이 맞고,
 * 감정 표현이 반대면 한쪽이 분위기를 띄우고 다른 쪽이 차분히 중심을 잡는
 * 보완 관계가 된다. 이 관계는 대칭이며 무작위 요소는 없다.
 */
export function compatiblePoles(poles: Record<Axis, Pole>): Record<Axis, Pole> {
  return {
    ...poles,
    express: poles.express === "high" ? "low" : "high",
  };
}

/** 축 결과 → 대표 캐릭터와 궁합 캐릭터. */
export function resolveOutcome(axes: Record<Axis, AxisResult>): Outcome {
  const poles = {} as Record<Axis, Pole>;
  for (const axis of AXIS_ORDER) poles[axis] = axes[axis].pole;

  return {
    axes,
    primary: RESULTS[resultIdFromPoles(poles)],
    compatible: RESULTS[resultIdFromPoles(compatiblePoles(poles))],
  };
}

/** 응답 → 최종 결과. 미완성이면 null. */
export function scoreAnswers(answers: Answers): Outcome | null {
  if (!isComplete(answers)) return null;
  return resolveOutcome(computeAxisResults(answers));
}

/** 성향이 뚜렷한 순으로 정렬된 축 목록. 동률이면 AXIS_ORDER를 유지한다. */
export function rankedAxes(axes: Record<Axis, AxisResult>): Axis[] {
  return [...AXIS_ORDER].sort((a, b) => {
    const diff = axes[b].strength - axes[a].strength;
    if (Math.abs(diff) > 1e-9) return diff;
    return AXIS_ORDER.indexOf(a) - AXIS_ORDER.indexOf(b);
  });
}
