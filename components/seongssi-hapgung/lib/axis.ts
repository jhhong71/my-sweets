import type { Axis, Pole } from "../types";

/** 축 표시 순서 (결과 키 생성·화면 표시에 사용하는 고정 순서) */
export const AXIS_ORDER: Axis[] = ["tension", "combo", "vibe"];

/** 축 이름 */
export const AXIS_LABELS: Record<Axis, string> = {
  tension: "텐션",
  combo: "케미",
  vibe: "분위기",
};

/** 축의 양 끝 이름 */
export const POLE_LABELS: Record<Axis, Record<Pole, string>> = {
  tension: { high: "폭발형", low: "잔잔형" },
  combo: { high: "찰떡형", low: "반전형" },
  vibe: { high: "에너지형", low: "힐링형" },
};

/** 결과 키를 만들 때 쓰는 한 글자 코드 */
export const POLE_CODES: Record<Axis, Record<Pole, string>> = {
  tension: { high: "p", low: "j" },
  combo: { high: "c", low: "r" },
  vibe: { high: "e", low: "h" },
};

export const AXIS_DESCRIPTIONS: Record<Axis, string> = {
  tension: "만나면 텐션이 확 올라가는 사이인지, 잔잔하고 차분하게 흐르는 사이인지",
  combo: "합이 착착 맞는 찰떡 케미인지, 서로 다른 매력이 부딪히는 반전 케미인지",
  vibe: "함께 있으면 에너지가 솟는 사이인지, 편안하게 힐링되는 사이인지",
};
