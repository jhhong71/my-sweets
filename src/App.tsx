import { useCallback, useState } from "react";
import type { Answers, AxisScores, ScoreOutcome } from "./types";
import { QUESTIONS } from "./data/questions";
import { RESULTS } from "./data/results";
import { computeAxisScores, isComplete, resolveOutcome } from "./lib/scoring";
import { StartScreen } from "./components/StartScreen";
import { QuizScreen } from "./components/QuizScreen";
import { CalculatingScreen } from "./components/CalculatingScreen";
import { ResultScreen } from "./components/ResultScreen";
import { PrivacyPolicy } from "./components/PrivacyPolicy";
import { NotFoundScreen } from "./components/NotFoundScreen";

type Screen = "start" | "quiz" | "calculating" | "result" | "privacy" | "notfound";

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
const PLACEHOLDER_SCORES: AxisScores = { rich: 0, playful: 0, warm: 0 };

function resultIdFromUrl(): string | null {
  const id = new URLSearchParams(window.location.search).get("result");
  return id && id in RESULTS ? id : null;
}

/**
 * 앱은 실제 하위 라우트가 없다(결과는 ?result= 쿼리로만 구분). 그래서 배포 위치가
 * 루트든 하위 경로든, 디렉터리(/ 로 끝) 또는 index.html 이면 홈으로 취급하고,
 * 그 밖의 명백한 딥링크만 대체 화면(404)으로 처리한다.
 */
function isUnknownPath(): boolean {
  const p = window.location.pathname;
  return !(p.endsWith("/") || p.endsWith("/index.html"));
}

/** 현재 문서가 놓인 디렉터리 경로(홈). 하위 경로 배포에서도 안전하게 홈으로 이동. */
function homePath(): string {
  const p = window.location.pathname;
  return p.endsWith("/") ? p : p.replace(/[^/]*$/, "");
}

export default function App() {
  const sharedId = resultIdFromUrl();
  const unknownPath = isUnknownPath();
  const [screen, setScreen] = useState<Screen>(
    unknownPath ? "notfound" : sharedId ? "result" : "start",
  );
  const [previousScreen, setPreviousScreen] = useState<Screen>("start");
  const [answers, setAnswers] = useState<Answers>(emptyAnswers);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [outcome, setOutcome] = useState<ScoreOutcome | null>(null);
  const [sharedPreviewId, setSharedPreviewId] = useState<string | null>(sharedId);

  const start = () => {
    setAnswers(emptyAnswers());
    setCurrentIndex(0);
    setOutcome(null);
    setSharedPreviewId(null);
    history.replaceState(null, "", window.location.pathname);
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
      setOutcome(resolveOutcome(computeAxisScores(next)));
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

  const goHome = () => {
    history.replaceState(null, "", homePath());
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
          outcome={{ primary: sharedResult, secondary: sharedResult, scores: PLACEHOLDER_SCORES }}
          sharedPreview
          onRestart={restart}
          onShowPrivacy={showPrivacy}
        />
      )}
      {screen === "privacy" && <PrivacyPolicy onBack={closePrivacy} />}
      {screen === "notfound" && <NotFoundScreen onGoHome={goHome} />}
    </div>
  );
}
