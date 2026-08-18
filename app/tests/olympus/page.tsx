import type { Metadata } from "next";
import OlympusApp from "@/components/olympus/App";
import "@/components/olympus/olympus.css";

export const metadata: Metadata = {
  title: "올림포스 캐릭터 테스트",
  description:
    "12문항으로 지혜·열정·유대·질서 네 축을 계산해 그리스·로마 신화 속 12신 중 나와 가장 가까운 하나를 알려드려요.",
  alternates: {
    canonical: "/tests/olympus",
  },
  openGraph: {
    title: "올림포스 캐릭터 테스트",
    description: "나는 어떤 그리스 로마 신을 닮았을까? 12가지 유형 중 내 유형은?",
    url: "/tests/olympus",
    type: "website",
    locale: "ko_KR",
    siteName: "마이스윗테스트",
  },
};

export default function OlympusPage() {
  // App 컴포넌트가 자체 스코프 래퍼(.olympus-app)를 직접 렌더하므로
  // 여기서 추가 래퍼가 필요 없다.
  return <OlympusApp />;
}
