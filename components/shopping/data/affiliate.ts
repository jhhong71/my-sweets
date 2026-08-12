/** 결과 유형별로 연결할 쿠팡파트너스 추천 상품군. 상품 정보 복제 없이 키워드만 보관한다. */

export type AffiliateCategory = {
  /** 추천 영역에 보여줄 문구 */
  label: string;
  /** 제휴 링크에 연결할 상품군 키워드 */
  keyword: string;
};

export const AFFILIATE_BY_RESULT: Record<string, AffiliateCategory> = {
  "perfect-hunter": { label: "신상 정보를 빠르게 챙기기 좋은 미니 파우치·카드지갑", keyword: "미니 파우치" },
  "premium-curator": { label: "꼼꼼히 고른 아이템을 오래 쓰기 좋은 프리미엄 보관 케이스", keyword: "프리미엄 보관 케이스" },
  "quality-improviser": { label: "품질을 바로 확인하기 좋은 휴대용 클리너·관리 용품", keyword: "휴대용 클리너" },
  "precision-analyst": { label: "비교하며 기록하기 좋은 심플 노트·플래너", keyword: "심플 플래너" },
  "mood-splurger": { label: "기분 전환에 어울리는 향초·디퓨저", keyword: "향초 디퓨저" },
  "budget-trend-follower": { label: "세일 타이밍을 놓치지 않게 도와줄 위시리스트 다이어리", keyword: "위시리스트 다이어리" },
  "impulsive-value-shopper": { label: "가볍게 챙기기 좋은 접이식 장바구니·에코백", keyword: "접이식 장바구니" },
  "careful-saver": { label: "예산을 관리하기 좋은 가계부·저금통", keyword: "가계부" },
};
