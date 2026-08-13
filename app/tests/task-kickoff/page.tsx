import type { Metadata } from "next";
import TaskKickoffApp from "@/components/task-kickoff/App";
import "@/components/task-kickoff/task-kickoff.css";

export const metadata: Metadata = {
  title: "업무 시작 스타일 테스트",
  description:
    "새 업무를 받았을 때 계획부터 세우는지 바로 뛰어드는지, 자료를 찾는지 감으로 가는지, 함께 하는지 혼자 하는지로 알아보는 8가지 시작 유형.",
  alternates: {
    canonical: "/tests/task-kickoff",
  },
  openGraph: {
    title: "업무 시작 스타일 테스트",
    description: "새 일을 받으면 나는 무엇부터 할까? 8가지 시작 유형 중 내 유형은?",
    url: "/tests/task-kickoff",
    type: "website",
    locale: "ko_KR",
    siteName: "마이스윗테스트",
  },
};

export default function TaskKickoffPage() {
  // App 컴포넌트가 자체 스코프 래퍼(.task-kickoff-app)를 직접 렌더하므로
  // 여기서 추가 래퍼가 필요 없다.
  return <TaskKickoffApp />;
}
