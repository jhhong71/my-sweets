import { useId } from "react";
import type { IconId } from "../types";

type Props = {
  id: IconId;
  size?: number;
  /** 지정하면 의미 있는 이미지로, 없으면 장식용으로 처리한다. */
  title?: string;
};

/**
 * 아이콘별 클레이 3색 (밝은 면 / 기본 / 그늘).
 * 8개 유형이 색으로도 구분되도록 서로 다른 파스텔 계열을 배정했다.
 * 참고 이미지(비비드 파스텔 3D 플라스틱 아이콘)에 맞춰 채도·명암 대비를 높였다.
 */
const TONES: Record<IconId, [string, string, string]> = {
  shelf: ["#D3F6E9", "#5EC79D", "#2F8A6B"],
  capsule: ["#FFEBC4", "#F0B24F", "#C4841F"],
  drawer: ["#DAE4FF", "#7690EE", "#4459C4"],
  broom: ["#C9F3F0", "#4FC2BD", "#2A8783"],
  corkboard: ["#FFD6E7", "#EE74A0", "#C24671"],
  basket: ["#E4DBFF", "#9682EA", "#6551BE"],
  feather: ["#DEF5C8", "#84C563", "#4F8F35"],
  spray: ["#FFD7C5", "#EE7A57", "#C24E32"],
};

/**
 * 결과 유형 일러스트 — 파스텔 클레이(claymorphism) 3D 스타일.
 *
 * 외부 이미지 없이 인라인 SVG로 그려 결과 이미지 저장(캡처)과 오프라인
 * 환경에서도 동일하게 렌더된다. 그라데이션·필터 ID는 useId로 인스턴스마다
 * 다르게 만들어 같은 화면에 여러 번 놓여도 충돌하지 않는다.
 *
 * 입체감은 세 겹으로 만든다.
 *  1) 대각선 그라데이션 본체 (밝은 면 → 기본 → 그늘)
 *  2) 좌상단에 흐릿한 흰 하이라이트 (무광 클레이 느낌)
 *  3) 오브젝트 아래 부드러운 접지 그림자 + 형태별 드롭섀도
 */
export function DeskIcon({ id, size = 96, title }: Props) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const g = (name: string) => `${uid}-${name}`;
  const [light, mid, dark] = TONES[id];

  return (
    <svg
      className="desk-icon"
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <defs>
        {/* 본체 클레이 그라데이션 */}
        <linearGradient id={g("body")} x1="0.15" y1="0" x2="0.85" y2="1">
          <stop offset="0%" stopColor={light} />
          <stop offset="52%" stopColor={mid} />
          <stop offset="100%" stopColor={dark} />
        </linearGradient>
        {/* 밝은 면(종이·라벨)용 살짝 따뜻한 크림 그라데이션 */}
        <linearGradient id={g("cream")} x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F2E9DC" />
        </linearGradient>
        {/* 하이라이트·접지 그림자를 뭉개는 블러 */}
        <filter id={g("soften")} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="2.8" />
        </filter>
        {/* 반짝이는 하이라이트용 약한 블러(비비드 플라스틱 광택) */}
        <filter id={g("gloss")} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="0.9" />
        </filter>
        {/* 장난감처럼 또렷하게 뜨는 접지 그림자 */}
        <filter id={g("clay")} x="-50%" y="-50%" width="200%" height="220%">
          <feDropShadow dx="0" dy="4.2" stdDeviation="3.6" floodColor={dark} floodOpacity="0.4" />
        </filter>
      </defs>

      {/* 바닥에 깔리는 접지 그림자 */}
      <ellipse
        cx="50"
        cy="88"
        rx="27"
        ry="6.5"
        fill={dark}
        opacity="0.28"
        filter={`url(#${g("soften")})`}
      />

      <g filter={`url(#${g("clay")})`}>
        <Shape id={id} g={g} tones={TONES[id]} />
      </g>
    </svg>
  );
}

type PartProps = {
  id: IconId;
  g: (name: string) => string;
  tones: [string, string, string];
};

/**
 * 눈·반짝임·볼터치·미소 표정. 유형마다 몸통 모양이 다르므로 중심 좌표(cx,cy)와
 * 눈 사이 간격(dx), 크기 배율(scale)을 받아 각 몸통의 "얼굴 자리"에 맞춘다.
 */
