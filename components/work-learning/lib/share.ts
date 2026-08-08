import type { Axis, AxisScores, IconKey, ResultProfile } from "../types";
import { AXIS_LABELS, AXIS_ORDER } from "./axis";

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const lines: string[] = [];
  let current = "";
  for (const ch of text) {
    const next = current + ch;
    if (ctx.measureText(next).width > maxWidth && current !== "") {
      lines.push(current.trimEnd());
      current = ch === " " ? "" : ch;
    } else {
      current = next;
    }
  }
  if (current) lines.push(current.trimEnd());
  return lines;
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
): void {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/** 유형별 배지 아이콘을 원본 도형으로 그린다 (이모지·이미지 미사용). */
function drawBadge(
  ctx: CanvasRenderingContext2D,
  iconKey: IconKey,
  cx: number,
  cy: number,
  size: number,
  color: string,
): void {
  ctx.save();
  const half = size / 2;
  const grad = ctx.createLinearGradient(cx - half, cy - half, cx + half, cy + half);
  grad.addColorStop(0, "#ffffff");
  grad.addColorStop(0.55, color);
  grad.addColorStop(1, color);
  roundRect(ctx, cx - half, cy - half, size, size, size * 0.28);
  ctx.fillStyle = grad;
  ctx.fill();

  ctx.fillStyle = "#ffffff";
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = size * 0.06;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  switch (iconKey) {
    case "rocket": {
      ctx.beginPath();
      ctx.moveTo(cx, cy - size * 0.3);
      ctx.quadraticCurveTo(cx + size * 0.18, cy - size * 0.05, cx + size * 0.14, cy + size * 0.22);
      ctx.lineTo(cx - size * 0.14, cy + size * 0.22);
      ctx.quadraticCurveTo(cx - size * 0.18, cy - size * 0.05, cx, cy - size * 0.3);
      ctx.fill();
      break;
    }
    case "telescope": {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-0.32);
      ctx.fillRect(-size * 0.26, -size * 0.06, size * 0.4, size * 0.13);
      ctx.restore();
      ctx.beginPath();
      ctx.arc(cx + size * 0.22, cy - size * 0.14, size * 0.07, 0, Math.PI * 2);
      ctx.stroke();
      break;
    }
    case "book": {
      ctx.beginPath();
      ctx.moveTo(cx, cy - size * 0.16);
      ctx.quadraticCurveTo(cx - size * 0.24, cy - size * 0.26, cx - size * 0.24, cy - size * 0.06);
      ctx.lineTo(cx - size * 0.24, cy + size * 0.2);
      ctx.quadraticCurveTo(cx - size * 0.1, cy + size * 0.14, cx, cy + size * 0.22);
      ctx.quadraticCurveTo(cx + size * 0.1, cy + size * 0.14, cx + size * 0.24, cy + size * 0.2);
      ctx.lineTo(cx + size * 0.24, cy - size * 0.06);
      ctx.quadraticCurveTo(cx + size * 0.24, cy - size * 0.26, cx, cy - size * 0.16);
      ctx.fill();
      break;
    }
    case "bolt": {
      ctx.beginPath();
      ctx.moveTo(cx + size * 0.06, cy - size * 0.28);
      ctx.lineTo(cx - size * 0.14, cy + size * 0.02);
      ctx.lineTo(cx - size * 0.02, cy + size * 0.02);
      ctx.lineTo(cx - size * 0.08, cy + size * 0.3);
      ctx.lineTo(cx + size * 0.16, cy - size * 0.04);
      ctx.lineTo(cx + size * 0.03, cy - size * 0.04);
      ctx.closePath();
      ctx.fill();
      break;
    }
    case "compass": {
      ctx.beginPath();
      ctx.arc(cx, cy, size * 0.22, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx + size * 0.08, cy - size * 0.13);
      ctx.lineTo(cx - size * 0.05, cy + size * 0.02);
      ctx.lineTo(cx - size * 0.09, cy + size * 0.17);
      ctx.lineTo(cx + size * 0.04, cy + size * 0.01);
      ctx.closePath();
      ctx.fill();
      break;
    }
  }
  ctx.restore();
}

const FONT = "'Pretendard Variable', Pretendard, sans-serif";
const SERVICE_NAME = "업무 학습 스타일 테스트";

const PAPER = "#FCF4E2";
const INK = "#4A3A26";
const INK_SOFT = "#8A7355";
const INK_FAINT = "#D9C193";

