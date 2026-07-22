import type { Answers, Axis, AxisScores, ScoreOutcome } from "../types";
import { QUESTIONS } from "../data/questions";
import { RESULTS, RESULT_ORDER } from "../data/results";
import { AXIS_ORDER } from "./axis";

/** 각 축의 이론적 최소/최대 원점수 (문항별 선택지 중 최소·최대 기여의 합). */
const AXIS_MIN: AxisScores = { rich: 0, playful: 0, warm: 0 };
const AXIS_MAX: AxisScores = { rich: 0, playful: 0, warm: 0 };
for (const q of QUESTIONS) {
  for (const axis of AXIS_ORDER) {
    const vals = q.choices.map((c) => c.scores[axis]);
    AXIS_MIN[axis] += Math.min(...vals);
    AXIS_MAX[axis] += Math.max(...vals);
  }
}

/** 모든 문항에 유효한 선택지 인덱스가 있는지 확인한다. */
export function isComplete(answers: Answers): boolean {
  return QUESTIONS.every((q) => {
    const idx = answers[q.id];
    return idx != null && idx >= 0 && idx < q.choices.length;
  });
}

/**
 * 선택지 가산점을 합산한 뒤 축별 최소~최대 범위로 1~5 정규화한다.
 * 미응답이 있으면 예외를 던진다(호출 전 isComplete로 가드).
 */
export function computeAxisScores(answers: Answers): AxisScores {
  const raw: AxisScores = { rich: 0, playful: 0, warm: 0 };

  for (const q of QUESTIONS) {
    const idx = answers[q.id];
    if (idx == null || idx < 0 || idx >= q.choices.length) {
      throw new Error(`미응답/잘못된 응답 문항: ${q.id}`);
    }
    const choice = q.choices[idx];
    for (const axis of AXIS_ORDER) raw[axis] += choice.scores[axis];
  }

  const norm = {} as AxisScores;
  for (const axis of AXIS_ORDER) {
    const span = AXIS_MAX[axis] - AXIS_MIN[axis];
    norm[axis] = span === 0 ? 3 : 1 + (4 * (raw[axis] - AXIS_MIN[axis])) / span;
  }
  return norm;
}

/** 두 축 좌표 사이의 유클리드 거리 (3축) */
function distance(a: AxisScores, b: AxisScores): number {
  const dr = a.rich - b.rich;
  const dp = a.playful - b.playful;
  const dw = a.warm - b.warm;
  return Math.sqrt(dr * dr + dp * dp + dw * dw);
}

/**
 * 축 점수를 6개 기준 프로필과 거리 비교해 대표/보조 결과를 정한다.
 * 동점(1e-9 이내)은 RESULT_ORDER 고정 순서로 처리한다(무작위 없음).
 */
export function resolveOutcome(scores: AxisScores): ScoreOutcome {
  const ranked = [...RESULT_ORDER]
    .map((id) => ({ id, dist: distance(scores, RESULTS[id].profile) }))
    .sort((a, b) => {
      const diff = a.dist - b.dist;
      if (Math.abs(diff) > 1e-9) return diff;
      return RESULT_ORDER.indexOf(a.id) - RESULT_ORDER.indexOf(b.id);
    });

  return {
    scores,
    primary: RESULTS[ranked[0].id],
    secondary: RESULTS[ranked[1].id],
  };
}

/** 응답 → 최종 결과. 미완성이면 null. */
export function scoreAnswers(answers: Answers): ScoreOutcome | null {
  if (!isComplete(answers)) return null;
  return resolveOutcome(computeAxisScores(answers));
}

/** 점수 내림차순 정렬된 축 목록. 동점이면 AXIS_ORDER를 유지한다. */
export function rankedAxes(scores: AxisScores): Axis[] {
  return [...AXIS_ORDER].sort((a, b) => {
    const diff = scores[b] - scores[a];
    if (Math.abs(diff) > 1e-9) return diff;
    return AXIS_ORDER.indexOf(a) - AXIS_ORDER.indexOf(b);
  });
}
