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
  pqf: { label: "가벼운 대화를 부드럽게 열어주는 미니 다과 세트", keyword: "미니 다과 세트" },
  pqc: { label: "차분한 대화에 어울리는 핸드드립 커피 세트", keyword: "핸드드립 커피" },
  pof: { label: "자연스러운 친목 자리에 어울리는 블루투스 스피커", keyword: "블루투스 스피커" },
  poc: { label: "정갈한 첫인상을 더할 명함 케이스", keyword: "명함 케이스" },
  wqf: { label: "편안한 수다에 어울리는 텀블러", keyword: "텀블러" },
  wqc: { label: "메모하기 좋은 노트 & 펜 세트", keyword: "노트 펜 세트" },
  wof: { label: "은은한 분위기를 더할 디퓨저", keyword: "디퓨저" },
  woc: { label: "묵묵히 챙기기 좋은 데스크 정리함", keyword: "데스크 정리함" },
};
