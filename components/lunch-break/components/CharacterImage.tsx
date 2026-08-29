import type { ResultId } from "../types";

/**
 * 결과 유형별 캐릭터 일러스트(concept/char3.png에서 잘라낸 원본 콘셉트 이미지).
 * 콘셉트 이미지가 이미 4×2 그리드로 이 테스트의 8개 결과 유형과 제목까지
 * 정확히 일치하게 제작되어 있어(좌상단부터 pwr→pwu→par→pau, 그 다음 줄
 * swr→swu→sar→sau 순서), 그리드 좌표 그대로 1:1 매핑했다.
 *
 * 번들러 import 대신 public/ 정적 경로로 서빙해 정적 export에서도 동일하게
 * 동작하고, 같은 오리진 이미지라 결과 이미지 저장(html-to-image) 시에도
 * 그대로 포함된다.
 */
const CHARACTER_IMAGES: Record<ResultId, string> = {
  pwr: "/lunch-break/characters/pwr.webp",
  pwu: "/lunch-break/characters/pwu.webp",
  par: "/lunch-break/characters/par.webp",
  pau: "/lunch-break/characters/pau.webp",
  swr: "/lunch-break/characters/swr.webp",
  swu: "/lunch-break/characters/swu.webp",
  sar: "/lunch-break/characters/sar.webp",
  sau: "/lunch-break/characters/sau.webp",
};

type Props = {
  id: ResultId;
  size?: number;
  className?: string;
  /** 지정하면 의미 있는 이미지로, 없으면 장식용으로 처리한다. */
  title?: string;
};

/** 결과 유형별 캐릭터 일러스트(콘셉트 이미지 기반, 8종 고유). */
export function CharacterImage({ id, size = 96, className, title }: Props) {
  return (
    <img
      className={`character-image${className ? ` ${className}` : ""}`}
      src={CHARACTER_IMAGES[id]}
      alt={title ?? ""}
      aria-hidden={title ? undefined : true}
      width={size}
      loading="lazy"
    />
  );
}
