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
  pwr: { label: "여유로운 점심에 어울리는 텀블러", keyword: "텀블러" },
  pwu: { label: "네트워킹 점심에 좋은 명함 케이스", keyword: "명함 케이스" },
  par: { label: "혼자만의 힐링 타임에 좋은 무선 이어폰", keyword: "무선 이어폰" },
  pau: { label: "점심시간 자기계발에 좋은 미니 다이어리", keyword: "미니 다이어리" },
  swr: { label: "즉흥 소셜 타임에 어울리는 보조배터리", keyword: "보조배터리" },
  swu: { label: "빠른 점심 해결에 좋은 도시락 가방", keyword: "도시락 가방" },
  sar: { label: "자유로운 산책에 어울리는 편한 워킹화", keyword: "워킹화" },
  sau: { label: "민첩한 점심 처리에 좋은 크로스백", keyword: "크로스백" },
};
