"use client";

import { useEffect, useRef } from "react";
import { isAdPreview } from "@/lib/ads-config";

const COUPANG_SCRIPT_SRC = "https://ads-partners.coupang.com/g.js";

declare global {
  interface Window {
    PartnersCoupang?: { G: new (config: Record<string, unknown>) => unknown };
  }
}

type Props = {
  id: number;
  trackingCode: string;
  width: number;
  height: number;
  template?: string;
};

/**
 * 쿠팡파트너스 위젯(PartnersCoupang.G) 배너.
 *
 * g.js가 정의하는 위젯 생성자는 자신을 호출한 <script> 태그(document.currentScript)의
 * 위치를 기준으로 광고 내용을 그려 넣는다. JSX로 <script> 태그를 적어두는 것만으로는
 * 브라우저가 실행하지 않으므로, 이 컨테이너 안에 실제 script 엘리먼트를 직접
 * 만들어 넣어야 원본 스니펫과 동일하게 동작한다.
 */
export function CoupangPartnersBanner({ id, trackingCode, width, height, template = "carousel" }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isAdPreview) return;
    const container = containerRef.current;
    if (!container) return;
    let cancelled = false;

    function renderWidget() {
      if (cancelled || !container || !window.PartnersCoupang) return;
      const inline = document.createElement("script");
      inline.text = `new PartnersCoupang.G(${JSON.stringify({
        id,
        template,
        trackingCode,
        width: String(width),
        height: String(height),
        tsource: "",
      })});`;
      container.appendChild(inline);
    }

    if (window.PartnersCoupang) {
      renderWidget();
    } else {
      let script = document.querySelector<HTMLScriptElement>(`script[src="${COUPANG_SCRIPT_SRC}"]`);
      if (!script) {
        script = document.createElement("script");
        script.src = COUPANG_SCRIPT_SRC;
        script.async = true;
        document.head.appendChild(script);
      }
      script.addEventListener("load", renderWidget, { once: true });
    }

    return () => {
      cancelled = true;
      container.innerHTML = "";
    };
  }, [id, trackingCode, width, height, template]);

  return (
    <aside className="container flex flex-col items-center gap-2 py-8" aria-label="광고 영역">
      <span className="text-[11px] font-semibold tracking-wide text-ink-soft/70">광고</span>
      {/* 위젯 고정 폭(680px)이 모바일 화면보다 넓을 수 있으므로, 잘라내지 않고
          가로 스크롤로 전체를 볼 수 있게 한다(고정폭 요소를 억지로 줄이거나
          클리핑하지 않는다는 사이트 원칙). */}
      <div className="w-full overflow-x-auto">
        <div ref={containerRef} className="mx-auto" style={{ width, minHeight: height }}>
          {isAdPreview && (
            <div
              className="flex h-full w-full items-center justify-center rounded-2xl bg-white/50 text-xs text-ink-soft"
              style={{ minHeight: height }}
            >
              광고 영역 미리보기 · {width}×{height}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
