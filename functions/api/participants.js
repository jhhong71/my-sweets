/**
 * 참여자 수 카운터 API (Cloudflare Pages Functions).
 *
 * - GET  /api/participants        전체 테스트의 누적 참여수
 * - POST /api/participants {id}   해당 테스트 참여수 +1
 *
 * KV 바인딩(PARTICIPANTS)이 없으면 available:false 를 돌려주고,
 * 프런트는 숫자를 아예 표시하지 않는다(가짜 숫자를 보여주지 않기 위함).
 */

const PREFIX = "participants:";
const ID_PATTERN = /^[a-z0-9-]{1,40}$/;

function json(body, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", ...extraHeaders },
  });
}

export async function onRequestGet({ env }) {
  const kv = env.PARTICIPANTS;
  if (!kv) return json({ available: false, counts: {} });

  const { keys } = await kv.list({ prefix: PREFIX });
  const entries = await Promise.all(
    keys.map(async (k) => [k.name.slice(PREFIX.length), Number(await kv.get(k.name)) || 0]),
  );

  // 짧게 캐시해 KV 읽기 횟수를 줄인다(집계 숫자라 약간의 지연은 무해).
  return json(
    { available: true, counts: Object.fromEntries(entries) },
    200,
    { "cache-control": "public, max-age=60" },
  );
}

export async function onRequestPost({ request, env }) {
  const kv = env.PARTICIPANTS;
  if (!kv) return json({ available: false });

  let id;
  try {
    ({ id } = await request.json());
  } catch {
    return json({ error: "invalid body" }, 400);
  }
  if (!ID_PATTERN.test(id ?? "")) return json({ error: "invalid id" }, 400);

  const key = PREFIX + id;
  // KV에는 원자적 증가가 없다. 이 규모의 트래픽에서는 충돌 가능성이 낮아
  // read-modify-write로 충분하다(동시 요청 시 드물게 1 누락 가능).
  const next = (Number(await kv.get(key)) || 0) + 1;
  await kv.put(key, String(next));

  return json({ available: true, id, count: next }, 200, { "cache-control": "no-store" });
}
