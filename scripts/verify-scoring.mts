import { QUESTIONS } from "../src/data/questions";
import { computeAxisScores, resolveOutcome } from "../src/lib/scoring";
import { generateResult } from "../src/lib/generate";
import { AXIS_LABELS, AXIS_ORDER } from "../src/lib/axis";
import type { Answers, Axis } from "../src/types";

const N = QUESTIONS.length;
const B = 5;
const TOTAL = B ** N;

// ---- 2) 문항·선택지·축 가중치 ----
console.log("## 2-a) 문항 / 선택지 / 축");
for (const q of QUESTIONS) {
  console.log(`\n${q.id}. ${q.text}`);
  q.choices.forEach((c, i) => console.log(`   ${i}. [${AXIS_LABELS[c.axis]}] ${c.label}`));
}

// 축별 최소/최대 (각 선택지는 자기 축 +1)
const min: Record<string, number> = {};
const max: Record<string, number> = {};
for (const a of AXIS_ORDER) {
  min[a] = 0;
  max[a] = QUESTIONS.filter((q) => q.choices.some((c) => c.axis === a)).length;
}
console.log("\n## 2-b) 축별 원점수 최소/최대 (문항마다 각 축 1회 등장 → 대칭)");
for (const a of AXIS_ORDER) console.log(`  ${AXIS_LABELS[a]}: ${min[a]} ~ ${max[a]}`);

// ---- 전 조합 순회하며 gen 사전계산 ----
const gens: ReturnType<typeof generateResult>[] = new Array(TOTAL);
const rawFreq: Record<string, Map<number, number>> = {};
for (const a of AXIS_ORDER) rawFreq[a] = new Map();
const secondRawFreq = new Map<number, number>();
const diffFreq = new Map<number, number>(); // topRaw - secondRaw
let blended = 0;

const digits = new Array(N).fill(0);
for (let idx = 0; idx < TOTAL; idx++) {
  const answers: Answers = {};
  const raw: Record<string, number> = {};
  for (const a of AXIS_ORDER) raw[a] = 0;
  for (let i = 0; i < N; i++) {
    answers[QUESTIONS[i].id] = digits[i];
    raw[QUESTIONS[i].choices[digits[i]].axis]++;
  }
  const scores = computeAxisScores(answers);
  const outcome = resolveOutcome(scores);
  const gen = generateResult(outcome.primary.id, scores);
  gens[idx] = gen;
  for (const a of AXIS_ORDER) rawFreq[a].set(raw[a], (rawFreq[a].get(raw[a]) || 0) + 1);
  // top/second raw among axes
  const sortedRaw = AXIS_ORDER.map((a) => raw[a]).sort((x, y) => y - x);
  secondRawFreq.set(sortedRaw[1], (secondRawFreq.get(sortedRaw[1]) || 0) + 1);
  diffFreq.set(sortedRaw[0] - sortedRaw[1], (diffFreq.get(sortedRaw[0] - sortedRaw[1]) || 0) + 1);
  if (gen.blended) blended++;
  // next digits (base-5)
  let k = N - 1;
  while (k >= 0) {
    digits[k]++;
    if (digits[k] < B) break;
    digits[k] = 0;
    k--;
  }
}

const pct = (c: number) => ((c / TOTAL) * 100).toFixed(1) + "%";

console.log("\n## 2-c) 축별 가능한 원점수 종류·빈도 (점수 해상도)");
for (const a of AXIS_ORDER) {
  const entries = [...rawFreq[a].entries()].sort((x, y) => x[0] - y[0]);
  console.log(`  ${AXIS_LABELS[a]} (${entries.length}단계): ` + entries.map(([v, c]) => `${v}점 ${pct(c)}`).join(" · "));
}

console.log("\n## 2-d) '두 번째로 높은 축'의 원점수 분포 (강도 단계 근거)");
for (const [v, c] of [...secondRawFreq.entries()].sort((x, y) => x[0] - y[0])) {
  console.log(`  2위 축 = ${v}점 : ${pct(c)}`);
}

console.log("\n## 4) 최상위-2위 원점수 차이 분포 (혼합형 원인)");
for (const [v, c] of [...diffFreq.entries()].sort((x, y) => x[0] - y[0])) {
  console.log(`  차이 ${v}점 : ${pct(c)}` + (v === 0 ? "  ← 혼합형(동점)" : ""));
}
console.log(`  => 혼합형 합계: ${pct(blended)}  (원점수 1단계 = ${(100 / max[AXIS_ORDER[0]]).toFixed(1)}점 상당이라, 5점 미만 기준은 사실상 동점만 잡음)`);

// ---- 3) 전체 1문항 인접 변경 안정성 ----
console.log("\n## 3) 전체 1문항 변경 인접 안정성 (78,125 × 7문항 × 4대안)");
let cmp = 0, baseChg = 0, secChg = 0, titleChg = 0, flavorChg = 0, imgChg = 0, twoStep = 0;
const rank = (v: string) => (v === "moderate" ? 0 : v === "strong" ? 1 : 2);
const pow5 = [1];
for (let i = 1; i < N; i++) pow5[i] = pow5[i - 1] * B;
// digit at position i has place value pow5[N-1-i]
for (let idx = 0; idx < TOTAL; idx++) {
  // recover digits of idx
  let rem = idx;
  const d = new Array(N);
  for (let i = 0; i < N; i++) { const place = pow5[N - 1 - i]; d[i] = Math.floor(rem / place) % B; }
  const g0 = gens[idx];
  for (let i = 0; i < N; i++) {
    const place = pow5[N - 1 - i];
    for (let alt = 0; alt < B; alt++) {
      if (alt === d[i]) continue;
      const nIdx = idx + (alt - d[i]) * place;
      const g1 = gens[nIdx];
      cmp++;
      if (g0.baseSnack !== g1.baseSnack) baseChg++;
      if (g0.secondaryTrait !== g1.secondaryTrait) secChg++;
      if (g0.title !== g1.title) titleChg++;
      if (g0.flavor !== g1.flavor) flavorChg++;
      if (g0.imageKey !== g1.imageKey) imgChg++;
      if (Math.abs(rank(g0.intensity) - rank(g1.intensity)) >= 2) twoStep++;
    }
  }
}
const p = (c: number) => ((c / cmp) * 100).toFixed(1) + "%";
console.log(`  비교 쌍: ${cmp.toLocaleString()}`);
console.log(`  기본 간식 변경률   : ${p(baseChg)}`);
console.log(`  두 번째 축 변경률  : ${p(secChg)}`);
console.log(`  결과 제목 변경률   : ${p(titleChg)}`);
console.log(`  맛 변경률          : ${p(flavorChg)}`);
console.log(`  이미지(키) 변경률  : ${p(imgChg)}`);
console.log(`  강도 2단계 이상 점프: ${p(twoStep)}`);
