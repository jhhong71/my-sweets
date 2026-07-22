import type { ResultId } from "../types";
import { SNACK_IMAGES } from "../data/snackImages";

type Props = {
  id: ResultId;
  size?: number;
  title?: string;
};

/** 결과별 간식 일러스트(PNG 이미지)를 렌더링한다. */
export function SnackImage({ id, size = 120, title }: Props) {
  return (
    <img
      className="snack-img"
      src={SNACK_IMAGES[id]}
      width={size}
      height={size}
      alt={title ?? ""}
      aria-hidden={title ? undefined : true}
      draggable={false}
      decoding="async"
    />
  );
}
