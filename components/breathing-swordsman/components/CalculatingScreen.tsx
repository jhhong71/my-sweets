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
      <p className="calc-text">나와 닮은 캐릭터를 찾고 있어요…</p>
      <p className="calc-sub">행동 속도·판단 기준·감정 표현을 맞춰보는 중이에요.</p>
    </main>
  );
}
