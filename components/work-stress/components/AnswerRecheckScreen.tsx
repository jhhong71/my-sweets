type Props = {
  onRecheck: () => void;
};

/**
 * 선택이 거의 반복되어 결과를 확정하기 어려울 때, 결과 화면에 들어가기
 * 전에 보여주는 안내.
 *
 * 채점 방식·문항 구조 같은 내부 구현은 설명하지 않는다. 사용자가 잘못
 * 답했다고 단정하지도, 유형 결과를 임의로 만들어내지도 않는다.
 */
export function AnswerRecheckScreen({ onRecheck }: Props) {
  return (
    <div className="screen recheck-screen">
      <h1 className="recheck-title">답변을 한 번만 더 확인해 주세요</h1>
      <p className="recheck-desc">
        비슷한 선택이 많이 반복되어 지금 답변만으로는 대처 스타일을 정확하게
        구분하기 어려워요. 각 상황에서 실제 내 모습과 가장 가까운 답변을
        골라주세요.
      </p>
      <button className="btn-primary" onClick={onRecheck}>
        답변 다시 확인하기
      </button>
    </div>
  );
}
