"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useCallback, type ReactNode } from "react";
import { FlowScene } from "@/components/FlowScene";
import { ResultActionButtons } from "@/components/ResultActionButtons";
import { KakaoShareButton, ShareSection } from "@/components/ShareSection";
import { clampCardIndex, getMasterCardFrontSrc } from "@/lib/masterCardAssets";
import { resolveCardReading } from "@/lib/resolveCardReading";
import { buildInterpretationText } from "@/lib/tarotResultsDb";
import { FLOW_MASTERS } from "@/lib/flowData";
import { withAssetBase } from "@/lib/publicPath";
import { trackResultView } from "@/lib/gtmEvents";
import { ROUTES, tarotDrawWithMaster, tarotResultWith } from "@/lib/routes";

const RESULT_BG = withAssetBase("/images/bg_final.png");

function formatBoldSegments(text: string): ReactNode {
  const parts = text.split(/(\*\*.+?\*\*)/g);
  return parts.map((part, i) => {
    const m = /^\*\*(.+?)\*\*$/.exec(part);
    if (m) {
      return (
        <strong key={i} className="font-semibold text-text-highlight">
          {m[1]}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

function Section({
  icon,
  title,
  children,
}: Readonly<{
  icon: string;
  title: string;
  children: ReactNode;
}>) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-2 text-md font-semibold text-white">
        <span aria-hidden>{icon}</span>
        {title}
      </div>
      <div className="rounded-xl border border-[#5c4a8a]/60 bg-[rgba(10,8,28,0.88)] px-3 py-3">
        <div className="text-sm leading-[1.65] text-text-highlight">{children}</div>
      </div>
    </div>
  );
}

function Page07ReadingResultTypeAInner() {
  const searchParams = useSearchParams();
  const params = {
    master: searchParams?.get("master") ?? undefined,
    card: searchParams?.get("card") ?? undefined,
  };
  const current =
    FLOW_MASTERS.find((m) => m.id === params.master) ?? FLOW_MASTERS[0];
  const card = params.card ?? "05";
  const cardIndex = clampCardIndex(card, 5);
  const frontCardSrc = getMasterCardFrontSrc(current.id, cardIndex);
  const reading = resolveCardReading(current.id, cardIndex);
  const cats = reading.categories as Record<string, string | undefined>;
  const interpretationText = buildInterpretationText(reading);
  const kw = reading.keywords.length ? reading.keywords.join(" · ") : "—";
  const captureRef = useRef<HTMLDivElement>(null);

  const onCapture = useCallback(async () => {
    const el = captureRef.current;
    if (!el) return;
    const html2canvas = (await import("html2canvas")).default;
    const canvas = await html2canvas(el, {
      backgroundColor: "#171828",
      scale: 2,
      useCORS: true,
    });
    const link = document.createElement("a");
    link.download = `yourtarot-${current.name}-${reading.titleEn.replace(/\s+/g, "-")}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }, [current.name, reading.titleEn]);

  useEffect(() => {
    const resultType = current.id === "sera" ? "love" : "daily";
    trackResultView(current.name, resultType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="w-full">
      <div ref={captureRef}>
      <FlowScene
        backgroundSrc={RESULT_BG}
        backgroundFit="cover"
        allowOverflow
        hideDimOverlay
      >
        <div className="relative min-h-[560px]">
          <div className="absolute left-1/2 -top-[10px] z-10 -translate-x-1/2 px-3 text-center text-xl font-semibold text-white">
            {reading.titleKo}
          </div>
          <div className="card-reveal-spin absolute left-1/2 top-[27px] z-10">
            <Image
              src={frontCardSrc}
              alt={`${reading.titleEn} 카드`}
              width={300}
              height={349}
              className="h-auto w-[300px] max-w-none shrink-0 rounded-[12px] shadow-[0_20px_48px_rgba(0,0,0,0.45)]"
              priority
            />
          </div>
          <div className="absolute bottom-[2px] left-1/2 z-10 w-full max-w-[350px] -translate-x-1/2 p-3">
            <div className="pt-3 text-center text-xl font-semibold tracking-tight text-white">
              {reading.titleEn}
            </div>
            <div className="pt-1 text-center text-sm leading-snug text-text-muted">
              {reading.cardSubtitle}
            </div>
          </div>
        </div>
      </FlowScene>

      <div className="relative z-10 -mt-[100px]">
        <section className="mx-auto w-full max-w-[350px] space-y-3 pb-2 pt-[110px]">
          <div className="space-y-[30px]">
            <Section icon="✨" title={current.id === "sera" ? "연애 운세 요약" : "오늘의 운세 요약"}>
              <p className="whitespace-pre-wrap">{formatBoldSegments(reading.summary)}</p>
            </Section>

            <Section icon="⚖️" title={current.id === "sera" ? "연애 부문별 해석" : "부문별 운세"}>
              <div className="grid grid-cols-2 gap-2">
                {current.id === "sera" ? (
                  <>
                    <p className="flex gap-2">
                      <span aria-hidden>💕</span>
                      <span>
                        <span className="font-semibold text-text-highlight">현재 연애</span>
                        <br />
                        {formatBoldSegments(cats.currentLove || cats.love || "—")}
                      </span>
                    </p>
                    <p className="flex gap-2">
                      <span aria-hidden>👫</span>
                      <span>
                        <span className="font-semibold text-text-highlight">상대방</span>
                        <br />
                        {formatBoldSegments(cats.partner || cats.relationship || "—")}
                      </span>
                    </p>
                    <p className="flex gap-2">
                      <span aria-hidden>💬</span>
                      <span>
                        <span className="font-semibold text-text-highlight">소통</span>
                        <br />
                        {formatBoldSegments(cats.communication || cats.work || "—")}
                      </span>
                    </p>
                    <p className="flex gap-2">
                      <span aria-hidden>💗</span>
                      <span>
                        <span className="font-semibold text-text-highlight">감정</span>
                        <br />
                        {formatBoldSegments(cats.emotion || cats.money || "—")}
                      </span>
                    </p>
                    <p className="flex gap-2">
                      <span aria-hidden>🧘</span>
                      <span>
                        <span className="font-semibold text-text-highlight">자기 돌봄</span>
                        <br />
                        {formatBoldSegments(cats.selfCare || cats.health || "—")}
                      </span>
                    </p>
                    <p className="flex gap-2">
                      <span aria-hidden>🌹</span>
                      <span>
                        <span className="font-semibold text-text-highlight">연애운</span>
                        <br />
                        {formatBoldSegments(cats.loveChance || cats.luck || "—")}
                      </span>
                    </p>
                  </>
                ) : (
                  <>
                    <p className="flex gap-2">
                      <span aria-hidden>💼</span>
                      <span>
                        <span className="font-semibold text-text-highlight">업무/학업</span>
                        <br />
                        {formatBoldSegments(cats.work || "—")}
                      </span>
                    </p>
                    <p className="flex gap-2">
                      <span aria-hidden>❤️</span>
                      <span>
                        <span className="font-semibold text-text-highlight">애정</span>
                        <br />
                        {formatBoldSegments(cats.love || "—")}
                      </span>
                    </p>
                    <p className="flex gap-2">
                      <span aria-hidden>💰</span>
                      <span>
                        <span className="font-semibold text-text-highlight">금전</span>
                        <br />
                        {formatBoldSegments(cats.money || "—")}
                      </span>
                    </p>
                    <p className="flex gap-2">
                      <span aria-hidden>👥</span>
                      <span>
                        <span className="font-semibold text-text-highlight">인간관계</span>
                        <br />
                        {formatBoldSegments(cats.relationship || "—")}
                      </span>
                    </p>
                    <p className="flex gap-2">
                      <span aria-hidden>🏥</span>
                      <span>
                        <span className="font-semibold text-text-highlight">건강</span>
                        <br />
                        {formatBoldSegments(cats.health || "—")}
                      </span>
                    </p>
                    <p className="flex gap-2">
                      <span aria-hidden>🍀</span>
                      <span>
                        <span className="font-semibold text-text-highlight">기회/행운</span>
                        <br />
                        {formatBoldSegments(cats.luck || "—")}
                      </span>
                    </p>
                  </>
                )}
              </div>
            </Section>

            <Section icon="💡" title="오늘의 조언">
              {reading.advice.quote ? (
                <p className="mb-3 border-b border-ds-border pb-3 font-medium leading-relaxed text-text-highlight underline decoration-[#9b7dff]/50 underline-offset-4">
                  {reading.advice.quote}
                </p>
              ) : null}
              <ul className="list-none space-y-2">
                <li>
                  <span className="font-semibold text-text-muted">행운의 아이템</span>
                  <br />
                  {reading.advice.luckyItem || "—"}
                </li>
                <li>
                  <span className="font-semibold text-text-muted">행운의 장소</span>
                  <br />
                  {reading.advice.luckyPlace || "—"}
                </li>
                <li>
                  <span className="font-semibold text-text-muted">주의할 점</span>
                  <br />
                  {reading.advice.caution || "—"}
                </li>
              </ul>
            </Section>

            <Section icon="💎" title="핵심 키워드">
              <p>{kw}</p>
            </Section>
          </div>
        </section>
      </div>
      </div>

      <div className="mx-auto w-full max-w-[350px] px-0">
          <div className="mt-6">
            <KakaoShareButton
              shareUrl={tarotResultWith(current.id, card)}
              shareTitle="유어타로 결과"
              shareDescription="당신의 운세를 확인하세요"
              shareImageUrl={frontCardSrc}
            />
          </div>

          <ResultActionButtons
            masterId={current.id}
            cardIndex={cardIndex}
            titleEn={reading.titleEn}
            titleKo={reading.titleKo}
            masterName={current.name}
            cardImagePath={frontCardSrc}
            interpretation={interpretationText}
            onSaveImage={onCapture}
          />

          <ShareSection
            shareUrl={tarotResultWith(current.id, card)}
            shareTitle="유어타로 결과"
            shareDescription="당신의 운세를 확인하세요"
            shareImageUrl={frontCardSrc}
          />

          {/* 다른 테스트하기 */}
          <div className="mt-7">
            <div className="font-semibold text-center text-white mb-4">다른 테스트하기</div>
            <div className="flex justify-center">
              {current.id !== "sera" ? (
                <Link
                  href="/tarot/draw?master=sera"
                  className="flex w-full max-w-[180px] flex-col items-center rounded-xl bg-[rgba(255,107,157,0.12)] p-3 transition-colors hover:bg-[rgba(255,107,157,0.2)]"
                >
                  <div className="relative aspect-square w-full overflow-hidden rounded-xl">
                    <Image src={FLOW_MASTERS[0].image} alt="세라" width={150} height={150} className="h-auto w-full rounded-xl" />
                  </div>
                  <span className="mt-2 text-center font-semibold text-text-pink">연애 운세</span>
                  <span className="mt-1 text-center text-text-pink-sub">세라와 함께</span>
                </Link>
              ) : (
                <Link
                  href="/tarot/draw?master=kai"
                  className="flex w-full max-w-[180px] flex-col items-center rounded-xl bg-[rgba(74,158,255,0.12)] p-3 transition-colors hover:bg-[rgba(74,158,255,0.2)]"
                >
                  <div className="relative aspect-square w-full overflow-hidden rounded-xl">
                    <Image src={FLOW_MASTERS[1].image} alt="카이" width={150} height={150} className="h-auto w-full rounded-xl" />
                  </div>
                  <span className="mt-2 text-center font-semibold text-text-blue">오늘의 운세</span>
                  <span className="mt-1 text-center text-text-blue-sub">카이와 함께</span>
                </Link>
              )}
            </div>
          </div>

          {/* 하단 네비게이션 */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <Link
              href="/masters"
              className="flex items-center gap-2 rounded-xl border border-ds-border bg-surface-light px-3 py-3 transition-colors hover:bg-surface-light-hover"
            >
              <span className="text-md">👤</span>
              <span className="font-semibold text-white">마스터 프로필</span>
            </Link>
            <Link
              href="/recommended"
              className="flex items-center gap-2 rounded-xl border border-ds-border bg-surface-light px-3 py-3 transition-colors hover:bg-surface-light-hover"
            >
              <span className="text-md">💬</span>
              <span className="font-semibold text-white">의견 보내기</span>
            </Link>
          </div>

        <div className="mx-auto w-full max-w-[350px] pb-8 pt-4">
          <Link
            href="/"
            className="block rounded-xl bg-btn-primary px-5 py-4 text-center font-semibold text-white"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function Page07ReadingResultTypeA() {
  return (
    <Suspense fallback={null}>
      <Page07ReadingResultTypeAInner />
    </Suspense>
  );
}
