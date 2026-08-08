import type { IconKey } from "../types";

type Props = {
  iconKey: IconKey;
  size?: number;
  /** 지정하면 의미 있는 이미지로, 없으면 장식용으로 처리한다. */
  title?: string;
};

/** 결과 유형별 몸통 색(굵은 외곽선 + 단색 채우기 도들 캐릭터). */
const BODY_COLOR: Record<IconKey, string> = {
  rocket: "#E2704A",
  telescope: "#6E8F5C",
  book: "#D1A23E",
  bolt: "#C1592E",
  compass: "#9C7A94",
};

const OUTLINE = "#3A2B1E";
const BLUSH = "#F5A6A6";

/**
 * 결과 유형별 손그림풍 캐릭터 아이콘 (이모지·외부 이미지 미사용).
 *
 * 참고 이미지(굵은 검정 외곽선 + 단색 파스텔 채우기 + 단순한 점 눈·볼터치)
 * 스타일을 따라, 공통 몸통(둥근 알 모양 + 짧은 다리)에 유형별 귀 모양과
 * 가슴 마크로 구분한다. 모든 유형이 같은 캐릭터 종(種)처럼 보이도록
 * 몸통·얼굴 구조는 공유하고 색과 디테일만 유형별로 바꾼다.
 */
export function LearnIcon({ iconKey, size = 56, title }: Props) {
  const color = BODY_COLOR[iconKey];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <Ears iconKey={iconKey} color={color} />

      {/* 짧은 다리 */}
      <ellipse cx="24" cy="53" rx="6" ry="4.5" fill={color} stroke={OUTLINE} strokeWidth="2.6" />
      <ellipse cx="40" cy="53" rx="6" ry="4.5" fill={color} stroke={OUTLINE} strokeWidth="2.6" />

      {/* 몸통 */}
      <ellipse cx="32" cy="36" rx="21" ry="19" fill={color} stroke={OUTLINE} strokeWidth="3" />

      <Face iconKey={iconKey} />

      {/* 가슴 마크 */}
      <BellyMark iconKey={iconKey} />
    </svg>
  );
}

function Ears({ iconKey, color }: { iconKey: IconKey; color: string }) {
  switch (iconKey) {
    case "rocket":
      return (
        <g fill={color} stroke={OUTLINE} strokeWidth="2.6" strokeLinejoin="round">
          <path d="M20 22 12 8l10 4z" />
          <path d="M44 22 52 8l-10 4z" />
        </g>
      );
    case "bolt":
      return (
        <g fill={color} stroke={OUTLINE} strokeWidth="2.6" strokeLinejoin="round">
          <path d="M30 18 25 6l9 3-3 9z" />
        </g>
      );
    default:
      return (
        <g fill={color} stroke={OUTLINE} strokeWidth="2.6">
          <circle cx="18" cy="19" r="6.5" />
          <circle cx="46" cy="19" r="6.5" />
        </g>
      );
  }
}

function Face({ iconKey }: { iconKey: IconKey }) {
  if (iconKey === "telescope") {
    return (
      <g>
        <ellipse cx="42" cy="46" rx="4.6" ry="3.2" fill={BLUSH} opacity="0.7" />
        <ellipse cx="22" cy="46" rx="4.6" ry="3.2" fill={BLUSH} opacity="0.7" />
        {/* 쌍안경 안경 */}
        <g fill="none" stroke={OUTLINE} strokeWidth="2.4">
          <circle cx="25" cy="35" r="5.4" />
          <circle cx="39" cy="35" r="5.4" />
          <path d="M30.4 35h3.2" />
        </g>
        <circle cx="25" cy="35" r="1.8" fill={OUTLINE} />
        <circle cx="39" cy="35" r="1.8" fill={OUTLINE} />
        <path
          d="M27 44q5 3.2 10 0"
          fill="none"
          stroke={OUTLINE}
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </g>
    );
  }

  return (
    <g>
      <ellipse cx="42" cy="42" rx="4.6" ry="3.2" fill={BLUSH} opacity="0.7" />
      <ellipse cx="22" cy="42" rx="4.6" ry="3.2" fill={BLUSH} opacity="0.7" />
      <circle cx="26" cy="34" r="2.6" fill={OUTLINE} />
      <circle cx="38" cy="34" r="2.6" fill={OUTLINE} />
      <path
        d="M27 41q5 3.4 10 0"
        fill="none"
        stroke={OUTLINE}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </g>
  );
}

function BellyMark({ iconKey }: { iconKey: IconKey }) {
  const common = {
    fill: "none",
    stroke: OUTLINE,
    strokeWidth: 2.2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (iconKey) {
    case "rocket":
      return (
        <g transform="translate(32 48)" {...common}>
          <path d="M-4 3 0-6 4 3z" fill={OUTLINE} stroke="none" opacity="0.85" />
        </g>
      );
    case "telescope":
      return null;
    case "book":
      return (
        <g transform="translate(32 48)" {...common}>
          <path d="M-7-4c3-2 5-2 7 0 2-2 4-2 7 0v8c-3-2-5-2-7 0-2-2-4-2-7 0z" />
        </g>
      );
    case "bolt":
      return (
        <g transform="translate(32 48)" {...common}>
          <path d="M2-6-4 2h3l-1 6 6-8h-3z" fill={OUTLINE} stroke="none" opacity="0.85" />
        </g>
      );
    case "compass":
      return (
        <g transform="translate(32 48)" {...common}>
          <circle r="6.5" />
          <path d="M2-3-1 1-4 4l3-4 3-3z" fill={OUTLINE} stroke="none" opacity="0.85" />
        </g>
      );
  }
}
