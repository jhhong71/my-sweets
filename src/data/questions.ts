import type { Question } from "../types";

/**
 * 7문항, 문항당 4개 선택지. 각 선택지는 결과(간식)가 아니라 3개 취향 축
 * (rich 진함 / playful 발랄 / warm 다정)에만 0~2점을 가산한다.
 * 디저트 취향을 대놓고 묻지 않고, 일상·성향 장면으로 간접 측정한다.
 * 응답 기준: "요즘 나의 모습과 기분".
 */
export const QUESTIONS: Question[] = [
  {
    id: "q1",
    text: "나를 표현하는 분위기는?",
    choices: [
      { label: "강렬하고 또렷한", scores: { rich: 2, playful: 0, warm: 0 } },
      { label: "밝고 통통 튀는", scores: { rich: 0, playful: 2, warm: 0 } },
      { label: "포근하고 사랑스러운", scores: { rich: 0, playful: 1, warm: 2 } },
      { label: "든든하고 편안한", scores: { rich: 1, playful: 0, warm: 1 } },
    ],
  },
  {
    id: "q2",
    text: "처음 만난 사람들 사이에서 나는?",
    choices: [
      { label: "존재감 있게 내 색을 드러냄", scores: { rich: 2, playful: 1, warm: 0 } },
      { label: "신나게 분위기를 띄움", scores: { rich: 0, playful: 2, warm: 1 } },
      { label: "조용히 챙기며 다가감", scores: { rich: 0, playful: 0, warm: 2 } },
      { label: "무리 없이 자연스럽게", scores: { rich: 1, playful: 0, warm: 1 } },
    ],
  },
  {
    id: "q3",
    text: "주말을 보내는 방식은?",
    choices: [
      { label: "몰입할 취미에 푹 빠지기", scores: { rich: 2, playful: 0, warm: 0 } },
      { label: "친구들과 신나는 약속", scores: { rich: 0, playful: 2, warm: 1 } },
      { label: "가까운 사람과 폭신한 휴식", scores: { rich: 0, playful: 1, warm: 2 } },
      { label: "든든히 할 일 하며 알차게", scores: { rich: 1, playful: 0, warm: 1 } },
    ],
  },
  {
    id: "q4",
    text: "감정을 표현하는 스타일은?",
    choices: [
      { label: "강하고 분명하게", scores: { rich: 2, playful: 1, warm: 0 } },
      { label: "밝고 리액션 크게", scores: { rich: 0, playful: 2, warm: 0 } },
      { label: "다정하고 사랑스럽게", scores: { rich: 0, playful: 1, warm: 2 } },
      { label: "담담하고 은은하게", scores: { rich: 1, playful: 0, warm: 1 } },
    ],
  },
  {
    id: "q5",
    text: "나와 어울리는 색은?",
    choices: [
      { label: "진한 카카오브라운·버건디", scores: { rich: 2, playful: 0, warm: 0 } },
      { label: "알록달록 캔디 컬러", scores: { rich: 0, playful: 2, warm: 1 } },
      { label: "포근한 크림·파스텔", scores: { rich: 0, playful: 0, warm: 2 } },
      { label: "은은한 베이지·오트밀", scores: { rich: 1, playful: 0, warm: 1 } },
    ],
  },
  {
    id: "q6",
    text: "친구들이 말하는 나는?",
    choices: [
      { label: "취향이 확실한 사람", scores: { rich: 2, playful: 0, warm: 0 } },
      { label: "같이 있으면 즐거운 사람", scores: { rich: 0, playful: 2, warm: 1 } },
      { label: "곁에 있으면 포근한 사람", scores: { rich: 0, playful: 0, warm: 2 } },
      { label: "한결같고 편안한 사람", scores: { rich: 1, playful: 0, warm: 1 } },
    ],
  },
  {
    id: "q7",
    text: "이번 계절, 나의 바람은?",
    choices: [
      { label: "깊이 있게 나를 성장시키기", scores: { rich: 2, playful: 0, warm: 0 } },
      { label: "재미난 경험 잔뜩 쌓기", scores: { rich: 0, playful: 2, warm: 0 } },
      { label: "소중한 사람들과 따뜻하게", scores: { rich: 0, playful: 0, warm: 2 } },
      { label: "큰 탈 없이 든든하게", scores: { rich: 1, playful: 0, warm: 1 } },
    ],
  },
];
