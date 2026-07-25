import type { AxisScores, ResultId, ResultProfile } from "../types";
import { SNACK_ACCENT } from "./snacks";

/** 결과 고정 순서 (표시·처리에 사용) */
export const RESULT_ORDER: ResultId[] = [
  "chocolate",
  "candy",
  "biscuit",
  "marshmallow",
  "pudding",
];

/** 대표 축만 높고 나머지는 낮은 프로필을 만든다. (Big Five 5축 좌표) */
function profileOf(main: keyof AxisScores): AxisScores {
  const HI = 4.5;
  const LO = 1.6;
  return {
    open: main === "open" ? HI : LO,
    conscientious: main === "conscientious" ? HI : LO,
    extravert: main === "extravert" ? HI : LO,
    agreeable: main === "agreeable" ? HI : LO,
    stable: main === "stable" ? HI : LO,
  };
}

/**
 * 5개 간식 결과. 각 간식은 5개 취향 축 중 하나를 대표하며,
 * 응답에서 계산한 축 점수와의 유클리드 거리로 대표/보조 결과를 정한다.
 * (초콜릿 성실성 · 사탕 외향성 · 비스킷 정서안정 · 마시멜로우 개방성 · 푸딩 우호성)
 */
export const RESULTS: Record<ResultId, ResultProfile> = {
  chocolate: {
    id: "chocolate",
    title: "초콜릿",
    subtitle: "깊이 파고드는 · 성실한 몰입가",
    profile: profileOf("conscientious"),
    color: SNACK_ACCENT.chocolate,
    summary:
      "당신은 진한 초콜릿 같은 사람이에요. 목표가 서면 계획을 세워 끝까지 밀고 가고, 한번 빠진 일엔 깊이 파고들죠. 꾸준함과 책임감이 그대로 신뢰가 되는 사람이에요.",
    strengths: [
      "세운 계획을 끝까지 해내는 끈기",
      "맡은 일을 책임지는 성실함",
      "하나를 깊게 파고드는 집중력",
    ],
    cautions: [
      "기준이 높아 스스로를 몰아붙일 수 있어요",
      "완벽을 좇다 시작이 늦어질 수 있어요",
    ],
    tips: [
      "가끔은 '이 정도면 충분'이라고 여겨보기",
      "계획 밖의 여유 시간도 일정에 넣어두기",
    ],
    relations:
      "새로움을 즐기면 '마시멜로우', 차분함이 강해지면 '비스킷'의 결도 함께 나타나요.",
    shareText: "나는 성실하게 파고드는 '초콜릿' 같은 사람! 너는 어떤 간식일까?",
  },
  candy: {
    id: "candy",
    title: "사탕",
    subtitle: "톡톡 튀는 · 활력의 사교가",
    profile: profileOf("extravert"),
    color: SNACK_ACCENT.candy,
    summary:
      "당신은 알록달록 사탕 같은 사람이에요. 사람들과 어울릴 때 에너지가 차오르고, 어디서든 분위기를 밝게 띄우죠. 함께 있으면 지루할 틈이 없는, 반짝이는 활력의 사람이에요.",
    strengths: [
      "어디서든 분위기를 밝히는 활력",
      "사람들과 금세 어울리는 친화력",
      "망설이기보다 먼저 다가가는 추진력",
    ],
    cautions: [
      "혼자 있는 시간엔 금방 심심해질 수 있어요",
      "여러 자리를 벌이다 에너지가 분산될 수 있어요",
    ],
    tips: [
      "가끔은 혼자 충전하는 시간도 챙기기",
      "벌여둔 일은 마무리까지 챙겨보기",
    ],
    relations:
      "새로움을 더 즐기면 '마시멜로우', 다정함이 오르면 '푸딩'과도 가까워져요.",
    shareText: "나는 활력 넘치는 '사탕' 같은 사람! 너는 어떤 간식일까?",
  },
  biscuit: {
    id: "biscuit",
    title: "비스킷",
    subtitle: "담백하고 든든한 · 흔들림 없는 평정",
    profile: profileOf("stable"),
    color: SNACK_ACCENT.biscuit,
    summary:
      "당신은 고소한 비스킷 같은 사람이에요. 웬만한 일엔 크게 동요하지 않고, 어떤 상황에서도 차분함을 지키죠. 곁에 있으면 마음이 놓이는, 한결같고 든든한 사람이에요.",
    strengths: [
      "위기에도 흔들리지 않는 평정심",
      "어떤 상황에서도 한결같은 안정감",
      "감정에 휩쓸리지 않는 차분한 판단",
    ],
    cautions: [
      "큰 변화 앞에서도 무덤덤해 보일 수 있어요",
      "속마음을 잘 안 드러내 오해를 살 수 있어요",
    ],
    tips: [
      "느낀 감정은 가볍게라도 표현해 보기",
      "가끔은 익숙함 밖으로 한 걸음 나가보기",
    ],
    relations:
      "성실함이 오르면 '초콜릿', 다정함이 오르면 '푸딩'과도 가까워져요.",
    shareText: "나는 흔들림 없는 '비스킷' 같은 사람! 너는 어떤 간식일까?",
  },
  marshmallow: {
    id: "marshmallow",
    title: "마시멜로우",
    subtitle: "말랑하고 유연한 · 호기심 많은 탐험가",
    profile: profileOf("open"),
    color: SNACK_ACCENT.marshmallow,
    summary:
      "당신은 폭신한 마시멜로우 같은 사람이에요. 새로운 것에 호기심이 많고, 낯선 것도 말랑하게 받아들이죠. 틀에 매이지 않는 유연함으로 늘 신선한 시도를 즐기는 사람이에요.",
    strengths: [
      "새로운 것을 반기는 열린 호기심",
      "틀에 매이지 않는 유연한 사고",
      "다양한 관점을 아우르는 상상력",
    ],
    cautions: [
      "관심이 여러 갈래로 퍼질 수 있어요",
      "새로움을 좇다 익숙한 걸 놓칠 수 있어요",
    ],
    tips: [
      "벌여둔 관심사 중 하나는 끝까지 파보기",
      "익숙한 것의 좋은 점도 다시 살펴보기",
    ],
    relations:
      "활력이 오르면 '사탕', 성실함이 오르면 '초콜릿'과도 가까워져요.",
    shareText: "나는 호기심 많은 '마시멜로우' 같은 사람! 너는 어떤 간식일까?",
  },
  pudding: {
    id: "pudding",
    title: "푸딩",
    subtitle: "포근하고 다정한 · 마음을 살피는",
    profile: profileOf("agreeable"),
    color: SNACK_ACCENT.pudding,
    summary:
      "당신은 사르르 부드러운 푸딩 같은 사람이에요. 상대의 마음부터 먼저 살피고, 조용히 곁을 지키며 챙기죠. 함께 있으면 어느새 긴장이 풀리고 마음이 놓이는, 포근한 사람이에요.",
    strengths: [
      "상대 마음을 먼저 헤아리는 공감력",
      "곁을 편안하게 만드는 다정함",
      "갈등을 부드럽게 푸는 배려",
    ],
    cautions: [
      "남을 챙기느라 내 필요는 미룰 수 있어요",
      "거절이 어려워 부탁을 떠안을 수 있어요",
    ],
    tips: [
      "'지금은 내 차례'라고 나를 먼저 챙기기",
      "부탁은 무리하지 않는 선에서 정하기",
    ],
    relations:
      "활력이 오르면 '사탕', 차분함이 강해지면 '비스킷'과도 가까워져요.",
    shareText: "나는 다정하게 살피는 '푸딩' 같은 사람! 너는 어떤 간식일까?",
  },
};

export const RESULT_LIST: ResultProfile[] = RESULT_ORDER.map((id) => RESULTS[id]);
