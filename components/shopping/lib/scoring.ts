import { QUESTIONS } from "../data/questions";
import { RESULTS } from "../data/results";
import type { Axis, AxisScores, ResultId, ResultOutcome, ResultProfile } from "../types";

const AXES: Axis[] = ["qual", "trend", "impulse"];

const TIE_PRIORITY: ResultId[] = [
  "perfect-hunter",
  "premium-curator",
  "quality-improviser",
  "precision-analyst",
  "mood-splurger",
  "budget-trend-follower",
  "impulsive-value-shopper",
  "careful-saver",
];

const RESULT_BY_ID: Record<ResultId, ResultProfile> = Object.fromEntries(
  RESULTS.map((r) => [r.id, r]),
) as Record<ResultId, ResultProfile>;

const EPSILON = 1e-9;

/**
 * answers[i]는 QUESTIONS[i]에 대해 사용자가 고른 응답값(1~5).
 * 역방향 문항은 6 - 응답값으로 정확히 한 번만 반전한다.
 * 축 점수는 축별 6문항의 평균이며, 반올림 없이 실수값 그대로 반환한다
 * (반올림은 화면 표시 시점에만 한다).
 */
export function computeAxisScores(answers: number[]): AxisScores {
  const sums: Record<Axis, number> = { qual: 0, trend: 0, impulse: 0 };
  const counts: Record<Axis, number> = { qual: 0, trend: 0, impulse: 0 };

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
 * 궁합 유형 짝. 8개 유형은 품질·트렌드·충동 세 축의 고/저 조합이라,
 * 충동 축만 뒤집으면 "고르는 취향(품질 기준·트렌드 민감도)은 같은데
 * 결정 속도만 반대인" 유형이 정확히 하나씩 대응된다. 한쪽이 지를 때
 * 다른 한쪽이 속도를 잡아주는 조합이라 서로 잘 맞는다.
 *
 * 이전에는 "축 점수가 두 번째로 가까운 유형"을 보조 결과로 썼는데,
 * 그건 채점 순위의 부산물일 뿐 어울리는 상대라는 의미가 없었다.
 */
const MATCH_BY_ID: Record<ResultId, ResultId> = {
  "perfect-hunter": "premium-curator",
  "premium-curator": "perfect-hunter",
  "quality-improviser": "precision-analyst",
  "precision-analyst": "quality-improviser",
  "mood-splurger": "budget-trend-follower",
  "budget-trend-follower": "mood-splurger",
  "impulsive-value-shopper": "careful-saver",
  "careful-saver": "impulsive-value-shopper",
};

/**
 * 전체 18문항에 응답했을 때만 호출한다.
 * 사용자의 축 점수 벡터와 8개 기준 프로필(고=4, 저=2 좌표) 사이의 유클리드
 * 거리를 각각 계산해 가장 가까운 유형을 대표 결과로 정한다. 거리 차이가
 * EPSILON 미만이면 동점으로 보고 TIE_PRIORITY 순서로 결정론적으로
 * 정한다(무작위 값 사용 안 함).
 * 궁합 유형은 대표 유형에서 충동 축만 뒤집은 짝이다(MATCH_BY_ID).
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

  const primary = ranked[0].result;
  return { primary, match: RESULT_BY_ID[MATCH_BY_ID[primary.id]], scores };
}

export { RESULT_BY_ID };
