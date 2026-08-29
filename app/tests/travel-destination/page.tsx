import type { Metadata } from "next";
import TravelDestinationApp from "@/components/travel-destination/App";
import "@/components/travel-destination/travel-destination.css";

export const metadata: Metadata = {
  title: "여행지 매칭 테스트",
  description:
    "12문항으로 동선 강도·선호 풍경·여행 방식 세 축을 계산해 8곳의 여행지 중 나와 가장 잘 어울리는 곳과 궁합이 맞는 여행 메이트 유형을 알려드려요.",
  alternates: {
    canonical: "/tests/travel-destination",
  },
  openGraph: {
    title: "여행지 매칭 테스트",
    description: "나는 어떤 여행지와 잘 어울릴까? 8곳 중 나와 가장 잘 맞는 곳은?",
    url: "/tests/travel-destination",
    type: "website",
    locale: "ko_KR",
    siteName: "마이스윗테스트",
  },
};

export default function TravelDestinationPage() {
  // App 컴포넌트가 자체 스코프 래퍼(.travel-destination-app)를 직접 렌더하므로
  // 여기서 추가 래퍼가 필요 없다.
  return <TravelDestinationApp />;
}
