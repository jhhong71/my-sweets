import type { Metadata } from "next";
import MagicSchoolApp from "@/components/magic-school/App";
import "@/components/magic-school/magic-school.css";

export const metadata: Metadata = {
  title: "마법 학교 캐릭터 테스트",
  description:
    "12문항으로 행동 방식·마음가짐·무리 속 위치 세 축을 계산해 마법 학교 캐릭터 8명 중 나와 가장 닮은 한 명과 궁합이 맞는 캐릭터를 알려드려요.",
  alternates: {
    canonical: "/tests/magic-school",
  },
  openGraph: {
    title: "마법 학교 캐릭터 테스트",
    description: "나는 어떤 마법 학교 캐릭터를 닮았을까? 8명 중 내 캐릭터는?",
    url: "/tests/magic-school",
    type: "website",
    locale: "ko_KR",
    siteName: "마이스윗테스트",
  },
};

export default function MagicSchoolPage() {
  // App 컴포넌트가 자체 스코프 래퍼(.magic-school-app)를 직접 렌더하므로
  // 여기서 추가 래퍼가 필요 없다.
  return <MagicSchoolApp />;
}
