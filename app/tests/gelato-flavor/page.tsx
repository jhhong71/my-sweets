import type { Metadata } from "next";
import GelatoFlavorApp from "@/components/gelato-flavor/App";
import "@/components/gelato-flavor/gelato-flavor.css";

export const metadata: Metadata = {
  title: "젤라또 맛 성격 테스트",
  description:
    "12문항으로 맛의 진하기·기분의 발랄함·취향의 개성 세 축을 계산해 8가지 젤라또 맛 중 나와 가장 닮은 하나와 궁합이 맞는 맛을 알려드려요.",
  alternates: {
    canonical: "/tests/gelato-flavor",
  },
  openGraph: {
    title: "젤라또 맛 성격 테스트",
    description: "나는 무슨 맛 젤라또일까? 8가지 맛 중 나와 꼭 닮은 한 스쿱은?",
    url: "/tests/gelato-flavor",
    type: "website",
    locale: "ko_KR",
    siteName: "마이스윗테스트",
  },
};

export default function GelatoFlavorPage() {
  // App 컴포넌트가 자체 스코프 래퍼(.gelato-flavor-app)를 직접 렌더하므로
  // 여기서 추가 래퍼가 필요 없다.
  return <GelatoFlavorApp />;
}
