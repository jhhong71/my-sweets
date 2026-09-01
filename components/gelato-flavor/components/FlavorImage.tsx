import type { ResultId } from "../types";

const IMAGE_BY_RESULT: Record<ResultId, string> = {
  rvu: "/gelato-flavor/flavors/rvu_salted_caramel.png",
  rvc: "/gelato-flavor/flavors/rvc_chocolate.png",
  rmu: "/gelato-flavor/flavors/rmu_tiramisu.png",
  rmc: "/gelato-flavor/flavors/rmc_vanilla_bean.png",
  fvu: "/gelato-flavor/flavors/fvu_mango_passionfruit.png",
  fvc: "/gelato-flavor/flavors/fvc_strawberry.png",
  fmu: "/gelato-flavor/flavors/fmu_lavender_earlgrey.png",
  fmc: "/gelato-flavor/flavors/fmc_lemon.png",
};

type Props = {
  id: ResultId;
  size?: number;
  className?: string;
  /** 지정하면 의미 있는 이미지로, 없으면 장식용으로 처리한다. */
  title?: string;
};

/**
 * 결과 유형별 젤라또 일러스트 이미지 (콘셉트 아트 con5 기반).
 * 원본 이미지가 정사각형이 아니므로(콘 때문에 세로가 더 김) width/height를
 * 강제로 같게 주지 않고 max-width/max-height로 제한해 비율을 유지한다.
 */
export function FlavorImage({ id, size = 96, className, title }: Props) {
  return (
    <img
      src={IMAGE_BY_RESULT[id]}
      style={{ maxWidth: size, maxHeight: size }}
      alt={title ?? ""}
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      className={`gelato-icon${className ? ` ${className}` : ""}`}
    />
  );
}
