type Props = {
  onGoHome: () => void;
};

export function NotFoundScreen({ onGoHome }: Props) {
  return (
    <div className="screen notfound-screen">
      <p className="notfound-code" aria-hidden="true">
        404
      </p>
      <h1 className="notfound-title">페이지를 찾을 수 없어요</h1>
      <p className="notfound-desc">
        요청하신 주소를 찾을 수 없습니다. 주소를 다시 확인하거나 홈으로
        돌아가 테스트를 시작해 보세요.
      </p>
      <button className="btn-primary" onClick={onGoHome}>
        홈으로 돌아가기
      </button>
    </div>
  );
}
