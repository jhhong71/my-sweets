import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { POPULAR_TESTS } from "@/lib/data";
import { TestCard } from "@/components/TestCard";
import { Reveal } from "@/components/Reveal";

export function PopularTests() {
  return (
    <section id="popular" className="container scroll-mt-24 py-20 md:py-28">
      <Reveal className="mb-10 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-[clamp(1.6rem,4vw,2.4rem)] font-extrabold tracking-tight">
            🌼 요즘 인기있는 테스트
          </h2>
          <p className="mt-2 text-ink-soft">지금 가장 많이 참여하는 테스트를 골라봤어요.</p>
        </div>
        <Link
          href="#"
          className="hidden shrink-0 items-center gap-1.5 rounded-pill bg-white px-4 py-2.5 text-sm font-semibold text-ink-soft shadow-soft ring-1 ring-black/[0.04] transition-colors hover:text-blossom-deep sm:inline-flex"
        >
          전체 보기 <ArrowRight size={16} />
        </Link>
      </Reveal>

      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {POPULAR_TESTS.map((test, i) => (
          <Reveal as="li" key={test.id} delay={i * 0.08}>
            <TestCard test={test} />
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