function Face({
  cx,
  cy,
  dx,
  dark,
  scale = 1,
}: {
  cx: number;
  cy: number;
  dx: number;
  dark: string;
  scale?: number;
}) {
  const eyeRx = 3 * scale;
  const eyeRy = 3.8 * scale;
  const spark = 1 * scale;
  const blushRx = 5 * scale;
  const blushRy = 3 * scale;
  const blushDx = dx + 4 * scale;
  const blushDy = 8 * scale;
  const mouthHalf = dx * 0.9;
  const mouthY = cy + 9 * scale;
  return (
    <g>
      <ellipse cx={cx - dx} cy={cy} rx={eyeRx} ry={eyeRy} fill={dark} />
      <ellipse cx={cx + dx} cy={cy} rx={eyeRx} ry={eyeRy} fill={dark} />
      <circle cx={cx - dx + 1.2 * scale} cy={cy - 1.6 * scale} r={spark} fill="#fff" />
      <circle cx={cx + dx + 1.2 * scale} cy={cy - 1.6 * scale} r={spark} fill="#fff" />
      <ellipse cx={cx - blushDx} cy={cy + blushDy} rx={blushRx} ry={blushRy} fill="#FF97AE" opacity="0.55" />
      <ellipse cx={cx + blushDx} cy={cy + blushDy} rx={blushRx} ry={blushRy} fill="#FF97AE" opacity="0.55" />
      <path
        d={`M${cx - mouthHalf} ${mouthY}q${mouthHalf} ${4.4 * scale} ${mouthHalf * 2} 0`}
        fill="none"
        stroke={dark}
        strokeWidth={2.2 * scale}
        strokeLinecap="round"
        opacity="0.85"
      />
    </g>
  );
}

