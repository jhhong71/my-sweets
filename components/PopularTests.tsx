import { POPULAR_TESTS } from "@/lib/data";
import { TestCard } from "@/components/TestCard";
import { Reveal } from "@/components/Reveal";

export function PopularTests() {
  return (
    <section id="popular" className="container scroll-mt-24 py-20 md:py-28">
      <Reveal className="mb-10">
        <h2 className="text-[clamp(1.6rem,4vw,2.4rem)] font-extrabold tracking-tight">
          🌼 지금 즐길 수 있는 콘텐츠
        </h2>
        <p className="mt-2 text-ink-soft">테스트도, 도구도 부담 없이 골라서 바로 시작해보세요.</p>
      </Reveal>

      <ul className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
        {POPULAR_TESTS.map((test, i) => (
          <Reveal as="li" key={test.id} delay={i * 0.08}>
            <TestCard test={test} />
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
