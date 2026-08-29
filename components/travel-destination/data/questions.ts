import type { Question } from "../types";

/**
 * 12문항 · 문항당 2지선다.
 *
 * 각 문항은 축 하나만 담당하고, high 극 선택지를 고르면 그 축에 weight 만큼,
 * low 극 선택지를 고르면 0점이 더해진다. 선택지가 결과 여행지에 직접 점수를 주는
 * 구조가 아니라, 축 점수를 먼저 계산한 뒤 여행지를 정하는 구조다.
 *
 * 축별 가중치 구성은 [2, 2, 2, 1] → 합 7 (홀수)이라 축 점수가 정확히 절반이 되는
 * 동점이 발생하지 않는다. 또한 무작위 응답 기준으로 high/low가 6:6으로 나뉘어
 * 어느 한쪽 극이 구조적으로 유리하지 않다. (docs/test-design.md 참고)
 *
 * 정답이 있는 문항이 아니므로 두 선택지 모두 긍정적으로 읽히도록 작성했고,
 * high 극 선택지가 항상 같은 위치에 오지 않게 순서를 번갈아 배치했다.
 *
 * 응답 기준: "여행을 떠났을 때, 요즘의 나".
 */
export const QUESTIONS: Question[] = [
  {
    id: "q1",
    axis: "pace",
    weight: 2,
    text: "여행 첫날 아침, 눈을 뜨면",
    choices: [
      { label: "바로 짐을 챙겨 밖으로 나갈 준비를 한다", pole: "high" },
      { label: "숙소에서 여유롭게 아침을 즐긴다", pole: "low" },
    ],
  },
  {
    id: "q2",
    axis: "scene",
    weight: 2,
    text: "여행지를 고를 때 먼저 끌리는 건",
    choices: [
      { label: "탁 트인 자연 풍경", pole: "low" },
      { label: "활기찬 도심의 거리", pole: "high" },
    ],
  },
  {
    id: "q3",
    axis: "plan",
    weight: 2,
    text: "여행을 떠나기 전에는",
    choices: [
      { label: "시간대별로 일정표를 꼼꼼히 짜둔다", pole: "high" },
      { label: "숙소와 항공권만 정하고 나머진 그때그때 정한다", pole: "low" },
    ],
  },
  {
    id: "q4",
    axis: "pace",
    weight: 2,
    text: "하루 일정을 짜보면",
    choices: [
      { label: "한두 곳만 여유 있게 둘러본다", pole: "low" },
      { label: "이곳저곳 최대한 많이 돌아본다", pole: "high" },
    ],
  },
  {
    id: "q5",
    axis: "scene",
    weight: 2,
    text: "숙소를 고른다면",
    choices: [
      { label: "번화가 한복판의 숙소", pole: "high" },
      { label: "자연에 둘러싸인 조용한 숙소", pole: "low" },
    ],
  },
  {
    id: "q6",
    axis: "plan",
    weight: 2,
    text: "여행지에서 다음 장소로 이동할 때",
    choices: [
      { label: "발길 닿는 대로 걷다가 정한다", pole: "low" },
      { label: "미리 찾아둔 곳으로 정확히 이동한다", pole: "high" },
    ],
  },
  {
    id: "q7",
    axis: "pace",
    weight: 2,
    text: "낮잠이나 휴식 시간이 생기면",
    choices: [
      { label: "쉬는 시간도 아까워서 밖으로 나간다", pole: "high" },
      { label: "숙소에서 낮잠 한숨 자며 쉰다", pole: "low" },
    ],
  },
  {
    id: "q8",
    axis: "scene",
    weight: 2,
    text: "여행 사진첩을 열어보면",
    choices: [
      { label: "산, 바다, 들판 사진이 많다", pole: "low" },
      { label: "건물, 골목, 카페 사진이 많다", pole: "high" },
    ],
  },
  {
    id: "q9",
    axis: "plan",
    weight: 2,
    text: "예상치 못한 골목이나 가게를 발견하면",
    choices: [
      { label: "일정에 없으니 다음 기회에 가보기로 한다", pole: "high" },
      { label: "바로 들어가본다", pole: "low" },
    ],
  },
  {
    id: "q10",
    axis: "pace",
    weight: 1,
    text: "여행 마지막 날 일정은",
    choices: [
      { label: "짐을 다 싸두고 느긋하게 마무리한다", pole: "low" },
      { label: "체크아웃 직전까지 알차게 돌아다닌다", pole: "high" },
    ],
  },
  {
    id: "q11",
    axis: "scene",
    weight: 1,
    text: "저녁 시간을 보낸다면",
    choices: [
      { label: "번화가에서 사람 구경을 한다", pole: "high" },
      { label: "자연 속에서 노을이나 별을 본다", pole: "low" },
    ],
  },
  {
    id: "q12",
    axis: "plan",
    weight: 1,
    text: "여행 중 맛집을 고를 때",
    choices: [
      { label: "그냥 눈에 보이는 곳에 들어간다", pole: "low" },
      { label: "미리 찾아둔 맛집 리스트에서 고른다", pole: "high" },
    ],
  },
];
