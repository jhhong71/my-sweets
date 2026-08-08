import { QUESTIONS } from "../data/questions";
import { RESULTS } from "../data/results";
import type { Axis, AxisScores, ResultOutcome } from "../types";

const AXES: Axis[] = ["concept", "action"];

/**
 * 동점 처리 우선순위. 거리 차이가 EPSILON 미만이면 이 순서상 먼저 나오는
 * 결과를 택한다. 무작위 값은 사용하지 않으므로 같은 입력에는 항상 같은
 * 결과가 나온다.
 */
const TIE_PRIORITY = RESULTS.map((r) => r.id);
const EPSILON = 1e-9;

/**
 * answers[i]는 QUESTIONS[i]에 대해 사용자가 고른 응답값(1~5).
 * 역방향 문항은 6 - 응답값으로 정확히 한 번만 반전한다.
 * 축 점수는 축별 8문항의 평균이며, 반올림 없이 실수값 그대로 반환한다
 * (반올림은 화면 표시 시점에만 한다).
 */
export function computeAxisScores(answers: number[]): AxisScores {
  const sums: Record<Axis, number> = { concept: 0, action: 0 };
  const counts: Record<Axis, number> = { concept: 0, action: 0 };

  QUESTIONS.forEach((question, idx) => {
    const raw = answers[idx];
    if (raw == null) return;
    const scored = question.reverse ? 6 - raw : raw;
    sums[question.axis] += scored;
    counts[question.axis] += 1;
  });

  const scores = {} as AxisScores;
  for (const axis of AXES) {
    scores[axis] = counts[axis] > 0 ? sums[axis] / counts[axis] : 0;
  }
  return scores;
}

function euclideanDistance(a: AxisScores, b: AxisScores): number {
  return Math.sqrt(AXES.reduce((sum, axis) => sum + (a[axis] - b[axis]) ** 2, 0));
}

/**
 * 전체 16문항에 응답했을 때만 호출한다. 축 점수와 5개 결과 프로필 사이의
 * 유클리드 거리를 계산해 가장 가까운 결과(대표)와 두 번째로 가까운 결과(보조)를 고른다.
 */
export function calculateResult(answers: number[]): ResultOutcome {
  const scores = computeAxisScores(answers);

  const ranked = RESULTS.map((result) => ({
    result,
    distance: euclideanDistance(scores, result.profile),
  })).sort((a, b) => {
    const diff = a.distance - b.distance;
    if (Math.abs(diff) > EPSILON) return diff;
    return TIE_PRIORITY.indexOf(a.result.id) - TIE_PRIORITY.indexOf(b.result.id);
  });

  return {
    primary: ranked[0].result,
    secondary: ranked[1].result,
    scores,
  };
}
