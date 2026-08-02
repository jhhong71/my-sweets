"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Flower2, Heart, Cloud, Star, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Deco = {
  Icon: LucideIcon;
  className: string;
  color: string;
  size: number;
  duration: number;
  delay: number;
  drift: number;
};

const DECOS: Deco[] = [
  { Icon: Flower2, className: "left-[6%] top-[18%]", color: "#FF8DB2", size: 30, duration: 7, delay: 0, drift: 16 },
  { Icon: Heart, className: "left-[16%] top-[62%]", color: "#FFB4C9", size: 22, duration: 8, delay: 0.6, drift: 14 },
  { Icon: Cloud, className: "left-[44%] top-[10%]", color: "#BFD8FF", size: 34, duration: 9, delay: 1.1, drift: 18 },
  { Icon: Star, className: "right-[10%] top-[24%]", color: "#FFD86B", size: 24, duration: 7.5, delay: 0.3, drift: 15 },
  { Icon: Sparkles, className: "right-[20%] top-[68%]", color: "#C7A9FF", size: 26, duration: 8.5, delay: 0.9, drift: 17 },
  { Icon: Flower2, className: "right-[5%] top-[54%]", color: "#9BD69A", size: 22, duration: 9.5, delay: 1.4, drift: 13 },
];

/**
 * 섹션 배경에 아주 느리게 떠다니는 작은 장식들.
 * 데코레이션이므로 aria-hidden, 감소된 모션 환경에서는 정지.
 */
export function FloatingDecorations({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {DECOS.map(({ Icon, className: pos, color, size, duration, delay, drift }, i) => (
        <motion.span
          key={i}
          className={cn("absolute", pos)}
          style={{ color }}
          initial={{ opacity: 0.9 }}
          animate={
            reduce
              ? undefined
              : { y: [0, -drift, 0], rotate: [0, i % 2 ? 8 : -8, 0] }
          }
          transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
        >
          <Icon size={size} strokeWidth={2} fill="currentColor" fillOpacity={0.22} />
        </motion.span>
      ))}
    </div>
  );
}
