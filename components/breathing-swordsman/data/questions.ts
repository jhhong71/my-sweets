import type { Question } from "../types";

/**
 * 12문항 · 문항당 2지선다.
 *
 * 각 문항은 축 하나만 담당하고, high 극 선택지를 고르면 그 축에 weight 만큼,
 * low 극 선택지를 고르면 0점이 더해진다. 선택지가 캐릭터에 직접 점수를 주지 않고
 * 축 점수를 먼저 계산한 뒤 캐릭터를 정하므로 8명 모두 고르게 도달할 수 있다.
 *
 * 축별 가중치 구성은 [2, 2, 2, 1] → 합 7(홀수)이라 동점이 생기지 않는다.
 * 정답이 있는 문항이 아니므로 두 선택지 모두 긍정적으로 읽히게 쓰고,
 * high 극 선택지 위치를 번갈아 배치했다.
 *
 * 문항은 원작 장면이 아니라 일상 상황으로 작성했다(원작 대사·장면 인용 없음).
 */
export const QUESTIONS: Question[] = [
  {
    id: "q1",
    axis: "pace",
    weight: 2,
    description: "주말 오후, 갑자기 생긴 일",
    text: "친구가 \"지금 나올 수 있어?\"라고 연락해 왔다",
    choices: [
      { label: "일단 \"응!\" 하고 옷부터 챙긴다", pole: "high" },
      { label: "어디서 뭘 하는지 먼저 물어본다", pole: "low" },
    ],
  },
  {
    id: "q2",
    axis: "judge",
    weight: 2,
    description: "조별 과제 마감 전날",
    text: "한 팀원이 맡은 부분을 끝내지 못했다고 털어놓았다",
    choices: [
      { label: "기한과 역할 분담부터 다시 정리한다", pole: "low" },
      { label: "무슨 사정이 있었는지 먼저 들어본다", pole: "high" },
    ],
  },
  {
    id: "q3",
    axis: "express",
    weight: 2,
    description: "기다리던 합격 소식을 들은 순간",
    text: "지금 내 반응에 더 가까운 것은?",
    choices: [
      { label: "바로 소리 내어 기뻐하고 주변에 알린다", pole: "high" },
      { label: "속으로 조용히 곱씹으며 미소 짓는다", pole: "low" },
    ],
  },
  {
    id: "q4",
    axis: "pace",
    weight: 2,
    description: "처음 가보는 등산로",
    text: "갈림길에 표지판이 없다",
    choices: [
      { label: "지도 앱과 후기를 확인하고 고른다", pole: "low" },
      { label: "느낌이 오는 쪽으로 먼저 걸어가 본다", pole: "high" },
    ],
  },
  {
    id: "q5",
    axis: "judge",
    weight: 2,
    description: "동아리 규칙을 정하는 회의",
    text: "지각 벌칙을 두고 의견이 갈렸다",
    choices: [
      { label: "사정은 달라도 규칙은 모두에게 똑같이", pole: "low" },
      { label: "각자 사정을 봐서 유연하게 적용하자", pole: "high" },
    ],
  },
  {
    id: "q6",
    axis: "express",
    weight: 2,
    description: "억울한 오해를 받았을 때",
    text: "나는 보통",
    choices: [
      { label: "마음을 가라앉힌 뒤 필요한 말만 한다", pole: "low" },
      { label: "서운한 감정까지 그 자리에서 솔직하게 말한다", pole: "high" },
    ],
  },
  {
    id: "q7",
    axis: "pace",
    weight: 2,
    description: "눈앞에서 누군가 무거운 짐을 떨어뜨렸다",
    text: "그 순간 나는",
    choices: [
      { label: "생각할 틈도 없이 달려가 줍고 있다", pole: "high" },
      { label: "도움이 필요한지 한 번 살피고 다가간다", pole: "low" },
    ],
  },
  {
    id: "q8",
    axis: "judge",
    weight: 2,
    description: "친한 친구가 명백한 실수를 했다",
    text: "다른 친구들 앞에서 나는",
    choices: [
      { label: "그래도 일단은 친구 편을 들어준다", pole: "high" },
      { label: "잘못된 부분은 친구라도 짚고 넘어간다", pole: "low" },
    ],
  },
  {
    id: "q9",
    axis: "express",
    weight: 2,
    description: "요즘 좀 지친다",
    text: "가까운 사람이 \"괜찮아?\"라고 묻는다면",
    choices: [
      { label: "\"사실 좀 힘들어\" 하고 털어놓는다", pole: "high" },
      { label: "\"괜찮아\" 하고 혼자 추스른다", pole: "low" },
    ],
  },
  {
    id: "q10",
    axis: "pace",
    weight: 1,
    description: "새 게임을 시작했다",
    text: "튜토리얼 화면이 떴다",
    choices: [
      { label: "설명을 끝까지 읽고 시작한다", pole: "low" },
      { label: "건너뛰고 해보면서 익힌다", pole: "high" },
    ],
  },
  {
    id: "q11",
    axis: "judge",
    weight: 1,
    description: "선물을 고를 때",
    text: "더 중요하게 생각하는 것은?",
    choices: [
      { label: "받는 사람에게 실제로 쓸모 있는지", pole: "low" },
      { label: "내 마음이 잘 전해지는지", pole: "high" },
    ],
  },
  {
    id: "q12",
    axis: "express",
    weight: 1,
    description: "모두가 모인 축하 자리",
    text: "분위기가 무르익으면 나는",
    choices: [
      { label: "한 켠에서 조용히 분위기를 즐긴다", pole: "low" },
      { label: "건배사든 리액션이든 앞장서서 띄운다", pole: "high" },
    ],
  },
];
