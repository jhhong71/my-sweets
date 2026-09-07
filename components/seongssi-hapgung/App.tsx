"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import type { Outcome, PairInput } from "./types";
import { SURNAMES, bongwansFor } from "./data/surnames";
import { computeOutcome } from "./lib/scoring";
import { shareUrl } from "./lib/share";
import { StartScreen } from "./components/StartScreen";
import { PickScreen } from "./components/PickScreen";
import { CalculatingScreen } from "./components/CalculatingScreen";
import { ResultScreen } from "./components/ResultScreen";
import { PrivacyPolicy } from "./components/PrivacyPolicy";
import { NotFoundScreen } from "./components/NotFoundScreen";
import { recordParticipation } from "@/lib/participants";

type Screen = "start" | "pick" | "calculating" | "result" | "privacy";
type StepKey = "mySurname" | "myBongwan" | "partnerSurname" | "partnerBongwan";

type StepConfig = {
  key: StepKey;
  title: string;
  hint: string;
  options: string[];
  customLabel: string;
  customPlaceholder: string;
  customMaxLength: number;
};

/** Firebase participants/ 경로의 키. 사이트 내 카드 id와 맞춘다. */
const SEONGSSI_HAPGUNG_TEST_ID = "seongssi-hapgung";

const SURNAME_OPTIONS = SURNAMES.map((s) => s.name);

/** 현재까지의 선택값을 바탕으로 4단계 선택 구성을 만든다(본관 선택지는 성씨에 따라 달라진다). */
function stepsFor(input: Partial<PairInput>): StepConfig[] {
  return [
    {
      key: "mySurname",
      title: "내 성씨는 무엇인가요?",
      hint: "먼저 나의 성씨를 골라주세요.",
      options: SURNAME_OPTIONS,
      customLabel: "직접 입력",
      customPlaceholder: "예: 남궁",
      customMaxLength: 4,
    },
    {
      key: "myBongwan",
      title: `내 본관은 무엇인가요? (${input.mySurname ?? ""}씨)`,
      hint: "모르면 '본관 상관없이'를 골라도 괜찮아요.",
      options: bongwansFor(input.mySurname ?? ""),
      customLabel: "직접 입력",
      customPlaceholder: "예: 밀양",
      customMaxLength: 8,
    },
    {
      key: "partnerSurname",
      title: "상대방의 성씨는 무엇인가요?",
      hint: "이번엔 상대방의 성씨를 골라주세요.",
      options: SURNAME_OPTIONS,
      customLabel: "직접 입력",
      customPlaceholder: "예: 제갈",
      customMaxLength: 4,
    },
    {
      key: "partnerBongwan",
      title: `상대방의 본관은 무엇인가요? (${input.partnerSurname ?? ""}씨)`,
      hint: "모르면 '본관 상관없이'를 골라도 괜찮아요.",
      options: bongwansFor(input.partnerSurname ?? ""),
      customLabel: "직접 입력",
      customPlaceholder: "예: 전주",
      customMaxLength: 8,
    },
  ];
}

