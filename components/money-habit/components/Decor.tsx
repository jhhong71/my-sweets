/**
 * 화면 배경에 고정으로 깔리는 부유하는 블러 블롭 장식. 콘텐츠 뒤에 한 번만
 * 렌더링하며, 항상 장식용이라 스크린리더에서 제외한다.
 */
export function BackgroundBlobs() {
  return (
    <div className="bg-blobs" aria-hidden="true">
      <span className="bg-blob bg-blob-a" />
      <span className="bg-blob bg-blob-b" />
      <span className="bg-blob bg-blob-c" />
    </div>
  );
}

/** 유리 카드 위쪽 가운데에 겹쳐 놓는 작은 글로시 탭 장식. */
export function GlassTab() {
  return <span className="glass-tab" aria-hidden="true" />;
}

/** 카드 모서리에 옅게 겹치는 반짝임(스파클) 장식. */
export function Sparkle({ className }: { className?: string }) {
  return (
    <svg
      className={`sparkle ${className ?? ""}`}
      width="46"
      height="46"
      viewBox="0 0 46 46"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M23 4c1.2 8 4.6 11.4 12.6 12.6C27.6 17.8 24.2 21.2 23 29.2 21.8 21.2 18.4 17.8 10.4 16.6 18.4 15.4 21.8 12 23 4z"
        fill="currentColor"
      />
      <circle cx="38" cy="34" r="2.6" fill="currentColor" />
      <circle cx="8" cy="30" r="1.8" fill="currentColor" />
    </svg>
  );
}
