import type { Metadata } from "next";
import CoffeeTypeApp from "@/components/coffee-type/App";
import "@/components/coffee-type/coffee-type.css";

export const metadata: Metadata = {
  title: "나는 어떤 커피 종류에 가까울까?",
  description:
    "12문항으로 커피의 진하기·단맛 취향·움직이는 템포 세 가지 축을 계산해 8가지 커피 중 나와 가장 가까운 하나와 잘 어울리는 커피 짝꿍을 알려드려요.",
  keywords: ["커피유형테스트", "커피 테스트", "진한형", "부드러운형", "달콤형", "담백형", "빠른형", "여유형"],
  alternates: {
    canonical: "/tests/coffee-type",
  },
  openGraph: {
    title: "나는 어떤 커피 종류에 가까울까?",
    description: "나와 닮은 커피 한 잔은? 8가지 커피 중 나와 가장 가까운 하나는?",
    url: "/tests/coffee-type",
    type: "website",
    locale: "ko_KR",
    siteName: "마이스윗테스트",
  },
};

export default function CoffeeTypePage() {
  // App 컴포넌트가 자체 스코프 래퍼(.coffee-type-app)를 직접 렌더하므로
  // 여기서 추가 래퍼가 필요 없다.
  return <CoffeeTypeApp />;
}
