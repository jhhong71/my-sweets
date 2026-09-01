"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { ArrowRight, Users } from "lucide-react";
import { POPULAR_TESTS, type Test } from "@/lib/data";
import { TestThumbnail } from "@/components/TestThumbnail";
import { Badge } from "@/components/ui/badge";
import { useParticipantCount, useHotTestId } from "@/lib/participants";
import { formatCount } from "@/lib/utils";

/**
 * 최근 추가된 순서 그대로 앞의 5개만 자동 순환한다. POPULAR_TESTS 자체가
 * 최신순(가장 최근에 올린 것이 맨 앞)으로 정렬돼 있으므로 slice(0, 5)로
 * 충분하다.
 */
const SLIDES = POPULAR_TESTS.slice(0, 5);
const INTERVAL_MS = 4000;
/** 이 이상 옆으로 밀면(px) 스와이프로 인정해 슬라이드를 넘긴다. */
const SWIPE_THRESHOLD = 50;

/**
 * 히어로 오른쪽의 정적 일러스트 대신, 최근 테스트 5개를 카드 그대로
 * 자동 순환해 보여준다. 일정 시간마다 넘어가고, 점을 눌러 바로 이동하거나
 * 좌우로 스와이프(터치·드래그)해서 넘길 수 있으며, 마우스를 올리면 잠시
 * 멈춘다.
 */
export function HeroTestSlideshow() {
  const [index, setIndex] = useState(0);
  // 애니메이션이 넘어가는 방향(1: 다음, -1: 이전)을 함께 들고 있어야
  // 슬라이드가 항상 "미는 방향"으로 들어오고 나간다.
  const [direction, setDirection] = useState<1 | -1>(1);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % SLIDES.length);
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, [paused]);

  const test = SLIDES[index];
  // 스와이프 도중에는 카드 안 <Link>의 클릭(이동)이 같이 발동하지 않게 막는
  // 용도. 실제로 밀린 제스처였을 때만 true로 켜서 다음 클릭 한 번만 막는다.
  const draggedRef = useRef(false);

  const goToIndex = (next: number) => {
    setDirection(next > index ? 1 : -1);
    setIndex(next);
  };

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    draggedRef.current = Math.abs(info.offset.x) > 5;
    if (info.offset.x <= -SWIPE_THRESHOLD) {
      setDirection(1);
      setIndex((i) => (i + 1) % SLIDES.length);
    } else if (info.offset.x >= SWIPE_THRESHOLD) {
      setDirection(-1);
      setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length);
    }
  };

  return (
    <div
      className="relative mx-auto w-full max-w-[440px] md:max-w-[560px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        aria-hidden="true"
        className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-lavender/70 via-white/40 to-mint/70 blur-2xl"
      />

      <div className="relative aspect-square touch-pan-y overflow-hidden rounded-[2rem] bg-white shadow-card ring-8 ring-white/70">
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={test.id}
            custom={direction}
            variants={{
              enter: (dir: 1 | -1) => ({ opacity: 0, x: dir > 0 ? 44 : -44 }),
              center: { opacity: 1, x: 0 },
              exit: (dir: 1 | -1) => ({ opacity: 0, x: dir > 0 ? -44 : 44 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.65}
            onDragEnd={handleDragEnd}
            className="absolute inset-0"
          >
            <SlideCard test={test} draggedRef={draggedRef} />
          </motion.div>
        </AnimatePresence>

        {/* 점 인디케이터 */}
        <div className="pointer-events-none absolute inset-x-0 bottom-5 z-10 flex justify-center gap-2">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => goToIndex(i)}
              aria-label={`${s.title} 보기`}
              aria-current={i === index}
              className={`pointer-events-auto h-2 rounded-full transition-all ${
                i === index ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/75"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function SlideCard({
  test,
  draggedRef,
}: {
  test: Test;
  draggedRef: React.MutableRefObject<boolean>;
}) {
  const participants = useParticipantCount(test.id);
  // TestCard와 같은 방식: data.ts에 badge가 직접 지정돼 있으면 그대로 쓰고,
  // 없을 때만 실제 참여수 1위를 실시간으로 계산해 HOT을 붙인다.
  const isHot = useHotTestId() === test.id;
  const badge = test.badge ?? (isHot ? "HOT" : null);

  return (
    <Link
      href={test.href}
      draggable={false}
      onClick={(e) => {
        // 방금 스와이프였다면 그 끝에 딸려오는 클릭으로 페이지 이동까지
        // 되지 않게 막는다(진짜 탭인 경우엔 draggedRef가 애초에 안 켜진다).
        if (draggedRef.current) {
          e.preventDefault();
          draggedRef.current = false;
        }
      }}
      className="group relative block h-full w-full select-none"
    >
      <div className="absolute inset-0" style={{ background: test.gradient }} />
      <div className="absolute inset-0 bg-[radial-gradient(70%_55%_at_28%_22%,rgba(255,255,255,0.75),transparent_60%)]" />
      <div className="absolute inset-0 grid place-items-center pb-20">
        <div className="scale-[1.9] transition-transform duration-500 ease-out group-hover:scale-[2.05]">
          <TestThumbnail test={test} />
        </div>
      </div>

      {badge && (
        <div className="absolute left-5 top-5">
          <Badge variant={badge === "HOT" ? "hot" : "new"} className="text-sm px-3.5 py-1.5">
            {badge}
          </Badge>
        </div>
      )}

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent px-6 pb-6 pt-20 text-white">
        <span className="text-sm font-bold text-white/85">{test.category}</span>
        <h3 className="mt-1.5 flex items-center gap-2 text-2xl font-bold leading-snug tracking-tight md:text-[1.7rem]">
          {test.title}
          <ArrowRight size={22} className="shrink-0 opacity-90" aria-hidden="true" />
        </h3>
        {participants !== null && (
          <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-white/80">
            <Users size={15} aria-hidden="true" />
            {formatCount(participants)}명 참여
          </span>
        )}
      </div>
    </Link>
  );
}
