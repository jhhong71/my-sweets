import { RESULT_LIST } from "../data/results";
import { AXIS_ORDER, AXIS_LABELS, POLE_LABELS } from "../lib/axis";
import { CharacterImage } from "./CharacterImage";
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
      <div className="hero">
        <Sparkle className="deco deco-star-a" />
        <Sparkle className="deco deco-star-b" />
        <span className="deco deco-dot-a" aria-hidden="true" />
        <span className="deco deco-dot-b" aria-hidden="true" />
        <span className="deco deco-ring" aria-hidden="true" />
        <div className="hero-stage">
          <div className="hero-char">
            <CharacterImage id="pce" size={150} title="성씨 궁합 테스트 대표 이미지" />
          </div>
        </div>
      </div>

      <p className="eyebrow">성씨궁합테스트 · 성씨본관궁합테스트 · 본관궁합테스트</p>
      <h1 className="start-title">
        우리 둘,
        <br />
        성씨 궁합은?
      </h1>
      <p className="start-lead">
        나와 상대방의 <strong>성씨와 본관</strong>을 골라보세요. 두 사람의
        궁합 지수와 텐션·케미·분위기 세 가지 기운으로, 8가지 케미 유형 중
        우리 사이와 가장 가까운 하나를 찾아드려요.
      </p>

      <ul className="axis-preview" aria-label="궁합을 이루는 세 가지 기운">
        {AXIS_ORDER.map((axis) => (
          <li className="axis-chip" key={axis}>
            <span className="axis-chip-name">{AXIS_LABELS[axis]}</span>
            <span className="axis-chip-poles">
              {POLE_LABELS[axis].high} ↔ {POLE_LABELS[axis].low}
            </span>
          </li>
        ))}
      </ul>

      <ul className="cast" aria-label="만날 수 있는 케미 유형 미리보기">
        {RESULT_LIST.map((result) => (
          <li className="cast-item" key={result.id}>
            <span className="cast-icon" style={{ ["--accent" as string]: result.color }}>
              <CharacterImage id={result.id} size={48} />
            </span>
            <span className="cast-name">{result.title}</span>
          </li>
        ))}
      </ul>
      <p className="cast-caption">이런 {RESULT_LIST.length}가지 케미 유형을 만나요</p>

      <ul className="meta-list" aria-label="테스트 안내">
        <li>
          <span className="meta-num">4</span>단계 선택
        </li>
        <li>
          <span className="meta-num">약 1</span>분
        </li>
        <li>
          <span className="meta-num">{RESULT_LIST.length}</span>가지 유형
        </li>
      </ul>

      <button type="button" className="btn btn-primary" onClick={onStart}>
        궁합 보러 가기
      </button>

      <KakaoAdFitBanner placement="start" />

      <p className="disclaimer">
        이 테스트는 선택한 성씨·본관을 바탕으로 결과를 제공하는
        <strong> 엔터테인먼트 콘텐츠</strong>입니다. 실제 전통 궁합법이나
        족보에 근거하지 않으며, 재미로만 즐겨주세요.
      </p>

      <nav className="footer-links" aria-label="정보">
        <button type="button" className="link-btn" onClick={onShowPrivacy}>
          개인정보처리방침 · 광고/제휴 안내
        </button>
      </nav>
    </main>
  );
}
