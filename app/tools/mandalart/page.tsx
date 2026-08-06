import type { Metadata } from "next";
import MandalartApp from "@/components/mandalart/App";
import "@/components/mandalart/mandalart.css";

export const metadata: Metadata = {
  title: "말랑 만다라트 · 목표를 81칸으로 펼쳐보기",
  description:
    "핵심 목표 1개를 세부 목표 8개, 실천 과제 64개로 펼치는 만다라트 작성 도구예요. 작성한 내용은 이 브라우저에만 저장돼요.",
  alternates: {
    canonical: "/tools/mandalart",
  },
  openGraph: {
    title: "말랑 만다라트 · 목표를 81칸으로 펼쳐보기",
    description: "핵심 목표 1개 → 세부 목표 8개 → 실천 과제 64개로 펼치는 파스텔 핑크 만다라트 작성 도구.",
    url: "/tools/mandalart",
    type: "website",
    locale: "ko_KR",
    siteName: "마이스윗테스트",
  },
};

export default function MandalartPage() {
  return (
    <>
      {/*
        손글씨 감성 폰트. React 19가 <head>로 자동 호이스팅하며, 이 페이지가
        렌더될 때만 로드된다(원본 앱의 index.html 폰트 링크를 그대로 이식).
      */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Gaegu:wght@400;700&family=Gowun+Dodum&display=swap"
      />
      {/* App 컴포넌트가 자체 스코프 래퍼(.mandalart-app)를 직접 렌더하므로
          여기서 추가 래퍼가 필요 없다. */}
      <MandalartApp />
    </>
  );
}
