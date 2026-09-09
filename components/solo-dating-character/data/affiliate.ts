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
  yeongsu: { label: "계획을 정리하기 좋은 데일리 다이어리", keyword: "데일리 다이어리" },
  yeongho: { label: "마음을 전할 때 좋은 미니 편지지 세트", keyword: "편지지 세트" },
  yeongsik: { label: "혼자만의 시간을 채우는 에세이 베스트셀러", keyword: "에세이 책" },
  yeongcheol: { label: "모임 분위기를 살리는 파티 보드게임", keyword: "파티 보드게임" },
  gwangsu: { label: "감성을 채우는 무드등 & 플레이리스트 스피커", keyword: "무드등" },
  sangcheol: { label: "차분한 시간을 위한 홈카페 드립 세트", keyword: "홈카페 드립 세트" },
  yeongsuk: { label: "기분을 바꿔주는 데일리 룸 디퓨저", keyword: "룸 디퓨저" },
  jeongsuk: { label: "한 해 계획을 세우기 좋은 위클리 플래너", keyword: "위클리 플래너" },
  oksun: { label: "포인트가 되는 데일리 미니 액세서리", keyword: "데일리 액세서리" },
  sunja: { label: "챙겨주기 좋은 핸드크림 선물 세트", keyword: "핸드크림 세트" },
  yeongja: { label: "순간을 남기는 즉석 카메라 필름", keyword: "즉석 카메라 필름" },
  hyeonsuk: { label: "함께 마시기 좋은 티백 티 세트", keyword: "티백 세트" },
};
