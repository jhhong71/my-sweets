import type { ResultProfile } from "../types";
import { toPng } from "html-to-image";

const SERVICE_NAME = "나는 어떤 간식?";

/** 캡처 이미지 배경(투명 영역을 채울 색) — 페이지 배경과 어울리는 웜톤 */
const CAPTURE_BG = "#FCEFE9";

// fontEmbedCSS: "" 로 웹폰트 임베딩을 건너뛴다. 크로스오리진 CDN 폰트
// (Pretendard)의 cssRules 접근이 차단돼 임베딩 시도 시 오류가 나기 때문이며,
// 저장 이미지에선 시스템 한글 폰트로 렌더된다.
const CAPTURE_OPTIONS = {
  backgroundColor: CAPTURE_BG,
  pixelRatio: 2,
  cacheBust: true,
  skipFonts: true,
  fontEmbedCSS: "",
} as const;

/** userAgentData → UA 문자열 순으로 모바일 여부를 판정한다. */
function isMobile(): boolean {
  const uaData = (navigator as Navigator & { userAgentData?: { mobile?: boolean } })
    .userAgentData;
  if (uaData && typeof uaData.mobile === "boolean") return uaData.mobile;
  return /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
}

/**
 * 결과 화면에 실제로 보이는 카드(node)를 그대로 PNG로 캡처해 저장한다.
 * 이미지를 따로 합성하지 않고 화면을 캡처하므로, 광고·제휴·버튼이 없는
 * 캡처 전용 영역만 node로 전달해야 한다.
 *
 * 저장 방식은 환경에 따라 다르다:
 * - 모바일: Web Share(파일)로 네이티브 공유·저장 시트를 연다. iOS Safari 등은
 *   <a download>로 data URL을 저장하지 못하므로 이 경로가 필요하다.
 * - 데스크톱/미지원: Blob URL을 <a download>로 내려받는다.
 */
export async function downloadResultImage(node: HTMLElement, id: string): Promise<void> {
  // 첫 호출에서 이미지 임베딩이 누락될 수 있어 한 번 예열 후 캡처한다.
  await toPng(node, CAPTURE_OPTIONS);
  const dataUrl = await toPng(node, CAPTURE_OPTIONS);

  const fileName = `snack-type-${id}.png`;
  const blob = await (await fetch(dataUrl)).blob();

  const nav = navigator as Navigator & { canShare?: (data?: ShareData) => boolean };
  const file = new File([blob], fileName, { type: "image/png" });

  // 모바일: 파일 공유 시트가 '사진 저장'까지 가장 안정적으로 동작한다.
  if (isMobile() && typeof nav.share === "function" && nav.canShare?.({ files: [file] })) {
    try {
      await nav.share({ files: [file], title: SERVICE_NAME });
      return;
    } catch (e) {
      // 사용자가 취소하면 정상 종료(오류 아님). 그 외에는 다운로드로 폴백한다.
      if ((e as DOMException).name === "AbortError") return;
    }
  }

  // 데스크톱/폴백: Blob URL 다운로드 (data URL보다 길이 제한·호환성에서 안전).
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = fileName;
  link.href = url;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10_000);
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
