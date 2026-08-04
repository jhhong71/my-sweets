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
  pkt: { label: "보관함을 라벨링하기 좋은 라벨 스티커·정리 박스", keyword: "라벨 스티커" },
  pkb: { label: "몰아서 정리할 때 편한 대용량 수납 박스", keyword: "수납 박스" },
  pmt: { label: "매일 관리하기 좋은 슬림 서랍 정리함", keyword: "서랍 정리함" },
  pmb: { label: "한 번에 비우기 좋은 압축 수납백", keyword: "압축 수납백" },
  fkt: { label: "취향대로 꾸미기 좋은 코르크보드·메모꽂이", keyword: "코르크보드" },
  fkb: { label: "추억을 보관하기 좋은 메모리 박스", keyword: "메모리 박스" },
  fmt: { label: "가볍게 관리하기 좋은 미니 데스크 트레이", keyword: "데스크 트레이" },
  fmb: { label: "몰아서 청소할 때 좋은 청소용품 세트", keyword: "청소용품 세트" },
};
