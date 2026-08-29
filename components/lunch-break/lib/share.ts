import type { ResultProfile } from "../types";
import { toPng } from "html-to-image";

export const SERVICE_NAME = "내 점심시간은 어떤 스타일?";

/** 캡처 이미지 배경(투명 영역을 채울 색) — 페이지 배경과 어울리는 톤 */
const CAPTURE_BG = "#FDEEDE";

/**
 * 결과 화면에 실제로 보이는 카드(node)를 그대로 PNG로 캡처해 다운로드한다.
 * 화면을 캡처하는 방식이므로, 광고·제휴·버튼이 없는 캡처 전용 영역만 node로 넘겨야 한다.
 */
export async function downloadResultImage(node: HTMLElement, id: string): Promise<void> {
  // 크로스오리진 CDN 웹폰트(Pretendard)는 cssRules 접근이 막혀 임베딩 시 오류가 난다.
  // 폰트 임베딩을 건너뛰고 시스템 한글 폰트로 렌더한다.
  // 첫 호출에서 일부 요소가 누락될 수 있어 한 번 예열한 뒤 캡처한다.
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
  link.download = `lunch-break-type-${id}.png`;
  link.href = dataUrl;
  link.click();
}

/** 결과 공유 링크(유형 ID만 포함, 개인 응답은 담지 않는다) */
export function shareUrl(result: ResultProfile): string {
  const url = new URL(window.location.href);
  url.search = `?result=${result.id}`;
  url.hash = "";
  return url.toString();
}

export type ShareOutcome = "shared" | "copied" | "cancelled" | "failed";

/**
 * Web Share API → 클립보드 복사 순으로 폴백하며 결과를 공유한다.
 * 사용자가 공유 창을 닫은 경우(AbortError)는 오류가 아니라 "cancelled"로 구분해,
 * 실패 안내가 뜨지 않게 한다.
 */
export async function shareResult(result: ResultProfile): Promise<ShareOutcome> {
  const url = shareUrl(result);
  const text = result.shareText;

  if (navigator.share) {
    try {
      await navigator.share({ title: SERVICE_NAME, text, url });
      return "shared";
    } catch (e) {
      if ((e as DOMException)?.name === "AbortError") return "cancelled";
      // 그 밖의 오류는 아래 클립보드 복사로 폴백한다.
    }
  }
  try {
    await navigator.clipboard.writeText(`${text}\n${url}`);
    return "copied";
  } catch {
    return "failed";
  }
}
