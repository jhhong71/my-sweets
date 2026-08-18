import type { Question } from "../types";

/**
 * 12문항 · 문항당 2지선다.
 *
 * 각 문항은 4개 축(지혜·열정·유대·질서) 중 서로 다른 두 축이 겨루는 강제
 * 선택으로 구성된다. 6가지 축 조합(wisdom-passion, wisdom-bond,
 * wisdom-order, passion-bond, passion-order, bond-order)이 각각 2번씩
 * 등장해 총 12문항이 되고, 축마다 정확히 6문항에 관여한다. 선택한 축에는
 * +3점, 선택하지 않은 축에는 0점이 더해진다. (docs/test-design.md 참고)
 *
 * 정답이 있는 문항이 아니므로 두 선택지 모두 긍정적으로 읽히도록 작성했고,
 * 특정 축 선택지가 항상 같은 위치(A/B)에 오지 않게 순서를 번갈아 배치했다.
 *
 * 응답 기준: 특정 상황을 한정하지 않은 "평소의 나".
 */
export const QUESTIONS: Question[] = [
  {
    id: "q1",
    text: "예상치 못한 문제가 생겼을 때,",
    choices: [
      { label: "차분히 원인부터 분석한다", scores: { wisdom: 3 } },
      { label: "일단 몸으로 부딪혀본다", scores: { passion: 3 } },
    ],
  },
  {
    id: "q2",
    text: "고민이 있을 때,",
    choices: [
      { label: "혼자 곰곰이 생각해서 답을 찾는다", scores: { wisdom: 3 } },
      { label: "가까운 사람과 이야기하며 정리한다", scores: { bond: 3 } },
    ],
  },
  {
    id: "q3",
    text: "새로운 계획을 세울 때,",
    choices: [
      { label: "여러 가능성을 폭넓게 따져본다", scores: { wisdom: 3 } },
      { label: "일정과 규칙부터 확실히 정한다", scores: { order: 3 } },
    ],
  },
  {
    id: "q4",
    text: "재미있는 일이 생기면,",
    choices: [
      { label: "일단 저지르고 본다", scores: { passion: 3 } },
      { label: "함께할 사람부터 찾는다", scores: { bond: 3 } },
    ],
  },
  {
    id: "q5",
    text: "하고 싶은 일이 생겼을 때,",
    choices: [
      { label: "지금 당장 시작한다", scores: { passion: 3 } },
      { label: "순서와 계획을 먼저 세운다", scores: { order: 3 } },
    ],
  },
  {
    id: "q6",
    text: "여럿이 함께하는 자리에서,",
    choices: [
      { label: "분위기와 사람들의 마음을 먼저 챙긴다", scores: { bond: 3 } },
      { label: "역할과 규칙을 먼저 정리한다", scores: { order: 3 } },
    ],
  },
  {
    id: "q7",
    text: "새로운 정보를 접했을 때,",
    choices: [
      { label: "사실인지 이유를 따져본다", scores: { wisdom: 3 } },
      { label: "흥미가 생기면 바로 뛰어든다", scores: { passion: 3 } },
    ],
  },
  {
    id: "q8",
    text: "어려운 결정을 내려야 할 때,",
    choices: [
      { label: "주변 사람들의 의견을 듣고 결정한다", scores: { bond: 3 } },
      { label: "논리적으로 장단점을 정리한다", scores: { wisdom: 3 } },
    ],
  },
  {
    id: "q9",
    text: "일이 계획대로 안 풀릴 때,",
    choices: [
      { label: "정해둔 순서를 지키며 차근차근 다시 한다", scores: { order: 3 } },
      { label: "원인을 다시 분석해 새 방법을 찾는다", scores: { wisdom: 3 } },
    ],
  },
  {
    id: "q10",
    text: "특별한 순간을 맞이하면,",
    choices: [
      { label: "감정을 있는 그대로 표현한다", scores: { passion: 3 } },
      { label: "함께 나눌 사람을 먼저 떠올린다", scores: { bond: 3 } },
    ],
  },
  {
    id: "q11",
    text: "갑자기 좋은 기회가 찾아오면,",
    choices: [
      { label: "먼저 조건과 절차를 확인한다", scores: { order: 3 } },
      { label: "고민 없이 바로 뛰어든다", scores: { passion: 3 } },
    ],
  },
  {
    id: "q12",
    text: "공동의 목표를 이룰 때 중요한 건,",
    choices: [
      { label: "서로를 이해하고 아껴주는 마음", scores: { bond: 3 } },
      { label: "각자의 역할과 책임을 다하는 것", scores: { order: 3 } },
    ],
  },
];
