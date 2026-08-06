"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import type { MandalartData, ThemeId } from "./types";
import {
  CENTER_BLOCK,
  clearDraft,
  createEmptyMandalart,
  loadDraft,
  saveDraft,
} from "./lib/mandalart";
import { PRESET_BY_THEME } from "./data/presets";
import { StartScreen } from "./components/StartScreen";
import { EditorScreen } from "./components/EditorScreen";
import { CompleteScreen } from "./components/CompleteScreen";
import { FloatingHearts } from "./components/Decorations";
import { recordParticipation } from "@/lib/participants";

type Phase = "start" | "editor" | "complete";

/** Firebase participants/ 경로의 키. 사이트 내 카드 id와 맞춘다. */
const MANDALART_ID = "mandalart";

const THEME_STORAGE_KEY = "cutie-mandalart:theme";

function loadTheme(): ThemeId {
  try {
    const raw = localStorage.getItem(THEME_STORAGE_KEY);
    if (raw === "health" || raw === "study" || raw === "work" || raw === "mind") return raw;
  } catch {
    // 저장소 접근이 막혀도 기본값으로 동작한다.
  }
  return "health";
}

export default function App() {
  const [phase, setPhase] = useState<Phase>("start");
  const [data, setData] = useState<MandalartData>(() => createEmptyMandalart());
  const [themeId, setThemeId] = useState<ThemeId>("health");
  const [activeBlock, setActiveBlock] = useState(CENTER_BLOCK);
  const [hasDraft, setHasDraft] = useState(false);
  const [draft, setDraft] = useState<MandalartData | null>(null);

  // 이전에 작성하던 내용이 있으면 시작 화면에서 이어쓰기를 제안한다.
  useEffect(() => {
    const saved = loadDraft();
    setThemeId(loadTheme());
    if (!saved) return;
    setDraft(saved);
    setHasDraft(true);
    setData((current) => ({ ...current, owner: saved.owner }));
  }, []);

  // 작성 중에는 바뀔 때마다 브라우저에만 저장한다.
  useEffect(() => {
    if (phase === "start") return;
    saveDraft(data);
  }, [data, phase]);

  useEffect(() => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, themeId);
    } catch {
      // 무시
    }
  }, [themeId]);

  const setOwner = useCallback((owner: string) => {
    setData((d) => ({ ...d, owner }));
  }, []);

  const startFresh = () => {
    void recordParticipation(MANDALART_ID);
    setData((d) => createEmptyMandalart(d.owner));
    setActiveBlock(CENTER_BLOCK);
    setPhase("editor");
  };

  const continueDraft = () => {
    void recordParticipation(MANDALART_ID);
    if (draft) setData({ ...draft, owner: data.owner || draft.owner });
    setActiveBlock(CENTER_BLOCK);
    setPhase("editor");
  };

  const loadPreset = () => {
    void recordParticipation(MANDALART_ID);
    const preset = PRESET_BY_THEME[themeId];
    setData({ owner: data.owner, ...structuredCloneish(preset.data) });
    setActiveBlock(CENTER_BLOCK);
    setPhase("editor");
  };

  const restart = () => {
    clearDraft();
    setDraft(null);
    setHasDraft(false);
    setData((d) => createEmptyMandalart(d.owner));
    setActiveBlock(CENTER_BLOCK);
    setPhase("start");
    window.scrollTo({ top: 0 });
  };

  const goTo = (next: Phase) => {
    setPhase(next);
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="mandalart-app app">
      <Link href="/" className="ms-home-link">
        <span aria-hidden="true">←</span> 마이스윗테스트 홈
      </Link>
      <FloatingHearts />
      <main className="app-main">
        {phase === "start" && (
          <StartScreen
            owner={data.owner}
            onOwnerChange={setOwner}
            themeId={themeId}
            onThemeChange={setThemeId}
            hasDraft={hasDraft}
            onStart={startFresh}
            onContinue={continueDraft}
            onLoadPreset={loadPreset}
          />
        )}
        {phase === "editor" && (
          <EditorScreen
            data={data}
            onChange={setData}
            activeBlock={activeBlock}
            onActiveBlockChange={setActiveBlock}
            onBack={() => goTo("start")}
            onFinish={() => goTo("complete")}
          />
        )}
        {phase === "complete" && (
          <CompleteScreen
            data={data}
            themeId={themeId}
            onEdit={() => goTo("editor")}
            onRestart={restart}
          />
        )}
      </main>
      <footer className="app-footer">
        <span>말랑 만다라트</span>
        <span className="dot">·</span>
        <span>작성 내용은 이 브라우저에만 저장돼요</span>
      </footer>
    </div>
  );
}

/** 프리셋 원본이 편집으로 오염되지 않도록 깊은 복사본을 쓴다. */
function structuredCloneish(value: Omit<MandalartData, "owner">): Omit<MandalartData, "owner"> {
  return {
    core: value.core,
    subGoals: value.subGoals.slice(),
    actions: value.actions.map((row) => row.slice()),
  };
}
