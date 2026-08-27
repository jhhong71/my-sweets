import { useEffect } from "react";

type Props = {
  onDone: () => void;
};

export function CalculatingScreen({ onDone }: Props) {
  useEffect(() => {
    const timer = window.setTimeout(onDone, 1100);
    return () => window.clearTimeout(timer);
  }, [onDone]);

  return (
    <main className="screen calc-screen" aria-live="polite">
      <div className="calc-spinner" aria-hidden="true">
        <span className="calc-arc calc-arc--a" />
        <span className="calc-arc calc-arc--b" />
      </div>
      <p className="calc-text">아침 준비 유형을 정리하고 있어요…</p>
      <p className="calc-sub">준비 리듬·정보 습관·컨디션 대응을 맞춰보는 중이에요.</p>
    </main>
  );
}
