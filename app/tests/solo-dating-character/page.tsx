import type { Metadata } from "next";
import SoloDatingCharacterApp from "@/components/solo-dating-character/App";
import "@/components/solo-dating-character/solo-dating-character.css";

export const metadata: Metadata = {
  title: "나는 어떤 솔로 캐릭터일까?",
  description:
    "12문항으로 감정 속도·표현 방식·선택 기준 세 가지 축을 계산해 6명의 캐릭터 중 나와 가장 가까운 이름표와 잘 맞는 상대 캐릭터를 알려드려요.",
  keywords: [
    "솔로캐릭터테스트",
    "연애유형테스트",
    "직진형",
    "신중형",
    "주목형",
    "은은형",
    "현실형",
    "감정형",
  ],
  alternates: {
    canonical: "/tests/solo-dating-character",
  },
  openGraph: {
    title: "나는 어떤 솔로 캐릭터일까?",
    description: "나의 연애 캐릭터는? 6명의 캐릭터 중 나와 꼭 닮은 이름표와 잘 맞는 상대는?",
    url: "/tests/solo-dating-character",
    type: "website",
    locale: "ko_KR",
    siteName: "마이스윗테스트",
  },
};

export default function SoloDatingCharacterPage() {
  // App 컴포넌트가 자체 스코프 래퍼(.solo-dating-character-app)를 직접
  // 렌더하므로 여기서 추가 래퍼가 필요 없다.
  return <SoloDatingCharacterApp />;
}
