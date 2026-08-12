import type { ResultId } from "../types";

/**
 * 결과 유형 캐릭터 이미지.
 *
 * 원본은 사용자가 제공한 8컷 캐릭터 시트에서 결과 유형별로 잘라 흰 배경을
 * 투명 처리한 PNG다. 번들러 import 대신 public/ 정적 경로로 서빙해 정적
 * export에서도 동일하게 동작하고, 같은 오리진 이미지라 결과 이미지
 * 저장(html-to-image) 시에도 그대로 포함된다.
 */
const SOURCES: Record<ResultId, string> = {
  "perfect-hunter": "/shopping/characters/perfect-hunter.png",
  "premium-curator": "/shopping/characters/premium-curator.png",
  "quality-improviser": "/shopping/characters/quality-improviser.png",
  "precision-analyst": "/shopping/characters/precision-analyst.png",
  "mood-splurger": "/shopping/characters/mood-splurger.png",
  "budget-trend-follower": "/shopping/characters/budget-trend-follower.png",
  "impulsive-value-shopper": "/shopping/characters/impulsive-value-shopper.png",
  "careful-saver": "/shopping/characters/careful-saver.png",
};

type Props = {
  id: ResultId;
  size?: number;
  /** 지정하면 의미 있는 이미지로, 없으면 장식용으로 처리한다. */
  title?: string;
};

export function ShopperIcon({ id, size = 96, title }: Props) {
  return (
    <img
      className="shopper-icon"
      src={SOURCES[id]}
      width={size}
      height={size}
      alt={title ?? ""}
      aria-hidden={title ? undefined : true}
      draggable={false}
      decoding="sync"
    />
  );
}
