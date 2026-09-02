import type { Metadata } from "next";
import AttachmentStyleApp from "@/components/attachment-style/App";
import "@/components/attachment-style/attachment-style.css";

export const metadata: Metadata = {
  title: "나의 연애 애착 유형은?",
  description:
    "12문항으로 밀착도·표현도·안정도 세 가지 연애 성향 축을 계산해 8가지 애착 유형 중 나와 가장 가까운 하나와 궁합이 맞는 유형을 알려드려요.",
  alternates: {
    canonical: "/tests/attachment-style",
  },
  openGraph: {
    title: "나의 연애 애착 유형은?",
    description: "나는 연애할 때 어떤 사람일까? 8가지 애착 유형 중 나와 꼭 닮은 유형은?",
    url: "/tests/attachment-style",
    type: "website",
    locale: "ko_KR",
    siteName: "마이스윗테스트",
  },
};

export default function AttachmentStylePage() {
  // App 컴포넌트가 자체 스코프 래퍼(.attachment-style-app)를 직접 렌더하므로
  // 여기서 추가 래퍼가 필요 없다.
  return <AttachmentStyleApp />;
}
