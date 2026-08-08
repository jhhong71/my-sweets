import type { Metadata } from "next";
import WorkLearningApp from "@/components/work-learning/App";
import "@/components/work-learning/work-learning.css";

export const metadata: Metadata = {
  title: "나의 업무 학습 스타일 테스트",
  description:
    "16문항으로 정보를 받아들이는 방식과 처리하는 방식을 계산해 5가지 학습 스타일 중 나와 가장 가까운 하나를 알려드려요.",
  alternates: {
    canonical: "/tests/work-learning",
  },
  openGraph: {
    title: "나의 업무 학습 스타일 테스트",
    description: "정보를 받아들이고 처리하는 방식으로 알아보는 나의 학습 스타일. 5가지 결과 중 내 유형은?",
    url: "/tests/work-learning",
    type: "website",
    locale: "ko_KR",
    siteName: "마이스윗테스트",
  },
};

export default function WorkLearningPage() {
  // App 컴포넌트가 자체 스코프 래퍼(.work-learning-app)를 직접 렌더하므로
  // 여기서 추가 래퍼가 필요 없다.
  return <WorkLearningApp />;
}
