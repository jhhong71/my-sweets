import type { Metadata } from "next";
import PlantParentApp from "@/components/plant-parent/App";
import "@/components/plant-parent/plant-parent.css";

export const metadata: Metadata = {
  title: "내 반려식물 집사 유형은?",
  description:
    "12문항으로 관리 루틴·관찰 밀도·새로움 추구 세 가지 반려식물 돌봄 축을 계산해 8가지 집사 유형 중 나와 가장 가까운 하나와 두 번째로 가까운 유형을 알려드려요.",
  // 실제 결과 축(lib/axis.ts의 AXIS_LABELS/POLE_LABELS)에 쓰이는 표현만 넣는다.
  keywords: [
    "반려식물 집사 유형 테스트",
    "식물 집사 테스트",
    "루틴형 즉흥형",
    "밀착형 여유형",
    "탐험형 안정형",
    "반려식물 테스트",
    "화분 테스트",
    "마이스윗테스트",
  ],
  alternates: {
    canonical: "/tests/plant-parent",
  },
  openGraph: {
    title: "내 반려식물 집사 유형은?",
    description: "나는 식물을 어떻게 돌보고 있을까? 8가지 집사 유형 중 나와 꼭 닮은 유형은?",
    url: "/tests/plant-parent",
    type: "website",
    locale: "ko_KR",
    siteName: "마이스윗테스트",
  },
};

export default function PlantParentPage() {
  // App 컴포넌트가 자체 스코프 래퍼(.plant-parent-app)를 직접 렌더하므로
  // 여기서 추가 래퍼가 필요 없다.
  return <PlantParentApp />;
}
