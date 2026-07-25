import { QUESTIONS } from "../src/data/questions";
import { computeAxisScores, resolveOutcome } from "../src/lib/scoring";
import { generateResult } from "../src/lib/generate";
import { FLAVORS } from "../src/data/generation";
import type { Answers, Axis, ResultId } from "../src/types";

const SNACKS: ResultId[] = ["chocolate", "candy", "biscuit", "marshmallow", "pudding"];
const AXES: Axis[] = ["open", "conscientious", "extravert", "agreeable", "stable"];
const GENERATED_IMAGES: Record<string, string> = {}; // 실제 등록소는 비어 있음(런타임과 동일)

const perSnackTitles: Record<string, Set<string>> = {};
SNACKS.forEach((s) => (perSnackTitles[s] = new Set()));
const snackCount: Record<string, number> = {};
SNACKS.forEach((s) => (snackCount[s] = 0));
const modifierAxisCount: Record<string, number> = {};
AXES.forEach((a) => (modifierAxisCount[a] = 0));
const imageKeys = new Set<string>();
const titleToTraits = new Map<string, Set<string>>();
let blendedCount = 0;
let total = 0;

const n = QUESTIONS.length;
const counts = new Array(n).fill(0);
while (true) {
  const answers: Answers = {};
  for (let i = 0; i < n; i++) answers[QUESTIONS[i].id] = counts[i];
  const scores = computeAxisScores(answers);
  const outcome = resolveOutcome(scores);
  const gen = generateResult(outcome.primary.id, scores);
  total++;
  snackCount[gen.baseSnack]++;
  modifierAxisCount[gen.secondaryTrait]++;
  perSnackTitles[gen.baseSnack].add(gen.title);
  imageKeys.add(gen.imageKey);
  if (gen.blended) blendedCount++;
  if (!titleToTraits.has(gen.title)) titleToTraits.set(gen.title, new Set());
  titleToTraits.get(gen.title)!.add(`${gen.baseSnack}/${gen.secondaryTrait}`);
  let k = n - 1;
  while (k >= 0) {
    counts[k]++;
    if (counts[k] < 5) break;
    counts[k] = 0;
    k--;
  }
  if (k < 0) break;
}

const pct = (c: number) => ((c / total) * 100).toFixed(1) + "%";

console.log(`# 전체 조합 ${total} (blended ${blendedCount}, ${pct(blendedCount)})\n`);

console.log("## 1) 간식별 생성 결과명");
for (const s of SNACKS) {
  const list = [...perSnackTitles[s]].sort();
  console.log(`\n[${s}] ${list.length}종`);
  list.forEach((t) => console.log("  - " + t));
}

console.log("\n## 4) 기본 간식별 결과 개수(도달 비율)");
for (const s of SNACKS) console.log(`  ${s.padEnd(12)} ${String(snackCount[s]).padStart(6)}  ${pct(snackCount[s])}  (제목 ${perSnackTitles[s].size}종)`);

console.log("\n## 5) 수식어로 선택된 성향 축 횟수");
for (const a of AXES) console.log(`  ${a.padEnd(14)} ${String(modifierAxisCount[a]).padStart(6)}  ${pct(modifierAxisCount[a])}`);

console.log("\n## 2) 동일/거의 동일 결과명 점검");
const collisions = [...titleToTraits.entries()].filter(([, set]) => set.size > 1);
console.log(`  서로 다른 (간식/축)이 같은 제목을 만든 경우: ${collisions.length}건`);
collisions.forEach(([t, set]) => console.log(`   ! "${t}" ← ${[...set].join(", ")}`));
const allTitles = [...titleToTraits.keys()];
console.log(`  전체 고유 제목 수: ${allTitles.length}`);

console.log("\n## 7) 이미지 키");
const missing = [...imageKeys].filter((k) => !(k in GENERATED_IMAGES)).sort();
console.log(`  사용된 고유 imageKey ${imageKeys.size}종 / 전용 이미지 등록 ${Object.keys(GENERATED_IMAGES).length}종`);
console.log(`  누락(→기본 간식 이미지로 fallback) ${missing.length}종:`);
console.log("   " + missing.join(", "));

console.log("\n## 6) 한 문항 변경 전후 비교 (q4만 변경)");
const base: Answers = {};
QUESTIONS.forEach((q, i) => (base[q.id] = [2, 0, 3, 1, 1, 4, 3][i])); // 임의 기준 응답
for (let alt = 0; alt < 5; alt++) {
  const a: Answers = { ...base, q4: alt };
  const sc = computeAxisScores(a);
  const oc = resolveOutcome(sc);
  const g = generateResult(oc.primary.id, sc);
  const mark = alt === base.q4 ? " (기준)" : "";
  console.log(`  q4=${alt} (${QUESTIONS[3].choices[alt].axis.padEnd(14)}) → ${g.title}${mark}`);
}

console.log("\n## 3) 어색 조합 자동 점검(맛×간식 화이트리스트 위반)");
let bad = 0;
for (const s of SNACKS) {
  const allowed = new Set(Object.values(FLAVORS[s]).flat());
  for (const t of perSnackTitles[s]) {
    // 제목 = "수식어 맛 간식"; 맛이 해당 간식 허용목록에 있는지 확인
    const okFlavor = [...allowed].some((f) => t.includes(` ${f} `) || t.includes(` ${f}${""}`));
    if (!okFlavor) {
      bad++;
      console.log(`   ! ${s}: ${t}`);
    }
  }
}
console.log(`  화이트리스트 위반: ${bad}건 (0이면 사전 검증된 맛만 사용)`);
