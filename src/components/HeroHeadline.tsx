"use client";

import { useEffect, useState } from "react";

const HEADLINES = [
  ["오늘 당신의 마음은", "어떤 별을 품고 있나요?"],
  ["지금 당신에게 필요한", "카드의 메시지는?"],
  ["오늘 하루를 바꿀", "한 장의 카드가 기다립니다"],
  ["마음속 질문에", "카드가 답해드립니다"],
  ["지금 이 순간", "당신의 운명은 어디를 향하나요?"],
  ["카드 한 장에 담긴", "오늘의 이야기를 만나보세요"],
  ["당신이 알고 싶은 답", "카드가 먼저 알고 있어요"],
  ["오늘의 감정 흐름을", "카드로 확인해 보세요"],
  ["지금 떠오르는 고민", "카드에게 물어보세요"],
  ["당신의 선택을 도울", "타로 한 장을 뽑아보세요"],
];

const DEFAULT = HEADLINES[0];

export function HeroHeadline() {
  const [headline, setHeadline] = useState(DEFAULT);

  useEffect(() => {
    setHeadline(HEADLINES[Math.floor(Math.random() * HEADLINES.length)]);
  }, []);

  return (
    <h1 className="text-center text-[24px] font-semibold leading-[34px] text-neutral-10">
      {headline[0]}
      <br />
      {headline[1]}
    </h1>
  );
}
