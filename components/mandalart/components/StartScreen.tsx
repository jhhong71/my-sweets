import { useState } from "react";
import type { ThemeId } from "../types";
import { THEMES } from "../data/themes";
import { KakaoAdFitBanner } from "./ads/KakaoAdFitBanner";
import { Bow, Daisy, Heart, Kitty, Sparkle, Strawberry, Teacup } from "./Decorations";

type Props = {
  owner: string;
  onOwnerChange: (value: string) => void;
  themeId: ThemeId;
  onThemeChange: (value: ThemeId) => void;
  hasDraft: boolean;
  onStart: () => void;
  onContinue: () => void;
  onLoadPreset: () => void;
};

const STEPS = [
  { icon: "1", title: "한가운데 목표 하나", desc: "올해 제일 이루고 싶은 걸 적어요" },
  { icon: "2", title: "둘러싼 세부 목표 8개", desc: "목표를 이루는 갈래를 나눠요" },
  { icon: "3", title: "실천 과제 64개", desc: "오늘 할 수 있는 크기로 쪼개요" },
];

export function StartScreen({
  owner,
  onOwnerChange,
  themeId,
  onThemeChange,
  hasDraft,
  onStart,
  onContinue,
  onLoadPreset,
}: Props) {
  const [touched, setTouched] = useState(false);

  return (
    <div className="screen start-screen">
      <header className="hero">
        <div className="hero-badge">
          <Sparkle size={14} /> 81칸 목표 계획표 <Sparkle size={14} />
        </div>
        <h1 className="hero-title">
          말랑
          <span className="hero-title-accent">만다라트</span>
        </h1>
        <p className="hero-sub">
          커다란 목표 하나를 여덟 갈래로 펼치고,
          <br />
          다시 예순네 개의 작은 일로 쪼개는 계획표예요.
        </p>
        <div className="hero-icons">
          <span className="deco deco-cup">
            <Teacup size={34} />
          </span>
          <span className="deco deco-kitty">
            <Kitty size={40} />
          </span>
          <span className="deco deco-berry">
            <Strawberry size={30} />
          </span>
          <span className="deco deco-daisy">
            <Daisy size={26} />
          </span>
        </div>
      </header>

      <section className="card name-card">
        <label className="field-label" htmlFor="owner">
          <Bow size={18} /> 누구의 만다라트인가요?
        </label>
        <div className="name-row">
          <input
            id="owner"
            className="name-input"
            type="text"
            value={owner}
            maxLength={12}
            placeholder="닉네임"
            onChange={(e) => onOwnerChange(e.target.value)}
            onBlur={() => setTouched(true)}
          />
          <span className="name-suffix">의 만다라트</span>
        </div>
        {touched && !owner.trim() && (
          <p className="field-hint">비워 두면 &lsquo;나의 만다라트&rsquo;로 만들어져요.</p>
        )}
      </section>

      <section className="card theme-card">
        <p className="field-label">
          <Heart size={16} /> 어떤 분야의 목표인가요?
        </p>
        <div className="theme-grid">
          {THEMES.map((t) => (
            <button
              key={t.id}
              type="button"
              className={`theme-chip${themeId === t.id ? " is-selected" : ""}`}
              onClick={() => onThemeChange(t.id)}
              aria-pressed={themeId === t.id}
            >
              <span className="theme-emoji">{t.emoji}</span>
              <span className="theme-label">{t.label}</span>
              <span className="theme-hint">{t.hint}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="card steps-card">
        <p className="field-label">
          <Daisy size={16} /> 이렇게 채워요
        </p>
        <ol className="steps">
          {STEPS.map((s) => (
            <li key={s.icon} className="step">
              <span className="step-num">{s.icon}</span>
              <span className="step-body">
                <b>{s.title}</b>
                <small>{s.desc}</small>
              </span>
            </li>
          ))}
        </ol>
      </section>

      <div className="cta-area">
        {hasDraft && (
          <button type="button" className="btn btn-primary" onClick={onContinue}>
            이어서 작성하기
          </button>
        )}
        <button
          type="button"
          className={hasDraft ? "btn btn-ghost" : "btn btn-primary"}
          onClick={onStart}
        >
          {hasDraft ? "새로 시작하기" : "만다라트 시작하기"}
        </button>
        <button type="button" className="btn btn-soft" onClick={onLoadPreset}>
          예시로 채워서 시작하기
        </button>
      </div>

      <KakaoAdFitBanner placement="start" />

      <p className="privacy-note">
        작성한 내용은 이 브라우저에만 저장되고 서버로 보내지 않아요.
      </p>
    </div>
  );
}
