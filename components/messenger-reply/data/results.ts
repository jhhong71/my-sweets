import type { ResultId, ResultProfile } from "../types";

/**
 * 8개 답장 유형 = 3개 축의 조합 (즉답/여유 × 풍성/간결 × 주도/반응).
 * 축 점수를 먼저 계산한 뒤 각 축의 극을 조합해 유형이 정해지므로,
 * 8개 유형 모두 도달 가능하고 구조적으로 유리한 유형이 없다.
 *
 * id 규칙: speed(q/w) + express(v/c) + initiative(l/r)
 *  q 즉답형 · w 여유형 / v 풍성형 · c 간결형 / l 주도형 · r 반응형
 */

/** 결과 고정 순서 (미리보기·동점 비교 등 표시 순서로 사용) */
export const RESULT_ORDER: ResultId[] = [
  "qvl",
  "qvr",
  "qcl",
  "qcr",
  "wvl",
  "wvr",
  "wcl",
  "wcr",
];

export const RESULTS: Record<ResultId, ResultProfile> = {
  qvl: {
    id: "qvl",
    poles: { speed: "high", express: "high", initiative: "high" },
    title: "톡방 분위기 메이커",
    subtitle: "바로 답장 · 풍성한 표현 · 대화를 이끎",
    icon: "megaphone",
    color: "#f5a855",
    summary:
      "메시지를 보면 바로 답하고, 이모티콘과 말을 아낌없이 써서 대화를 풍성하게 만들고, 먼저 연락해 분위기를 살리는 사람이에요. 대화방에 활기를 불어넣는 편이에요.",
    strengths: [
      "대화의 온도를 빠르게 데운다",
      "표현이 풍부해 감정이 잘 전달된다",
      "조용한 대화방에 먼저 말을 건다",
    ],
    cautions: [
      "상대가 답장 속도를 부담스러워할 수 있어요",
      "혼자 대화를 이끌고 있다고 느껴질 때가 있어요",
    ],
    tips: [
      "가끔은 상대가 먼저 말을 꺼낼 틈을 남겨두기",
      "답장이 늦어도 괜찮다고 스스로에게 말해주기",
    ],
    shareText: "내 답장 스타일은 '톡방 분위기 메이커'! 너의 답장 스타일은?",
  },
  qvr: {
    id: "qvr",
    poles: { speed: "high", express: "high", initiative: "low" },
    title: "다정한 즉답 요정",
    subtitle: "바로 답장 · 풍성한 표현 · 오는 연락에 반응",
    icon: "heartbubble",
    color: "#f2789c",
    summary:
      "메시지가 오면 바로, 그리고 정성스럽게 답하는 사람이에요. 다만 대화를 먼저 시작하기보다는 상대의 연락을 기다렸다가 다정하게 화답하는 편이에요.",
    strengths: [
      "빠르고 정성스러운 답장으로 신뢰를 준다",
      "상대의 말에 진심으로 반응해준다",
      "대화가 끊기지 않고 이어지게 만든다",
    ],
    cautions: [
      "먼저 연락하는 일이 적어 서운함을 살 수 있어요",
      "답장에 공들이다 보니 시간이 꽤 걸릴 수 있어요",
    ],
    tips: [
      "가끔은 먼저 안부 메시지 보내보기",
      "짧은 답장도 충분하다는 걸 기억하기",
    ],
    shareText: "내 답장 스타일은 '다정한 즉답 요정'! 너의 답장 스타일은?",
  },
  qcl: {
    id: "qcl",
    poles: { speed: "high", express: "low", initiative: "high" },
    title: "핵심 저격 리더",
    subtitle: "바로 답장 · 간결한 표현 · 대화를 이끎",
    icon: "bulb",
    color: "#f2cb4b",
    summary:
      "메시지를 받으면 바로, 군더더기 없이 답하면서도 먼저 대화를 시작하고 이끄는 사람이에요. 필요한 말을 빠르고 명확하게 전달하는 편이에요.",
    strengths: [
      "의사 결정과 전달이 빠르고 명확하다",
      "대화의 방향을 효율적으로 이끈다",
      "답장이 늦어 답답할 일이 적다",
    ],
    cautions: [
      "짧은 답장이 무뚝뚝하게 느껴질 수 있어요",
      "속도를 맞추기 어려운 상대는 부담스러워할 수 있어요",
    ],
    tips: [
      "가끔은 이모티콘 하나로 온기를 더해보기",
      "답장 앞에 짧은 인사말 붙여보기",
    ],
    shareText: "내 답장 스타일은 '핵심 저격 리더'! 너의 답장 스타일은?",
  },
  qcr: {
    id: "qcr",
    poles: { speed: "high", express: "low", initiative: "low" },
    title: "칼답 미니멀리스트",
    subtitle: "바로 답장 · 간결한 표현 · 오는 연락에 반응",
    icon: "check",
    color: "#63be8e",
    summary:
      "메시지가 오면 바로, 짧고 명확하게 답하는 사람이에요. 대화를 먼저 시작하기보다는 오는 연락에 깔끔하게 반응하는 편이에요.",
    strengths: [
      "필요한 답을 빠르고 정확하게 전달한다",
      "대화가 늘어지지 않고 깔끔하게 정리된다",
      "연락을 기다리게 하지 않는다",
    ],
    cautions: [
      "짧은 답장만으로는 마음이 잘 안 드러날 수 있어요",
      "대화가 단답으로 끝나 아쉬울 때가 있어요",
    ],
    tips: [
      "마음에 드는 이모티콘 하나 곁들여보기",
      "가끔은 먼저 대화를 걸어보기",
    ],
    shareText: "내 답장 스타일은 '칼답 미니멀리스트'! 너의 답장 스타일은?",
  },
  wvl: {
    id: "wvl",
    poles: { speed: "low", express: "high", initiative: "high" },
    title: "느긋한 이야기꾼",
    subtitle: "여유 있게 답장 · 풍성한 표현 · 대화를 이끎",
    icon: "flask",
    color: "#a98de0",
    summary:
      "답장은 여유를 두고 하지만, 일단 답할 땐 이야기를 풍성하게 풀어내고 먼저 대화를 시작하는 사람이에요. 생각이 정리된 뒤에 진솔한 대화를 이끄는 편이에요.",
    strengths: [
      "생각을 정리해 깊이 있는 대화를 나눈다",
      "먼저 다가가 관계를 이어간다",
      "여유로운 태도로 편안함을 준다",
    ],
    cautions: [
      "답장이 늦어 상대를 기다리게 할 수 있어요",
      "길어진 메시지에 부담을 느끼는 상대도 있어요",
    ],
    tips: [
      "급한 연락엔 짧게라도 먼저 반응 남겨두기",
      "가끔은 간결하게 답해보기",
    ],
    shareText: "내 답장 스타일은 '느긋한 이야기꾼'! 너의 답장 스타일은?",
  },
  wvr: {
    id: "wvr",
    poles: { speed: "low", express: "high", initiative: "low" },
    title: "든든한 편지지기",
    subtitle: "여유 있게 답장 · 풍성한 표현 · 오는 연락에 반응",
    icon: "envelope",
    color: "#6fa3e0",
    summary:
      "답장에 시간을 들이고, 정성스럽고 풍부하게 마음을 표현하는 사람이에요. 먼저 연락하기보다는 상대의 연락을 받은 뒤 진심을 담아 답하는 편이에요.",
    strengths: [
      "정성이 담긴 답장으로 깊은 신뢰를 준다",
      "상대의 이야기에 진심으로 공감한다",
      "급하지 않게 관계를 오래 이어간다",
    ],
    cautions: [
      "답장이 늦어 오해를 살 수 있어요",
      "먼저 다가가는 일이 드물 수 있어요",
    ],
    tips: [
      "답장이 늦어질 것 같으면 짧게 미리 알려두기",
      "가끔은 먼저 안부를 물어보기",
    ],
    shareText: "내 답장 스타일은 '든든한 편지지기'! 너의 답장 스타일은?",
  },
  wcl: {
    id: "wcl",
    poles: { speed: "low", express: "low", initiative: "high" },
    title: "여유로운 신호탄",
    subtitle: "여유 있게 답장 · 간결한 표현 · 대화를 이끎",
    icon: "globe",
    color: "#4fbfb8",
    summary:
      "답장은 서두르지 않지만, 필요할 땐 짧고 명확하게 먼저 말을 건네는 사람이에요. 군더더기 없이 담백하게 관계를 이어가는 편이에요.",
    strengths: [
      "필요할 때 부담 없이 먼저 다가간다",
      "짧고 명확해 오해가 적다",
      "자기 페이스를 지키며 관계를 이어간다",
    ],
    cautions: [
      "답장이 늦어 무심해 보일 수 있어요",
      "짧은 말투가 건조하게 느껴질 수 있어요",
    ],
    tips: [
      "짧은 답장에도 이모티콘 하나 더해보기",
      "답장이 늦을 땐 이유를 살짝 남겨두기",
    ],
    shareText: "내 답장 스타일은 '여유로운 신호탄'! 너의 답장 스타일은?",
  },
  wcr: {
    id: "wcr",
    poles: { speed: "low", express: "low", initiative: "low" },
    title: "고요한 리스너",
    subtitle: "여유 있게 답장 · 간결한 표현 · 오는 연락에 반응",
    icon: "cloud",
    color: "#96a6d8",
    summary:
      "답장을 서두르지 않고, 짧고 담백하게 답하며, 연락은 주로 오는 대로 받아주는 사람이에요. 조용하지만 꾸준하게 관계를 지키는 편이에요.",
    strengths: [
      "필요한 순간엔 담백하게 답을 준다",
      "서두르지 않아 감정 소모가 적다",
      "꾸준하게 관계를 유지한다",
    ],
    cautions: [
      "답장이 늦어 연락이 뜸하다고 느껴질 수 있어요",
      "먼저 다가가는 일이 적을 수 있어요",
    ],
    tips: [
      "가끔은 안부를 먼저 물어보기",
      "답장이 늦어질 땐 짧게라도 반응 남기기",
    ],
    shareText: "내 답장 스타일은 '고요한 리스너'! 너의 답장 스타일은?",
  },
};

export const RESULT_LIST: ResultProfile[] = RESULT_ORDER.map((id) => RESULTS[id]);
