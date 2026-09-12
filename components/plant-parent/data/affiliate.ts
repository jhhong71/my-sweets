import type { ResultId } from "../types";

/**
 * 결과 유형별로 연결할 쿠팡파트너스 추천 상품군.
 * 실제 상품 이미지·상세정보는 복사하지 않고, 상품군 키워드만 보관한다.
 * 실제 제휴 URL은 환경변수(NEXT_PUBLIC_COUPANG_PARTNERS_URL)로만 받는다.
 */
export type AffiliateCategory = {
  /** 추천 영역에 보여줄 문구 */
  label: string;
  /** 제휴 링크에 연결할 상품군 키워드 */
  keyword: string;
};

export const AFFILIATE_BY_RESULT: Record<ResultId, AffiliateCategory> = {
  rcs: { label: "루틴 관리에 편한 급수 타이머", keyword: "화분 급수 타이머" },
  rcx: { label: "여러 식물을 기록하기 좋은 식물 다이어리", keyword: "식물 다이어리" },
  res: { label: "간편하게 급수 주기를 지킬 수 있는 저면관수 화분", keyword: "저면관수 화분" },
  rex: { label: "늘어나는 화분을 정리하기 좋은 화분 받침대", keyword: "화분 받침대" },
  ics: { label: "필요할 때 바로 챙기기 좋은 분무기", keyword: "원예 분무기" },
  icx: { label: "새로운 식물의 상태를 살피기 좋은 토양 수분계", keyword: "토양 수분계" },
  ies: { label: "손이 덜 가도 잘 버티는 저면관수 화분", keyword: "저면관수 화분" },
  iex: { label: "새 식물을 늘리기 좋은 미니 화분 세트", keyword: "미니 화분 세트" },
};
