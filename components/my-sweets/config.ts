/**
 * 테스트 규모 단일 설정 소스.
 * 문항 수·결과 수·맛 수를 여러 파일에 흩어 하드코딩하지 않고 여기서만 관리한다.
 * (verify-config 스크립트가 실제 생성 데이터와 일치하는지 검증한다.)
 */
const BASE_SNACK_COUNT = 5;
const TRAIT_COUNT = 5;
const INTENSITY_LEVELS = 2;

export const TEST_CONFIG = {
  questionCount: 15,
  estimatedMinutes: 3,
  baseSnackCount: BASE_SNACK_COUNT,
  traitCount: TRAIT_COUNT,
  intensityLevels: INTENSITY_LEVELS,
  flavorCount: 15,
  // 기본 간식 × 보조 성향(자기 축 제외) × 강도 단계 = 5 × 4 × 2 = 40
  resultCount: BASE_SNACK_COUNT * (TRAIT_COUNT - 1) * INTENSITY_LEVELS,
} as const;

export const SERVICE = {
  fullName: "마이스윗 간식테스트",
  shortName: "마이스윗",
  englishName: "My Sweet",
  url: "https://my-sweets.pages.dev/",
} as const;
