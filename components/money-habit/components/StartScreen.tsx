import { RESULTS } from "../data/results";
import { QUESTIONS } from "../data/questions";
import { MoneyIcon } from "./MoneyIcon";
import { GlassTab, Sparkle } from "./Decor";
import { KakaoAdFitBanner } from "./ads/KakaoAdFitBanner";

type Props = {
  onStart: () => void;
  onShowPrivacy: () => void;
};

const AXIS_INTRO = [
  {
    name: "계획적 현금흐름 관리 ↔ 흐름에 맡김",
    desc: "돈이 들어오고 나갈 때 미리 계획을 세우고 파악하는지, 그때그때 흐름에 맡기는지",
  },
  {
    name: "저축 우선 ↔ 현재 소비 우선",
    desc: "돈이 생기면 저축을 먼저 챙기는지, 지금 하고 싶은 것에 쓰는 걸 우선하는지",
  },
  {
    name: "신중한 카드 사용 ↔ 편한 카드 사용",
    desc: "카드·할부를 쓸 때 상환 부담을 미리 따져보는지, 편하게 쓰는지",
  },
];

export function StartScreen({ onStart, onShowPrivacy }: Props) {
  return (
    <div className="screen start-screen">
      <header className="masthead">
        <span className="masthead-rule" aria-hidden="true" />
        <p className="masthead-label">돈 관리 습관 진단</p>
      </header>

      <div className="hero-badge-wrap">
        <div className="hero-grid" aria-hidden="true">
          {RESULTS.map((r) => (
            <span key={r.id} className="hero-grid-item">
              <MoneyIcon id={r.id} size={56} />
            </span>
          ))}
        </div>
      </div>

      <h1 className="start-title">
        나는 어떤
        <br />
        <span className="title-mark">머니타입일까?</span>
      </h1>

      <p className="start-desc">
        재무관리 행동 연구의 하위영역 정의를 참고해 만든 {QUESTIONS.length}개
        문항으로 나의 돈 관리 습관을 살펴봅니다. 월급이든 용돈이든, 정기적으로
        들어오는 돈을 관리할 때 평소 나의 모습을 떠올리며 답해 주세요.
      </p>

      <section className="glass-card" aria-labelledby="axis-preview-heading">
        <GlassTab />
        <Sparkle className="card-sparkle" />
        <div className="glass-card-body">
          <h2 className="section-caption" id="axis-preview-heading">
            측정하는 3가지 축
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

      <section className="glass-card" aria-labelledby="type-preview-heading">
        <GlassTab />
        <div className="glass-card-body">
          <h2 className="section-caption" id="type-preview-heading">
            8가지 결과 유형
          </h2>
          <ul className="type-badge-list">
            {RESULTS.map((r) => (
              <li key={r.id} className="type-badge-row">
                <MoneyIcon id={r.id} size={48} title={r.title} />
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
        이 테스트는 공개된 재무관리 행동 연구의 하위영역 정의를 참고하여
        제작한 엔터테인먼트 콘텐츠입니다. 전문적인 재무 상담이나 심리 진단을
        목적으로 하지 않습니다.
      </p>

      <button className="btn-link" onClick={onShowPrivacy}>
        개인정보처리방침 · 광고 및 제휴 안내
      </button>
    </div>
  );
}
