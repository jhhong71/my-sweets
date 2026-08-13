/**
 * 업무 시작 스타일 테스트용 광고 설정.
 * 실제 판정 로직은 사이트 전역 공용 모듈(@/lib/ads-config)에 있고, 여기서는
 * 이 앱의 컴포넌트가 기대하는 이름으로 재노출만 한다.
 *
 * 이 앱은 다른 이식 앱들과 달리 대문자 F를 쓰는 `adFitUnitId`를 import하고
 * isAdPreview는 쓰지 않는다(단위 ID가 null이면 미리보기 placeholder를 띄운다).
 * 그래서 공용 모듈의 `adfitUnitId`를 그 이름으로 다시 내보낸다.
 */
export {
  AD_WIDTH,
  AD_HEIGHT,
  adfitUnitId as adFitUnitId,
  coupangAffiliateUrl,
  type AdFitPlacement,
} from "@/lib/ads-config";
