/** 결과 유형별로 연결할 쿠팡파트너스 추천 상품군. 상품 정보 복제 없이 키워드만 보관한다. */

export type AffiliateCategory = {
  /** 추천 영역에 보여줄 문구 */
  label: string;
  /** 제휴 링크에 연결할 상품군 키워드 */
  keyword: string;
};

export const AFFILIATE_BY_RESULT: Record<string, AffiliateCategory> = {
  solver: { label: "빠르게 메모하고 정리하기 좋은 미니 노트·볼펜", keyword: "미니 메모노트" },
  expresser: { label: "마음을 다독일 때 곁에 두기 좋은 허브차·캔들", keyword: "허브차 캔들" },
  strategist: { label: "계획을 체계적으로 정리하기 좋은 위클리 플래너", keyword: "위클리 플래너" },
  distancer: { label: "혼자만의 시간에 어울리는 목쿠션·아이마스크", keyword: "목쿠션 아이마스크" },
  balanced: { label: "상황별로 바꿔 쓰기 좋은 데스크 정리 소품", keyword: "데스크 정리 소품" },
};
