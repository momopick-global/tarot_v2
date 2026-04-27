"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import { FlowScene } from "@/components/FlowScene";
import { FLOW_MASTERS } from "@/lib/flowData";
import { getMasterBackgroundSrc, getMasterBackgroundVideoSrc, getMasterBackgroundVideoPoster, getMasterCardBackSrc } from "@/lib/masterCardAssets";
import { withAssetBase } from "@/lib/publicPath";
import { ROUTES, tarotAnalyzeWith } from "@/lib/routes";

const TOTAL_CARDS = 74;
const COLS = 4;

const RANDOM_MESSAGES = [
  "직감을 믿어보세요",
  "끌리는 카드가 답입니다",
  "천천히 느껴보세요",
  "마음이 가는 카드를 선택하세요",
  "카드가 당신을 기다리고 있어요",
  "지금 떠오르는 카드를 골라보세요",
  "첫 느낌이 중요해요",
  "카드 속에 답이 있어요",
];

function spawnConfetti(x: number, y: number) {
  const colors = ["#FFD700", "#FF6B8A", "#7B3BC7", "#4FC3F7", "#69F0AE", "#FF8A65", "#E040FB"];
  const container = document.createElement("div");
  container.className = "confetti-container";
  container.style.left = `${x}px`;
  container.style.top = `${y}px`;
  document.body.appendChild(container);

  for (let i = 0; i < 36; i++) {
    const particle = document.createElement("div");
    particle.className = "confetti-particle";
    const angle = (Math.PI * 2 * i) / 36 + (Math.random() - 0.5) * 0.5;
    const distance = 80 + Math.random() * 120;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance - 30;
    const size = 6 + Math.random() * 10;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    particle.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
    particle.style.animation = `confettiPop ${0.6 + Math.random() * 0.4}s ease-out forwards`;
    particle.style.transform = `translate(${tx}px, ${ty}px) scale(0)`;
    // Use custom keyframes per particle via style
    particle.animate(
      [
        { transform: "translate(0, 0) scale(1)", opacity: 1 },
        { transform: `translate(${tx}px, ${ty}px) scale(0.3)`, opacity: 0 },
      ],
      { duration: 600 + Math.random() * 400, easing: "cubic-bezier(0,.8,.5,1)", fill: "forwards" },
    );
    container.appendChild(particle);
  }

  setTimeout(() => container.remove(), 1200);
}

