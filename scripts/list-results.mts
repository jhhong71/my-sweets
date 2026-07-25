import { generateResult } from "../src/lib/generate";
import { SNACK_AXIS, ALL_IMAGE_KEYS } from "../src/data/generation";
import { AXIS_LABELS, AXIS_ORDER } from "../src/lib/axis";
import type { Axis, ResultId } from "../src/types";
import { writeFileSync } from "node:fs";

const SNACKS = Object.keys(SNACK_AXIS) as ResultId[];
// 강도 2단계: moderate(원점수5 대표) / strong(원점수8 대표)
const INTENSITY_RAW = { moderate: 5, strong: 8 };

type Row = {
  title: string; baseSnack: ResultId; primaryTrait: string; secondaryTrait: string;
  intensity: string; modifier: string; flavor: string; imageKey: string;
};
const rows: Row[] = [];
for (const snack of SNACKS) {
  const primaryTrait = SNACK_AXIS[snack];
  for (const secondaryTrait of AXIS_ORDER.filter((a) => a !== primaryTrait)) {
    for (const [intensity, raw] of Object.entries(INTENSITY_RAW)) {
      const g = generateResult(primaryTrait, secondaryTrait as Axis, raw);
      rows.push({
        title: g.title, baseSnack: g.baseSnack,
        primaryTrait: AXIS_LABELS[g.primaryTrait], secondaryTrait: AXIS_LABELS[g.secondaryTrait],
        intensity: g.intensity, modifier: g.modifier, flavor: g.flavor, imageKey: g.imageKey,
      });
    }
  }
}

console.log(`## 전체 생성 결과명 ${rows.length}종 (5간식 × 4보조성향 × 2강도)\n`);
for (const snack of SNACKS) {
  console.log(`[${snack}]`);
  rows.filter((r) => r.baseSnack === snack).forEach((r) =>
    console.log(`  ${r.title}  ·  2위:${r.secondaryTrait}/${r.intensity}  ·  ${r.imageKey}`));
  console.log();
}

// CSV + JSON 저장
const header = "title,baseSnack,primaryTrait,secondaryTrait,intensity,modifier,flavor,imageKey";
const csv = [header, ...rows.map((r) => [r.title, r.baseSnack, r.primaryTrait, r.secondaryTrait, r.intensity, r.modifier, r.flavor, r.imageKey].join(","))].join("\n");
writeFileSync("scripts/results.csv", csv, "utf8");
writeFileSync("scripts/results.json", JSON.stringify(rows, null, 2), "utf8");

// 어색·중복 점검
const titles = rows.map((r) => r.title);
const dup = titles.filter((t, i) => titles.indexOf(t) !== i);
console.log(`중복 제목: ${dup.length}건 ${dup.length ? "→ " + [...new Set(dup)].join(", ") : ""}`);

// 이미지 키 커버리지
const used = new Set(rows.map((r) => r.imageKey));
const missingAssets = ALL_IMAGE_KEYS.filter((k) => !used.has(k));
console.log(`\n## imageKey 커버리지: 결과가 사용하는 키 ${used.size}종 / 정의된 키 ${ALL_IMAGE_KEYS.length}종`);
console.log(`  결과에 안 쓰이는 정의 키: ${missingAssets.length}건 ${missingAssets.join(", ")}`);
console.log(`\n## 필요한 이미지 파일 15종 (assets-src 그리드에서 잘라 연결):`);
console.log("  " + ALL_IMAGE_KEYS.join(", "));
console.log("\n(scripts/results.csv, scripts/results.json 저장 완료)");
