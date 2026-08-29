import type { Question } from "../types";

/**
 * 12문항 · 문항당 2지선다.
 *
 * 각 문항은 축 하나만 담당하고, high 극 선택지를 고르면 그 축에 weight 만큼,
 * low 극 선택지를 고르면 0점이 더해진다. 선택지가 결과 유형에 직접 점수를 주는
 * 구조가 아니라, 축 점수를 먼저 계산한 뒤 유형을 정한다.
 *
 * 축별 가중치 구성은 [2, 2, 2, 1] → 합 7 (홀수)이라 축 점수가 정확히 절반이 되는
 * 동점이 발생하지 않는다. 또한 무작위 응답 기준으로 high/low가 8:8로 나뉘어
 * 어느 한쪽 극이 구조적으로 유리하지 않다. (docs/test-design.md 참고)
 *
 * 정답이 있는 문항이 아니므로 두 선택지 모두 긍정적으로 읽히도록 작성했고,
 * high 극 선택지가 항상 같은 위치에 오지 않게 순서를 번갈아 배치했다.
 *
 * 응답 기준: "평소 점심시간을 보내는 나".
 */
export const QUESTIONS: Question[] = [
  {
    id: "q1",
    axis: "decide",
    weight: 2,
    text: "점심시간이 다가온다.",
    choices: [
      { label: "미리 정해둔 메뉴나 식당으로 향한다", pole: "high" },
      { label: "그 자리에서 뭘 먹을지 정한다", pole: "low" },
    ],
  },
  {
    id: "q2",
    axis: "company",
    weight: 2,
    text: "점심을 먹으러 나갈 때",
    choices: [
      { label: "혼자 조용히 나간다", pole: "low" },
      { label: "동료들과 함께 나간다", pole: "high" },
    ],
  },
  {
    id: "q3",
    axis: "use",
    weight: 2,
    text: "점심시간이 주어지면",
    choices: [
      { label: "오후를 위해 쉬는 데 시간을 쓴다", pole: "high" },
      { label: "개인 용무나 자기계발에 시간을 쓴다", pole: "low" },
    ],
  },
  {
    id: "q4",
    axis: "decide",
    weight: 2,
    text: "오늘 점심 메뉴를 정할 때",
    choices: [
      { label: "메뉴판을 보고 그때 고른다", pole: "low" },
      { label: "어제부터 뭘 먹을지 생각해 뒀다", pole: "high" },
    ],
  },
  {
    id: "q5",
    axis: "company",
    weight: 2,
    text: "동료가 같이 점심 먹자고 물어본다.",
    choices: [
      { label: "좋다고 하고 함께 움직인다", pole: "high" },
      { label: "오늘은 혼자 먹고 싶다고 말한다", pole: "low" },
    ],
  },
  {
    id: "q6",
    axis: "use",
    weight: 2,
    text: "점심시간이 평소보다 여유롭게 남았다.",
    choices: [
      { label: "밀린 개인 용무를 처리한다", pole: "low" },
      { label: "잠깐 눈을 붙이거나 쉰다", pole: "high" },
    ],
  },
  {
    id: "q7",
    axis: "decide",
    weight: 2,
    text: "새로 생긴 식당 이야기를 들었다.",
    choices: [
      { label: "언제 가볼지 미리 계획을 세워 둔다", pole: "high" },
      { label: "지나가다 생각나면 그냥 들어가 본다", pole: "low" },
    ],
  },
  {
    id: "q8",
    axis: "company",
    weight: 2,
    text: "회사 근처에서 혼자 밥 먹는 동료를 봤다.",
    choices: [
      { label: "나라면 자연스럽게 합석을 물어봤을 것 같다", pole: "high" },
      { label: "나도 가끔은 그렇게 혼자 먹는 게 편하다", pole: "low" },
    ],
  },
  {
    id: "q9",
    axis: "use",
    weight: 2,
    text: "점심시간에 카페에 들렀다.",
    choices: [
      { label: "노트북이나 책을 펴고 할 일을 한다", pole: "low" },
      { label: "커피를 마시며 잠깐 여유를 즐긴다", pole: "high" },
    ],
  },
  {
    id: "q10",
    axis: "decide",
    weight: 1,
    text: "점심시간이 시작되기 직전이다.",
    choices: [
      { label: "이미 어디로 갈지 정해져 있다", pole: "high" },
      { label: "동료들과 얘기하며 그때 정한다", pole: "low" },
    ],
  },
  {
    id: "q11",
    axis: "company",
    weight: 1,
    text: "혼자만의 점심시간이 이어지고 있다.",
    choices: [
      { label: "누군가와 같이 먹고 싶다는 생각이 든다", pole: "high" },
      { label: "이런 시간이 오히려 편하고 좋다", pole: "low" },
    ],
  },
  {
    id: "q12",
    axis: "use",
    weight: 1,
    text: "점심시간이 끝나갈 무렵을 돌아보면",
    choices: [
      { label: "몸과 마음이 한결 가벼워져 있다", pole: "high" },
      { label: "해야 할 일을 하나 처리해서 뿌듯하다", pole: "low" },
    ],
  },
];
