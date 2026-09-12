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
 * 어느 한쪽 극이 구조적으로 유리하지 않다.
 *
 * 정답이 있는 문항이 아니므로 두 선택지 모두 긍정적으로 읽히도록 작성했고,
 * high 극 선택지가 항상 같은 위치에 오지 않게 순서를 섞어 배치했다.
 *
 * 응답 기준: "평소 집이나 사무실에서 식물(화분)을 돌보는 나".
 */
export const QUESTIONS: Question[] = [
  {
    id: "ro1",
    axis: "routine",
    weight: 2,
    text: "물을 언제 줄지 정할 때",
    choices: [
      { label: "요일을 정해두고 그 날에 맞춰 준다", pole: "high" },
      { label: "그때그때 생각날 때 준다", pole: "low" },
    ],
  },
  {
    id: "ca1",
    axis: "care",
    weight: 2,
    text: "식물 잎 색이 조금 달라지면",
    choices: [
      { label: "시간이 꽤 지나야 알아차리는 편이다", pole: "low" },
      { label: "바로 알아차리고 원인을 살펴본다", pole: "high" },
    ],
  },
  {
    id: "ex1",
    axis: "explore",
    weight: 2,
    text: "새로운 식물을 보면",
    choices: [
      { label: "지금 키우는 식물에 집중하고 싶다", pole: "low" },
      { label: "일단 들여서 키워보고 싶어진다", pole: "high" },
    ],
  },
  {
    id: "ro2",
    axis: "routine",
    weight: 2,
    text: "식물을 새로 들이면",
    choices: [
      { label: "급수일이나 관리 방법을 메모해둔다", pole: "high" },
      { label: "따로 기록하지 않고 감으로 관리한다", pole: "low" },
    ],
  },
  {
    id: "ca2",
    axis: "care",
    weight: 2,
    text: "평소에",
    choices: [
      { label: "지나갈 때마다 잎이나 흙 상태를 한 번씩 들여다본다", pole: "high" },
      { label: "특별한 일이 없으면 잘 들여다보지 않는다", pole: "low" },
    ],
  },
  {
    id: "ex2",
    axis: "explore",
    weight: 2,
    text: "가지치기나 물꽂이 같은 번식을 시도하는 것에 대해",
    choices: [
      { label: "하던 방식 그대로 유지하는 편이다", pole: "low" },
      { label: "새로운 방법을 계속 시도해본다", pole: "high" },
    ],
  },
  {
    id: "ro3",
    axis: "routine",
    weight: 2,
    text: "비료나 영양제는",
    choices: [
      { label: "정해진 주기에 맞춰 챙겨서 준다", pole: "high" },
      { label: "생각날 때 한 번씩 준다", pole: "low" },
    ],
  },
  {
    id: "ca3",
    axis: "care",
    weight: 2,
    text: "먼지 쌓인 잎을 보면",
    choices: [
      { label: "눈에 띄어도 나중에 하자고 미뤄둔다", pole: "low" },
      { label: "바로 닦아주거나 씻어준다", pole: "high" },
    ],
  },
  {
    id: "ex3",
    axis: "explore",
    weight: 2,
    text: "오래 키운 화분을 보면",
    choices: [
      { label: "정든 만큼 계속 같이 지내고 싶다", pole: "low" },
      { label: "새 화분으로 바꾸거나 다른 식물을 들이고 싶어진다", pole: "high" },
    ],
  },
  {
    id: "ro4",
    axis: "routine",
    weight: 1,
    text: "화분 위치를 정할 때",
    choices: [
      { label: "계절별로 옮길 자리를 미리 계획해둔다", pole: "high" },
      { label: "일단 두고 필요하면 그때 옮긴다", pole: "low" },
    ],
  },
  {
    id: "ca4",
    axis: "care",
    weight: 1,
    text: "화분에 벌레가 생기면",
    choices: [
      { label: "꽤 심해지고 나서야 알아챌 때가 많다", pole: "low" },
      { label: "바로 알아채고 신경 써서 대처한다", pole: "high" },
    ],
  },
  {
    id: "ex4",
    axis: "explore",
    weight: 1,
    text: "흙이나 화분 종류를 고를 때",
    choices: [
      { label: "한 번 좋았던 것을 계속 쓴다", pole: "low" },
      { label: "다양한 종류를 바꿔가며 써본다", pole: "high" },
    ],
  },
];
