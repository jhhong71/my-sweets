/**
 * 직접 그린 장식 SVG 모음.
 * 첨부된 참고 이미지의 "파스텔 핑크 + 손그림" 분위기만 참고했고,
 * 특정 작가의 캐릭터나 도안을 옮겨 그리지 않은 자체 도형이다.
 * 모두 장식용이라 aria-hidden 처리하고, 색은 currentColor 대신 명시한다.
 */

type IconProps = {
  className?: string;
  size?: number;
};

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 48 48",
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": true as const,
  focusable: "false" as const,
});

/** 통통한 하트 */
export function Heart({ className, size = 24 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path
        d="M24 39c-9.5-6.8-15-12.6-15-19a8.6 8.6 0 0 1 15-5.6A8.6 8.6 0 0 1 39 20c0 6.4-5.5 12.2-15 19z"
        fill="currentColor"
      />
    </svg>
  );
}

/** 리본 */
export function Bow({ className, size = 24 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <g fill="currentColor">
        <path d="M23 24 9.5 15.5c-1.6-1-3.5.3-3.2 2.1l1.7 9.6c.3 1.7 2.3 2.5 3.7 1.5L23 24z" />
        <path d="M25 24l11.3 4.7c1.4 1 3.4.2 3.7-1.5l1.7-9.6c.3-1.8-1.6-3.1-3.2-2.1L25 24z" />
        <ellipse cx="24" cy="24" rx="4.2" ry="3.6" />
      </g>
      <g stroke="#fff" strokeWidth="1.6" strokeLinecap="round" opacity=".55" fill="none">
        <path d="M13 19.5c2 1.4 3.8 3 5.4 4.5" />
        <path d="M35 19.5c-2 1.4-3.8 3-5.4 4.5" />
      </g>
    </svg>
  );
}

/** 동그란 고양이 얼굴 */
export function Kitty({ className, size = 28 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path
        d="M11 17c-.6-3.4-1-6.2-.6-6.8.5-.8 3.7 1 6.6 2.8a17.6 17.6 0 0 1 14 0c2.9-1.8 6.1-3.6 6.6-2.8.4.6 0 3.4-.6 6.8A15.2 15.2 0 0 1 38 24c0 7.6-6.3 13-14 13s-14-5.4-14-13c0-2.5.4-4.9 1-7z"
        fill="currentColor"
      />
      <g fill="#7A4A57">
        <ellipse cx="18.5" cy="24" rx="1.7" ry="2.1" />
        <ellipse cx="29.5" cy="24" rx="1.7" ry="2.1" />
        <path
          d="M21.6 28.6c.7.9 1.5 1.3 2.4 1.3s1.7-.4 2.4-1.3"
          stroke="#7A4A57"
          strokeWidth="1.4"
          strokeLinecap="round"
          fill="none"
        />
      </g>
      <g fill="#F0899F" opacity=".8">
        <ellipse cx="14.6" cy="27.4" rx="2.4" ry="1.5" />
        <ellipse cx="33.4" cy="27.4" rx="2.4" ry="1.5" />
      </g>
    </svg>
  );
}

/** 딸기 */
export function Strawberry({ className, size = 24 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M24 12c8 0 13 4.6 13 10.6C37 30 30.6 40 24 40S11 30 11 22.6C11 16.6 16 12 24 12z" fill="currentColor" />
      <path
        d="M24 7c1 2.2 1 3.4.6 5.2 2.6-1.4 4.6-1.6 7-1-1.2 2-2.6 3-4.6 3.8 2 .3 3.2 1 4.4 2.2-3 .8-5.4.6-7.4-.4-2 1-4.4 1.2-7.4.4 1.2-1.2 2.4-1.9 4.4-2.2-2-.8-3.4-1.8-4.6-3.8 2.4-.6 4.4-.4 7 1-.4-1.8-.4-3 .6-5.2z"
        fill="#93BE8E"
      />
      <g fill="#FFF3F6" opacity=".85">
        <circle cx="19" cy="22" r="1.1" />
        <circle cx="28" cy="21" r="1.1" />
        <circle cx="24" cy="27" r="1.1" />
        <circle cx="31" cy="27" r="1.1" />
        <circle cx="17" cy="29" r="1.1" />
        <circle cx="24" cy="34" r="1.1" />
      </g>
    </svg>
  );
}

/** 데이지 꽃 */
export function Daisy({ className, size = 24 }: IconProps) {
  const petals = Array.from({ length: 8 }, (_, i) => i * 45);
  return (
    <svg {...base(size)} className={className}>
      <g fill="currentColor">
        {petals.map((deg) => (
          <ellipse key={deg} cx="24" cy="12.5" rx="4.4" ry="7.5" transform={`rotate(${deg} 24 24)`} />
        ))}
      </g>
      <circle cx="24" cy="24" r="5.4" fill="#F7C978" />
    </svg>
  );
}

/** 찻잔 */
export function Teacup({ className, size = 28 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M10 19h24v9c0 5.5-4.4 9.5-10 9.5h-4c-5.6 0-10-4-10-9.5v-9z" fill="currentColor" />
      <path
        d="M34 22h3.4a4.6 4.6 0 0 1 0 9.2H34"
        stroke="currentColor"
        strokeWidth="2.6"
        fill="none"
        strokeLinecap="round"
      />
      <rect x="7" y="38" width="30" height="3.4" rx="1.7" fill="currentColor" opacity=".55" />
      <g stroke="#E4708F" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity=".6">
        <path d="M18 14c1.4-1.4 1.4-2.8 0-4.2" />
        <path d="M24 13c1.4-1.4 1.4-2.8 0-4.2" />
      </g>
    </svg>
  );
}

/** 별 반짝임 */
export function Sparkle({ className, size = 16 }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path
        d="M24 6c1.6 9.4 8 15.8 17.4 18-9.4 2.2-15.8 8.6-17.4 18-1.6-9.4-8-15.8-17.4-18C16 21.8 22.4 15.4 24 6z"
        fill="currentColor"
      />
    </svg>
  );
}

/** 배경에 흩뿌리는 하트 — 위치·크기·투명도를 고정값으로 두어 렌더마다 흔들리지 않게 한다. */
const FLOATING = [
  { top: "4%", left: "6%", size: 46, opacity: 0.5, rotate: -12 },
  { top: "11%", left: "82%", size: 62, opacity: 0.42, rotate: 14 },
  { top: "26%", left: "2%", size: 34, opacity: 0.36, rotate: 8 },
  { top: "38%", left: "91%", size: 40, opacity: 0.4, rotate: -18 },
  { top: "54%", left: "5%", size: 54, opacity: 0.34, rotate: 16 },
  { top: "67%", left: "86%", size: 46, opacity: 0.38, rotate: -8 },
  { top: "80%", left: "10%", size: 38, opacity: 0.32, rotate: 12 },
  { top: "90%", left: "78%", size: 52, opacity: 0.3, rotate: -14 },
];

export function FloatingHearts() {
  return (
    <div className="floating-hearts" aria-hidden="true">
      {FLOATING.map((h, i) => (
        <span
          key={i}
          className="floating-heart"
          style={{
            top: h.top,
            left: h.left,
            opacity: h.opacity,
            transform: `rotate(${h.rotate}deg)`,
          }}
        >
          <Heart size={h.size} />
        </span>
      ))}
    </div>
  );
}
