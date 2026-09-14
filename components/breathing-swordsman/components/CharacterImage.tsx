import type { ResultId } from "../types";

type Props = {
  id: ResultId;
  className?: string;
  /** 지정하면 의미 있는 이미지로, 없으면 장식용으로 처리한다. */
  title?: string;
};

/**
 * 결과 캐릭터별 카드 일러스트(public/breathing-swordsman/characters/*.webp).
 * 표시 크기는 부모 프레임 CSS가 정하고, 이 컴포넌트는 채우기만 한다.
 */
export function CharacterImage({ id, className, title }: Props) {
  return (
    <img
      className={`character-image${className ? ` ${className}` : ""}`}
      src={`/breathing-swordsman/characters/${id}.webp`}
      role={title ? "img" : undefined}
      alt={title ?? ""}
      aria-hidden={title ? undefined : true}
      draggable={false}
    />
  );
}
