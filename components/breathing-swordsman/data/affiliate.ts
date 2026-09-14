import type { ResultId } from "../types";

/**
 * 결과 캐릭터별로 연결할 쿠팡파트너스 추천 상품군.
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
  chi: { label: "모두를 챙기느라 지친 나를 위한 온열 찜질팩", keyword: "온열 찜질팩" },
  bhi: { label: "푹 쉬어야 더 잘 지킬 수 있으니까, 바디필로우", keyword: "바디필로우" },
  cho: { label: "예민한 귀를 쉬게 해줄 수면 귀마개", keyword: "수면 귀마개" },
  bho: { label: "넘치는 에너지를 쏟아낼 홈트 밴드", keyword: "홈트 밴드" },
  bmo: { label: "든든한 에너지 충전용 고구마 간식", keyword: "고구마 말랭이" },
  bmi: { label: "말없이 곁을 지켜줄 보온 텀블러", keyword: "보온 텀블러" },
  cmo: { label: "차분한 전략 타임에 어울리는 허브티", keyword: "허브티" },
  cmi: { label: "멍하니 쉬기 좋은 구름 쿠션", keyword: "구름 쿠션" },
};
