import { QUESTIONS } from "../src/data/questions";
import { scoreAnswers, TRAIT_SNACK } from "../src/lib/scoring";
import { generateResult, intensityFromRaw } from "../src/lib/generate";
import { ALL_IMAGE_KEYS, SNACK_AXIS } from "../src/data/generation";
import { AXIS_LABELS, AXIS_ORDER } from "../src/lib/axis";
import type { Answers, Axis } from "../src/types";

const AXES = AXIS_ORDER;
const traitQ: Record<string, typeof QUESTIONS> = {};
for (const a of AXES) traitQ[a] = QUESTIONS.filter((q) => q.trait === a);

const genFrom = (answers: Answers) => {
  const o = scoreAnswers(answers)!;
  const g = generateResult(o.primaryTrait, o.secondaryTrait, o.rawScores[o.secondaryTrait]);
  return { o, g };
};

console.log("## 트레잇→기본 간식 매핑");
for (const s of Object.keys(SNACK_AXIS)) console.log(`  ${AXIS_LABELS[SNACK_AXIS[s as keyof typeof SNACK_AXIS]]} → ${s}`);

// A) 한 성향(3문항) 원점수 0~9 분포 (4^3=64 전수, 모든 성향 동일 구조)
console.log("\n## A) 성향 원점수(0~9) 분포 — 3문항 4^3=64 전수");
{
  const qs = traitQ["extravert"]; // 대표로 하나 (구조상 모두 동일 형태)
  const freq = new Map<number, number>();
  const idx = [0, 0, 0];
  for (let n = 0; n < 64; n++) {
    const raw = qs[0].options[idx[0]].score + qs[1].options[idx[1]].score + qs[2].options[idx[2]].score;
    freq.set(raw, (freq.get(raw) || 0) + 1);
    let k = 2; while (k >= 0) { idx[k]++; if (idx[k] < 4) break; idx[k] = 0; k--; }
  }
  const line = [...freq.entries()].sort((a, b) => a[0] - b[0]).map(([v, c]) => `${v}점 ${((c / 64) * 100).toFixed(0)}%`).join(" · ");
  console.log("  " + line + `  (고유 점수 ${freq.size}종)`);
}

// C) 무작위 응답 시뮬레이션 (재현 가능한 시드)
let seed = 20260725;
const rnd = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
const N = 200000;
const snackCnt: Record<string, number> = {};
const secCnt: Record<string, number> = {};
const intCnt: Record<string, number> = { moderate: 0, strong: 0, veryStrong: 0 };
const secondRawFreq = new Map<number, number>();
let tieTop = 0;
let fallback = 0;
const imgSet = new Set(ALL_IMAGE_KEYS);
for (let i = 0; i < N; i++) {
  const a: Answers = {};
  for (const q of QUESTIONS) a[q.id] = Math.floor(rnd() * 4);
  const { o, g } = genFrom(a);
  snackCnt[g.baseSnack] = (snackCnt[g.baseSnack] || 0) + 1;
  secCnt[g.secondaryTrait] = (secCnt[g.secondaryTrait] || 0) + 1;
  intCnt[g.intensity]++;
  secondRawFreq.set(o.rawScores[o.secondaryTrait], (secondRawFreq.get(o.rawScores[o.secondaryTrait]) || 0) + 1);
  if (o.rawScores[o.primaryTrait] === o.rawScores[o.secondaryTrait]) tieTop++;
  if (!imgSet.has(g.imageKey)) fallback++;
}
const P = (c: number) => ((c / N) * 100).toFixed(1) + "%";
console.log(`\n## C) 무작위 응답 ${N.toLocaleString()}건 시뮬레이션`);
console.log("  기본 간식 분포:");
for (const s of Object.keys(SNACK_AXIS)) console.log(`    ${s.padEnd(12)} ${P(snackCnt[s] || 0)}`);
console.log("  2위 성향(수식어) 분포:");
for (const a of AXES) console.log(`    ${AXIS_LABELS[a].padEnd(6)} ${P(secCnt[a] || 0)}`);
console.log("  강도 분포: " + Object.entries(intCnt).map(([k, v]) => `${k} ${P(v)}`).join(" · "));
console.log("  2위 성향 원점수 분포: " + [...secondRawFreq.entries()].sort((a, b) => a[0] - b[0]).map(([v, c]) => `${v}점 ${P(c)}`).join(" · "));
console.log(`  1·2위 원점수 동점률: ${P(tieTop)}`);
console.log(`  정상 결과 fallback 발생: ${fallback}건`);

