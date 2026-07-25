import { SERVICE, TEST_CONFIG } from "../config";

/** 대표 간식 5종 (상단 히어로·미리보기·이미지 alt에 사용) */
export const REPRESENTATIVE = [
  { id: "chocolate", imageKey: "chocolate-milk", alt: "우유 초콜릿" },
  { id: "candy", imageKey: "candy-lemon", alt: "레몬 막대사탕" },
  { id: "biscuit", imageKey: "biscuit-butter", alt: "버터 비스킷" },
  { id: "marshmallow", imageKey: "marshmallow-strawberry", alt: "딸기 마시멜로" },
  { id: "pudding", imageKey: "pudding-caramel", alt: "카라멜 푸딩" },
] as const;

/** 시작 화면 소개 문구 (기본/모바일 축약) — '요즘 기분' 표현은 쓰지 않는다. */
export const LEAD = {
  full:
    "평소의 선택과 행동을 통해 나와 가장 닮은 달콤한 간식을 찾아보세요. 외향성·개방성·성실성·우호성·정서안정성 다섯 성향을 바탕으로, 5가지 간식과 15가지 맛이 조합된 나만의 결과를 보여드려요.",
  short:
    "평소의 선택과 행동으로 알아보는 나와 닮은 간식. 다섯 가지 성향을 바탕으로 5가지 간식과 15가지 맛 중 나만의 결과를 찾아드려요.",
} as const;

/** 검색·사용자용 정적 소개 콘텐츠 (FAQ 아님). 화면에 실제로 보이는 내용과 동일. */
export const SEO_SECTIONS = {
  about: {
    id: "about",
    title: `${SERVICE.fullName}란?`,
    paragraphs: [
      `${SERVICE.fullName}는 ${TEST_CONFIG.questionCount}개의 상황형 질문으로 나와 닮은 달콤한 간식을 찾아보는 무료 간식 성격 테스트예요. 순간의 기분이 아니라 평소에 더 자주 하는 선택과 행동을 기준으로 답하면 됩니다.`,
      "답변은 외향성·개방성·성실성·우호성·정서안정성 다섯 가지 성향으로 나뉘어 각각 따로 계산돼요. 가장 두드러진 성향이 초콜릿·사탕·비스킷·마시멜로·푸딩 다섯 기본 간식 중 하나를 정하고, 여기에 15가지 맛 이미지가 더해져 나만의 결과가 만들어집니다.",
      `이렇게 나올 수 있는 결과는 모두 ${TEST_CONFIG.resultCount}가지예요. 다만 이 테스트는 의학적·임상적 진단이 아니라 재미로 즐기는 오락용 성향 테스트입니다.`,
    ],
  },
  results: {
    id: "result-types",
    title: "어떤 간식 결과가 나오나요?",
    snacks: [
      { name: "초콜릿", desc: "한 가지에 깊이 몰입하고 계획한 일을 끝까지 밀고 가는 성실한 결이 담긴 간식이에요." },
      { name: "사탕", desc: "사람들과 어울릴 때 에너지가 오르고, 자리를 밝게 만드는 활기가 어울려요." },
      { name: "비스킷", desc: "예상 밖의 일에도 크게 흔들리지 않고 차분함을 지키는 든든함을 닮았어요." },
      { name: "마시멜로", desc: "새로운 경험과 낯선 아이디어를 말랑하게 받아들이는 호기심이 배어 있어요." },
      { name: "푸딩", desc: "상대의 마음을 먼저 살피고 곁을 포근하게 감싸는 다정함이 어울리는 간식이에요." },
    ],
  },
  how: {
    id: "how-it-works",
    title: "테스트는 어떻게 진행되나요?",
    steps: [
      `${TEST_CONFIG.questionCount}개의 상황형 문항에 평소 나에 가까운 답을 고릅니다.`,
      "다섯 가지 성향 점수를 서로 독립적으로 계산합니다.",
      "가장 두드러진 성향으로 기본 간식을 정합니다.",
      "두 번째 성향과 맛을 조합해 나만의 결과 이름을 만듭니다.",
      "결과 이미지를 저장하거나 친구와 공유합니다.",
    ],
  },
} as const;
