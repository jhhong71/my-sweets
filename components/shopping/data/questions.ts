import type { Question } from "../types";

/**
 * 전체 18문항. "온라인·오프라인에서 일상적인 물건을 살 때 평소 자신의 모습"을
 * 공통 기준으로 작성했다.
 *
 * qual축   : 품질 추구(높음) ↔ 가성비 추구(낮음)
 * trend축  : 브랜드·유행 민감도(높음) ↔ 실용·안정 선호(낮음)
 * impulse축: 충동 구매(높음) ↔ 계획 구매(낮음)
 *
 * 축당 정방향 3문항 + 역방향 3문항으로 구성했다. 역방향 문항(reverse: true)은
 * 채점 시 6 - 응답값으로 반전해, 반전 후 값이 클수록 항상 해당 축의 "높음"
 * 방향을 가리키도록 통일했다. 표시 순서는 qual → trend → impulse를
 * 반복하며 정방향과 역방향을 번갈아 배치해 패턴을 감지하기 어렵게 했다.
 */
export const QUESTIONS: Question[] = [
  {
    id: "q1",
    text: "물건을 살 때 가격보다 품질과 마감을 더 꼼꼼히 확인하는 편이다.",
    axis: "qual",
    reverse: false,
  },
  {
    id: "q2",
    text: "새로운 유행 아이템이 나오면 먼저 써보고 싶은 편이다.",
    axis: "trend",
    reverse: false,
  },
  {
    id: "q3",
    text: "마음에 드는 물건을 보면 그 자리에서 바로 구매하는 편이다.",
    axis: "impulse",
    reverse: false,
  },
  {
    id: "q4",
    text: "가격이 합리적이면 품질은 크게 따지지 않고 구매하는 편이다.",
    axis: "qual",
    reverse: true,
  },
  {
    id: "q5",
    text: "유행에 크게 신경 쓰지 않고 평소 쓰던 것을 계속 쓰는 편이다.",
    axis: "trend",
    reverse: true,
  },
  {
    id: "q6",
    text: "구매 전에 여러 제품을 비교해보고 결정하는 편이다.",
    axis: "impulse",
    reverse: true,
  },
  {
    id: "q7",
    text: "조금 비싸더라도 오래 쓸 수 있는 제품을 선택하는 편이다.",
    axis: "qual",
    reverse: false,
  },
  {
    id: "q8",
    text: "브랜드가 있는 제품을 선택하면 더 믿음이 가는 편이다.",
    axis: "trend",
    reverse: false,
  },
  {
    id: "q9",
    text: "쇼핑을 시작할 때 정확히 뭘 살지 정하지 않고 둘러보다 사는 경우가 많다.",
    axis: "impulse",
    reverse: false,
  },
  {
    id: "q10",
    text: "필요한 기능만 있으면 마감이나 소재는 크게 신경 쓰지 않는다.",
    axis: "qual",
    reverse: true,
  },
  {
    id: "q11",
    text: "브랜드보다는 그냥 무난하고 실용적인 제품이면 충분하다고 생각한다.",
    axis: "trend",
    reverse: true,
  },
  {
    id: "q12",
    text: "사고 싶은 게 생겨도 며칠 고민한 뒤에 구매를 결정하는 편이다.",
    axis: "impulse",
    reverse: true,
  },
  {
    id: "q13",
    text: "구매 전 소재, 마감, 내구성 같은 세부 정보를 찾아보는 편이다.",
    axis: "qual",
    reverse: false,
  },
  {
    id: "q14",
    text: "SNS나 커뮤니티에서 화제가 된 제품에 관심이 가는 편이다.",
    axis: "trend",
    reverse: false,
  },
  {
    id: "q15",
    text: "예정에 없던 물건을 충동적으로 장바구니에 담는 일이 잦은 편이다.",
    axis: "impulse",
    reverse: false,
  },
  {
    id: "q16",
    text: "특별한 이유가 없다면 가장 저렴한 선택지를 고르는 편이다.",
    axis: "qual",
    reverse: true,
  },
  {
    id: "q17",
    text: "화제가 된 제품이라도 딱히 궁금하지 않은 편이다.",
    axis: "trend",
    reverse: true,
  },
  {
    id: "q18",
    text: "미리 필요한 목록을 정하고 그 안에서만 구매하는 편이다.",
    axis: "impulse",
    reverse: true,
  },
];
