import { useEffect, useRef } from "react";
import { coupangAffiliateUrl } from "../../lib/ads";
import { AFFILIATE_BY_RESULT } from "../../data/affiliate";
import { trackEvent } from "../../lib/analytics";

const DISCLOSURE =
  "이 포스팅은 쿠팡 파트너스 활동의 일환으로 이에 따른 일정액의 수수료를 제공받습니다.";

type Props = {
  resultId: string;
};

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
          쿠팡에서 &lsquo;{category.keyword}&rsquo; 보러 가기 ↗
        </a>
      ) : (
        <span className="coupang-link is-disabled" aria-disabled="true">
          제휴 링크 준비 중이에요
        </span>
      )}
      <p className="coupang-disclosure">{DISCLOSURE}</p>
    </aside>
  );
}