// B) 전수 점수벡터 커버리지 10^5 (argmax, 축순 동점처리 — 커버리지 확인용)
console.log("\n## B) 점수벡터 10^5 커버리지 (기본 간식 도달)");
{
  const cover: Record<string, number> = {};
  const raw: Record<Axis, number> = {} as any;
  const v = [0, 0, 0, 0, 0];
  let ties = 0;
  for (let n = 0; n < 100000; n++) {
    AXES.forEach((a, i) => (raw[a] = v[i]));
    const sorted = [...AXES].sort((x, y) => raw[y] - raw[x] || AXES.indexOf(x) - AXES.indexOf(y));
    const base = TRAIT_SNACK[sorted[0]];
    cover[base] = (cover[base] || 0) + 1;
    if (raw[sorted[0]] === raw[sorted[1]]) ties++;
    let k = 4; while (k >= 0) { v[k]++; if (v[k] < 10) break; v[k] = 0; k--; }
  }
  console.log("  " + Object.keys(SNACK_AXIS).map((s) => `${s} ${cover[s] || 0}`).join(" · "));
  console.log(`  1·2위 동점 벡터: ${((ties / 100000) * 100).toFixed(1)}% (모든 간식 도달=${Object.keys(cover).length === 5})`);
}

// D) 인접 안정성 (표본 40000 응답 × 15문항 × 3대안)
console.log("\n## D) 인접 안정성 (표본 40,000 × 15 × 3)");
{
  let cmp = 0, baseC = 0, secC = 0, titleC = 0, flavC = 0, imgC = 0, twoStep = 0;
  const rank = (v: string) => (v === "moderate" ? 0 : v === "strong" ? 1 : 2);
  seed = 777;
  for (let i = 0; i < 40000; i++) {
    const a: Answers = {};
    for (const q of QUESTIONS) a[q.id] = Math.floor(rnd() * 4);
    const g0 = genFrom(a).g;
    for (const q of QUESTIONS) {
      const orig = a[q.id]!;
      for (let alt = 0; alt < 4; alt++) {
        if (alt === orig) continue;
        a[q.id] = alt;
        const g1 = genFrom(a).g;
        cmp++;
        if (g0.baseSnack !== g1.baseSnack) baseC++;
        if (g0.secondaryTrait !== g1.secondaryTrait) secC++;
        if (g0.title !== g1.title) titleC++;
        if (g0.flavor !== g1.flavor) flavC++;
        if (g0.imageKey !== g1.imageKey) imgC++;
        if (Math.abs(rank(g0.intensity) - rank(g1.intensity)) >= 2) twoStep++;
      }
      a[q.id] = orig;
    }
  }
  const p = (c: number) => ((c / cmp) * 100).toFixed(1) + "%";
  console.log(`  비교 쌍: ${cmp.toLocaleString()}`);
  console.log(`  기본 간식 변경률 : ${p(baseC)}   (이전 구조 39.9%)`);
  console.log(`  2위 성향 변경률  : ${p(secC)}`);
  console.log(`  제목 변경률      : ${p(titleC)}`);
  console.log(`  맛 변경률        : ${p(flavC)}`);
  console.log(`  이미지 변경률    : ${p(imgC)}`);
  console.log(`  강도 2단계 점프  : ${p(twoStep)}`);
}
