import type { Answers, Axis, AxisScores, ScoreOutcome } from "../types";
import { QUESTIONS } from "../data/questions";
import { RESULTS, RESULT_ORDER } from "../data/results";
import { AXIS_ORDER } from "./axis";

function emptyScores(): AxisScores {
  return Object.fromEntries(AXIS_ORDER.map((a) => [a, 0])) as AxisScores;
}

/**
 * 각 축의 이론적 최소/최대 원점수.
 * 선택지는 자기 축에 1점을 준다. 한 문항에 특정 축 선택지가 있으면 그 문항에서
 * 해당 축은 0 또는 1점이므로, 최대치는 그 축을 포함한 문항 수와 같다.
 */
const AXIS_MIN: AxisScores = emptyScores();
const AXIS_MAX: AxisScores = emptyScores();
for (const q of QUESTIONS) {
  for (const axis of AXIS_ORDER) {
    if (q.choices.some((c) => c.axis === axis)) AXIS_MAX[axis] += 1;
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
 * 선택한 축에 1점씩 합산한 뒤 축별 최소~최대 범위로 1~5 정규화한다.
 * 미응답이 있으면 예외를 던진다(호출 전 isComplete로 가드).
 */
export function computeAxisScores(answers: Answers): AxisScores {
  const raw = emptyScores();

  for (const q of QUESTIONS) {
    const idx = answers[q.id];
    if (idx == null || idx < 0 || idx >= q.choices.length) {
      throw new Error(`미응답/잘못된 응답 문항: ${q.id}`);
    }
    raw[q.choices[idx].axis] += 1;
  }

  const norm = emptyScores();
  for (const axis of AXIS_ORDER) {
    const span = AXIS_MAX[axis] - AXIS_MIN[axis];
    norm[axis] = span === 0 ? 3 : 1 + (4 * (raw[axis] - AXIS_MIN[axis])) / span;
  }
  return norm;
}

/** 두 축 좌표 사이의 유클리드 거리 (전체 축) */
function distance(a: AxisScores, b: AxisScores): number {
  let sum = 0;
  for (const axis of AXIS_ORDER) {
    const d = a[axis] - b[axis];
    sum += d * d;
  }
  return Math.sqrt(sum);
}

/** FNV-1a 해시 (결정적) — 동점 처리를 특정 결과에 치우치지 않게 분배한다. */
function hashStr(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/**
 * 축 점수를 기준 프로필과 거리 비교해 대표/보조 결과를 정한다.
 * 거리가 같은 경우(여러 축이 공동 최고 등)는 응답 기반 해시로 공평하게
 * 순서를 정한다 — 무작위가 아니라 같은 응답이면 항상 같은 결과가 나온다.
 */
export function resolveOutcome(scores: AxisScores): ScoreOutcome {
  const key = AXIS_ORDER.map((a) => scores[a].toFixed(3)).join(",");
  const ranked = [...RESULT_ORDER]
    .map((id) => ({ id, dist: distance(scores, RESULTS[id].profile) }))
    .sort((a, b) => {
      const diff = a.dist - b.dist;
      if (Math.abs(diff) > 1e-9) return diff;
      return hashStr(`${a.id}|${key}`) - hashStr(`${b.id}|${key}`);
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
