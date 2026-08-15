import type { ResultId } from "../types";

/**
 * 결과 유형별로 연결할 쿠팡파트너스 추천 상품군.
 * 쿠팡의 상품 이미지·상세정보는 복사하지 않고, 상품군 키워드만 보관한다.
 * 실제 제휴 URL은 환경변수(VITE_COUPANG_PARTNERS_URL)로만 받는다.
 */
export type AffiliateCategory = {
  /** 추천 영역에 보여줄 문구 */
  label: string;
  /** 제휴 링크에 연결할 상품군 키워드 */
  keyword: string;
};

export const AFFILIATE_BY_RESULT: Record<ResultId, AffiliateCategory> = {
  rmd: { label: "목 관리가 필요한 리더에게 어울리는 목캔디·숙취해소제", keyword: "숙취해소제" },
  rml: { label: "텐션 유지에 좋은 에너지드링크·목캔디", keyword: "에너지드링크" },
  red: { label: "짧고 굵게 즐긴 다음 날을 위한 컨디션 관리 세트", keyword: "컨디션 관리" },
  rel: { label: "하이라이트를 남기기 좋은 미니 카메라·조명", keyword: "미니 카메라" },
  omd: { label: "오래 앉아 있어도 편한 방석·핫팩", keyword: "휴대용 방석" },
  oml: { label: "은근히 오래 버틸 때 좋은 무릎담요·핫팩", keyword: "무릎담요" },
  oed: { label: "조용히 챙기는 숙취해소제·꿀물스틱", keyword: "숙취해소 스틱" },
  oel: { label: "가볍게 스며드는 자리에 어울리는 향균 마스크·핸드크림", keyword: "휴대용 핸드크림" },
};
