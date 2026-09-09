import { useEffect, useRef } from "react";
import { AD_HEIGHT, AD_WIDTH, adFitUnitId, type AdFitPlacement } from "../../lib/ads";
import { trackEvent } from "../../lib/analytics";

const ADFIT_SCRIPT_SRC = "//t1.kakaocdn.net/kas/static/ba.min.js";

type Props = {
  placement: AdFitPlacement;
};

/**
 * 카카오 애드핏 배너.
 * - 광고 단위 ID가 없거나 개발 환경이면 네트워크 호출 없이 미리보기만 표시한다.
 * - SPA에서 화면이 바뀌어도 광고가 다시 채워지도록, 지면이 마운트될 때마다
 *   <ins>와 스크립트를 함께 넣고 언마운트 시 함께 제거해 중복 누적을 막는다.
 * - 광고 로딩 성공 여부와 무관하게 테스트 진행·결과 표시는 영향을 받지 않는다.
 */
export function KakaoAdFitBanner({ placement }: Props) {
  const boxRef = useRef<HTMLDivElement>(null);
  const unitId = adFitUnitId(placement);

  useEffect(() => {
    if (!unitId) return;
    const box = boxRef.current;
    if (!box) return;

    trackEvent("adfit_impression_attempt", { placement });

    const ins = document.createElement("ins");
    ins.className = "kakao_ad_area";
    ins.style.display = "none";
    ins.style.width = "100%";
    ins.setAttribute("data-ad-unit", unitId);
    ins.setAttribute("data-ad-width", String(AD_WIDTH));
    ins.setAttribute("data-ad-height", String(AD_HEIGHT));

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = ADFIT_SCRIPT_SRC;
    script.async = true;

    box.appendChild(ins);
    box.appendChild(script);

    return () => {
      box.replaceChildren();
    };
  }, [placement, unitId]);

  if (!unitId) {
    return (
      <div className="ad-slot" aria-label="광고 영역">
        <span className="ad-slot-label">광고</span>
        <div className="ad-placeholder">
          광고 영역 미리보기 · {AD_WIDTH}×{AD_HEIGHT}
        </div>
      </div>
    );
  }

  return (
    <div className="ad-slot" aria-label="광고 영역">
      <span className="ad-slot-label">광고</span>
      <div ref={boxRef} className="adfit-box" style={{ minHeight: AD_HEIGHT }} />
    </div>
  );
}
