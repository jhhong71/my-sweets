/** 결과 유형별로 연결할 쿠팡파트너스 추천 상품군. 상품 정보 복제 없이 키워드만 보관한다. */

export type AffiliateCategory = {
  /** 추천 영역에 보여줄 문구 */
  label: string;
  /** 제휴 링크에 연결할 상품군 키워드 */
  keyword: string;
};

export const AFFILIATE_BY_RESULT: Record<string, AffiliateCategory> = {
  converger: { label: "빠르게 메모하며 적용해보기 좋은 노트·태블릿 펜", keyword: "메모 태블릿" },
  diverger: { label: "여러 자료를 정리해 모아두기 좋은 인덱스 노트", keyword: "인덱스 노트" },
  assimilator: { label: "구조를 깔끔하게 정리하기 좋은 화이트보드·플래너", keyword: "화이트보드 플래너" },
  accommodator: { label: "이동하며 바로 실습하기 좋은 휴대용 업무 아이템", keyword: "휴대용 문구" },
  balanced: { label: "상황별로 바꿔 쓰기 좋은 멀티 데스크 정리 용품", keyword: "데스크 정리함" },
};
