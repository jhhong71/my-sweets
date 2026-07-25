import type { Question } from "../types";

/**
 * 7문항, 문항당 5개 선택지. 각 선택지는 5개 취향 축(Big Five에서 착안)
 * 중 하나를 대표하며, 선택 시 그 축에 1점이 쌓인다.
 *
 * 설계 원칙:
 * - 성향이 표면 단어로 드러나지 않게 '구체적 상황 속 행동'으로 쓴다.
 * - 각 문항에 5개 축(개방/성실/외향/우호/안정)이 하나씩 들어간다.
 * - 축의 위치(1~5번)를 문항마다 섞어, 답 위치로 결과를 예측할 수 없게 한다.
 * 응답 기준: "요즘 나의 모습과 기분".
 */
export const QUESTIONS: Question[] = [
  {
    id: "q1",
    text: "새로운 일을 맡으면",
    choices: [
      { label: "안 해본 방식으로 새롭게 접근해본다", axis: "open" },
      { label: "목표와 순서부터 정하고 시작한다", axis: "conscientious" },
      { label: "사람들과 부딪히며 활기차게 시작한다", axis: "extravert" },
      { label: "함께할 사람들 상황부터 살핀다", axis: "agreeable" },
      { label: "서두르지 않고 침착하게 밟아간다", axis: "stable" },
    ],
  },
  {
    id: "q2",
    text: "주말에 에너지가 채워질 때는",
    choices: [
      { label: "사람들과 어울려 북적일 때", axis: "extravert" },
      { label: "소중한 사람과 마음을 나눌 때", axis: "agreeable" },
      { label: "익숙한 일상을 느긋이 보낼 때", axis: "stable" },
      { label: "낯선 곳·새로운 걸 경험할 때", axis: "open" },
      { label: "미뤄둔 일을 정리해 끝낼 때", axis: "conscientious" },
    ],
  },
  {
    id: "q3",
    text: "계획이 갑자기 틀어지면",
    choices: [
      { label: "크게 동요 없이 침착하게 대응한다", axis: "stable" },
      { label: "오히려 새로운 방법을 떠올려본다", axis: "open" },
      { label: "영향받는 사람부터 먼저 챙긴다", axis: "agreeable" },
      { label: "원인을 따져 대안을 다시 설계한다", axis: "conscientious" },
      { label: "사람들과 의논하며 풀어나간다", axis: "extravert" },
    ],
  },
  {
    id: "q4",
    text: "친구가 힘든 일을 털어놓으면",
    choices: [
      { label: "판단보다 마음을 먼저 헤아린다", axis: "agreeable" },
      { label: "흔들리지 않게 곁에서 안정감을 준다", axis: "stable" },
      { label: "상황을 정리해 해결책을 같이 찾는다", axis: "conscientious" },
      { label: "기분이 풀리게 분위기를 바꿔준다", axis: "extravert" },
      { label: "다르게 볼 관점을 함께 찾아준다", axis: "open" },
    ],
  },
  {
    id: "q5",
    text: "나를 가장 잘 설명하는 건",
    choices: [
      { label: "한번 정하면 끝까지 파고든다", axis: "conscientious" },
      { label: "사람들 속에서 활기가 난다", axis: "extravert" },
      { label: "호기심이 많고 새로운 걸 좋아한다", axis: "open" },
      { label: "웬만한 일엔 잘 흔들리지 않는다", axis: "stable" },
      { label: "주변 사람 기분을 잘 알아챈다", axis: "agreeable" },
    ],
  },
  {
    id: "q6",
    text: "할 일이 잔뜩 쌓였을 때 나는",
    choices: [
      { label: "더 효율적인 새 방법을 찾아본다", axis: "open" },
      { label: "조급해하지 않고 차분히 처리한다", axis: "stable" },
      { label: "급한 사람 것부터 도와가며 한다", axis: "agreeable" },
      { label: "우선순위를 세워 하나씩 끝낸다", axis: "conscientious" },
      { label: "사람들과 나눠 하며 활기를 낸다", axis: "extravert" },
    ],
  },
  {
    id: "q7",
    text: "요즘 내가 바라는 건",
    choices: [
      { label: "소중한 관계를 더 깊이 다지기", axis: "agreeable" },
      { label: "목표 하나를 제대로 이뤄내기", axis: "conscientious" },
      { label: "큰 흔들림 없이 평온하게 지내기", axis: "stable" },
      { label: "활기차게 사람들과 어울리기", axis: "extravert" },
      { label: "안 해본 새로운 경험 많이 하기", axis: "open" },
    ],
  },
];
