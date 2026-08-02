import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Tailwind 클래스 병합 유틸 (shadcn/ui 관례) */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** 참여자 수를 12,345 형태로 포맷 */
export function formatCount(n: number): string {
  return n.toLocaleString("ko-KR");
}
