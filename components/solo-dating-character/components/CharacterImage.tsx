import type { ResultId } from "../types";

type Props = {
  id: ResultId;
  size?: number;
  className?: string;
  /** 지정하면 의미 있는 이미지로, 없으면 장식용으로 처리한다. */
  title?: string;
};

/**
 * 결과 캐릭터 일러스트 (콘셉트 아트 char10 기반).
 * 원본이 세로로 긴 인물 카드라 width/height를 강제로 같게 주지 않고
 * max-width/max-height로 제한해 비율을 유지한다.
 */
export function CharacterImage({ id, size = 96, className, title }: Props) {
  return (
    <img
      src={`/solo-dating-character/characters/${id}.webp`}
      style={{ maxWidth: size, maxHeight: size }}
      alt={title ?? ""}
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      className={`character-art${className ? ` ${className}` : ""}`}
    />
  );
}
