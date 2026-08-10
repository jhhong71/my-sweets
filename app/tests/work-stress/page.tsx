import type { Metadata } from "next";
import WorkStressApp from "@/components/work-stress/App";
import "@/components/work-stress/work-stress.css";

export const metadata: Metadata = {
  title: "업무 스트레스 대처 유형 테스트",
  description:
    "16문항으로 문제중심·감정중심, 접근·거리두기 두 가지 대처 축을 계산해 5가지 스트레스 대처 유형 중 나와 가장 가까운 하나를 알려드려요.",
  alternates: {
    canonical: "/tests/work-stress",
  },
  openGraph: {
    title: "업무 스트레스 대처 유형 테스트",
    description: "회사에서 스트레스를 받을 때 나는 어떻게 대처할까? 5가지 결과 중 내 유형은?",
    url: "/tests/work-stress",
    type: "website",
    locale: "ko_KR",
    siteName: "마이스윗테스트",
  },
};

export default function WorkStressPage() {
  // App 컴포넌트가 자체 스코프 래퍼(.work-stress-app)를 직접 렌더하므로
  // 여기서 추가 래퍼가 필요 없다.
  return <WorkStressApp />;
}
