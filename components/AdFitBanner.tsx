"use client";

import { useEffect, useRef } from "react";
import { AD_HEIGHT, AD_WIDTH, adfitUnitId, isAdPreview, type AdFitPlacement } from "@/lib/ads-config";

const ADFIT_SCRIPT_SRC = "https://t1.kakaocdn.net/kas/static/ba.min.js";

/**
 * 허브 페이지용 카카오 애드핏 배너.
 *
 * 폭 처리 원칙:
 * - 실제 배포에서 확인해보니 렌더된 소재가 320px보다 넓은 경우가 있었다(집행되는
 *   소재마다 실제 크기가 다를 수 있음). 그런데도 래퍼에 `max-w-[320px]` +
 *   `rounded-2xl` + `overflow-x-auto`를 같이 걸어뒀더니, 둥근 모서리가 있는
 *   요소에 overflow를 주면 브라우저가 그 모서리 모양대로 내용을 잘라내
 *   광고 가장자리가 잘려 보이는 원인이 됐다.
 * - 그래서 광고를 직접 감싸는 요소에는 고정 max-width·둥근 모서리·overflow
 *   클리핑을 아예 주지 않는다(overflow: visible, 즉 기본값 그대로). 광고 소재가
 *   실제로 몇 px든 그 크기 그대로, 잘리지 않고 보이게 한다.
 * - 이전에 있던 `minWidth: AD_WIDTH` 강제(좁은 화면에서 페이지 전체가 넘치던
 *   원인이었던 버그)도 두지 않는다.
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
    <aside className="container flex flex-col items-center gap-2 py-8" aria-label="광고 영역">
      <div className="box-border w-full min-w-0" style={{ minHeight: AD_HEIGHT }}>
        {isAdPreview ? (
          // 개발 전용 placeholder. 실제 광고가 아니라 강제 최소 폭을 두지 않는다
          // (실 광고 크기를 미리 단정하지 않는다는 원칙을 여기서도 지킨다).
          <div
            className="mx-auto flex w-full max-w-[320px] items-center justify-center rounded-2xl bg-white/50"
            style={{ minHeight: AD_HEIGHT }}
          >
            <span className="text-xs text-ink-soft">
              광고 영역 미리보기 · {AD_WIDTH}×{AD_HEIGHT}
            </span>
          </div>
        ) : (
          <ins
            ref={insRef}
            className="kakao_ad_area mx-auto block"
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
