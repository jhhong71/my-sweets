import type { ResultId } from "../types";

type Props = {
  id: ResultId;
  size?: number;
  className?: string;
  /** 지정하면 의미 있는 이미지로, 없으면 장식용으로 처리한다. */
  title?: string;
};

/** 결과 유형별 캐릭터 일러스트. */
export function CharacterImage({ id, size = 96, className, title }: Props) {
  return (
    <img
      className={`character-image${className ? ` ${className}` : ""}`}
      src={`/attachment-style/characters/${id}.webp`}
      alt={title ?? ""}
      width={size}
      height={size}
      loading="lazy"
    />
  );
}
