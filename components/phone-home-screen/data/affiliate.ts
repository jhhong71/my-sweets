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
  smd: { label: "감성 화면 취향에 어울리는 무드등", keyword: "무드등" },
  smp: { label: "깔끔한 책상에 어울리는 케이블 정리 파우치", keyword: "케이블 정리파우치" },
  sxd: { label: "여러 앱을 오래 쓰기 좋은 보조배터리", keyword: "보조배터리" },
  sxp: { label: "많은 앱과 파일을 관리할 때 편한 메모리카드", keyword: "메모리카드" },
  fmd: { label: "감성 화면에 포인트를 더하는 그립톡", keyword: "그립톡" },
  fmp: { label: "심플한 사용에 어울리는 미니멀 폰 케이스", keyword: "미니멀 폰케이스" },
  fxd: { label: "화려한 화면 취향에 어울리는 폰꾸미기 스티커", keyword: "폰꾸미기 스티커" },
  fxp: { label: "자유롭게 쓰는 폰을 든든하게 지켜줄 범퍼 케이스", keyword: "범퍼 케이스" },
};
