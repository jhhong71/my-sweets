import type { ResultId } from "../types";

/**
 * 결과 유형 캐릭터 이미지.
 *
 * 사용자가 직접 제작한 5컷 캐릭터 시트에서 결과 유형 이름표(정면돌파
 * 해결사 등)를 기준으로 캐릭터별로 잘라, 흰 배경을 투명하게 처리한 뒤
 * public/ 정적 경로로 서빙한다(번들러 import 대신 절대 경로를 써서
 * 정적 export에서도 동일하게 동작하고, 결과 이미지 저장(html-to-image)
 * 시에도 같은 오리진 이미지라 그대로 포함된다).
 */
const SOURCES: Record<ResultId, string> = {
  solver: "/work-stress/characters/solver.png",
  expresser: "/work-stress/characters/expresser.png",
  strategist: "/work-stress/characters/strategist.png",
  distancer: "/work-stress/characters/distancer.png",
  balanced: "/work-stress/characters/balanced.png",
};

type Props = {
  id: ResultId;
  size?: number;
  /** 지정하면 의미 있는 이미지로, 없으면 장식용으로 처리한다. */
  title?: string;
};

export function StressIcon({ id, size = 96, title }: Props) {
  return (
    <img
      className="stress-icon"
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
