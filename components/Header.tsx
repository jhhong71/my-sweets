"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { NAV_LINKS } from "@/lib/data";
import { Button } from "@/components/ui/button";

/** 사이트에서 실제로 진행할 수 있는 대표 테스트. 헤더 CTA가 여기로 연결된다. */
const PRIMARY_TEST_HREF = "/tests/my-sweets";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="마이스윗테스트 홈">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-blossom to-sky text-white shadow-soft">
        <span className="text-[15px] leading-none" aria-hidden="true">
          ◕‿◕
        </span>
      </span>
      <span className="flex flex-col leading-tight">
        <strong className="text-base font-extrabold tracking-tight sm:text-lg">
          마이스윗테스트
        </strong>
        <span className="hidden text-[11px] text-ink-soft sm:block">심리테스트 모음</span>
      </span>
    </Link>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-5">
      <div className="container">
        <div className="glass flex items-center justify-between gap-2 rounded-pill px-3 py-2.5 shadow-soft ring-1 ring-white/60 sm:gap-4 sm:px-4">
          <Logo />

          <nav aria-label="주요 메뉴" className="flex items-center gap-0.5 sm:gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-pill px-2.5 py-2 text-[13px] font-semibold text-ink-soft transition-colors hover:bg-white/70 hover:text-ink sm:px-4 sm:text-sm"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Button href={PRIMARY_TEST_HREF} size="sm" className="shrink-0 px-3.5 sm:px-5">
            <span className="hidden sm:inline">테스트 시작</span>
            <ArrowRight size={17} className="sm:hidden" aria-hidden="true" />
            <span className="sr-only sm:hidden">테스트 시작</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
