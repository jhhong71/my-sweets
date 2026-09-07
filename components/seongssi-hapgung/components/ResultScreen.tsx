import { useRef, useState } from "react";
import type { Outcome } from "../types";
import { AXIS_LABELS, AXIS_ORDER, POLE_LABELS } from "../lib/axis";
import { pairLabel } from "../lib/scoring";
import { scoreBandLabel } from "../data/results";
import { downloadResultImage, shareResult, shareUrl } from "../lib/share";
import { CharacterImage } from "./CharacterImage";
import { KakaoAdFitBanner } from "./ads/KakaoAdFitBanner";
import { CoupangPartnerRecommendation } from "./ads/CoupangPartnerRecommendation";

type Props = {
  outcome: Outcome;
  onRestart: () => void;
  onShowPrivacy: () => void;
};

export function ResultScreen({ outcome, onRestart, onShowPrivacy }: Props) {
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [shareMsg, setShareMsg] = useState<string | null>(null);
  const captureRef = useRef<HTMLDivElement>(null);

  const { input, score, axes, result } = outcome;
  const myLabel = pairLabel(input.mySurname, input.myBongwan);
  const partnerLabel = pairLabel(input.partnerSurname, input.partnerBongwan);
  const shareText = `${myLabel} × ${partnerLabel} 궁합 지수는 ${score}%, '${result.title}'! 너희 궁합도 확인해봐`;

  const handleSave = async () => {
    if (saving || !captureRef.current) return;
    setSaving(true);
    setSaveError(null);
    try {
      await downloadResultImage(captureRef.current, result.id);
    } catch {
      setSaveError("이미지 저장에 실패했어요. 잠시 후 다시 시도해 주세요.");
    } finally {
      setSaving(false);
    }
  };

  const handleShare = async () => {
    setShareMsg(null);
    const shared = await shareResult(input, shareText);
    if (shared === "copied") {
      setShareMsg("링크를 클립보드에 복사했어요. 붙여넣기로 공유해 주세요.");
    } else if (shared === "failed") {
      setShareMsg(`공유를 완료하지 못했어요. 아래 주소를 직접 복사해 주세요: ${shareUrl(input)}`);
    }
    // "shared"(공유 완료)와 "cancelled"(사용자가 공유 창을 닫음)는 안내를 띄우지 않는다.
  };

  return (
    <main className="screen result-screen">
      {/* 저장 이미지로 캡처되는 영역 — 광고·제휴·버튼은 포함하지 않는다. */}
      <div ref={captureRef} className="result-capture">
        <p className="eyebrow">
          {myLabel} × {partnerLabel} 궁합은
        </p>

        <section className="result-card" style={{ ["--accent" as string]: result.color }}>
          <div className="result-icon">
            <CharacterImage id={result.id} size={150} title={`${result.title} 일러스트`} />
          </div>
          <p className="score-band">{scoreBandLabel(score)}</p>
          <p className="score-number">
            {score}
            <span className="score-percent">%</span>
          </p>
          <h1 className="result-title">{result.title}</h1>
          <p className="result-subtitle">{result.subtitle}</p>
          <p className="result-summary">{result.summary}</p>
        </section>

        <section className="panel">
          <h2 className="panel-title">우리 사이의 기운</h2>
          <ul className="axis-chip-list">
            {AXIS_ORDER.map((axis) => (
              <li className="axis-chip-result" key={axis}>
                <span className="axis-chip-result-name">{AXIS_LABELS[axis]}</span>
                <span className="axis-chip-result-pole">{POLE_LABELS[axis][axes[axis]]}</span>
              </li>
            ))}
          </ul>
          <p className="axis-note">
            성씨·본관 조합으로 계산한 결과일 뿐, 실제 성격이나 관계를 판단하는
            기준이 아니에요.
          </p>
        </section>

        <p className="capture-note">재미로 보는 본관·성씨 궁합 테스트 · 우리 성씨 궁합은?</p>
      </div>

      <section className="panel">
        <h2 className="panel-title">이 케미의 강점</h2>
        <ul className="bullet-list bullet-good">
          {result.strengths.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </section>

      <section className="panel">
        <h2 className="panel-title">살짝 주의하면 좋은 점</h2>
        <ul className="bullet-list bullet-care">
          {result.cautions.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </section>

      <section className="panel">
        <h2 className="panel-title">둘이 함께 해보면 좋아요</h2>
        <ul className="bullet-list bullet-tip">
          {result.tips.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </section>

      <p className="limit-note">
        이 결과는 선택한 성씨·본관 조합으로 계산한 재미 콘텐츠예요. 실제 전통
        궁합법이나 족보에 근거하지 않으며, 관계의 좋고 나쁨을 가르는 기준이
        아니에요.
      </p>

      <div className="action-row">
        <button type="button" className="btn btn-primary" onClick={handleSave} disabled={saving}>
          {saving ? "저장 중…" : "결과 이미지 저장"}
        </button>
        <button type="button" className="btn btn-line" onClick={handleShare}>
          결과 공유하기
        </button>
      </div>
      {saveError && (
        <p className="feedback feedback-error" role="alert">
          {saveError}
        </p>
      )}
      {shareMsg && (
        <p className="feedback" role="status">
          {shareMsg}
        </p>
      )}

      <KakaoAdFitBanner placement="result" />

      <button type="button" className="btn btn-ghost" onClick={onRestart}>
        다시 궁합 보기
      </button>

      <CoupangPartnerRecommendation resultId={result.id} />

      <nav className="footer-links" aria-label="정보">
        <button type="button" className="link-btn" onClick={onShowPrivacy}>
          개인정보처리방침 · 광고/제휴 안내
        </button>
      </nav>
    </main>
  );
}
