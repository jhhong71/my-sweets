import type { Metadata } from "next";
import TeamDinnerApp from "@/components/team-dinner/App";
import "@/components/team-dinner/team-dinner.css";

export const metadata: Metadata = {
  title: "회식 스타일 테스트",
  description:
    "12문항으로 사교 에너지·자리 지속력·대화 온도를 계산해 8가지 회식 유형 중 나와 가장 가까운 하나와 궁합이 맞는 유형을 알려드려요.",
  alternates: {
    canonical: "/tests/team-dinner",
  },
  openGraph: {
    title: "회식 스타일 테스트",
    description: "회식 자리에서 나는 어떤 사람일까? 8가지 유형 중 내 유형과 나와 잘 맞는 유형은?",
    url: "/tests/team-dinner",
    type: "website",
    locale: "ko_KR",
    siteName: "마이스윗테스트",
  },
};

export default function TeamDinnerPage() {
  // App 컴포넌트가 자체 스코프 래퍼(.team-dinner-app)를 직접 렌더하므로
  // 여기서 추가 래퍼가 필요 없다.
  return <TeamDinnerApp />;
}
