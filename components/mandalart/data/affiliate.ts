import type { AffiliateCategory, ThemeId } from "../types";

/**
 * 목표 분야별 추천 상품군.
 * 실제 제휴 URL은 환경변수(lib/ads.ts)로만 들어오며, 없으면 클릭할 수 없는 안내만 보인다.
 * 쿠팡의 상품 이미지·상세정보를 임의로 가져오지 않고, 분야 이름과 검색 키워드만 둔다.
 */
export const AFFILIATE_BY_THEME: Record<ThemeId, AffiliateCategory> = {
  health: { label: "목표를 지켜주는 건강 습관 아이템", keyword: "홈트 매트 · 텀블러" },
  study: { label: "공부 흐름을 만들어 주는 문구", keyword: "스터디 플래너 · 타이머" },
  work: { label: "책상 위를 정돈해 주는 워크 아이템", keyword: "노트북 거치대 · 데스크 정리함" },
  mind: { label: "하루를 다정하게 만드는 소품", keyword: "감성 다이어리 · 캔들" },
};
