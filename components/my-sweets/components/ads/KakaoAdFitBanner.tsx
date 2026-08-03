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

type Props = {
  placement: AdFitPlacement;
};

export function KakaoAdFitBanner({ placement }: Props) {
  const unitId = adfitUnitId(placement);
  const insRef = useRef<HTMLModElement>(null);

  // ba.min.js는 '로드 시점에 있는' .kakao_ad_area만 렌더한다. SPA에서 화면 전환 뒤
  // 새로 생긴 광고(특히 결과 화면)는 이미 로드된 스크립트가 다시 스캔하지 않아 빈다.
  // 그래서 광고가 마운트될 때마다 해당 ins 바로 뒤에 스크립트를 새로 붙여 재스캔시킨다.
  useEffect(() => {
    const ins = insRef.current;
    if (!unitId || !ins) return; // 개발 placeholder/비활성 상태면 건너뜀
    trackEvent("adfit_impression_attempt", { placement });
    const script = document.createElement("script");
    script.src = ADFIT_SCRIPT_SRC;
    script.async = true;
    ins.insertAdjacentElement("afterend", script);
    return () => {
      script.remove();
    };
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
      <div className="ad-slot-body">
        <ins
          ref={insRef}
          className="kakao_ad_area"
          style={{ display: "none" }}
          data-ad-unit={unitId}
          data-ad-width={AD_WIDTH}
          data-ad-height={AD_HEIGHT}
        />
      </div>
    </div>
  );
}
