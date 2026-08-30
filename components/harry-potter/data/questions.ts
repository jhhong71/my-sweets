import type { Question } from "../types";

/**
 * 12문항 · 문항당 2지선다.
 *
 * 각 문항은 축 하나만 담당하고, high 극 선택지를 고르면 그 축에 weight 만큼,
 * low 극 선택지를 고르면 0점이 더해진다. 선택지가 결과 캐릭터에 직접 점수를
 * 주는 구조가 아니라, 축 점수를 먼저 계산한 뒤 캐릭터를 정하는 구조다.
 *
 * 축별 가중치 구성은 [2, 2, 2, 1] → 합 7(홀수)이라 축 점수가 정확히 절반이 되는
 * 동점이 발생하지 않는다. 또한 무작위 응답 기준으로 high/low가 6:6으로 나뉘어
 * 어느 한쪽 극이 구조적으로 유리하지 않다.
 *
 * 정답이 있는 문항이 아니므로 두 선택지 모두 긍정적으로 읽히도록 작성했고,
 * high 극 선택지가 항상 같은 위치에 오지 않게 순서를 번갈아 배치했다.
 *
 * 응답 기준: 특정 상황을 한정하지 않은 "평소의 나".
 */
export const QUESTIONS: Question[] = [
  {
    id: "q1",
    axis: "courage",
    weight: 2,
    text: "새로운 도전 앞에서 나는",
    choices: [
      { label: "일단 부딪혀 보고 배운다", pole: "high" },
      { label: "충분히 살펴본 뒤 움직인다", pole: "low" },
    ],
  },
  {
    id: "q2",
    axis: "heart",
    weight: 2,
    text: "친구가 실수를 했을 때",
    choices: [
      { label: "무엇이 잘못됐는지부터 짚어준다", pole: "low" },
      { label: "이유를 먼저 들어주고 감싼다", pole: "high" },
    ],
  },
  {
    id: "q3",
    axis: "stage",
    weight: 2,
    text: "여럿이 함께하는 일에서 나는",
    choices: [
      { label: "자연스럽게 앞장서서 이끈다", pole: "high" },
      { label: "내 몫을 조용히 해낸다", pole: "low" },
    ],
  },
  {
    id: "q4",
    axis: "courage",
    weight: 2,
    text: "위험할 수도 있는 상황을 마주치면",
    choices: [
      { label: "안전한 방법부터 찾는다", pole: "low" },
      { label: "직접 나서서 확인해본다", pole: "high" },
    ],
  },
  {
    id: "q5",
    axis: "heart",
    weight: 2,
    text: "중요한 결정을 내릴 때",
    choices: [
      { label: "마음이 가는 방향을 따른다", pole: "high" },
      { label: "따져보고 이치에 맞는 쪽을 고른다", pole: "low" },
    ],
  },
  {
    id: "q6",
    axis: "stage",
    weight: 2,
    text: "모두의 시선이 쏠리는 순간",
    choices: [
      { label: "한 발 물러나 지켜본다", pole: "low" },
      { label: "부담 없이 그 자리를 받아들인다", pole: "high" },
    ],
  },
  {
    id: "q7",
    axis: "courage",
    weight: 2,
    text: "예상 밖의 문제가 생겼을 때",
    choices: [
      { label: "즉흥적으로 해결책을 시도한다", pole: "high" },
      { label: "차분히 계획을 세운 뒤 움직인다", pole: "low" },
    ],
  },
  {
    id: "q8",
    axis: "heart",
    weight: 2,
    text: "팀에서 의견이 갈릴 때",
    choices: [
      { label: "옳고 그름을 먼저 따진다", pole: "low" },
      { label: "분위기와 감정을 먼저 살핀다", pole: "high" },
    ],
  },
  {
    id: "q9",
    axis: "stage",
    weight: 2,
    text: "새로운 모임에 들어가면",
    choices: [
      { label: "먼저 나서서 분위기를 이끈다", pole: "high" },
      { label: "내 속도대로 자리를 잡아간다", pole: "low" },
    ],
  },
  {
    id: "q10",
    axis: "courage",
    weight: 1,
    text: "낯선 장소에 가게 되면",
    choices: [
      { label: "안내나 정보를 먼저 찾아본다", pole: "low" },
      { label: "먼저 둘러보며 탐험한다", pole: "high" },
    ],
  },
  {
    id: "q11",
    axis: "heart",
    weight: 1,
    text: "약속과 감정이 부딪히면",
    choices: [
      { label: "사람의 마음을 먼저 헤아린다", pole: "high" },
      { label: "정해진 원칙을 지킨다", pole: "low" },
    ],
  },
  {
    id: "q12",
    axis: "stage",
    weight: 1,
    text: "다들 내 의견을 기다릴 때",
    choices: [
      { label: "묵묵히 내 할 일에 집중한다", pole: "low" },
      { label: "확신을 갖고 방향을 제시한다", pole: "high" },
    ],
  },
];
