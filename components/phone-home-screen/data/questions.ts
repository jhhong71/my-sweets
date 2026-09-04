import type { Question } from "../types";

/**
 * 12문항 · 문항당 2지선다.
 *
 * 각 문항은 축 하나만 담당하고, high 극 선택지를 고르면 그 축에 weight 만큼,
 * low 극 선택지를 고르면 0점이 더해진다. 선택지가 결과 유형에 직접 점수를 주는
 * 구조가 아니라, 축 점수를 먼저 계산한 뒤 유형을 정한다.
 *
 * 축별 가중치 구성은 [2, 2, 2, 1] → 합 7 (홀수)이라 축 점수가 정확히 절반이 되는
 * 동점이 발생하지 않는다. 또한 무작위 응답 기준으로 high/low가 6:6으로 나뉘어
 * 어느 한쪽 극이 구조적으로 유리하지 않다. (docs/test-design.md 참고)
 *
 * 정답이 있는 문항이 아니므로 두 선택지 모두 긍정적으로 읽히도록 작성했고,
 * high 극 선택지가 항상 같은 위치에 오지 않게 순서를 섞어 배치했다.
 *
 * 응답 기준: "평소 내 스마트폰 홈 화면을 관리하는 나".
 */
export const QUESTIONS: Question[] = [
  {
    id: "st1",
    axis: "struct",
    weight: 2,
    text: "새 앱을 설치하면",
    choices: [
      { label: "바로 어울리는 폴더를 찾아 넣는다", pole: "high" },
      { label: "일단 빈자리에 아무렇게나 놓아둔다", pole: "low" },
    ],
  },
  {
    id: "mn1",
    axis: "mini",
    weight: 2,
    text: "홈 화면 첫 페이지에는",
    choices: [
      { label: "정말 자주 쓰는 앱 몇 개만 남겨둔다", pole: "high" },
      { label: "가능한 많은 앱을 채워 넣는다", pole: "low" },
    ],
  },
  {
    id: "ae1",
    axis: "aes",
    weight: 2,
    text: "배경화면을 고를 때",
    choices: [
      { label: "기본 배경화면을 그대로 쓴다", pole: "low" },
      { label: "분위기와 색감을 신경 써서 고른다", pole: "high" },
    ],
  },
  {
    id: "st2",
    axis: "struct",
    weight: 2,
    text: "홈 화면을 보면",
    choices: [
      { label: "카테고리별로 앱이 폴더에 묶여 있다", pole: "high" },
      { label: "설치한 순서대로 뒤죽박죽 섞여 있다", pole: "low" },
    ],
  },
  {
    id: "mn2",
    axis: "mini",
    weight: 2,
    text: "앱스토어에서 새로운 앱을 발견하면",
    choices: [
      { label: "일단 흥미로우면 바로 설치해본다", pole: "low" },
      { label: "정말 필요한지 한 번 더 고민하고 설치한다", pole: "high" },
    ],
  },
  {
    id: "ae2",
    axis: "aes",
    weight: 2,
    text: "위젯 기능에 대해",
    choices: [
      { label: "날씨·캘린더 같은 위젯을 꾸며서 배치한다", pole: "high" },
      { label: "위젯 없이 아이콘만 깔끔하게 둔다", pole: "low" },
    ],
  },
  {
    id: "st3",
    axis: "struct",
    weight: 2,
    text: "요즘 잘 안 쓰는 앱을 발견하면",
    choices: [
      { label: "정리함이나 안 보이는 폴더로 옮겨둔다", pole: "high" },
      { label: "특별히 신경 쓰지 않고 그 자리에 둔다", pole: "low" },
    ],
  },
  {
    id: "mn3",
    axis: "mini",
    weight: 2,
    text: "홈 화면 페이지 수는",
    choices: [
      { label: "1~2페이지를 넘지 않으려 한다", pole: "high" },
      { label: "여러 페이지에 걸쳐 앱이 늘어나 있다", pole: "low" },
    ],
  },
  {
    id: "ae3",
    axis: "aes",
    weight: 2,
    text: "아이콘 모양이나 테마를 바꿀 수 있다면",
    choices: [
      { label: "통일감 있게 아이콘을 바꿔본 적이 있다", pole: "high" },
      { label: "기본 아이콘 그대로 쓰는 게 편하다", pole: "low" },
    ],
  },
  {
    id: "st4",
    axis: "struct",
    weight: 1,
    text: "폴더를 만들 때",
    choices: [
      { label: "폴더 이름을 용도에 맞게 꼭 붙인다", pole: "high" },
      { label: "이름 없이 그냥 앱들을 모아두기만 한다", pole: "low" },
    ],
  },
  {
    id: "mn4",
    axis: "mini",
    weight: 1,
    text: "안 쓰는 앱이 쌓이면",
    choices: [
      { label: "주기적으로 삭제해서 화면을 비운다", pole: "high" },
      { label: "언젠가 쓸 것 같아 그냥 둔다", pole: "low" },
    ],
  },
  {
    id: "ae4",
    axis: "aes",
    weight: 1,
    text: "홈 화면을 꾸미는 데 시간을 쓰는 것에 대해",
    choices: [
      { label: "화면은 기능만 되면 충분하다고 생각한다", pole: "low" },
      { label: "취향이 담긴 화면을 보면 기분이 좋다", pole: "high" },
    ],
  },
];
