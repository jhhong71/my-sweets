import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import { FloatingDecorations } from "@/components/FloatingDecorations";

export function CTASection() {
  return (
    <section className="container py-10 md:py-16">
      <Reveal>
        <div className="relative overflow-hidden rounded-[36px] px-6 py-16 text-center shadow-card ring-1 ring-white/60 md:px-10 md:py-20">
          {/* 파스텔 그라디언트 배경 */}
          <div className="absolute inset-0 bg-gradient-to-br from-lavender via-blossom-soft to-sky" />
          <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(255,255,255,0.6),transparent_60%)]" />
          <FloatingDecorations />

          <div className="relative z-10 mx-auto max-w-xl">
            <span className="text-4xl" aria-hidden="true">
              💌
            </span>
            <h2 className="mt-4 text-balance text-[clamp(1.8rem,4.5vw,2.8rem)] font-extrabold leading-tight tracking-tight text-ink">
              나에 대해 더 궁금하지 않나요?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-ink/70">
              지금 바로 랜덤 테스트를 시작하고 새로운 나를 발견해보세요.
            </p>
            <div className="mt-8 flex justify-center">
              <Button href="#popular" size="lg">
                랜덤 테스트 시작하기 <ArrowRight size={18} />
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
