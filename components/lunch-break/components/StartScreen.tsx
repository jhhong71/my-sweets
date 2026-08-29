import { QUESTIONS } from "../data/questions";
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
            <CharacterImage id="pwr" size={220} title="점심시간 활용 스타일 테스트 대표 이미지" />
          </div>
        </div>
      </div>

      <p className="eyebrow">점심시간 활용 스타일 테스트</p>
      <h1 className="start-title">
        내 점심시간은
        <br />
        어떤 스타일일까?
      </h1>
      <p className="start-lead">
        점심시간이 찾아왔을 때, 요즘의 나는 어떻게 그 시간을 보낼까요?
        <strong> 결정 방식·동행 방식·시간 활용</strong> 세 가지 축으로, 8가지
        유형 중 나와 가장 가까운 하나를 찾아드려요.
      </p>

      <ul className="axis-preview" aria-label="측정하는 세 가지 축">
        {AXIS_ORDER.map((axis) => (
          <li className="axis-chip" key={axis}>
            <span className="axis-chip-name">{AXIS_LABELS[axis]}</span>
            <span className="axis-chip-poles">
              {POLE_LABELS[axis].high} ↔ {POLE_LABELS[axis].low}
            </span>
          </li>
        ))}
      </ul>

      <ul className="cast" aria-label="만날 수 있는 점심시간 유형 미리보기">
        {RESULT_LIST.map((result) => (
          <li className="cast-item" key={result.id}>
            <span className="cast-icon">
              <CharacterImage id={result.id} size={96} />
            </span>
            <span className="cast-name">{result.title}</span>
          </li>
        ))}
      </ul>
      <p className="cast-caption">이런 {RESULT_LIST.length}가지 유형을 만나요</p>

      <ul className="meta-list" aria-label="테스트 안내">
        <li>
          <span className="meta-num">{QUESTIONS.length}</span>문항
        </li>
        <li>
          <span className="meta-num">약 2</span>분
        </li>
        <li>
          <span className="meta-num">{RESULT_LIST.length}</span>가지 유형
        </li>
      </ul>

      <button type="button" className="btn btn-primary" onClick={onStart}>
        테스트 시작하기
      </button>

      <KakaoAdFitBanner placement="start" />

      <p className="disclaimer">
        이 테스트는 선택한 상황과 취향을 바탕으로 결과를 제공하는
        <strong> 엔터테인먼트 콘텐츠</strong>입니다. 과학적 성격검사나 전문적인
        심리 진단, 채용·인사평가를 목적으로 하지 않습니다.
      </p>

      <nav className="footer-links" aria-label="정보">
        <button type="button" className="link-btn" onClick={onShowPrivacy}>
          개인정보처리방침 · 광고/제휴 안내
        </button>
      </nav>
    </main>
  );
}
