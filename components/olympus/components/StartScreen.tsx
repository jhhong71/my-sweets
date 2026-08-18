import { QUESTIONS } from "../data/questions";
import { RESULT_LIST } from "../data/gods";
import { AXIS_ORDER, AXIS_LABELS } from "../lib/axis";
import { GodIcon } from "./GodIcon";
import { KakaoAdFitBanner } from "./ads/KakaoAdFitBanner";

type Props = {
  onStart: () => void;
  onShowPrivacy: () => void;
};

function LaurelLeaf({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M12 2c4 3 5 8 3 13-2 4-6 6-10 7 1-5 2-10 5-14 1-2 1.5-4.5 2-6Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function StartScreen({ onStart, onShowPrivacy }: Props) {
  return (
    <main className="screen start-screen">
      <div className="hero">
        <LaurelLeaf className="deco deco-leaf-a" />
        <LaurelLeaf className="deco deco-leaf-b" />
        <span className="deco deco-dot-a" aria-hidden="true" />
        <span className="deco deco-dot-b" aria-hidden="true" />
        <span className="deco deco-ring" aria-hidden="true" />
        <div className="hero-stage">
          <div className="hero-char">
            <GodIcon id="zeus" size={140} title="올림포스 캐릭터 테스트 대표 이미지" />
          </div>
        </div>
      </div>

      <p className="eyebrow">올림포스 캐릭터 테스트</p>
      <h1 className="start-title">
        나는 어떤 그리스 로마
        <br />
        신을 닮았을까?
      </h1>
      <p className="start-lead">
        고민이 생겼을 때, 새로운 일을 시작할 때, 요즘의 나는 어떻게 움직일까요?
        <strong> 지혜·열정·유대·질서</strong> 네 가지 축으로, 올림포스 12신 중
        나와 가장 가까운 신을 찾아드려요.
      </p>

      <ul className="axis-preview" aria-label="측정하는 네 가지 축">
        {AXIS_ORDER.map((axis) => (
          <li className="axis-chip" key={axis}>
            <span className="axis-chip-name">{AXIS_LABELS[axis]}</span>
          </li>
        ))}
      </ul>

      <ul className="cast" aria-label="만날 수 있는 올림포스 신 미리보기">
        {RESULT_LIST.map((result) => (
          <li className="cast-item" key={result.id}>
            <GodIcon id={result.id} size={38} />
            <span className="cast-name">{result.title}</span>
          </li>
        ))}
      </ul>
      <p className="cast-caption">이런 {RESULT_LIST.length}가지 신을 만나요</p>

      <ul className="meta-list" aria-label="테스트 안내">
        <li>
          <span className="meta-num">{QUESTIONS.length}</span>문항
        </li>
        <li>
          <span className="meta-num">약 2</span>분
        </li>
        <li>
          <span className="meta-num">{RESULT_LIST.length}</span>신
        </li>
      </ul>

      <button type="button" className="btn btn-primary" onClick={onStart}>
        테스트 시작하기
      </button>

      <KakaoAdFitBanner placement="start" />

      <p className="disclaimer">
        이 테스트는 대중적으로 잘 알려진 그리스·로마 신화 속 신들의 이미지를
        참고해 만든 <strong>엔터테인먼트 콘텐츠</strong>입니다. 과학적 성격검사나
        전문적인 심리 진단을 목적으로 하지 않습니다.
      </p>

      <nav className="footer-links" aria-label="정보">
        <button type="button" className="link-btn" onClick={onShowPrivacy}>
          개인정보처리방침 · 광고/제휴 안내
        </button>
      </nav>
    </main>
  );
}
