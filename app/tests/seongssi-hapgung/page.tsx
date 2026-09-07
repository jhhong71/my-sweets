import type { Metadata } from "next";
import SeongssiHapgungApp from "@/components/seongssi-hapgung/App";
import "@/components/seongssi-hapgung/seongssi-hapgung.css";

export const metadata: Metadata = {
  title: "우리 성씨 궁합은?",
  description:
    "성씨궁합테스트 · 나와 상대방의 성씨·본관만 골라도 궁합 지수와 텐션·케미·분위기 세 가지 기운으로 8가지 케미 유형 중 우리 사이와 가장 가까운 하나를 알려드려요.",
  keywords: [
    "성씨궁합테스트",
    "성씨본관궁합테스트",
    "본관궁합테스트",
    "성씨 궁합",
    "본관 궁합",
    "궁합 테스트",
    "우리 성씨 궁합",
  ],
  alternates: {
    canonical: "/tests/seongssi-hapgung",
  },
  openGraph: {
    title: "우리 성씨 궁합은?",
    description: "성씨와 본관만 고르면 끝! 우리 사이의 궁합 지수와 케미 유형을 확인해보세요.",
    url: "/tests/seongssi-hapgung",
    type: "website",
    locale: "ko_KR",
    siteName: "마이스윗테스트",
  },
};

export default function SeongssiHapgungPage() {
  // App 컴포넌트가 자체 스코프 래퍼(.seongssi-hapgung-app)를 직접 렌더하므로
  // 여기서 추가 래퍼가 필요 없다.
  return <SeongssiHapgungApp />;
}
