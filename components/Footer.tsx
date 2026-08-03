import Link from "next/link";
import { Instagram, Youtube } from "lucide-react";
import { INSTAGRAM_URL, YOUTUBE_URL } from "@/lib/social";

export function Footer() {
  return (
    <footer className="mt-10 border-t border-black/[0.05] bg-white/60 pt-16 pb-16">
      <div className="container">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          {/* 브랜드 */}
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-blossom to-sky text-white shadow-soft">
                <span className="text-[15px] leading-none" aria-hidden="true">
                  ◕‿◕
                </span>
              </span>
              <strong className="text-lg font-extrabold tracking-tight">마이스윗테스트</strong>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              짧고 재미있는 심리테스트를 가볍게 즐길 수 있는 공간이에요.
            </p>
            <p className="mt-2 text-xs leading-relaxed text-ink-soft/80">
              테스트 결과는 재미와 자기 탐색을 위한 참고용이며, 전문적인 심리 진단이나
              의학적 소견을 대신하지 않습니다.
            </p>

            <div className="mt-5 flex gap-2">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="인스타그램 방문하기"
                className="inline-flex h-11 items-center gap-2 rounded-full bg-cream px-4 text-sm font-semibold text-ink-soft transition-colors hover:bg-blossom hover:text-white"
              >
                <Instagram size={18} aria-hidden="true" />
                인스타그램
              </a>
              <a
                href={YOUTUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="유튜브 방문하기"
                className="inline-flex h-11 items-center gap-2 rounded-full bg-cream px-4 text-sm font-semibold text-ink-soft transition-colors hover:bg-blossom hover:text-white"
              >
                <Youtube size={18} aria-hidden="true" />
                유튜브
              </a>
            </div>
          </div>

          {/* 링크 */}
          <nav aria-label="바로가기" className="flex gap-3">
            <Link
              href="/about"
              className="text-sm font-semibold text-ink-soft transition-colors hover:text-blossom-deep"
            >
              소개
            </Link>
            <span className="text-ink-soft/30" aria-hidden="true">
              ·
            </span>
            <Link
              href="/privacy"
              className="text-sm font-semibold text-ink-soft transition-colors hover:text-blossom-deep"
            >
              개인정보처리방침
            </Link>
          </nav>
        </div>

        <div className="mt-12 border-t border-black/[0.05] pt-6 text-center text-xs text-ink-soft">
          © {new Date().getFullYear()} 마이스윗테스트 · MySweets Test. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
