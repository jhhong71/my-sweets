import { useEffect, useState } from "react";
import { QUESTIONS } from "../data/questions";

const LIKERT_LABELS = [
  "전혀 그렇지 않다",
  "그렇지 않은 편이다",
  "보통이다",
  "그런 편이다",
  "매우 그렇다",
];

type Props = {
  currentIndex: number;
  selected: number | undefined;
  onAnswer: (value: number) => void;
  onBack: () => void;
};

export function QuizScreen({ currentIndex, selected, onAnswer, onBack }: Props) {
  const question = QUESTIONS[currentIndex];
  const [entered, setEntered] = useState(false);
  const ratio = (currentIndex + 1) / QUESTIONS.length;

  useEffect(() => {
    setEntered(false);
    const t = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(t);
  }, [currentIndex]);

  return (
    <div className="screen quiz-screen">
      <div className="quiz-top">
        <button
          className="btn-back"
          onClick={onBack}
          aria-label={currentIndex === 0 ? "처음으로" : "이전 질문"}
        >
          ← {currentIndex === 0 ? "처음" : "이전"}
        </button>
        <span className="quiz-counter">
          <strong>{String(currentIndex + 1).padStart(2, "0")}</strong>
          <em>/ {QUESTIONS.length}</em>
        </span>
      </div>

      <div
        className="progress-pill"
        role="progressbar"
        aria-valuenow={currentIndex + 1}
        aria-valuemin={1}
        aria-valuemax={QUESTIONS.length}
        aria-label={`전체 ${QUESTIONS.length}문항 중 ${currentIndex + 1}번째`}
      >
        <div className="progress-pill-fill" style={{ width: `${ratio * 100}%` }} />
        <span className="progress-pill-badge" style={{ left: `${ratio * 100}%` }} aria-hidden="true" />
      </div>

      <div className={`quiz-body ${entered ? "entered" : ""}`}>
        <fieldset className="quiz-fieldset">
          <legend className="quiz-text">{question.text}</legend>

          <div className="scale-block">
            <div className="scale-row" role="radiogroup" aria-label={question.text}>
              {LIKERT_LABELS.map((label, idx) => {
                const value = idx + 1;
                const checked = selected === value;
                return (
                  <label
                    key={value}
                    className={`scale-option ${checked ? "is-checked" : ""}`}
                    data-size={Math.abs(3 - value)}
                  >
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={value}
                      checked={checked}
                      onChange={() => onAnswer(value)}
                      aria-label={label}
                    />
                    <span
                      className={`scale-mark ${checked ? "is-checked" : ""}`}
                      aria-hidden="true"
                    >
                      {checked ? "✓" : value}
                    </span>
                  </label>
                );
              })}
            </div>

            <div className="scale-ends" aria-hidden="true">
              <span>{LIKERT_LABELS[0]}</span>
              <span>{LIKERT_LABELS[LIKERT_LABELS.length - 1]}</span>
            </div>

            <p className="scale-readout" role="status">
              {selected ? (
                <>
                  선택한 답변 · <strong>{LIKERT_LABELS[selected - 1]}</strong>
                </>
              ) : (
                "가장 가까운 정도를 선택해 주세요"
              )}
            </p>
          </div>
        </fieldset>
      </div>
    </div>
  );
}
