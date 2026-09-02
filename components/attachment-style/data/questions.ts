import type { Question } from "../types";

/**
 * 12문항 · 문항당 2지선다.
 *
 * 각 문항은 축 하나만 담당하고, high 극 선택지를 고르면 그 축에 weight 만큼,
 * low 극 선택지를 고르면 0점이 더해진다. 선택지가 결과 유형에 직접 점수를 주는
 * 구조가 아니라, 축 점수를 먼저 계산한 뒤 유형을 정하는 구조다.
 *
 * 축별 가중치 구성은 [2, 2, 2, 1] → 합 7 (홀수)이라 축 점수가 정확히 절반이 되는
 * 동점이 발생하지 않는다. 또한 무작위 응답 기준으로 high/low가 6:6으로 나뉘어
 * 어느 한쪽 극이 구조적으로 유리하지 않다.
 *
 * 정답이 있는 문항이 아니므로 두 선택지 모두 자연스럽게 읽히도록 작성했고,
 * high 극 선택지가 항상 같은 위치에 오지 않게 순서를 번갈아 배치했다.
 *
 * 응답 기준: "연애할 때, 요즘의 나".
 */
export const QUESTIONS: Question[] = [
  {
    id: "q1",
    axis: "closeness",
    weight: 2,
    text: "연인과 하루 종일 떨어져 있으면",
    choices: [
      { label: "빨리 만나서 오늘 있었던 일을 나누고 싶다", pole: "high" },
      { label: "혼자만의 시간을 좀 더 즐긴 뒤 만나도 괜찮다", pole: "low" },
    ],
  },
  {
    id: "q2",
    axis: "openness",
    weight: 2,
    text: "서운한 일이 생기면",
    choices: [
      { label: "일단 혼자 삭이고 넘어가는 편이다", pole: "low" },
      { label: "바로 이야기해서 마음을 알린다", pole: "high" },
    ],
  },
  {
    id: "q3",
    axis: "steadiness",
    weight: 2,
    text: "연인의 말투가 평소보다 조금 퉁명스러우면",
    choices: [
      { label: "그럴 수도 있지 하고 넘어간다", pole: "high" },
      { label: "혹시 나 때문인가 하고 계속 생각하게 된다", pole: "low" },
    ],
  },
  {
    id: "q4",
    axis: "closeness",
    weight: 2,
    text: "주말 계획을 세운다면",
    choices: [
      { label: "각자 할 일을 하다가 저녁에 만나는 쪽", pole: "low" },
      { label: "가능한 많은 시간을 함께 보내는 쪽", pole: "high" },
    ],
  },
  {
    id: "q5",
    axis: "openness",
    weight: 2,
    text: "좋아하는 마음이 들 때",
    choices: [
      { label: "말이나 스킨십으로 자주 표현한다", pole: "high" },
      { label: "마음속으로만 담아두는 편이다", pole: "low" },
    ],
  },
  {
    id: "q6",
    axis: "steadiness",
    weight: 2,
    text: "SNS에서 연인이 다른 사람과 댓글을 주고받는 걸 보면",
    choices: [
      { label: "괜히 신경이 쓰이고 마음이 복잡해진다", pole: "low" },
      { label: "그냥 아는 사이겠거니 하고 신경 쓰지 않는다", pole: "high" },
    ],
  },
  {
    id: "q7",
    axis: "closeness",
    weight: 2,
    text: "연인이 친구들과 여행을 간다고 하면",
    choices: [
      { label: "매일 연락하며 서로의 하루를 챙긴다", pole: "high" },
      { label: "여행 잘 다녀오라 하고 편하게 각자 시간을 보낸다", pole: "low" },
    ],
  },
  {
    id: "q8",
    axis: "openness",
    weight: 2,
    text: "다투고 난 뒤에는",
    choices: [
      { label: "시간이 지나면 자연스레 풀리길 기다린다", pole: "low" },
      { label: "먼저 대화를 시도해서 풀려고 한다", pole: "high" },
    ],
  },
  {
    id: "q9",
    axis: "steadiness",
    weight: 2,
    text: "연인과 며칠간 연락이 뜸해지면",
    choices: [
      { label: "각자 바쁜 시기겠거니 하고 편하게 기다린다", pole: "high" },
      { label: "관계에 문제가 생긴 건 아닌지 걱정된다", pole: "low" },
    ],
  },
  {
    id: "q10",
    axis: "closeness",
    weight: 1,
    text: "메시지를 보냈는데 답장이 늦어지면",
    choices: [
      { label: "바쁜가 보다 하고 크게 신경 쓰지 않는다", pole: "low" },
      { label: "언제쯤 답장이 올지 신경이 쓰인다", pole: "high" },
    ],
  },
  {
    id: "q11",
    axis: "openness",
    weight: 1,
    text: "기념일이나 특별한 날에는",
    choices: [
      { label: "이벤트나 편지로 마음을 크게 표현한다", pole: "high" },
      { label: "소소하게, 티 안 나게 챙기는 편이다", pole: "low" },
    ],
  },
  {
    id: "q12",
    axis: "steadiness",
    weight: 1,
    text: "작은 다툼이 있고 난 뒤 하루 이틀은",
    choices: [
      { label: "계속 그 일이 신경 쓰여 마음이 복잡하다", pole: "low" },
      { label: "평소와 비슷한 컨디션으로 지낸다", pole: "high" },
    ],
  },
];
