"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Users } from "lucide-react";
import type { Test } from "@/lib/data";
import { formatCount } from "@/lib/utils";
import { useParticipantCount, useHotTestId } from "@/lib/participants";
import { Badge } from "@/components/ui/badge";
import { TestThumbnail } from "@/components/TestThumbnail";

/**
 * 인기 테스트 카드.
 * hover 시: 살짝 떠오르고 그림자 증가, 썸네일 이미지 확대.
 * 실제 제품 사진을 쓸 경우 thumbnail 영역의 그라디언트 div를 next/image로 교체.
 */
export function TestCard({ test }: { test: Test }) {
  // 실제 집계값만 표시한다. 집계 전(null)이면 자리만 비워둔다.
  const participants = useParticipantCount(test.id);
  // data.ts에 badge가 직접 지정돼 있으면(NEW든 HOT이든) 그대로 쓰고,
  // 없을 때만 실제 참여수 1위를 실시간으로 계산해 HOT을 붙인다.
  const isHot = useHotTestId() === test.id;
  const badge = test.badge ?? (isHot ? "HOT" : null);
  const cardClassName =
    "flex h-full flex-col overflow-hidden rounded-card bg-white shadow-card ring-1 ring-black/[0.03] transition-shadow duration-300 group-hover:shadow-card-hover";

  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group h-full"
    >
      {test.standalone ? (
        // Next 라우터 밖의 정적 앱(예: /ppuri-saju/). <Link>의 클라이언트
        // 이동으로는 도달 못 하므로 일반 <a>로 전체 이동시킨다
        // (components/Header.tsx의 NavLink와 동일한 이유).
        <a href={test.href} className={cardClassName}>
          <TestCardBody test={test} participants={participants} badge={badge} />
        </a>
      ) : (
        <Link
          href={test.href}
          {...(test.external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          className={cardClassName}
        >
          <TestCardBody test={test} participants={participants} badge={badge} />
        </Link>
      )}
    </motion.article>
  );
}

function TestCardBody({
  test,
  participants,
  badge,
}: {
  test: Test;
  participants: number | null;
  badge: "HOT" | "NEW" | null;
}) {
  return (
    <>
      {/* 썸네일 */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <div
            className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-110"
            style={{ background: test.gradient }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(70%_55%_at_28%_22%,rgba(255,255,255,0.75),transparent_60%)]" />
          <div className="absolute inset-0 grid place-items-center">
            <div className="transition-transform duration-500 ease-out group-hover:scale-110">
              <TestThumbnail test={test} />
            </div>
          </div>

          {badge && (
            <div className="absolute left-3 top-3">
              <Badge variant={badge === "HOT" ? "hot" : "new"}>{badge}</Badge>
            </div>
          )}
        </div>

        {/* 본문 */}
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-blossom-deep">{test.category}</span>
            {test.external && (
              <span className="inline-flex items-center gap-0.5 text-[11px] font-medium text-ink-soft">
                <ExternalLink size={11} aria-hidden="true" />
                외부 사이트
              </span>
            )}
          </div>
          <h3 className="mt-1.5 text-[17px] font-bold leading-snug tracking-tight">
            {test.title}
          </h3>

          <div className="mt-auto flex items-center justify-between pt-5">
            {participants === null ? (
              <span />
            ) : (
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-soft">
                <Users size={14} />
                {formatCount(participants)}명 참여
              </span>
            )}
            <span
              className="grid h-9 w-9 place-items-center rounded-full bg-cream text-blossom-deep transition-colors group-hover:bg-blossom group-hover:text-white"
              aria-hidden="true"
            >
              <ArrowRight size={17} />
            </span>
          </div>
        </div>
    </>
  );
}
