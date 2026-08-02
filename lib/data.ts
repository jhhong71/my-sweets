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
  participants: number;
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
    id: "my-sweets",
    category: "취향 테스트",
    title: "마이스윗 · 나의 디저트 취향은?",
    participants: 18420,
    badge: "HOT",
    gradient: "linear-gradient(135deg, #FFD3E2 0%, #FF8DB2 100%)",
    motif: "🧁",
    href: "https://my-sweets.pages.dev/",
    external: true,
  },
  {
    id: "bokbup",
    category: "데일리",
    title: "오늘의 복붙 · 매일 골라 쓰는 감성 문구",
    participants: 12980,
    badge: "NEW",
    gradient: "linear-gradient(135deg, #D8E6FF 0%, #BFD8FF 100%)",
    motif: "📋",
    href: "https://bokbup-app.pages.dev/",
    external: true,
  },
  {
    id: "love-style",
    category: "연애 테스트",
    title: "연애할 때 나는 어떤 사람일까?",
    participants: 22110,
    badge: "HOT",
    gradient: "linear-gradient(135deg, #FFF3AE 0%, #FFE07A 100%)",
    motif: "💗",
    href: "#",
  },
  {
    id: "healing-place",
    category: "힐링 테스트",
    title: "나에게 딱 맞는 휴식 공간은?",
    participants: 9640,
    badge: "NEW",
    gradient: "linear-gradient(135deg, #E5FBDF 0%, #DDF4D6 100%)",
    motif: "🌿",
    href: "#",
  },
];

export type Category = {
  id: string;
  label: string;
  emoji: string;
  tint: string;
};

export const CATEGORIES: Category[] = [
  { id: "personality", label: "성격", emoji: "🌸", tint: "#FFD3E2" },
  { id: "love", label: "연애", emoji: "❤️", tint: "#FFC7D6" },
  { id: "taste", label: "취향", emoji: "🎨", tint: "#BFD8FF" },
  { id: "job", label: "직업", emoji: "💼", tint: "#FFF3AE" },
  { id: "psychology", label: "심리", emoji: "🧠", tint: "#E8DFFF" },
  { id: "healing", label: "힐링", emoji: "🌿", tint: "#DDF4D6" },
  { id: "game", label: "게임", emoji: "🎮", tint: "#D8E6FF" },
  { id: "etc", label: "기타", emoji: "✨", tint: "#F3E9FF" },
];

export type Feature = {
  id: string;
  icon: "sparkles" | "heart" | "share" | "gift";
  title: string;
  description: string;
  bg: string;
};

export const FEATURES: Feature[] = [
  {
    id: "fun",
    icon: "sparkles",
    title: "다양하고 재미있는 테스트",
    description: "매일 새로운 주제로 업데이트되는 질리지 않는 테스트를 만나보세요.",
    bg: "#FFF0F5",
  },
  {
    id: "accurate",
    icon: "heart",
    title: "섬세하게 설계된 결과",
    description: "전문적으로 다듬은 질문과 결과로 신뢰감 있는 분석을 제공해요.",
    bg: "#EEF4FF",
  },
  {
    id: "share",
    icon: "share",
    title: "친구와 공유하는 즐거움",
    description: "결과 카드를 예쁘게 저장하고 친구와 이야기를 나눠보세요.",
    bg: "#F1FBEC",
  },
  {
    id: "personal",
    icon: "gift",
    title: "나에게 딱 맞는 추천",
    description: "취향과 성향에 어울리는 다음 테스트를 골라드릴게요.",
    bg: "#F4EEFF",
  },
];

export const NAV_LINKS = [
  { label: "홈", href: "#top" },
  { label: "인기 테스트", href: "#popular" },
  { label: "카테고리", href: "#categories" },
  { label: "소개", href: "#features" },
];
