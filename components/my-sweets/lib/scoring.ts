import type { Answers, Axis, AxisScores, ResultId, ScoreOutcome } from "../types";
import { QUESTIONS, REP_QUESTION } from "../data/questions";
import { RESULTS } from "../data/results";
import { SNACK_AXIS } from "../data/generation";
import { AXIS_ORDER } from "./axis";

/** 성향 → 기본 간식 (SNACK_AXIS의 역매핑) */
export const TRAIT_SNACK = Object.fromEntries(
  (Object.keys(SNACK_AXIS) as ResultId[]).map((s) => [SNACK_AXIS[s], s]),
) as Record<Axis, ResultId>;

const QUESTION_BY_ID = Object.fromEntries(QUESTIONS.map((q) => [q.id, q]));

function emptyScores(): AxisScores {
  return Object.fromEntries(AXIS_ORDER.map((a) => [a, 0])) as AxisScores;
}

/** 모든 문항에 유효한 선택지 인덱스가 있는지 확인한다. */
export function isComplete(answers: Answers): boolean {
  return QUESTIONS.every((q) => {
    const idx = answers[q.id];
    return idx != null && idx >= 0 && idx < q.options.length;
  });
}

/** 성향별 원점수(0~9). 각 성향 문항 3개의 선택 점수(0~3)를 합산한다. */
export function computeRawScores(answers: Answers): AxisScores {
  const raw = emptyScores();
  for (const q of QUESTIONS) {
    const idx = answers[q.id];
    if (idx == null || idx < 0 || idx >= q.options.length) {
      throw new Error(`미응답/잘못된 응답 문항: ${q.id}`);
    }
    raw[q.trait] += q.options[idx].score;
  }
  return raw;
}

/** 원점수(0~9)를 0~100으로 환산. 다섯 성향은 서로 독립적이다. */
export function normalize(raw: AxisScores): AxisScores {
  const norm = emptyScores();
  for (const a of AXIS_ORDER) norm[a] = Math.round((raw[a] / 9) * 100);
  return norm;
}

/** 하위 호환용: 정규화 점수(0~100)를 반환. */
export function computeAxisScores(answers: Answers): AxisScores {
  return normalize(computeRawScores(answers));
}

/** 대표 문항에서 해당 성향이 받은 점수(동점 처리용). */
function repScore(trait: Axis, answers: Answers): number {
  const q = QUESTION_BY_ID[REP_QUESTION[trait]];
  const idx = answers[q.id];
  return idx == null ? -1 : q.options[idx].score;
}

/**
 * 성향을 점수 내림차순으로 정렬한다.
 * 동점이면 (1) 대표 문항 점수, (2) 그래도 같으면 AXIS_ORDER 고정 순서로 결정한다.
 * 같은 응답이면 항상 같은 순서가 나온다(무작위 없음).
 */
export function rankTraits(raw: AxisScores, answers: Answers): Axis[] {
  return [...AXIS_ORDER].sort((a, b) => {
    if (raw[b] !== raw[a]) return raw[b] - raw[a];
    const rep = repScore(b, answers) - repScore(a, answers);
    if (rep !== 0) return rep;
    return AXIS_ORDER.indexOf(a) - AXIS_ORDER.indexOf(b);
  });
}

/** 정규화 점수 기준 순위(화면 막대 정렬용). */
export function rankedAxes(scores: AxisScores): Axis[] {
  return [...AXIS_ORDER].sort((a, b) => {
    if (scores[b] !== scores[a]) return scores[b] - scores[a];
    return AXIS_ORDER.indexOf(a) - AXIS_ORDER.indexOf(b);
  });
}

/** 응답 → 최종 결과. 미완성이면 null. */
export function scoreAnswers(answers: Answers): ScoreOutcome | null {
  if (!isComplete(answers)) return null;
  const rawScores = computeRawScores(answers);
  const scores = normalize(rawScores);
  const ranked = rankTraits(rawScores, answers);
  const primaryTrait = ranked[0];
  const secondaryTrait = ranked[1];
  return {
    scores,
    rawScores,
    primaryTrait,
    secondaryTrait,
    primary: RESULTS[TRAIT_SNACK[primaryTrait]],
    secondary: RESULTS[TRAIT_SNACK[secondaryTrait]],
  };
}
