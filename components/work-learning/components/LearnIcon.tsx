import type { IconKey } from "../types";

/**
 * 결과 유형 캐릭터 이미지.
 *
 * 원본은 concept/con5.png(라벨이 달린 5컷 캐릭터 시트)에서 유형별로
 * 하나씩 잘라 배경(크림색 페이지)을 투명 처리한 PNG다. 번들러 import
 * 대신 public/ 정적 경로로 서빙해 정적 export에서도 동일하게 동작하고,
 * 같은 오리진 이미지라 결과 이미지 저장(html-to-image) 시에도 그대로
 * 포함된다.
 */
const SOURCES: Record<IconKey, string> = {
  rocket: "/work-learning/characters/rocket.png",
  telescope: "/work-learning/characters/telescope.png",
  book: "/work-learning/characters/book.png",
  bolt: "/work-learning/characters/bolt.png",
  compass: "/work-learning/characters/compass.png",
};

type Props = {
  iconKey: IconKey;
  size?: number;
  /** 지정하면 의미 있는 이미지로, 없으면 장식용으로 처리한다. */
  title?: string;
};

export function LearnIcon({ iconKey, size = 56, title }: Props) {
  return (
    <img
      className="learn-icon"
      src={SOURCES[iconKey]}
      width={size}
      height={size}
      alt={title ?? ""}
      aria-hidden={title ? undefined : true}
      draggable={false}
      decoding="sync"
    />
  );
}
