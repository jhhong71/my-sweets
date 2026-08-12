import { RESULTS } from "../data/results";
import { QUESTIONS } from "../data/questions";
import { ShopperIcon } from "./ShopperIcon";
import { GlassTab, Sparkle } from "./Decor";
import { KakaoAdFitBanner } from "./ads/KakaoAdFitBanner";

type Props = {
  onStart: () => void;
  onShowPrivacy: () => void;
};

const AXIS_INTRO = [
  {
    name: "품질 추구 ↔ 가성비 추구",
    desc: "가격보다 소재·마감을 꼼꼼히 보는지, 합리적인 가격을 우선하는지",
  },
  {
    name: "브랜드·유행 민감도",
    desc: "신상·브랜드 트렌드에 끌리는지, 익숙하고 실용적인 걸 선호하는지",
  },
  {
    name: "충동 구매 ↔ 계획 구매",
    desc: "마음에 들면 바로 사는지, 비교하고 고민한 뒤 결정하는지",
  },
];

export function StartScreen({ onStart, onShowPrivacy }: Props) {
  return (
    <div className="screen start-screen">
      <header className="masthead">
        <span className="masthead-rule" aria-hidden="true" />
        <p className="masthead-label">소비 성향 진단</p>
      </header>

      <div className="hero-badge-wrap">
        <div className="hero-grid" aria-hidden="true">
          {RESULTS.map((r) => (
            <span key={r.id} className="hero-grid-item">
              <ShopperIcon id={r.id} size={56} />
            </span>
          ))}
        </div>
      </div>

      <h1 className="start-title">
        나는 어떤
        <br />
        <span className="title-mark">쇼핑러일까?</span>
      </h1>

      <p className="start-desc">
        소비자 행동 연구의 요인 정의를 참고해 만든 {QUESTIONS.length}개
        문항으로 나의 소비 성향을 살펴봅니다. 온라인이든 오프라인이든, 일상
        적인 물건을 살 때 평소 나의 모습을 떠올리며 답해 주세요.
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
                <ShopperIcon id={r.id} size={48} title={r.title} />
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
        이 테스트는 공개된 소비자 행동 연구의 요인 정의를 참고하여 제작한
        엔터테인먼트 콘텐츠입니다. 전문적인 소비 심리 진단이나 재무 상담을
        목적으로 하지 않습니다.
      </p>

      <button className="btn-link" onClick={onShowPrivacy}>
        개인정보처리방침 · 광고 및 제휴 안내
      </button>
    </div>
  );
}
