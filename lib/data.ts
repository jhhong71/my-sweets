/**
 * 콘텐츠 데이터 (UI와 분리).
 * 실제 제품 사진을 쓸 때는 각 test에 `image: "/images/xxx.jpg"` 필드를 추가하고
 * TestCard의 그라디언트 플레이스홀더 대신 next/image로 렌더하면 됩니다.
 */

export type Badge = "HOT" | "NEW" | null;

export type Test = {
  id: string;
  category: string;
  title: string;
  badge: Badge;
  /** 플레이스홀더 배경 그라디언트 (제품 사진 삽입 전까지) */
  gradient: string;
  /** 썸네일 모티프 이모지 */
  motif: string;
  href: string;
  /** 외부(다른 서비스) 링크 여부 — 새 탭으로 연다 */
  external?: boolean;
};

export const POPULAR_TESTS: Test[] = [
  {
    // Firebase participants/ 경로의 키와 동일하게 맞춘다(components/my-sweets/App.tsx 참고).
    id: "my-sweet",
    category: "취향 테스트",
    title: "마이스윗 · 나는 어떤 간식일까?",
    badge: "HOT",
    gradient: "linear-gradient(135deg, #FFD3E2 0%, #FF8DB2 100%)",
    motif: "🧁",
    // 같은 프로젝트 내부 라우트. 외부 도메인으로 다시 연결하지 않는다.
    href: "/tests/my-sweets",
  },
  {
    id: "bokbup",
    category: "데일리",
    title: "오늘의 복붙 · 매일 골라 쓰는 감성 문구",
    badge: "NEW",
    gradient: "linear-gradient(135deg, #D8E6FF 0%, #BFD8FF 100%)",
    motif: "📋",
    href: "https://bokbup-app.pages.dev/",
    external: true,
  },
  {
    // Firebase participants/ 경로의 키와 동일하게 맞춘다(components/desk-organizing/App.tsx 참고).
    id: "desk-organizing",
    category: "정리 테스트",
    title: "나는 어떤 정리 유형?",
    badge: "NEW",
    gradient: "linear-gradient(135deg, #E5FBDF 0%, #C6EAC0 100%)",
    motif: "🗂️",
    // 같은 프로젝트 내부 라우트. 외부 도메인으로 다시 연결하지 않는다.
    href: "/tests/desk-organizing",
  },
  {
    // Firebase participants/ 경로의 키와 동일하게 맞춘다(components/messenger-reply/App.tsx 참고).
    id: "messenger-reply",
    category: "대화 테스트",
    title: "나는 어떤 답장 스타일?",
    badge: "NEW",
    gradient: "linear-gradient(135deg, #E8DFFF 0%, #C9BBF5 100%)",
    motif: "💬",
    // 같은 프로젝트 내부 라우트. 외부 도메인으로 다시 연결하지 않는다.
    href: "/tests/messenger-reply",
  },
  {
    // Firebase participants/ 경로의 키와 동일하게 맞춘다(components/mandalart/App.tsx 참고).
    // 질문에 답하는 테스트가 아니라 작성 도구다 — "나는 어떤 ~?" 식으로 제목을
    // 붙이지 않는다(콘텐츠 성격을 실제와 다르게 보이게 하지 않기 위함).
    id: "mandalart",
    category: "데일리 도구",
    title: "말랑 만다라트 · 목표를 81칸으로 펼쳐보기",
    badge: "NEW",
    gradient: "linear-gradient(135deg, #FDE7EE 0%, #F6B8CB 55%, #E4708F 100%)",
    motif: "🎀",
    // 같은 프로젝트 내부 라우트. 외부 도메인으로 다시 연결하지 않는다.
    href: "/tools/mandalart",
  },
  {
    // Firebase participants/ 경로의 키와 동일하게 맞춘다(components/work-learning/App.tsx 참고).
    id: "work-learning",
    category: "학습 테스트",
    title: "나의 업무 학습 스타일은?",
    badge: "NEW",
    gradient: "linear-gradient(135deg, #FFF3AE 0%, #F0C97A 55%, #D9A94A 100%)",
    motif: "📖",
    // 같은 프로젝트 내부 라우트. 외부 도메인으로 다시 연결하지 않는다.
    href: "/tests/work-learning",
  },
  // 실제로 열리는 항목만 여기 둔다(테스트뿐 아니라 도구도 포함). 준비 중인
  // 항목은 아직 추가하지 않는다(콘텐츠 수가 적을 때 "준비 중" 카드를 억지로
  // 채우지 않기로 함).
];

export type Feature = {
  id: string;
  icon: "sparkles" | "heart" | "share";
  title: string;
  description: string;
  bg: string;
};

export const FEATURES: Feature[] = [
  {
    id: "fun",
    icon: "sparkles",
    title: "부담 없는 짧은 질문",
    description: "약 2~3분이면 끝나는 질문에 답하며 나의 취향을 가볍게 알아봐요.",
    bg: "#FFF0F5",
  },
  {
    id: "share",
    icon: "share",
    title: "친구와 공유하는 즐거움",
    description: "결과 카드를 이미지로 저장하고 친구와 이야기를 나눠보세요.",
    bg: "#F1FBEC",
  },
  {
    id: "reference",
    icon: "heart",
    title: "재미로 즐기는 콘텐츠",
    description: "테스트 결과는 재미와 자기 탐색을 위한 참고용이에요.",
    bg: "#EEF4FF",
  },
];

export const NAV_LINKS = [
  { label: "테스트", href: "/#popular" },
  { label: "소개", href: "/about" },
];
