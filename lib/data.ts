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
  /**
   * "NEW"는 오늘 새로 추가/업데이트한 항목에만 직접 지정한다.
   * "HOT"은 기본적으로 여기 넣지 않는다 — TestCard가 실제 참여수 1위를
   * 실시간으로 계산해 붙인다(components/TestCard.tsx의 useHotTestId 참고).
   * 다만 뿌리사주처럼 참여수 집계 자체가 없는 독립 SPA 등 계산이 닿지 않는
   * 항목이나, 직접 골라 강조하고 싶은 항목은 여기서 "HOT"을 직접 지정해도
   * 된다 — TestCard는 이 값이 있으면 그대로 쓰고, 없을 때만 실시간 계산으로
   * 넘어간다(그래서 HOT이 항상 단 하나뿐이지는 않다).
   */
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
  /**
   * 카드에는 안 보이지만 검색창(PopularTests.tsx)에서 제목·카테고리와 함께
   * 매치 대상으로 쓰는 추가 검색어. 각 테스트의 실제 축·결과 라벨(예:
   * lib/axis.ts의 POLE_LABELS)에서 그대로 가져온 표현만 넣는다 — 실제
   * 결과에 없는 용어를 검색 유입을 위해 지어내지 않는다.
   */
  keywords?: string[];
};

