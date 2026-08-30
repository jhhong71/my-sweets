"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Users } from "lucide-react";
import { POPULAR_TESTS, type Test } from "@/lib/data";
import { TestThumbnail } from "@/components/TestThumbnail";
import { Badge } from "@/components/ui/badge";
import { useParticipantCount, useHotTestId } from "@/lib/participants";
import { formatCount } from "@/lib/utils";

/** 최근 추가된 순서 그대로, 마지막 5개만 자동 순환한다. */
const SLIDES = POPULAR_TESTS.slice(-5);
const INTERVAL_MS = 4000;

/**
 * 히어로 오른쪽의 정적 일러스트 대신, 최근 테스트 5개를 카드 그대로
 * 자동 순환해 보여준다. 일정 시간마다 넘어가고, 점을 눌러 바로 이동할 수
 * 있으며, 마우스를 올리면 잠시 멈춘다.
 */
export function HeroTestSlideshow() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, [paused]);

  const test = SLIDES[index];

  return (
    <div
      className="relative mx-auto w-full max-w-[380px] md:max-w-[460px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        aria-hidden="true"
        className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-lavender/70 via-white/40 to-mint/70 blur-2xl"
      />

      <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-white shadow-card ring-8 ring-white/70">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={test.id}
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -28 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <SlideCard test={test} />
          </motion.div>
        </AnimatePresence>

        {/* 점 인디케이터 */}
        <div className="absolute inset-x-0 bottom-4 z-10 flex justify-center gap-1.5">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`${s.title} 보기`}
              aria-current={i === index}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-5 bg-white" : "w-1.5 bg-white/50 hover:bg-white/75"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function SlideCard({ test }: { test: Test }) {
  const participants = useParticipantCount(test.id);
  // HOT은 TestCard와 같은 방식으로 실제 참여수 1위에게만 실시간으로 붙인다.
  const isHot = useHotTestId() === test.id;
  const badge = test.badge === "NEW" ? "NEW" : isHot ? "HOT" : null;

  return (
    <Link href={test.href} className="group relative block h-full w-full">
      <div className="absolute inset-0" style={{ background: test.gradient }} />
      <div className="absolute inset-0 bg-[radial-gradient(70%_55%_at_28%_22%,rgba(255,255,255,0.75),transparent_60%)]" />
      <div className="absolute inset-0 grid place-items-center pb-16">
        <div className="transition-transform duration-500 ease-out group-hover:scale-110">
          <TestThumbnail test={test} />
        </div>
      </div>

      {badge && (
        <div className="absolute left-4 top-4">
          <Badge variant={badge === "HOT" ? "hot" : "new"}>{badge}</Badge>
        </div>
      )}

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent px-5 pb-11 pt-16 text-white">
        <span className="text-xs font-bold text-white/85">{test.category}</span>
        <h3 className="mt-1 flex items-center gap-1.5 text-[17px] font-bold leading-snug tracking-tight">
          {test.title}
          <ArrowRight size={16} className="shrink-0 opacity-90" aria-hidden="true" />
        </h3>
        {participants !== null && (
          <span className="mt-1 inline-flex items-center gap-1 text-[11px] font-medium text-white/75">
            <Users size={12} aria-hidden="true" />
            {formatCount(participants)}명 참여
          </span>
        )}
      </div>
    </Link>
  );
}
