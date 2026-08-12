import type { Metadata } from "next";
import ShoppingApp from "@/components/shopping/App";
import "@/components/shopping/shopping.css";

export const metadata: Metadata = {
  title: "나의 쇼핑 스타일 테스트",
  description:
    "품질·트렌드·충동 세 가지 축으로 나의 소비 습관을 살펴보고, 8가지 쇼핑 유형 중 나와 가장 가까운 하나를 알려드려요.",
  alternates: {
    canonical: "/tests/shopping",
  },
  openGraph: {
    title: "나의 쇼핑 스타일 테스트",
    description: "나는 어떻게 물건을 고를까? 8가지 쇼핑 유형 중 내 유형은?",
    url: "/tests/shopping",
    type: "website",
    locale: "ko_KR",
    siteName: "마이스윗테스트",
  },
};

export default function ShoppingPage() {
  // App 컴포넌트가 자체 스코프 래퍼(.shopping-app)를 직접 렌더하므로
  // 여기서 추가 래퍼가 필요 없다.
  return <ShoppingApp />;
}
