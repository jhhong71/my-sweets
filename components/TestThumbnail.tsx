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
  "money-habit": "/money-habit/characters/steady-planner.png",
  // 첫 번째 유형(rmd·자리를 이끄는 진심 리더)의 캐릭터. 다른 카드와 같이
  // 결과 목록 첫 유형의 일러스트를 대표로 쓴다.
  "team-dinner": "/team-dinner/characters/rmd.png",
  // 첫 번째 유형(제우스)의 캐릭터. 다른 카드와 같이 결과 목록 첫 유형의
  // 일러스트를 대표로 쓴다.
  olympus: "/olympus/gods/zeus.webp",
  // 첫 번째 여행지(도쿄, 일본)의 일러스트. 배경이 투명한 컷아웃이라 다른
  // 스티커형 캐릭터들과 같은 방식(object-contain)으로 그대로 띄운다.
  "travel-destination": "/travel-destination/destinations/acp.webp",
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
  if (test.id === "ppuri-saju") {
    // 뿌리사주의 캐릭터 이미지는 다른 앱과 달리 배경이 투명하지 않고
    // 자체 종이색 배경이 칠해진 정사각 일러스트다(앱 자체 .portrait 프레임과
    // 동일한 방식). 그대로 얹으면 각진 테두리가 그라디언트 위에 떠 보이므로,
    // 앱과 같은 방식(둥근 사각 프레임 + object-fit: cover)으로 감싼다.
    // 첫 번째 캐릭터(fire-strategist·불도저 책사형)를 대표로 쓴다.
    return (
      <img
        src="/ppuri-saju/assets/characters/thumb/fire-strategist.webp"
        alt=""
        aria-hidden="true"
        width={ICON_PIXEL_SIZE}
        height={ICON_PIXEL_SIZE}
        draggable={false}
        className="h-[104px] w-[104px] rounded-2xl object-cover shadow-[0_10px_24px_-12px_rgba(33,29,24,0.35)] ring-1 ring-black/[0.06]"
      />
    );
  }
  if (test.id === "morning-prep") {
    // 출근 준비 테스트의 캐릭터 이미지도 뿌리사주처럼 배경이 투명하지 않은
    // 장면형 일러스트다(앱 자체 .character-image가 object-fit: cover로
    // 프레임 안에 채우는 방식). 같은 방식으로 둥근 사각 프레임에 채운다.
    // 첫 번째 유형(아침의 정보 항해사·rcf)을 대표로 쓴다.
    return (
      <img
        src="/morning-prep/characters/rcf.webp"
        alt=""
        aria-hidden="true"
        width={ICON_PIXEL_SIZE}
        height={ICON_PIXEL_SIZE}
        draggable={false}
        className="h-[104px] w-[104px] rounded-2xl object-cover shadow-[0_10px_24px_-12px_rgba(33,29,24,0.2)] ring-1 ring-black/[0.06]"
      />
    );
  }
  if (test.id === "lunch-break") {
    // 점심시간 테스트의 캐릭터 이미지도 출근 준비 테스트와 같은 방식(원형
    // 아바타가 사각 캔버스 안에 있는 장면형 일러스트, object-fit: cover)이라
    // 같은 둥근 사각 프레임으로 감싼다. 첫 번째 유형(점심의 여유로운
    // 큐레이터·pwr)을 대표로 쓴다.
    return (
      <img
        src="/lunch-break/characters/pwr.webp"
        alt=""
        aria-hidden="true"
        width={ICON_PIXEL_SIZE}
        height={ICON_PIXEL_SIZE}
        draggable={false}
        className="h-[104px] w-[104px] rounded-2xl object-cover shadow-[0_10px_24px_-12px_rgba(33,29,24,0.2)] ring-1 ring-black/[0.06]"
      />
    );
  }
  // 나머지(말랑 만다라트, 외부 사이트)는 기존 모티프 이모지를 유지한다.
  return (
    <span className="text-6xl drop-shadow-sm" aria-hidden="true">
      {test.motif}
    </span>
  );
}
