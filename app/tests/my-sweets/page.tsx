import type { Metadata } from "next";
import Link from "next/link";
import MySweetsApp from "@/components/my-sweets/App";
import "@/components/my-sweets/my-sweets.css";

export const metadata: Metadata = {
  title: "마이스윗 간식테스트 | 나는 어떤 간식일까? · 테스트모아",
  description:
    "15개의 상황형 질문으로 알아보는 나와 닮은 달콤한 간식. 다섯 가지 성향을 바탕으로 5가지 간식과 15가지 맛 중 나만의 결과를 찾아드려요.",
  openGraph: {
    title: "마이스윗 간식테스트 | 나는 어떤 간식일까?",
    description: "평소의 선택과 행동으로 알아보는 나와 닮은 간식. 40가지 결과 중 내 결과는?",
    type: "website",
    locale: "ko_KR",
    siteName: "테스트모아",
  },
};

export default function MySweetsPage() {
  return (
    // 래퍼 클래스가 마이스윗 전용 스타일의 스코프 경계다. 제거하면 스타일이 깨진다.
    <div className="my-sweets-app">
      <Link href="/" className="ms-home-link">
        <span aria-hidden="true">←</span> 테스트모아 홈
      </Link>
      <MySweetsApp />
    </div>
  );
}
