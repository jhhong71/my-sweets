import { useEffect, useRef } from "react";
import type { ResultId } from "../../types";
import { coupangAffiliateUrl } from "../../lib/ads";
import { AFFILIATE_BY_RESULT } from "../../data/affiliate";
import { trackEvent } from "../../lib/analytics";

const DISCLOSURE =
  "이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.";

type Props = {
  resultId: ResultId;
};

/** 결과 화면에만 노출되는 제휴 추천 영역. 제휴 URL이 없으면 클릭할 수 없다. */
export function CoupangPartnerRecommendation({ resultId }: Props) {
  const category = AFFILIATE_BY_RESULT[resultId];
  const viewed = useRef(false);

  useEffect(() => {
    if (!category || viewed.current) return;
    viewed.current = true;
    trackEvent("coupang_recommendation_view", { resultId });
  }, [category, resultId]);

  if (!category) return null;

  const url = coupangAffiliateUrl();

  return (
    <aside className="coupang-box">
      <p className="coupang-disclosure">{DISCLOSURE}</p>
      <span className="ad-slot-label">추천 상품 · 제휴 링크</span>
      <p className="coupang-title">{category.label}</p>
      {url ? (
        <a
          className="coupang-link"
          href={url}
          target="_blank"
          rel="noopener noreferrer sponsored"
          onClick={() => trackEvent("coupang_affiliate_click", { resultId })}
        >
          쿠팡에서 &lsquo;{category.keyword}&rsquo; 보러 가기 (제휴 링크, 새 창) ↗
        </a>
      ) : (
        <span className="coupang-link is-disabled" aria-disabled="true">
          제휴 링크 준비 중이에요
        </span>
      )}
    </aside>
  );
}
