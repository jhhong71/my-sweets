/**
 * 광고·제휴 활성화 여부를 한 곳에서 판정하는 설정 모듈.
 * 환경변수가 비어 있거나 잘못된 경우 항상 "비활성화"로 안전하게 떨어진다.
 */

// Next.js에서는 빌드 시 정적 치환되도록 process.env.NEXT_PUBLIC_* 를 직접 참조한다.
const isDev = process.env.NODE_ENV !== "production";

export type AdFitPlacement = "start" | "result";

export const AD_WIDTH = 320;
export const AD_HEIGHT = 100;

/** 개발 환경에서는 실제 광고를 호출하지 않고 placeholder만 표시한다. */
export const isAdPreview = isDev;

const adfitEnabled =
  !isDev && process.env.NEXT_PUBLIC_KAKAO_ADFIT_ENABLED === "true";

const ADFIT_UNIT_IDS: Record<AdFitPlacement, string> = {
  start: (process.env.NEXT_PUBLIC_KAKAO_ADFIT_START_UNIT_ID ?? "").trim(),
  result: (process.env.NEXT_PUBLIC_KAKAO_ADFIT_RESULT_UNIT_ID ?? "").trim(),
};

/** 활성화 플래그와 해당 지면의 광고 단위 ID가 모두 있을 때만 ID를 반환한다. */
export function adfitUnitId(placement: AdFitPlacement): string | null {
  const id = ADFIT_UNIT_IDS[placement];
  return adfitEnabled && id ? id : null;
}

const coupangEnabled = process.env.NEXT_PUBLIC_COUPANG_PARTNERS_ENABLED === "true";
const coupangUrl = (process.env.NEXT_PUBLIC_COUPANG_PARTNERS_URL ?? "").trim();

/** 검증된 제휴 URL을 반환하고, 없으면 null(클릭 불가 placeholder 표시). */
export function coupangAffiliateUrl(): string | null {
  return coupangEnabled && /^https:\/\//.test(coupangUrl) ? coupangUrl : null;
}
