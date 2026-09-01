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
  rvu: { label: "진한 맛에 짭짤함을 더할 때 좋은 미니 카라멜 소스", keyword: "카라멜 소스" },
  rvc: { label: "진한 여운을 즐기고 싶을 때 좋은 홈메이드 초콜릿", keyword: "홈메이드 초콜릿" },
  rmu: { label: "층층이 즐기는 홈카페용 티라미수 컵", keyword: "티라미수 컵" },
  rmc: { label: "은은한 향을 더해주는 바닐라빈 시럽", keyword: "바닐라빈 시럽" },
  fvu: { label: "상큼한 하루를 위한 열대과일 셔벗 세트", keyword: "열대과일 셔벗" },
  fvc: { label: "제철 딸기를 오래 즐기는 딸기 잼 세트", keyword: "딸기 잼" },
  fmu: { label: "차분한 티타임을 위한 라벤더 얼그레이 티백", keyword: "라벤더 얼그레이 티" },
  fmc: { label: "산뜻한 마무리를 위한 레몬청 세트", keyword: "레몬청" },
};
