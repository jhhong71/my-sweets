import type { Question } from "../types";

/**
 * 15문항 · 문항당 2지선다.
 *
 * 각 문항은 축 하나만 담당하고, high 극 선택지를 고르면 그 축에 weight 만큼,
 * low 극 선택지를 고르면 0점이 더해진다. 선택지가 결과 유형에 직접 점수를 주는
 * 구조가 아니라, 축 점수를 먼저 계산한 뒤 유형을 정한다.
 *
 * 축별 가중치 구성은 [2, 2, 1, 1, 1] → 합 7 (홀수)이라 축 점수가 정확히
 * 절반이 되는 동점이 발생하지 않는다. (docs/test-design.md 참고)
 *
 * 정답이 있는 문항이 아니므로 두 선택지 모두 긍정적으로 읽히도록 작성했고,
 * high 극 선택지가 항상 같은 위치에 오지 않게 순서를 번갈아 배치했다.
 *
 * 응답 기준: "회사에서 새로운 업무나 프로젝트를 막 맡았을 때의 평소 내 모습"
 * (업무 착수 시점의 회사 업무 맥락).
 */
export const QUESTIONS: Question[] = [
  {
    id: "q1",
    axis: "approach",
    weight: 2,
    text: "새 업무를 맡았을 때 가장 먼저 하는 일은?",
    choices: [
      { label: "전체 일정과 순서를 먼저 계획한다", pole: "high" },
      { label: "일단 손에 잡히는 것부터 시작한다", pole: "low" },
    ],
  },
  {
    id: "q2",
    axis: "research",
    weight: 2,
    text: "새 업무의 방향을 정해야 한다.",
    choices: [
      { label: "관련 자료와 사례를 먼저 찾아본다", pole: "high" },
      { label: "그동안의 경험과 감으로 방향을 잡는다", pole: "low" },
    ],
  },
  {
    id: "q3",
    axis: "collab",
    weight: 2,
    text: "새 업무를 맡은 첫날, 나의 모습은?",
    choices: [
      { label: "동료들과 이야기 나누며 방향을 맞춘다", pole: "high" },
      { label: "혼자 자료를 찾아보며 파악한다", pole: "low" },
    ],
  },
  {
    id: "q4",
    axis: "approach",
    weight: 2,
    text: "복잡해 보이는 프로젝트를 받았다.",
    choices: [
      { label: "일부터 벌여놓고 진행하면서 정리한다", pole: "low" },
      { label: "전체 그림을 그린 뒤 세부 단계로 나눈다", pole: "high" },
    ],
  },
  {
    id: "q5",
    axis: "research",
    weight: 2,
    text: "낯선 주제의 업무가 주어졌다.",
    choices: [
      { label: "비슷했던 예전 경험을 떠올리며 시작한다", pole: "low" },
      { label: "관련 문서와 참고자료를 찾아 읽는다", pole: "high" },
    ],
  },
  {
    id: "q6",
    axis: "collab",
    weight: 2,
    text: "업무 진행 중 막히는 부분이 생겼다.",
    choices: [
      { label: "동료에게 바로 물어보고 상의한다", pole: "high" },
      { label: "스스로 더 찾아보고 해결해본다", pole: "low" },
    ],
  },
  {
    id: "q7",
    axis: "approach",
    weight: 1,
    text: "업무 마감일이 넉넉하게 주어졌다.",
    choices: [
      { label: "닥쳤을 때 속도를 올려 처리한다", pole: "low" },
      { label: "미리 일정표를 짜서 여유 있게 배분한다", pole: "high" },
    ],
  },
  {
    id: "q8",
    axis: "research",
    weight: 1,
    text: "회의에서 내 의견을 내야 한다.",
    choices: [
      { label: "관련 수치나 자료를 준비해 근거로 든다", pole: "high" },
      { label: "그 자리의 흐름과 느낌으로 의견을 낸다", pole: "low" },
    ],
  },
  {
    id: "q9",
    axis: "collab",
    weight: 1,
    text: "업무 아이디어가 하나 떠올랐다.",
    choices: [
      { label: "혼자 정리한 뒤 어느 정도 완성되면 공유한다", pole: "low" },
      { label: "동료들에게 먼저 이야기하며 함께 다듬는다", pole: "high" },
    ],
  },
  {
    id: "q10",
    axis: "approach",
    weight: 1,
    text: "새로운 업무 요청 메일을 받았다.",
    choices: [
      { label: "할 일 목록부터 정리하고 시작한다", pole: "high" },
      { label: "일단 답장부터 보내고 진행하며 파악한다", pole: "low" },
    ],
  },
  {
    id: "q11",
    axis: "research",
    weight: 1,
    text: "업무 선택지가 여러 개인 상황이다.",
    choices: [
      { label: "직감적으로 끌리는 쪽을 먼저 골라본다", pole: "low" },
      { label: "각 선택지를 비교한 자료를 만들어본다", pole: "high" },
    ],
  },
  {
    id: "q12",
    axis: "collab",
    weight: 1,
    text: "새 업무의 세부 계획을 짜는 중이다.",
    choices: [
      { label: "팀원들과 회의를 잡아 함께 정한다", pole: "high" },
      { label: "혼자 초안을 만든 뒤 공유한다", pole: "low" },
    ],
  },
  {
    id: "q13",
    axis: "approach",
    weight: 1,
    text: "익숙하지 않은 업무 툴을 써야 한다.",
    choices: [
      { label: "사용법을 먼저 익히고 나서 시작한다", pole: "high" },
      { label: "일단 써보면서 익힌다", pole: "low" },
    ],
  },
  {
    id: "q14",
    axis: "research",
    weight: 1,
    text: "새 프로젝트의 성공 기준이 아직 애매하다.",
    choices: [
      { label: "레퍼런스와 벤치마킹 자료부터 모은다", pole: "high" },
      { label: "일단 감으로 방향을 잡고 진행하며 다듬는다", pole: "low" },
    ],
  },
  {
    id: "q15",
    axis: "collab",
    weight: 1,
    text: "업무를 마무리하기 전 마지막 점검 단계다.",
    choices: [
      { label: "스스로 다시 한번 확인하고 마무리한다", pole: "low" },
      { label: "동료에게 검토를 부탁한다", pole: "high" },
    ],
  },
];
