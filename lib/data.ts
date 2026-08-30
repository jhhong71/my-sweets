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
  /**
   * 같은 도메인이지만 Next 라우터 밖의 정적 앱(예: /ppuri-saju/) 여부.
   * <Link>의 클라이언트 이동으로는 도달 못 하므로 일반 <a>로 렌더한다
   * (components/Header.tsx의 NavLink와 동일한 이유).
   */
  standalone?: boolean;
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
    badge: null,
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
    badge: null,
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
    badge: null,
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
    badge: null,
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
    badge: null,
    gradient: "linear-gradient(135deg, #FFF3AE 0%, #F0C97A 55%, #D9A94A 100%)",
    motif: "📖",
    // 같은 프로젝트 내부 라우트. 외부 도메인으로 다시 연결하지 않는다.
    href: "/tests/work-learning",
  },
  {
    // Firebase participants/ 경로의 키와 동일하게 맞춘다(components/work-stress/App.tsx 참고).
    id: "work-stress",
    category: "스트레스 테스트",
    title: "나는 스트레스를 어떻게 이겨낼까?",
    badge: null,
    gradient: "linear-gradient(135deg, #FFE4EE 0%, #FFB8CF 55%, #DCE7FF 100%)",
    motif: "🌤️",
    // 같은 프로젝트 내부 라우트. 외부 도메인으로 다시 연결하지 않는다.
    href: "/tests/work-stress",
  },
  {
    // Firebase participants/ 경로의 키와 동일하게 맞춘다(components/shopping/App.tsx 참고).
    id: "shopping",
    category: "소비 테스트",
    title: "나는 어떻게 물건을 고를까?",
    badge: null,
    gradient: "linear-gradient(135deg, #FFEDD9 0%, #FFC9A3 55%, #DCE7FF 100%)",
    motif: "🛍️",
    // 같은 프로젝트 내부 라우트. 외부 도메인으로 다시 연결하지 않는다.
    href: "/tests/shopping",
  },
  {
    // Firebase participants/ 경로의 키와 동일하게 맞춘다(components/task-kickoff/App.tsx 참고).
    id: "task-kickoff",
    category: "업무 테스트",
    title: "새 일을 받으면 뭐부터 할까?",
    badge: null,
    gradient: "linear-gradient(135deg, #FFF1DC 0%, #FFD9A8 55%, #FFE9CF 100%)",
    motif: "🚀",
    // 같은 프로젝트 내부 라우트. 외부 도메인으로 다시 연결하지 않는다.
    href: "/tests/task-kickoff",
  },
  {
    // Firebase participants/ 경로의 키와 동일하게 맞춘다(components/money-habit/App.tsx 참고).
    id: "money-habit",
    category: "머니 테스트",
    title: "나는 돈을 어떻게 쓰고 모을까?",
    badge: null,
    gradient: "linear-gradient(135deg, #FFE4D6 0%, #FFC2DC 55%, #FFE9F2 100%)",
    motif: "💰",
    // 같은 프로젝트 내부 라우트. 외부 도메인으로 다시 연결하지 않는다.
    href: "/tests/money-habit",
  },
  {
    // Firebase participants/ 경로의 키와 동일하게 맞춘다(components/team-dinner/App.tsx 참고).
    id: "team-dinner",
    category: "회식 테스트",
    title: "회식에서 나는 어떤 사람일까?",
    badge: null,
    // 앱 자체 배경(team-dinner.css)에 쓰인 색을 그대로 옮겼다.
    gradient: "linear-gradient(135deg, #D9EBFB 0%, #FBDFE0 55%, #FFE7CD 100%)",
    motif: "🍻",
    // 같은 프로젝트 내부 라우트. 외부 도메인으로 다시 연결하지 않는다.
    href: "/tests/team-dinner",
  },
  {
    // Firebase에 참여 기록이 남지 않는다(뿌리사주는 빌드 산출물을 그대로 얹은
    // 독립 SPA라 이 사이트의 recordParticipation을 호출하지 않는다).
    id: "ppuri-saju",
    category: "사주 테스트",
    title: "내 사주엔 조상 버프가 있을까?",
    badge: null,
    // 앱 팔레트(tokens.css)의 종이색 + 오방색(파랑·빨강·노랑) 소프트 톤.
    gradient: "linear-gradient(135deg, #FBF7EF 0%, #E5EDF3 55%, #F7E7E3 100%)",
    motif: "📜",
    // 같은 도메인의 하위 경로지만 Next 라우트가 아니라 정적 파일이다.
    href: "/ppuri-saju/",
    standalone: true,
  },
  {
    // Firebase participants/ 경로의 키와 동일하게 맞춘다(components/olympus/App.tsx 참고).
    id: "olympus",
    category: "신화 테스트",
    title: "나는 어떤 그리스 로마 신을 닮았을까?",
    badge: null,
    // 앱 자체 배경(olympus.css)에 쓰인 대리석 아이보리·골드·에게해 블루 톤.
    gradient: "linear-gradient(135deg, #F3E6BF 0%, #DBE3F2 55%, #F7F2E4 100%)",
    motif: "⚡",
    // 같은 프로젝트 내부 라우트. 외부 도메인으로 다시 연결하지 않는다.
    href: "/tests/olympus",
  },
  {
    // Firebase participants/ 경로의 키와 동일하게 맞춘다(components/morning-prep/App.tsx 참고).
    id: "morning-prep",
    category: "출근 준비 테스트",
    title: "나는 아침에 어떤 사람일까?",
    badge: null,
    // 앱 자체 배경(morning-prep.css)에 쓰인 블루·코랄 파스텔 톤.
    gradient: "linear-gradient(135deg, #DCEAFC 0%, #FFE7CD 55%, #E6F0FB 100%)",
    motif: "☀️",
    // 같은 프로젝트 내부 라우트. 외부 도메인으로 다시 연결하지 않는다.
    href: "/tests/morning-prep",
  },
  {
    // Firebase participants/ 경로의 키와 동일하게 맞춘다(components/lunch-break/App.tsx 참고).
    id: "lunch-break",
    category: "점심시간 테스트",
    title: "나는 점심시간을 어떻게 보낼까?",
    badge: null,
    // 앱 자체 배경(lunch-break.css)에 쓰인 블루·코랄 파스텔 톤.
    gradient: "linear-gradient(135deg, #DCEAFC 0%, #FFE7CD 55%, #E6F0FB 100%)",
    motif: "🍱",
    // 같은 프로젝트 내부 라우트. 외부 도메인으로 다시 연결하지 않는다.
    href: "/tests/lunch-break",
  },
  {
    // Firebase participants/ 경로의 키와 동일하게 맞춘다(components/travel-destination/App.tsx 참고).
    id: "travel-destination",
    category: "여행 테스트",
    title: "나는 어떤 여행지와 잘 어울릴까?",
    badge: null,
    // 앱 자체 배경(travel-destination.css)에 쓰인 그린·골드 파스텔 톤.
    gradient: "linear-gradient(135deg, #DCF3E4 0%, #FFF3D2 55%, #E8F7EC 100%)",
    motif: "🧳",
    // 같은 프로젝트 내부 라우트. 외부 도메인으로 다시 연결하지 않는다.
    href: "/tests/travel-destination",
  },
  {
    // Firebase participants/ 경로의 키와 동일하게 맞춘다(components/harry-potter/App.tsx 참고).
    id: "harry-potter",
    category: "캐릭터 테스트",
    title: "나는 해리포터 캐릭터 중 누구를 닮았을까?",
    badge: "NEW",
    // 앱 자체 배경(harry-potter.css)에 쓰인 딥 퍼플·골드 파스텔 톤.
    gradient: "linear-gradient(135deg, #E6DEFC 0%, #FBE8C2 55%, #EDE7FA 100%)",
    motif: "🪄",
    // 같은 프로젝트 내부 라우트. 외부 도메인으로 다시 연결하지 않는다.
    href: "/tests/harry-potter",
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
  { label: "오늘의 복붙", href: "https://bokbup-app.pages.dev/", external: true },
  { label: "만다라트", href: "/tools/mandalart" },
  // 같은 도메인의 하위 경로에 얹은 독립 SPA(public/ppuri-saju/).
  // Next 라우트가 아니라 정적 파일이므로 <Link>의 클라이언트 이동으로는 못 간다.
  // standalone 표시를 보고 Header가 일반 <a>로 렌더한다(새 탭은 아님).
  { label: "뿌리사주", href: "/ppuri-saju/", standalone: true },
  { label: "소개", href: "/about" },
];
