/**
 * 히어로 대표 일러스트.
 * 파스텔 정물(꽃병·캔들·플라워) 구성을 사이트 팔레트로 단순화해 그린 SVG.
 * 외부 이미지 의존이 없어 정적 export에서도 항상 동일하게 렌더된다.
 */
export function HeroArt({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 420 420"
      className={className}
      role="img"
      aria-label="파스텔 톤의 꽃과 오브제가 어우러진 일러스트"
    >
      <defs>
        <linearGradient id="ha-sage" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0" stopColor="#E4F3DE" />
          <stop offset="1" stopColor="#C9E6C4" />
        </linearGradient>
        <linearGradient id="ha-pink" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFE3EC" />
          <stop offset="1" stopColor="#FFB3CC" />
        </linearGradient>
        <linearGradient id="ha-cream" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFF8F0" />
          <stop offset="1" stopColor="#F2E2D2" />
        </linearGradient>
        <linearGradient id="ha-mint" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#EAF7E5" />
          <stop offset="1" stopColor="#BFE0BC" />
        </linearGradient>
        <radialGradient id="ha-glow" cx="0.3" cy="0.25" r="0.7">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* 뒤쪽 세이지 배경 오브 */}
      <path
        d="M210 34c66 0 128 30 152 84 24 54 8 122-28 168-36 46-96 72-152 68-58-4-116-38-140-92-24-54-8-120 30-164C110 54 156 34 210 34Z"
        fill="url(#ha-sage)"
      />
      <ellipse cx="150" cy="130" rx="96" ry="72" fill="url(#ha-glow)" />

      {/* 왼쪽: 꼬인 민트 캔들 */}
      <g>
        <path
          d="M118 190c10-8 10-18 0-26s-10-18 0-26 10-18 0-26"
          stroke="#A9D6A6"
          strokeWidth="17"
          strokeLinecap="round"
          fill="none"
        />
        <rect x="109" y="188" width="18" height="86" rx="9" fill="url(#ha-mint)" />
      </g>

      {/* 가운데: 분홍 테이퍼 캔들 */}
      <g>
        <rect x="150" y="120" width="15" height="154" rx="7.5" fill="url(#ha-pink)" />
        <circle cx="157.5" cy="118" r="4" fill="#FFD87A" />
      </g>

      {/* 오른쪽: 꽃이 꽂힌 크림 화병 */}
      <g>
        <path d="M232 274v-74c0-9 5-13 5-22s-5-11-5-18h30c0 7-5 9-5 18s5 13 5 22v74Z" fill="url(#ha-cream)" />
        {/* 줄기 */}
        <path d="M247 160c2-26 6-42 14-58" stroke="#9CC98F" strokeWidth="4" strokeLinecap="round" fill="none" />
        {/* 거베라 꽃잎 */}
        <g fill="#FF9EBD">
          {Array.from({ length: 10 }).map((_, i) => (
            <ellipse
              key={i}
              cx="262"
              cy="86"
              rx="7"
              ry="19"
              transform={`rotate(${i * 36} 262 86)`}
            />
          ))}
        </g>
        <circle cx="262" cy="86" r="9" fill="#FFD87A" />
      </g>

      {/* 앞쪽: 버블 큐브 오브제 */}
      <g fill="url(#ha-pink)">
        {[
          [188, 250],
          [212, 250],
          [188, 274],
          [212, 274],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="13" />
        ))}
      </g>

      {/* 작은 디시 */}
      <path d="M286 258c14 0 26 7 26 15s-12 15-26 15-26-7-26-15 12-15 26-15Z" fill="#FFE3EC" />

      {/* 바닥 그림자 */}
      <ellipse cx="210" cy="288" rx="118" ry="14" fill="#B9D8B4" opacity="0.45" />
    </svg>
  );
}
