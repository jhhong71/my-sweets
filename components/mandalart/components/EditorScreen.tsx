import { useMemo, useRef } from "react";
import type { MandalartData } from "../types";
import {
  CENTER_BLOCK,
  CENTER_CELL,
  SURROUND,
  TOTAL_SLOTS,
  blockCells,
  blockFilledCount,
  filledCount,
  subGoalIndexOfBlock,
  writeCell,
  type CellRole,
} from "../lib/mandalart";
import { objectParticle } from "../lib/korean";
import { MandalartGrid } from "./MandalartGrid";
import { Bow, Heart, Kitty, Sparkle } from "./Decorations";

type Props = {
  data: MandalartData;
  onChange: (next: MandalartData) => void;
  activeBlock: number;
  onActiveBlockChange: (block: number) => void;
  onBack: () => void;
  onFinish: () => void;
};

/** 편집 순서: 한가운데 블록을 먼저 채우고 시계 방향으로 바깥 블록을 돈다. */
const BLOCK_ORDER = [CENTER_BLOCK, ...SURROUND];

function placeholderFor(role: CellRole): string {
  switch (role.kind) {
    case "core":
      return "핵심 목표";
    case "subGoal":
      return `세부 목표 ${role.subGoal + 1}`;
    case "action":
      return `실천 ${role.action + 1}`;
  }
}

function maxLengthFor(role: CellRole): number {
  return role.kind === "action" ? 24 : 20;
}

export function EditorScreen({
  data,
  onChange,
  activeBlock,
  onActiveBlockChange,
  onBack,
  onFinish,
}: Props) {
  const cells = useMemo(() => blockCells(data, activeBlock), [data, activeBlock]);
  const orderIndex = BLOCK_ORDER.indexOf(activeBlock);
  const subGoalIndex = subGoalIndexOfBlock(activeBlock);
  const isCenter = activeBlock === CENTER_BLOCK;

  const filled = filledCount(data);
  const blockFilled = blockFilledCount(data, activeBlock);
  const percent = Math.round((filled / TOTAL_SLOTS) * 100);

  const mapRef = useRef<HTMLDivElement>(null);

  const goto = (index: number) => {
    const next = BLOCK_ORDER[(index + BLOCK_ORDER.length) % BLOCK_ORDER.length];
    onActiveBlockChange(next);
    mapRef.current?.scrollIntoView({ block: "nearest" });
  };

  const heading = isCenter
    ? "핵심 목표와 세부 목표"
    : `세부 목표 ${(subGoalIndex ?? 0) + 1} · 실천 과제`;

  const currentSubGoal = data.subGoals[subGoalIndex ?? 0]?.trim() ?? "";
  const subHeading = isCenter
    ? "가운데 칸에 가장 큰 목표를, 둘레 8칸에 그걸 이루는 갈래를 적어요."
    : currentSubGoal
      ? `“${currentSubGoal}”${objectParticle(currentSubGoal)} 위해 오늘 할 수 있는 일 8가지`
      : "가운데 칸에 세부 목표를 먼저 적으면 흐름이 잡혀요.";

  return (
    <div className="screen editor-screen">
      <header className="editor-top">
        <button type="button" className="icon-btn" onClick={onBack} aria-label="처음 화면으로">
          ←
        </button>
        <p className="editor-title">
          <b>{data.owner.trim() || "나"}</b>의 만다라트
        </p>
        <span className="editor-count">
          {filled}/{TOTAL_SLOTS}
        </span>
      </header>

      <div className="progress" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}>
        <span className="progress-fill" style={{ width: `${percent}%` }} />
        <span className="progress-heart" style={{ left: `calc(${percent}% - 10px)` }}>
          <Heart size={20} />
        </span>
      </div>

      <section className="card focus-card">
        <div className="focus-head">
          <h2 className="focus-title">
            {isCenter ? <Kitty size={26} /> : <Bow size={22} />}
            {heading}
          </h2>
          <p className="focus-sub">{subHeading}</p>
          <span className="focus-progress">
            이 블록 {blockFilled}/8
            {blockFilled === 8 && (
              <b className="focus-done">
                <Sparkle size={12} /> 완성
              </b>
            )}
          </span>
        </div>

        <div className="focus-grid">
          {cells.map((cell, i) => {
            const role = cell.role;
            const isMirror = role.kind === "subGoal" && role.mirrored;
            const cls = [
              "focus-cell",
              role.kind === "core" ? "is-core" : "",
              role.kind === "subGoal" ? "is-sub" : "",
              isMirror ? "is-mirror" : "",
              i === CENTER_CELL ? "is-middle" : "",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <label key={i} className={cls}>
                <span className="sr-only">{placeholderFor(role)}</span>
                <textarea
                  value={cell.text}
                  maxLength={maxLengthFor(role)}
                  placeholder={placeholderFor(role)}
                  rows={2}
                  onChange={(e) => onChange(writeCell(data, role, e.target.value))}
                />
                {isMirror && <span className="mirror-tag">세부 목표</span>}
              </label>
            );
          })}
        </div>

        <div className="focus-nav">
          <button type="button" className="btn btn-soft btn-sm" onClick={() => goto(orderIndex - 1)}>
            ← 이전 블록
          </button>
          <span className="focus-step">
            {orderIndex + 1} / {BLOCK_ORDER.length}
          </span>
          <button type="button" className="btn btn-soft btn-sm" onClick={() => goto(orderIndex + 1)}>
            다음 블록 →
          </button>
        </div>
      </section>

      <section className="card map-card" ref={mapRef}>
        <p className="field-label">
          <Sparkle size={14} /> 전체 보기 · 칸을 눌러 이동해요
        </p>
        <div className="map-wrap">
          <MandalartGrid data={data} onSelectBlock={onActiveBlockChange} activeBlock={activeBlock} />
        </div>
      </section>

      <div className="cta-area">
        <button type="button" className="btn btn-primary" onClick={onFinish}>
          완성 카드 보기
        </button>
        <p className="autosave-note">작성한 내용은 자동으로 저장돼요 🎀</p>
      </div>
    </div>
  );
}
