import type { ResultProfile } from "../types";
import { toPng } from "html-to-image";

const SERVICE_NAME = "나는 어떤 간식?";

/** 캡처 이미지 배경(투명 영역을 채울 색) — 페이지 배경과 어울리는 웜톤 */
const CAPTURE_BG = "#FCEFE9";

/**
 * 결과 화면에 실제로 보이는 카드(node)를 그대로 PNG로 캡처해 다운로드한다.
 * 이미지를 따로 합성하지 않고 화면을 캡처하므로, 광고·제휴·버튼이 없는
 * 캡처 전용 영역만 node로 전달해야 한다.
 */
export async function downloadResultImage(node: HTMLElement, id: string): Promise<void> {
  // fontEmbedCSS: "" 로 웹폰트 임베딩을 건너뛴다. 크로스오리진 CDN 폰트
  // (Pretendard)의 cssRules 접근이 차단돼 임베딩 시도 시 오류가 나기 때문이며,
  // 저장 이미지에선 시스템 한글 폰트로 렌더된다.
  // 첫 호출에서 이미지 임베딩이 누락될 수 있어 한 번 예열 후 캡처한다.
  const options = {
    backgroundColor: CAPTURE_BG,
    pixelRatio: 2,
    cacheBust: true,
    skipFonts: true,
    fontEmbedCSS: "",
  } as const;
  await toPng(node, options);
  const dataUrl = await toPng(node, options);

  const link = document.createElement("a");
  link.download = `snack-type-${id}.png`;
  link.href = dataUrl;
  link.click();
}

/** Web Share API → 클립보드 복사 순으로 폴백하며 결과를 공유한다. */
export async function shareResult(result: ResultProfile): Promise<"shared" | "copied" | "failed"> {
  const url = new URL(window.location.href);
  url.search = `?result=${result.id}`;
  const text = result.shareText;

  if (navigator.share) {
    try {
      await navigator.share({ title: SERVICE_NAME, text, url: url.toString() });
      return "shared";
    } catch (e) {
      if ((e as DOMException).name === "AbortError") return "failed";
    }
  }
  try {
    await navigator.clipboard.writeText(`${text}\n${url.toString()}`);
    return "copied";
  } catch {
    return "failed";
  }
}
