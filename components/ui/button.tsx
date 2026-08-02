"use client";

import * as React from "react";
import Link from "next/link";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-pill font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blossom/50 focus-visible:ring-offset-2 focus-visible:ring-offset-cream disabled:pointer-events-none disabled:opacity-50 select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-blossom text-white shadow-soft hover:bg-blossom-deep",
        secondary:
          "bg-white text-ink shadow-soft ring-1 ring-black/[0.04] hover:bg-white/70",
        soft: "bg-lavender text-ink hover:bg-lavender/70",
        ghost: "bg-transparent text-ink-soft hover:bg-white/60",
      },
      size: {
        sm: "h-10 px-5 text-sm",
        md: "h-12 px-6 text-[15px]",
        lg: "h-14 px-8 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

const spring = { type: "spring" as const, stiffness: 400, damping: 17 };

type ButtonBaseProps = VariantProps<typeof buttonVariants> & {
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = ButtonBaseProps &
  Omit<HTMLMotionProps<"button">, "children"> & { href?: undefined };

type ButtonAsLink = ButtonBaseProps & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * 스프링 인터랙션이 적용된 버튼.
 * `href`가 있으면 next/link 앵커로, 없으면 <button>으로 렌더한다.
 */
export function Button(props: ButtonProps) {
  const { className, variant, size, children } = props;
  const classes = cn(buttonVariants({ variant, size }), className);
  const interaction = {
    whileHover: { scale: 1.035 },
    whileTap: { scale: 0.96 },
    transition: spring,
  };

  if ("href" in props && props.href !== undefined) {
    return (
      <motion.div className="inline-flex" {...interaction}>
        <Link href={props.href} className={classes}>
          {children}
        </Link>
      </motion.div>
    );
  }

  const { href: _href, ...rest } = props as ButtonAsButton;
  void _href;
  return (
    <motion.button className={classes} {...interaction} {...rest}>
      {children}
    </motion.button>
  );
}

export { buttonVariants };
