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
 * 문항은 커피를 직접 고르는 상황뿐 아니라 일상 속 취향·기분·리듬도 함께 묻는다.
 * 응답 기준: "평소의 나".
 */
export const QUESTIONS: Question[] = [
  {
    id: "i1",
    axis: "intensity",
    weight: 2,
    text: "커피를 마실 때 나는",
    choices: [
      { label: "진하고 묵직한 맛이 확 느껴져야 마신 것 같다", pole: "high" },
      { label: "부드럽고 순한 맛이 편하게 느껴진다", pole: "low" },
    ],
  },
  {
    id: "s1",
    axis: "sweetness",
    weight: 2,
    text: "디저트를 고른다면",
    choices: [
      { label: "설탕을 거의 넣지 않은 담백한 쪽", pole: "low" },
      { label: "달콤한 시럽이나 크림이 듬뿍 올라간 쪽", pole: "high" },
    ],
  },
  {
    id: "t1",
    axis: "tempo",
    weight: 2,
    text: "카페에서 커피를 주문할 때 나는",
    choices: [
      { label: "테이크아웃으로 빠르게 받아 이동한다", pole: "high" },
      { label: "자리에 앉아 여유롭게 마신다", pole: "low" },
    ],
  },
  {
    id: "i2",
    axis: "intensity",
    weight: 2,
    text: "하루를 시작할 때 나에게 필요한 자극은",
    choices: [
      { label: "은은하게 서서히 깨어나는 정도", pole: "low" },
      { label: "강하게 정신이 확 드는 각성", pole: "high" },
    ],
  },
  {
    id: "s2",
    axis: "sweetness",
    weight: 2,
    text: "힘든 하루를 보내고 나면 나는",
    choices: [
      { label: "달달한 걸 먹어야 기분이 풀린다", pole: "high" },
      { label: "그냥 담백하게 넘기는 편이다", pole: "low" },
    ],
  },
  {
    id: "t2",
    axis: "tempo",
    weight: 2,
    text: "새로운 업무나 할 일이 주어지면 나는",
    choices: [
      { label: "천천히 계획을 세운 뒤 움직인다", pole: "low" },
      { label: "바로 시작해서 빠르게 처리한다", pole: "high" },
    ],
  },
  {
    id: "i3",
    axis: "intensity",
    weight: 2,
    text: "좋아하는 초콜릿은",
    choices: [
      { label: "카카오 함량 높은 진한 다크초콜릿", pole: "high" },
      { label: "부드럽게 녹는 밀크초콜릿", pole: "low" },
    ],
  },
  {
    id: "s3",
    axis: "sweetness",
    weight: 2,
    text: "친구에게 음료를 사줄 때 나는",
    choices: [
      { label: "있는 그대로 깔끔하게 주문한다", pole: "low" },
      { label: "시럽이나 휘핑을 추가해서 살뜰히 챙긴다", pole: "high" },
    ],
  },
  {
    id: "t3",
    axis: "tempo",
    weight: 2,
    text: "커피 한 잔을 다 마시는 데 걸리는 시간은",
    choices: [
      { label: "금방 후루룩 비우는 편", pole: "high" },
      { label: "오래 두고 조금씩 즐기는 편", pole: "low" },
    ],
  },
  {
    id: "i4",
    axis: "intensity",
    weight: 1,
    text: "대화할 때 나의 감정 표현은",
    choices: [
      { label: "확실하고 강하게 드러내는 편", pole: "high" },
      { label: "은은하고 잔잔하게 드러내는 편", pole: "low" },
    ],
  },
  {
    id: "s4",
    axis: "sweetness",
    weight: 1,
    text: "선물 포장을 고른다면",
    choices: [
      { label: "심플하고 깔끔한 쪽", pole: "low" },
      { label: "리본과 장식이 화려하게 달린 쪽", pole: "high" },
    ],
  },
  {
    id: "t4",
    axis: "tempo",
    weight: 1,
    text: "여행 일정을 짤 때 나는",
    choices: [
      { label: "여유 있게 비워두고 즉흥적으로 다닌다", pole: "low" },
      { label: "촘촘하게 채워서 알차게 다닌다", pole: "high" },
    ],
  },
];
