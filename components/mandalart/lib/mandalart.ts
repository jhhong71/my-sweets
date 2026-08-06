import type { MandalartData } from "../types";

/** 만다라트는 3×3 블록이 3×3으로 모인 9×9 격자다. */
export const BLOCK_COUNT = 9;
export const CELL_COUNT = 9;
export const CENTER_BLOCK = 4;
export const CENTER_CELL = 4;

/**
 * 가운데를 뺀 8칸의 위치(좌상 → 우하 순서).
 * 이 배열의 index가 곧 세부 목표 번호(0~7)이며,
 * "가운데 블록에서 세부 목표가 놓인 자리"와 "그 세부 목표가 펼쳐지는 바깥 블록의 자리"가
 * 같은 위치를 갖도록 블록 인덱스와 칸 인덱스에 똑같이 쓴다.
 */
export const SURROUND = [0, 1, 2, 3, 5, 6, 7, 8] as const;

/** 바깥 블록 번호 → 그 블록이 펼치는 세부 목표 번호. 가운데 블록이면 null. */
export function subGoalIndexOfBlock(block: number): number | null {
  const index = SURROUND.indexOf(block as (typeof SURROUND)[number]);
  return index === -1 ? null : index;
}

export function createEmptyMandalart(owner = ""): MandalartData {
  return {
    owner,
    core: "",
    subGoals: Array.from({ length: 8 }, () => ""),
    actions: Array.from({ length: 8 }, () => Array.from({ length: 8 }, () => "")),
  };
}

/**
 * 화면에 그릴 9×9를 만든다. 각 칸은 어떤 값에 연결돼 있는지(role)를 함께 들고 있어
 * 편집 UI와 완성 카드가 같은 규칙을 공유한다.
 */
export type CellRole =
  | { kind: "core" }
  | { kind: "subGoal"; subGoal: number; mirrored: boolean }
  | { kind: "action"; subGoal: number; action: number };

export type Cell = {
  role: CellRole;
  text: string;
};

export function blockCells(data: MandalartData, block: number): Cell[] {
  return Array.from({ length: CELL_COUNT }, (_, cell) => {
    const role = cellRole(block, cell);
    return { role, text: readCell(data, role) };
  });
}

export function cellRole(block: number, cell: number): CellRole {
  if (block === CENTER_BLOCK) {
    if (cell === CENTER_CELL) return { kind: "core" };
    return { kind: "subGoal", subGoal: SURROUND.indexOf(cell as (typeof SURROUND)[number]), mirrored: false };
  }
  const subGoal = subGoalIndexOfBlock(block)!;
  if (cell === CENTER_CELL) return { kind: "subGoal", subGoal, mirrored: true };
  return { kind: "action", subGoal, action: SURROUND.indexOf(cell as (typeof SURROUND)[number]) };
}

export function readCell(data: MandalartData, role: CellRole): string {
  switch (role.kind) {
    case "core":
      return data.core;
    case "subGoal":
      return data.subGoals[role.subGoal] ?? "";
    case "action":
      return data.actions[role.subGoal]?.[role.action] ?? "";
  }
}

/**
 * 칸 하나를 수정한 새 데이터를 돌려준다.
 * 세부 목표는 가운데 블록과 바깥 블록 가운데 칸이 같은 값을 보게 되어 있어(readCell)
 * 어느 쪽에서 고쳐도 자동으로 함께 바뀐다.
 */
export function writeCell(data: MandalartData, role: CellRole, text: string): MandalartData {
  switch (role.kind) {
    case "core":
      return { ...data, core: text };
    case "subGoal": {
      const subGoals = data.subGoals.slice();
      subGoals[role.subGoal] = text;
      return { ...data, subGoals };
    }
    case "action": {
      const actions = data.actions.map((row) => row.slice());
      actions[role.subGoal][role.action] = text;
      return { ...data, actions };
    }
  }
}

/** 채워진 칸 수 (핵심 1 + 세부 8 + 실천 64 = 73칸이 기준. 미러링 칸은 세지 않는다) */
export const TOTAL_SLOTS = 1 + 8 + 64;

export function filledCount(data: MandalartData): number {
  let count = data.core.trim() ? 1 : 0;
  count += data.subGoals.filter((v) => v.trim()).length;
  for (const row of data.actions) count += row.filter((v) => v.trim()).length;
  return count;
}

/** 블록 하나(가운데 칸 제외 8칸) 중 채워진 수 — 편집 화면 진행 표시에 쓴다. */
export function blockFilledCount(data: MandalartData, block: number): number {
  if (block === CENTER_BLOCK) return data.subGoals.filter((v) => v.trim()).length;
  const subGoal = subGoalIndexOfBlock(block)!;
  return (data.actions[subGoal] ?? []).filter((v) => v.trim()).length;
}

const STORAGE_KEY = "cutie-mandalart:v1";

/** 작성 중인 내용을 브라우저에만 보관한다(서버 전송 없음). */
export function saveDraft(data: MandalartData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // 사생활 보호 모드 등으로 저장이 막혀도 작성은 계속할 수 있어야 한다.
  }
}

export function loadDraft(): MandalartData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return normalize(JSON.parse(raw) as Partial<MandalartData>);
  } catch {
    return null;
  }
}

export function clearDraft(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // 무시
  }
}

/** 저장 형식이 어긋나 있어도 9×9 구조가 깨지지 않게 채워 넣는다. */
function normalize(raw: Partial<MandalartData>): MandalartData {
  const base = createEmptyMandalart(typeof raw.owner === "string" ? raw.owner.slice(0, 12) : "");
  base.core = typeof raw.core === "string" ? raw.core : "";
  if (Array.isArray(raw.subGoals)) {
    raw.subGoals.slice(0, 8).forEach((v, i) => {
      if (typeof v === "string") base.subGoals[i] = v;
    });
  }
  if (Array.isArray(raw.actions)) {
    raw.actions.slice(0, 8).forEach((row, i) => {
      if (!Array.isArray(row)) return;
      row.slice(0, 8).forEach((v, j) => {
        if (typeof v === "string") base.actions[i][j] = v;
      });
    });
  }
  return base;
}
