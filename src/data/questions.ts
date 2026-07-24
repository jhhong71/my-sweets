import type { Question } from "../types";

/**
 * 7문항, 문항당 4개 선택지. 각 선택지는 결과(간식)가 아니라 3개 취향 축
 * (rich 진함 / playful 발랄 / warm 다정)에만 점수를 가산한다.
 *
 * 선택지 설계 원칙:
 * - 성향이 표면 단어로 드러나지 않게 '구체적 상황 속 행동'으로 쓴다.
 * - 각 문항에는 4개 성향 레인이 하나씩 들어간다:
 *   진함 {rich:2} · 발랄 {playful:2} · 다정 {warm:2} · 든든 {rich:1,warm:1}
 * - 성향의 위치(1~4번)를 문항마다 섞어, 답 위치로 결과를 예측할 수 없게 한다.
 * 응답 기준: "요즘 나의 모습과 기분".
 */
export const QUESTIONS: Question[] = [
  {
    id: "q1",
    text: "새로 간 식당, 메뉴판을 받아들면",
    choices: [
      { label: "일행이 뭐 먹을지부터 물어본다", scores: { rich: 0, playful: 0, warm: 2 } },
      { label: "리뷰 많은 무난한 메뉴로 정한다", scores: { rich: 1, playful: 0, warm: 1 } },
      { label: "안 먹어본 조합에 도전해본다", scores: { rich: 0, playful: 2, warm: 0 } },
      { label: "이 집이 제일 잘한다는 하나로 끝까지 간다", scores: { rich: 2, playful: 0, warm: 0 } },
    ],
  },
  {
    id: "q2",
    text: "오랜만에 생긴 빈 주말, 나는",
    choices: [
      { label: "일단 나가서 즉흥으로 논다", scores: { rich: 0, playful: 2, warm: 0 } },
      { label: "벼르던 취미에 하루 종일 파묻힌다", scores: { rich: 2, playful: 0, warm: 0 } },
      { label: "밀린 집안일·루틴부터 정리한다", scores: { rich: 1, playful: 0, warm: 1 } },
      { label: "보고 싶던 사람에게 먼저 연락한다", scores: { rich: 0, playful: 0, warm: 2 } },
    ],
  },
  {
    id: "q3",
    text: "팀플·모임에서 내 역할은",
    choices: [
      { label: "일정·자료 챙기며 굴러가게 만든다", scores: { rich: 1, playful: 0, warm: 1 } },
      { label: "소외되는 사람 없나 살핀다", scores: { rich: 0, playful: 0, warm: 2 } },
      { label: "방향을 정하고 밀어붙인다", scores: { rich: 2, playful: 0, warm: 0 } },
      { label: "아이디어 던지며 분위기를 띄운다", scores: { rich: 0, playful: 2, warm: 0 } },
    ],
  },
  {
    id: "q4",
    text: "친구가 고민을 털어놓으면",
    choices: [
      { label: "판단은 접고 마음부터 들어준다", scores: { rich: 0, playful: 0, warm: 2 } },
      { label: "기분부터 풀리게 분위기를 바꾼다", scores: { rich: 0, playful: 2, warm: 0 } },
      { label: "솔직하게 내 생각을 분명히 말한다", scores: { rich: 2, playful: 0, warm: 0 } },
      { label: "현실적인 해결책을 같이 정리한다", scores: { rich: 1, playful: 0, warm: 1 } },
    ],
  },
  {
    id: "q5",
    text: "스트레스가 쌓였을 때",
    choices: [
      { label: "익숙한 루틴으로 조용히 회복한다", scores: { rich: 1, playful: 0, warm: 1 } },
      { label: "좋아하는 것에 파고들어 잊는다", scores: { rich: 2, playful: 0, warm: 0 } },
      { label: "가까운 사람과 이야기하며 푼다", scores: { rich: 0, playful: 0, warm: 2 } },
      { label: "새로운 걸 질러 기분전환한다", scores: { rich: 0, playful: 2, warm: 0 } },
    ],
  },
  {
    id: "q6",
    text: "사람들이 나를 이렇게 기억한다",
    choices: [
      { label: "같이 있으면 안 심심한 사람", scores: { rich: 0, playful: 2, warm: 0 } },
      { label: "언제 봐도 한결같은 사람", scores: { rich: 1, playful: 0, warm: 1 } },
      { label: "얘기하면 마음이 편해지는 사람", scores: { rich: 0, playful: 0, warm: 2 } },
      { label: "자기 세계가 뚜렷한 사람", scores: { rich: 2, playful: 0, warm: 0 } },
    ],
  },
  {
    id: "q7",
    text: "요즘 내가 바라는 건",
    choices: [
      { label: "하나를 제대로 파고들어 깊어지기", scores: { rich: 2, playful: 0, warm: 0 } },
      { label: "소중한 사람들과 자주 붙어 있기", scores: { rich: 0, playful: 0, warm: 2 } },
      { label: "큰 탈 없이 안정적으로 흘러가기", scores: { rich: 1, playful: 0, warm: 1 } },
      { label: "새롭고 재밌는 일 많이 벌어지기", scores: { rich: 0, playful: 2, warm: 0 } },
    ],
  },
];
