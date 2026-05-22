import type { TarotCategoryId } from "@/lib/categories";

/**
 * 카테고리 서브메인 페이지에서 노출되는 타로 메뉴 데이터.
 *
 * - thumbnail: public 기준 절대 경로(`/images/tarot-categories/<category>/<file>.webp`)
 * - 파일이 없을 경우 카드의 그라데이션 fallback이 그대로 노출됩니다 (background-image 방식)
 * - 추가/삭제: 아래 TAROT_MENUS 배열에 `makeMenu({...})` 항목만 추가/삭제하면 됩니다
 * - SEO·공유 문구는 helper로 자동 생성되어 하드코딩을 최소화합니다
 */
export type TarotMenu = {
  categoryId: TarotCategoryId;
  categoryName: string;
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  thumbnail: string;
  altText: string;
  ctaText: string;
  readingType: string;
  metaTitle: string;
  metaDescription: string;
  shareTitle: string;
  shareDescription: string;
  isActive: boolean;
  sortOrder: number;
};

type TarotMenuInput = Omit<
  TarotMenu,
  "ctaText" | "metaTitle" | "metaDescription" | "shareTitle" | "shareDescription" | "isActive"
>;

function makeMenu(input: TarotMenuInput): TarotMenu {
  return {
    ...input,
    ctaText: "카드 뽑기",
    metaTitle: `${input.title} | 유어타로`,
    metaDescription: `${input.description} 유어타로에서 지금 나에게 필요한 타로 메시지를 확인해보세요.`,
    shareTitle: input.title,
    shareDescription: input.description,
    isActive: true,
  };
}

