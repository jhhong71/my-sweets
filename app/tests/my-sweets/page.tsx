import type { Metadata } from "next";
import Link from "next/link";
import MySweetsApp from "@/components/my-sweets/App";
import "@/components/my-sweets/my-sweets.css";

export const metadata: Metadata = {
  // 부모 layout의 title 템플릿이 뒤에 " | 마이스윗테스트"를 붙인다.
  title: "마이스윗 간식테스트 · 나는 어떤 간식일까?",
  description:
    "15개의 상황형 질문으로 알아보는 나와 닮은 달콤한 간식. 다섯 가지 성향을 바탕으로 5가지 간식과 15가지 맛 중 나만의 결과를 찾아드려요.",
  keywords: ["마이스윗테스트", "마이스윗 간식테스트", "간식 테스트", "성격 테스트", "무료 심리테스트"],
  alternates: {
    canonical: "/tests/my-sweets",
  },
  openGraph: {
    title: "마이스윗 간식테스트 | 나는 어떤 간식일까?",
    description: "평소의 선택과 행동으로 알아보는 나와 닮은 간식. 40가지 결과 중 내 결과는?",
    url: "/tests/my-sweets",
    type: "website",
    locale: "ko_KR",
    siteName: "마이스윗테스트",
  },
};

export default function MySweetsPage() {
  return (
    // 래퍼 클래스가 마이스윗 전용 스타일의 스코프 경계다. 제거하면 스타일이 깨진다.
    <div className="my-sweets-app">
      <Link href="/" className="ms-home-link">
        <span aria-hidden="true">←</span> 마이스윗테스트 홈
      </Link>
      <MySweetsApp />
    </div>
  );
}
