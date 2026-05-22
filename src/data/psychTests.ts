/**
 * 심리테스트 데이터 (확장 가능).
 *
 * 새 테스트 추가 절차:
 *   1) 아래 PSYCH_TESTS 배열에 PsychTest 항목 추가
 *   2) public/images/psych-tests/<slug>/ 디렉터리에 이미지 추가
 *      - thumb.webp, og.webp
 *      - options/option-{N}.webp
 *      - results/result-{N}.webp
 *   3) scripts/write-sitemap-xml.cjs 의 PSYCH_TESTS 상수에 slug + resultIds 추가
 *
 * 페이지(/psych-tests/<slug>, /psych-tests/<slug>/<resultId>)는 `generateStaticParams`
 * 가 이 데이터를 그대로 읽어 자동 생성됩니다.
 */

export type PsychTestOption = {
  id: string;
  resultId: string;
  title: string;
  description: string;
  image: string;
};

export type PsychTestResult = {
  id: string;
  title: string;
  body: string;
  image: string;
};

export type PsychTest = {
  slug: string;
  /** 목록 카드 + 상세 페이지 메인 타이틀 */
  title: string;
  /** 상세 페이지 부제목 */
  subtitle: string;
  /** 목록 카드 설명 */
  cardDescription: string;
  /** 질문 본문 */
  question: string;
  /** 질문 하단 부연 설명 */
  questionDescription: string;
  thumbnail: string;
  ogImage: string;
  options: PsychTestOption[];
  results: PsychTestResult[];

  // SEO·공유
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  ogTitle: string;
  ogDescription: string;
  /** 결과 공유시 사용. {result} 자리에 결과 타이틀이 들어갑니다. */
  shareDescriptionTemplate: string;

  isActive: boolean;
  sortOrder: number;
};

export const PSYCH_TESTS: readonly PsychTest[] = [
  {
    slug: "love-style",
    title: "사랑할 때 나는 어떤 사람일까?",
    subtitle: "좋아하는 사람 앞에서 드러나는 나의 진짜 연애 성향 테스트",
    cardDescription:
      "좋아하는 사람 앞에서 드러나는 나의 진짜 연애 성향을 확인해보세요.",
    question: "좋아하는 사람이 생겼을 때, 당신과 가장 가까운 모습은?",
    questionDescription:
      "이 선택은 당신이 사랑 앞에서 어떤 에너지로 움직이는 사람인지 보여줍니다. 카드처럼 드러나는 당신의 연애 성향을 다음 페이지에서 확인해보세요.",
    thumbnail: "/images/psych-tests/love-style/thumb.webp",
    ogImage: "/images/psych-tests/love-style/og.webp",
    options: [
      {
        id: "option-1",
        resultId: "result-1",
        title: "먼저 연락하고 자주 표현한다",
        description: "마음이 생기면 숨기기보다 자연스럽게 티를 내는 편이다.",
        image: "/images/psych-tests/love-style/options/option-1.webp",
      },
      {
        id: "option-2",
        resultId: "result-2",
        title: "상대가 다가올 때까지 기다린다",
        description: "좋아하는 마음은 있지만 먼저 움직이기엔 조심스럽다.",
        image: "/images/psych-tests/love-style/options/option-2.webp",
      },
      {
        id: "option-3",
        resultId: "result-3",
        title: "괜히 장난치거나 무심한 척한다",
        description: "좋아할수록 오히려 반대로 행동하게 된다.",
        image: "/images/psych-tests/love-style/options/option-3.webp",
      },
      {
        id: "option-4",
        resultId: "result-4",
        title: "혼자 상상하고 혼자 정리한다",
        description: "마음은 깊어지지만 쉽게 표현하지 못한다.",
        image: "/images/psych-tests/love-style/options/option-4.webp",
      },
    ],
    results: [
      {
        id: "result-1",
        title: "태양처럼 다가가는 사랑",
        body: "당신은 좋아하는 사람이 생기면 마음을 숨기기보다 솔직하게 표현하는 타입입니다. 연락도 먼저 하고, 관심도 자연스럽게 드러내며 관계를 빠르게 가까워지게 만듭니다. 다만 마음이 앞서면 상대에게 부담이 될 수 있으니, 가끔은 상대의 속도도 살펴보는 것이 좋습니다.",
        image: "/images/psych-tests/love-style/results/result-1.webp",
      },
      {
        id: "result-2",
        title: "달빛처럼 지켜보는 사랑",
        body: "당신은 쉽게 마음을 드러내지 않고 상대의 반응을 먼저 살피는 타입입니다. 실수는 적지만, 너무 오래 기다리다 보면 좋은 타이밍을 놓칠 수도 있습니다. 마음이 있다면 거창한 고백보다 작은 관심 표현부터 시작해보는 것이 좋습니다.",
        image: "/images/psych-tests/love-style/results/result-2.webp",
      },
      {
        id: "result-3",
        title: "별처럼 숨기는 사랑",
        body: "당신은 좋아할수록 괜히 장난치거나 무심한 척하는 타입입니다. 속마음은 따뜻하지만 표현 방식이 꼬여 보여 상대가 오해할 수 있습니다. 진심을 숨기는 것도 매력이 될 수 있지만, 중요한 순간에는 솔직한 한마디가 관계를 바꿀 수 있습니다.",
        image: "/images/psych-tests/love-style/results/result-3.webp",
      },
      {
        id: "result-4",
        title: "안개처럼 깊어지는 사랑",
        body: "당신은 마음속에서 감정을 오래 키우는 타입입니다. 상대와 실제로 가까워지기보다 혼자 상상하고 의미를 부여하는 경우가 있습니다. 감정이 깊은 만큼 상처도 혼자 크게 받을 수 있으니, 생각만 하기보다 작은 행동으로 마음을 꺼내보는 것이 좋습니다.",
        image: "/images/psych-tests/love-style/results/result-4.webp",
      },
    ],
    metaTitle: "사랑할 때 나는 어떤 사람일까? 연애 성향 심리테스트 | 유어타로",
    metaDescription:
      "좋아하는 사람 앞에서 나는 어떤 모습일까요? 1문항으로 알아보는 연애 성향 심리테스트. 태양처럼 다가가는 사랑, 달빛처럼 지켜보는 사랑, 별처럼 숨기는 사랑, 안개처럼 깊어지는 사랑 중 나의 사랑 타입을 확인해보세요.",
    metaKeywords:
      "연애 심리테스트, 사랑 심리테스트, 연애 성향 테스트, 썸 테스트, 이상형 테스트, 취향 테스트, 사랑할 때 나는 어떤 사람",
    ogTitle: "사랑할 때 나는 어떤 사람일까?",
    ogDescription: "카드처럼 드러나는 나의 진짜 연애 성향을 확인해보세요.",
    shareDescriptionTemplate:
      "나는 '{result}' 타입이래요. 당신의 연애 성향도 확인해보세요.",
    isActive: true,
    sortOrder: 1,
  },
];

export function getPsychTestBySlug(slug: string): PsychTest | undefined {
  return PSYCH_TESTS.find((t) => t.slug === slug && t.isActive);
}

export function getActivePsychTests(): PsychTest[] {
  return PSYCH_TESTS.filter((t) => t.isActive)
    .slice()
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getPsychTestResult(
  test: PsychTest,
  resultId: string,
): PsychTestResult | undefined {
  return test.results.find((r) => r.id === resultId);
}
