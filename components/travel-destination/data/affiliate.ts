import type { ResultId } from "../types";

/**
 * 결과 여행지별로 연결할 쿠팡파트너스 추천 상품군.
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
  acp: { label: "알차게 돌아다니기 좋은 보조배터리", keyword: "보조배터리" },
  acf: { label: "가볍게 돌아다니기 좋은 크로스백", keyword: "크로스백" },
  anp: { label: "산길 액티비티에 든든한 등산 스틱", keyword: "등산 스틱" },
  anf: { label: "물놀이에 안심되는 방수 파우치", keyword: "방수 파우치" },
  rcp: { label: "여유로운 동선을 기록할 여행 다이어리", keyword: "여행 다이어리" },
  rcf: { label: "언덕길도 편안한 워킹화", keyword: "워킹화" },
  rnp: { label: "이동 시간이 편안해지는 목베개", keyword: "목베개" },
  rnf: { label: "늘어지는 휴식에 어울리는 비치타월", keyword: "비치타월" },
};
