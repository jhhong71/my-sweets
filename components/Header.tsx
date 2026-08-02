"use client";

import Link from "next/link";
import { Search, Heart, Home, Sparkles, LayoutGrid, User } from "lucide-react";
import { NAV_LINKS } from "@/lib/data";
import { Button } from "@/components/ui/button";

const MOBILE_TABS = [
  { label: "홈", href: "#top", Icon: Home },
  { label: "인기", href: "#popular", Icon: Sparkles },
  { label: "카테고리", href: "#categories", Icon: LayoutGrid },
  { label: "마이", href: "#features", Icon: User },
];

function Logo() {
  return (
    <Link href="#top" className="flex items-center gap-2.5" aria-label="마이스윗테스트 홈">
      <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-blossom to-sky text-white shadow-soft">
        <span className="text-[15px] leading-none" aria-hidden="true">
          ◕‿◕
        </span>
      </span>
      <span className="flex flex-col leading-tight">
        <strong className="text-lg font-extrabold tracking-tight">마이스윗테스트</strong>
        <span className="text-[11px] text-ink-soft">심리테스트 모음</span>
      </span>
    </Link>
  );
}

export function Header() {
  return (
    <>
      {/* 데스크톱/태블릿 상단 스티키 헤더 */}
      <header className="sticky top-0 z-50 px-5 pt-4">
        <div className="container">
          <div className="glass flex items-center justify-between gap-4 rounded-pill px-4 py-2.5 shadow-soft ring-1 ring-white/60">
            <Logo />

            <nav aria-label="주요 메뉴" className="hidden items-center gap-1 md:flex">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-pill px-4 py-2 text-sm font-semibold text-ink-soft transition-colors hover:bg-white/70 hover:text-ink"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                aria-label="검색"
                className="grid h-10 w-10 place-items-center rounded-full text-ink-soft transition-colors hover:bg-white/70 hover:text-blossom-deep"
              >
                <Search size={19} />
              </button>
              <button
                type="button"
                aria-label="찜한 테스트"
                className="hidden h-10 w-10 place-items-center rounded-full text-ink-soft transition-colors hover:bg-white/70 hover:text-blossom-deep sm:grid"
              >
                <Heart size={19} />
              </button>
              <Button href="#popular" size="sm" className="hidden sm:inline-flex">
                테스트 시작
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* 모바일 하단 스티키 내비게이션 */}
      <nav
        aria-label="모바일 메뉴"
        className="glass fixed inset-x-4 bottom-4 z-50 flex items-center justify-around rounded-pill px-2 py-2 shadow-float ring-1 ring-white/60 md:hidden"
      >
        {MOBILE_TABS.map(({ label, href, Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex flex-1 flex-col items-center gap-0.5 rounded-2xl px-2 py-1.5 text-[11px] font-semibold text-ink-soft transition-colors hover:text-blossom-deep"
          >
            <Icon size={20} />
            {label}
          </Link>
        ))}
      </nav>
    </>
  );
}
