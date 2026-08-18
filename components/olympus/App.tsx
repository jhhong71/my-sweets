"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import type { Answers, GodId, Outcome } from "./types";
import { QUESTIONS } from "./data/questions";
import { GODS } from "./data/gods";
import { scoreAnswers } from "./lib/scoring";
import { StartScreen } from "./components/StartScreen";
import { QuizScreen } from "./components/QuizScreen";
import { CalculatingScreen } from "./components/CalculatingScreen";
import { ResultScreen } from "./components/ResultScreen";
import { PrivacyPolicy } from "./components/PrivacyPolicy";
import { NotFoundScreen } from "./components/NotFoundScreen";
import { recordParticipation } from "@/lib/participants";

type Screen = "start" | "quiz" | "calculating" | "result" | "privacy";

/** Firebase participants/ 경로의 키. 사이트 내 카드 id와 맞춘다. */
const OLYMPUS_TEST_ID = "olympus";

function emptyAnswers(): Answers {
  const next: Answers = {};
  for (const q of QUESTIONS) next[q.id] = null;
  return next;
}

/** 공유 링크(?result=)의 유형 ID. 결과 데이터에 없는 값이면 무시한다. */
function resultIdFromUrl(): GodId | null {
  const id = new URLSearchParams(window.location.search).get("result");
  return id && id in GODS ? (id as GodId) : null;
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("start");
  const [previousScreen, setPreviousScreen] = useState<Screen>("start");
  const [answers, setAnswers] = useState<Answers>(emptyAnswers);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [outcome, setOutcome] = useState<Outcome | null>(null);
  const [sharedPreviewId, setSharedPreviewId] = useState<GodId | null>(null);

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

  /** 모든 응답·결과 상태를 초기화한다(다시 하기·홈 이동 공통). */
  const resetState = () => {
    setAnswers(emptyAnswers());
    setCurrentIndex(0);
    setOutcome(null);
    setSharedPreviewId(null);
  };

  const start = () => {
    resetState();
    history.replaceState(null, "", window.location.pathname);
    // 실제 참여수 집계(세션당 1회). 실패해도 테스트 진행에는 영향이 없다.
    void recordParticipation(OLYMPUS_TEST_ID);
    setScreen("quiz");
  };

  const selectAnswer = (choiceIndex: number) => {
    const question = QUESTIONS[currentIndex];
    const next = { ...answers, [question.id]: choiceIndex };
    setAnswers(next);

    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex(currentIndex + 1);
      return;
    }

    // 마지막 문항: 모든 응답이 채워졌을 때만 계산 화면으로 넘어간다.
    const result = scoreAnswers(next);
    if (result) {
      setOutcome(result);
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
    resetState();
    setScreen("start");
  };

  const goHome = () => {
    history.replaceState(null, "", window.location.pathname);
    resetState();
    setScreen("start");
  };

  const showPrivacy = () => {
    setPreviousScreen(screen);
    setScreen("privacy");
  };

  const closePrivacy = () => setScreen(previousScreen);

  // 직접 테스트한 결과가 있으면 그것을, 없고 공유 링크로 열렸다면 유형 소개를 보여준다.
  const shownResult = outcome
    ? outcome.primary
    : sharedPreviewId
      ? GODS[sharedPreviewId]
      : null;

  return (
    <div className="olympus-app">
      <div className="app-frame">
        <Link href="/" className="ms-home-link">
          <span aria-hidden="true">←</span> 마이스윗테스트 홈
        </Link>
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
        {screen === "result" &&
          (shownResult ? (
            <ResultScreen
              result={shownResult}
              outcome={outcome}
              onRestart={restart}
              onShowPrivacy={showPrivacy}
            />
          ) : (
            // 결과도 공유 유형도 없는 상태로 결과 화면에 들어온 경우의 안전한 대체 화면
            <NotFoundScreen onGoHome={goHome} />
          ))}
        {screen === "privacy" && <PrivacyPolicy onBack={closePrivacy} />}
      </div>
    </div>
  );
}
