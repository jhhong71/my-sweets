import { useRef, useState } from "react";
import type { Outcome, ResultProfile } from "../types";
import { AXIS_LABELS, AXIS_ORDER, POLE_LABELS } from "../lib/axis";
import { downloadResultImage, shareResult, shareUrl } from "../lib/share";
import { CharacterImage } from "./CharacterImage";
import { KakaoAdFitBanner } from "./ads/KakaoAdFitBanner";
import { CoupangPartnerRecommendation } from "./ads/CoupangPartnerRecommendation";

type Props = {
  result: ResultProfile;
  /** 직접 테스트한 경우의 계산 결과. 공유 링크로 열린 소개 화면에서는 null. */
  outcome: Outcome | null;
  onRestart: () => void;
  onShowPrivacy: () => void;
};

const POLE_PHRASES: Record<string, { high: string; low: string }> = {
  approach: { high: "내가 먼저 다가가는 편", low: "상대가 다가올 때까지 기다리는 편" },
  curiosity: { high: "궁금한 점을 직접 물어보는 편", low: "시간을 두고 자연스럽게 알아가는 편" },
  warmth: { high: "금방 편하게 대하는 편", low: "예의를 갖추며 천천히 거리를 좁히는 편" },
};

function reasonText(outcome: Outcome): string {
  const phrases = AXIS_ORDER.map(
    (axis) => POLE_PHRASES[axis][outcome.axes[axis].pole],
  );
  return `이번 응답은 ${phrases.join(", ")}에 가까웠어요.`;
}

/**
 * 궁합 유형은 접근 방식만 반대이고 질문 방식·친밀감 형성 속도는 나와 같은 유형이다.
 * (src/lib/scoring.ts의 compatiblePoles 참고)
 */
function compatibilityReasonText(outcome: Outcome): string {
  const curiosityLabel = POLE_LABELS.curiosity[outcome.axes.curiosity.pole];
  const warmthLabel = POLE_LABELS.warmth[outcome.axes.warmth.pole];
  return `접근 방식은 나와 반대라서 누가 먼저 다가갈지 자연스럽게 정해지고, 질문 방식(${curiosityLabel})과 친밀감 형성 속도(${warmthLabel})는 나와 같아서 알아가는 리듬이 잘 맞아요.`;
}

export function ResultScreen({ result, outcome, onRestart, onShowPrivacy }: Props) {
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [shareMsg, setShareMsg] = useState<string | null>(null);
  const captureRef = useRef<HTMLDivElement>(null);

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
    const shared = await shareResult(result);
    if (shared === "copied") {
      setShareMsg("링크를 클립보드에 복사했어요. 붙여넣기로 공유해 주세요.");
    } else if (shared === "failed") {
      setShareMsg(`공유를 완료하지 못했어요. 아래 주소를 직접 복사해 주세요: ${shareUrl(result)}`);
    }
    // "shared"(공유 완료)와 "cancelled"(사용자가 공유 창을 닫음)는 안내를 띄우지 않는다.
  };

  return (
    <main className="screen result-screen">
      {/* 저장 이미지로 캡처되는 영역 — 광고·제휴·버튼은 포함하지 않는다. */}
      <div ref={captureRef} className="result-capture">
        <p className="eyebrow">나의 새 동료 첫인사 유형은</p>

        <section className="result-card" style={{ ["--accent" as string]: result.color }}>
          <div className="result-icon">
            <CharacterImage id={result.id} size={240} title={`${result.title} 일러스트`} />
          </div>
          <h1 className="result-title">{result.title}</h1>
          <p className="result-subtitle">{result.subtitle}</p>
          <p className="result-summary">{result.summary}</p>
        </section>

        {outcome && (
          <>
            <section className="panel">
              <h2 className="panel-title">이 유형이 나온 이유</h2>
              <p className="panel-text">{reasonText(outcome)}</p>
            </section>

            <section className="panel">
              <h2 className="panel-title">세 가지 축 점수</h2>
              <ul className="axis-list">
                {AXIS_ORDER.map((axis) => {
                  const item = outcome.axes[axis];
                  const highLabel = POLE_LABELS[axis].high;
                  const lowLabel = POLE_LABELS[axis].low;
                  const pickedLabel = POLE_LABELS[axis][item.pole];
                  return (
                    <li className="axis-row" key={axis}>
                      <div className="axis-head">
                        <span className="axis-name">{AXIS_LABELS[axis]}</span>
                        <span className="axis-picked">{pickedLabel} 쪽</span>
                      </div>
                      <div className="axis-scale">
                        <span className="axis-pole">
                          {highLabel} {item.raw}
                        </span>
                        <span className="axis-bar">
                          <span
                            className="axis-bar-fill"
                            style={{
                              width: `${Math.round(item.ratio * 100)}%`,
                              background: result.color,
                            }}
                          />
                        </span>
                        <span className="axis-pole">
                          {item.total - item.raw} {lowLabel}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <p className="axis-note">
                점수는 이번 응답 안에서의 위치일 뿐, 다른 사람과 비교한 백분위나
                순위가 아니에요.
              </p>
            </section>
          </>
        )}

        <p className="capture-note">재미로 보는 새 동료 첫인사 스타일 테스트 · 나는 새 동료를 어떻게 맞이할까?</p>
      </div>

      {outcome ? (
        <section className="panel secondary-panel">
          <h2 className="panel-title">나와 궁합이 맞는 유형</h2>
          <div className="secondary-row">
            <div
              className="secondary-char"
              style={{ ["--accent" as string]: outcome.compatible.color }}
            >
              <CharacterImage id={outcome.compatible.id} size={140} />
            </div>
            <p className="panel-text">
              <strong>{outcome.compatible.title}</strong>
              <span className="secondary-sub"> · {outcome.compatible.subtitle}</span>
            </p>
          </div>
          <p className="panel-text panel-text--soft">{compatibilityReasonText(outcome)}</p>
        </section>
      ) : (
        <p className="shared-note">
          공유 링크로 열린 <strong>유형 소개</strong> 화면이에요. 내 결과를 보려면
          아래에서 직접 테스트해 보세요. (개인 응답과 점수는 저장·전송되지 않아요.)
        </p>
      )}

      <section className="panel">
        <h2 className="panel-title">이 유형의 강점</h2>
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
        <h2 className="panel-title">다음에 새 동료를 만나면 해보면 좋아요</h2>
        <ul className="bullet-list bullet-tip">
          {result.tips.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </section>

      <p className="limit-note">
        이번 응답에서는 이 유형과 가장 가까웠어요. 새 동료를 대하는 모습은
        그날의 분위기나 상대와의 관계에 따라 달라질 수 있고, 이 결과는
        재미로 즐기는 엔터테인먼트예요.
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
        다시 테스트하기
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
