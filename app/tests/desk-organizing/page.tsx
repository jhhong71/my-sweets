import type { Metadata } from "next";
import DeskOrganizingApp from "@/components/desk-organizing/App";
import "@/components/desk-organizing/desk-organizing.css";

export const metadata: Metadata = {
  title: "나는 어떤 정리 유형? · 책상 정리 습관 테스트",
  description:
    "12문항 2지선다로 정리 방식·보관 성향·정리 리듬을 계산해 8가지 정리 유형 중 나와 가장 가까운 하나를 알려드려요.",
  alternates: {
    canonical: "/tests/desk-organizing",
  },
  openGraph: {
    title: "나는 어떤 정리 유형? · 책상 정리 습관 테스트",
    description: "정리 방식·보관 성향·정리 리듬으로 알아보는 나의 정리 유형. 8가지 결과 중 내 유형은?",
    url: "/tests/desk-organizing",
    type: "website",
    locale: "ko_KR",
    siteName: "마이스윗테스트",
  },
};

export default function DeskOrganizingPage() {
  // App 컴포넌트가 자체 스코프 래퍼(.desk-organizing-app, data-screen 포함)를
  // 직접 렌더하므로 여기서 추가 래퍼가 필요 없다.
  return <DeskOrganizingApp />;
}
