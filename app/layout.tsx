import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE_NAME = "마이스윗테스트";
const SITE_URL = "https://my-sweets.pages.dev";
const DESCRIPTION =
  "마이스윗테스트는 심리테스트·취향테스트를 가볍게 즐길 수 있는 무료 테스트 사이트예요. 약 2~3분이면 끝나는 짧고 재미있는 테스트로 나를 발견하고 친구와 결과를 공유해보세요.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | 나를 발견하는 즐거운 심리테스트`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  keywords: [
    "마이스윗테스트",
    "마이스윗",
    "심리테스트",
    "취향테스트",
    "성격테스트",
    "무료 심리테스트",
    "재미있는 테스트",
    "심리테스트 모음",
    "간식 테스트",
  ],
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  appleWebApp: {
    title: SITE_NAME,
    capable: true,
    statusBarStyle: "default",
  },
  openGraph: {
    title: `${SITE_NAME} | 나를 발견하는 즐거운 심리테스트`,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "ko_KR",
    images: [{ url: "/icon-512.png", width: 512, height: 512, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | 나를 발견하는 즐거운 심리테스트`,
    description: "짧고 재미있는 무료 심리테스트를 한곳에. 지금 나를 발견해보세요.",
    images: ["/icon-512.png"],
  },
  category: "entertainment",
};

export const viewport: Viewport = {
  themeColor: "#FFF9F3",
  width: "device-width",
  initialScale: 1,
};

/** 검색엔진이 브랜드 "마이스윗테스트"를 사이트 이름으로 인식하도록 하는 구조화 데이터. */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      alternateName: ["마이스윗", "마이스윗 테스트", "MySweets Test"],
      url: `${SITE_URL}/`,
      inLanguage: "ko-KR",
      description: DESCRIPTION,
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/icon-512.png`,
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <head>
        {/*
          Google AdSense 사이트 소유권 확인용 공통 스크립트.
          루트 레이아�트에 한 번만 두면 모든 페이지(/, /tests/my-sweets)에 자동 포함되고,
          같은 레이아웃을 공유하는 클라이언트 사이드 화면 전환에서는 <head>가 다시
          마운트되지 않으므로 중복 삽입되지 않는다. 광고 단위(<ins class="adsbygoogle">)는
          별도 요청 전까지 추가하지 않는다.
        */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4555871833876865"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
