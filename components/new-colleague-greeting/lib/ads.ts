/**
 * 새 동료 첫인사 스타일 테스트용 광고 설정.
 * 실제 판정 로직은 사이트 전역 공용 모듈(@/lib/ads-config)에 있고, 여기서는
 * 이 앱의 컴포넌트가 기대하는 이름으로 재노출만 한다.
 */
export {
  AD_WIDTH,
  AD_HEIGHT,
  isAdPreview,
  adfitUnitId as adFitUnitId,
  coupangAffiliateUrl,
  type AdFitPlacement,
} from "@/lib/ads-config";
