type Props = {
  onBack: () => void;
};

export function PrivacyPolicy({ onBack }: Props) {
  return (
    <main className="screen info-screen">
      <button type="button" className="icon-btn" onClick={onBack} aria-label="뒤로">
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            d="M15 5 L8 12 L15 19"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        뒤로
      </button>

      <h1 className="info-title">개인정보처리방침 · 광고/제휴 안내</h1>

      <section className="info-section">
        <h2>수집하는 개인정보</h2>
        <p>
          이 테스트는 회원가입이 없으며 이름, 연락처, 주민등록번호 등 개인을
          식별할 수 있는 정보를 수집하지 않습니다. 응답한 문항의 값은 결과를
          계산하기 위해 브라우저 안에서만 사용되며, 별도의 서버로 전송하거나
          저장하지 않습니다.
        </p>
      </section>

      <section className="info-section">
        <h2>응답 데이터 처리</h2>
        <p>
          선택한 답변과 계산된 결과는 화면을 벗어나면 사라집니다. 외부 AI,
          분석 서비스, 광고 서비스로 응답 원문을 전송하지 않습니다. 결과 공유
          링크에는 유형 ID만 담기며, 개인 응답 내용은 포함되지 않습니다.
        </p>
      </section>

      <section className="info-section">
        <h2>광고 및 제휴 안내</h2>
        <p>
          이 서비스는 운영을 위해 카카오 애드핏 광고와 쿠팡파트너스 추천 영역을
          둘 수 있습니다. 현재 화면에 보이는 광고 영역은 <strong>미리보기
          영역</strong>으로, 실제 광고 네트워크를 호출하지 않습니다.
        </p>
        <p>
          쿠팡파트너스 추천 링크가 연결되는 경우 아래 문구가 함께 표시됩니다.
        </p>
        <p className="info-quote">
          이 포스팅은 쿠팡 파트너스 활동의 일환으로 이에 따른 일정액의 수수료를
          제공받습니다.
        </p>
      </section>

      <section className="info-section">
        <h2>테스트의 성격과 한계</h2>
        <p>
          본 테스트는 선택한 상황과 취향을 바탕으로 나와 닮은 간식을 재미로
          알려주는 <strong>엔터테인먼트 콘텐츠</strong>입니다. 과학적으로 검증된
          성격검사가 아니며, 전문 심리 진단, 질병·정신건강 상태 판정,
          채용·인사평가의 근거로 사용할 수 없습니다. 결과는 상황과 기분에 따라
          달라질 수 있습니다.
        </p>
      </section>

      <button type="button" className="btn btn-ghost" onClick={onBack}>
        돌아가기
      </button>
    </main>
  );
}
