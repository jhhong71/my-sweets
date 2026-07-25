import type { ResultId } from "../types";
import { SNACK_IMAGES, resolveResultImage } from "../data/snackImages";

type Props = {
  id: ResultId;
  size?: number;
  title?: string;
  /** 생성 결과 이미지 키. 있으면 해당 이미지를 쓰고 없으면 기본 간식으로 폴백. */
  imageKey?: string;
};

/** 결과별 간식 일러스트(PNG 이미지)를 렌더링한다. */
export function SnackImage({ id, size = 120, title, imageKey }: Props) {
  const src = imageKey ? resolveResultImage(imageKey, id) : SNACK_IMAGES[id];
  return (
    <img
      className="snack-img"
      src={src}
      width={size}
      height={size}
      alt={title ?? ""}
      aria-hidden={title ? undefined : true}
      draggable={false}
      decoding="async"
    />
  );
}
