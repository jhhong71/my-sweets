import { toPng } from "html-to-image";

export const SERVICE_NAME = "말랑 만다라트";

/** 캡처 이미지 배경(투명 영역을 채울 색) — 페이지 배경과 어울리는 톤 */
const CAPTURE_BG = "#FDE7EE";

/**
 * 완성 화면에 보이는 카드(node)를 그대로 PNG로 캡처해 내려받는다.
 * 화면을 캡처하는 방식이므로, 광고·제휴·버튼이 없는 캡처 전용 영역만 node로 넘겨야 한다.
 */
export async function downloadMandalartImage(node: HTMLElement, owner: string): Promise<void> {
  // html-to-image는 SVG foreignObject로 렌더해서 문서에 로드된 웹폰트가 그대로 적용되지 않는다.
  // 카드에 실제로 쓰인 글자만 담은 서브셋을 받아 인라인하면 손글씨 폰트가 이미지에도 남는다.
  // 실패하면 fontEmbedCSS가 ""가 되고, 시스템 한글 폰트로 렌더된다(캡처 자체는 계속된다).
  const fontEmbedCSS = await buildFontEmbedCss(node.innerText);
  const options = {
    backgroundColor: CAPTURE_BG,
    pixelRatio: 2,
    cacheBust: true,
    // fontEmbedCSS를 직접 넘기면 라이브러리가 문서 스타일시트를 읽지 않아 CORS 오류도 생기지 않는다.
    skipFonts: false,
    fontEmbedCSS,
    // 부모에 transform(축소)이 걸려 있어도 원래 크기로 캡처되게 명시한다.
    width: node.offsetWidth,
    height: node.offsetHeight,
  } as const;
  // 첫 호출에서 일부 요소가 누락될 수 있어 한 번 예열한 뒤 캡처한다.
  await toPng(node, options);
  const dataUrl = await toPng(node, options);

  const safeOwner = owner.trim().replace(/[^\p{L}\p{N}_-]/gu, "") || "my";
  const link = document.createElement("a");
  link.download = `mandalart-${safeOwner}.png`;
  link.href = dataUrl;
  link.click();
}

/** 캡처에 쓰는 폰트. index.html에서 불러오는 것과 같은 패밀리여야 한다. */
const FONT_FAMILIES = "family=Gaegu:wght@400;700&family=Gowun+Dodum";

/**
 * 카드에 실제로 등장한 글자만 담은 woff2를 받아 data URI로 인라인한 @font-face CSS를 만든다.
 * Google Fonts의 text= 파라미터 덕분에 한글 전체가 아니라 쓰인 글자만 내려받아 수십 KB로 끝난다.
 * 네트워크가 막혀 있거나 응답이 늦으면 빈 문자열을 돌려주고 캡처는 시스템 폰트로 진행된다.
 */
async function buildFontEmbedCss(text: string): Promise<string> {
  const glyphs = Array.from(new Set(text.replace(/\s/g, ""))).join("");
  if (!glyphs) return "";

  const timeout = new AbortController();
  const timer = window.setTimeout(() => timeout.abort(), 6000);
  try {
    const cssUrl = `https://fonts.googleapis.com/css2?${FONT_FAMILIES}&text=${encodeURIComponent(glyphs)}`;
    const css = await (await fetch(cssUrl, { signal: timeout.signal })).text();

    const urls = [...css.matchAll(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/g)].map((m) => m[1]);
    const inlined = await Promise.all(
      urls.map(async (url) => {
        const buffer = await (await fetch(url, { signal: timeout.signal })).arrayBuffer();
        return [url, `data:font/woff2;base64,${toBase64(buffer)}`] as const;
      }),
    );

    return inlined.reduce((acc, [url, dataUri]) => acc.split(url).join(dataUri), css);
  } catch {
    return "";
  } finally {
    window.clearTimeout(timer);
  }
}

function toBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  // 한 번에 apply 하면 인자 수 제한에 걸리므로 나눠 붙인다.
  for (let i = 0; i < bytes.length; i += 8192) {
    binary += String.fromCharCode(...bytes.subarray(i, i + 8192));
  }
  return btoa(binary);
}

export type ShareOutcome = "shared" | "copied" | "cancelled" | "failed";

/**
 * Web Share API → 클립보드 복사 순으로 폴백한다.
 * 공유에는 서비스 링크와 소개 문구만 담고, 작성한 목표 내용은 보내지 않는다.
 */
export async function shareService(coreGoal: string): Promise<ShareOutcome> {
  const url = new URL(window.location.href);
  url.search = "";
  url.hash = "";
  const link = url.toString();
  const goal = coreGoal.trim();
  const text = goal
    ? `올해 내 목표는 "${goal}". 나도 만다라트 한 장 채워봤어요!`
    : "만다라트 한 장으로 올해 목표를 정리해 보세요!";

  if (navigator.share) {
    try {
      await navigator.share({ title: SERVICE_NAME, text, url: link });
      return "shared";
    } catch (e) {
      if ((e as DOMException)?.name === "AbortError") return "cancelled";
      // 그 밖의 오류는 아래 클립보드 복사로 폴백한다.
    }
  }
  try {
    await navigator.clipboard.writeText(`${text}\n${link}`);
    return "copied";
  } catch {
    return "failed";
  }
}
