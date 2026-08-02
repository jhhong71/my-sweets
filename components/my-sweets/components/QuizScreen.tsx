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

  return (
    <main className="screen quiz-screen">
      <div className="quiz-top">
        <button type="button" className="icon-btn" onClick={onBack} aria-label="이전으로">
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
        aria-label={`${total}문항 중 ${step}번째`}
      >
        <div className="progress-fill" style={{ width: `${percent}%` }} />
      </div>

      <p className="quiz-hint">평소 나의 모습에 가장 가까운 걸 골라 보세요.</p>

      <h2 className="quiz-question">{question.situation}</h2>

      <fieldset className="likert" role="radiogroup" aria-label={question.situation}>
        <legend className="sr-only">{question.situation}에 대한 응답</legend>
        {question.options.map((option, index) => {
          const active = selected === index;
          return (
            <button
              type="button"
              key={index}
              role="radio"
              aria-checked={active}
              className={`likert-option${active ? " is-active" : ""}`}
              onClick={() => onAnswer(index)}
            >
              <span className="likert-mark" aria-hidden="true" />
              <span className="likert-label">{option.text}</span>
            </button>
          );
        })}
      </fieldset>
    </main>
  );
}
