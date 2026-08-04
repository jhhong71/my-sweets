/**
 * 책상정리 테스트용 광고 설정.
 * 실제 판정 로직은 사이트 전역 공용 모듈(@/lib/ads-config)에 있고, 여기서는
 * 이 앱의 컴포넌트가 기대하는 이름(adFitUnitId 등)으로 재노출만 한다.
 */
import {
  AD_WIDTH,
  AD_HEIGHT,
  adfitUnitId,
  coupangAffiliateUrl as sharedCoupangAffiliateUrl,
} from "@/lib/ads-config";

export type AdFitPlacement = "start" | "result";

export { AD_WIDTH, AD_HEIGHT };

export function adFitUnitId(placement: AdFitPlacement): string | null {
  return adfitUnitId(placement);
}

export const coupangAffiliateUrl = sharedCoupangAffiliateUrl;
