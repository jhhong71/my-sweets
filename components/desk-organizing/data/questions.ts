import type { Question } from "../types";

/**
 * 12문항 · 문항당 2지선다.
 *
 * 각 문항은 축 하나만 담당하고, high 극 선택지를 고르면 그 축에 weight 만큼,
 * low 극 선택지를 고르면 0점이 더해진다. 선택지가 결과 유형에 직접 점수를 주는
 * 구조가 아니라, 축 점수를 먼저 계산한 뒤 유형을 정한다.
 *
 * 축별 가중치 구성은 [2, 2, 2, 1] → 합 7 (홀수)이라 축 점수가 정확히 절반이 되는
 * 동점이 발생하지 않는다. (docs/test-design.md 참고)
 *
 * 정답이 있는 문항이 아니므로 두 선택지 모두 긍정적으로 읽히도록 작성했고,
 * high 극 선택지가 항상 같은 위치에 오지 않게 순서를 번갈아 배치했다.
 *
 * 응답 기준: "책상과 주변, 그리고 디지털 파일을 정리할 때의 요즘 나".
 */
export const QUESTIONS: Question[] = [
  {
    id: "q1",
    axis: "plan",
    weight: 2,
    text: "책상을 정리하기로 마음먹었다. 가장 먼저 하는 일은?",
    choices: [
      { label: "버릴 것과 남길 것 기준부터 정한다", pole: "high" },
      { label: "일단 손에 잡히는 것부터 옮겨본다", pole: "low" },
    ],
  },
  {
    id: "q2",
    axis: "keep",
    weight: 2,
    text: "서랍 정리 중 예전에 쓰던 물건을 발견했다.",
    choices: [
      { label: "지금 안 쓰면 앞으로도 안 쓸 것 같아 보낸다", pole: "low" },
      { label: "언젠가 다시 쓸 것 같아 남겨둔다", pole: "high" },
    ],
  },
  {
    id: "q3",
    axis: "rhythm",
    weight: 2,
    text: "요즘 내 책상 위 상태는?",
    choices: [
      { label: "그때그때 정리해서 크게 어질러지지 않는다", pole: "high" },
      { label: "어느 정도 쌓이면 한 번에 몰아서 치운다", pole: "low" },
    ],
  },
  {
    id: "q4",
    axis: "plan",
    weight: 2,
    text: "새 정리함이나 수납 박스를 산다면?",
    choices: [
      { label: "쓰다 보면서 자리를 자연스럽게 정한다", pole: "low" },
      { label: "칸마다 용도를 미리 정해두고 채운다", pole: "high" },
    ],
  },
  {
    id: "q5",
    axis: "keep",
    weight: 2,
    text: "다 쓴 영수증이나 포장 박스 같은 것들.",
    choices: [
      { label: "혹시 몰라 한동안은 모아둔다", pole: "high" },
      { label: "쓰임이 끝나면 바로 비운다", pole: "low" },
    ],
  },
  {
    id: "q6",
    axis: "rhythm",
    weight: 2,
    text: "다운로드 폴더나 사진첩을 관리하는 방식은?",
    choices: [
      { label: "가득 차야 비로소 한 번에 정리한다", pole: "low" },
      { label: "생길 때마다 바로 정리해둔다", pole: "high" },
    ],
  },
  {
    id: "q7",
    axis: "plan",
    weight: 2,
    text: "컴퓨터 바탕화면에 파일이 늘어나기 시작했다.",
    choices: [
      { label: "폴더 구조를 먼저 만들고 옮긴다", pole: "high" },
      { label: "필요할 때마다 눈에 띄는 대로 찾는다", pole: "low" },
    ],
  },
  {
    id: "q8",
    axis: "keep",
    weight: 2,
    text: "메일함이나 메신저 대화방이 쌓였다.",
    choices: [
      { label: "필요 없어지면 바로 삭제·정리한다", pole: "low" },
      { label: "나중에 찾아볼 수 있게 그대로 둔다", pole: "high" },
    ],
  },
  {
    id: "q9",
    axis: "rhythm",
    weight: 2,
    text: "일과 중 잠깐 여유가 생겼다.",
    choices: [
      { label: "주변 물건 하나라도 제자리에 둔다", pole: "high" },
      { label: "정리는 몰아서 하는 날을 따로 잡는다", pole: "low" },
    ],
  },
  {
    id: "q10",
    axis: "plan",
    weight: 1,
    text: "정리 방법이 궁금해 검색해본다면?",
    choices: [
      { label: "정리 순서와 방법을 먼저 읽어본다", pole: "high" },
      { label: "일단 해보면서 방법을 찾는다", pole: "low" },
    ],
  },
  {
    id: "q11",
    axis: "keep",
    weight: 1,
    text: "선물 받은 포장지나 예쁜 상자를 보면?",
    choices: [
      { label: "역할이 끝났으니 바로 정리한다", pole: "low" },
      { label: "예쁘면 나중에 쓸 것 같아 챙긴다", pole: "high" },
    ],
  },
  {
    id: "q12",
    axis: "rhythm",
    weight: 1,
    text: "옷장이나 서랍 안 상태를 떠올리면?",
    choices: [
      { label: "명절이나 이사 같은 계기에 한 번에 정리한다", pole: "low" },
      { label: "계절이 바뀔 때마다 조금씩 정리해둔다", pole: "high" },
    ],
  },
];
