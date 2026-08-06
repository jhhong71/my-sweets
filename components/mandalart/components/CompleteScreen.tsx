import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { MandalartData, ThemeId } from "../types";
import { TOTAL_SLOTS, filledCount } from "../lib/mandalart";
import { downloadMandalartImage, shareService, type ShareOutcome } from "../lib/share";
import { THEME_BY_ID } from "../data/themes";
import { MandalartGrid } from "./MandalartGrid";
import { KakaoAdFitBanner } from "./ads/KakaoAdFitBanner";
import { CoupangPartnerRecommendation } from "./ads/CoupangPartnerRecommendation";
import { Bow, Daisy, Heart, Kitty, Sparkle, Strawberry, Teacup } from "./Decorations";

type Props = {
  data: MandalartData;
  themeId: ThemeId;
  onEdit: () => void;
  onRestart: () => void;
};

/** 캡처 카드의 기준 너비. 화면 폭에 맞춰 축소해 보여주고, 저장은 항상 이 크기로 한다. */
const CARD_WIDTH = 800;

const SHARE_MESSAGE: Record<ShareOutcome, string> = {
  shared: "공유했어요!",
  copied: "링크를 복사했어요!",
  cancelled: "",
  failed: "공유가 어렵네요. 주소창의 링크를 복사해 주세요.",
};

export function CompleteScreen({ data, themeId, onEdit, onRestart }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [stageHeight, setStageHeight] = useState<number>();
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");

  const filled = filledCount(data);
  const theme = THEME_BY_ID[themeId];
  const owner = data.owner.trim() || "나";
  const core = data.core.trim();

  /** 화면 폭에 맞게 카드를 축소한다. 축소는 보기용이고 저장 해상도에는 영향이 없다. */
  const fit = useCallback(() => {
    const stage = stageRef.current;
    const card = cardRef.current;
    if (!stage || !card) return;
    const next = Math.min(1, stage.clientWidth / CARD_WIDTH);
    setScale(next);
    setStageHeight(card.offsetHeight * next);
  }, []);

  useLayoutEffect(fit, [fit, data]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", fit);
      return () => window.removeEventListener("resize", fit);
    }
    const ro = new ResizeObserver(fit);
    ro.observe(stage);
    return () => ro.disconnect();
  }, [fit]);

  useEffect(() => {
    if (!notice) return;
    const t = window.setTimeout(() => setNotice(""), 2600);
    return () => window.clearTimeout(t);
  }, [notice]);

  const handleSave = async () => {
    const card = cardRef.current;
    if (!card || saving) return;
    setSaving(true);
    setNotice("");
    try {
      await downloadMandalartImage(card, data.owner);
      setNotice("이미지를 저장했어요!");
    } catch {
      setNotice("저장에 실패했어요. 화면을 캡처해 주세요.");
    } finally {
      setSaving(false);
    }
  };

  const handleShare = async () => {
    const outcome = await shareService(core);
    const message = SHARE_MESSAGE[outcome];
    if (message) setNotice(message);
  };

  return (
    <div className="screen complete-screen">
      <header className="complete-head">
        <p className="complete-eyebrow">
          <Sparkle size={14} /> 만다라트 완성 <Sparkle size={14} />
        </p>
        <h1 className="complete-title">{owner}의 계획표가 나왔어요</h1>
        <p className="complete-sub">
          {theme.emoji} {theme.label} · 81칸 중 {filled}칸을 채웠어요
          {filled < TOTAL_SLOTS && " (나중에 더 채워도 좋아요)"}
        </p>
      </header>

      {/* 캡처 전용 영역 — 광고·버튼·제휴 링크는 이 안에 두지 않는다. */}
      <div className="card-stage" ref={stageRef} style={{ height: stageHeight }}>
        <div
          className="card-scaler"
          style={{ transform: `scale(${scale})`, width: CARD_WIDTH }}
        >
          <div className="capture-card" ref={cardRef}>
            <div className="capture-deco capture-deco-tl">
              <Bow size={44} />
            </div>
            <div className="capture-deco capture-deco-tr">
              <Kitty size={48} />
            </div>
            <div className="capture-deco capture-deco-bl">
              <Strawberry size={38} />
            </div>
            <div className="capture-deco capture-deco-br">
              <Teacup size={44} />
            </div>

            <div className="capture-head">
              <span className="capture-tag">
                <Daisy size={16} /> {theme.label}
              </span>
              <h2 className="capture-owner">{owner}의 만다라트</h2>
              {core && (
                <p className="capture-core">
                  <Heart size={16} /> {core}
                </p>
              )}
            </div>

            <div className="capture-grid">
              <MandalartGrid data={data} />
            </div>

            <p className="capture-foot">말랑 만다라트 · 81칸으로 그리는 나의 한 해</p>
          </div>
        </div>
      </div>

      {notice && (
        <p className="notice" role="status">
          {notice}
        </p>
      )}

      <div className="cta-area">
        <button type="button" className="btn btn-primary" onClick={handleSave} disabled={saving}>
          {saving ? "저장하는 중…" : "이미지로 저장하기"}
        </button>
        <button type="button" className="btn btn-ghost" onClick={handleShare}>
          공유하기
        </button>
        <div className="cta-row">
          <button type="button" className="btn btn-soft btn-sm" onClick={onEdit}>
            더 채우러 가기
          </button>
          <button type="button" className="btn btn-soft btn-sm" onClick={onRestart}>
            새로 만들기
          </button>
        </div>
      </div>

      <KakaoAdFitBanner placement="result" />

      <CoupangPartnerRecommendation themeId={themeId} />
    </div>
  );
}
