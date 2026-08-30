import type { ResultId } from "../types";

const IMAGES: Record<ResultId, string> = {
  bhl: "/harry-potter/characters/bhl.png",
  bml: "/harry-potter/characters/bml.png",
  bhs: "/harry-potter/characters/bhs.png",
  bms: "/harry-potter/characters/bms.png",
  chl: "/harry-potter/characters/chl.png",
  cml: "/harry-potter/characters/cml.png",
  chs: "/harry-potter/characters/chs.png",
  cms: "/harry-potter/characters/cms.png",
};

type Props = {
  id: ResultId;
  className?: string;
  /** 지정하면 의미 있는 이미지로, 없으면 장식용으로 처리한다. */
  title?: string;
};

/**
 * 결과 캐릭터별 배지 일러스트. 투명 배경 PNG 캐릭터를 그대로 표시한다.
 * 실제 표시 크기는 CSS(.character-image, 부모 프레임)가 정하므로 `size`는
 * 받지 않는다 — 호출부는 프레임 크기를 CSS로 맞추고 이 컴포넌트는 채우기만 한다.
 */
export function CharacterImage({ id, className, title }: Props) {
  return (
    <img
      className={`character-image${className ? ` ${className}` : ""}`}
      src={IMAGES[id]}
      role={title ? "img" : undefined}
      alt={title ?? ""}
      aria-hidden={title ? undefined : true}
      draggable={false}
    />
  );
}
