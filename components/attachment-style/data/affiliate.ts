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
  cos: { label: "함께 쓰기 좋은 커플 다이어리", keyword: "커플 다이어리" },
  cof: { label: "마음을 편지로 전하는 레터지 세트", keyword: "편지지 세트" },
  crs: { label: "말없이도 마음이 전해지는 커플 텀블러", keyword: "커플 텀블러" },
  crf: { label: "복잡한 마음을 정리하는 감정 기록 노트", keyword: "감정 기록 노트" },
  dos: { label: "산뜻한 데일리 데이트에 어울리는 향수", keyword: "향수" },
  dof: { label: "기분 전환에 좋은 무드등", keyword: "무드등" },
  drs: { label: "혼자만의 시간을 채워줄 향초", keyword: "향초" },
  drf: { label: "생각 정리에 도움 되는 마음챙김 다이어리", keyword: "마음챙김 다이어리" },
};
