import type { Question } from "../types";

/**
 * 12문항 · 문항당 2지선다.
 *
 * 각 문항은 축 하나만 담당하고, high 극 선택지를 고르면 그 축에 weight 만큼,
 * low 극 선택지를 고르면 0점이 더해진다. 선택지가 결과 유형에 직접 점수를 주는
 * 구조가 아니라, 축 점수를 먼저 계산한 뒤 유형을 정한다.
 *
 * 축별 가중치 구성은 [2, 2, 2, 1] → 합 7 (홀수)이라 축 점수가 정확히 절반이 되는
 * 동점이 발생하지 않는다. 또한 무작위 응답 기준으로 high/low가 8:8로 나뉘어
 * 어느 한쪽 극이 구조적으로 유리하지 않다. (docs/test-design.md 참고)
 *
 * 정답이 있는 문항이 아니므로 두 선택지 모두 긍정적으로 읽히도록 작성했고,
 * high 극 선택지가 항상 같은 위치에 오지 않게 순서를 번갈아 배치했다.
 *
 * 응답 기준: "출근 준비를 하는 평소의 나".
 */
export const QUESTIONS: Question[] = [
  {
    id: "q1",
    axis: "rhythm",
    weight: 2,
    text: "알람이 울렸다.",
    choices: [
      { label: "정해둔 기상 시간에 맞춰 천천히 몸을 깨운다", pole: "high" },
      { label: "한두 번 더 미루다가 벌떡 일어나 서두른다", pole: "low" },
    ],
  },
  {
    id: "q2",
    axis: "info",
    weight: 2,
    text: "눈을 뜨자마자",
    choices: [
      { label: "휴대폰부터 들어 알림과 메시지를 확인한다", pole: "high" },
      { label: "휴대폰은 잠시 미뤄두고 내 할 일부터 한다", pole: "low" },
    ],
  },
  {
    id: "q3",
    axis: "flex",
    weight: 2,
    text: "몸이 평소보다 무겁게 느껴지는 아침이다.",
    choices: [
      { label: "그날 컨디션에 맞춰 준비 순서를 바꿔본다", pole: "low" },
      { label: "그래도 정해둔 순서는 그대로 따른다", pole: "high" },
    ],
  },
  {
    id: "q4",
    axis: "rhythm",
    weight: 2,
    text: "출근 준비 시간을 정한다면",
    choices: [
      { label: "최소한의 시간만 빠듯하게 잡는다", pole: "low" },
      { label: "여유 있게 넉넉한 시간을 잡아둔다", pole: "high" },
    ],
  },
  {
    id: "q5",
    axis: "info",
    weight: 2,
    text: "준비하는 동안 뉴스나 SNS 피드가 눈에 들어왔다.",
    choices: [
      { label: "궁금해서 한번 훑어보고 넘어간다", pole: "high" },
      { label: "지금은 됐다며 준비에만 집중한다", pole: "low" },
    ],
  },
  {
    id: "q6",
    axis: "flex",
    weight: 2,
    text: "출근 준비 순서(세안, 옷, 식사 등)를 정한다면",
    choices: [
      { label: "매일 같은 순서를 반복한다", pole: "high" },
      { label: "그날 기분이나 상황에 따라 순서를 바꾼다", pole: "low" },
    ],
  },
  {
    id: "q7",
    axis: "rhythm",
    weight: 2,
    text: "챙겨야 할 준비물(지갑, 카드, 이어폰 등)을 정리할 때",
    choices: [
      { label: "전날 밤 미리 챙겨 둔다", pole: "high" },
      { label: "현관에서 나가기 직전에 챙긴다", pole: "low" },
    ],
  },
  {
    id: "q8",
    axis: "info",
    weight: 2,
    text: "출근길 지하철이나 버스 안에서",
    choices: [
      { label: "이어폰을 끼고 내 시간에 몰입한다", pole: "low" },
      { label: "놓친 알림과 소식을 확인하며 하루를 파악한다", pole: "high" },
    ],
  },
  {
    id: "q9",
    axis: "flex",
    weight: 2,
    text: "갑자기 날씨나 일정이 바뀌었다는 걸 알았다.",
    choices: [
      { label: "바로 준비 방식을 바꿔 대응한다", pole: "low" },
      { label: "원래 하던 대로 준비를 마치고 나가서 대응한다", pole: "high" },
    ],
  },
  {
    id: "q10",
    axis: "rhythm",
    weight: 1,
    text: "집을 나서기 직전이다.",
    choices: [
      { label: "빠듯하게 시간 맞춰 뛰쳐나간다", pole: "low" },
      { label: "시간이 좀 남아 한 번 더 점검한다", pole: "high" },
    ],
  },
  {
    id: "q11",
    axis: "info",
    weight: 1,
    text: "단체 메신저 알림이 아침부터 쌓여 있다.",
    choices: [
      { label: "일단 열어서 훑어본 뒤 준비를 이어간다", pole: "high" },
      { label: "준비를 마친 뒤 여유가 생기면 확인한다", pole: "low" },
    ],
  },
  {
    id: "q12",
    axis: "flex",
    weight: 1,
    text: "오늘따라 유독 준비 시간이 남는다.",
    choices: [
      { label: "평소와 다른 걸 하나 끼워 넣어본다", pole: "low" },
      { label: "평소 루틴을 그대로 여유 있게 반복한다", pole: "high" },
    ],
  },
];
