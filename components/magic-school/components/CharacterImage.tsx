import type { ResultId } from "../types";

const IMAGES: Record<ResultId, string> = {
  bhl: "/magic-school/characters/bhl.png",
  bml: "/magic-school/characters/bml.png",
  bhs: "/magic-school/characters/bhs.png",
  bms: "/magic-school/characters/bms.png",
  chl: "/magic-school/characters/chl.png",
  cml: "/magic-school/characters/cml.png",
  chs: "/magic-school/characters/chs.png",
  cms: "/magic-school/characters/cms.png",
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
