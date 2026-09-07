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
  pce: { label: "신나는 분위기에 어울리는 미니 블루투스 스피커", keyword: "미니 블루투스 스피커" },
  pch: { label: "편하게 오래 함께하기 좋은 텀블러 세트", keyword: "커플 텀블러" },
  pre: { label: "함께 즐기기 좋은 보드게임", keyword: "보드게임" },
  prh: { label: "차분한 시간을 더해줄 홈카페 세트", keyword: "홈카페 세트" },
  jce: { label: "잔잔한 대화에 어울리는 디퓨저", keyword: "디퓨저" },
  jch: { label: "편안한 시간을 위한 담요", keyword: "무릎담요" },
  jre: { label: "새로운 취향을 발견할 때 좋은 소품", keyword: "감성 소품" },
  jrh: { label: "느긋한 시간에 어울리는 티 세트", keyword: "티 세트" },
};