export const POPULAR_TESTS: Test[] = [
  {
    // Firebase participants/ 경로의 키와 동일하게 맞춘다(components/attachment-style/App.tsx 참고).
    id: "attachment-style",
    category: "연애 테스트",
    title: "나의 연애 애착 유형은?",
    badge: "NEW",
    // lib/axis.ts의 POLE_LABELS(밀착도·표현도·안정도 축)에서 그대로 가져온 표현.
    keywords: ["안정형", "예민형", "밀착형", "독립형", "표현형", "절제형", "애착유형", "궁합"],
    // 앱 자체 배경(attachment-style.css)에 쓰인 로즈·페리윙클 블루 파스텔 톤.
    gradient: "linear-gradient(135deg, #FFE1EB 0%, #E2ECFB 55%, #FFEAF1 100%)",
    motif: "💌",
    // 같은 프로젝트 내부 라우트. 외부 도메인으로 다시 연결하지 않는다.
    href: "/tests/attachment-style",
  },
  {
    // Firebase participants/ 경로의 키와 동일하게 맞춘다(components/gelato-flavor/App.tsx 참고).
    id: "gelato-flavor",
    category: "디저트 테스트",
    title: "나는 무슨 맛 젤라또일까?",
    badge: null,
    // lib/axis.ts의 POLE_LABELS(맛의 진하기·기분의 발랄함·취향의 개성 축).
    keywords: ["진한맛형", "상큼형", "발랄형", "차분형", "개성형", "클래식형", "아이스크림"],
    // 앱 자체 배경(gelato-flavor.css)에 쓰인 핑크·옐로우 파스텔 톤.
    gradient: "linear-gradient(135deg, #FDE3EF 0%, #FFF3D0 55%, #FBE6F0 100%)",
    motif: "🍨",
    // 같은 프로젝트 내부 라우트. 외부 도메인으로 다시 연결하지 않는다.
    href: "/tests/gelato-flavor",
  },
  {
    // Firebase participants/ 경로의 키와 동일하게 맞춘다(components/new-colleague-greeting/App.tsx 참고).
    id: "new-colleague-greeting",
    category: "오피스 테스트",
    title: "나는 새 동료를 어떻게 맞이할까?",
    badge: null,
    // lib/axis.ts의 POLE_LABELS(접근 방식·질문 방식·친밀감 형성 속도 축).
    keywords: ["적극 인사형", "지켜보기형", "질문 탐색형", "자연 관찰형", "빠른 친밀형", "신중 예의형", "신입", "동료"],
    // 앱 자체 배경(new-colleague-greeting.css)에 쓰인 블루·코랄 파스텔 톤.
    gradient: "linear-gradient(135deg, #DCEAFC 0%, #FFE7CD 55%, #E6F0FB 100%)",
    motif: "🤝",
    // 같은 프로젝트 내부 라우트. 외부 도메인으로 다시 연결하지 않는다.
    href: "/tests/new-colleague-greeting",
  },
  {
    // Firebase participants/ 경로의 키와 동일하게 맞춘다(components/magic-school/App.tsx 참고).
    id: "magic-school",
    category: "캐릭터 테스트",
    title: "나는 어떤 마법 학교 캐릭터를 닮았을까?",
    badge: null,
    // lib/axis.ts의 POLE_LABELS(행동 방식·마음 vs 원칙·무리 속 위치 축).
    keywords: ["저돌적 행동파", "신중한 관찰형", "마음 우선형", "원칙 우선형", "이끄는 리더형", "소신 개인형", "마법"],
    // 앱 자체 배경(magic-school.css)에 쓰인 딥 퍼플·골드 파스텔 톤.
    gradient: "linear-gradient(135deg, #E6DEFC 0%, #FBE8C2 55%, #EDE7FA 100%)",
    motif: "🪄",
    // 같은 프로젝트 내부 라우트. 외부 도메인으로 다시 연결하지 않는다.
    href: "/tests/magic-school",
  },
  {
    // Firebase participants/ 경로의 키와 동일하게 맞춘다(components/travel-destination/App.tsx 참고).
    id: "travel-destination",
    category: "여행 테스트",
    title: "나는 어떤 여행지와 잘 어울릴까?",
    badge: null,
    // lib/axis.ts의 POLE_LABELS(동선 강도·선호 풍경·여행 방식 축).
    keywords: ["활동형", "여유형", "도시형", "자연형", "계획형", "즉흥형", "여행지"],
    // 앱 자체 배경(travel-destination.css)에 쓰인 그린·골드 파스텔 톤.
    gradient: "linear-gradient(135deg, #DCF3E4 0%, #FFF3D2 55%, #E8F7EC 100%)",
    motif: "🧳",
    // 같은 프로젝트 내부 라우트. 외부 도메인으로 다시 연결하지 않는다.
    href: "/tests/travel-destination",
  },
  {
    // Firebase participants/ 경로의 키와 동일하게 맞춘다(components/lunch-break/App.tsx 참고).
    id: "lunch-break",
    category: "점심시간 테스트",
    title: "나는 점심시간을 어떻게 보낼까?",
    badge: null,
    // lib/axis.ts의 POLE_LABELS(결정 방식·동행 방식·시간 활용 축).
    keywords: ["계획형", "즉흥형", "동행형", "단독형", "재충전형", "활용형", "점심"],
    // 앱 자체 배경(lunch-break.css)에 쓰인 블루·코랄 파스텔 톤.
    gradient: "linear-gradient(135deg, #DCEAFC 0%, #FFE7CD 55%, #E6F0FB 100%)",
    motif: "🍱",
    // 같은 프로젝트 내부 라우트. 외부 도메인으로 다시 연결하지 않는다.
    href: "/tests/lunch-break",
  },
  {
    // Firebase participants/ 경로의 키와 동일하게 맞춘다(components/morning-prep/App.tsx 참고).
    id: "morning-prep",
    category: "출근 준비 테스트",
    title: "나는 아침에 어떤 사람일까?",
    badge: null,
    // lib/axis.ts의 POLE_LABELS(준비 리듬·정보 습관·컨디션 대응 축).
    keywords: ["여유형", "벼락치기형", "확인형", "몰입형", "루틴형", "즉흥형", "출근", "아침루틴"],
    // 앱 자체 배경(morning-prep.css)에 쓰인 블루·코랄 파스텔 톤.
    gradient: "linear-gradient(135deg, #DCEAFC 0%, #FFE7CD 55%, #E6F0FB 100%)",
    motif: "☀️",
    // 같은 프로젝트 내부 라우트. 외부 도메인으로 다시 연결하지 않는다.
    href: "/tests/morning-prep",
  },
  {
    // Firebase participants/ 경로의 키와 동일하게 맞춘다(components/olympus/App.tsx 참고).
    id: "olympus",
    category: "신화 테스트",
    title: "나는 어떤 그리스 로마 신을 닮았을까?",
    badge: "HOT",
    // data/gods.ts에 실제로 등장하는 12신의 이름.
    keywords: [
      "제우스", "헤라", "포세이돈", "데메테르", "아테나", "아폴론",
      "아르테미스", "아레스", "아프로디테", "헤파이스토스", "헤르메스", "디오니소스",
      "그리스로마신", "올림푸스",
    ],
    // 앱 자체 배경(olympus.css)에 쓰인 대리석 아이보리·골드·에게해 블루 톤.
    gradient: "linear-gradient(135deg, #F3E6BF 0%, #DBE3F2 55%, #F7F2E4 100%)",
    motif: "⚡",
    // 같은 프로젝트 내부 라우트. 외부 도메인으로 다시 연결하지 않는다.
    href: "/tests/olympus",
  },
  {
    // Firebase에 참여 기록이 남지 않는다(뿌리사주는 빌드 산출물을 그대로 얹은
    // 독립 SPA라 이 사이트의 recordParticipation을 호출하지 않는다).
    id: "ppuri-saju",
    category: "사주 테스트",
    title: "내 사주엔 조상 버프가 있을까?",
    badge: "HOT",
    keywords: ["사주", "만세력", "궁합", "조상"],
    // 앱 팔레트(tokens.css)의 종이색 + 오방색(파랑·빨강·노랑) 소프트 톤.
    gradient: "linear-gradient(135deg, #FBF7EF 0%, #E5EDF3 55%, #F7E7E3 100%)",
    motif: "📜",
    // 같은 도메인의 하위 경로지만 Next 라우트가 아니라 정적 파일이다.
    href: "/ppuri-saju/",
    standalone: true,
  },
  {
    // Firebase participants/ 경로의 키와 동일하게 맞춘다(components/team-dinner/App.tsx 참고).
    id: "team-dinner",
    category: "회식 테스트",
    title: "회식에서 나는 어떤 사람일까?",
    badge: null,
    // lib/axis.ts의 POLE_LABELS(사교 에너지·자리 지속력·대화 온도 축).
    keywords: ["리액터", "관찰자", "완주", "조기 이탈", "진심", "스몰토크", "회식"],
    // 앱 자체 배경(team-dinner.css)에 쓰인 색을 그대로 옮겼다.
    gradient: "linear-gradient(135deg, #D9EBFB 0%, #FBDFE0 55%, #FFE7CD 100%)",
    motif: "🍻",
    // 같은 프로젝트 내부 라우트. 외부 도메인으로 다시 연결하지 않는다.
    href: "/tests/team-dinner",
  },
  {
    // Firebase participants/ 경로의 키와 동일하게 맞춘다(components/money-habit/App.tsx 참고).
    id: "money-habit",
    category: "머니 테스트",
    title: "나는 돈을 어떻게 쓰고 모을까?",
    badge: null,
    // lib/axis.ts의 AXIS_HIGH_LABEL·AXIS_LOW_LABEL(현금흐름·저축·카드 사용 축).
    keywords: ["계획적 관리형", "흐름에 맡기는형", "저축 우선형", "현재 소비 우선형", "신중한 카드 사용형", "편한 카드 사용형", "소비", "저축"],
    gradient: "linear-gradient(135deg, #FFE4D6 0%, #FFC2DC 55%, #FFE9F2 100%)",
    motif: "💰",
    // 같은 프로젝트 내부 라우트. 외부 도메인으로 다시 연결하지 않는다.
    href: "/tests/money-habit",
  },
  {
    // Firebase participants/ 경로의 키와 동일하게 맞춘다(components/task-kickoff/App.tsx 참고).
    id: "task-kickoff",
    category: "업무 테스트",
    title: "새 일을 받으면 뭐부터 할까?",
    badge: null,
    // lib/axis.ts의 POLE_LABELS(착수 방식·정보 활용·협업 방식 축).
    keywords: ["계획형", "실행형", "자료형", "직관형", "협업형", "독립형", "업무스타일"],
    gradient: "linear-gradient(135deg, #FFF1DC 0%, #FFD9A8 55%, #FFE9CF 100%)",
    motif: "🚀",
    // 같은 프로젝트 내부 라우트. 외부 도메인으로 다시 연결하지 않는다.
    href: "/tests/task-kickoff",
  },
  {
    // Firebase participants/ 경로의 키와 동일하게 맞춘다(components/shopping/App.tsx 참고).
    id: "shopping",
    category: "소비 테스트",
    title: "나는 어떻게 물건을 고를까?",
    badge: null,
    // lib/axis.ts의 AXIS_HIGH_LABEL·AXIS_LOW_LABEL(품질·유행 민감도·충동구매 축).
    keywords: ["품질 추구형", "가성비 추구형", "브랜드·유행 민감형", "실용·안정 선호형", "즉흥 구매형", "계획 구매형", "쇼핑"],
    gradient: "linear-gradient(135deg, #FFEDD9 0%, #FFC9A3 55%, #DCE7FF 100%)",
    motif: "🛍️",
    // 같은 프로젝트 내부 라우트. 외부 도메인으로 다시 연결하지 않는다.
    href: "/tests/shopping",
  },
  {
    // Firebase participants/ 경로의 키와 동일하게 맞춘다(components/work-stress/App.tsx 참고).
    id: "work-stress",
    category: "스트레스 테스트",
    title: "나는 스트레스를 어떻게 이겨낼까?",
    badge: null,
    // lib/axis.ts의 AXIS_HIGH_LABEL·AXIS_LOW_LABEL(문제/감정중심·접근/거리두기 축).
    keywords: ["문제중심형", "감정중심형", "접근형", "거리두기형", "스트레스", "직장스트레스"],
    gradient: "linear-gradient(135deg, #FFE4EE 0%, #FFB8CF 55%, #DCE7FF 100%)",
    motif: "🌤️",
    // 같은 프로젝트 내부 라우트. 외부 도메인으로 다시 연결하지 않는다.
    href: "/tests/work-stress",
  },
  {
    // Firebase participants/ 경로의 키와 동일하게 맞춘다(components/work-learning/App.tsx 참고).
    id: "work-learning",
    category: "학습 테스트",
    title: "나의 업무 학습 스타일은?",
    badge: null,
    // lib/axis.ts의 AXIS_HIGH_LABEL·AXIS_LOW_LABEL(개념/경험·실행/관찰 축).
    keywords: ["개념형", "경험형", "실행형", "관찰형", "학습스타일"],
    gradient: "linear-gradient(135deg, #FFF3AE 0%, #F0C97A 55%, #D9A94A 100%)",
    motif: "📖",
    // 같은 프로젝트 내부 라우트. 외부 도메인으로 다시 연결하지 않는다.
    href: "/tests/work-learning",
  },
  {
    // Firebase participants/ 경로의 키와 동일하게 맞춘다(components/mandalart/App.tsx 참고).
    // 질문에 답하는 테스트가 아니라 작성 도구다 — "나는 어떤 ~?" 식으로 제목을
    // 붙이지 않는다(콘텐츠 성격을 실제와 다르게 보이게 하지 않기 위함).
    id: "mandalart",
    category: "데일리 도구",
    title: "말랑 만다라트 · 목표를 81칸으로 펼쳐보기",
    badge: null,
    keywords: ["만다라트", "목표설정", "계획표"],
    gradient: "linear-gradient(135deg, #FDE7EE 0%, #F6B8CB 55%, #E4708F 100%)",
    motif: "🎀",
    // 같은 프로젝트 내부 라우트. 외부 도메인으로 다시 연결하지 않는다.
    href: "/tools/mandalart",
  },
  {
    // Firebase participants/ 경로의 키와 동일하게 맞춘다(components/messenger-reply/App.tsx 참고).
    id: "messenger-reply",
    category: "대화 테스트",
    title: "나는 어떤 답장 스타일?",
    badge: null,
    // lib/axis.ts의 POLE_LABELS(응답 속도·표현 밀도·대화 주도성 축).
    keywords: ["즉답형", "여유형", "풍성형", "간결형", "주도형", "반응형", "메신저", "답장스타일"],
    gradient: "linear-gradient(135deg, #E8DFFF 0%, #C9BBF5 100%)",
    motif: "💬",
    // 같은 프로젝트 내부 라우트. 외부 도메인으로 다시 연결하지 않는다.
    href: "/tests/messenger-reply",
  },
  {
    // Firebase participants/ 경로의 키와 동일하게 맞춘다(components/desk-organizing/App.tsx 참고).
    id: "desk-organizing",
    category: "정리 테스트",
    title: "나는 어떤 정리 유형?",
    badge: null,
    // lib/axis.ts의 POLE_LABELS(정리 방식·보관 성향·정리 리듬 축).
    keywords: ["계획적", "즉흥적", "보관", "비움", "틈틈이", "몰아서", "정리정돈", "책상정리"],
    gradient: "linear-gradient(135deg, #E5FBDF 0%, #C6EAC0 100%)",
    motif: "🗂️",
    // 같은 프로젝트 내부 라우트. 외부 도메인으로 다시 연결하지 않는다.
    href: "/tests/desk-organizing",
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
    // Firebase participants/ 경로의 키와 동일하게 맞춘다(components/my-sweets/App.tsx 참고).
    id: "my-sweet",
    category: "취향 테스트",
    title: "마이스윗 · 나는 어떤 간식일까?",
    badge: null,
    // lib/axis.ts의 AXIS_LABELS(개방성·성실성·외향성·우호성·정서안정 5요인 축).
    keywords: ["개방성", "성실성", "외향성", "우호성", "정서안정", "간식", "디저트"],
    gradient: "linear-gradient(135deg, #FFD3E2 0%, #FF8DB2 100%)",
    motif: "🧁",
    // 같은 프로젝트 내부 라우트. 외부 도메인으로 다시 연결하지 않는다.
    href: "/tests/my-sweets",
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
