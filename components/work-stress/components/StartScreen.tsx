import { RESULTS } from "../data/results";
import { QUESTIONS } from "../data/questions";
import { StressIcon } from "./StressIcon";
import { GlassTab, Sparkle } from "./Decor";
import { KakaoAdFitBanner } from "./ads/KakaoAdFitBanner";

type Props = {
  onStart: () => void;
  onShowPrivacy: () => void;
};

const AXIS_INTRO = [
  {
    name: "문제중심형 ↔ 감정중심형",
    desc: "원인을 찾아 해결하고 싶은지, 마음을 먼저 다독이고 싶은지",
  },
  {
    name: "접근형 ↔ 거리두기형",
    desc: "적극적으로 표현하고 싶은지, 잠시 거리를 두고 싶은지",
  },
];

export function StartScreen({ onStart, onShowPrivacy }: Props) {
  return (
    <div className="screen start-screen">
      <header className="masthead">
        <span className="masthead-rule" aria-hidden="true" />
        <p className="masthead-label">업무 스트레스 대처 진단</p>
      </header>

      <div className="hero-badge-wrap">
        <div className="hero-cast">
          {RESULTS.map((r, i) => (
            <span key={r.id} className={`hero-cast-item is-${i}`}>
              <StressIcon
                id={r.id}
                size={i === 2 ? 104 : i === 1 || i === 3 ? 76 : 64}
              />
            </span>
          ))}
        </div>
      </div>

      <h1 className="start-title">
        나는 스트레스를
        <br />
        <span className="title-mark">어떻게 이겨낼까?</span>
      </h1>

      <p className="start-desc">
        스트레스-대처 이론의 두 가지 대처 차원 구조를 참고해 만든 {QUESTIONS.length}개
        문항으로 나의 업무 스트레스 대처 방식을 살펴봅니다. 업무 마감이나
        갑작스러운 업무량 증가처럼 회사에서 스트레스를 받았던 순간을 떠올리며
        답해 주세요.
      </p>

      <section className="glass-card" aria-labelledby="axis-preview-heading">
        <GlassTab />
        <Sparkle className="card-sparkle" />
        <div className="glass-card-body">
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

      <section className="glass-card" aria-labelledby="type-preview-heading">
        <GlassTab />
        <div className="glass-card-body">
          <h2 className="section-caption" id="type-preview-heading">
            5가지 결과 유형
          </h2>
          <ul className="type-badge-list">
            {RESULTS.map((r) => (
              <li key={r.id} className="type-badge-row">
                <StressIcon id={r.id} size={56} title={r.title} />
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
        이 테스트는 공개된 스트레스-대처 이론의 구조를 참고하여 제작한
        엔터테인먼트 콘텐츠입니다. 전문적인 심리 진단, 채용 또는 인사평가를
        목적으로 하지 않습니다.
      </p>

      <button className="btn-link" onClick={onShowPrivacy}>
        개인정보처리방침 · 광고 및 제휴 안내
      </button>
    </div>
  );
}
