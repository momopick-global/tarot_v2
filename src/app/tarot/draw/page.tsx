"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import { FlowScene } from "@/components/FlowScene";
import { FLOW_MASTERS } from "@/lib/flowData";
import { getMasterBackgroundSrc, getMasterBackgroundVideoSrc, getMasterCardBackSrc } from "@/lib/masterCardAssets";
import { withAssetBase } from "@/lib/publicPath";
import { ROUTES, tarotAnalyzeWith } from "@/lib/routes";

const TOTAL_CARDS = 74;
const COLS = 4;

function Page03CardSelection1Inner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const master = (searchParams?.get("master") ?? "cassian").toLowerCase();
  const [isCardStage, setIsCardStage] = useState(false);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const current = FLOW_MASTERS.find((m) => m.id === master) ?? FLOW_MASTERS[0];

  // Shuffle card order on mount
  const [deckOrder] = useState(() => {
    const order = Array.from({ length: TOTAL_CARDS }, (_, i) => i);
    for (let i = order.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    return order;
  });

  useEffect(() => {
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
    };
  }, []);

  const cardBackUrl = getMasterCardBackSrc(current.id);
  const rows = Math.ceil(TOTAL_CARDS / COLS);

  return (
    <main className="h-[100dvh] w-full overflow-hidden">
      <FlowScene
        backHref={ROUTES.tarotStart}
        backgroundVideoSrc={isCardStage ? undefined : getMasterBackgroundVideoSrc(current.id)}
        backgroundSrc={isCardStage ? getMasterBackgroundSrc(current.id, 2) : getMasterBackgroundSrc(current.id, 1)}
        backgroundRepeatSrc={withAssetBase("/images/masters/01_Cassian/bg.png")}
        sceneClassName="h-[100dvh] min-h-[100dvh] overflow-hidden"
        contentClassName="px-0"
        backVariant="page03"
        hideDimOverlay
      >
        <div className="relative z-0 h-[calc(100dvh-68px)] min-h-0 w-full overflow-hidden">
          {/* 카드 스크롤 영역: 화면 50%부터 하단까지 */}
          {isCardStage ? (
            <div className="absolute inset-x-0 top-[55%] bottom-0 z-20 overflow-hidden"
              style={{ maskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 100%)", WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 100%)" }}
            >
              <div
                ref={scrollRef}
                className="thin-scrollbar h-full w-full overflow-y-auto overscroll-contain px-5"
                style={{ WebkitOverflowScrolling: "touch" }}
              >
                <div
                  className="mx-auto grid gap-3 py-2"
                  style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)` }}
                >
                  {deckOrder.map((cardIdx) => (
                    <button
                      key={cardIdx}
                      type="button"
                      onClick={() => {
                        if (selectedCard === cardIdx) {
                          router.push(tarotAnalyzeWith(current.id, String(cardIdx)));
                        } else {
                          setSelectedCard(cardIdx);
                        }
                      }}
                      className={`relative aspect-[2/3] w-[85%] mx-auto transition-transform duration-200 ${
                        selectedCard === cardIdx
                          ? "scale-110 z-50 ring-2 ring-[#BFA8FF]"
                          : ""
                      }`}
                      style={{
                        borderRadius: "7px",
                        border: "1px solid rgba(255, 233, 160, 0.86)",
                        backgroundImage: `
                          linear-gradient(145deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.02) 28%, rgba(0,0,0,0.2) 100%),
                          url("${cardBackUrl}")
                        `,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        boxShadow:
                          "0 4px 10px rgba(4,3,14,0.52), 0 0 0 1px rgba(255,228,142,0.22), inset 0 1px 0 rgba(255,249,214,0.35)",
                      } as CSSProperties}
                    >
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 rounded-full bg-[rgba(7,6,20,0.65)] border border-[rgba(210,186,255,0.55)] px-1.5 py-0.5 text-[8px] font-bold text-white">
                        {String(cardIdx + 1).padStart(2, "0")}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : null}

          {/* 하단 메시지 + 버튼 */}
          {!isCardStage ? (
            <div className="absolute inset-x-0 bottom-0 z-30 flex flex-col items-center px-5 pb-10">
              <div className="w-full max-w-[350px] rounded-2xl border border-[#8E63FF]/40 bg-[rgba(9,7,28,0.85)] px-5 py-4 text-center text-[15px] leading-[1.6] text-white backdrop-blur-sm">
                별들은 이미 답을 알고 있습니다.
                <br />
                이제 당신의 카드를 확인해 봅시다.
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsCardStage(true);
                }}
                className="mt-3 w-full max-w-[350px] rounded-2xl bg-[#6422AB] py-3 text-center text-[16px] font-semibold text-white"
              >
                카드받기
              </button>
            </div>
          ) : null}
        </div>
      </FlowScene>
    </main>
  );
}

export default function Page03CardSelection1() {
  return (
    <Suspense fallback={null}>
      <Page03CardSelection1Inner />
    </Suspense>
  );
}
