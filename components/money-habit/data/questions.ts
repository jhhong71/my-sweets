import type { Question } from "../types";

/**
 * 전체 18문항. "월급이나 용돈처럼 정기적으로 들어오는 돈을 관리할 때 평소
 * 자신의 모습"을 공통 기준으로 작성했다.
 *
 * plan축   : 계획적 현금흐름 관리(높음) ↔ 흐름에 맡김(낮음)
 * save축   : 저축·목돈마련 우선(높음) ↔ 현재 소비·경험 우선(낮음)
 * credit축 : 신중한 카드·할부 사용(높음) ↔ 편한 카드·할부 사용(낮음)
 *
 * 축당 정방향 3문항 + 역방향 3문항으로 구성했다. 역방향 문항(reverse: true)은
 * 채점 시 6 - 응답값으로 반전해, 반전 후 값이 클수록 항상 해당 축의 "높음"
 * 방향을 가리키도록 통일했다. 표시 순서는 plan → save → credit을
 * 반복하며 정방향과 역방향을 번갈아 배치해 패턴을 감지하기 어렵게 했다.
 */
export const QUESTIONS: Question[] = [
  {
    id: "q1",
    text: "월급이나 용돈이 들어오면 얼마를 어디에 쓸지 미리 계획을 세우는 편이다.",
    axis: "plan",
    reverse: false,
  },
  {
    id: "q2",
    text: "돈이 생기면 먼저 일정 금액을 저축하고 남은 돈을 쓰는 편이다.",
    axis: "save",
    reverse: false,
  },
  {
    id: "q3",
    text: "카드값이 이번 달 감당할 수 있는 범위 안에 있는지 미리 가늠해보고 사용하는 편이다.",
    axis: "credit",
    reverse: false,
  },
  {
    id: "q4",
    text: "돈이 어디로 나갔는지 나중에 보고 나서야 아는 경우가 많다.",
    axis: "plan",
    reverse: true,
  },
  {
    id: "q5",
    text: "저축보다는 지금 하고 싶은 것에 돈을 쓰는 게 더 중요하다고 생각한다.",
    axis: "save",
    reverse: true,
  },
  {
    id: "q6",
    text: "당장 필요하면 나중 결제 부담은 크게 생각하지 않고 카드를 쓰는 편이다.",
    axis: "credit",
    reverse: true,
  },
  {
    id: "q7",
    text: "이번 달에 얼마를 썼는지 대략적인 지출 내역을 파악하고 있는 편이다.",
    axis: "plan",
    reverse: false,
  },
  {
    id: "q8",
    text: "목돈이 필요한 목표(여행, 이사 등)를 위해 꾸준히 모아두는 편이다.",
    axis: "save",
    reverse: false,
  },
  {
    id: "q9",
    text: "할부를 이용할 때는 매달 상환액을 미리 계산해보고 결정하는 편이다.",
    axis: "credit",
    reverse: false,
  },
  {
    id: "q10",
    text: "이번 달 지출 계획을 따로 세우지 않고 그때그때 쓰는 편이다.",
    axis: "plan",
    reverse: true,
  },
  {
    id: "q11",
    text: "특별한 목표 없이 돈이 생기는 대로 쓰는 편이다.",
    axis: "save",
    reverse: true,
  },
  {
    id: "q12",
    text: "할부가 가능하면 크게 고민하지 않고 나눠서 결제하는 편이다.",
    axis: "credit",
    reverse: true,
  },
  {
    id: "q13",
    text: "정기적으로 나가는 고정 지출(월세, 통신비 등)을 목록으로 정리해 관리하는 편이다.",
    axis: "plan",
    reverse: false,
  },
  {
    id: "q14",
    text: "예상치 못한 지출에 대비해 비상금을 따로 마련해두는 편이다.",
    axis: "save",
    reverse: false,
  },
  {
    id: "q15",
    text: "카드 명세서나 결제 내역을 정기적으로 확인하는 편이다.",
    axis: "credit",
    reverse: false,
  },
  {
    id: "q16",
    text: "통장 잔액을 확인하지 않고 지내다가 갑자기 확인하는 경우가 많다.",
    axis: "plan",
    reverse: true,
  },
  {
    id: "q17",
    text: "미래를 위해 아끼기보다 지금의 만족을 위해 소비하는 편이다.",
    axis: "save",
    reverse: true,
  },
  {
    id: "q18",
    text: "카드 명세서를 자세히 들여다보지 않고 넘기는 경우가 많다.",
    axis: "credit",
    reverse: true,
  },
];
