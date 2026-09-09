import { useRef, useState } from "react";
import type { Axis, Outcome, ResultProfile } from "../types";
import { AXIS_LABELS, AXIS_ORDER, POLE_LABELS } from "../lib/axis";
import { downloadResultImage, shareResult, shareUrl } from "../lib/share";
import { rankedAxes } from "../lib/scoring";
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

const POLE_PHRASES: Record<Axis, { high: string; low: string }> = {
  pace: {
    high: "호감이 생기면 먼저 다가가는 편",
    low: "확신이 설 때까지 지켜보는 편",
  },
  spotlight: {
    high: "여럿 속에서 먼저 나서 표현하는 편",
    low: "조용히 스며들며 필요한 말을 하는 편",
  },
  basis: {
    high: "가치관과 조건이 맞는지를 먼저 보는 편",
    low: "함께 있을 때의 느낌을 먼저 믿는 편",
  },
};

function reasonText(outcome: Outcome): string {
  const phrases = AXIS_ORDER.map((axis) => POLE_PHRASES[axis][outcome.axes[axis].pole]);
  return `이번 응답은 ${phrases.join(", ")}에 가까웠어요.`;
}

/**
 * 잘 맞는 상대는 "표현 방식만 반대인 나"와 가까운 캐릭터이며,
 * 이번 응답에서 뚜렷하게 나온 축일수록 크게 반영해 고른다.
 * (src/lib/scoring.ts의 findMatch 참고)
 */
function matchReasonText(outcome: Outcome): string {
  const paceLabel = POLE_LABELS.pace[outcome.axes.pace.pole];
  const basisLabel = POLE_LABELS.basis[outcome.axes.basis.pole];
  return `표현 방식이 나와 반대라서 한 사람이 이끌면 한 사람이 받아주는 흐름이 자연스럽고, 감정 속도(${paceLabel})와 선택 기준(${basisLabel})은 나와 비슷해서 관계의 속도와 방향이 어긋나지 않아요.`;
}

/** 받침 유무에 맞는 조사를 붙인다 (예: 선택 기준 + 이 / 감정 속도 + 가) */
function withParticle(word: string, afterFinal: string, afterVowel: string): string {
  const code = word.charCodeAt(word.length - 1);
  const hasFinal = code >= 0xac00 && code <= 0xd7a3 && (code - 0xac00) % 28 !== 0;
  return word + (hasFinal ? afterFinal : afterVowel);
}

/** 궁합을 고를 때 어떤 축을 가장 크게 봤는지 알려주는 문장 */
function matchWeightText(outcome: Outcome): string {
  const [first, second] = rankedAxes(outcome.axes);
  return `이번 응답에서는 ${withParticle(AXIS_LABELS[first], "이", "가")} 가장 뚜렷하게 나와서 궁합을 볼 때 그 축을 가장 크게 반영했고, 그다음으로 ${withParticle(AXIS_LABELS[second], "을", "를")} 봤어요. 같은 캐릭터가 나와도 축 점수가 다르면 잘 맞는 상대는 달라질 수 있어요.`;
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
        <p className="eyebrow">내 솔로 캐릭터는</p>

        <section className="result-card" style={{ ["--accent" as string]: result.color }}>
          <div className="result-icon">
            <CharacterImage id={result.id} size={168} title={`${result.name} 캐릭터 일러스트`} />
          </div>
          <h1 className="result-title">
            {result.name} <span className="result-title-sub">· {result.title}</span>
          </h1>
          <p className="result-subtitle">{result.subtitle}</p>
          <p className="result-summary">{result.summary}</p>
        </section>

        {outcome && (
          <>
            <section className="panel">
              <h2 className="panel-title">이 캐릭터가 나온 이유</h2>
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

        <p className="capture-note">재미로 보는 솔로 캐릭터 테스트 · 나는 어떤 솔로 캐릭터일까?</p>
      </div>

      {outcome ? (
        <>
          <section className="panel secondary-panel">
            <h2 className="panel-title">두 번째로 가까운 캐릭터</h2>
            <div className="secondary-row">
              <div
                className="secondary-char"
                style={{ ["--accent" as string]: outcome.secondary.color }}
              >
                <CharacterImage id={outcome.secondary.id} size={58} />
              </div>
              <p className="panel-text">
                <strong>
                  {outcome.secondary.name} · {outcome.secondary.title}
                </strong>
                <span className="secondary-sub"> · {outcome.secondary.subtitle}</span>
              </p>
            </div>
            <p className="panel-text panel-text--soft">
              상황이나 상대에 따라 이 캐릭터의 모습이 나올 때도 있어요.
            </p>
          </section>

          <section className="panel secondary-panel">
            <h2 className="panel-title">잘 맞을 것 같은 상대</h2>
            <div className="secondary-row">
              <div
                className="secondary-char"
                style={{ ["--accent" as string]: outcome.match.color }}
              >
                <CharacterImage id={outcome.match.id} size={58} />
              </div>
              <p className="panel-text">
                <strong>
                  {outcome.match.name} · {outcome.match.title}
                </strong>
                <span className="secondary-sub"> · {outcome.match.subtitle}</span>
              </p>
            </div>
            <p className="panel-text panel-text--soft">{matchReasonText(outcome)}</p>
            <p className="panel-text panel-text--soft">{matchWeightText(outcome)}</p>
          </section>
        </>
      ) : (
        <p className="shared-note">
          공유 링크로 열린 <strong>캐릭터 소개</strong> 화면이에요. 내 결과를
          보려면 아래에서 직접 테스트해 보세요. (개인 응답과 점수는
          저장·전송되지 않아요.)
        </p>
      )}

      <section className="panel">
        <h2 className="panel-title">이 캐릭터의 매력</h2>
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
        이번 응답에서는 이 캐릭터와 가장 가까웠어요. 나의 모습은 그날의 기분이나
        상대에 따라 달라질 수 있고, 이 결과는 특정 방송 프로그램과 무관하게 재미로
        즐기는 엔터테인먼트예요.
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
