import type { ResultId } from "../types";

/** 결과 유형별 캐릭터 일러스트 경로. concept 캐릭터 시트에서 인물만 잘라낸 정적 자산이다. */
const IMAGE_BASE = "/new-colleague-greeting/characters/";

/** 결과 유형별 캐릭터 일러스트. */
export function CharacterImage({
  id,
  size = 96,
  className,
  title,
}: {
  id: ResultId;
  size?: number;
  className?: string;
  /** 지정하면 의미 있는 이미지로, 없으면 장식용으로 처리한다. */
  title?: string;
}) {
  return (
    <img
      className={`character-image${className ? ` ${className}` : ""}`}
      src={`${IMAGE_BASE}${id}.png`}
      alt={title ?? ""}
      width={size}
      height={size}
      loading="lazy"
    />
  );
}
