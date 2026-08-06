/** 한글 조사 처리. 사용자가 적은 목표 문구가 뭐든 문장이 어색해지지 않게 한다. */

/** 마지막 글자에 받침이 있는지 (한글이 아니면 false) */
function hasFinalConsonant(word: string): boolean {
  const text = word.trim();
  if (!text) return false;
  const code = text.charCodeAt(text.length - 1);
  if (code < 0xac00 || code > 0xd7a3) return false;
  return (code - 0xac00) % 28 !== 0;
}

/** 목적격 조사: 받침 있으면 "을", 없으면 "를" */
export function objectParticle(word: string): string {
  return hasFinalConsonant(word) ? "을" : "를";
}
