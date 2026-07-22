type Props = {
  onGoHome: () => void;
};

export function NotFoundScreen({ onGoHome }: Props) {
  return (
    <main className="screen notfound-screen">
      <p className="notfound-code" aria-hidden="true">
        404
      </p>
      <h1 className="notfound-title">페이지를 찾을 수 없어요</h1>
      <p className="notfound-text">
        주소가 바뀌었거나 존재하지 않는 페이지예요. 홈으로 돌아가 '나는 어떤
        간식?' 테스트를 시작해 보세요.
      </p>
      <button type="button" className="btn btn-primary" onClick={onGoHome}>
        홈으로 가기
      </button>
    </main>
  );
}
