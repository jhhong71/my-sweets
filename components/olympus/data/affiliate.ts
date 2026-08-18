import type { GodId } from "../types";

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

export const AFFILIATE_BY_RESULT: Record<GodId, AffiliateCategory> = {
  zeus: { label: "리더십 있는 하루에 어울리는 손목시계", keyword: "손목시계" },
  hera: { label: "품격 있는 일상을 위한 주얼리 파우치", keyword: "주얼리 파우치" },
  poseidon: { label: "역동적인 기분 전환에 좋은 스포츠 타올", keyword: "스포츠 타올" },
  demeter: { label: "돌봄이 필요한 하루를 위한 홈가드닝 세트", keyword: "홈가드닝" },
  athena: { label: "차분한 몰입에 좋은 독서등·노트", keyword: "독서등" },
  apollo: { label: "감각적인 하루를 위한 블루투스 스피커", keyword: "블루투스 스피커" },
  artemis: { label: "자유로운 야외활동에 어울리는 경량 배낭", keyword: "경량 배낭" },
  ares: { label: "에너지 발산에 좋은 홈트레이닝 용품", keyword: "홈트레이닝" },
  aphrodite: { label: "매력을 더하는 향수·바디케어", keyword: "향수" },
  hephaestus: { label: "몰입 작업에 좋은 데스크 정리용품", keyword: "데스크 정리함" },
  hermes: { label: "가볍게 움직이기 좋은 크로스백", keyword: "크로스백" },
  dionysus: { label: "즉흥적인 즐거움을 위한 무드등", keyword: "무드등" },
};
