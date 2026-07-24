import type { ResultId, ResultProfile } from "../types";
import { SNACK_ACCENT } from "./snacks";

/** 결과 고정 순서 (동점 처리에 사용) */
export const RESULT_ORDER: ResultId[] = [
  "chocolate",
  "candy",
  "biscuit",
  "marshmallow",
  "pudding",
];

/**
 * 5개 간식 결과. profile은 (진함, 발랄함, 다정함) 기준 좌표(1~5)로,
 * 응답에서 계산한 3개 취향 축 점수와의 유클리드 거리로 대표/보조 결과를 정한다.
 */
export const RESULTS: Record<ResultId, ResultProfile> = {
  chocolate: {
    id: "chocolate",
    title: "초콜릿",
    subtitle: "진하고 강렬한 · 확실한 취향",
    profile: { rich: 4.0, playful: 1.6, warm: 1.9 },
    color: SNACK_ACCENT.chocolate,
    summary:
      "당신은 진한 초콜릿 같은 사람이에요. 좋아하는 게 확실하고 한번 빠지면 끝까지 파고들죠. 취향도 생각도 또렷해서, 어디서든 '나'라는 색이 분명하게 남는 사람이에요.",
    strengths: [
      "취향과 기준이 분명해 자기 색이 또렷하다",
      "좋아하는 것에 깊이 파고드는 몰입력",
      "존재감 있게 상황을 이끄는 힘이 있다",
    ],
    cautions: [
      "취향이 강한 만큼 고집으로 비칠 수 있어요",
      "몰입하다 주변을 살필 여유를 놓칠 수 있어요",
    ],
    tips: [
      "내 확신을 나누기 전에 상대 의견도 한 번 물어보기",
      "가끔은 힘을 빼고 가볍게 즐기는 시간 두기",
    ],
    relations:
      "발랄함이 오르면 '사탕', 다정함이 오르면 '비스킷'의 결도 함께 나타나요.",
    shareText: "나는 진한 '초콜릿' 같은 사람! 너는 어떤 간식일까?",
  },
  candy: {
    id: "candy",
    title: "사탕",
    subtitle: "톡톡 튀는 · 반짝이는 발랄함",
    profile: { rich: 1.8, playful: 3.7, warm: 1.9 },
    color: SNACK_ACCENT.candy,
    summary:
      "당신은 알록달록 사탕 같은 사람이에요. 새로운 게 있으면 일단 시도하고, 처진 자리도 금세 들썩이게 만들죠. 함께 있으면 지루할 틈이 없는, 반짝이는 에너지의 사람이에요.",
    strengths: [
      "어디서든 반짝이는 밝고 경쾌한 에너지",
      "새로운 걸 재밌게 시도하는 유연함",
      "함께 있으면 지루할 틈이 없다",
    ],
    cautions: [
      "관심이 여러 갈래로 흩어질 수 있어요",
      "신나는 순간이 지나면 금방 시들해질 수 있어요",
    ],
    tips: [
      "재밌게 시작한 일은 작은 마무리까지 챙기기",
      "들뜬 뒤엔 잠깐 숨 고르는 시간 두기",
    ],
    relations:
      "진함이 오르면 '초콜릿', 다정함이 오르면 '마시멜로우'와도 가까워져요.",
    shareText: "나는 톡톡 튀는 '사탕' 같은 사람! 너는 어떤 간식일까?",
  },
  biscuit: {
    id: "biscuit",
    title: "비스킷",
    subtitle: "담백하고 든든한 · 한결같은 편안함",
    profile: { rich: 3.6, playful: 1.2, warm: 3.6 },
    color: SNACK_ACCENT.biscuit,
    summary:
      "당신은 고소한 비스킷 같은 사람이에요. 요란하지 않아도 맡은 건 조용히 끝까지 해내고, 늘 그 자리에 있어주죠. 함께할수록 '이 사람은 믿을 수 있다'는 안정감을 주는 사람이에요.",
    strengths: [
      "한결같고 성실해 믿고 기댈 수 있다",
      "담백하게 상황을 안정적으로 이끈다",
      "과하지 않아 오래 함께하기 편안하다",
    ],
    cautions: [
      "익숙함에 머물다 변화를 미룰 수 있어요",
      "속마음을 담담하게 눌러 표현이 적을 수 있어요",
    ],
    tips: [
      "가끔은 새로운 시도로 기분을 환기하기",
      "느낀 건 담아두지 말고 가볍게 표현해 보기",
    ],
    relations:
      "진함이 오르면 '초콜릿', 다정함이 오르면 '푸딩'과도 가까워져요.",
    shareText: "나는 든든한 '비스킷' 같은 사람! 너는 어떤 간식일까?",
  },
  marshmallow: {
    id: "marshmallow",
    title: "마시멜로우",
    subtitle: "폭신하고 사랑스러운 · 밝은 다정함",
    profile: { rich: 1.7, playful: 3.1, warm: 3.2 },
    color: SNACK_ACCENT.marshmallow,
    summary:
      "당신은 폭신한 마시멜로우 같은 사람이에요. 밝은 기운으로 분위기를 데우면서도 곁의 사람을 살뜰히 챙기죠. 함께한 사람에게 유독 좋은 기억으로 남는, 사랑스러운 사람이에요.",
    strengths: [
      "밝음과 다정함을 함께 지닌 사랑스러움",
      "작은 것도 살뜰히 챙기며 분위기를 밝힌다",
      "함께한 사람에게 좋은 기억으로 남는다",
    ],
    cautions: [
      "모두를 챙기려다 마음이 바쁠 수 있어요",
      "거절이 어려워 부탁을 떠안을 수 있어요",
    ],
    tips: [
      "'지금은 내 차례'라고 나를 먼저 챙기는 순간 만들기",
      "부탁은 무리하지 않는 선에서 정하기",
    ],
    relations:
      "발랄함이 오르면 '사탕', 다정함이 더 오르면 '푸딩'과도 가까워져요.",
    shareText: "나는 폭신한 '마시멜로우' 같은 사람! 너는 어떤 간식일까?",
  },
  pudding: {
    id: "pudding",
    title: "푸딩",
    subtitle: "포근하고 다정한 · 마음을 녹이는",
    profile: { rich: 1.9, playful: 1.4, warm: 4.0 },
    color: SNACK_ACCENT.pudding,
    summary:
      "당신은 사르르 부드러운 푸딩 같은 사람이에요. 상대의 마음부터 먼저 살피고, 조용히 곁을 지키며 챙기죠. 함께 있으면 어느새 긴장이 풀리고 마음이 놓이는, 포근한 사람이에요.",
    strengths: [
      "곁을 편안하게 만드는 깊은 다정함",
      "차분하게 상대를 챙기는 세심함",
      "믿고 기댈 수 있는 안정감",
    ],
    cautions: [
      "남을 챙기느라 내 필요는 미룰 수 있어요",
      "변화보다 익숙함에 오래 머물 수 있어요",
    ],
    tips: [
      "가끔은 새로운 자극으로 기분 환기하기",
      "받은 다정함만큼 나에게도 돌려주기",
    ],
    relations:
      "발랄함이 오르면 '마시멜로우', 진함이 오르면 '비스킷'과도 가까워져요.",
    shareText: "나는 포근한 '푸딩' 같은 사람! 너는 어떤 간식일까?",
  },
};

export const RESULT_LIST: ResultProfile[] = RESULT_ORDER.map((id) => RESULTS[id]);
