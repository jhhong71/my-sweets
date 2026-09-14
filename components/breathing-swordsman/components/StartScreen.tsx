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

/** 히어로에 겹쳐 모여 있는 대표 마스코트 3종 */
const HERO_CAST = ["bhi", "chi", "cho"] as const;

export function StartScreen({ onStart, onShowPrivacy }: Props) {
  return (
    <main className="screen start-screen">
      <div className="hero">
        <Sparkle className="deco deco-star-a" />
        <Sparkle className="deco deco-star-b" />
        <span className="deco deco-dot-a" aria-hidden="true" />
        <span className="deco deco-dot-b" aria-hidden="true" />
        <span className="deco deco-ring" aria-hidden="true" />
        <div className="hero-stage" role="img" aria-label="호흡의 검사 성향 테스트 마스코트 모음">
          {HERO_CAST.map((id) => (
            <div className={`hero-char hero-char--${id}`} key={id}>
              <CharacterImage id={id} />
            </div>
          ))}
        </div>
      </div>

      <p className="eyebrow">호흡의 검사 성향 테스트</p>
      <h1 className="start-title">
        물·불꽃·번개…
        <br />
        나는 어떤 호흡의 검사일까?
      </h1>
      <p className="start-lead">
        먼저 뛰어드는 편인지, 누구의 마음을 기준으로 삼는지, 감정을 어떻게
        드러내는지. <strong>행동 속도·판단 기준·감정 표현</strong> 세 가지로
        8명의 캐릭터 중 나와 가장 가까운 한 명을 찾아드려요.
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

      <ul className="cast" aria-label="만날 수 있는 캐릭터 미리보기">
        {RESULT_LIST.map((result) => (
          <li className="cast-item" key={result.id}>
            <span className="cast-icon" style={{ ["--accent" as string]: result.color }}>
              <CharacterImage id={result.id} />
            </span>
            <span className="cast-name">{result.title}</span>
            <span className="cast-mascot">{result.mascot}</span>
          </li>
        ))}
      </ul>
      <p className="cast-caption">귀여운 마스코트로 표현한 {RESULT_LIST.length}명의 캐릭터를 만나요</p>

      <ul className="meta-list" aria-label="테스트 안내">
        <li>
          <span className="meta-num">{QUESTIONS.length}</span>문항
        </li>
        <li>
          <span className="meta-num">약 2</span>분
        </li>
        <li>
          <span className="meta-num">{RESULT_LIST.length}</span>명의 캐릭터
        </li>
      </ul>

      <button type="button" className="btn btn-primary" onClick={onStart}>
        테스트 시작하기
      </button>

      <KakaoAdFitBanner placement="start" />

      <nav className="footer-links" aria-label="정보">
        <button type="button" className="link-btn" onClick={onShowPrivacy}>
          개인정보처리방침 · 광고/제휴 안내
        </button>
      </nav>
    </main>
  );
}
