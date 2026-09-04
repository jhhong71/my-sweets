"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { POPULAR_TESTS } from "@/lib/data";
import { TestCard } from "@/components/TestCard";
import { Reveal } from "@/components/Reveal";

/** 공백 차이·대소문자로 검색이 실패하지 않도록 비교 전에 정규화한다. */
function normalize(text: string): string {
  return text.toLowerCase().replace(/\s+/g, "");
}

export function PopularTests() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = normalize(query);
    if (!q) return POPULAR_TESTS;
    // 제목·카테고리에 더해, 각 테스트의 실제 결과·축 라벨(lib/data.ts의
    // keywords)까지 검색 대상에 포함한다. 예: "안정형"으로 검색하면 카드
    // 제목에는 없어도 애착 유형 테스트의 결과 라벨과 일치해 걸린다.
    return POPULAR_TESTS.filter((test) =>
      normalize(`${test.title} ${test.category} ${(test.keywords ?? []).join(" ")}`).includes(
        q,
      ),
    );
  }, [query]);

  return (
    <section id="popular" className="container scroll-mt-24 py-20 md:py-28">
      <Reveal className="mb-10">
        <h2 className="text-[clamp(1.6rem,4vw,2.4rem)] font-extrabold tracking-tight">
          🌼 지금 즐길 수 있는 콘텐츠
        </h2>
        <p className="mt-2 text-ink-soft">테스트도, 도구도 부담 없이 골라서 바로 시작해보세요.</p>

        <div className="relative mt-6 max-w-sm">
          <Search
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft"
            aria-hidden="true"
          />
          <input
            // type="search"는 브라우저마다(특히 웹킷) 자체 지우기 버튼을 그려
            // 아래의 커스텀 지우기 버튼과 겹쳐 보인다. 스타일을 직접 맞추기
            // 위해 일반 텍스트 입력으로 두고 role/aria로만 검색임을 알린다.
            type="text"
            role="searchbox"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="테스트 이름으로 검색해보세요"
            aria-label="테스트 검색"
            className="glass w-full rounded-pill py-3 pl-11 pr-11 text-sm font-medium text-ink shadow-soft ring-1 ring-white/60 outline-none placeholder:text-ink-soft/70 focus:ring-2 focus:ring-blossom"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="검색어 지우기"
              className="absolute right-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full text-ink-soft transition-colors hover:bg-white/70 hover:text-ink"
            >
              <X size={16} aria-hidden="true" />
            </button>
          )}
        </div>
      </Reveal>

      {filtered.length > 0 ? (
        <ul className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
          {filtered.map((test, i) => (
            <Reveal as="li" key={test.id} delay={i * 0.08}>
              <TestCard test={test} />
            </Reveal>
          ))}
        </ul>
      ) : (
        <p className="rounded-card bg-white/60 px-6 py-16 text-center text-ink-soft shadow-card ring-1 ring-white/60">
          &lsquo;{query}&rsquo;와 맞는 테스트를 찾지 못했어요. 다른 검색어로 시도해보세요.
        </p>
      )}
    </section>
  );
}
