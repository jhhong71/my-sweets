import type { Metadata } from "next";
import NewColleagueGreetingApp from "@/components/new-colleague-greeting/App";
import "@/components/new-colleague-greeting/new-colleague-greeting.css";

export const metadata: Metadata = {
  title: "새 동료 첫인사 스타일 테스트",
  description:
    "12문항으로 접근 방식·질문 방식·친밀감 형성 속도 세 축을 계산해 8가지 유형 중 나와 가장 가까운 새 동료 첫인사 스타일을 알려드려요.",
  alternates: {
    canonical: "/tests/new-colleague-greeting",
  },
  openGraph: {
    title: "새 동료 첫인사 스타일 테스트",
    description: "나는 새 동료를 어떻게 맞이할까? 8가지 유형 중 나와 가장 가까운 하나는?",
    url: "/tests/new-colleague-greeting",
    type: "website",
    locale: "ko_KR",
    siteName: "마이스윗테스트",
  },
};

export default function NewColleagueGreetingPage() {
  // App 컴포넌트가 자체 스코프 래퍼(.new-colleague-greeting-app)를 직접 렌더하므로
  // 여기서 추가 래퍼가 필요 없다.
  return <NewColleagueGreetingApp />;
}
