"use client";

import { useCallback, useEffect, useState } from "react";
import type { Answers, AxisScores, ScoreOutcome } from "./types";
import { QUESTIONS } from "./data/questions";
import { RESULTS } from "./data/results";
import { isComplete, scoreAnswers } from "./lib/scoring";
import { SNACK_AXIS } from "./data/generation";
import { StartScreen } from "./components/StartScreen";
import { QuizScreen } from "./components/QuizScreen";
import { CalculatingScreen } from "./components/CalculatingScreen";
import { ResultScreen } from "./components/ResultScreen";
import { PrivacyPolicy } from "./components/PrivacyPolicy";
import { recordParticipation } from "@/lib/participants";

type Screen = "start" | "quiz" | "calculating" | "result" | "privacy";

/** Firebase participants/ 경로의 키. 사이트 내 카드 id("my-sweets")와는 별개다. */
const MY_SWEETS_TEST_ID = "my-sweet";

function emptyAnswers(): Answers {
  const a: Answers = {};
  for (const q of QUESTIONS) a[q.id] = null;
  return a;
}

/**
 * 공유 링크 미리보기에서만 쓰는 자리표시 점수. 방문자의 실제 응답이 아니므로
 * ResultScreen은 sharedPreview가 true일 때 이 값을 표시하지 않는다 —
 * 타입을 맞추기 위한 값일 뿐이다.
 */
const PLACEHOLDER_SCORES: AxisScores = {
  open: 0,
  conscientious: 0,
  extravert: 0,
  agreeable: 0,
  stable: 0,
};

function resultIdFromUrl(): string | null {
  const id = new URLSearchParams(window.location.search).get("result");
  return id && id in RESULTS ? id : null;
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("start");
  const [previousScreen, setPreviousScreen] = useState<Screen>("start");
  const [answers, setAnswers] = useState<Answers>(emptyAnswers);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [outcome, setOutcome] = useState<ScoreOutcome | null>(null);
  const [sharedPreviewId, setSharedPreviewId] = useState<string | null>(null);

  /**
   * 공유 링크(?result=...)로 들어온 경우 결과 미리보기로 전환한다.
   * 정적 프리렌더 시점에는 window가 없으므로 마운트 후에 읽는다.
   */
  useEffect(() => {
    const sharedId = resultIdFromUrl();
    if (sharedId) {
      setSharedPreviewId(sharedId);
      setScreen("result");
    }
  }, []);

  const start = () => {
    setAnswers(emptyAnswers());
    setCurrentIndex(0);
    setOutcome(null);
    setSharedPreviewId(null);
    history.replaceState(null, "", window.location.pathname);
    // 실제 참여수 집계(세션당 1회). 비동기로 실행하고 결과를 기다리지 않는다 —
    // 실패해도 테스트 진행에는 영향이 없다.
    void recordParticipation(MY_SWEETS_TEST_ID);
    setScreen("quiz");
  };

  const selectAnswer = (choiceIndex: number) => {
    const q = QUESTIONS[currentIndex];
    const next = { ...answers, [q.id]: choiceIndex };
    setAnswers(next);

    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex(currentIndex + 1);
      return;
    }
    if (isComplete(next)) {
      setOutcome(scoreAnswers(next));
      setScreen("calculating");
    }
  };

  const back = () => {
    if (currentIndex === 0) {
      setScreen("start");
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const showResult = useCallback(() => {
    setScreen("result");
    if (outcome) history.replaceState(null, "", `?result=${outcome.primary.id}`);
  }, [outcome]);

  const restart = () => {
    history.replaceState(null, "", window.location.pathname);
    setAnswers(emptyAnswers());
    setCurrentIndex(0);
    setOutcome(null);
    setSharedPreviewId(null);
    setScreen("start");
  };

  const showPrivacy = () => {
    setPreviousScreen(screen);
    setScreen("privacy");
  };

  const closePrivacy = () => {
    setScreen(previousScreen);
  };

  const sharedResult =
    sharedPreviewId && !outcome && sharedPreviewId in RESULTS
      ? RESULTS[sharedPreviewId as keyof typeof RESULTS]
      : null;

  return (
    <div className="app-frame">
      {screen === "start" && <StartScreen onStart={start} onShowPrivacy={showPrivacy} />}
      {screen === "quiz" && (
        <QuizScreen
          currentIndex={currentIndex}
          selected={answers[QUESTIONS[currentIndex].id]}
          onAnswer={selectAnswer}
          onBack={back}
        />
      )}
      {screen === "calculating" && <CalculatingScreen onDone={showResult} />}
      {screen === "result" && outcome && (
        <ResultScreen
          outcome={outcome}
          sharedPreview={false}
          onRestart={restart}
          onShowPrivacy={showPrivacy}
        />
      )}
      {screen === "result" && !outcome && sharedResult && (
        <ResultScreen
          outcome={{
            primary: sharedResult,
            secondary: sharedResult,
            scores: PLACEHOLDER_SCORES,
            rawScores: PLACEHOLDER_SCORES,
            primaryTrait: SNACK_AXIS[sharedResult.id],
            secondaryTrait: SNACK_AXIS[sharedResult.id],
          }}
          sharedPreview
          onRestart={restart}
          onShowPrivacy={showPrivacy}
        />
      )}
      {screen === "privacy" && <PrivacyPolicy onBack={closePrivacy} />}
    </div>
  );
}
