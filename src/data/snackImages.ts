import type { ResultId } from "../types";
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
