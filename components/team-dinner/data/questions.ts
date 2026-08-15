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
 * 응답 기준: "회식 자리에서 요즘의 나".
 */
export const QUESTIONS: Question[] = [
  {
    id: "q1",
    axis: "energy",
    weight: 2,
    text: "건배사 순서가 슬슬 돌아오려는 분위기다.",
    choices: [
      { label: "내가 먼저 나서서 분위기를 띄운다", pole: "high" },
      { label: "누군가 나설 때까지 조용히 지켜본다", pole: "low" },
    ],
  },
  {
    id: "q2",
    axis: "stay",
    weight: 2,
    text: "1차가 끝날 시간이 다가오고 있다.",
    choices: [
      { label: "이쯤에서 마무리하고 싶어진다", pole: "low" },
      { label: "2차까지는 자연스럽게 함께한다", pole: "high" },
    ],
  },
  {
    id: "q3",
    axis: "depth",
    weight: 2,
    text: "오랜만에 옆자리에 앉은 동료와 대화가 시작됐다.",
    choices: [
      { label: "요즘 고민이나 속마음을 조금 나눈다", pole: "high" },
      { label: "가벼운 요즘 근황 정도만 주고받는다", pole: "low" },
    ],
  },
  {
    id: "q4",
    axis: "energy",
    weight: 2,
    text: "옆자리 동료가 재미있는 이야기를 꺼냈다.",
    choices: [
      { label: "웃으며 듣다가 가끔 한마디씩 보탠다", pole: "low" },
      { label: "맞장구치며 대화에 적극적으로 끼어든다", pole: "high" },
    ],
  },
  {
    id: "q5",
    axis: "stay",
    weight: 2,
    text: "막차 시간이 애매하게 걸쳐 있다.",
    choices: [
      { label: "택시를 타더라도 끝까지 있는 쪽을 고른다", pole: "high" },
      { label: "막차 시간에 맞춰 자리에서 일어난다", pole: "low" },
    ],
  },
  {
    id: "q6",
    axis: "depth",
    weight: 2,
    text: "팀장님이 갑자기 진지한 이야기를 꺼냈다.",
    choices: [
      { label: "적당히 맞장구치며 가볍게 넘긴다", pole: "low" },
      { label: "나도 솔직한 생각을 보태본다", pole: "high" },
    ],
  },
  {
    id: "q7",
    axis: "energy",
    weight: 2,
    text: "다 같이 사진을 찍자는 이야기가 나왔다.",
    choices: [
      { label: "포즈를 제안하며 분위기를 이끈다", pole: "high" },
      { label: "옆에서 자연스럽게 따라간다", pole: "low" },
    ],
  },
  {
    id: "q8",
    axis: "stay",
    weight: 2,
    text: "다음 날 아침 일정이 없는 여유로운 회식 날이다.",
    choices: [
      { label: "적당히 즐겼으면 그걸로 충분하다", pole: "low" },
      { label: "오랜만이니 끝까지 자리를 지킨다", pole: "high" },
    ],
  },
  {
    id: "q9",
    axis: "depth",
    weight: 2,
    text: "대화 주제를 내가 고를 수 있다면?",
    choices: [
      { label: "요즘 느끼는 고민이나 생각", pole: "high" },
      { label: "가볍게 웃을 수 있는 이야기", pole: "low" },
    ],
  },
  {
    id: "q10",
    axis: "energy",
    weight: 1,
    text: "노래방으로 2차를 가게 됐다.",
    choices: [
      { label: "다른 사람 노래를 듣는 게 더 편하다", pole: "low" },
      { label: "곧바로 부를 곡을 고르며 분위기를 만든다", pole: "high" },
    ],
  },
  {
    id: "q11",
    axis: "stay",
    weight: 1,
    text: "회식이 예상보다 길어지고 있다.",
    choices: [
      { label: "이왕 온 거 마지막까지 함께한다", pole: "high" },
      { label: "적당한 타이밍에 조용히 빠진다", pole: "low" },
    ],
  },
  {
    id: "q12",
    axis: "depth",
    weight: 1,
    text: "회식이 끝나고 오래 기억에 남는 건?",
    choices: [
      { label: "다 같이 웃었던 유쾌한 순간", pole: "low" },
      { label: "누군가와 나눈 진솔한 한마디", pole: "high" },
    ],
  },
];
