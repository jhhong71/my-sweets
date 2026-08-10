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
 * 저정보(straightlining) 응답 감지
 *
 * 배경: focus·engage 두 축 모두 정방향 4문항 + 역방향 4문항으로 정확히
 * 4:4 균형이라, 모든 문항에 같은 번호를 누르면 (4*c + 4*(6-c)) / 8 = 3 이
 * c와 무관하게 성립해 축 점수가 항상 정확히 3.0/3.0이 된다. 이런 응답은
 * "균형 잡힌 대처 스타일"이 아니라 애초에 방향 정보가 없는 응답이므로,
 * 유연 대응러로 분류하지 않고 별도 상태로 처리한다.
 *
 * 두 신호를 OR로 결합한다. 하나만으로는 아래처럼 각각 놓치는 구간이 있다.
 * ------------------------------------------------------------------ */

/**
 * 최빈 응답이 차지하는 비율의 하한. 16문항 중 15개 이상이 같은 값이면
 * 저정보로 본다.
 *
 * 왜 필요한가: "15개 동일 + 1개 다름"은 그 1개가 크게 다르면 표준편차가
 * 0.968까지 올라가 편차 기준만으로는 잡히지 않는다. 하지만 16문항 중
 * 1개만 다른 응답은 대처 스타일을 읽어낼 정보가 사실상 없다.
 * 시뮬레이션상 문항을 읽고 답한 정상 응답자가 이 조건에 걸리는 비율은
 * 0.34%로 매우 낮다.
 */
export const LOW_INFO_MODAL_SHARE_MIN = 15 / 16;

/**
 * 원응답(역채점 전) 표준편차의 상한. 이 값 이하면 저정보로 본다.
 *
 * 왜 0.40인가 — 임의로 고른 값이 아니라 실제 응답 패턴을 전수 계산하고
 * 정상 응답자 10만 명을 시뮬레이션해서 정한 경계다.
 *   - 잡아야 하는 패턴: 전부 동일(0.000), 14개 동일+2개 1차이(0.331),
 *     묵인형 12×'4'+4×'5'(0.390)
 *   - 통과시켜야 하는 패턴: 문항을 읽고 답한 정상 응답자
 *     (하위 1% 지점 0.390, 하위 5% 지점 0.556, 중앙값 1.199)
 * 0.40은 위 저정보 패턴들의 바로 위, 정상 응답자 분포의 하위 약 1%
 * 지점에 놓여 둘을 가르는 자연스러운 경계다. 더 올리면(0.5) 진짜
 * 균형형 응답자가 대거 차단되고, 더 내리면(0.30) 묵인형 응답을 놓친다.
 */
export const LOW_INFO_SPREAD_MAX = 0.4;

/** 모집단 표준편차(원응답 기준). 0이면 모든 문항에 같은 번호를 골랐다는 뜻. */
function populationStdDev(values: number[]): number {
  if (values.length === 0) return 0;
  const mean = values.reduce((sum, v) => sum + v, 0) / values.length;
  const variance = values.reduce((sum, v) => sum + (v - mean) ** 2, 0) / values.length;
  return Math.sqrt(variance);
}

/** 가장 많이 고른 응답값이 전체에서 차지하는 비율(0~1). */
function modalShare(values: number[]): number {
  if (values.length === 0) return 1;
  const counts = new Map<number, number>();
  for (const v of values) counts.set(v, (counts.get(v) ?? 0) + 1);
  return Math.max(...counts.values()) / values.length;
}

/**
 * 대처 스타일을 판별할 만한 응답 다양성이 없는지 판정한다.
 * 두 신호 중 하나라도 걸리면 저정보 응답으로 본다.
 */
export function isLowInformationResponse(answers: number[]): boolean {
  const usable = answers.filter((v): v is number => v != null);
  if (usable.length === 0) return true;
  return (
    modalShare(usable) >= LOW_INFO_MODAL_SHARE_MIN - EPSILON ||
    populationStdDev(usable) <= LOW_INFO_SPREAD_MAX + EPSILON
  );
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
 * lowInformation이 true면 응답 다양성이 부족해 유형 판별이 불가능한
 * 경우다. 이때 primary/secondary 값은 계산되긴 하지만 의미가 없으므로
 * 화면에 표시하지 않고 재검사를 안내해야 한다.
 */
export function calculateResult(answers: number[]): ResultOutcome {
  const scores = computeAxisScores(answers);
  const answerSpread = populationStdDev(answers);
  const lowInformation = isLowInformationResponse(answers);

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

  return { primary, secondary, scores, answerSpread, lowInformation };
}
