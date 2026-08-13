import type { IconId } from "../types";

/**
 * 결과 유형 아이콘.
 *
 * 원본은 사용자가 제작한 8컷 스티커 시트에서 배지 하나씩을 잘라 배경을
 * 투명 처리한 PNG다. 번들러 import 대신 public/ 정적 경로로 서빙해 정적
 * export에서도 동일하게 동작하고, 같은 오리진 이미지라 결과 이미지
 * 저장(html-to-image) 시에도 그대로 포함된다.
 */
const SOURCES: Record<IconId, string> = {
  clipboard: "/task-kickoff/characters/clipboard.png",
  compass: "/task-kickoff/characters/compass.png",
  bulb: "/task-kickoff/characters/bulb.png",
  gem: "/task-kickoff/characters/gem.png",
  chatbubble: "/task-kickoff/characters/chatbubble.png",
  magnifier: "/task-kickoff/characters/magnifier.png",
  bolt: "/task-kickoff/characters/bolt.png",
  rocket: "/task-kickoff/characters/rocket.png",
};

type Props = {
  id: IconId;
  size?: number;
  /** 지정하면 의미 있는 이미지로, 없으면 장식용으로 처리한다. */
  title?: string;
};

export function TaskIcon({ id, size = 96, title }: Props) {
  return (
    <img
      className="task-icon"
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
