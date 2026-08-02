import type { Axis, GeneratedResult, Intensity, ResultId } from "../types";
import { RESULTS } from "../data/results";
import { SNACK_AXIS } from "../data/generation";
import {
  FLAVOR_BY_SECONDARY,
  FLAVOR_SLUG,
  MODIFIERS,
} from "../data/generation";

/**
 * 2위 성향 원점수(0~9)로 강도 구간을 정한다.
 * 실측 분포(2위 원점수가 4~7에 집중)에 맞춰 6을 경계로 2단계(≈50/50)로 나눈다.
 */
export function intensityFromRaw(raw: number): Intensity {
  return raw >= 6 ? "strong" : "moderate";
}

const TRAIT_SNACK = Object.fromEntries(
  (Object.keys(SNACK_AXIS) as ResultId[]).map((s) => [SNACK_AXIS[s], s]),
) as Record<Axis, ResultId>;

/**
 * 1위/2위 성향과 2위 원점수로 계층형 결과를 생성한다.
 * 기본 간식 = 1위 성향, 수식어 계열 = 2위 성향, 강도 = 2위 원점수.
 * 맛은 2위 성향의 버킷 → 간식별 대표 맛 3종 중 하나(성격 상징 아님).
 * 별도 혼합형 결과군은 없다.
 */
export function generateResult(
  primaryTrait: Axis,
  secondaryTrait: Axis,
  secondaryRaw: number,
): GeneratedResult {
  const baseSnack = TRAIT_SNACK[primaryTrait];
  const intensity = intensityFromRaw(secondaryRaw);
  const modifier = MODIFIERS[secondaryTrait][intensity];
  const flavor = FLAVOR_BY_SECONDARY[baseSnack][secondaryTrait];
  const snackTitle = RESULTS[baseSnack].title;
  const title = `${modifier} ${flavor} ${snackTitle}`;
  const imageKey = `${baseSnack}-${FLAVOR_SLUG[flavor]}`;
  return {
    baseSnack,
    primaryTrait,
    secondaryTrait,
    intensity,
    modifier,
    flavor,
    title,
    imageKey,
  };
}
