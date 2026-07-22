import { QUESTIONS } from "../data/questions";
import { RESULT_ORDER } from "../data/results";
import { SnackImage } from "./SnackImage";
import { KakaoAdFitBanner } from "./ads/KakaoAdFitBanner";

type Props = {
  onStart: () => void;
  onShowPrivacy: () => void;
};

function Sparkle({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M12 1 L14 9 L22 12 L14 15 L12 23 L10 15 L2 12 L10 9 Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function StartScreen({ onStart, onShowPrivacy }: Props) {
  return (
    <main className="screen start-screen">
      {/* 히어로: 큰 간식 일러스트 + 떠다니는 장식 */}
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

      <p className="eyebrow">달콤 취향 테스트</p>
      <h1 className="start-title">
        나는 어떤
        <br />
        간식일까?
      </h1>
      <p className="start-lead">
        요즘 나의 취향과 기분으로 알아보는 나와 닮은 간식.
        <strong> 진함·발랄함·다정함</strong>으로, 5가지 간식 중 나와 가장
        가까운 하나를 찾아드려요.
      </p>

      {/* 만날 수 있는 간식 미리보기 */}
      <ul className="cast" aria-label="만날 수 있는 간식 미리보기">
        {RESULT_ORDER.map((id) => (
          <li className="cast-item" key={id}>
            <SnackImage id={id} size={48} />
          </li>
        ))}
      </ul>
      <p className="cast-caption">이런 5가지 간식을 만나요</p>

      <ul className="meta-list" aria-label="테스트 안내">
        <li>
          <span className="meta-num">{QUESTIONS.length}</span>문항
        </li>
        <li>
          <span className="meta-num">약 1</span>분
        </li>
        <li>
          <span className="meta-num">5</span>가지 간식
        </li>
      </ul>

      <button type="button" className="btn btn-primary" onClick={onStart}>
        테스트 시작하기
      </button>

      <KakaoAdFitBanner placement="start" />

      <p className="disclaimer">
        이 테스트는 선택한 상황과 취향을 바탕으로 결과를 제공하는
        <strong> 엔터테인먼트 콘텐츠</strong>입니다. 과학적 성격검사나 전문적인
        심리 진단을 목적으로 하지 않습니다.
      </p>

      <nav className="footer-links" aria-label="정보">
        <button type="button" className="link-btn" onClick={onShowPrivacy}>
          개인정보처리방침 · 광고/제휴 안내
        </button>
      </nav>
    </main>
  );
}