/** 점수 내림차순 정렬. 동점이면 AXIS_ORDER 순서를 유지한다(화면 표시와 동일 규칙). */
function rankedAxes(scores: AxisScores): Axis[] {
  return [...AXIS_ORDER].sort((a, b) => {
    const diff = scores[b] - scores[a];
    if (Math.abs(diff) > 1e-9) return diff;
    return AXIS_ORDER.indexOf(a) - AXIS_ORDER.indexOf(b);
  });
}

/**
 * 결과 카드를 캔버스에 그려 PNG로 다운로드한다. 광고·제휴 영역은 포함하지 않는다.
 * scores가 null이면(공유 링크 미리보기 등 실제 응답이 없는 경우) 축 점수 없이
 * 제목·요약만 담은 카드를 그린다 — 실제 값이 없는 점수를 지어내지 않는다.
 */
export function downloadResultImage(result: ResultProfile, scores: AxisScores | null): void {
  const W = 1080;
  const H = scores ? 1320 : 920;
  const M = 90;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.fillStyle = PAPER;
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = result.color;
  ctx.fillRect(0, 0, W, 18);

  ctx.textAlign = "left";

  ctx.fillStyle = INK_SOFT;
  ctx.font = `700 26px ${FONT}`;
  ctx.fillText(SERVICE_NAME, M, 116);
  ctx.fillStyle = INK_FAINT;
  ctx.fillRect(M, 146, W - M * 2, 2);

  drawBadge(ctx, result.iconKey, M + 60, 250, 110, result.color);

  ctx.fillStyle = INK;
  ctx.font = `800 82px ${FONT}`;
  ctx.fillText(result.title, M, 410);

  ctx.fillStyle = INK_SOFT;
  ctx.font = `600 32px ${FONT}`;
  const subtitleLines = wrapText(ctx, result.subtitle, W - M * 2);
  subtitleLines.forEach((line, i) => ctx.fillText(line, M, 460 + i * 42));

  let cursor = 460 + subtitleLines.length * 42 + 30;
  ctx.fillStyle = INK_FAINT;
  ctx.fillRect(M, cursor, W - M * 2, 2);
  cursor += 46;

  ctx.fillStyle = INK;
  ctx.font = `400 32px ${FONT}`;
  const lines = wrapText(ctx, result.summary, W - M * 2).slice(0, 6);
  lines.forEach((line, i) => ctx.fillText(line, M, cursor + i * 50));
  cursor += lines.length * 50;

  if (scores) {
    cursor += 40;
    ctx.fillStyle = INK_SOFT;
    ctx.font = `800 24px ${FONT}`;
    ctx.fillText("행동 축 점수", M, cursor);
    cursor += 18;
    ctx.fillStyle = INK_FAINT;
    ctx.fillRect(M, cursor, W - M * 2, 2);
    cursor += 46;

    const barX = M + 320;
    const barW = W - M - 90 - barX;

    rankedAxes(scores).forEach((axis, i) => {
      const rowY = cursor + i * 74;

      ctx.fillStyle = INK;
      ctx.font = `700 26px ${FONT}`;
      ctx.fillText(AXIS_LABELS[axis], M, rowY);

      ctx.fillStyle = "#EFDFB8";
      ctx.fillRect(barX, rowY - 18, barW, 16);
      const ratio = Math.max(0, Math.min(1, (scores[axis] - 1) / 4));
      ctx.fillStyle = result.color;
      ctx.fillRect(barX, rowY - 18, barW * ratio, 16);

      ctx.textAlign = "right";
      ctx.fillStyle = INK;
      ctx.font = `800 28px ${FONT}`;
      ctx.fillText(scores[axis].toFixed(1), W - M, rowY);
      ctx.textAlign = "left";
    });
  }

  ctx.fillStyle = INK_FAINT;
  ctx.fillRect(M, H - 96, W - M * 2, 2);
  ctx.fillStyle = INK_SOFT;
  ctx.font = `600 24px ${FONT}`;
  ctx.fillText(`${SERVICE_NAME} · 전 16문항`, M, H - 54);

  const link = document.createElement("a");
  link.download = `work-learning-style-${result.id}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

/** Web Share API → 클립보드 복사 순으로 폴백하며 결과를 공유한다. */
export async function shareResult(result: ResultProfile): Promise<"shared" | "copied" | "failed"> {
  const url = new URL(window.location.href);
  url.search = `?result=${result.id}`;
  const text = `${result.shareText}`;

  if (navigator.share) {
    try {
      await navigator.share({ title: SERVICE_NAME, text, url: url.toString() });
      return "shared";
    } catch (e) {
      if ((e as DOMException).name === "AbortError") return "failed";
    }
  }
  try {
    await navigator.clipboard.writeText(`${text}\n${url.toString()}`);
    return "copied";
  } catch {
    return "failed";
  }
}
