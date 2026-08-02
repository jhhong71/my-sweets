"use client";

import { Send, ArrowRight } from "lucide-react";

/** 뉴스레터 구독 입력 (클라이언트 인터랙션 분리). */
export function NewsletterForm() {
  return (
    <form
      className="mt-4 flex items-center gap-2 rounded-pill bg-white p-1.5 shadow-soft ring-1 ring-black/[0.04]"
      onSubmit={(e) => e.preventDefault()}
    >
      <label htmlFor="newsletter" className="sr-only">
        이메일 주소
      </label>
      <div className="flex flex-1 items-center gap-2 pl-3 text-ink-soft">
        <Send size={16} />
        <input
          id="newsletter"
          type="email"
          placeholder="이메일을 입력해주세요"
          className="w-full bg-transparent py-2 text-sm text-ink outline-none placeholder:text-ink-soft/70"
        />
      </div>
      <button
        type="submit"
        aria-label="구독하기"
        className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-blossom text-white transition-colors hover:bg-blossom-deep"
      >
        <ArrowRight size={18} />
      </button>
    </form>
  );
}
