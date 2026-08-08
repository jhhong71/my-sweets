/**
 * 카드 상단의 "탭" 장식. 종이 서류철에 붙은 인덱스 탭처럼 카드 위쪽
 * 가운데에 겹쳐 놓는 용도로 쓴다. 항상 장식용이라 스크린리더에서 제외한다.
 */
export function CardTab() {
  return <span className="card-tab" aria-hidden="true" />;
}

/**
 * 우표 소인(postmark) 느낌의 장식 도장. 동심원 두 겹 + 물결선으로 구성했다.
 * 카드 모서리에 옅게 겹쳐 종이 다이어리 같은 분위기를 낸다.
 */
export function Postmark({ className }: { className?: string }) {
  return (
    <svg
      className={`postmark ${className ?? ""}`}
      width="72"
      height="72"
      viewBox="0 0 72 72"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="36" cy="36" r="26" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="36" cy="36" r="19" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M4 30c6 3 6-3 12 0M4 36c6 3 6-3 12 0M4 42c6 3 6-3 12 0"
        stroke="currentColor"
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** 폴라로이드 프레임 모서리에 꽂힌 종이 집게 장식. */
export function Paperclip({ className }: { className?: string }) {
  return (
    <svg
      className={`paperclip ${className ?? ""}`}
      width="34"
      height="46"
      viewBox="0 0 34 46"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M22 6v24a9 9 0 0 1-18 0V13a6 6 0 0 1 12 0v17a3 3 0 0 1-6 0V14"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
