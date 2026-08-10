import { GlassTab, Sparkle } from "./Decor";

type Props = {
  onRestart: () => void;
  onShowPrivacy: () => void;
};

/**
 * 응답 다양성이 부족해(straightlining 등) 대처 스타일을 판별할 수 없을 때
 * 보여주는 화면.
 *
 * 5개 유형 중 하나로 분류하지 않는다 — 특히 유연 대응러로 분류하지 않는다.
 * 축 점수가 정확히 중앙값이 나온 건 "균형 잡힌 성향"이라서가 아니라 정방향·
 * 역방향 문항이 4:4로 상쇄됐기 때문이라, 유형 결과를 보여주면 실제로 없는
 * 정보를 있는 것처럼 전달하게 된다. 결과 저장·공유 버튼도 두지 않는다.
 */
export function LowInformationScreen({ onRestart, onShowPrivacy }: Props) {
  return (
    <div className="screen">
      <header className="masthead">
        <span className="masthead-rule" aria-hidden="true" />
        <p className="masthead-label">결과를 확정하지 못했어요</p>
      </header>

      <h1 className="start-title">
        조금만 더
        <br />
        <span className="title-mark">자세히 알려주세요</span>
      </h1>

      <p className="start-desc">
        응답이 한쪽으로 너무 일정해서 대처 스타일을 정확히 구분하기 어려워요.
        문항 내용을 읽고 나에게 더 가까운 선택지를 골라 다시 해보세요.
      </p>

      <section className="glass-card">
        <GlassTab />
        <Sparkle className="card-sparkle" />
        <div className="glass-card-body">
          <h2 className="section-caption">왜 이런 안내가 나왔나요?</h2>
          <ul className="info-list">
            <li className="info-row">
              <p className="info-name">서로 반대되는 문항이 섞여 있어요</p>
              <p className="info-desc">
                &lsquo;원인을 파악해 해결한다&rsquo;처럼 문제 해결을 묻는 문항과,
                &lsquo;해결책보다 마음을 편하게 만드는 것부터 한다&rsquo;처럼 그
                반대를 묻는 문항이 함께 들어 있어요.
              </p>
            </li>
            <li className="info-row">
              <p className="info-name">같은 번호만 고르면 서로 상쇄돼요</p>
              <p className="info-desc">
                반대되는 두 문항에 똑같이 답하면 어느 쪽으로도 치우치지 않은
                것으로 계산돼서, 어떤 번호를 고르셨든 결과가 같아져요.
              </p>
            </li>
            <li className="info-row">
              <p className="info-name">문항마다 다르게 답해주세요</p>
              <p className="info-desc">
                나와 가까운 문항엔 높게, 먼 문항엔 낮게 답하시면 나만의 대처
                스타일이 또렷하게 드러나요.
              </p>
            </li>
          </ul>
        </div>
      </section>

      <button className="btn-primary" onClick={onRestart}>
        다시 테스트하기
      </button>

      <p className="start-disclaimer">
        이 테스트는 공개된 스트레스-대처 이론의 구조를 참고하여 제작한
        엔터테인먼트 콘텐츠입니다. 전문적인 심리 진단, 채용 또는 인사평가를
        목적으로 하지 않습니다.
      </p>

      <button className="btn-link" onClick={onShowPrivacy}>
        개인정보처리방침 · 광고 및 제휴 안내
      </button>
    </div>
  );
}
