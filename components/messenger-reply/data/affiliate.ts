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
  qvl: { label: "오래 대화해도 편한 무선 이어폰", keyword: "무선 이어폰" },
  qvr: { label: "빠른 답장을 위해 챙기면 좋은 보조배터리", keyword: "보조배터리" },
  qcl: { label: "메시지를 빠르게 치기 좋은 블루투스 키보드", keyword: "블루투스 키보드" },
  qcr: { label: "심플한 감성의 미니멀 폰케이스", keyword: "미니멀 폰케이스" },
  wvl: { label: "생각을 정리하기 좋은 감성 다이어리", keyword: "감성 다이어리" },
  wvr: { label: "정성스러운 손편지에 어울리는 편지지 세트", keyword: "편지지 세트" },
  wcl: { label: "편안하게 답장 쓰기 좋은 스마트폰 거치대", keyword: "스마트폰 거치대" },
  wcr: { label: "차분한 분위기를 더하는 무드등", keyword: "무드등" },
};
