import type { Metadata } from "next";
import MoneyHabitApp from "@/components/money-habit/App";
import "@/components/money-habit/money-habit.css";

export const metadata: Metadata = {
  title: "나의 머니 습관 유형 테스트",
  description:
    "현금흐름을 계획적으로 관리하는지, 저축과 현재 소비 중 무엇을 우선하는지, 카드를 어떻게 쓰는지로 알아보는 8가지 머니 습관 유형.",
  alternates: {
    canonical: "/tests/money-habit",
  },
  openGraph: {
    title: "나의 머니 습관 유형 테스트",
    description: "나는 돈을 어떻게 쓰고 모을까? 8가지 머니 습관 유형 중 내 유형은?",
    url: "/tests/money-habit",
    type: "website",
    locale: "ko_KR",
    siteName: "마이스윗테스트",
  },
};

export default function MoneyHabitPage() {
  // App 컴포넌트가 자체 스코프 래퍼(.money-habit-app)를 직접 렌더하므로
  // 여기서 추가 래퍼가 필요 없다.
  return <MoneyHabitApp />;
}
