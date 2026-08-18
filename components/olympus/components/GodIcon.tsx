import type { GodId } from "../types";

/**
 * 결과 유형 일러스트. 사용자가 제공한 캐릭터 시트(concept/char1.png, 12신이
 * 이름표와 함께 6x2 그리드로 그려진 이미지)에서 신별로 캐릭터 삽화만(이름표
 * 제외) 투명 배경 PNG로 잘라 그대로 사용한다(추출 스크립트:
 * docs/extract-characters.py).
 *
 * 번들러 import 대신 public/ 정적 경로로 서빙해 정적 export에서도 동일하게
 * 동작하고, 같은 오리진 이미지라 결과 이미지 저장(html-to-image) 시에도
 * 그대로 포함된다.
 */
const SOURCES: Record<GodId, string> = {
  zeus: "/olympus/gods/zeus.webp",
  hera: "/olympus/gods/hera.webp",
  poseidon: "/olympus/gods/poseidon.webp",
  demeter: "/olympus/gods/demeter.webp",
  athena: "/olympus/gods/athena.webp",
  apollo: "/olympus/gods/apollo.webp",
  artemis: "/olympus/gods/artemis.webp",
  ares: "/olympus/gods/ares.webp",
  aphrodite: "/olympus/gods/aphrodite.webp",
  hephaestus: "/olympus/gods/hephaestus.webp",
  hermes: "/olympus/gods/hermes.webp",
  dionysus: "/olympus/gods/dionysus.webp",
};

type Props = {
  id: GodId;
  size?: number;
  /** 지정하면 의미 있는 이미지로, 없으면 장식용으로 처리한다. */
  title?: string;
};

export function GodIcon({ id, size = 96, title }: Props) {
  return (
    <img
      className="god-icon"
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
