"use client";

import type { Test } from "@/lib/data";
import { DeskIcon } from "@/components/desk-organizing/components/DeskIcon";
import { LearnIcon } from "@/components/work-learning/components/LearnIcon";

/**
 * 카드 썸네일에 각 콘텐츠가 실제로 쓰는 아이콘을 그린다.
 *
 * 앱마다 아이콘을 담는 방식이 달라서 두 갈래로 처리한다.
 *  - 캐릭터 PNG가 있는 앱: public/ 정적 경로 이미지
 *  - 아이콘이 인라인 SVG 컴포넌트인 앱: 그 컴포넌트를 그대로 렌더
 *
 * 말랑 만다라트와 외부 사이트(오늘의 복붙)는 모티프 이모지를 그대로 쓴다.
 */

const IMAGE_SOURCES: Record<string, string> = {
  "my-sweet": "/my-sweets/snacks/pudding.png",
  "messenger-reply": "/messenger-reply/characters/heartbubble.png",
  "work-stress": "/work-stress/characters/balanced.png",
  shopping: "/shopping/characters/perfect-hunter.png",
  "task-kickoff": "/task-kickoff/characters/rocket.png",
};

const ICON_PIXEL_SIZE = 104;

export function TestThumbnail({ test }: { test: Test }) {
  const image = IMAGE_SOURCES[test.id];
  if (image) {
    return (
      <img
        src={image}
        alt=""
        aria-hidden="true"
        width={ICON_PIXEL_SIZE}
        height={ICON_PIXEL_SIZE}
        draggable={false}
        className="h-[104px] w-[104px] object-contain drop-shadow-sm"
      />
    );
  }

  if (test.id === "desk-organizing") {
    return <DeskIcon id="shelf" size={ICON_PIXEL_SIZE} />;
  }
  if (test.id === "work-learning") {
    return <LearnIcon iconKey="rocket" size={ICON_PIXEL_SIZE} />;
  }
  // 나머지(말랑 만다라트, 외부 사이트)는 기존 모티프 이모지를 유지한다.
  return (
    <span className="text-6xl drop-shadow-sm" aria-hidden="true">
      {test.motif}
    </span>
  );
}
