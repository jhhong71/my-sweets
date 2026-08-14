import type { IconId } from "../types";

/**
 * 결과 유형 캐릭터 이미지.
 *
 * 원본은 concept/con4.png(4x2 캐릭터 스티커 시트)에서 유형별로 하나씩
 * 잘라 배경(파란 페이지 + 흰 카드)을 투명 처리한 PNG다. 번들러 import
 * 대신 public/ 정적 경로로 서빙해 정적 export에서도 동일하게 동작하고,
 * 같은 오리진 이미지라 결과 이미지 저장(html-to-image) 시에도 그대로
 * 포함된다.
 */
const SOURCES: Record<IconId, string> = {
  shelf: "/desk-organizing/characters/shelf.png",
  capsule: "/desk-organizing/characters/capsule.png",
  drawer: "/desk-organizing/characters/drawer.png",
  broom: "/desk-organizing/characters/broom.png",
  corkboard: "/desk-organizing/characters/corkboard.png",
  basket: "/desk-organizing/characters/basket.png",
  feather: "/desk-organizing/characters/feather.png",
  spray: "/desk-organizing/characters/spray.png",
};

type Props = {
  id: IconId;
  size?: number;
  /** 지정하면 의미 있는 이미지로, 없으면 장식용으로 처리한다. */
  title?: string;
};

export function DeskIcon({ id, size = 96, title }: Props) {
  return (
    <img
      className="desk-icon"
      src={SOURCES[id]}
      width={size}
      height={size}
      alt={title ?? ""}
      aria-hidden={title ? undefined : true}
      draggable={false}
      decoding="sync"
    />
  );
}
