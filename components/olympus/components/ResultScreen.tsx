import { useRef, useState } from "react";
import type { Outcome, TestResult } from "../types";
import { AXIS_LABELS, AXIS_ORDER } from "../lib/axis";
import { rankedAxes } from "../lib/scoring";
import { downloadResultImage, shareResult, shareUrl } from "../lib/share";
import { GodIcon } from "./GodIcon";
import { KakaoAdFitBanner } from "./ads/KakaoAdFitBanner";
import { CoupangPartnerRecommendation } from "./ads/CoupangPartnerRecommendation";

type Props = {
  result: TestResult;
  /** 직접 테스트한 경우의 계산 결과. 공유 링크로 열린 소개 화면에서는 null. */
  outcome: Outcome | null;
  onRestart: () => void;
  onShowPrivacy: () => void;
};

function reasonText(outcome: Outcome): string {
  const [first, second] = rankedAxes(outcome.axes);
  return `이번 응답은 ${AXIS_LABELS[first]}·${AXIS_LABELS[second]} 성향이 가장 뚜렷했어요.`;
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
        <p className="eyebrow">나의 올림포스 캐릭터는</p>

        <section className="result-card" style={{ ["--accent" as string]: result.color }}>
          <div className="result-icon">
            <GodIcon id={result.id} size={112} title={`${result.title} 일러스트`} />
          </div>
          <h1 className="result-title">{result.title}</h1>
          <p className="result-subtitle">{result.subtitle}</p>
          <p className="result-summary">{result.summary}</p>
        </section>

        {outcome && (
          <>
            <section className="panel">
              <h2 className="panel-title">이 신이 나온 이유</h2>
              <p className="panel-text">{reasonText(outcome)}</p>
            </section>

            <section className="panel">
              <h2 className="panel-title">네 가지 축 점수</h2>
              <ul className="axis-list">
                {AXIS_ORDER.map((axis) => {
                  const item = outcome.axes[axis];
                  return (
                    <li className="axis-row" key={axis}>
                      <div className="axis-head">
                        <span className="axis-name">{AXIS_LABELS[axis]}</span>
                        <span className="axis-picked">{item.normalized.toFixed(1)} / 10</span>
                      </div>
                      <div className="axis-scale axis-scale--single">
                        <span className="axis-bar">
                          <span
                            className="axis-bar-fill"
                            style={{
                              width: `${Math.round((item.normalized / 10) * 100)}%`,
                              background: result.color,
                            }}
                          />
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

        <p className="capture-note">재미로 보는 올림포스 캐릭터 테스트 · 나는 어떤 신을 닮았을까?</p>
      </div>

      {outcome ? (
        <>
          <section className="panel secondary-panel">
            <h2 className="panel-title">잘 맞을 것 같은 유형</h2>
            <div className="secondary-row">
              <div
                className="secondary-char"
                style={{ ["--accent" as string]: outcome.goodMatch.color }}
              >
                <GodIcon id={outcome.goodMatch.id} size={48} />
              </div>
              <p className="panel-text">
                <strong>{outcome.goodMatch.title}</strong>
                <span className="secondary-sub"> · {outcome.goodMatch.subtitle}</span>
              </p>
            </div>
            <p className="panel-text panel-text--soft">
              내 응답과 축 점수 프로필이 가장 비슷한 신이에요. 신화 속 실제
              가족·연인 관계를 뜻하는 건 아니에요.
            </p>
          </section>

          <section className="panel secondary-panel">
            <h2 className="panel-title">가장 다른 성향의 유형</h2>
            <div className="secondary-row">
              <div
                className="secondary-char"
                style={{ ["--accent" as string]: outcome.differentMatch.color }}
              >
                <GodIcon id={outcome.differentMatch.id} size={48} />
              </div>
              <p className="panel-text">
                <strong>{outcome.differentMatch.title}</strong>
                <span className="secondary-sub"> · {outcome.differentMatch.subtitle}</span>
              </p>
            </div>
            <p className="panel-text panel-text--soft">
              내 응답과 축 점수 프로필이 가장 먼 신이에요. 서로 다른 만큼 배울
              점을 찾아볼 수 있어요.
            </p>
          </section>
        </>
      ) : (
        <p className="shared-note">
          공유 링크로 열린 <strong>유형 소개</strong> 화면이에요. 내 결과를 보려면
          아래에서 직접 테스트해 보세요. (개인 응답과 점수는 저장·전송되지 않아요.)
        </p>
      )}

      <section className="panel">
        <h2 className="panel-title">신화 속 모습</h2>
        <p className="panel-text">{result.mythNote}</p>
      </section>

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
        <h2 className="panel-title">다음에 해보면 좋아요</h2>
        <ul className="bullet-list bullet-tip">
          {result.tips.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </section>

      <p className="limit-note">
        이번 응답에서는 이 신과 가장 가까웠어요. 신 프로필은 신화 이미지를
        참고해 재해석한 창작 콘텐츠이며, 이 결과는 재미로 즐기는
        엔터테인먼트예요.
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
