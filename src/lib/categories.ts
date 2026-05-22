/**
 * 메인 페이지 상단 카테고리 메뉴 데이터.
 * 각 카테고리는 /menu/<id> 서브메인 페이지로 연결되며,
 * 서브메인 헤더에는 `description`이 그대로 노출됩니다.
 */
export type TarotCategoryId =
  | "emotion"
  | "relationship"
  | "choice"
  | "destiny"
  | "comfort";

export type TarotCategory = {
  id: TarotCategoryId;
  /** 사용자에게 보이는 이름 — GTM `categoryName`으로도 그대로 전송됩니다 */
  name: string;
  /** 카테고리 서브메인 페이지 경로 */
  href: string;
  /** 서브메인 헤더에 노출되는 카테고리 설명문 */
  description: string;
  /** 1뎁스 카테고리 대표 썸네일 — 홈 히어로 carousel 등에서 사용 */
  thumbnail: string;
};

export const TAROT_CATEGORIES: readonly TarotCategory[] = [
  {
    id: "emotion",
    name: "감정의 방",
    href: "/menu/emotion",
    description:
      "오늘의 마음을 조용히 들여다보고, 불안과 미련, 위로가 필요한 순간에 카드를 뽑아보세요.",
    thumbnail: "/images/tarot-categories/emotion.webp",
  },
  {
    id: "relationship",
    name: "관계의 방",
    href: "/menu/relationship",
    description:
      "말하지 못한 마음, 상대의 속마음, 다시 이어질 가능성을 조심스럽게 확인해보세요.",
    thumbnail: "/images/tarot-categories/relationship.webp",
  },
  {
    id: "choice",
    name: "선택의 방",
    href: "/menu/choice",
    description: "망설이는 선택 앞에서 지금 필요한 답과 방향을 카드로 살펴보세요.",
    thumbnail: "/images/tarot-categories/choice.webp",
  },
  {
    id: "destiny",
    name: "운명의 방",
    href: "/menu/destiny",
    description: "다가올 변화와 기회의 흐름, 지금 나를 이끄는 운명의 신호를 확인해보세요.",
    thumbnail: "/images/tarot-categories/destiny.webp",
  },
  {
    id: "comfort",
    name: "위로의 방",
    href: "/menu/comfort",
    description: "지친 마음이 잠시 쉬어갈 수 있도록 오늘 나에게 필요한 위로를 받아보세요.",
    thumbnail: "/images/tarot-categories/comfort.webp",
  },
] as const;

export function getCategoryById(id: string): TarotCategory | undefined {
  return TAROT_CATEGORIES.find((c) => c.id === id);
}
