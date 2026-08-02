"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Users } from "lucide-react";
import type { Test } from "@/lib/data";
import { formatCount } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

/**
 * 인기 테스트 카드.
 * hover 시: 살짝 떠오르고 그림자 증가, 썸네일 이미지 확대.
 * 실제 제품 사진을 쓸 경우 thumbnail 영역의 그라디언트 div를 next/image로 교체.
 */
export function TestCard({ test }: { test: Test }) {
  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group h-full"
    >
      <Link
        href={test.href}
        {...(test.external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        className="flex h-full flex-col overflow-hidden rounded-card bg-white shadow-card ring-1 ring-black/[0.03] transition-shadow duration-300 group-hover:shadow-card-hover"
      >
        {/* 썸네일 */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <div
            className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-110"
            style={{ background: test.gradient }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(70%_55%_at_28%_22%,rgba(255,255,255,0.75),transparent_60%)]" />
          <div className="absolute inset-0 grid place-items-center">
            <span
              className="text-6xl drop-shadow-sm transition-transform duration-500 ease-out group-hover:scale-110"
              aria-hidden="true"
            >
              {test.motif}
            </span>
          </div>

          {test.badge && (
            <div className="absolute left-3 top-3">
              <Badge variant={test.badge === "HOT" ? "hot" : "new"}>{test.badge}</Badge>
            </div>
          )}
        </div>

        {/* 본문 */}
        <div className="flex flex-1 flex-col p-5">
          <span className="text-xs font-bold text-blossom-deep">{test.category}</span>
          <h3 className="mt-1.5 text-[17px] font-bold leading-snug tracking-tight">
            {test.title}
          </h3>

          <div className="mt-auto flex items-center justify-between pt-5">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-soft">
              <Users size={14} />
              {formatCount(test.participants)}명 참여
            </span>
            <span
              className="grid h-9 w-9 place-items-center rounded-full bg-cream text-blossom-deep transition-colors group-hover:bg-blossom group-hover:text-white"
              aria-hidden="true"
            >
              <ArrowRight size={17} />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
