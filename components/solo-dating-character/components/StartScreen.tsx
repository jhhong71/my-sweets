import type { NameSet } from "../types";
import { QUESTIONS } from "../data/questions";
import { resultsOf } from "../data/results";
import { AXIS_ORDER, AXIS_LABELS, POLE_LABELS } from "../lib/axis";
import { CharacterImage } from "./CharacterImage";
import { KakaoAdFitBanner } from "./ads/KakaoAdFitBanner";

type Props = {
  nameSet: NameSet;
  onChangeSet: (set: NameSet) => void;
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

export function StartScreen({ nameSet, onChangeSet, onStart, onShowPrivacy }: Props) {
  const cast = resultsOf(nameSet);
  // 대표 이미지는 항상 해당 이름표 세트의 첫 번째 캐릭터를 쓴다.
  const hero = cast[0];

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
            <CharacterImage
              id={hero.id}
              size={158}
              title={`솔로 캐릭터 테스트 대표 이미지 (${hero.name})`}
            />
          </div>
        </div>
      </div>

      <p className="eyebrow">솔로 캐릭터 테스트</p>
      <h1 className="start-title">
        나는 어떤
        <br />
        솔로 캐릭터일까?
      </h1>
      <p className="start-lead">
        새로운 사람들과 서로를 알아가는 자리에서의 나를 떠올리며 답해보세요.{" "}
        <strong>감정 속도·표현 방식·선택 기준</strong> 세 가지 축으로, 6명의
        캐릭터 중 나와 가장 가까운 이름표를 찾아드려요.
      </p>

      <fieldset className="set-picker">
        <legend className="set-picker-legend">받고 싶은 이름표를 골라주세요</legend>
        <div className="set-options" role="radiogroup" aria-label="이름표 세트 선택">
          {(["male", "female"] as NameSet[]).map((option) => {
            const active = nameSet === option;
            return (
              <button
                key={option}
                type="button"
                role="radio"
                aria-checked={active}
                className={`set-option${active ? " is-active" : ""}`}
                onClick={() => onChangeSet(option)}
              >
                <span className="set-option-name">
                  {option === "male" ? "남자 이름표" : "여자 이름표"}
                </span>
                <span className="set-option-sub">
                  {option === "male" ? "영수 · 영호 · 영식 …" : "영숙 · 정숙 · 옥순 …"}
                </span>
                {/* 자리를 항상 차지하게 두어 선택 시 레이아웃이 흔들리지 않게 한다 */}
                <span className="set-option-state" aria-hidden={!active}>
                  선택함
                </span>
              </button>
            );
          })}
        </div>
      </fieldset>

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
        {cast.map((result) => (
          <li className="cast-item" key={result.id}>
            <span className="cast-icon">
              <CharacterImage id={result.id} size={58} />
            </span>
            <span className="cast-name">{result.name}</span>
          </li>
        ))}
      </ul>
      <p className="cast-caption">이런 {cast.length}명의 캐릭터를 만나요</p>

      <ul className="meta-list" aria-label="테스트 안내">
        <li>
          <span className="meta-num">{QUESTIONS.length}</span>문항
        </li>
        <li>
          <span className="meta-num">약 2</span>분
        </li>
        <li>
          <span className="meta-num">{cast.length}</span>가지 캐릭터
        </li>
      </ul>

      <button type="button" className="btn btn-primary" onClick={onStart}>
        테스트 시작하기
      </button>

      <KakaoAdFitBanner placement="start" />

      <p className="disclaimer">
        이 테스트는 데이팅 예능에서 흔히 보이는 연애 성향 유형을 참고해 만든
        <strong> 비공식 엔터테인먼트 콘텐츠</strong>입니다. 특정 방송 프로그램·
        출연자·제작사와 관련이 없으며, 과학적 성격검사나 심리 진단을 목적으로
        하지 않습니다.
      </p>

      <nav className="footer-links" aria-label="정보">
        <button type="button" className="link-btn" onClick={onShowPrivacy}>
          개인정보처리방침 · 광고/제휴 안내
        </button>
      </nav>
    </main>
  );
}
