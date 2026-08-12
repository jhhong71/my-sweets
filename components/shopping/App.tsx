"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import type { AxisScores, ResultOutcome, Screen } from "./types";
import { QUESTIONS } from "./data/questions";
import { RESULT_MAP } from "./data/results";
import { calculateResult } from "./lib/scoring";
import { StartScreen } from "./components/StartScreen";
import { QuizScreen } from "./components/QuizScreen";
import { CalculatingScreen } from "./components/CalculatingScreen";
import { ResultScreen } from "./components/ResultScreen";
import { PrivacyPolicy } from "./components/PrivacyPolicy";
import { NotFoundScreen } from "./components/NotFoundScreen";
import { BackgroundBlobs } from "./components/Decor";
import { recordParticipation } from "@/lib/participants";

/** Firebase participants/ 경로의 키. 사이트 내 카드 id와 맞춘다. */
const SHOPPING_TEST_ID = "shopping";

const EMPTY_ANSWERS: (number | undefined)[] = Array(QUESTIONS.length).fill(undefined);

/**
 * 공유 링크 미리보기 화면에서만 쓰는 자리표시 점수. 방문자의 실제 응답이
 * 아니므로 ResultScreen은 sharedPreview가 true일 때 이 값을 화면에 표시하지
 * 않는다(축 점수·보조 결과 섹션을 모두 숨김) — 타입을 맞추기 위한 값일 뿐이다.
 */
const PLACEHOLDER_SCORES: AxisScores = {
  qual: 0,
  trend: 0,
  impulse: 0,
};

function resultIdFromUrl(): string | null {
  const id = new URLSearchParams(window.location.search).get("result");
  return id && RESULT_MAP[id] ? id : null;
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("start");
  const [previousScreen, setPreviousScreen] = useState<Screen>("start");
  const [answers, setAnswers] = useState<(number | undefined)[]>(EMPTY_ANSWERS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [outcome, setOutcome] = useState<ResultOutcome | null>(null);
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
    setAnswers(EMPTY_ANSWERS);
    setCurrentIndex(0);
    setOutcome(null);
    setSharedPreviewId(null);
    history.replaceState(null, "", window.location.pathname);
    // 실제 참여수 집계(세션당 1회). 실패해도 테스트 진행에는 영향이 없다.
    void recordParticipation(SHOPPING_TEST_ID);
    setScreen("quiz");
  };

  /** 다음 문항으로 넘어가고, 마지막 문항이면 결과 단계로 진행한다. */
  const advance = (current: (number | undefined)[], fromIndex: number) => {
    if (fromIndex < QUESTIONS.length - 1) {
      setCurrentIndex(fromIndex + 1);
      return;
    }
    if (current.every((v) => v != null)) {
      setOutcome(calculateResult(current as number[]));
      setScreen("calculating");
    }
  };

  const selectAnswer = (value: number) => {
    const next = [...answers];
    next[currentIndex] = value;
    setAnswers(next);
    advance(next, currentIndex);
  };

  /** 답을 바꾸지 않고 넘어갈 때(이미 답한 문항을 다시 보는 경우). */
  const goNext = () => {
    advance(answers, currentIndex);
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
    setAnswers(EMPTY_ANSWERS);
    setCurrentIndex(0);
    setOutcome(null);
    setSharedPreviewId(null);
    setScreen("start");
  };

  const goHome = () => {
    history.replaceState(null, "", window.location.pathname);
    setAnswers(EMPTY_ANSWERS);
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

  const sharedResult = sharedPreviewId && !outcome ? RESULT_MAP[sharedPreviewId] : null;

  return (
    <div className="shopping-app">
      <div className="app-frame">
        <Link href="/" className="ms-home-link">
          <span aria-hidden="true">←</span> 마이스윗테스트 홈
        </Link>
        <BackgroundBlobs />
        {screen === "start" && <StartScreen onStart={start} onShowPrivacy={showPrivacy} />}
        {screen === "quiz" && (
          <QuizScreen
            currentIndex={currentIndex}
            selected={answers[currentIndex]}
            onAnswer={selectAnswer}
            onBack={back}
            onNext={goNext}
          />
        )}
        {screen === "calculating" && <CalculatingScreen onDone={showResult} />}
        {screen === "result" && outcome && (
          <ResultScreen outcome={outcome} sharedPreview={false} onRestart={restart} onShowPrivacy={showPrivacy} />
        )}
        {screen === "result" && !outcome && sharedResult && (
          <ResultScreen
            outcome={{ primary: sharedResult, secondary: sharedResult, scores: PLACEHOLDER_SCORES }}
            sharedPreview
            onRestart={restart}
            onShowPrivacy={showPrivacy}
          />
        )}
        {screen === "result" && !outcome && !sharedResult && <NotFoundScreen onGoHome={goHome} />}
        {screen === "privacy" && <PrivacyPolicy onBack={closePrivacy} />}
      </div>
    </div>
  );
}
