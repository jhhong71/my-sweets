/**
 * 분석 이벤트 인터페이스. 현재 연결된 분석 도구가 없어 기본 동작은 no-op이며,
 * 도구를 도입하면 registerAnalyticsHandler로 핸들러만 등록하면 된다.
 * 이벤트에는 개인정보·작성한 목표 원문·비밀키를 담지 않는다(지면 이름과 분야 ID만).
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
    // 분석 실패가 만다라트 작성·저장을 막지 않게 한다.
  }
}
