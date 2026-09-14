import type { Metadata } from "next";
import BreathingSwordsmanApp from "@/components/breathing-swordsman/App";
import "@/components/breathing-swordsman/breathing-swordsman.css";

export const metadata: Metadata = {
  title: "물·불꽃·번개… 나는 어떤 호흡의 검사일까?",
  description:
    "12문항으로 행동 속도·판단 기준·감정 표현 세 축을 계산해 타니·네코·젠이·이노 등 8명의 검사 친구 중 나와 가장 닮은 캐릭터와 잘 맞는 캐릭터를 알려드려요.",
  // 실제 결과 축(lib/axis.ts의 POLE_LABELS)과 결과 캐릭터 이름만 넣는다.
  keywords: [
    "호흡의 검사 테스트",
    "검사 캐릭터 테스트",
    "돌진형 신중형",
    "마음형 원칙형",
    "표현형 담담형",
    "캐릭터 성향 테스트",
    "마이스윗테스트",
  ],
  alternates: {
    canonical: "/tests/breathing-swordsman",
  },
  openGraph: {
    title: "물·불꽃·번개… 나는 어떤 호흡의 검사일까?",
    description: "8명의 검사 친구 중 나와 가장 닮은 캐릭터는?",
    url: "/tests/breathing-swordsman",
    type: "website",
    locale: "ko_KR",
    siteName: "마이스윗테스트",
  },
};

export default function BreathingSwordsmanPage() {
  // App 컴포넌트가 자체 스코프 래퍼(.breathing-swordsman-app)를 직접 렌더하므로
  // 여기서 추가 래퍼가 필요 없다.
  return <BreathingSwordsmanApp />;
}
