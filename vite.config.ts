import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { TEST_CONFIG, SERVICE } from "./src/config";
import { LEAD, SEO_SECTIONS } from "./src/data/seoContent";

/** 빌드 시 초기 HTML에 핵심 SEO 콘텐츠(H1·소개·정적 섹션)를 심고 카운트를 주입한다. */
function seoHtmlPlugin(): Plugin {
  const { about, how } = SEO_SECTIONS;
  const prerender = `<main class="screen start-screen">
<h1 class="start-title"><span class="start-eyebrow">${SERVICE.fullName}</span><strong class="start-headline">나는 어떤 간식일까?</strong></h1>
<p class="start-lead">${LEAD.short}</p>
<section class="info-block" id="${about.id}"><h2 class="info-h">${about.title}</h2>${about.paragraphs.map((p) => `<p class="info-p">${p}</p>`).join("")}</section>
<section class="info-block" id="${how.id}"><h2 class="info-h">${how.title}</h2><ol class="how-list">${how.steps.map((s) => `<li>${s}</li>`).join("")}</ol></section>
</main>`;

  return {
    name: "seo-html",
    transformIndexHtml(html) {
      return html
        .replace(/%RESULT_COUNT%/g, String(TEST_CONFIG.resultCount))
        .replace(/%QUESTION_COUNT%/g, String(TEST_CONFIG.questionCount))
        .replace(/%FLAVOR_COUNT%/g, String(TEST_CONFIG.flavorCount))
        .replace("<!--PRERENDER-->", prerender);
    },
  };
}

export default defineConfig({
  // 상대 경로로 에셋을 참조해 루트/하위 경로/파일 열기에서 모두 이미지·스크립트가 로드되게 한다.
  base: "./",
  plugins: [react(), seoHtmlPlugin()],
  server: {
    port: 5180,
  },
});
