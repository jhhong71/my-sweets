"use client";

import { useEffect, useId, useRef } from "react";
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
 * g.js 소스를 직접 받아 확인해보니, config.container를 안 주면
 * "그 시점 기준 문서의 마지막 <script> 태그" 바로 앞에 광고를 끼워 넣는다
 * (document.currentScript 기준이 아니다). 이 위젯은 g.js 로드 후 비동기로
 * 실행되는데, 그때쯤이면 Next.js가 body 끝에 붙인 런타임 스크립트가 항상
 * "마지막 script"가 되어 있어서, 광고가 매번 푸터 아래로 밀려났다.
 * config.container에 셀렉터 문자열을 넘기면 그 안에 바로 넣어주므로,
 * 이 컴포넌트의 컨테이너 div에 고유 id를 붙여 넘긴다(설정 객체가 인라인
 * 스크립트 문자열로 직렬화되므로 DOM 노드 참조 대신 문자열 셀렉터를 쓴다).
 */
export function CoupangPartnersBanner({ id, trackingCode, width, height, template = "carousel" }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const containerId = `coupang-partners-${useId().replace(/[^a-zA-Z0-9-]/g, "")}`;

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
        container: `#${containerId}`,
      })});`;
      document.head.appendChild(inline);
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
  }, [id, trackingCode, width, height, template, containerId]);

  return (
    <aside className="container flex flex-col items-center gap-2 py-8" aria-label="광고 영역">
      <p className="text-center text-xs text-ink-soft">
        이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.
      </p>
      {/* 위젯 고정 폭(680px)이 모바일 화면보다 넓을 수 있으므로, 잘라내지 않고
          가로 스크롤로 전체를 볼 수 있게 한다(고정폭 요소를 억지로 줄이거나
          클리핑하지 않는다는 사이트 원칙). */}
      <div className="w-full overflow-x-auto">
        <div id={containerId} ref={containerRef} className="mx-auto" style={{ width, minHeight: height }}>
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
