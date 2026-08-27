import type { Axis, Pole } from "../types";

/** 축 표시 순서 (동점 처리·화면 표시에 사용하는 고정 순서) */
export const AXIS_ORDER: Axis[] = ["rhythm", "info", "flex"];

/** 축 이름 */
export const AXIS_LABELS: Record<Axis, string> = {
  rhythm: "준비 리듬",
  info: "정보 습관",
  flex: "컨디션 대응",
};

/** 축의 양 끝 이름 */
export const POLE_LABELS: Record<Axis, Record<Pole, string>> = {
  rhythm: { high: "여유형", low: "벼락치기형" },
  info: { high: "확인형", low: "몰입형" },
  flex: { high: "루틴형", low: "즉흥형" },
};

/** 결과 키를 만들 때 쓰는 한 글자 코드 */
export const POLE_CODES: Record<Axis, Record<Pole, string>> = {
  rhythm: { high: "r", low: "d" },
  info: { high: "c", low: "i" },
  flex: { high: "f", low: "v" },
};

export const AXIS_DESCRIPTIONS: Record<Axis, string> = {
  rhythm: "출근 준비를 여유 있게 시작하는지, 시간에 쫓기듯 몰아서 하는지",
  info: "아침부터 알림과 소식을 적극적으로 확인하는지, 내 루틴에 먼저 집중하는지",
  flex: "정해둔 준비 순서를 그대로 지키는지, 상황에 맞게 유연하게 바꾸는지",
};
