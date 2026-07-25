import type { Axis, Intensity, ResultId } from "../types";

/** 기본 간식 ↔ 대표(1위) 성향 */
export const SNACK_AXIS: Record<ResultId, Axis> = {
  chocolate: "conscientious",
  candy: "extravert",
  biscuit: "stable",
  marshmallow: "open",
  pudding: "agreeable",
};

/**
 * 2위 성향 × 강도별 행동 수식어. (간식과 무관하게 자연스러운 절 형태)
 * 강도는 2위 성향 원점수(0~9)로 정한다.
 */
export const MODIFIERS: Record<Axis, Record<Intensity, string>> = {
  open: {
    moderate: "새로운 길을 바라보는",
    strong: "지도 밖으로 여행하는",
  },
  conscientious: {
    moderate: "하루를 천천히 정리하는",
    strong: "별자리를 정리하는",
  },
  extravert: {
    moderate: "곁에 웃음을 건네는",
    strong: "햇살을 나누는",
  },
  agreeable: {
    moderate: "곁을 가만히 지키는",
    strong: "마음을 어루만지는",
  },
  stable: {
    moderate: "잔잔한 오후를 걷는",
    strong: "달빛 아래 생각에 잠기는",
  },
};

/**
 * 간식 × 2위 성향 → 대표 맛(간식당 3종). 맛은 성격 상징이 아니라 감각적 보조 요소.
 * 각 간식의 '기본 성향' 키는 2위로 나올 수 없어 사용되지 않지만(Record 형식 유지),
 * 나머지 네 성향이 간식별 대표 맛 3종을 모두 커버하도록 배정해 이미지 15종이 전부
 * 쓰이게 한다(정상 결과 fallback 0%).
 */
export const FLAVOR_BY_SECONDARY: Record<ResultId, Record<Axis, string>> = {
  // 기본: 성실성 → chocolate. 맛 3종: 헤이즐넛·다크·우유
  chocolate: { conscientious: "다크", open: "헤이즐넛", extravert: "헤이즐넛", agreeable: "우유", stable: "다크" },
  // 기본: 외향성 → candy. 맛 3종: 레몬·포도·딸기
  candy: { extravert: "레몬", open: "레몬", conscientious: "포도", agreeable: "딸기", stable: "포도" },
  // 기본: 정서안정 → biscuit. 맛 3종: 초코·버터·딸기잼
  biscuit: { stable: "버터", open: "초코", conscientious: "버터", extravert: "초코", agreeable: "딸기잼" },
  // 기본: 개방성 → marshmallow. 맛 3종: 딸기·말차·바닐라
  marshmallow: { open: "딸기", conscientious: "말차", extravert: "딸기", agreeable: "바닐라", stable: "말차" },
  // 기본: 우호성 → pudding. 맛 3종: 카라멜·말차·초콜릿
  pudding: { agreeable: "초콜릿", open: "초콜릿", conscientious: "말차", extravert: "카라멜", stable: "말차" },
};

/** 맛 이름 → 이미지 키 슬러그(영문). imageKey = `${간식}-${슬러그}` */
export const FLAVOR_SLUG: Record<string, string> = {
  우유: "milk",
  다크: "dark",
  헤이즐넛: "hazelnut",
  레몬: "lemon",
  딸기: "strawberry",
  포도: "grape",
  버터: "butter",
  초코: "choco",
  딸기잼: "strawberryjam",
  말차: "matcha",
  바닐라: "vanilla",
  카라멜: "caramel",
  초콜릿: "chocolate",
};

/** 존재해야 하는 전체 imageKey 15종 (간식별 고유 맛 3종 × 5, 검증·자산 연결 기준). */
export const ALL_IMAGE_KEYS: string[] = (
  Object.keys(FLAVOR_BY_SECONDARY) as ResultId[]
).flatMap((snack) => {
  const uniqueFlavors = [...new Set(Object.values(FLAVOR_BY_SECONDARY[snack]))];
  return uniqueFlavors.map((f) => `${snack}-${FLAVOR_SLUG[f]}`);
});
