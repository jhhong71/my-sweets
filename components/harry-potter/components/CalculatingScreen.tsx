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
      <p className="calc-text">어떤 캐릭터와 가까운지 마법처럼 정리하고 있어요…</p>
      <p className="calc-sub">행동 방식·마음과 원칙·무리 속 위치를 맞춰보는 중이에요.</p>
    </main>
  );
}
