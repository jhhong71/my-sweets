import Link from "next/link";
import { Instagram, Twitter, Youtube } from "lucide-react";
import { NewsletterForm } from "@/components/NewsletterForm";

const COLUMNS = [
  {
    title: "바로가기",
    links: ["테스트 전체", "인기 테스트", "새로운 테스트", "카테고리"],
  },
  {
    title: "고객센터",
    links: ["공지사항", "자주 묻는 질문", "문의하기", "이용약관"],
  },
];

const SNS = [
  { label: "인스타그램", Icon: Instagram },
  { label: "트위터", Icon: Twitter },
  { label: "유튜브", Icon: Youtube },
];

export function Footer() {
  return (
    <footer className="mt-10 border-t border-black/[0.05] bg-white/60 pb-28 pt-16 md:pb-16">
      <div className="container">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          {/* 브랜드 */}
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-blossom to-sky text-white shadow-soft">
                <span className="text-[15px] leading-none" aria-hidden="true">
                  ◕‿◕
                </span>
              </span>
              <strong className="text-lg font-extrabold tracking-tight">마이스윗테스트</strong>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-soft">
              다양한 심리테스트로 나를 알아가고, 더 나은 내가 되는 여정을 함께해요.
            </p>
            <div className="mt-5 flex gap-2">
              {SNS.map(({ label, Icon }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full bg-cream text-ink-soft transition-colors hover:bg-blossom hover:text-white"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* 내비게이션 컬럼 */}
          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="text-sm font-bold text-ink">{col.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm text-ink-soft transition-colors hover:text-blossom-deep"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* 뉴스레터 */}
          <div>
            <h3 className="text-sm font-bold text-ink">💌 새 테스트 소식 받기</h3>
            <p className="mt-4 text-sm text-ink-soft">매주 새로운 테스트를 메일로 보내드려요.</p>
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-12 border-t border-black/[0.05] pt-6 text-center text-xs text-ink-soft">
          © {new Date().getFullYear()} 마이스윗테스트 · MySweets Test. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
