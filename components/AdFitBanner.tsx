"use client";

import { useEffect, useRef } from "react";
import { AD_HEIGHT, AD_WIDTH, adfitUnitId, isAdPreview, type AdFitPlacement } from "@/lib/ads-config";

const ADFIT_SCRIPT_SRC = "https://t1.daumcdn.net/kas/static/ba.min.js";

/**
 * 허브 페이지용 카카오 애드핏 배너 (320×100 고정형).
 *
 * 폭 처리 원칙(모바일에서 광고가 화면 밖으로 잘리던 문제의 원인 수정):
 * - 이전에는 이 래퍼에 `minWidth: AD_WIDTH`(320px 고정)를 인라인으로 줘서, 좌우
 *   패딩을 뺀 실제 여유폭이 320px보다 좁은 화면(예: 320px 기기 자체)에서 래퍼가
 *   부모 폭을 강제로 초과해 페이지 전체 가로 스크롤/잘림을 유발했다.
 * - w-full + max-w-[320px] + min-w-0 조합으로, 여유가 있으면 320px까지 채우고
 *   여유가 없으면 부모 폭까지 자연스럽게 줄어들도록 바꿨다. AdFit이 실제로 내려주는
 *   320px 고정 광고 소재 자체를 CSS로 축소·변형하지는 않는다(요청 사항).
 * - 아주 좁은 기기에서 광고 소재(320px)가 여유폭보다 커도 페이지 전체가 아니라
 *   이 슬롯 안에서만 가로 스크롤되도록 overflow-x:auto로 격리했다.
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
        className="box-border w-full min-w-0 max-w-[320px] overflow-x-auto rounded-2xl bg-white/50"
        style={{ minHeight: AD_HEIGHT }}
      >
        {isAdPreview ? (
          <div
            className="flex items-center justify-center"
            style={{ minWidth: AD_WIDTH, minHeight: AD_HEIGHT }}
          >
            <span className="text-xs text-ink-soft">
              광고 영역 미리보기 · {AD_WIDTH}×{AD_HEIGHT}
            </span>
          </div>
        ) : (
          <ins
            ref={insRef}
            className="kakao_ad_area block w-full max-w-full"
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
