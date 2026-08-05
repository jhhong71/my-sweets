import type { IconId } from "../types";

/**
 * 결과 유형 캐릭터 이미지.
 *
 * 원본은 사용자가 제공한 8개 캐릭터 시트(4×2)이며, 카드별로 잘라
 * 배경을 투명하게 처리한 뒤 PNG로 넣어두었다. 번들러 import 대신 public/
 * 정적 경로로 서빙해 정적 export에서도 동일하게 동작한다(같은 오리진 이미지라
 * 결과 이미지 저장(html-to-image) 시에도 그대로 포함된다).
 */
const SOURCES: Record<IconId, string> = {
  megaphone: "/messenger-reply/characters/megaphone.png",
  heartbubble: "/messenger-reply/characters/heartbubble.png",
  bulb: "/messenger-reply/characters/bulb.png",
  check: "/messenger-reply/characters/check.png",
  flask: "/messenger-reply/characters/flask.png",
  envelope: "/messenger-reply/characters/envelope.png",
  globe: "/messenger-reply/characters/globe.png",
  cloud: "/messenger-reply/characters/cloud.png",
};

type Props = {
  id: IconId;
  size?: number;
  /** 지정하면 의미 있는 이미지로, 없으면 장식용으로 처리한다. */
  title?: string;
};

export function ChatIcon({ id, size = 96, title }: Props) {
  return (
    <img
      className="chat-icon"
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
