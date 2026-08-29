import type { Metadata } from "next";
import LunchBreakApp from "@/components/lunch-break/App";
import "@/components/lunch-break/lunch-break.css";

export const metadata: Metadata = {
  title: "점심시간 활용 스타일 테스트",
  description:
    "12문항으로 결정 방식·동행 방식·시간 활용 세 축을 계산해 8가지 점심시간 유형 중 나와 가장 가까운 하나와 궁합이 맞는 유형을 알려드려요.",
  alternates: {
    canonical: "/tests/lunch-break",
  },
  openGraph: {
    title: "점심시간 활용 스타일 테스트",
    description: "나는 점심시간을 어떻게 보낼까? 8가지 유형 중 내 유형과 나와 잘 맞는 유형은?",
    url: "/tests/lunch-break",
    type: "website",
    locale: "ko_KR",
    siteName: "마이스윗테스트",
  },
};

export default function LunchBreakPage() {
  // App 컴포넌트가 자체 스코프 래퍼(.lunch-break-app)를 직접 렌더하므로
  // 여기서 추가 래퍼가 필요 없다.
  return <LunchBreakApp />;
}
