import type { Metadata } from "next";
import PhoneHomeScreenApp from "@/components/phone-home-screen/App";
import "@/components/phone-home-screen/phone-home-screen.css";

export const metadata: Metadata = {
  title: "내 폰 홈 화면 정리 유형은?",
  description:
    "12문항으로 정리 구조·아이콘 밀도·꾸미기 성향 세 가지 축을 계산해 8가지 홈 화면 정리 유형 중 나와 가장 가까운 하나를 알려드려요.",
  keywords: [
    "홈화면정리테스트",
    "스마트폰 홈 화면 테스트",
    "구조형",
    "자유형",
    "미니멀형",
    "맥시멀형",
    "꾸미기형",
    "실용형",
  ],
  alternates: {
    canonical: "/tests/phone-home-screen",
  },
  openGraph: {
    title: "내 폰 홈 화면 정리 유형은?",
    description: "나는 스마트폰 홈 화면을 어떻게 관리할까? 8가지 유형 중 나와 꼭 닮은 유형은?",
    url: "/tests/phone-home-screen",
    type: "website",
    locale: "ko_KR",
    siteName: "마이스윗테스트",
  },
};

export default function PhoneHomeScreenPage() {
  // App 컴포넌트가 자체 스코프 래퍼(.phone-home-screen-app)를 직접 렌더하므로
  // 여기서 추가 래퍼가 필요 없다.
  return <PhoneHomeScreenApp />;
}
