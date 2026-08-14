import type { ResultId } from "../types";

/**
 * 결과 유형 캐릭터 이미지.
 *
 * 원본은 사용자가 8가지 결과 이름에 맞춰 제작한 캐릭터 시트에서 유형별로
 * 잘라 흰 배경을 투명 처리한 PNG다. 번들러 import 대신 public/ 정적
 * 경로로 서빙해 정적 export에서도 동일하게 동작하고, 같은 오리진
 * 이미지라 결과 이미지 저장(html-to-image) 시에도 그대로 포함된다.
 */
const SOURCES: Record<ResultId, string> = {
  "steady-planner": "/money-habit/characters/steady-planner.png",
  "smart-saver": "/money-habit/characters/smart-saver.png",
  "mindful-spender": "/money-habit/characters/mindful-spender.png",
  "planned-flexer": "/money-habit/characters/planned-flexer.png",
  "quiet-saver": "/money-habit/characters/quiet-saver.png",
  "freeform-saver": "/money-habit/characters/freeform-saver.png",
  "careful-improviser": "/money-habit/characters/careful-improviser.png",
  "free-today-spender": "/money-habit/characters/free-today-spender.png",
};

type Props = {
  id: ResultId;
  size?: number;
  /** 지정하면 의미 있는 이미지로, 없으면 장식용으로 처리한다. */
  title?: string;
};

export function MoneyIcon({ id, size = 96, title }: Props) {
  return (
    <img
      className="money-icon"
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
