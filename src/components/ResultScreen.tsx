import { useRef, useState } from "react";
import type { Axis, AxisScores, ScoreOutcome } from "../types";
import { AXIS_LABELS, AXIS_DESCRIPTIONS } from "../lib/axis";
import { rankedAxes } from "../lib/scoring";
import { generateResult } from "../lib/generate";
import { downloadResultImage, shareResult } from "../lib/share";
import { SnackImage } from "./SnackImage";
import { KakaoAdFitBanner } from "./ads/KakaoAdFitBanner";
import { CoupangPartnerRecommendation } from "./ads/CoupangPartnerRecommendation";

type Props = {
  outcome: ScoreOutcome;
  sharedPreview: boolean;
  onRestart: () => void;
  onShowPrivacy: () => void;
};

/** 1·2위 성향을 바탕으로 이 결과가 나온 이유를 문장으로 만든다. */
function reasonText(scores: AxisScores, primary: Axis, second: Axis): string {
  return `${AXIS_LABELS[primary]}(${scores[primary]})이 가장 높고, ${AXIS_LABELS[second]}(${scores[second]})이 뒤를 이었어요. 이 두 성향이 지금의 나를 잘 보여줬어요.`;
}

export function ResultScreen({ outcome, sharedPreview, onRestart, onShowPrivacy }: Props) {
  const { primary, secondary, scores, rawScores, primaryTrait, secondaryTrait } = outcome;
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [shareMsg, setShareMsg] = useState<string | null>(null);
  const [openAxis, setOpenAxis] = useState<Axis | null>(null);
  const captureRef = useRef<HTMLDivElement>(null);

  const handleSave = async () => {
    if (saving || !captureRef.current) return;
    setSaving(true);
    setSaveError(null);
    // 펼친 축 설명을 닫아 캡처가 깔끔하고 높이 계산이 정확하게 되도록 한다.
    setOpenAxis(null);
    await new Promise((r) => setTimeout(r, 30));
    try {
      await downloadResultImage(captureRef.current, primary.id);
    } catch {
      setSaveError("이미지 저장에 실패했어요. 잠시 후 다시 시도해 주세요.");
    } finally {
      setSaving(false);
    }
  };

  const handleShare = async () => {
    setShareMsg(null);
    const outcomeResult = await shareResult(primary);
    if (outcomeResult === "copied") {
      setShareMsg("링크를 클립보드에 복사했어요. 붙여넣기로 공유해 주세요.");
    } else if (outcomeResult === "failed") {
      const url = `${window.location.origin}${window.location.pathname}?result=${primary.id}`;
      setShareMsg(`공유를 완료하지 못했어요. 아래 주소를 직접 복사해 주세요: ${url}`);
    }
  };

  const ranked = rankedAxes(scores);
  // 공유 미리보기는 실제 응답 점수가 없으므로 기본 간식 이름만 쓴다.
  const generated = sharedPreview
    ? null
    : generateResult(primaryTrait, secondaryTrait, rawScores[secondaryTrait]);
  const displayTitle = generated ? generated.title : primary.title;

  return (
    <main className="screen result-screen">
      {/* 저장 이미지로 캡처되는 영역 — 결과 콘텐츠 전체(카드~팁)를 담고,
          광고·제휴·버튼은 포함하지 않는다. */}
      <div ref={captureRef} className="result-capture">
        <p className="eyebrow">나와 가장 닮은 간식은</p>

        <section className="result-card" style={{ ["--accent" as string]: primary.color }}>
          <div className="result-icon">
            <SnackImage
              id={primary.id}
              imageKey={generated?.imageKey}
              size={128}
              title={`${displayTitle} 일러스트`}
            />
          </div>
          <h1 className="result-title">{displayTitle}</h1>
          <p className="result-subtitle">{primary.subtitle}</p>
          <p className="result-summary">{primary.summary}</p>
        </section>

        {!sharedPreview && (
          <>
            <section className="panel">
              <h2 className="panel-title">이 간식이 나온 이유</h2>
              <p className="panel-text">{reasonText(scores, primaryTrait, secondaryTrait)}</p>
            </section>

            <section className="panel">
              <h2 className="panel-title">성향 점수 (100점 환산)</h2>
              <ul className="axis-list">
                {ranked.map((axis) => {
                  const ratio = Math.max(0, Math.min(1, scores[axis] / 100));
                  const open = openAxis === axis;
                  return (
                    <li className="axis-row" key={axis}>
                      <div className="axis-row-main">
                        <span className="axis-name">{AXIS_LABELS[axis]}</span>
                        <span className="axis-bar" aria-hidden="true">
                          <span
                            className="axis-bar-fill"
                            style={{ width: `${ratio * 100}%`, background: primary.color }}
                          />
                        </span>
                        <span className="axis-value">{scores[axis]}</span>
                        <button
                          type="button"
                          className="axis-info-btn no-capture"
                          aria-label={`${AXIS_LABELS[axis]} 설명`}
                          aria-expanded={open}
                          onClick={() => setOpenAxis(open ? null : axis)}
                        >
                          <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true">
                            <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
                            <circle cx="12" cy="8" r="1.35" fill="currentColor" />
                            <rect x="11" y="11" width="2" height="6.5" rx="1" fill="currentColor" />
                          </svg>
                        </button>
                      </div>
                      {open && (
                        <p className="axis-desc no-capture">{AXIS_DESCRIPTIONS[axis]}</p>
                      )}
                    </li>
                  );
                })}
              </ul>
              <p className="axis-note">
                다섯 성향은 각각 0~100점으로 따로 매겨져요. 서로 점수를 빼앗지
                않으며, 다른 사람과 비교한 백분위·순위도 아니에요.
              </p>
            </section>
          </>
        )}

      {sharedPreview ? (
        <p className="shared-note">
          공유 링크로 열린 <strong>간식 소개</strong> 화면이에요. 내 결과를 보려면
          아래에서 직접 테스트해 보세요. (개인 응답 점수는 저장·전송되지 않아요.)
        </p>
      ) : (
        <section className="panel secondary-panel">
          <h2 className="panel-title">두 번째로 닮은 간식</h2>
          <div className="secondary-row">
            <div className="secondary-char" style={{ ["--accent" as string]: secondary.color }}>
              <SnackImage id={secondary.id} size={58} title={`${secondary.title} 일러스트`} />
            </div>
            <p className="panel-text">
              <strong>{secondary.title}</strong>
              <span className="secondary-sub"> · {secondary.subtitle}</span>
            </p>
          </div>
          <p className="panel-text panel-text--soft">{primary.relations}</p>
        </section>
      )}

      <section className="panel">
        <h2 className="panel-title">이 간식의 매력</h2>
        <ul className="bullet-list bullet-good">
          {primary.strengths.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </section>

      <section className="panel">
        <h2 className="panel-title">살짝 주의하면 좋은 점</h2>
        <ul className="bullet-list bullet-care">
          {primary.cautions.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </section>

      <section className="panel">
        <h2 className="panel-title">이렇게 해보면 좋아요</h2>
        <ul className="bullet-list bullet-tip">
          {primary.tips.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </section>

      <p className="limit-note">
        현재 응답에서는 이 간식과 가장 가까웠어요. 사람은 상황과 기분에 따라 다른
        모습을 보이며, 이 결과는 재미로 즐기는 엔터테인먼트예요.
      </p>

        <p className="capture-note">재미로 보는 취향 테스트 · 나는 어떤 간식?</p>
      </div>

      <div className="action-row">
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSave}
          disabled={saving}
        >
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
        다시 테스트하기
      </button>

      <CoupangPartnerRecommendation resultId={primary.id} />

      <nav className="footer-links" aria-label="정보">
        <button type="button" className="link-btn" onClick={onShowPrivacy}>
          개인정보처리방침 · 광고/제휴 안내
        </button>
      </nav>
    </main>
  );
}
