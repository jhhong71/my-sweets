import type { Axis, Pole } from "../types";

/** 축 표시 순서 (동점 처리·화면 표시에 사용하는 고정 순서) */
export const AXIS_ORDER: Axis[] = ["struct", "mini", "aes"];

/** 축 이름 */
export const AXIS_LABELS: Record<Axis, string> = {
  struct: "정리 구조",
  mini: "아이콘 밀도",
  aes: "꾸미기 성향",
};

/** 축의 양 끝 이름 */
export const POLE_LABELS: Record<Axis, Record<Pole, string>> = {
  struct: { high: "구조형", low: "자유형" },
  mini: { high: "미니멀형", low: "맥시멀형" },
  aes: { high: "꾸미기형", low: "실용형" },
};

/** 결과 키를 만들 때 쓰는 한 글자 코드 */
export const POLE_CODES: Record<Axis, Record<Pole, string>> = {
  struct: { high: "s", low: "f" },
  mini: { high: "m", low: "x" },
  aes: { high: "d", low: "p" },
};

export const AXIS_DESCRIPTIONS: Record<Axis, string> = {
  struct: "새 앱과 안 쓰는 앱을 폴더로 정리해서 관리하는지, 정리 없이 자유롭게 두는지",
  mini: "홈 화면에 정말 필요한 앱만 최소한으로 남겨두는지, 다양한 앱을 화면 가득 채워두는지",
  aes: "배경화면·위젯·아이콘 테마 등 꾸미기에 신경 쓰는지, 기본 설정 그대로 기능 위주로 쓰는지",
};
