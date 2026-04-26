import { getMasterThumbSrc } from "./masterCardAssets";

export type Master = {
  id: string;
  name: string;
  type: string;
  desc: string;
  image: string;
  profileTitle: string;
  profileSummary: string;
  specialty: string;
  keywords: string[];
};

export const FLOW_MASTERS: Master[] = [
  {
    id: "sera",
    name: "세라",
    type: "분석형",
    desc: "별의 움직임과 타로를 함께 분석하는 논리적 리더",
    image: getMasterThumbSrc("sera"),
    profileTitle: "천문학자 / 분석형",
    profileSummary: "냉철한 분석과 논리적인 설명으로 복잡한 선택지를 또렷하게 정리합니다.",
    specialty: "커리어, 진로, 관계의 균형",
    keywords: ["문제 정의", "선택", "균형", "실행"],
  },
  {
    id: "kai",
    name: "카이",
    type: "상담형",
    desc: "현실 공감과 따뜻한 말로 방향을 제시하는 조언가",
    image: getMasterThumbSrc("kai"),
    profileTitle: "상담가 / 공감형",
    profileSummary: "감정을 세심하게 듣고, 지금 당장 실천 가능한 조언을 전합니다.",
    specialty: "관계 회복, 자존감, 일상 루틴",
    keywords: ["공감", "회복", "실천", "안정"],
  },
];

export const CARD_RESULT = {
  titleEn: "Three of Swords",
  titleKo: "세 검",
  summary: "중요한 감정의 결정을 앞둔 시기입니다.",
  love: "관계에서 진실한 대화가 필요한 날입니다.",
  career: "감정이 아닌 데이터 중심 판단이 유리합니다.",
  money: "불필요한 지출을 줄이고 계획 소비가 필요합니다.",
};

const CARD_RESULT_POOL = [
  {
    titleEn: "Three of Swords",
    titleKo: "세 검",
    summary: "중요한 감정의 결정을 앞둔 시기입니다.",
    love: "관계에서 진실한 대화가 필요한 날입니다.",
    career: "감정이 아닌 데이터 중심 판단이 유리합니다.",
    money: "불필요한 지출을 줄이고 계획 소비가 필요합니다.",
  },
  {
    titleEn: "The Star",
    titleKo: "별",
    summary: "기대하던 방향이 조금씩 선명해지는 흐름입니다.",
    love: "조급함을 내려놓을수록 관계의 온도가 회복됩니다.",
    career: "장기 계획을 세우면 성과의 안정성이 높아집니다.",
    money: "작은 절약 습관이 큰 차이를 만드는 시기입니다.",
  },
  {
    titleEn: "The Chariot",
    titleKo: "전차",
    summary: "흔들리던 이슈에 추진력이 생기는 타이밍입니다.",
    love: "표현을 미루지 말고 핵심 감정을 먼저 전해보세요.",
    career: "속도와 집중이 성과를 당겨옵니다.",
    money: "목표를 정한 뒤 지출 우선순위를 조정하세요.",
  },
  {
    titleEn: "The Hermit",
    titleKo: "은둔자",
    summary: "외부 소음보다 내 기준을 세우는 것이 중요합니다.",
    love: "잠시 거리를 두고 감정을 정리하면 오해가 줄어듭니다.",
    career: "혼자 깊게 파는 시간이 실력 차이를 만듭니다.",
    money: "충동 소비를 줄이고 필요한 것만 남기세요.",
  },
];

export function getCardResultById(cardId: string) {
  const n = Number.parseInt(cardId, 10);
  if (Number.isNaN(n)) return CARD_RESULT_POOL[0];
  return CARD_RESULT_POOL[n % CARD_RESULT_POOL.length];
}

