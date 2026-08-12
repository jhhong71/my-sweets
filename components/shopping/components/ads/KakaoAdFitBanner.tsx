import { useEffect, useRef } from "react";
import {
  AD_HEIGHT,
  AD_WIDTH,
  adfitUnitId,
  isAdPreview,
  type AdFitPlacement,
} from "../../lib/ads";
import { trackEvent } from "../../lib/analytics";

const ADFIT_SCRIPT_SRC = "https://t1.daumcdn.net/kas/static/ba.min.js";

/** 이미 삽입된 스크립트가 있으면 재사용해 중복 삽입을 막는다. */
function ensureAdfitScript(): void {
  if (document.querySelector(`script[src="${ADFIT_SCRIPT_SRC}"]`)) return;
  const script = document.createElement("script");
  script.src = ADFIT_SCRIPT_SRC;
  script.async = true;
  document.head.appendChild(script);
}

type Props = {
  placement: AdFitPlacement;
};

export function KakaoAdFitBanner({ placement }: Props) {
  const unitId = adfitUnitId(placement);
  const requested = useRef(false);

  useEffect(() => {
    if (!unitId || requested.current) return;
    requested.current = true;
    trackEvent("adfit_impression_attempt", { placement });
    ensureAdfitScript();
  }, [unitId, placement]);

  // 개발 환경: 광고 호출 없이 크기·위치 확인용 placeholder만 표시
  if (isAdPreview) {
    return (
      <div className="ad-slot" aria-label="광고 영역">
        <span className="ad-slot-label">광고</span>
        <div className="ad-placeholder">
          광고 영역 미리보기 · {AD_WIDTH}×{AD_HEIGHT}
        </div>
      </div>
    );
  }

  // production이라도 활성화 플래그와 단위 ID가 없으면 아무것도 그리지 않는다
  if (!unitId) return null;

  return (
    <div className="ad-slot" aria-label="광고 영역">
      <span className="ad-slot-label">광고</span>
      <ins
        className="kakao_ad_area"
        style={{ display: "none" }}
        data-ad-unit={unitId}
        data-ad-width={AD_WIDTH}
        data-ad-height={AD_HEIGHT}
      />
    </div>
  );
}
