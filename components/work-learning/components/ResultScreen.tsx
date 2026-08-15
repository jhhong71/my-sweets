import { useState } from "react";
import type { ResultOutcome } from "../types";
import { AXIS_HIGH_LABEL, AXIS_ICON, AXIS_LOW_LABEL, AXIS_ORDER } from "../lib/axis";
import { downloadResultImage, shareResult } from "../lib/share";
import { RESULT_MAP } from "../data/results";
import { LearnIcon } from "./LearnIcon";
import { CardTab, Postmark } from "./Decor";
import { KakaoAdFitBanner } from "./ads/KakaoAdFitBanner";
import { CoupangPartnerRecommendation } from "./ads/CoupangPartnerRecommendation";

type Props = {
  outcome: ResultOutcome;
  sharedPreview: boolean;
  onRestart: () => void;
  onShowPrivacy: () => void;
};

function reasonText(outcome: ResultOutcome): string {
  const { scores, primary } = outcome;
  const concept = scores.concept.toFixed(1);
  const action = scores.action.toFixed(1);
  return `개념형·경험형 축 ${concept}점, 실행형·관찰형 축 ${action}점으로 계산된 두 축 조합이 '${primary.title}' 기준 프로필과 가장 가까워 이 결과가 나왔어요.`;
}

export function ResultScreen({ outcome, sharedPreview, onRestart, onShowPrivacy }: Props) {
  const { primary, scores } = outcome;
  const match = RESULT_MAP[primary.matchId];
  const [toast, setToast] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  const handleShare = async () => {
    const result = await shareResult(primary);
    if (result === "copied") showToast("링크가 복사되었어요!");
    else if (result === "failed") showToast("공유에 실패했어요. 링크를 직접 복사해 주세요.");
  };

  const handleSave = () => {
    if (saving) return;
    setSaving(true);
    try {
      downloadResultImage(primary, sharedPreview ? null : scores);
      showToast("결과 카드를 저장했어요!");
    } catch {
      showToast("이미지 저장에 실패했어요. 다시 시도해 주세요.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="screen result-screen">
      <article className="result-doc tab-card">
        <CardTab />
        <Postmark />
        <div className="doc-accent" style={{ backgroundColor: primary.color }} aria-hidden="true" />

        <header className="doc-head">
          <p className="doc-eyebrow">{sharedPreview ? "공유된 결과" : "나의 업무 학습 스타일"}</p>
          <div className="doc-headline">
            <span className="doc-icon">
              <LearnIcon iconKey={primary.iconKey} size={44} />
            </span>
            <div>
              <h1 className="doc-title">{primary.title}</h1>
              <p className="doc-subtitle">{primary.subtitle}</p>
            </div>
          </div>
        </header>

        <div className="doc-body">
          {sharedPreview && (
            <p className="doc-notice" role="note">
              공유된 링크로 대표 결과 설명만 보고 있어요. 실제 응답에 따른 축
              점수는 응답자마다 다르게 나타나므로 이 화면에는 표시하지
              않아요. 나만의 결과를 보려면 테스트를 직접 진행해 보세요.
            </p>
          )}

          <p className="doc-summary">{primary.summary}</p>

          {!sharedPreview && (
            <section className="doc-block">
              <h2 className="section-caption">행동 축 점수</h2>
              <ol className="axis-score-list">
                {AXIS_ORDER.map((axis) => {
                  const value = scores[axis];
                  const ratio = Math.max(0, Math.min(1, (value - 1) / 4));
                  return (
                    <li key={axis} className="axis-score-row">
                      <span className="axis-score-icon">
                        <LearnIcon iconKey={AXIS_ICON[axis]} size={32} />
                      </span>
                      <div className="axis-score-main">
                        <div className="axis-score-ends">
                          <span>{AXIS_LOW_LABEL[axis]}</span>
                          <span>{AXIS_HIGH_LABEL[axis]}</span>
                        </div>
                        <div className="axis-score-track">
                          <span
                            className="axis-score-bar"
                            role="img"
                            aria-label={`${AXIS_LOW_LABEL[axis]}부터 ${AXIS_HIGH_LABEL[axis]}까지 5점 만점 중 ${value.toFixed(1)}점`}
                          >
                            <span
                              className="axis-score-fill"
                              style={{ width: `${ratio * 100}%`, backgroundColor: primary.color }}
                            />
                          </span>
                          <span className="axis-score-value">{value.toFixed(1)}점</span>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ol>
              <p className="rank-foot">{reasonText(outcome)}</p>
            </section>
          )}

          <section className="doc-block">
            <h2 className="section-caption">이럴 때 빛나요</h2>
            <ul className="mark-list is-plus">
              {primary.strengths.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </section>

          <section className="doc-block">
            <h2 className="section-caption">이것만 살펴봐요</h2>
            <ul className="mark-list is-minus">
              {primary.cautions.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </section>

          <section className="doc-block">
            <h2 className="section-caption">추천 실행 팁</h2>
            <p className="doc-callout" style={{ borderLeftColor: primary.color }}>
              {primary.tip}
            </p>
          </section>

          <section className="doc-block">
            <h2 className="section-caption">나와 궁합이 맞는 캐릭터</h2>
            <div className="second-row">
              <span className="second-icon">
                <LearnIcon iconKey={match.iconKey} size={36} />
              </span>
              <span className="second-text">
                <strong>{match.title}</strong>
                <em>{match.subtitle}</em>
              </span>
            </div>
            <p className="rank-foot">{primary.relation}</p>
          </section>

          <p className="doc-limit">
            이 테스트는 공개된 학습 이론(Kolb, 1984)의 구조를 참고하여 제작한
            엔터테인먼트 콘텐츠입니다. 전문적인 심리 진단, 채용 또는
            인사평가를 목적으로 하지 않으며, 문항은 원 검사를 번역한 것이
            아니라 이론적 구조만 참고해 새로 작성해 원척도와 동일한 타당성이
            보장되지는 않습니다. 상황과 시기에 따라 다른 모습이 나타날 수
            있어요.
          </p>
        </div>
      </article>

      <div className="result-actions">
        <button className="btn-primary" onClick={handleSave}>
          결과 카드 저장
        </button>
        <div className="action-row">
          <button className="btn-secondary" onClick={handleShare}>
            공유하기
          </button>
          <button className="btn-secondary" onClick={onRestart}>
            다시 하기
          </button>
        </div>
      </div>

      <KakaoAdFitBanner placement="result" />
      <CoupangPartnerRecommendation resultId={primary.id} />

      <div className="result-footer-links">
        <button className="btn-link" onClick={onShowPrivacy}>
          개인정보처리방침 · 광고 및 제휴 안내
        </button>
      </div>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
