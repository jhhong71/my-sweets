"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FloatingDecorations } from "@/components/FloatingDecorations";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-10 md:pt-16">
      <FloatingDecorations />

      <div className="container relative grid items-center gap-10 md:grid-cols-2 md:gap-8">
        {/* 왼쪽: 카피 */}
        <motion.div variants={container} initial="hidden" animate="show" className="relative z-10">
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-pill bg-white/70 px-4 py-2 text-sm font-bold text-blossom-deep shadow-soft ring-1 ring-white/60"
          >
            🌷 매일 새로워지는 심리테스트
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-6 text-balance text-[clamp(2.2rem,6vw,3.75rem)] font-extrabold leading-[1.12] tracking-tight"
          >
            나를 발견하는
            <br />
            <span className="bg-gradient-to-r from-blossom-deep via-blossom to-sky bg-clip-text text-transparent">
              즐거운 심리테스트
            </span>
          </motion.h1>

          <motion.p variants={item} className="mt-5 max-w-md text-[15px] leading-relaxed text-ink-soft">
            재미있는 질문으로 알아보는 나의 성격과 취향. 지금 바로 테스트하고
            나만의 결과를 예쁜 카드로 확인해보세요.
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
            <Button href="#popular" size="lg">
              테스트 시작하기 <ArrowRight size={18} />
            </Button>
            <Button href="#popular" size="lg" variant="secondary">
              테스트 전체 보기
            </Button>
          </motion.div>

          <motion.div variants={item} className="mt-8 flex items-center gap-4 text-sm text-ink-soft">
            <div className="flex -space-x-2">
              {["#FFD3E2", "#BFD8FF", "#FFF3AE", "#DDF4D6"].map((c) => (
                <span
                  key={c}
                  className="h-8 w-8 rounded-full ring-2 ring-cream"
                  style={{ background: c }}
                />
              ))}
            </div>
            <span>
              지금까지 <strong className="text-ink">63,150명</strong>이 참여했어요
            </span>
          </motion.div>
        </motion.div>

        {/* 오른쪽: 블롭 이미지 컨테이너 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[460px]"
        >
          {/* 뒤 블롭 그림자 */}
          <div className="mask-blob-alt absolute -inset-4 bg-gradient-to-br from-lavender via-sky/60 to-mint blur-2xl" />

          {/* 메인 이미지 자리 (제품 사진 삽입 위치) */}
          <div className="mask-blob relative aspect-square overflow-hidden shadow-card ring-8 ring-white/70">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(120% 90% at 30% 20%, #FFFFFF 0%, #FFE1EC 34%, #FFC1D8 66%, #BFD8FF 100%)",
              }}
            />
            {/* 소프트 하이라이트 */}
            <div className="absolute inset-0 bg-[radial-gradient(60%_45%_at_28%_18%,rgba(255,255,255,0.85),transparent_60%)]" />
            <div className="absolute inset-0 grid place-items-center">
              <span className="text-[7rem] drop-shadow-sm" aria-hidden="true">
                🌸
              </span>
            </div>
            <span className="sr-only">파스텔 톤의 감성적인 심리테스트 대표 이미지</span>
          </div>

          {/* 이미지 주변 떠다니는 꽃 */}
          <motion.span
            className="absolute -left-3 top-8 text-4xl"
            animate={{ y: [0, -14, 0], rotate: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
          >
            🌼
          </motion.span>
          <motion.span
            className="absolute -right-2 top-1/3 text-3xl"
            animate={{ y: [0, 12, 0], rotate: [0, 12, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
            aria-hidden="true"
          >
            🌷
          </motion.span>
          <motion.span
            className="absolute bottom-6 left-10 text-3xl"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            aria-hidden="true"
          >
            💐
          </motion.span>

          {/* 유리 배지 */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="glass absolute -bottom-3 right-4 flex items-center gap-2 rounded-2xl px-4 py-2.5 shadow-float ring-1 ring-white/60"
          >
            <span className="text-xl" aria-hidden="true">
              ✨
            </span>
            <span className="text-sm font-bold text-ink">You&apos;re special</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
