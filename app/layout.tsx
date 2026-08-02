import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "테스트모아 | 나를 발견하는 즐거운 심리테스트",
  description:
    "심리테스트·취향테스트·성격 테스트를 한곳에 모은 무료 테스트 플랫폼. 2분이면 끝나는 짧고 재미있는 테스트로 나를 발견하고 친구와 결과를 공유해보세요.",
  keywords: ["테스트모아", "심리테스트", "취향테스트", "성격테스트", "무료 테스트"],
  openGraph: {
    title: "테스트모아 | 나를 발견하는 즐거운 심리테스트",
    description: "짧고 재미있는 무료 심리테스트를 한곳에. 지금 나를 발견해보세요.",
    type: "website",
    locale: "ko_KR",
    siteName: "테스트모아",
  },
};

export const viewport: Viewport = {
  themeColor: "#FFF9F3",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
