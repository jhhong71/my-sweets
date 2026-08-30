import type { Metadata } from "next";
import HarryPotterApp from "@/components/harry-potter/App";
import "@/components/harry-potter/harry-potter.css";

export const metadata: Metadata = {
  title: "해리포터 캐릭터 테스트",
  description:
    "12문항으로 행동 방식·마음가짐·무리 속 위치 세 축을 계산해 해리포터 캐릭터 8명 중 나와 가장 닮은 한 명과 궁합이 맞는 캐릭터를 알려드려요.",
  alternates: {
    canonical: "/tests/harry-potter",
  },
  openGraph: {
    title: "해리포터 캐릭터 테스트",
    description: "나는 해리포터 캐릭터 중 누구를 닮았을까? 8명 중 내 캐릭터는?",
    url: "/tests/harry-potter",
    type: "website",
    locale: "ko_KR",
    siteName: "마이스윗테스트",
  },
};

export default function HarryPotterPage() {
  // App 컴포넌트가 자체 스코프 래퍼(.harry-potter-app)를 직접 렌더하므로
  // 여기서 추가 래퍼가 필요 없다.
  return <HarryPotterApp />;
}