export const TAROT_MENUS: readonly TarotMenu[] = [
  /* 감정의 방 ---------------------------------------------------------- */
  makeMenu({
    categoryId: "emotion",
    categoryName: "감정의 방",
    slug: "mind-temperature",
    title: "오늘 내 마음의 온도",
    shortTitle: "마음의 온도",
    description: "지금 내 마음은 어떤 온도일까요?",
    thumbnail: "/images/tarot-categories/emotion/emotion-temperature.webp",
    altText: "밝은 자연 배경에서 자신의 마음을 조용히 바라보는 여성 이미지",
    readingType: "emotion_temperature",
    sortOrder: 1,
  }),
  makeMenu({
    categoryId: "emotion",
    categoryName: "감정의 방",
    slug: "holding-emotion",
    title: "내가 붙잡고 있는 감정",
    shortTitle: "붙잡은 감정",
    description: "아직 놓지 못한 마음의 이유를 들여다봐요",
    thumbnail: "/images/tarot-categories/emotion/emotion-holding.webp",
    altText: "생각에 잠긴 여성이 마음속 감정을 붙잡고 있는 듯한 이미지",
    readingType: "emotion_holding",
    sortOrder: 2,
  }),
  makeMenu({
    categoryId: "emotion",
    categoryName: "감정의 방",
    slug: "tired-heart",
    title: "나를 지치게 하는 마음",
    shortTitle: "지친 마음",
    description: "요즘 나를 무겁게 하는 감정을 확인해요",
    thumbnail: "/images/tarot-categories/emotion/emotion-tired-heart.webp",
    altText: "밝은 야외 공간에서 지친 표정으로 앉아 있는 여성 이미지",
    readingType: "emotion_tired_heart",
    sortOrder: 3,
  }),
  makeMenu({
    categoryId: "emotion",
    categoryName: "감정의 방",
    slug: "anxiety-reason",
    title: "불안의 진짜 이유",
    shortTitle: "불안의 이유",
    description: "막연한 불안이 어디서 오는지 알아봐요",
    thumbnail: "/images/tarot-categories/emotion/emotion-anxiety-reason.webp",
    altText: "자연광 아래에서 불안한 표정으로 생각에 잠긴 여성 이미지",
    readingType: "emotion_anxiety_reason",
    sortOrder: 4,
  }),
  makeMenu({
    categoryId: "emotion",
    categoryName: "감정의 방",
    slug: "heart-wants",
    title: "내 마음이 원하는 것",
    shortTitle: "마음의 방향",
    description: "내가 정말 바라는 마음의 방향을 찾아요",
    thumbnail: "/images/tarot-categories/emotion/emotion-heart-wants.webp",
    altText: "밝은 풍경 속에서 자신의 마음을 바라보듯 서 있는 여성 이미지",
    readingType: "emotion_heart_wants",
    sortOrder: 5,
  }),
  makeMenu({
    categoryId: "emotion",
    categoryName: "감정의 방",
    slug: "needed-words",
    title: "오늘 나에게 필요한 말",
    shortTitle: "필요한 말",
    description: "오늘의 나를 위한 따뜻한 한마디를 받아요",
    thumbnail: "/images/tarot-categories/emotion/emotion-needed-words.webp",
    altText: "따뜻한 햇살 아래에서 위로를 받는 듯한 여성 이미지",
    readingType: "emotion_needed_words",
    sortOrder: 6,
  }),

  /* 관계의 방 ---------------------------------------------------------- */
  makeMenu({
    categoryId: "relationship",
    categoryName: "관계의 방",
    slug: "unspoken-heart",
    title: "말하지 못한 그 마음",
    shortTitle: "말 못한 마음",
    description: "쉽게 꺼내지 못한 상대의 속마음을 들여다봐요",
    thumbnail: "/images/tarot-categories/relationship/relationship-unspoken-heart.webp",
    altText: "말하지 못한 마음을 품고 조용히 생각에 잠긴 인물 이미지",
    readingType: "relationship_unspoken_heart",
    sortOrder: 1,
  }),
  makeMenu({
    categoryId: "relationship",
    categoryName: "관계의 방",
    slug: "looking-at-me",
    title: "나를 바라보는 마음",
    shortTitle: "나를 보는 마음",
    description: "그 사람이 지금 나를 어떻게 느끼는지 확인해요",
    thumbnail: "/images/tarot-categories/relationship/relationship-looking-at-me.webp",
    altText: "누군가를 바라보는 듯한 따뜻하고 섬세한 분위기의 인물 이미지",
    readingType: "relationship_looking_at_me",
    sortOrder: 2,
  }),
  makeMenu({
    categoryId: "relationship",
    categoryName: "관계의 방",
    slug: "reunion-signal",
    title: "오늘의 재회 신호",
    shortTitle: "재회 신호",
    description: "다시 이어질 가능성이 있는지 오늘의 흐름을 살펴봐요",
    thumbnail: "/images/tarot-categories/relationship/relationship-reunion-signal.webp",
    altText: "다시 만남을 기다리는 듯한 감성적인 분위기의 인물 이미지",
    readingType: "relationship_reunion_signal",
    sortOrder: 3,
  }),
  makeMenu({
    categoryId: "relationship",
    categoryName: "관계의 방",
    slug: "before-goodbye",
    title: "이별 앞에 선 마음",
    shortTitle: "이별의 마음",
    description: "끝과 시작 사이에서 흔들리는 마음을 정리해요",
    thumbnail: "/images/tarot-categories/relationship/relationship-before-goodbye.webp",
    altText: "이별 앞에서 복잡한 감정을 느끼는 인물 이미지",
    readingType: "relationship_before_goodbye",
    sortOrder: 4,
  }),
  makeMenu({
    categoryId: "relationship",
    categoryName: "관계의 방",
    slug: "next-scene",
    title: "우리 사이의 다음 장면",
    shortTitle: "다음 장면",
    description: "앞으로 두 사람의 관계가 어디로 향할지 알아봐요",
    thumbnail: "/images/tarot-categories/relationship/relationship-next-scene.webp",
    altText: "관계의 다음 흐름을 상징하는 감성적인 장면 이미지",
    readingType: "relationship_next_scene",
    sortOrder: 5,
  }),
  makeMenu({
    categoryId: "relationship",
    categoryName: "관계의 방",
    slug: "contact-now",
    title: "연락해도 괜찮을까",
    shortTitle: "연락해도 될까",
    description: "지금 먼저 다가가도 괜찮은 순간인지 확인해요",
    thumbnail: "/images/tarot-categories/relationship/relationship-contact-now.webp",
    altText: "휴대폰을 바라보며 연락을 고민하는 인물 이미지",
    readingType: "relationship_contact_now",
    sortOrder: 6,
  }),

  /* 선택의 방 ---------------------------------------------------------- */
  makeMenu({
    categoryId: "choice",
    categoryName: "선택의 방",
    slug: "choice-right-now",
    title: "지금 선택해도 괜찮을까",
    shortTitle: "지금 선택",
    description: "망설이는 선택 앞에서 지금의 흐름을 확인해요",
    thumbnail: "/images/tarot-categories/choice/choice-right-now.webp",
    altText: "갈림길 앞에서 선택을 고민하는 인물 이미지",
    readingType: "choice_right_now",
    sortOrder: 1,
  }),
  makeMenu({
    categoryId: "choice",
    categoryName: "선택의 방",
    slug: "avoided-answer",
    title: "내가 피하고 있는 답",
    shortTitle: "피한 답",
    description: "외면하고 있던 마음속 진짜 답을 들여다봐요",
    thumbnail: "/images/tarot-categories/choice/choice-avoided-answer.webp",
    altText: "스스로 외면한 답을 마주하려는 듯한 인물 이미지",
    readingType: "choice_avoided_answer",
    sortOrder: 2,
  }),
  makeMenu({
    categoryId: "choice",
    categoryName: "선택의 방",
    slug: "new-beginning",
    title: "새로운 시작의 신호",
    shortTitle: "시작 신호",
    description: "지금이 다시 시작해도 좋은 때인지 알아봐요",
    thumbnail: "/images/tarot-categories/choice/choice-new-beginning.webp",
    altText: "새로운 시작을 앞두고 밝은 곳을 바라보는 인물 이미지",
    readingType: "choice_new_beginning",
    sortOrder: 3,
  }),
  makeMenu({
    categoryId: "choice",
    categoryName: "선택의 방",
    slug: "money-flow",
    title: "돈의 흐름이 바뀌는 때",
    shortTitle: "돈의 흐름",
    description: "금전운의 변화가 어디서 시작되는지 살펴봐요",
    thumbnail: "/images/tarot-categories/choice/choice-money-flow.webp",
    altText: "금전운과 변화의 흐름을 상징하는 감성적인 이미지",
    readingType: "choice_money_flow",
    sortOrder: 4,
  }),
  makeMenu({
    categoryId: "choice",
    categoryName: "선택의 방",
    slug: "work-match",
    title: "일과 나의 궁합",
    shortTitle: "일 궁합",
    description: "지금 하는 일과 나의 에너지가 잘 맞는지 확인해요",
    thumbnail: "/images/tarot-categories/choice/choice-work-match.webp",
    altText: "일과 자신의 방향을 고민하는 인물 이미지",
    readingType: "choice_work_match",
    sortOrder: 5,
  }),
  makeMenu({
    categoryId: "choice",
    categoryName: "선택의 방",
    slug: "no-regret",
    title: "후회 없는 결정을 위해",
    shortTitle: "후회 없는 선택",
    description: "선택 후 흔들리지 않도록 마음의 기준을 세워봐요",
    thumbnail: "/images/tarot-categories/choice/choice-no-regret.webp",
    altText: "후회 없는 결정을 위해 차분히 생각하는 인물 이미지",
    readingType: "choice_no_regret",
    sortOrder: 6,
  }),

  /* 운명의 방 ---------------------------------------------------------- */
  makeMenu({
    categoryId: "destiny",
    categoryName: "운명의 방",
    slug: "month-flow",
    title: "이번 달 나의 흐름",
    shortTitle: "이번 달 흐름",
    description: "이번 달 나에게 찾아올 전체적인 흐름을 확인해요",
    thumbnail: "/images/tarot-categories/destiny/destiny-month-flow.webp",
    altText: "이번 달의 흐름과 변화를 상징하는 감성적인 인물 이미지",
    readingType: "destiny_month_flow",
    sortOrder: 1,
  }),
  makeMenu({
    categoryId: "destiny",
    categoryName: "운명의 방",
    slug: "coming-change",
    title: "곧 다가올 변화",
    shortTitle: "다가올 변화",
    description: "가까운 미래에 생길 변화의 신호를 살펴봐요",
    thumbnail: "/images/tarot-categories/destiny/destiny-coming-change.webp",
    altText: "다가올 변화를 예감하듯 먼 곳을 바라보는 인물 이미지",
    readingType: "destiny_coming_change",
    sortOrder: 2,
  }),
  makeMenu({
    categoryId: "destiny",
    categoryName: "운명의 방",
    slug: "destiny-signal",
    title: "운명이 보내는 신호",
    shortTitle: "운명의 신호",
    description: "지금 내 삶에 나타난 의미 있는 메시지를 읽어봐요",
    thumbnail: "/images/tarot-categories/destiny/destiny-signal.webp",
    altText: "운명의 신호를 느끼는 듯한 신비로운 분위기의 인물 이미지",
    readingType: "destiny_signal",
    sortOrder: 3,
  }),
  makeMenu({
    categoryId: "destiny",
    categoryName: "운명의 방",
    slug: "turning-point",
    title: "내 인생의 전환점",
    shortTitle: "전환점",
    description: "중요한 변화가 시작되는 지점을 알아봐요",
    thumbnail: "/images/tarot-categories/destiny/destiny-turning-point.webp",
    altText: "인생의 전환점을 앞둔 듯한 분위기의 인물 이미지",
    readingType: "destiny_turning_point",
    sortOrder: 4,
  }),
  makeMenu({
    categoryId: "destiny",
    categoryName: "운명의 방",
    slug: "opportunity",
    title: "기회는 어디에서 올까",
    shortTitle: "기회의 방향",
    description: "나에게 열릴 가능성과 기회의 방향을 찾아봐요",
    thumbnail: "/images/tarot-categories/destiny/destiny-opportunity.webp",
    altText: "새로운 기회의 방향을 바라보는 인물 이미지",
    readingType: "destiny_opportunity",
    sortOrder: 5,
  }),
  makeMenu({
    categoryId: "destiny",
    categoryName: "운명의 방",
    slug: "guiding-flow",
    title: "지금 나를 이끄는 흐름",
    shortTitle: "이끄는 흐름",
    description: "보이지 않게 나를 움직이는 운의 방향을 확인해요",
    thumbnail: "/images/tarot-categories/destiny/destiny-guiding-flow.webp",
    altText: "삶의 흐름에 이끌리듯 앞으로 나아가는 인물 이미지",
    readingType: "destiny_guiding_flow",
    sortOrder: 6,
  }),

  /* 위로의 방 ---------------------------------------------------------- */
  makeMenu({
    categoryId: "comfort",
    categoryName: "위로의 방",
    slug: "tired-heart-card",
    title: "지친 마음을 위한 카드",
    shortTitle: "지친 마음 카드",
    description: "지친 하루 끝, 내 마음에 필요한 위로를 받아요",
    thumbnail: "/images/tarot-categories/comfort/comfort-tired-heart.webp",
    altText: "지친 마음을 위로받는 듯한 따뜻한 분위기의 인물 이미지",
    readingType: "comfort_tired_heart",
    sortOrder: 1,
  }),
  makeMenu({
    categoryId: "comfort",
    categoryName: "위로의 방",
    slug: "will-be-okay",
    title: "괜찮아질 수 있을까",
    shortTitle: "괜찮아질까",
    description: "지금의 힘든 마음이 어떻게 흘러갈지 살펴봐요",
    thumbnail: "/images/tarot-categories/comfort/comfort-will-be-okay.webp",
    altText: "괜찮아질 수 있을지 조용히 마음을 다독이는 인물 이미지",
    readingType: "comfort_will_be_okay",
    sortOrder: 2,
  }),
  makeMenu({
    categoryId: "comfort",
    categoryName: "위로의 방",
    slug: "one-sentence",
    title: "오늘 버티게 해줄 한 문장",
    shortTitle: "버티는 한 문장",
    description: "오늘 하루를 견디게 해줄 짧은 메시지를 받아요",
    thumbnail: "/images/tarot-categories/comfort/comfort-one-sentence.webp",
    altText: "오늘을 버티게 해줄 위로의 문장을 떠올리는 인물 이미지",
    readingType: "comfort_one_sentence",
    sortOrder: 3,
  }),
  makeMenu({
    categoryId: "comfort",
    categoryName: "위로의 방",
    slug: "believe-myself",
    title: "나를 다시 믿는 연습",
    shortTitle: "나를 믿기",
    description: "흔들린 마음을 다잡고 나를 다시 믿어봐요",
    thumbnail: "/images/tarot-categories/comfort/comfort-believe-myself.webp",
    altText: "자신을 다시 믿으려는 차분하고 따뜻한 분위기의 인물 이미지",
    readingType: "comfort_believe_myself",
    sortOrder: 4,
  }),
  makeMenu({
    categoryId: "comfort",
    categoryName: "위로의 방",
    slug: "resting-place",
    title: "마음이 쉬어가는 자리",
    shortTitle: "쉬어가는 자리",
    description: "잠시 멈춰 내 마음이 쉴 수 있는 시간을 가져요",
    thumbnail: "/images/tarot-categories/comfort/comfort-resting-place.webp",
    altText: "마음이 쉬어가는 조용하고 평온한 공간 이미지",
    readingType: "comfort_resting_place",
    sortOrder: 5,
  }),
  makeMenu({
    categoryId: "comfort",
    categoryName: "위로의 방",
    slug: "letter-to-tomorrow",
    title: "내일의 나에게 보내는 말",
    shortTitle: "내일의 나에게",
    description: "조금 더 괜찮아질 내일의 나에게 말을 건네요",
    thumbnail: "/images/tarot-categories/comfort/comfort-letter-to-tomorrow.webp",
    altText: "내일의 자신에게 따뜻한 말을 건네는 듯한 인물 이미지",
    readingType: "comfort_letter_to_tomorrow",
    sortOrder: 6,
  }),
];

/** 카테고리별 활성 메뉴 목록 — sortOrder 오름차순 */
export function getMenusByCategory(categoryId: TarotCategoryId): TarotMenu[] {
  return TAROT_MENUS
    .filter((m) => m.categoryId === categoryId && m.isActive)
    .slice()
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

/** 카테고리 + slug로 단일 메뉴 조회 (상세 페이지용) */
export function getMenuBySlug(
  categoryId: TarotCategoryId,
  slug: string,
): TarotMenu | undefined {
  return TAROT_MENUS.find(
    (m) => m.categoryId === categoryId && m.slug === slug && m.isActive,
  );
}
