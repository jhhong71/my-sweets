import { useEffect, useRef } from "react";
import { QUESTIONS } from "../data/questions";

type Props = {
  currentIndex: number;
  selected: number | null | undefined;
  onAnswer: (choiceIndex: number) => void;
  onBack: () => void;
};

export function QuizScreen({ currentIndex, selected, onAnswer, onBack }: Props) {
  const question = QUESTIONS[currentIndex];
  const total = QUESTIONS.length;
  const step = currentIndex + 1;
  const percent = Math.round((step / total) * 100);

  // 빠른 중복 클릭으로 다음 문항이 건너뛰어지는 것을 막는다.
  // 문항이 바뀌면 잠금을 풀고, 한 문항당 한 번만 응답을 전달한다.
  const locked = useRef(false);
  useEffect(() => {
    locked.current = false;
  }, [currentIndex]);

  const handleAnswer = (index: number) => {
    if (locked.current) return;
    locked.current = true;
    onAnswer(index);
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
          <span className="progress-current">{step}</span> / {total}
        </p>
      </div>

      <div
        className="progress-track"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={step}
        aria-label={`전체 ${total}문항 중 ${step}번째`}
      >
        <div className="progress-fill" style={{ width: `${percent}%` }} />
      </div>

      <p className="quiz-hint">출근 준비를 하는 평소의 나를 떠올려 보세요.</p>

      <h2 className="quiz-question">{question.text}</h2>

      <fieldset className="choices" role="radiogroup" aria-label={question.text}>
        <legend className="sr-only">{question.text}에 대한 응답</legend>
        {question.choices.map((choice, index) => {
          const active = selected === index;
          return (
            <button
              type="button"
              key={`${question.id}-${index}`}
              role="radio"
              aria-checked={active}
              className={`choice-option${active ? " is-active" : ""}`}
              onClick={() => handleAnswer(index)}
            >
              <span className="choice-mark" aria-hidden="true" />
              <span className="choice-label">{choice.label}</span>
              {active && <span className="choice-state">선택함</span>}
            </button>
          );
        })}
      </fieldset>

      <p className="quiz-note">
        고른 답은 언제든 &lsquo;이전&rsquo;으로 돌아가 바꿀 수 있어요.
      </p>
    </main>
  );
}
