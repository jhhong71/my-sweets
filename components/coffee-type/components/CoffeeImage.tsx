import type { ResultId } from "../types";

const IMAGE_BY_RESULT: Record<ResultId, string> = {
  rwq: "/coffee-type/coffee/rwq.png",
  rws: "/coffee-type/coffee/rws.png",
  rpq: "/coffee-type/coffee/rpq.png",
  rps: "/coffee-type/coffee/rps.png",
  lwq: "/coffee-type/coffee/lwq.png",
  lws: "/coffee-type/coffee/lws.png",
  lpq: "/coffee-type/coffee/lpq.png",
  lps: "/coffee-type/coffee/lps.png",
};

type Props = {
  id: ResultId;
  size?: number;
  className?: string;
  /** 지정하면 의미 있는 이미지로, 없으면 장식용으로 처리한다. */
  title?: string;
};

/**
 * 결과 유형별 커피 일러스트 이미지 (콘셉트 아트 con6 기반).
 * 원본 이미지가 정사각형이 아니므로 width/height를 강제로 같게 주지 않고
 * max-width/max-height로 제한해 비율을 유지한다.
 */
export function CoffeeImage({ id, size = 96, className, title }: Props) {
  return (
    <img
      src={IMAGE_BY_RESULT[id]}
      style={{ maxWidth: size, maxHeight: size }}
      alt={title ?? ""}
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      className={`coffee-icon${className ? ` ${className}` : ""}`}
    />
  );
}
