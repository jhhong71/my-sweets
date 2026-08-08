import type { Question } from "../types";

/**
 * 전체 16문항. "최근 회사에서 새로운 업무 툴·시스템·프로세스를 배워야 했던
 * 상황이라면 요즘의 나는 어떻게 할까"를 공통 기준으로 작성했다.
 *
 * concept축: 개념형(높음) ↔ 경험형(낮음)
 * action축 : 실행형(높음) ↔ 관찰형(낮음)
 *
 * 역방향 문항(reverse: true)은 채점 시 6 - 응답값으로 반전해, 반전 후
 * 값이 클수록 항상 "개념형" 또는 "실행형" 방향을 가리키도록 통일했다.
 */
export const QUESTIONS: Question[] = [
  {
    id: "q01",
    text: "새 업무 툴을 배우기 전에 먼저 개념 설명이나 매뉴얼부터 확인한다.",
    axis: "concept",
    reverse: false,
  },
  {
    id: "q02",
    text: "새 기능을 알게 되면 바로 실제 업무에 적용해보고 싶어진다.",
    axis: "action",
    reverse: false,
  },
  {
    id: "q03",
    text: "낯선 기능을 마주치면 왜 이렇게 동작하는지 원리부터 알아야 마음이 편하다.",
    axis: "concept",
    reverse: false,
  },
  {
    id: "q04",
    text: "배운 내용은 최대한 빨리 실전에서 써봐야 진짜 익혔다는 느낌이 든다.",
    axis: "action",
    reverse: false,
  },
  {
    id: "q05",
    text: "새로운 프로세스를 배울 때 전체 구조와 기준을 먼저 정리해두고 싶다.",
    axis: "concept",
    reverse: false,
  },
  {
    id: "q06",
    text: "새로운 툴이 생기면 남들보다 먼저 이것저것 시도해보는 편이다.",
    axis: "action",
    reverse: false,
  },
  {
    id: "q07",
    text: "교육 자료에 배경 이론이나 원칙이 잘 설명되어 있으면 더 신뢰가 간다.",
    axis: "concept",
    reverse: false,
  },
  {
    id: "q08",
    text: "완벽히 준비되지 않아도 일단 시작하면서 방법을 찾아가는 게 편하다.",
    axis: "action",
    reverse: false,
  },
  {
    id: "q09",
    text: "원리를 다 몰라도 몸으로 몇 번 겪어보면 자연스럽게 익혀진다고 생각한다.",
    axis: "concept",
    reverse: true,
  },
  {
    id: "q10",
    text: "실제로 써보기 전에 다른 사람이 사용하는 모습을 충분히 지켜보고 싶다.",
    axis: "action",
    reverse: true,
  },
  {
    id: "q11",
    text: "개념 설명을 듣기보다 실제 상황에서 부딪히며 배우는 것이 나에게 더 잘 맞는다.",
    axis: "concept",
    reverse: true,
  },
  {
    id: "q12",
    text: "새로운 방식은 여러 번 관찰하고 정리한 뒤에야 시도할 마음이 든다.",
    axis: "action",
    reverse: true,
  },
  {
    id: "q13",
    text: "이론적인 배경 설명이 길어지면 오히려 집중이 잘 안 된다.",
    axis: "concept",
    reverse: true,
  },
  {
    id: "q14",
    text: "곧바로 실행하기보다 예상되는 상황을 먼저 차분히 검토해보고 싶다.",
    axis: "action",
    reverse: true,
  },
  {
    id: "q15",
    text: "새로운 업무는 원리를 따지기보다 어떻게 되는지 직접 겪으며 감으로 익히는 편이다.",
    axis: "concept",
    reverse: true,
  },
  {
    id: "q16",
    text: "충분히 준비됐다는 확신이 들기 전에는 새로운 방식을 잘 시도하지 않는다.",
    axis: "action",
    reverse: true,
  },
];
