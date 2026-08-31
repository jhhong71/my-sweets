"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroTestSlideshow } from "@/components/HeroTestSlideshow";
import { FloatingDecorations } from "@/components/FloatingDecorations";
import { useTotalParticipants } from "@/lib/participants";
import { formatCount } from "@/lib/utils";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

/** 히어로 하단을 구름처럼 마감해 다음 섹션과 자연스럽게 이어지게 하는 장식. */
function ScallopedEdge() {
  return (
    <svg
      className="pointer-events-none absolute inset-x-0 -bottom-px w-full"
      viewBox="0 0 1440 60"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0 34c60-22 120-22 180 0s120 22 180 0 120-22 180 0 120 22 180 0 120-22 180 0 120 22 180 0 120-22 180 0 120 22 180 0v26H0Z"
        fill="#FFF9F3"
      />
    </svg>
  );
}

export function Hero() {
  // 실제 집계된 총 참여수. 집계가 없으면 문구 자체를 숨긴다.
  const totalParticipants = useTotalParticipants();

  return (
    <section id="top" className="relative overflow-hidden">
      {/* 부드러운 파스텔 배경 패널 */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(160deg,#FFF1F5_0%,#FFF6F0_46%,#FDF4E8_100%)]"
      />
      <FloatingDecorations />

      <div className="container relative grid items-center gap-10 pb-24 pt-12 md:grid-cols-2 md:gap-6 md:pb-32 md:pt-20">
        {/* 왼쪽: 카피 + CTA */}
        <motion.div variants={container} initial="hidden" animate="show" className="relative z-10">
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-pill bg-white/80 px-4 py-2 text-sm font-bold text-blossom-deep shadow-soft ring-1 ring-white/70"
          >
            🌸 짧고 재미있는 심리테스트
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-6 text-balance text-[clamp(2.1rem,5.6vw,3.6rem)] font-extrabold leading-[1.16] tracking-tight"
          >
            나를 발견하는
            <br />
            즐거운{" "}
            <span className="bg-gradient-to-r from-blossom-deep to-blossom bg-clip-text text-transparent">
              심리테스트
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-5 max-w-md text-[15px] leading-relaxed text-ink-soft md:text-base"
          >
            재미있는 질문으로 알아보는 다양한 성격과 취향!
            <br />
            지금 바로 테스트하고 나만의 결과를 확인해보세요.
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
            <Button href="/tests/my-sweets" size="lg">
              테스트 시작하기 <ArrowRight size={18} />
            </Button>
            <Button
              href="#popular"
              size="lg"
              variant="secondary"
              className="bg-butter text-ink hover:bg-butter/80"
            >
              테스트 전체 보기
            </Button>
          </motion.div>

          <motion.div variants={item} className="mt-9 flex items-center gap-4 text-sm text-ink-soft">
            <div className="flex -space-x-2">
              {["#FFD3E2", "#BFD8FF", "#FFF3AE", "#DDF4D6"].map((c) => (
                <span
                  key={c}
                  className="h-8 w-8 rounded-full ring-2 ring-white"
                  style={{ background: c }}
                />
              ))}
            </div>
            <span>
              {totalParticipants === null ? (
                "새로운 테스트를 준비하고 있어요"
              ) : (
                <>
                  지금까지 <strong className="text-ink">{formatCount(totalParticipants)}명</strong>이
                  참여했어요
                </>
              )}
            </span>
          </motion.div>
        </motion.div>

        {/* 오른쪽: 최근 테스트 5개를 자동으로 순환하는 슬라이드 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[380px] md:max-w-[460px]"
        >
          <HeroTestSlideshow />

          {/* 슬라이드 주변 떠다니는 작은 꽃 */}
          <motion.span
            className="pointer-events-none absolute -left-2 top-10 text-3xl md:text-4xl"
            animate={{ y: [0, -14, 0], rotate: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
          >
            🌼
          </motion.span>
          <motion.span
            className="pointer-events-none absolute -right-1 top-1/3 text-2xl md:text-3xl"
            animate={{ y: [0, 12, 0], rotate: [0, 12, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
            aria-hidden="true"
          >
            🌷
          </motion.span>
          <motion.span
            className="pointer-events-none absolute -bottom-3 -left-3 text-2xl md:text-3xl"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            aria-hidden="true"
          >
            💐
          </motion.span>
        </motion.div>
      </div>

      <ScallopedEdge />
    </section>
  );
}
