import type { IconId } from "../types";

type Props = {
  id: IconId;
  size?: number;
  /** 지정하면 의미 있는 이미지로, 없으면 장식용으로 처리한다. */
  title?: string;
};

/**
 * 결과 유형 일러스트. 사용자가 제공한 캐릭터 스티커 이미지(concept/con2.png)에서
 * 원형으로 추출한 PNG를 사용한다(저작권 문제 없음을 사용자에게 확인받음).
 * 8개 캐릭터를 각 결과 유형의 소품·분위기에 맞춰 1:1로 배치했다:
 * 개구리(깃발)→리더, 강아지(신남)→분위기메이커, 수달(돋보기)→리스너,
 * 토끼(웃음)→임팩트, 고슴도치(머그컵)→은근버티기, 고양이(반짝임)→하이라이트,
 * 레서판다(쿠션)→조용한관찰, 물범(촛불)→조언가.
 *
 * 번들러 import 대신 public/ 정적 경로로 서빙해 정적 export에서도 동일하게
 * 동작하고, 같은 오리진 이미지라 결과 이미지 저장(html-to-image) 시에도
 * 그대로 포함된다.
 */
const SOURCES: Record<IconId, string> = {
  mic: "/team-dinner/characters/rmd.png",
  confetti: "/team-dinner/characters/rml.png",
  comet: "/team-dinner/characters/red.png",
  flash: "/team-dinner/characters/rel.png",
  bubble: "/team-dinner/characters/omd.png",
  cup: "/team-dinner/characters/oml.png",
  candle: "/team-dinner/characters/oed.png",
  cloud: "/team-dinner/characters/oel.png",
};

export function PartyIcon({ id, size = 96, title }: Props) {
  return (
    <img
      className="party-icon"
      src={SOURCES[id]}
      width={size}
      height={size}
      alt={title ?? ""}
      aria-hidden={title ? undefined : true}
      draggable={false}
    />
  );
}
