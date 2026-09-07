import { useState } from "react";

type Props = {
  step: number;
  totalSteps: number;
  title: string;
  hint: string;
  options: string[];
  selected: string | null;
  customLabel: string;
  customPlaceholder: string;
  customMaxLength: number;
  onSelect: (value: string) => void;
  onBack: () => void;
};

/** 성씨·본관 선택 화면. 목록 선택 또는 '직접 입력'으로 값을 고른다. */
export function PickScreen({
  step,
  totalSteps,
  title,
  hint,
  options,
  selected,
  customLabel,
  customPlaceholder,
  customMaxLength,
  onSelect,
  onBack,
}: Props) {
  const isCustomSelected = selected != null && !options.includes(selected);
  const [customOpen, setCustomOpen] = useState(isCustomSelected);
  const [customText, setCustomText] = useState(isCustomSelected ? selected : "");

  const percent = Math.round((step / totalSteps) * 100);

  const submitCustom = () => {
    const trimmed = customText.trim();
    if (!trimmed) return;
    onSelect(trimmed);
  };

  return (
    <main className="screen quiz-screen">
      <div className="quiz-top">
        <button type="button" className="icon-btn" onClick={onBack}>
          <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path
              d="M15 5 L8 12 L15 19"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          이전
        </button>
        <p className="progress-text" aria-live="polite">
          <span className="progress-current">{step}</span> / {totalSteps}
        </p>
      </div>

      <div
        className="progress-track"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={totalSteps}
        aria-valuenow={step}
        aria-label={`전체 ${totalSteps}단계 중 ${step}번째`}
      >
        <div className="progress-fill" style={{ width: `${percent}%` }} />
      </div>

      <p className="quiz-hint">{hint}</p>
      <h2 className="quiz-question">{title}</h2>

      <div className="pick-grid" role="radiogroup" aria-label={title}>
        {options.map((option) => {
          const active = !customOpen && selected === option;
          return (
            <button
              type="button"
              key={option}
              role="radio"
              aria-checked={active}
              className={`pick-chip${active ? " is-active" : ""}`}
              onClick={() => {
                setCustomOpen(false);
                onSelect(option);
              }}
            >
              {option}
            </button>
          );
        })}
        <button
          type="button"
          role="radio"
          aria-checked={customOpen}
          className={`pick-chip pick-chip-custom${customOpen ? " is-active" : ""}`}
          onClick={() => setCustomOpen(true)}
        >
          {isCustomSelected ? selected : customLabel}
        </button>
      </div>

      {customOpen && (
        <div className="custom-input-row">
          <input
            type="text"
            className="custom-input"
            placeholder={customPlaceholder}
            value={customText}
            maxLength={customMaxLength}
            onChange={(e) => setCustomText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") submitCustom();
            }}
            autoFocus
          />
          <button type="button" className="btn btn-primary custom-submit" onClick={submitCustom}>
            확인
          </button>
        </div>
      )}

      <p className="quiz-note">고른 값은 언제든 &lsquo;이전&rsquo;으로 돌아가 바꿀 수 있어요.</p>
    </main>
  );
}
