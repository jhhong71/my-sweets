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
      <p className="calc-text">새 동료 첫인사 유형을 정리하고 있어요…</p>
      <p className="calc-sub">접근 방식·질문 방식·친밀감 형성 속도를 맞춰보는 중이에요.</p>
    </main>
  );
}
