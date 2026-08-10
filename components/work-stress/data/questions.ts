import type { Question } from "../types";

/**
 * 전체 16문항. "업무 마감, 갑작스러운 업무량 증가, 예상하지 못한 문제
 * 발생 등으로 회사에서 스트레스를 받는 상황이라면 요즘의 나는 어떻게 할까"를
 * 공통 기준으로 작성했다.
 *
 * focus축 : 문제중심형(높음) ↔ 감정중심형(낮음)
 * engage축: 접근형(높음) ↔ 거리두기형(낮음)
 *
 * 역방향 문항(reverse: true)은 채점 시 6 - 응답값으로 반전해, 반전 후
 * 값이 클수록 항상 "문제중심형" 또는 "접근형" 방향을 가리키도록 통일했다.
 */
export const QUESTIONS: Question[] = [
  {
    id: "q01",
    text: "스트레스 상황이 생기면 먼저 원인을 파악해 해결 방법을 찾으려 한다.",
    axis: "focus",
    reverse: false,
  },
  {
    id: "q02",
    text: "스트레스 받는 일이 생기면 동료나 상사에게 먼저 이야기를 꺼내는 편이다.",
    axis: "engage",
    reverse: false,
  },
  {
    id: "q03",
    text: "문제가 생기면 해결에 필요한 정보나 자료부터 찾아본다.",
    axis: "focus",
    reverse: false,
  },
  {
    id: "q04",
    text: "문제 상황이 생기면 바로 관련된 사람과 부딪혀서 해결하려 한다.",
    axis: "engage",
    reverse: false,
  },
  {
    id: "q05",
    text: "스트레스의 원인이 되는 업무는 구체적인 계획을 세워 처리하려 한다.",
    axis: "focus",
    reverse: false,
  },
  {
    id: "q06",
    text: "스트레스 상황에서는 내 의견이나 감정을 적극적으로 표현하는 편이다.",
    axis: "engage",
    reverse: false,
  },
  {
    id: "q07",
    text: "압박감이 클수록 오히려 해결책을 찾는 데 더 집중하게 된다.",
    axis: "focus",
    reverse: false,
  },
  {
    id: "q08",
    text: "곤란한 업무 상황일수록 더 적극적으로 나서서 처리하는 편이다.",
    axis: "engage",
    reverse: false,
  },
  {
    id: "q09",
    text: "문제 해결보다는 지금 느끼는 감정을 다스리는 데 먼저 신경 쓴다.",
    axis: "focus",
    reverse: true,
  },
  {
    id: "q10",
    text: "스트레스 받는 상황에서는 잠시 그 일과 거리를 두고 싶어진다.",
    axis: "engage",
    reverse: true,
  },
  {
    id: "q11",
    text: "상황 자체보다 그로 인한 내 기분을 가라앉히는 것이 우선이다.",
    axis: "focus",
    reverse: true,
  },
  {
    id: "q12",
    text: "곤란한 상황이 생기면 바로 나서기보다 시간을 두고 지켜보는 편이다.",
    axis: "engage",
    reverse: true,
  },
  {
    id: "q13",
    text: "힘든 업무 상황에서는 의미를 찾거나 마음을 다잡는 방법을 먼저 떠올린다.",
    axis: "focus",
    reverse: true,
  },
  {
    id: "q14",
    text: "스트레스 받을 때는 다른 사람과 얘기하기보다 혼자 정리할 시간이 필요하다.",
    axis: "engage",
    reverse: true,
  },
  {
    id: "q15",
    text: "해결책을 고민하기보다 일단 마음을 편안하게 만드는 것부터 한다.",
    axis: "focus",
    reverse: true,
  },
  {
    id: "q16",
    text: "급한 상황이라도 마음이 충분히 가라앉은 뒤에야 움직이고 싶다.",
    axis: "engage",
    reverse: true,
  },
];
