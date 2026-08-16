"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
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

function NavLink({
  link,
  className,
  onNavigate,
}: {
  link: (typeof NAV_LINKS)[number];
  className: string;
  onNavigate?: () => void;
}) {
  const external = "external" in link && link.external;
  const standalone = "standalone" in link && link.standalone;

  // 같은 도메인이지만 Next 라우터 바깥에 있는 정적 앱(예: /ppuri-saju/).
  // <Link>는 클라이언트 이동을 시도해 404가 나므로 일반 <a>로 전체 이동시킨다.
  if (standalone) {
    return (
      <a href={link.href} onClick={onNavigate} className={className}>
        {link.label}
      </a>
    );
  }

  return (
    <Link
      href={link.href}
      onClick={onNavigate}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={className}
    >
      {link.label}
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);

  // 드로어가 열려 있는 동안 배경 스크롤을 막고, Esc로 닫을 수 있게 한다.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-5">
      <div className="container">
        <div className="glass flex items-center justify-between gap-2 rounded-pill px-3 py-2.5 shadow-soft ring-1 ring-white/60 sm:gap-4 sm:px-4">
          <Logo />

          {/* 데스크톱: 기존과 동일하게 가로 메뉴 */}
          <nav aria-label="주요 메뉴" className="hidden items-center gap-0.5 sm:flex sm:gap-1">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.href}
                link={link}
                className="rounded-pill px-2.5 py-2 text-[13px] font-semibold text-ink-soft transition-colors hover:bg-white/70 hover:text-ink sm:px-4 sm:text-sm"
              />
            ))}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <Button href={PRIMARY_TEST_HREF} size="sm" className="shrink-0 px-3.5 sm:px-5">
              <span className="hidden sm:inline">테스트 시작</span>
              <ArrowRight size={17} className="sm:hidden" aria-hidden="true" />
              <span className="sr-only sm:hidden">테스트 시작</span>
            </Button>

            {/* 모바일: 햄버거 버튼 — 누르면 오른쪽에서 메뉴가 슬라이드로 열린다 */}
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="메뉴 열기"
              aria-expanded={open}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-ink-soft transition-colors hover:bg-white/70 hover:text-ink sm:hidden"
            >
              <Menu size={20} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-ink/30 sm:hidden"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="fixed inset-y-0 right-0 z-50 flex w-[78%] max-w-xs flex-col bg-white p-5 shadow-float sm:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="주요 메뉴"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-ink">메뉴</span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="메뉴 닫기"
                  className="grid h-9 w-9 place-items-center rounded-full text-ink-soft transition-colors hover:bg-cream hover:text-ink"
                >
                  <X size={20} aria-hidden="true" />
                </button>
              </div>

              <nav aria-label="주요 메뉴" className="mt-4 flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <NavLink
                    key={link.href}
                    link={link}
                    onNavigate={() => setOpen(false)}
                    className="rounded-2xl px-4 py-3 text-[15px] font-semibold text-ink transition-colors hover:bg-cream"
                  />
                ))}
              </nav>

              <div className="mt-auto pt-6">
                <Button href={PRIMARY_TEST_HREF} className="w-full justify-center">
                  테스트 시작
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
