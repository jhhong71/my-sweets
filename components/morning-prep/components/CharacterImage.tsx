import type { ResultId } from "../types";

/**
 * 결과 유형별 캐릭터 일러스트(concept/char2.png에서 잘라낸 원본 콘셉트 이미지).
 * 8칸 구도(그리드 좌상단부터: 시간 엄수형 → 감성 기상형 → 에너지 충전형 →
 * 효율 최우선형)를 이 앱의 3축 결과 유형(rcf~div)에 의미가 가장 가까운
 * 순서로 매핑했다.
 *
 * 번들러 import 대신 public/ 정적 경로로 서빙해 정적 export에서도 동일하게
 * 동작하고, 같은 오리진 이미지라 결과 이미지 저장(html-to-image) 시에도
 * 그대로 포함된다.
 */
const CHARACTER_IMAGES: Record<ResultId, string> = {
  rcf: "/morning-prep/characters/rcf.webp",
  rcv: "/morning-prep/characters/rcv.webp",
  rif: "/morning-prep/characters/rif.webp",
  riv: "/morning-prep/characters/riv.webp",
  dcf: "/morning-prep/characters/dcf.webp",
  dcv: "/morning-prep/characters/dcv.webp",
  dif: "/morning-prep/characters/dif.webp",
  div: "/morning-prep/characters/div.webp",
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
