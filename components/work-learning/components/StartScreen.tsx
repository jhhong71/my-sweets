import { RESULTS } from "../data/results";
import { QUESTIONS } from "../data/questions";
import { LearnIcon } from "./LearnIcon";
import { CardTab, Paperclip, Postmark } from "./Decor";
import { KakaoAdFitBanner } from "./ads/KakaoAdFitBanner";

type Props = {
  onStart: () => void;
  onShowPrivacy: () => void;
};

const AXIS_INTRO = [
  {
    name: "개념형 ↔ 경험형",
    desc: "원리부터 이해하고 싶은지, 직접 부딪히며 감을 잡고 싶은지",
  },
  {
    name: "실행형 ↔ 관찰형",
    desc: "배운 즉시 시도해보고 싶은지, 충분히 지켜본 뒤 움직이고 싶은지",
  },
];

/** 폴라로이드 프레임 안에 놓이는 히어로 아이콘 — 학습·통찰을 상징하는 전구. */
function HeroGlyph() {
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" aria-hidden="true" focusable="false">
      <g fill="none" stroke="var(--accent-deep)" strokeWidth="3.2" strokeLinecap="round">
        <path d="M36 8v6M14 16l4.4 4.4M58 16l-4.4 4.4M8 40h6M58 40h6" />
      </g>
      <path
        d="M24 40c0-8 5.4-14 12-14s12 6 12 14c0 5.4-3 8.6-5.4 11.4-1.6 1.8-2.6 3.2-2.6 5.6H32c0-2.4-1-3.8-2.6-5.6C27 48.6 24 45.4 24 40z"
        fill="var(--accent-soft)"
        stroke="var(--accent-deep)"
        strokeWidth="3"
      />
      <rect x="30" y="57" width="12" height="4.5" rx="2" fill="var(--accent-deep)" />
      <rect x="31" y="63" width="10" height="4" rx="2" fill="var(--accent-deep)" />
    </svg>
  );
}

export function StartScreen({ onStart, onShowPrivacy }: Props) {
  return (
    <div className="screen start-screen">
      <header className="masthead">
        <span className="masthead-rule" aria-hidden="true" />
        <p className="masthead-label">업무 학습 스타일 진단</p>
      </header>

      <div className="hero-frame-wrap">
        <div className="hero-frame">
          <Paperclip />
          <div className="hero-frame-photo">
            <HeroGlyph />
          </div>
          <span className="hero-frame-caption">Learning Style</span>
        </div>
      </div>

      <h1 className="start-title">
        나는 새 업무를
        <br />
        <span className="title-mark">어떻게 배울까?</span>
      </h1>

      <p className="start-desc">
        경험학습이론의 두 가지 학습 차원 구조를 참고해 만든 {QUESTIONS.length}개
        문항으로 나의 업무 학습 방식을 살펴봅니다. 최근 회사에서 새로운 업무
        툴이나 프로세스를 배워야 했던 순간을 떠올리며 답해 주세요.
      </p>

      <section className="tab-card" aria-labelledby="axis-preview-heading">
        <CardTab />
        <Postmark />
        <div className="tab-card-body">
          <h2 className="section-caption" id="axis-preview-heading">
            측정하는 2가지 축
          </h2>
          <ul className="info-list">
            {AXIS_INTRO.map((a) => (
              <li key={a.name} className="info-row">
                <p className="info-name">{a.name}</p>
                <p className="info-desc">{a.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="tab-card" aria-labelledby="type-preview-heading">
        <CardTab />
        <div className="tab-card-body">
          <h2 className="section-caption" id="type-preview-heading">
            5가지 결과 유형
          </h2>
          <ul className="type-badge-list">
            {RESULTS.map((r) => (
              <li key={r.id} className="type-badge-row">
                <LearnIcon iconKey={r.iconKey} size={40} title={r.title} />
                <span className="type-badge-name">{r.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <dl className="start-meta">
        <div>
          <dt>문항</dt>
          <dd>{QUESTIONS.length}개</dd>
        </div>
        <div>
          <dt>소요</dt>
          <dd>약 3분</dd>
        </div>
        <div>
          <dt>결과</dt>
          <dd>{RESULTS.length}종</dd>
        </div>
      </dl>

      <button className="btn-primary" onClick={onStart}>
        테스트 시작하기
      </button>

      <KakaoAdFitBanner placement="start" />

      <p className="start-disclaimer">
        이 테스트는 공개된 학습 이론의 구조를 참고하여 제작한 엔터테인먼트
        콘텐츠입니다. 전문적인 심리 진단, 채용 또는 인사평가를 목적으로 하지
        않습니다.
      </p>

      <button className="btn-link" onClick={onShowPrivacy}>
        개인정보처리방침 · 광고 및 제휴 안내
      </button>
    </div>
  );
}
