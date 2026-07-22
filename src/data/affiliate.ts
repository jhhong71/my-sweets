/** 결과(간식)별로 연결할 쿠팡파트너스 추천 상품군. 상품 정보 복제 없이 키워드만 보관한다. */

export type AffiliateCategory = {
  /** 추천 영역에 보여줄 문구 */
  label: string;
  /** 제휴 링크에 연결할 상품군 키워드 */
  keyword: string;
};

export const AFFILIATE_BY_RESULT: Record<string, AffiliateCategory> = {
  chocolate: { label: "진하게 즐기는 다크초콜릿·초콜릿 선물세트", keyword: "다크초콜릿" },
  candy: { label: "알록달록 나눠 먹기 좋은 캔디·사탕", keyword: "사탕" },
  biscuit: { label: "든든하게 즐기는 비스킷·쿠키", keyword: "비스킷" },
  marshmallow: { label: "폭신폭신 달콤한 마시멜로우", keyword: "마시멜로우" },
  pudding: { label: "부드럽고 포근한 푸딩·디저트", keyword: "푸딩" },
};
