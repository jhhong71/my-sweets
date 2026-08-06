import { BLOCK_COUNT, CENTER_BLOCK, CENTER_CELL, blockCells } from "../lib/mandalart";
import type { MandalartData } from "../types";

type Props = {
  data: MandalartData;
  /** 편집 화면에서 블록을 골라 들어갈 때 사용. 없으면 읽기 전용 표시. */
  onSelectBlock?: (block: number) => void;
  activeBlock?: number;
};

/** 칸의 역할에 따라 색을 다르게 준다. 핵심 → 세부 → 실천 순으로 옅어진다. */
function cellClass(block: number, cell: number): string {
  if (block === CENTER_BLOCK && cell === CENTER_CELL) return "mg-cell is-core";
  if (block === CENTER_BLOCK) return "mg-cell is-sub";
  if (cell === CENTER_CELL) return "mg-cell is-sub is-mirror";
  return "mg-cell is-action";
}

/** 9×9 만다라트 전체. 완성 카드와 편집 화면 미리보기가 같은 컴포넌트를 쓴다. */
export function MandalartGrid({ data, onSelectBlock, activeBlock }: Props) {
  return (
    <div className="mg-grid">
      {Array.from({ length: BLOCK_COUNT }, (_, block) => {
        const cells = blockCells(data, block);
        const isCenter = block === CENTER_BLOCK;
        const isActive = activeBlock === block;
        const className = [
          "mg-block",
          isCenter ? "is-center" : "",
          isActive ? "is-active" : "",
          onSelectBlock ? "is-clickable" : "",
        ]
          .filter(Boolean)
          .join(" ");

        const inner = (
          <div className="mg-block-inner">
            {cells.map((c, cell) => (
              <span key={cell} className={cellClass(block, cell)}>
                <span className="mg-cell-text">{c.text}</span>
              </span>
            ))}
          </div>
        );

        if (!onSelectBlock) {
          return (
            <div key={block} className={className}>
              {inner}
            </div>
          );
        }

        return (
          <button
            key={block}
            type="button"
            className={className}
            onClick={() => onSelectBlock(block)}
            aria-pressed={isActive}
            aria-label={
              isCenter
                ? "핵심 목표와 세부 목표 블록 편집"
                : `세부 목표 ${(block > CENTER_BLOCK ? block : block + 1)}번 블록 편집`
            }
          >
            {inner}
          </button>
        );
      })}
    </div>
  );
}
