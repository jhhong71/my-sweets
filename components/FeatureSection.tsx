import Link from "next/link";
import { Sparkles, Heart, Share2, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { FEATURES, type Feature } from "@/lib/data";
import { Reveal } from "@/components/Reveal";

const ICONS: Record<Feature["icon"], LucideIcon> = {
  sparkles: Sparkles,
  heart: Heart,
  share: Share2,
};

export function FeatureSection() {
  return (
    <section className="container py-20 md:py-28">
      <Reveal className="mb-12 text-center">
        <h2 className="text-[clamp(1.6rem,4vw,2.4rem)] font-extrabold tracking-tight">
          🌷 이렇게 즐겨보세요
        </h2>
        <p className="mt-2 text-ink-soft">테스트를 더 편하게 즐길 수 있도록 신경 쓴 부분이에요.</p>
      </Reveal>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {FEATURES.map((f, i) => {
          const Icon = ICONS[f.icon];
          return (
            <Reveal key={f.id} delay={i * 0.08} className="h-full">
              <div
                className="flex h-full flex-col rounded-card p-7 ring-1 ring-black/[0.03]"
                style={{ background: f.bg }}
              >
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/80 text-blossom-deep shadow-soft">
                  <Icon size={26} />
                </span>
                <h3 className="mt-5 text-lg font-bold tracking-tight">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{f.description}</p>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal className="mt-10 text-center" delay={0.2}>
        <Link
          href="/about"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-blossom-deep hover:underline"
        >
          마이스윗테스트 소개 보기 <ArrowRight size={15} />
        </Link>
      </Reveal>
    </section>
  );
}
