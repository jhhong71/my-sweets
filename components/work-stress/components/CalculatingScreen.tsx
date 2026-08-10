import { useEffect, useState } from "react";

const STEPS = [
  "16개 응답을 축별로 분류하는 중",
  "문제중심·감정중심, 접근·거리두기 축 평균을 계산하는 중",
  "가장 가까운 결과 유형을 찾는 중",
];

type Props = {
  onDone: () => void;
};

export function CalculatingScreen({ onDone }: Props) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((s) => (s < STEPS.length ? s + 1 : s));
    }, 700);
    const timer = setTimeout(onDone, 2200);
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onDone]);

  return (
    <div className="screen calc-screen">
      <p className="calc-caption">계산 중</p>
      <ol className="calc-steps">
        {STEPS.map((text, i) => {
          const state = i < step ? "done" : i === step ? "active" : "waiting";
          return (
            <li key={text} className={`calc-step is-${state}`}>
              <span className="calc-step-mark" aria-hidden="true">
                {state === "done" ? "✓" : String(i + 1).padStart(2, "0")}
              </span>
              <span className="calc-step-text">{text}</span>
            </li>
          );
        })}
      </ol>
      <p className="calc-status" role="status">
        {step < STEPS.length ? STEPS[step] : "결과를 정리하는 중"}
      </p>
    </div>
  );
}
