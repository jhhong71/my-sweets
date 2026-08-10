import { QUESTIONS } from "../data/questions";
import { RESULTS } from "../data/results";
import type { Axis, AxisScores, ResultId, ResultOutcome, ResultProfile } from "../types";

const AXES: Axis[] = ["focus", "engage"];

const RESULT_BY_ID: Record<ResultId, ResultProfile> = Object.fromEntries(
  RESULTS.map((r) => [r.id, r]),
) as Record<ResultId, ResultProfile>;

/** 척도 1~5의 중앙값. */
const AXIS_CENTER = 3;

/**
 * 중앙(3.0)에서 이 값 이내면 "중립" 응답으로 보고 유연 대응러로 분류한다.
 *
 * 원래는 유클리드 최근접 방식(5개 프로필 중 가장 가까운 하나)을 썼는데,
 * 유연 대응러 프로필만 정중앙(3,3)에 있고 다른 네 프로필은 모서리
 * (1.6~4.4)에 있어서 그 방식의 "유연 대응러 구역"이 실제보다 훨씬 넓었다.
 * 그래서 두 축의 부호(+/-)로 사분면을 먼저 정하고, 두 축 모두 중앙
 * 근처(±0.6)일 때만 유연 대응러로 판정하도록 바꿔 약한 성향도 실제
 * 유형으로 반영되게 했다.
 */
const NEUTRAL_BAND = 0.6;

const TIE_PRIORITY = RESULTS.map((r) => r.id);
const EPSILON = 1e-9;

/* ------------------------------------------------------------------ *
 * 응답 차별화(straightlining) 감지
 *
 * 모든 문항에 같은 번호를 고르면 축 점수가 항상 정확히 중앙값이 되어,
 * 실제 성향과 무관하게 늘 같은 유형이 나온다. 이런 응답은 유형을
 * 확정하지 말고 답변 확인을 먼저 안내한다.
 *
 * 판정은 straightlining의 표준 지표인 "비차별화 비율(최빈 응답이 차지하는
 * 비중)" 하나만 쓴다. 다른 후보 지표는 이 설문에 맞지 않아 제외했다.
 *   - 연속 동일 응답 길이(longest string): 이 설문은 앞의 8문항과 뒤의
 *     8문항이 서로 반대 방향을 묻는 순서라, 성향이 뚜렷한 사람일수록
 *     "앞 8개 동일 + 뒤 8개 동일"이 자연스럽게 나온다. 즉 연속 길이가
 *     길다는 게 불성실의 근거가 되지 못한다.
 *   - 응답 표준편차: 진짜로 어느 쪽에도 치우치지 않은 응답자의 편차와
 *     겹쳐서, 시뮬레이션상 정상 응답자를 과도하게 차단했다(잠재 중립
 *     응답자의 24%). 그래서 판정에서 뺐다.
 * ------------------------------------------------------------------ */

/**
 * 최빈 응답이 차지하는 비율의 하한. 16문항 중 15개 이상이 같은 값일 때만
 * (= 많아야 1문항만 다를 때만) 답변 확인을 안내한다.
 *
 * 의도적으로 좁게 잡은 값이다. 14/16(2문항이 다름)까지 넓히면 실제로
 * 문항을 구분해서 답한 응답까지 막게 되므로 적용하지 않는다.
 * 시뮬레이션상 문항을 읽고 답한 정상 응답자가 이 조건에 걸리는 비율은
 * 약 0.3%다.
 */
export const LOW_INFO_MODAL_SHARE_MIN = 15 / 16;

/** 가장 많이 고른 응답값이 전체에서 차지하는 비율(0~1). */
function modalShare(values: number[]): number {
  if (values.length === 0) return 1;
  const counts = new Map<number, number>();
  for (const v of values) counts.set(v, (counts.get(v) ?? 0) + 1);
  return Math.max(...counts.values()) / values.length;
}

/**
 * 선택이 거의 반복되어 결과를 확정하기 어려운 응답인지 판정한다.
 * 참이면 유형을 계산하지 않고 답변 확인 화면을 보여준다.
 */
export function isLowInformationResponse(answers: number[]): boolean {
  const usable = answers.filter((v): v is number => v != null);
  if (usable.length === 0) return true;
  return modalShare(usable) >= LOW_INFO_MODAL_SHARE_MIN - EPSILON;
}

/**
 * answers[i]는 QUESTIONS[i]에 대해 사용자가 고른 응답값(1~5).
 * 역방향 문항은 6 - 응답값으로 정확히 한 번만 반전한다.
 * 축 점수는 축별 8문항의 평균이며, 반올림 없이 실수값 그대로 반환한다
 * (반올림은 화면 표시 시점에만 한다).
 */
export function computeAxisScores(answers: number[]): AxisScores {
  const sums: Record<Axis, number> = { focus: 0, engage: 0 };
  const counts: Record<Axis, number> = { focus: 0, engage: 0 };

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

/** 두 축의 부호만으로 정하는 사분면 유형. 중립(유연 대응러) 판정은 호출부에서 먼저 처리한다. */
function quadrantResultId(scores: AxisScores): ResultId {
  const highFocus = scores.focus >= AXIS_CENTER;
  const highEngage = scores.engage >= AXIS_CENTER;
  if (highFocus && highEngage) return "solver";
  if (!highFocus && highEngage) return "expresser";
  if (highFocus && !highEngage) return "strategist";
  return "distancer";
}

/**
 * 전체 16문항에 응답했을 때만 호출한다.
 * 대표 유형은 두 축 모두 중앙 근처(NEUTRAL_BAND 이내)면 유연 대응러,
 * 아니면 두 축의 부호로 정해지는 사분면 유형이다.
 * 보조(궁합) 유형은 대표 유형을 제외한 나머지 네 프로필 중 축 점수와
 * 유클리드 거리가 가장 가까운 유형이다.
 *
 * 호출 전에 isLowInformationResponse로 걸러야 한다 — 선택이 거의
 * 반복된 응답은 유형을 확정하지 않고 답변 확인을 먼저 안내한다.
 */
export function calculateResult(answers: number[]): ResultOutcome {
  const scores = computeAxisScores(answers);

  const isNeutral =
    Math.abs(scores.focus - AXIS_CENTER) <= NEUTRAL_BAND &&
    Math.abs(scores.engage - AXIS_CENTER) <= NEUTRAL_BAND;
  const primaryId: ResultId = isNeutral ? "balanced" : quadrantResultId(scores);
  const primary = RESULT_BY_ID[primaryId];

  const secondary = RESULTS.filter((result) => result.id !== primaryId)
    .map((result) => ({ result, distance: euclideanDistance(scores, result.profile) }))
    .sort((a, b) => {
      const diff = a.distance - b.distance;
      if (Math.abs(diff) > EPSILON) return diff;
      return TIE_PRIORITY.indexOf(a.result.id) - TIE_PRIORITY.indexOf(b.result.id);
    })[0].result;

  return { primary, secondary, scores };
}
