import { TEST_CONFIG } from "../src/config";
import { QUESTIONS } from "../src/data/questions";
import { ALL_IMAGE_KEYS, SNACK_AXIS } from "../src/data/generation";
import { generateResult } from "../src/lib/generate";
import { AXIS_ORDER } from "../src/lib/axis";
import type { Axis, ResultId } from "../src/types";

// 실제 생성 가능한 고유 결과명 수
const titles = new Set<string>();
const imgKeys = new Set<string>();
for (const snack of Object.keys(SNACK_AXIS) as ResultId[]) {
  const primary = SNACK_AXIS[snack];
  for (const second of AXIS_ORDER.filter((a) => a !== primary)) {
    for (const raw of [5, 8]) {
      const g = generateResult(primary, second as Axis, raw);
      titles.add(g.title);
      imgKeys.add(g.imageKey);
    }
  }
}
const fallbackMissing = [...imgKeys].filter((k) => !ALL_IMAGE_KEYS.includes(k));

const rows = [
  ["questionCount", TEST_CONFIG.questionCount, QUESTIONS.length],
  ["flavorCount", TEST_CONFIG.flavorCount, ALL_IMAGE_KEYS.length],
  ["resultCount", TEST_CONFIG.resultCount, titles.size],
];
console.log("항목            설정값  실제값  일치");
for (const [name, cfg, actual] of rows) {
  console.log(`${String(name).padEnd(15)} ${String(cfg).padStart(5)}  ${String(actual).padStart(5)}   ${cfg === actual ? "✓" : "✗ 불일치"}`);
}
console.log(`정상 결과 imageKey fallback: ${fallbackMissing.length}건`);
