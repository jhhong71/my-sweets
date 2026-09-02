type Props = {
  onBack: () => void;
};

export function PrivacyPolicy({ onBack }: Props) {
  return (
    <main className="screen info-screen">
      <button type="button" className="icon-btn" onClick={onBack}>
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
          이 테스트는 회원가입이 없으며 이름, 연락처, 이메일, 주소, 회사명 등
          개인을 식별할 수 있는 정보를 수집하지 않습니다. 선택한 답변은 결과를
          계산하기 위해 브라우저 안에서만 사용되며, 서버로 전송하거나 저장하지
          않습니다.
        </p>
      </section>

      <section className="info-section">
        <h2>응답 데이터 처리</h2>
        <p>
          선택한 답변과 계산된 점수는 화면을 벗어나면 사라집니다. 브라우저의
          로컬 저장소에도 남기지 않으며, 외부 AI·분석·광고 서비스로 응답 원문을
          전송하지 않습니다. 결과 공유 링크에는 유형 ID만 담기고 개인 응답
          내용은 포함되지 않습니다.
        </p>
      </section>

      <section className="info-section">
        <h2>광고 및 제휴 안내</h2>
        <p>
          이 서비스는 운영을 위해 카카오 애드핏 광고와 쿠팡파트너스 추천 영역을
          둘 수 있습니다. 광고 단위 ID와 제휴 URL이 설정되기 전까지 화면에 보이는
          광고 영역은 <strong>미리보기 영역</strong>이며, 실제 광고 네트워크를
          호출하지 않습니다. 질문을 진행하는 화면에는 광고를 넣지 않습니다.
        </p>
        <p>쿠팡파트너스 추천 링크가 연결되는 경우 아래 문구가 함께 표시됩니다.</p>
        <p className="info-quote">
          이 포스팅은 쿠팡 파트너스 활동의 일환으로 이에 따른 일정액의 수수료를
          제공받습니다.
        </p>
      </section>

      <section className="info-section">
        <h2>테스트의 성격과 한계</h2>
        <p>
          본 테스트는 선택한 상황에 대한 응답을 바탕으로 나와 가까운 연애 성향을
          재미로 알려주는 <strong>엔터테인먼트 콘텐츠</strong>입니다. 과학적으로
          검증된 심리 진단 도구가 아니며, 실제 애착 유형 진단이나 상담을
          대체할 수 없습니다. 결과는 그날의 상황이나 만나는 상대에 따라 달라질
          수 있습니다.
        </p>
      </section>

      <button type="button" className="btn btn-ghost" onClick={onBack}>
        돌아가기
      </button>
    </main>
  );
}
