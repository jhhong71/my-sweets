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
 * 응답 기준: "친구나 지인과 메신저로 대화할 때의 평소 내 모습"(사적인 대화 맥락).
 */
export const QUESTIONS: Question[] = [
  {
    id: "q1",
    axis: "speed",
    weight: 2,
    text: "친구에게 메시지가 왔다. 나의 반응은?",
    choices: [
      { label: "웬만하면 바로 확인하고 답장한다", pole: "high" },
      { label: "손이 빌 때 여유롭게 답장한다", pole: "low" },
    ],
  },
  {
    id: "q2",
    axis: "express",
    weight: 2,
    text: "오랜만에 만난 친구 이야기에 답장을 쓴다면?",
    choices: [
      { label: "짧고 명확하게 핵심만 답한다", pole: "low" },
      { label: "이모티콘과 함께 하고 싶은 말을 길게 풀어쓴다", pole: "high" },
    ],
  },
  {
    id: "q3",
    axis: "initiative",
    weight: 2,
    text: "요즘 연락이 뜸했던 친구가 떠올랐다.",
    choices: [
      { label: "먼저 메시지를 보내 안부를 묻는다", pole: "high" },
      { label: "연락이 오면 그때 반갑게 답한다", pole: "low" },
    ],
  },
  {
    id: "q4",
    axis: "speed",
    weight: 2,
    text: "메시지를 봤지만 지금 답할 말이 딱히 없다.",
    choices: [
      { label: "생각이 정리되면 답장한다", pole: "low" },
      { label: "짧게라도 '봤어'라고 바로 알린다", pole: "high" },
    ],
  },
  {
    id: "q5",
    axis: "express",
    weight: 2,
    text: "친구가 힘든 일을 털어놓았다.",
    choices: [
      { label: "공감하는 말을 여러 줄로 정성껏 적는다", pole: "high" },
      { label: "위로가 되는 짧은 한마디로 답한다", pole: "low" },
    ],
  },
  {
    id: "q6",
    axis: "initiative",
    weight: 2,
    text: "단체 대화방이 며칠째 조용하다.",
    choices: [
      { label: "누군가 먼저 말을 꺼내길 기다린다", pole: "low" },
      { label: "화제를 던지며 대화를 다시 살린다", pole: "high" },
    ],
  },
  {
    id: "q7",
    axis: "speed",
    weight: 2,
    text: "약속을 잡는 메시지가 왔다.",
    choices: [
      { label: "바로 확인하고 곧장 답장한다", pole: "high" },
      { label: "일정을 살펴본 뒤 답장한다", pole: "low" },
    ],
  },
  {
    id: "q8",
    axis: "express",
    weight: 2,
    text: "축하할 일이 생긴 친구에게 답장한다면?",
    choices: [
      { label: "축하한다는 말 한마디면 충분하다", pole: "low" },
      { label: "이모티콘과 함께 기쁜 마음을 잔뜩 표현한다", pole: "high" },
    ],
  },
  {
    id: "q9",
    axis: "initiative",
    weight: 2,
    text: "심심한 저녁, 누구와도 연락이 없다.",
    choices: [
      { label: "먼저 아무에게나 메시지를 보내본다", pole: "high" },
      { label: "누가 연락해줄 때까지 기다린다", pole: "low" },
    ],
  },
  {
    id: "q10",
    axis: "speed",
    weight: 1,
    text: "메시지 알림이 울렸을 때 내 모습은?",
    choices: [
      { label: "일단 하던 일부터 마무리한다", pole: "low" },
      { label: "하던 일을 잠깐 멈추고 확인한다", pole: "high" },
    ],
  },
  {
    id: "q11",
    axis: "express",
    weight: 1,
    text: "하루 일과를 묻는 메시지를 받았다.",
    choices: [
      { label: "오늘 있었던 일을 조목조목 이야기한다", pole: "high" },
      { label: "'그냥 그랬어' 정도로 짧게 답한다", pole: "low" },
    ],
  },
  {
    id: "q12",
    axis: "initiative",
    weight: 1,
    text: "새로운 모임에서 알게 된 사람과 헤어진 뒤.",
    choices: [
      { label: "상대가 연락하면 그때 이어간다", pole: "low" },
      { label: "먼저 연락처를 저장하고 메시지를 보낸다", pole: "high" },
    ],
  },
];
