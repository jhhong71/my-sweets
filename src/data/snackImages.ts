import type { ResultId } from "../types";
import { ALL_IMAGE_KEYS } from "./generation";
import chocolate from "../assets/snacks/chocolate.png";
import candy from "../assets/snacks/candy.png";
import biscuit from "../assets/snacks/biscuit.png";
import marshmallow from "../assets/snacks/marshmallow.png";
import pudding from "../assets/snacks/pudding.png";

/** 결과별 간식 일러스트(PNG). 캔버스로 렌더링해 만든 이미지 파일. */
export const SNACK_IMAGES: Record<ResultId, string> = {
  chocolate,
  candy,
  biscuit,
  marshmallow,
  pudding,
};

/**
 * 생성 결과 imageKey(`${간식}-${맛}`)별 전용 이미지.
 * public/images/results/{imageKey}.png 로 서빙된다(정의된 15키 모두 실제 파일 존재).
 * 없는 키는 같은 기본 간식의 기본 이미지로 fallback 한다(예외 상황 전용).
 */
export const GENERATED_IMAGES: Record<string, string> = Object.fromEntries(
  ALL_IMAGE_KEYS.map((key) => [key, `/images/results/${key}.png`]),
);

/** imageKey에 맞는 이미지를 반환하고, 없으면 기본 간식 이미지로 폴백한다. */
export function resolveResultImage(imageKey: string, baseSnack: ResultId): string {
  return GENERATED_IMAGES[imageKey] ?? SNACK_IMAGES[baseSnack];
}
