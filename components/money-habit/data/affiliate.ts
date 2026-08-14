/** 결과 유형별로 연결할 쿠팡파트너스 추천 상품군. 상품 정보 복제 없이 키워드만 보관한다. */

export type AffiliateCategory = {
  /** 추천 영역에 보여줄 문구 */
  label: string;
  /** 제휴 링크에 연결할 상품군 키워드 */
  keyword: string;
};

export const AFFILIATE_BY_RESULT: Record<string, AffiliateCategory> = {
  "steady-planner": { label: "전체 흐름을 한눈에 정리하기 좋은 가계부 다이어리", keyword: "가계부 다이어리" },
  "smart-saver": { label: "저축 목표를 눈으로 확인하기 좋은 목표 저금통", keyword: "목표 저금통" },
  "mindful-spender": { label: "지금의 만족을 기록하기 좋은 감성 다이어리", keyword: "감성 다이어리" },
  "planned-flexer": { label: "지출 흐름을 가볍게 기록하기 좋은 심플 가계부 앱 노트", keyword: "심플 가계부 노트" },
  "quiet-saver": { label: "비상금을 따로 모아두기 좋은 소액 저금통", keyword: "소액 저금통" },
  "freeform-saver": { label: "자유롭게 기록하기 좋은 무지 노트·플래너", keyword: "무지 플래너" },
  "careful-improviser": { label: "결제 내역을 한눈에 보기 좋은 카드지갑 정리 파우치", keyword: "카드지갑 파우치" },
  "free-today-spender": { label: "오늘의 소비를 가볍게 기록하는 미니 메모패드", keyword: "미니 메모패드" },
};
