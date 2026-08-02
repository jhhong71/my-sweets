import { TEST_CONFIG, SERVICE } from "../config";
import { LEAD, REPRESENTATIVE, SEO_SECTIONS } from "../data/seoContent";
import type { ResultId } from "../types";
import { SnackImage } from "./SnackImage";
import { KakaoAdFitBanner } from "./ads/KakaoAdFitBanner";

type Props = {
  onStart: () => void;
  onShowPrivacy: () => void;
};

function Sparkle({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 1 L14 9 L22 12 L14 15 L12 23 L10 15 L2 12 L10 9 Z" fill="currentColor" />
    </svg>
  );
}

export function StartScreen({ onStart, onShowPrivacy }: Props) {
  return (
    <main className="screen start-screen">
      {/* 히어로: 큰 마스코트 + 떠다니는 장식 */}
      <div className="hero">
        <Sparkle className="deco deco-star-a" />
        <Sparkle className="deco deco-star-b" />
        <span className="deco deco-dot-a" aria-hidden="true" />
        <span className="deco deco-dot-b" aria-hidden="true" />
        <span className="deco deco-ring" aria-hidden="true" />
        <div className="hero-stage">
          <div className="hero-char">
            <SnackImage id="candy" size={168} title="나는 어떤 간식 테스트 대표 이미지" />
          </div>
        </div>
      </div>

      <h1 className="start-title">
        <span className="start-eyebrow">{SERVICE.fullName}</span>
        <strong className="start-headline">나는 어떤 간식일까?</strong>
      </h1>

      <p className="start-lead start-lead--full">{LEAD.full}</p>
      <p className="start-lead start-lead--short">{LEAD.short}</p>

      {/* 만날 수 있는 간식 미리보기 (대표 이미지 5종, alt 지정) */}
      <ul className="cast" aria-label="만날 수 있는 간식">
        {REPRESENTATIVE.map((r) => (
          <li className="cast-item" key={r.imageKey}>
            <SnackImage id={r.id as ResultId} imageKey={r.imageKey} size={48} title={r.alt} />
          </li>
        ))}
      </ul>
      <p className="cast-caption">5가지 간식, 15가지 맛을 만나요</p>

      <ul className="meta-list" aria-label="테스트 안내">
        <li>
          <span className="meta-num">{TEST_CONFIG.questionCount}</span>문항
        </li>
        <li>
          <span className="meta-num">약 {TEST_CONFIG.estimatedMinutes}</span>분
        </li>
        <li>
          <span className="meta-num">{TEST_CONFIG.resultCount}</span>가지 결과
        </li>
      </ul>

      <button type="button" className="btn btn-primary" onClick={onStart}>
        테스트 시작하기
      </button>
      <p className="start-hint">정답은 없어요. 평소 더 자주 하는 행동을 골라주세요.</p>

      <KakaoAdFitBanner placement="start" />

      {/* 검색·사용자용 정적 소개 (FAQ 아님) */}
      <section className="info-block" id={SEO_SECTIONS.about.id} aria-labelledby="about-h">
        <h2 className="info-h" id="about-h">
          {SEO_SECTIONS.about.title}
        </h2>
        {SEO_SECTIONS.about.paragraphs.map((p, i) => (
          <p className="info-p" key={i}>
            {p}
          </p>
        ))}
      </section>

      <section className="info-block" id={SEO_SECTIONS.how.id} aria-labelledby="how-h">
        <h2 className="info-h" id="how-h">
          {SEO_SECTIONS.how.title}
        </h2>
        <ol className="how-list">
          {SEO_SECTIONS.how.steps.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>
      </section>

      <p className="disclaimer">
        이 테스트는 평소의 선택과 행동을 바탕으로 결과를 제공하는
        <strong> 엔터테인먼트 콘텐츠</strong>입니다. 과학적 성격검사나 전문적인 심리
        진단을 목적으로 하지 않습니다.
      </p>

      <nav className="footer-links" aria-label="정보">
        <a className="link-btn" href={`#${SEO_SECTIONS.about.id}`}>
          테스트 소개
        </a>
        <a className="link-btn" href={`#${SEO_SECTIONS.how.id}`}>
          진행 방법
        </a>
        <button type="button" className="link-btn" onClick={onShowPrivacy}>
          개인정보처리방침
        </button>
      </nav>
    </main>
  );
}
