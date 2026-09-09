import type { Question } from "../types";

/**
 * 12문항 · 문항당 2지선다.
 *
 * 각 문항은 축 하나만 담당하고, high 극 선택지를 고르면 그 축에 weight 만큼,
 * low 극 선택지를 고르면 0점이 더해진다. 선택지가 결과 캐릭터에 직접 점수를 주는
 * 구조가 아니라, 축 점수를 먼저 계산한 뒤 캐릭터 기준 프로필과 비교한다.
 *
 * 축별 가중치 구성은 [2, 2, 2, 1] → 합 7. 무작위 응답 기준으로 high/low가
 * 6:6으로 나뉘어 어느 한쪽 극이 구조적으로 유리하지 않다.
 * (docs/test-design.md 참고)
 *
 * 정답이 있는 문항이 아니므로 두 선택지 모두 긍정적으로 읽히도록 작성했고,
 * high 극 선택지가 항상 같은 위치에 오지 않게 순서를 번갈아 배치했다.
 *
 * 응답 기준: "새로운 사람들과 함께 지내며 서로를 알아가는 자리에서의 나".
 */
export const QUESTIONS: Question[] = [
  {
    id: "p1",
    axis: "pace",
    weight: 2,
    text: "마음이 가는 사람이 생겼을 때 나는",
    choices: [
      { label: "티 나게 다가가서 먼저 대화를 만든다", pole: "high" },
      { label: "며칠 지켜보며 내 마음을 먼저 확인한다", pole: "low" },
    ],
  },
  {
    id: "s1",
    axis: "spotlight",
    weight: 2,
    text: "처음 다 같이 모인 자리에서 나는",
    choices: [
      { label: "조용히 듣다가 자연스럽게 스며든다", pole: "low" },
      { label: "먼저 말을 걸어 분위기를 연다", pole: "high" },
    ],
  },
  {
    id: "b1",
    axis: "basis",
    weight: 2,
    text: "상대를 알아갈 때 더 먼저 살피는 건",
    choices: [
      { label: "가치관과 생활 방식이 잘 맞는지", pole: "high" },
      { label: "함께 있을 때 편하고 설레는지", pole: "low" },
    ],
  },
  {
    id: "p2",
    axis: "pace",
    weight: 2,
    text: "좋았던 대화가 끝난 다음 날, 나는",
    choices: [
      { label: "상대가 먼저 연락할 여지를 남겨둔다", pole: "low" },
      { label: "먼저 연락해서 어제 이야기를 이어간다", pole: "high" },
    ],
  },
  {
    id: "s2",
    axis: "spotlight",
    weight: 2,
    text: "여러 명이 함께 이야기하는 자리에서 나는",
    choices: [
      { label: "리액션이 크고 화제를 자주 꺼낸다", pole: "high" },
      { label: "듣는 쪽에 있다가 필요한 말을 보탠다", pole: "low" },
    ],
  },
  {
    id: "b2",
    axis: "basis",
    weight: 2,
    text: "관계가 진지해질수록 나는",
    choices: [
      { label: "지금 느끼는 감정이 가장 중요하다", pole: "low" },
      { label: "앞으로의 계획이 맞는지 확인하고 싶다", pole: "high" },
    ],
  },
  {
    id: "p3",
    axis: "pace",
    weight: 2,
    text: "상대의 마음이 아직 애매해 보일 때 나는",
    choices: [
      { label: "내 마음을 먼저 알려주고 반응을 본다", pole: "high" },
      { label: "확실해질 때까지 표현을 아낀다", pole: "low" },
    ],
  },
  {
    id: "s3",
    axis: "spotlight",
    weight: 2,
    text: "나를 소개해야 할 때 나는",
    choices: [
      { label: "담백하게 필요한 만큼만 말한다", pole: "low" },
      { label: "장점을 자신 있게 보여주는 편이다", pole: "high" },
    ],
  },
  {
    id: "b3",
    axis: "basis",
    weight: 2,
    text: "두 사람 사이에서 고민될 때 나는",
    choices: [
      { label: "각각의 장단점을 차분히 정리해본다", pole: "high" },
      { label: "더 끌리는 쪽으로 마음을 따라간다", pole: "low" },
    ],
  },
  {
    id: "p4",
    axis: "pace",
    weight: 1,
    text: "좋은 사람을 만났을 때 관계의 속도는",
    choices: [
      { label: "천천히 알아가며 맞춰가는 게 좋다", pole: "low" },
      { label: "확신이 들면 빠르게 가까워지는 게 좋다", pole: "high" },
    ],
  },
  {
    id: "s4",
    axis: "spotlight",
    weight: 1,
    text: "분위기가 어색해졌을 때 나는",
    choices: [
      { label: "먼저 말을 꺼내 분위기를 바꾼다", pole: "high" },
      { label: "상황을 지켜보며 조용히 기다린다", pole: "low" },
    ],
  },
  {
    id: "b4",
    axis: "basis",
    weight: 1,
    text: "오래 함께할 사람을 고른다면 더 중요한 건",
    choices: [
      { label: "곁에 있을 때의 설렘과 편안함", pole: "low" },
      { label: "함께 살아갈 때의 안정감", pole: "high" },
    ],
  },
];
