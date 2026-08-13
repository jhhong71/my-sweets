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
  prt: { label: "팀 회의용 화이트보드", keyword: "화이트보드" },
  prs: { label: "집중력을 높여주는 스탠드 조명", keyword: "스탠드 조명" },
  pit: { label: "아이디어 정리용 포스트잇 세트", keyword: "포스트잇 세트" },
  pis: { label: "혼자 몰입하기 좋은 노이즈 캔슬링 이어폰", keyword: "노이즈 캔슬링 이어폰" },
  art: { label: "빠른 메모를 위한 포켓 노트", keyword: "포켓 노트" },
  ars: { label: "휴대용 무선 마우스", keyword: "무선 마우스" },
  ait: { label: "팀 소통에 편한 미니 화이트보드", keyword: "미니 화이트보드" },
  ais: { label: "빠른 업무 처리를 돕는 태블릿 거치대", keyword: "태블릿 거치대" },
};