function Page03CardSelection1Inner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const master = (searchParams?.get("master") ?? "sera").toLowerCase();
  const [isCardStage, setIsCardStage] = useState(false);
  const [guideLineIndex, setGuideLineIndex] = useState(0);
  const [guideTypedCount, setGuideTypedCount] = useState(0);
  const [guidePhase, setGuidePhase] = useState<"typing" | "showing" | "fading">("typing");
  const [cardImageReady, setCardImageReady] = useState(false);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [typedCount, setTypedCount] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const current = FLOW_MASTERS.find((m) => m.id === master) ?? FLOW_MASTERS[0];
  const introText = `반가워요, 저는 타로 마스터 ${current.name}예요.\n다가올 미래가 궁금하지 않나요?\n카드받기를 누르고 카드를 골라 두 번 터치해 선택해 주세요.`;

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

  // 카드 자동 스크롤 (천천히 위로)
  useEffect(() => {
    if (!isCardStage) return;
    const el = scrollRef.current;
    if (!el) return;
    let rafId: number;
    let paused = false;
    let resumeTimer: ReturnType<typeof setTimeout>;

    const step = () => {
      if (!paused && el.scrollTop < el.scrollHeight - el.clientHeight) {
        el.scrollTop += 0.3;
      }
      rafId = requestAnimationFrame(step);
    };

    // 터치/스크롤 시 일시정지 후 2초 뒤 재개
    const pause = () => {
      paused = true;
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => { paused = false; }, 2000);
    };

    el.addEventListener("touchstart", pause);
    el.addEventListener("wheel", pause);
    rafId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(resumeTimer);
      el.removeEventListener("touchstart", pause);
      el.removeEventListener("wheel", pause);
    };
  }, [isCardStage]);

  const cardBackUrl = getMasterCardBackSrc(current.id);

  // 타이핑 애니메이션
  useEffect(() => {
    if (isCardStage) return;
    if (typedCount >= introText.length) return;
    const timer = setTimeout(() => {
      setTypedCount((c) => c + 1);
    }, 50);
    return () => clearTimeout(timer);
  }, [typedCount, isCardStage, introText.length]);

  // 가이드 문구 리스트
  const guideLines = useMemo(() => {
    const fixed = [
      "카드를 위아래로 드래그해 조절하세요",
      "원하는 카드를 두 번 터치하세요",
    ];
    const shuffled = [...RANDOM_MESSAGES].sort(() => Math.random() - 0.5);
    return [...fixed, ...shuffled];
  }, []);

  // 가이드 문구 타이핑 + 사라짐 반복
  useEffect(() => {
    if (!isCardStage) return;
    const currentLine = guideLines[guideLineIndex % guideLines.length];

    if (guidePhase === "typing") {
      if (guideTypedCount >= currentLine.length) {
        const timer = setTimeout(() => setGuidePhase("showing"), 1200);
        return () => clearTimeout(timer);
      }
      const timer = setTimeout(() => setGuideTypedCount((c) => c + 1), 60);
      return () => clearTimeout(timer);
    }

    if (guidePhase === "showing") {
      const timer = setTimeout(() => setGuidePhase("fading"), 800);
      return () => clearTimeout(timer);
    }

    if (guidePhase === "fading") {
      const timer = setTimeout(() => {
        setGuideLineIndex((i) => (i + 1) % guideLines.length);
        setGuideTypedCount(0);
        setGuidePhase("typing");
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isCardStage, guidePhase, guideTypedCount, guideLineIndex, guideLines]);

  // 카드 뒷면 이미지 미리 로드
  useEffect(() => {
    const img = new window.Image();
    img.src = cardBackUrl;
    img.onload = () => setCardImageReady(true);
    if (img.complete) setCardImageReady(true);
  }, [cardBackUrl]);

  return (
    <main className="h-[100dvh] w-full overflow-hidden">
      <FlowScene
        backHref={ROUTES.tarotStart}
        backgroundVideoSrc={isCardStage ? getMasterBackgroundVideoSrc(current.id, 2) : getMasterBackgroundVideoSrc(current.id, 1)}
        backgroundVideoPoster={isCardStage ? getMasterBackgroundVideoPoster(current.id, 2) : getMasterBackgroundVideoPoster(current.id, 1)}
        backgroundVideoLoop={isCardStage}
        backgroundSrc={isCardStage ? getMasterBackgroundSrc(current.id, 2) : getMasterBackgroundSrc(current.id, 1)}
        backgroundRepeatSrc={withAssetBase("/images/masters/01_Sera/bg.png")}
        sceneClassName="h-[100dvh] min-h-[100dvh] overflow-hidden"
        contentClassName="px-0"
        backVariant="page03"
        hideDimOverlay
      >
        <div className="relative z-0 h-[calc(100dvh-68px)] min-h-0 w-full overflow-hidden">
          {/* 배경 동영상 위 불투명 블렌딩 레이어 */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-10"
            style={{
              top: "45%",
              background: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.5) 100%)",
            }}
          />
          {/* 카드 스크롤 영역: 화면 55%부터 하단까지 */}
          {isCardStage && cardImageReady ? (
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
                  {deckOrder.map((cardIdx, i) => (
                    <button
                      key={cardIdx}
                      type="button"
                      onClick={(e) => {
                        if (selectedCard === cardIdx) {
                          const rect = e.currentTarget.getBoundingClientRect();
                          spawnConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);
                          router.push(tarotAnalyzeWith(current.id, String(cardIdx)));
                        } else {
                          setSelectedCard(cardIdx);
                        }
                      }}
                      className={`card-drop-in relative aspect-[2/3] w-[85%] mx-auto transition-all duration-200 ${
                        selectedCard === cardIdx
                          ? "scale-110 z-50"
                          : ""
                      }`}
                      style={{
                        animationDelay: `${i * 30}ms`,
                        borderRadius: "7px",
                        border: selectedCard === cardIdx
                          ? "2px solid rgba(191, 168, 255, 1)"
                          : "1px solid rgba(255, 233, 160, 0.86)",
                        backgroundImage: `
                          linear-gradient(145deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.02) 28%, rgba(0,0,0,0.2) 100%),
                          url("${cardBackUrl}")
                        `,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        boxShadow: selectedCard === cardIdx
                          ? "0 0 16px rgba(191,168,255,0.7), 0 0 30px rgba(123,59,199,0.4), 0 4px 10px rgba(4,3,14,0.52)"
                          : "0 4px 10px rgba(4,3,14,0.52), 0 0 0 1px rgba(255,228,142,0.22), inset 0 1px 0 rgba(255,249,214,0.35)",
                      } as CSSProperties}
                    >
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 rounded-full bg-[rgba(7,6,20,0.65)] border border-[rgba(210,186,255,0.55)] px-1.5 py-0.5 text-sm font-bold text-white">
                        {String(cardIdx + 1).padStart(2, "0")}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : null}

          {/* 카드 안내 문구 (타이핑 + 반복) */}
          {isCardStage ? (
            <div className="pointer-events-none absolute inset-x-0 bottom-[47%] z-[15] text-center">
              <p className={`text-white/70 transition-opacity duration-500 ${guidePhase === "fading" ? "opacity-0" : "opacity-100"}`}>
                {guideLines[guideLineIndex % guideLines.length].slice(0, guideTypedCount)}
                {guidePhase === "typing" ? (
                  <span className="inline-block w-[2px] h-[1em] bg-white/60 align-middle animate-pulse ml-[1px]" />
                ) : null}
              </p>
            </div>
          ) : null}

          {/* 스크롤 가이드 애니메이션 */}
          {isCardStage ? (
            <div className="scroll-guide-overlay pointer-events-none absolute inset-x-0 top-[55%] bottom-0 z-30 flex items-center justify-center">
              <span className="scroll-guide-hand text-[88px]" role="img" aria-label="위로 스와이프">👆</span>
            </div>
          ) : null}

          {/* 하단 메시지 + 버튼 */}
          {!isCardStage ? (
            <div className="absolute inset-x-0 bottom-0 z-30 flex flex-col items-center px-5 pb-10">
              <div className="w-full max-w-[350px] rounded-2xl border border-[#8E63FF]/40 bg-surface px-5 py-4 text-center text-md leading-[1.7] text-white backdrop-blur-sm whitespace-pre-line">
                {introText.slice(0, typedCount)}
                {typedCount < introText.length ? (
                  <span className="inline-block w-[2px] h-[1em] bg-white/80 align-middle animate-pulse ml-[1px]" />
                ) : null}
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsCardStage(true);
                }}
                className="mt-3 w-full max-w-[350px] rounded-2xl bg-btn-primary py-4 text-center text-lg font-semibold text-white"
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