/** 공유 링크(?my=성:본관&partner=성:본관)의 입력값. 형식이 어긋나면 무시한다. */
function pairInputFromUrl(): PairInput | null {
  const params = new URLSearchParams(window.location.search);
  const parse = (raw: string | null) => {
    if (!raw) return null;
    const [surname, bongwan] = raw.split(":");
    return surname && bongwan ? { surname, bongwan } : null;
  };
  const my = parse(params.get("my"));
  const partner = parse(params.get("partner"));
  if (!my || !partner) return null;
  return {
    mySurname: my.surname,
    myBongwan: my.bongwan,
    partnerSurname: partner.surname,
    partnerBongwan: partner.bongwan,
  };
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("start");
  const [previousScreen, setPreviousScreen] = useState<Screen>("start");
  const [pairInput, setPairInput] = useState<Partial<PairInput>>({});
  const [stepIndex, setStepIndex] = useState(0);
  const [outcome, setOutcome] = useState<Outcome | null>(null);

  /**
   * 공유 링크(?my=&partner=)로 들어온 경우 결과를 바로 계산해 보여준다.
   * 정적 프리렌더 시점에는 window가 없으므로 마운트 후에 읽는다.
   */
  useEffect(() => {
    const sharedInput = pairInputFromUrl();
    const sharedOutcome = sharedInput ? computeOutcome(sharedInput) : null;
    if (sharedOutcome) {
      setOutcome(sharedOutcome);
      setScreen("result");
    }
  }, []);

  const steps = stepsFor(pairInput);

  /** 모든 선택·결과 상태를 초기화한다(다시 하기·홈 이동 공통). */
  const resetState = () => {
    setPairInput({});
    setStepIndex(0);
    setOutcome(null);
  };

  const start = () => {
    resetState();
    history.replaceState(null, "", window.location.pathname);
    // 실제 참여수 집계(세션당 1회). 실패해도 테스트 진행에는 영향이 없다.
    void recordParticipation(SEONGSSI_HAPGUNG_TEST_ID);
    setScreen("pick");
  };

  const selectValue = (value: string) => {
    const key = steps[stepIndex].key;
    const next: Partial<PairInput> = { ...pairInput, [key]: value };
    if (key === "mySurname" && pairInput.mySurname !== value) next.myBongwan = undefined;
    if (key === "partnerSurname" && pairInput.partnerSurname !== value) next.partnerBongwan = undefined;
    setPairInput(next);

    if (stepIndex < steps.length - 1) {
      setStepIndex(stepIndex + 1);
      return;
    }

    const result = computeOutcome(next);
    if (result) {
      setOutcome(result);
      setScreen("calculating");
    }
  };

  const back = () => {
    if (stepIndex === 0) {
      setScreen("start");
    } else {
      setStepIndex(stepIndex - 1);
    }
  };

  const showResult = useCallback(() => {
    setScreen("result");
    if (outcome) {
      // Next.js가 history.replaceState를 라우터 상태와 동기화하도록 감싸므로,
      // setState 업데이터 함수 안(렌더 단계)에서 호출하면 "다른 컴포넌트를
      // 렌더링하는 동안 Router를 업데이트했다" 오류가 난다. 이벤트 콜백인
      // 여기서 outcome을 의존성으로 직접 읽어 처리한다.
      const full = shareUrl(outcome.input);
      const search = full.slice(full.indexOf("?"));
      history.replaceState(null, "", `${window.location.pathname}${search}`);
    }
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

  return (
    <div className="seongssi-hapgung-app">
      <div className="app-frame">
        <Link href="/" className="ms-home-link">
          <span aria-hidden="true">←</span> 마이스윗테스트 홈
        </Link>
        {screen === "start" && <StartScreen onStart={start} onShowPrivacy={showPrivacy} />}
        {screen === "pick" && (
          <PickScreen
            step={stepIndex + 1}
            totalSteps={steps.length}
            title={steps[stepIndex].title}
            hint={steps[stepIndex].hint}
            options={steps[stepIndex].options}
            selected={pairInput[steps[stepIndex].key] ?? null}
            customLabel={steps[stepIndex].customLabel}
            customPlaceholder={steps[stepIndex].customPlaceholder}
            customMaxLength={steps[stepIndex].customMaxLength}
            onSelect={selectValue}
            onBack={back}
          />
        )}
        {screen === "calculating" && <CalculatingScreen onDone={showResult} />}
        {screen === "result" &&
          (outcome ? (
            <ResultScreen outcome={outcome} onRestart={restart} onShowPrivacy={showPrivacy} />
          ) : (
            // 결과 없이 결과 화면에 들어온 경우(잘못된 공유 링크 등)의 안전한 대체 화면
            <NotFoundScreen onGoHome={goHome} />
          ))}
        {screen === "privacy" && <PrivacyPolicy onBack={closePrivacy} />}
      </div>
    </div>
  );
}
