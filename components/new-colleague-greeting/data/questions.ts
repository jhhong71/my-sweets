import type { Question } from "../types";

/**
 * 12문항 · 문항당 2지선다.
 *
 * 각 문항은 축 하나만 담당하고, high 극 선택지를 고르면 그 축에 weight 만큼,
 * low 극 선택지를 고르면 0점이 더해진다. 선택지가 결과 유형에 직접 점수를 주는
 * 구조가 아니라, 축 점수를 먼저 계산한 뒤 유형을 정한다.
 *
 * 축별 가중치 구성은 [2, 2, 2, 1] → 합 7 (홀수)이라 축 점수가 정확히 절반이 되는
 * 동점이 발생하지 않는다. 또한 무작위 응답 기준으로 high/low가 6:6으로 나뉘어
 * 어느 한쪽 극이 구조적으로 유리하지 않다. (docs/test-design.md 참고)
 *
 * 정답이 있는 문항이 아니므로 두 선택지 모두 긍정적으로 읽히도록 작성했고,
 * high 극 선택지가 항상 같은 위치에 오지 않게 순서를 번갈아 배치했다.
 *
 * 응답 기준: "회사에 새로운 동료(팀원)가 들어왔을 때 요즘의 나".
 */
export const QUESTIONS: Question[] = [
  {
    id: "q1",
    axis: "approach",
    weight: 2,
    text: "새로 온 동료가 첫 출근을 한 날",
    choices: [
      { label: "내가 먼저 다가가 인사를 건넨다", pole: "high" },
      { label: "상대가 먼저 말을 걸어주기를 기다린다", pole: "low" },
    ],
  },
  {
    id: "q2",
    axis: "curiosity",
    weight: 2,
    text: "새 동료와 짧은 대화를 나누게 됐다.",
    choices: [
      { label: "굳이 캐묻지 않고 자연스러운 대화를 즐긴다", pole: "low" },
      { label: "이전에 어떤 일을 했는지 이것저것 물어본다", pole: "high" },
    ],
  },
  {
    id: "q3",
    axis: "warmth",
    weight: 2,
    text: "새 동료와 며칠째 함께 일하고 있다.",
    choices: [
      { label: "벌써 편하게 농담도 주고받는 사이가 됐다", pole: "high" },
      { label: "아직은 예의를 갖춰 존댓말로 대화한다", pole: "low" },
    ],
  },
  {
    id: "q4",
    axis: "approach",
    weight: 2,
    text: "점심시간, 새 동료가 아직 어디서 밥을 먹어야 할지 몰라 보인다.",
    choices: [
      { label: "누군가 챙겨주겠거니 하고 지켜본다", pole: "low" },
      { label: "먼저 같이 먹자고 말을 건다", pole: "high" },
    ],
  },
  {
    id: "q5",
    axis: "curiosity",
    weight: 2,
    text: "새 동료의 업무 스타일이 아직 낯설다.",
    choices: [
      { label: "직접 어떤 방식으로 일하는지 물어본다", pole: "high" },
      { label: "같이 일하면서 자연스럽게 알아간다", pole: "low" },
    ],
  },
  {
    id: "q6",
    axis: "warmth",
    weight: 2,
    text: "새 동료에게 실수를 짚어줘야 하는 상황이 생겼다.",
    choices: [
      { label: "조심스럽게 예의를 갖춰 이야기한다", pole: "low" },
      { label: "편하게 웃으며 가볍게 짚어준다", pole: "high" },
    ],
  },
  {
    id: "q7",
    axis: "approach",
    weight: 2,
    text: "회의에서 새 동료가 처음 발언 기회를 얻었다.",
    choices: [
      { label: "발언이 끝나면 먼저 리액션이나 질문을 건넨다", pole: "high" },
      { label: "다른 사람들의 반응을 먼저 살핀다", pole: "low" },
    ],
  },
  {
    id: "q8",
    axis: "curiosity",
    weight: 2,
    text: "다과 시간에 새 동료 옆에 앉게 됐다.",
    choices: [
      { label: "상대가 이야기를 꺼낼 때까지 편하게 있는다", pole: "low" },
      { label: "궁금한 걸 이것저것 물어보며 대화를 이끈다", pole: "high" },
    ],
  },
  {
    id: "q9",
    axis: "warmth",
    weight: 2,
    text: "새 동료와 메신저로 대화할 일이 생겼다.",
    choices: [
      { label: "이모티콘도 쓰며 편하게 메시지를 보낸다", pole: "high" },
      { label: "격식을 갖춰 정중하게 메시지를 쓴다", pole: "low" },
    ],
  },
  {
    id: "q10",
    axis: "approach",
    weight: 1,
    text: "새 동료의 자리가 내 옆자리로 정해졌다.",
    choices: [
      { label: "자연스럽게 마주칠 때를 기다린다", pole: "low" },
      { label: "바로 자기소개를 하며 말을 건다", pole: "high" },
    ],
  },
  {
    id: "q11",
    axis: "curiosity",
    weight: 1,
    text: "새 동료가 아직 회사 시스템에 서툴러 보인다.",
    choices: [
      { label: "어디까지 알고 있는지 물어보고 필요한 걸 알려준다", pole: "high" },
      { label: "물어보면 알려주되 먼저 캐묻지는 않는다", pole: "low" },
    ],
  },
  {
    id: "q12",
    axis: "warmth",
    weight: 1,
    text: "새 동료와 일주일 정도 함께 일했다.",
    choices: [
      { label: "아직은 적당한 거리를 유지하는 게 편하다", pole: "low" },
      { label: "이제는 편한 친구처럼 느껴진다", pole: "high" },
    ],
  },
];
