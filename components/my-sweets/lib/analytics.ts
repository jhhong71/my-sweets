/**
 * 분석 이벤트 인터페이스. 현재는 연결된 분석 도구가 없어 no-op이며,
 * 도구 도입 시 registerAnalyticsHandler로 핸들러만 등록하면 된다.
 * 이벤트에는 개인정보·답변 원문·비밀키를 절대 담지 않는다.
 */

export type AnalyticsEvent =
  | "adfit_impression_attempt"
  | "coupang_recommendation_view"
  | "coupang_affiliate_click";

type AnalyticsHandler = (
  event: AnalyticsEvent,
  props?: Record<string, string>,
) => void;

let handler: AnalyticsHandler | null = null;

export function registerAnalyticsHandler(fn: AnalyticsHandler): void {
  handler = fn;
}

export function trackEvent(
  event: AnalyticsEvent,
  props?: Record<string, string>,
): void {
  try {
    handler?.(event, props);
  } catch {
    // 분석 실패가 테스트 진행·결과 표시를 막지 않게 한다.
  }
}
