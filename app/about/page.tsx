import type { Metadata } from "next";
import Link from "next/link";
import { Instagram, Youtube, ArrowRight } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { INSTAGRAM_URL, INSTAGRAM_HANDLE, YOUTUBE_URL, YOUTUBE_HANDLE } from "@/lib/social";

const TITLE = "하루를 가만히 소개 | 재미있는 심리테스트";
const DESCRIPTION =
  "하루를 가만히는 가볍게 즐기는 심리테스트와 일상 콘텐츠를 제공하는 공간입니다.";

export const metadata: Metadata = {
  // absolute로 지정해 루트 layout의 title 템플릿(" | 마이스윗테스트")이
  // 중복으로 덧붙지 않게 한다 — 사용자가 지정한 문구를 그대로 노출한다.
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/about",
    type: "website",
    locale: "ko_KR",
    siteName: "마이스윗테스트",
    images: [{ url: "/icon-512.png", width: 512, height: 512, alt: "마이스윗테스트" }],
  },
};

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="container py-16 md:py-24">
          <div className="mx-auto max-w-xl text-center">
            <span className="text-4xl" aria-hidden="true">
              🌷
            </span>
            <h1 className="mt-4 text-balance text-[clamp(1.8rem,5vw,2.6rem)] font-extrabold leading-tight tracking-tight">
              하루를 가만히 소개합니다
            </h1>

            <p className="mt-6 text-[15px] leading-relaxed text-ink-soft md:text-base">
              하루를 가만히는 일상 속에서 가볍게 즐길 수 있는 심리테스트와 재미있는
              콘텐츠를 만드는 공간이에요. 짧은 질문에 답하며 나의 취향과 성향을
              발견하고, 결과를 친구들과 함께 나눠보세요.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-soft md:text-base">
              마이스윗테스트는 그 첫 번째 결과물이에요. 앞으로도 새로운 테스트와
              일상에 작은 재미를 더하는 콘텐츠를 차근차근 소개할게요.
            </p>

            <div className="mt-8 rounded-card bg-lavender/40 p-5 text-left text-sm leading-relaxed text-ink-soft ring-1 ring-black/[0.03]">
              사이트에서 제공하는 테스트 결과는 재미와 자기 탐색을 위한
              참고용이며, 전문적인 심리검사나 의학적 진단을 대신하지 않습니다.
            </div>

            {/* SNS */}
            <div className="mt-10">
              <p className="text-sm text-ink-soft">
                새로운 콘텐츠 소식은 SNS에서도 확인할 수 있어요.
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-3">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="인스타그램 방문하기"
                  className="inline-flex h-11 items-center gap-2 rounded-pill bg-white px-4 text-sm font-semibold text-ink shadow-soft ring-1 ring-black/[0.04] transition-colors hover:text-blossom-deep"
                >
                  <Instagram size={18} aria-hidden="true" />
                  {INSTAGRAM_HANDLE}
                </a>
                <a
                  href={YOUTUBE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="유튜브 방문하기"
                  className="inline-flex h-11 items-center gap-2 rounded-pill bg-white px-4 text-sm font-semibold text-ink shadow-soft ring-1 ring-black/[0.04] transition-colors hover:text-blossom-deep"
                >
                  <Youtube size={18} aria-hidden="true" />
                  {YOUTUBE_HANDLE}
                </a>
              </div>
            </div>

            {/* 이동 버튼 */}
            <div className="mt-12 flex flex-wrap justify-center gap-3">
              <Button href="/tests/my-sweets" size="lg">
                테스트 보러가기 <ArrowRight size={18} />
              </Button>
              <Link
                href="/"
                className="inline-flex h-14 items-center rounded-pill bg-white px-8 text-base font-semibold text-ink shadow-soft ring-1 ring-black/[0.04] transition-colors hover:text-blossom-deep"
              >
                메인으로
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
