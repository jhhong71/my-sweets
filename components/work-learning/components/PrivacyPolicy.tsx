type Props = {
  onBack: () => void;
};

export function PrivacyPolicy({ onBack }: Props) {
  return (
    <div className="screen info-screen">
      <div className="info-top">
        <button className="btn-back" onClick={onBack}>
          ← 뒤로 가기
        </button>
        <h1 className="info-title">개인정보처리방침 · 광고 안내</h1>
      </div>

      <section className="info-section">
        <h3>개인정보처리방침</h3>
        <p>
          업무 학습 스타일 테스트는 별도의 회원가입이나 로그인 없이 이용할 수
          있는 웹 서비스이며, 이름·이메일 등 개인을 식별할 수 있는 정보를
          수집하지 않습니다.
        </p>
        <ul>
          <li>테스트 문항에 대한 답변과 결과 계산은 이용자의 브라우저 안에서만 처리되며, 서버로 전송되거나 저장되지 않습니다.</li>
          <li>결과 공유 링크에는 결과 유형을 나타내는 값만 포함되며, 개인의 실제 응답이나 점수는 포함되지 않습니다.</li>
          <li>결과 카드 이미지는 이용자의 기기에만 저장되며, 서비스 운영자에게 전송되지 않습니다.</li>
          <li>테스트를 시작한 횟수는 Firebase Realtime Database에 테스트별 숫자로만 집계되며, 이름·이메일 등 개인을 식별하는 정보와 연결되지 않습니다.</li>
        </ul>
      </section>

      <section className="info-section">
        <h3>광고 및 제휴 안내</h3>
        <p>
          이 서비스는 콘텐츠 운영 비용을 충당하기 위해 광고 및 제휴 링크를
          포함할 수 있습니다. 광고와 제휴 영역은 테스트 콘텐츠와 명확히
          구분되도록 "광고" 또는 "추천 상품"으로 표시합니다.
        </p>
        <ul>
          <li>시작 화면과 결과 화면에는 Google AdSense, 카카오 애드핏 광고 영역이 있으며, 광고 서비스는 광고 제공을 위해 쿠키 또는 기기 식별자를 사용할 수 있습니다.</li>
          <li>질문 진행 화면과 결과 계산 화면에는 광고를 표시하지 않습니다.</li>
          <li>결과 화면 하단의 추천 상품 영역은 쿠팡파트너스 제휴 링크이며, 이 링크를 통해 발생한 구매에 대해 일정액의 수수료를 제공받을 수 있습니다.</li>
          <li>결과 카드로 저장·공유되는 이미지에는 광고나 제휴 링크가 포함되지 않습니다.</li>
        </ul>
        <p>
          "이 포스팅은 쿠팡 파트너스 활동의 일환으로 이에 따른 일정액의
          수수료를 제공받습니다."
        </p>
      </section>

      <section className="info-section">
        <h3>테스트 한계 및 비진단 안내</h3>
        <p>
          이 테스트는 Kolb(1984)의 경험학습이론에서 제시하는 두 가지 학습
          차원의 이론적 구조를 참고하여 만든 엔터테인먼트 콘텐츠입니다.
          문항은 상업적으로 배포되는 원 검사(Kolb Learning Style Inventory)의
          문항을 번역한 것이 아니라, 공개된 이론적 정의만 참고해 새로
          작성했으며, 원 이론의 신뢰도·타당도가 이 앱에 그대로 적용된다고
          보장하지 않습니다. 전문적인 심리 진단, 채용, 인사평가 목적으로
          사용할 수 없습니다.
        </p>
      </section>

      <p className="info-updated">최종 업데이트: 2026-08-08</p>
    </div>
  );
}
