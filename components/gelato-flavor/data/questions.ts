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
 * high 극 선택지가 항상 같은 위치에 오지 않게 순서를 번갈아 배치했다.
 *
 * 문항은 젤라또를 직접 고르는 상황이 아니라 일상 속 취향·기분을 묻는다.
 * 응답 기준: "평소의 나".
 */
export const QUESTIONS: Question[] = [
  {
    id: "r1",
    axis: "richness",
    weight: 2,
    text: "피곤한 하루 끝, 나에게 주는 작은 선물은",
    choices: [
      { label: "진하고 묵직한 디저트를 천천히 즐긴다", pole: "high" },
      { label: "가볍고 상큼한 걸로 입을 깨운다", pole: "low" },
    ],
  },
  {
    id: "e1",
    axis: "energy",
    weight: 2,
    text: "좋아하는 소식을 들었을 때 나는",
    choices: [
      { label: "소리 내어 반응하며 바로 티가 난다", pole: "high" },
      { label: "속으로 좋아하며 잔잔하게 웃는다", pole: "low" },
    ],
  },
  {
    id: "s1",
    axis: "style",
    weight: 2,
    text: "새로 생긴 가게에 가면",
    choices: [
      { label: "다들 시키는 대표 메뉴부터 시켜본다", pole: "low" },
      { label: "처음 보는 이색 메뉴부터 시켜본다", pole: "high" },
    ],
  },
  {
    id: "r2",
    axis: "richness",
    weight: 2,
    text: "좋아하는 실내 공기는",
    choices: [
      { label: "창문을 열어 시원한 바람이 도는 쪽", pole: "low" },
      { label: "포근하고 따뜻한 공기가 감도는 쪽", pole: "high" },
    ],
  },
  {
    id: "e2",
    axis: "energy",
    weight: 2,
    text: "단체 사진을 찍을 때 나는",
    choices: [
      { label: "자연스럽게 서서 잔잔한 표정을 짓는다", pole: "low" },
      { label: "포즈를 취하며 분위기를 띄운다", pole: "high" },
    ],
  },
  {
    id: "s2",
    axis: "style",
    weight: 2,
    text: "옷을 고를 때 나는",
    choices: [
      { label: "무난하게 어디에나 잘 어울리는 걸 고른다", pole: "low" },
      { label: "나만의 포인트가 되는 독특한 아이템을 고른다", pole: "high" },
    ],
  },
  {
    id: "r3",
    axis: "richness",
    weight: 2,
    text: "향수나 방향제를 고른다면",
    choices: [
      { label: "묵직하고 깊게 남는 향이 좋다", pole: "high" },
      { label: "은은하게 스치고 사라지는 향이 좋다", pole: "low" },
    ],
  },
  {
    id: "e3",
    axis: "energy",
    weight: 2,
    text: "주말 아침 눈이 떠지면",
    choices: [
      { label: "바로 일어나 활기차게 하루를 시작한다", pole: "high" },
      { label: "이불 속에서 느긋하게 몸을 깨운다", pole: "low" },
    ],
  },
  {
    id: "s3",
    axis: "style",
    weight: 2,
    text: "선물을 고를 때 나는",
    choices: [
      { label: "실패 없는 스테디셀러를 고른다", pole: "low" },
      { label: "남들과 겹치지 않는 특별한 걸 찾는다", pole: "high" },
    ],
  },
  {
    id: "r4",
    axis: "richness",
    weight: 1,
    text: "좋아하는 영화 결말은",
    choices: [
      { label: "가볍게 웃고 끝나는 코미디 쪽", pole: "low" },
      { label: "여운이 진하게 남는 드라마 쪽", pole: "high" },
    ],
  },
  {
    id: "e4",
    axis: "energy",
    weight: 1,
    text: "즐겨 듣는 플레이리스트는",
    choices: [
      { label: "잔잔하게 흘러가는 곡들", pole: "low" },
      { label: "신나서 저절로 몸이 움직이는 곡들", pole: "high" },
    ],
  },
  {
    id: "s4",
    axis: "style",
    weight: 1,
    text: "방을 꾸민다면 어울리는 분위기는",
    choices: [
      { label: "개성 있고 눈에 띄는 포인트가 있는 쪽", pole: "high" },
      { label: "클래식하고 정돈된 분위기", pole: "low" },
    ],
  },
];
