import type { ResultId } from "../types";

/**
 * 결과 캐릭터별로 연결할 쿠팡파트너스 추천 상품군.
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
  bhl: { label: "정의파에게 어울리는 후디 집업", keyword: "후디 집업" },
  bml: { label: "모범생 감성 가득한 스터디 다이어리", keyword: "스터디 다이어리" },
  bhs: { label: "의리파와 함께할 보드게임", keyword: "보드게임" },
  bms: { label: "당찬 행동파를 위한 스니커즈", keyword: "스니커즈" },
  chl: { label: "조용한 리더에게 어울리는 식물 화분", keyword: "미니 화분" },
  cml: { label: "존재감 있는 무드등", keyword: "무드등" },
  chs: { label: "몽상가를 위한 별자리 액자", keyword: "별자리 액자" },
  cms: { label: "완벽주의자를 위한 가죽 다이어리", keyword: "가죽 다이어리" },
};
