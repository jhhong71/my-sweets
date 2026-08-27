import type { Metadata } from "next";
import MorningPrepApp from "@/components/morning-prep/App";
import "@/components/morning-prep/morning-prep.css";

export const metadata: Metadata = {
  title: "출근 준비 스타일 테스트",
  description:
    "12문항으로 준비 리듬·정보 습관·컨디션 대응 세 축을 계산해 8가지 아침 유형 중 나와 가장 가까운 하나와 궁합이 맞는 유형을 알려드려요.",
  alternates: {
    canonical: "/tests/morning-prep",
  },
  openGraph: {
    title: "출근 준비 스타일 테스트",
    description: "나는 아침에 어떤 사람일까? 8가지 유형 중 내 유형과 나와 잘 맞는 유형은?",
    url: "/tests/morning-prep",
    type: "website",
    locale: "ko_KR",
    siteName: "마이스윗테스트",
  },
};

export default function MorningPrepPage() {
  // App 컴포넌트가 자체 스코프 래퍼(.morning-prep-app)를 직접 렌더하므로
  // 여기서 추가 래퍼가 필요 없다.
  return <MorningPrepApp />;
}
