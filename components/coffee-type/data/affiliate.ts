import type { ResultId } from "../types";

/**
 * 결과 유형별로 연결할 쿠팡파트너스 추천 상품군.
 * 실제 상품 이미지·상세정보는 복사하지 않고, 상품군 키워드만 보관한다.
 * 실제 제휴 URL은 환경변수(VITE_COUPANG_PARTNERS_URL)로만 받는다.
 */
export type AffiliateCategory = {
  /** 추천 영역에 보여줄 문구 */
  label: string;
  /** 제휴 링크에 연결할 상품군 키워드 */
  keyword: string;
};

export const AFFILIATE_BY_RESULT: Record<ResultId, AffiliateCategory> = {
  rwq: { label: "진하고 달콤한 홈카페를 위한 초콜릿 시럽", keyword: "초콜릿 시럽" },
  rws: { label: "층층이 즐기는 캐러멜 마키아토 시럽 세트", keyword: "캐러멜 시럽" },
  rpq: { label: "진한 샷을 빠르게 내리는 에스프레소 캡슐", keyword: "에스프레소 캡슐" },
  rps: { label: "오래 곁에 두고 마시는 원두 드립백 세트", keyword: "드립백 커피" },
  lwq: { label: "가볍게 즐기는 바닐라 시럽 미니 세트", keyword: "바닐라 시럽" },
  lws: { label: "고소한 홈카페용 헤이즐넛 시럽", keyword: "헤이즐넛 시럽" },
  lpq: { label: "부드러운 우유 거품을 위한 미니 라떼 아트 스팀기", keyword: "라떼 아트 스팀기" },
  lps: { label: "편안한 라떼 한 잔을 위한 우유 거품기", keyword: "우유 거품기" },
};
