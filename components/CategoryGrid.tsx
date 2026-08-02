"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CATEGORIES } from "@/lib/data";
import { Reveal } from "@/components/Reveal";

export function CategoryGrid() {
  return (
    <section id="categories" className="scroll-mt-24 bg-white/50 py-20 md:py-28">
      <div className="container">
        <Reveal className="mb-12 text-center">
          <h2 className="text-[clamp(1.6rem,4vw,2.4rem)] font-extrabold tracking-tight">
            🎨 카테고리로 찾아보기
          </h2>
          <p className="mt-2 text-ink-soft">관심 있는 주제를 골라 나에게 맞는 테스트를 찾아보세요.</p>
        </Reveal>

        <ul className="mx-auto grid max-w-3xl grid-cols-4 gap-x-4 gap-y-8 sm:grid-cols-4 md:grid-cols-8">
          {CATEGORIES.map((cat, i) => (
            <Reveal as="li" key={cat.id} delay={i * 0.05} className="flex justify-center">
              <Link href="#popular" className="group flex flex-col items-center gap-3">
                <motion.span
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="grid h-16 w-16 place-items-center rounded-full text-3xl shadow-soft ring-1 ring-black/[0.03] md:h-[70px] md:w-[70px]"
                  style={{ background: cat.tint }}
                  aria-hidden="true"
                >
                  {cat.emoji}
                </motion.span>
                <span className="text-sm font-semibold text-ink transition-colors group-hover:text-blossom-deep">
                  {cat.label}
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
