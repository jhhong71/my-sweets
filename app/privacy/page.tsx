import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const DESCRIPTION = "마이스윗테스트가 방문자 데이터를 다루는 방식을 안내합니다.";

export const metadata: Metadata = {
  // 루트 layout의 title 템플릿이 " | 마이스윗테스트"를 자동으로 붙인다.
  title: "개인정보처리방침",
  description: DESCRIPTION,
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "개인정보처리방침 | 마이스윗테스트",
    description: DESCRIPTION,
    url: "/privacy",
    type: "website",
    locale: "ko_KR",
    siteName: "마이스윗테스트",
  },
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="text-lg font-bold tracking-tight">{title}</h2>
      <div className="mt-2 space-y-2 text-[15px] leading-relaxed text-ink-soft">{children}</div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="container py-16 md:py-24">
          <div className="mx-auto max-w-2xl">
            <h1 className="text-[clamp(1.6rem,4vw,2.2rem)] font-extrabold tracking-tight">
              개인정보처리방침
            </h1>
            <p className="mt-2 text-sm text-ink-soft">
              최종 업데이트: {new Date().toISOString().slice(0, 10)}
            </p>

            <Section title="회원가입 없이 이용해요">
              <p>
                마이스윗테스트는 별도의 회원가입 없이 누구나 이용할 수 있어요. 이름,
                연락처, 이메일처럼 개인을 식별할 수 있는 정보를 직접 수집하지
                않습니다.
              </p>
            </Section>

            <Section title="테스트 응답은 브라우저 안에서만 처리돼요">
              <p>
                문항에 대한 답변과 결과 계산은 방문자의 브라우저에서만 이뤄지며,
                별도 서버로 전송하거나 저장하지 않습니다. 결과 공유 링크에는 결과
                유형만 담기고, 개인의 응답 내용은 포함되지 않습니다.
              </p>
            </Section>

            <Section title="참여인원 집계 (Firebase)">
              <p>
                각 테스트를 실제로 몇 명이 시작했는지 보여주기 위해 Firebase
                Realtime Database에 테스트별 참여 횟수를{" "}
                <strong>숫자로만</strong> 집계합니다. 이 집계는 Firebase Anonymous
                Authentication(익명 인증)을 이용해 부정확한 중복 집계를
                방지하는 데만 사용되며, 이름·이메일 등 개인을 식별하는 정보와
                연결되지 않습니다. 저장되는 값은 테스트별 참여 횟수 숫자가
                전부입니다.
              </p>
            </Section>

            <Section title="광고">
              <p>
                이 사이트는 운영을 위해 Google AdSense와 카카오 애드핏 광고를
                게재할 수 있어요. 두 광고 서비스는 광고 제공을 위해 쿠키 또는
                기기 식별자를 사용할 수 있으며, 자세한 내용과 광고 개인화
                설정은 각 서비스의 정책 페이지에서 확인하고 관리할 수 있습니다.
              </p>
            </Section>

            <Section title="테스트 결과의 성격">
              <p>
                이 사이트에서 제공하는 모든 테스트 결과는{" "}
                <strong>재미와 자기 탐색을 위한 참고용 콘텐츠</strong>입니다.
                과학적으로 검증된 심리검사가 아니며, 전문적인 심리 진단이나
                의학적 소견을 대신하지 않습니다.
              </p>
            </Section>

            <Section title="문의">
              <p>
                이 방침에 대해 궁금한 점이 있다면 소개 페이지의 SNS 계정으로
                연락해주세요.
              </p>
            </Section>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
