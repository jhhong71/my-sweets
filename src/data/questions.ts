import type { Question } from "../types";

/**
 * 15문항 = 5개 성향 × 3문항. 각 문항은 '하나의 성향'만 측정하는 상황형 문항이고,
 * 4개 선택지는 같은 상황에서 그 성향의 강도만 다르게(내부 점수 0~3) 구분한다.
 *
 * 설계 규칙:
 * - 한 문항에서 여러 성향을 경쟁시키지 않는다(강제선택 상대평가 폐기).
 * - 네 선택지 모두 현실적으로 가능한 행동이며, 특정 선택지가 더 착하거나
 *   성숙·바람직해 보이지 않게 한다.
 * - "상황에 따라/둘 다/그때그때" 금지, 이중 질문 금지, 문장 길이·구체성 비슷하게.
 * - 직장·연애·경제력·가족관계를 전제하지 않는다.
 * - 정서안정성 낮은 점수는 결함이 아니라 '감정·상황 변화에 민감하게 반응하는 경향'.
 * - 표시 순서는 문항마다 섞되(점수가 오름차순으로 보이지 않게) 내부 점수는 고정.
 */
export const QUESTIONS: Question[] = [
  // ── 외향성(extravert) ──
  {
    id: "e1",
    trait: "extravert",
    situation: "반가운 소식을 들었을 때 나는 보통",
    options: [
      { text: "주변 몇 사람에게 바로 알린다", score: 2 },
      { text: "혼자 기쁨을 천천히 느낀다", score: 0 },
      { text: "여러 사람과 적극적으로 기쁨을 나눈다", score: 3 },
      { text: "가까운 한 사람에게 이야기한다", score: 1 },
    ],
  },
  {
    id: "e2",
    trait: "extravert",
    situation: "여러 사람이 모인 자리에서 나는",
    options: [
      { text: "주로 듣는 편으로 조용히 있는다", score: 0 },
      { text: "먼저 말을 걸며 분위기를 이끈다", score: 3 },
      { text: "아는 사람 곁에서 이야기한다", score: 1 },
      { text: "대화에 자연스럽게 끼어든다", score: 2 },
    ],
  },
  {
    id: "e3",
    trait: "extravert",
    situation: "쉬는 날 기분을 채우는 방식은",
    options: [
      { text: "사람 많은 곳에서 활기를 즐긴다", score: 3 },
      { text: "한두 명과 편하게 만난다", score: 1 },
      { text: "여럿이 어울리는 약속을 잡는다", score: 2 },
      { text: "혼자 조용히 시간을 보낸다", score: 0 },
    ],
  },
  // ── 개방성(open) ──
  {
    id: "o1",
    trait: "open",
    situation: "처음 가보는 곳에서 나는",
    options: [
      { text: "유명한 곳 위주로 몇 군데 본다", score: 1 },
      { text: "계획에 없던 곳도 종종 들른다", score: 2 },
      { text: "검증된 익숙한 코스로 다닌다", score: 0 },
      { text: "낯선 골목을 즉흥으로 둘러본다", score: 3 },
    ],
  },
  {
    id: "o2",
    trait: "open",
    situation: "새로운 방식이 눈에 띄면 나는",
    options: [
      { text: "먼저 새로운 방식을 찾아 나선다", score: 3 },
      { text: "익숙한 방식이 편해 그대로 둔다", score: 0 },
      { text: "관심이 생겨 한번 시도해본다", score: 2 },
      { text: "괜찮아 보이면 조금 바꿔본다", score: 1 },
    ],
  },
  {
    id: "o3",
    trait: "open",
    situation: "낯선 분야의 이야기를 들으면 나는",
    options: [
      { text: "내 관심 밖이면 흘려듣는다", score: 0 },
      { text: "궁금해서 이것저것 더 물어본다", score: 2 },
      { text: "필요한 만큼만 알아둔다", score: 1 },
      { text: "빠져들어 깊이 파고들어 본다", score: 3 },
    ],
  },
  // ── 성실성(conscientious) ──
  {
    id: "c1",
    trait: "conscientious",
    situation: "할 일이 생기면 나는",
    options: [
      { text: "계획을 세운 뒤 진행한다", score: 2 },
      { text: "세부 일정까지 정해두고 움직인다", score: 3 },
      { text: "마감이 다가와야 시작한다", score: 0 },
      { text: "대충 순서만 잡고 시작한다", score: 1 },
    ],
  },
  {
    id: "c2",
    trait: "conscientious",
    situation: "내 물건과 공간은 보통",
    options: [
      { text: "필요할 때 몰아서 정리한다", score: 1 },
      { text: "어디에 뒀는지 자주 잊는다", score: 0 },
      { text: "늘 제자리에 반듯하게 둔다", score: 3 },
      { text: "나름의 자리를 정해둔다", score: 2 },
    ],
  },
  {
    id: "c3",
    trait: "conscientious",
    situation: "한번 정한 목표를 나는",
    options: [
      { text: "무슨 일이 있어도 끝맺는다", score: 3 },
      { text: "웬만하면 끝까지 해낸다", score: 2 },
      { text: "여건 되는 만큼 이어간다", score: 1 },
      { text: "흥미가 식으면 접기도 한다", score: 0 },
    ],
  },
  // ── 우호성(agreeable) ──
  {
    id: "a1",
    trait: "agreeable",
    situation: "의견이 부딪힐 때 나는",
    options: [
      { text: "내 생각을 분명히 밀고 간다", score: 0 },
      { text: "상대 입장을 먼저 살핀다", score: 2 },
      { text: "최대한 맞춰 부딪힘을 줄인다", score: 3 },
      { text: "필요한 선에서만 양보한다", score: 1 },
    ],
  },
  {
    id: "a2",
    trait: "agreeable",
    situation: "도움이 필요해 보이는 사람을 보면 나는",
    options: [
      { text: "웬만하면 먼저 손을 내민다", score: 2 },
      { text: "여유가 있으면 돕는다", score: 1 },
      { text: "부탁받기 전엔 잘 나서지 않는다", score: 0 },
      { text: "내 일을 미뤄서라도 챙긴다", score: 3 },
    ],
  },
  {
    id: "a3",
    trait: "agreeable",
    situation: "함께 뭔가 정할 일이 있으면 나는",
    options: [
      { text: "서로 반반씩 맞춘다", score: 1 },
      { text: "다 같이 좋은 쪽을 먼저 찾는다", score: 3 },
      { text: "상대가 편한 쪽을 따른다", score: 2 },
      { text: "내가 원하는 쪽을 앞세운다", score: 0 },
    ],
  },
  // ── 정서안정성(stable) ──
  {
    id: "s1",
    trait: "stable",
    situation: "예상치 못한 일이 생기면 나는",
    options: [
      { text: "곧바로 침착하게 대응한다", score: 3 },
      { text: "마음이 한동안 크게 출렁인다", score: 0 },
      { text: "잠깐 흔들려도 마음을 추스른다", score: 1 },
      { text: "얼마 지나 평정을 되찾는다", score: 2 },
    ],
  },
  {
    id: "s2",
    trait: "stable",
    situation: "긴장되는 일을 앞두고 나는",
    options: [
      { text: "며칠 전부터 마음이 쓰인다", score: 0 },
      { text: "조금 긴장해도 곧 가라앉는다", score: 2 },
      { text: "평소와 비슷하게 담담하다", score: 3 },
      { text: "가까워질수록 초조해진다", score: 1 },
    ],
  },
  {
    id: "s3",
    trait: "stable",
    situation: "기분이 상하는 일이 있으면 나는",
    options: [
      { text: "얼마 지나면 툭툭 털어낸다", score: 2 },
      { text: "시간이 꽤 지나야 풀린다", score: 1 },
      { text: "금세 마음을 가라앉힌다", score: 3 },
      { text: "여운이 오래 남는다", score: 0 },
    ],
  },
];

/** 성향별 동점 처리에 쓰는 대표(변별) 문항 id. */
export const REP_QUESTION: Record<string, string> = {
  extravert: "e2",
  open: "o2",
  conscientious: "c1",
  agreeable: "a1",
  stable: "s1",
};
