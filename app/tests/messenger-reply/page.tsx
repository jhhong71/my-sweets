import type { Metadata } from "next";
import MessengerReplyApp from "@/components/messenger-reply/App";
import "@/components/messenger-reply/messenger-reply.css";

export const metadata: Metadata = {
  title: "나는 어떤 답장 스타일? · 메신저 답장 테스트",
  description:
    "12문항 2지선다로 응답 속도·표현 밀도·대화 주도성을 계산해 8가지 답장 유형 중 나와 가장 가까운 하나를 알려드려요.",
  alternates: {
    canonical: "/tests/messenger-reply",
  },
  openGraph: {
    title: "나는 어떤 답장 스타일? · 메신저 답장 테스트",
    description: "응답 속도·표현 밀도·대화 주도성으로 알아보는 나의 답장 스타일. 8가지 결과 중 내 유형은?",
    url: "/tests/messenger-reply",
    type: "website",
    locale: "ko_KR",
    siteName: "마이스윗테스트",
  },
};

export default function MessengerReplyPage() {
  // App 컴포넌트가 자체 스코프 래퍼(.messenger-reply-app)를 직접 렌더하므로
  // 여기서 추가 래퍼가 필요 없다.
  return <MessengerReplyApp />;
}
