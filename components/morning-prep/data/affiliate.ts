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
  rcf: { label: "여유로운 준비에 어울리는 탁상시계·타이머", keyword: "탁상시계" },
  rcv: { label: "이동 중 소식 확인에 좋은 넥밴드 이어폰", keyword: "넥밴드 이어폰" },
  rif: { label: "고요한 아침 루틴에 어울리는 룸 디퓨저", keyword: "룸 디퓨저" },
  riv: { label: "자유로운 아침 분위기에 어울리는 무드등", keyword: "무드등" },
  dcf: { label: "정시 출발에 도움 되는 스마트 알람시계", keyword: "스마트 알람시계" },
  dcv: { label: "멀티태스킹에 좋은 미니 정리 파우치", keyword: "미니 파우치" },
  dif: { label: "빠른 준비에 좋은 원터치 슬립온", keyword: "슬립온 신발" },
  div: { label: "즉흥 대응에 좋은 휴대용 세면 파우치", keyword: "휴대용 세면파우치" },
};