function Shape({ id, g, tones }: PartProps) {
  const [light, , dark] = tones;
  const body = `url(#${g("body")})`;
  const cream = `url(#${g("cream")})`;
  const soften = `url(#${g("soften")})`;
  const gloss = `url(#${g("gloss")})`;

  /**
   * 좌상단 하이라이트 — 넓고 흐린 무광 글로우 위에, 더 작고 또렷한 반짝임을
   * 겹쳐 비비드 플라스틱 장난감 특유의 광택을 낸다.
   */
  const Highlight = ({
    cx,
    cy,
    rx,
    ry,
    rotate = -20,
    opacity = 0.62,
  }: {
    cx: number | string;
    cy: number | string;
    rx: number | string;
    ry: number | string;
    rotate?: number;
    opacity?: number;
  }) => (
    <g transform={`rotate(${rotate} ${cx} ${cy})`}>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="#fff" opacity={opacity} filter={soften} />
      <ellipse
        cx={Number(cx) - Number(rx) * 0.22}
        cy={Number(cy) - Number(ry) * 0.22}
        rx={Number(rx) * 0.4}
        ry={Number(ry) * 0.4}
        fill="#fff"
        opacity={Math.min(1, opacity + 0.3)}
        filter={gloss}
      />
    </g>
  );

  /** 발(원형 몸통용). 유형마다 몸통 실루엣이 다르므로 필요한 경우에만 붙인다. */
  const Feet = ({ cy = 87 }: { cy?: number }) => (
    <>
      <ellipse cx="30" cy={cy} rx="7.5" ry="4.5" fill={dark} opacity="0.5" />
      <ellipse cx="70" cy={cy} rx="7.5" ry="4.5" fill={dark} opacity="0.5" />
    </>
  );

  switch (id) {
    // 아카이브 큐레이터 — 책 귀가 달린 키 큰 책장 캐릭터
    case "shelf":
      return (
        <g>
          <Feet cy={86} />
          <rect x="24" y="14" width="52" height="72" rx="18" fill={body} />
          <rect x="26" y="5" width="9" height="15" rx="3" fill={cream} transform="rotate(-12 30.5 12.5)" />
          <rect x="65" y="5" width="9" height="15" rx="3" fill={light} transform="rotate(12 69.5 12.5)" />
          <rect x="33" y="58" width="34" height="4.4" rx="2.2" fill={cream} opacity="0.85" />
          <rect x="33" y="67" width="34" height="4.4" rx="2.2" fill={cream} opacity="0.85" />
          <Highlight cx="32" cy="26" rx="11" ry="7" />
          <Face cx={50} cy={40} dx={10} dark={dark} />
        </g>
      );

    // 타임캡슐 마스터 — 뚜껑 이음매가 있는 동그란 캡슐 캐릭터
    case "capsule":
      return (
        <g>
          <Feet cy={88} />
          <clipPath id={g("capClip")}>
            <circle cx="50" cy="54" r="32" />
          </clipPath>
          <circle cx="50" cy="54" r="32" fill={body} />
          <g clipPath={`url(#${g("capClip")})`}>
            <rect x="14" y="20" width="72" height="24" fill={light} />
            <rect x="14" y="42" width="72" height="4" fill={dark} opacity="0.22" />
          </g>
          <Highlight cx="36" cy="34" rx="10" ry="6" />
          <Face cx={50} cy={50} dx={10} dark={dark} />
        </g>
      );

    // 미니멀 시스템러 — 작은 다리가 달린 납작한 서랍장 캐릭터
    case "drawer":
      return (
        <g>
          <rect x="18" y="80" width="10" height="8" rx="3" fill={dark} opacity="0.55" />
          <rect x="72" y="80" width="10" height="8" rx="3" fill={dark} opacity="0.55" />
          <rect x="10" y="32" width="80" height="50" rx="16" fill={body} />
          <rect x="22" y="52" width="56" height="14" rx="6" fill={cream} />
          <rect x="22" y="70" width="56" height="10" rx="5" fill={cream} opacity="0.9" />
          <rect x="42" y="57" width="16" height="4" rx="2" fill={dark} opacity="0.4" />
          <rect x="42" y="73.5" width="16" height="3.4" rx="1.7" fill={dark} opacity="0.4" />
          <Highlight cx="28" cy="42" rx="12" ry="7" />
          <Face cx={50} cy={42} dx={12} dark={dark} scale={0.9} />
        </g>
      );

    // 리셋 데이 파이터 — 손잡이 머리에 빗자루 몸통(솔이 발 역할)
    case "broom":
      return (
        <g>
          <rect x="46" y="8" width="8" height="28" rx="4" fill={cream} />
          <path
            d="M30 36h40c2.6 0 4.4 2.4 3.8 4.9l-4 24C68.6 71.6 64.4 76 59.4 76h-18.8c-5 0-9.2-4.4-10.4-11.1l-4-24C25.6 38.4 27.4 36 30 36z"
            fill={body}
          />
          <path
            d="M34 60v8M42 60v9M50 60v10M58 60v9M66 60v8"
            stroke={cream}
            strokeWidth="2.2"
            strokeLinecap="round"
            opacity="0.7"
          />
          <Highlight cx="36" cy="46" rx="9" ry="8" rotate={-10} />
          <Face cx={50} cy={50} dx={10} dark={dark} />
        </g>
      );

    // 무드 컬렉터 — 압정 메모가 붙은 납작한 보드 캐릭터
    case "corkboard":
      return (
        <g>
          <Feet cy={82} />
          <rect x="14" y="20" width="72" height="56" rx="16" fill={body} />
          <rect x="24" y="50" width="22" height="16" rx="4" fill={light} transform="rotate(-6 35 58)" />
          <rect x="52" y="52" width="21" height="15" rx="4" fill={light} transform="rotate(6 62.5 59.5)" />
          <circle cx="31" cy="52" r="3" fill={dark} />
          <circle cx="59" cy="55" r="3" fill={dark} />
          <Highlight cx="28" cy="30" rx="12" ry="7" />
          <Face cx={50} cy={36} dx={12} dark={dark} />
        </g>
      );

    // 추억상자 여행자 — 손잡이가 귀처럼 달린 바구니 캐릭터
    case "basket":
      return (
        <g>
          <path
            d="M20 34h60c2.6 0 4.5 2.5 3.8 5l-8 40C74.6 83 70 87 64.6 87H35.4C30 87 25.4 83 24.2 79l-8-40c-.7-2.5 1.2-5 3.8-5z"
            fill={body}
          />
          <path
            d="M36 34c0-9.4 6-15.4 14-15.4s14 6 14 15.4"
            fill="none"
            stroke={dark}
            strokeWidth="3.6"
            strokeLinecap="round"
            opacity="0.85"
          />
          <rect x="16" y="30" width="68" height="11" rx="5.5" fill={light} />
          <path d="M28 58h44M31 68h38" stroke={cream} strokeWidth="2.4" strokeLinecap="round" opacity="0.7" />
          <Highlight cx="32" cy="42" rx="10" ry="6" />
          <Face cx={50} cy={48} dx={11} dark={dark} />
        </g>
      );

    // 가벼운 정리요정 — 깃털처럼 위가 뾰족한 물방울 캐릭터
    case "feather":
      return (
        <g>
          <ellipse cx="50" cy="60" rx="22" ry="25" fill={body} />
          <path d="M50 36c-4-9-3-19 3-28 3 8 4 18 1 28z" fill={body} />
          <path
            d="M51 32c1-6 2.6-11 5.6-15.4"
            fill="none"
            stroke={cream}
            strokeWidth="1.6"
            strokeLinecap="round"
            opacity="0.8"
          />
          <path
            d="M40 50l9-3M41 58l9-3M43 66l8-3"
            stroke={cream}
            strokeWidth="1.6"
            strokeLinecap="round"
            opacity="0.55"
          />
          <Highlight cx="38" cy="46" rx="10" ry="9" />
          <Face cx={50} cy={56} dx={9} dark={dark} scale={0.92} />
        </g>
      );

    // 서프라이즈 클리너 — 목·트리거가 달린 스프레이 병 캐릭터
    case "spray":
      return (
        <g>
          <rect x="24" y="34" width="52" height="50" rx="20" fill={body} />
          <rect x="42" y="16" width="16" height="20" rx="6" fill={light} />
          <rect x="46" y="10" width="8" height="8" rx="3" fill={cream} />
          <path
            d="M60 20l6-4M63 26h7M60 32l6 4"
            stroke={dark}
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.6"
          />
          <rect x="34" y="58" width="32" height="18" rx="7" fill={cream} />
          <Highlight cx="34" cy="44" rx="11" ry="8" />
          <Face cx={50} cy={46} dx={11} dark={dark} />
        </g>
      );
  }
}
