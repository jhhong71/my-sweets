/**
 * 성씨별로 잘 알려진 본관 몇 가지를 안내용으로 묶어둔 목록.
 * 실제 족보 데이터가 아니라, 선택지를 보여주기 위한 참고용 구성이다.
 * 목록에 없는 성씨나 본관은 '직접 입력'으로 채울 수 있다.
 */
export type SurnameEntry = {
  name: string;
  bongwans: string[];
};

export const SURNAMES: SurnameEntry[] = [
  { name: "김", bongwans: ["김해", "경주", "광산", "안동", "김녕", "의성"] },
  { name: "이", bongwans: ["전주", "경주", "성주", "연안", "덕수", "광주"] },
  { name: "박", bongwans: ["밀양", "반남", "무안", "순천", "고령"] },
  { name: "최", bongwans: ["경주", "전주", "해주", "강릉", "탐진"] },
  { name: "정", bongwans: ["경주", "동래", "진주", "연일", "하동"] },
  { name: "강", bongwans: ["진주", "금천", "신천"] },
  { name: "조", bongwans: ["한양", "풍양", "함안", "배천"] },
  { name: "윤", bongwans: ["파평", "해평", "칠원"] },
  { name: "장", bongwans: ["인동", "안동", "결성"] },
  { name: "임", bongwans: ["나주", "풍천", "평택"] },
  { name: "한", bongwans: ["청주", "곡산"] },
  { name: "오", bongwans: ["해주", "동복", "보성"] },
  { name: "서", bongwans: ["달성", "이천", "대구"] },
  { name: "신", bongwans: ["평산", "영산", "고령"] },
  { name: "권", bongwans: ["안동"] },
  { name: "황", bongwans: ["창원", "장수", "평해"] },
  { name: "안", bongwans: ["순흥", "죽산"] },
  { name: "송", bongwans: ["은진", "여산", "연안"] },
  { name: "유", bongwans: ["문화", "진주", "서산"] },
  { name: "홍", bongwans: ["남양", "풍산"] },
  { name: "전", bongwans: ["정선", "완산", "천안"] },
  { name: "고", bongwans: ["제주", "장흥"] },
  { name: "문", bongwans: ["남평", "감천"] },
  { name: "양", bongwans: ["남원", "제주", "청주"] },
  { name: "손", bongwans: ["밀양", "경주"] },
  { name: "배", bongwans: ["성주", "김해", "흥해"] },
  { name: "백", bongwans: ["수원", "남포"] },
  { name: "허", bongwans: ["김해", "양천", "하양"] },
  { name: "남", bongwans: ["의령", "영양"] },
  { name: "심", bongwans: ["청송", "삼척"] },
  { name: "노", bongwans: ["교하", "광주", "풍천"] },
  { name: "하", bongwans: ["진주", "성주"] },
  { name: "곽", bongwans: ["현풍", "청주"] },
  { name: "성", bongwans: ["창녕"] },
  { name: "차", bongwans: ["연안", "홍주"] },
  { name: "민", bongwans: ["여흥"] },
];

/** '본관 상관없이' — 모든 성씨 본관 목록에 항상 먼저 붙는 공통 선택지. */
export const NO_BONGWAN = "본관 상관없이";

export function findSurname(name: string): SurnameEntry | undefined {
  return SURNAMES.find((s) => s.name === name);
}

/** 선택한 성씨에 대한 본관 선택지 (공통 옵션 포함). 목록에 없는 성씨면 공통 옵션만. */
export function bongwansFor(surname: string): string[] {
  const entry = findSurname(surname);
  return [NO_BONGWAN, ...(entry?.bongwans ?? [])];
}
