"use client";

import { useEffect, useRef } from "react";
import { AD_HEIGHT, AD_WIDTH, adfitUnitId, isAdPreview, type AdFitPlacement } from "@/lib/ads-config";

const ADFIT_SCRIPT_SRC = "https://t1.daumcdn.net/kas/static/ba.min.js";

/**
 * 허브 페이지용 카카오 애드핏 배너 (320×100).
 * 광고 로딩 실패·차단기 사용 시에도 레이아웃이 깨지지 않도록 최소 높이를 확보한다.
 */
export function AdFitBanner({ placement = "home" }: { placement?: AdFitPlacement }) {
  const unitId = adfitUnitId(placement);
  const insRef = useRef<HTMLModElement>(null);

  // ba.min.js는 로드 시점의 .kakao_ad_area만 렌더하므로, 마운트될 때마다
  // 해당 ins 뒤에 스크립트를 새로 붙여 재스캔시킨다(중복 삽입은 정리로 방지).
  useEffect(() => {
    const ins = insRef.current;
    if (!unitId || !ins) return;
    const script = document.createElement("script");
    script.src = ADFIT_SCRIPT_SRC;
    script.async = true;
    ins.insertAdjacentElement("afterend", script);
    return () => {
      script.remove();
    };
  }, [unitId, placement]);

  if (!isAdPreview && !unitId) return null;

  return (
    <aside className="container flex flex-col items-center gap-2 py-10" aria-label="광고 영역">
      <span className="text-[11px] font-semibold tracking-wide text-ink-soft/70">광고</span>
      <div
        className="flex items-center justify-center overflow-hidden rounded-2xl bg-white/50"
        style={{ minWidth: AD_WIDTH, minHeight: AD_HEIGHT }}
      >
        {isAdPreview ? (
          <span className="text-xs text-ink-soft">
            광고 영역 미리보기 · {AD_WIDTH}×{AD_HEIGHT}
          </span>
        ) : (
          <ins
            ref={insRef}
            className="kakao_ad_area"
            style={{ display: "none" }}
            data-ad-unit={unitId ?? undefined}
            data-ad-width={AD_WIDTH}
            data-ad-height={AD_HEIGHT}
          />
        )}
      </div>
    </aside>
  );
}
