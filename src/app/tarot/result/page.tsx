"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, type ReactNode } from "react";
import { FlowScene } from "@/components/FlowScene";
import { ResultActionButtons } from "@/components/ResultActionButtons";
import { clampCardIndex, getMasterCardFrontSrc } from "@/lib/masterCardAssets";
import { resolveCardReading } from "@/lib/resolveCardReading";
import { buildInterpretationText } from "@/lib/tarotResultsDb";
import { FLOW_MASTERS } from "@/lib/flowData";
import { withAssetBase } from "@/lib/publicPath";
import { copyShareUrl, shareToFacebook, shareToKakao, shareToX } from "@/lib/share";
import { ROUTES, tarotDrawWithMaster, tarotResultWith } from "@/lib/routes";

const SHARE_LINK = withAssetBase("/assets/svg-ic-share-link.svg-26940f47-d010-498b-b1e1-68303b31e59e.png");
const SHARE_KAKAO = withAssetBase("/assets/svg-ic-social-kakao.svg-20eca7d6-4d65-40b8-954f-17463d423b00.png");
const SHARE_FB = withAssetBase("/assets/svg-ic-share-facebook.svg-527221c9-1874-4fae-83ed-579ce7d4210b.png");
const SHARE_X = withAssetBase("/assets/svg-ic-share-x.svg-4ef9a083-7b44-439e-bfa4-3c305b5bf580.png");
const RESULT_BG = withAssetBase("/images/bg_final.png");

function formatBoldSegments(text: string): ReactNode {
  const parts = text.split(/(\*\*.+?\*\*)/g);
  return parts.map((part, i) => {
    const m = /^\*\*(.+?)\*\*$/.exec(part);
    if (m) {
      return (
        <strong key={i} className="font-semibold text-[#f5eeff]">
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
      <div className="mb-2 flex items-center gap-2 text-[17px] font-semibold text-white">
        <span aria-hidden>{icon}</span>
        {title}
      </div>
      <div className="rounded-xl border border-[#5c4a8a]/60 bg-[rgba(10,8,28,0.88)] px-3 py-3">
        <div className="text-[15px] leading-[1.65] text-[#e8e0ff]">{children}</div>
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
  const interpretationText = buildInterpretationText(reading);
  const kw = reading.keywords.length ? reading.keywords.join(" · ") : "—";
  const onCopy = async () => {
    const ok = await copyShareUrl();
    window.alert(ok ? "링크가 복사되었습니다." : "링크 복사에 실패했습니다.");
  };

  return (
    <main className="w-full">
      <FlowScene
        backgroundSrc={RESULT_BG}
        backgroundFit="cover"
        allowOverflow
        hideDimOverlay
      >
        <div className="relative min-h-[560px]">
          <div className="absolute left-1/2 -top-[10px] z-10 -translate-x-1/2 px-3 text-center text-[24px] font-semibold text-white">
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
            <div className="pt-3 text-center text-[24px] font-semibold tracking-tight text-white">
              {reading.titleEn}
            </div>
            <div className="pt-1 text-center text-[18px] leading-snug text-[#d4c8ff]">
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
                        <span className="font-semibold text-[#f0e8ff]">현재 연애</span>
                        <br />
                        {formatBoldSegments(reading.categories.currentLove || reading.categories.love || "—")}
                      </span>
                    </p>
                    <p className="flex gap-2">
                      <span aria-hidden>👫</span>
                      <span>
                        <span className="font-semibold text-[#f0e8ff]">상대방</span>
                        <br />
                        {formatBoldSegments(reading.categories.partner || reading.categories.relationship || "—")}
                      </span>
                    </p>
                    <p className="flex gap-2">
                      <span aria-hidden>💬</span>
                      <span>
                        <span className="font-semibold text-[#f0e8ff]">소통</span>
                        <br />
                        {formatBoldSegments(reading.categories.communication || reading.categories.work || "—")}
                      </span>
                    </p>
                    <p className="flex gap-2">
                      <span aria-hidden>💗</span>
                      <span>
                        <span className="font-semibold text-[#f0e8ff]">감정</span>
                        <br />
                        {formatBoldSegments(reading.categories.emotion || reading.categories.money || "—")}
                      </span>
                    </p>
                    <p className="flex gap-2">
                      <span aria-hidden>🧘</span>
                      <span>
                        <span className="font-semibold text-[#f0e8ff]">자기 돌봄</span>
                        <br />
                        {formatBoldSegments(reading.categories.selfCare || reading.categories.health || "—")}
                      </span>
                    </p>
                    <p className="flex gap-2">
                      <span aria-hidden>🌹</span>
                      <span>
                        <span className="font-semibold text-[#f0e8ff]">연애운</span>
                        <br />
                        {formatBoldSegments(reading.categories.loveChance || reading.categories.luck || "—")}
                      </span>
                    </p>
                  </>
                ) : (
                  <>
                    <p className="flex gap-2">
                      <span aria-hidden>💼</span>
                      <span>
                        <span className="font-semibold text-[#f0e8ff]">업무/학업</span>
                        <br />
                        {formatBoldSegments(reading.categories.work || "—")}
                      </span>
                    </p>
                    <p className="flex gap-2">
                      <span aria-hidden>❤️</span>
                      <span>
                        <span className="font-semibold text-[#f0e8ff]">애정</span>
                        <br />
                        {formatBoldSegments(reading.categories.love || "—")}
                      </span>
                    </p>
                    <p className="flex gap-2">
                      <span aria-hidden>💰</span>
                      <span>
                        <span className="font-semibold text-[#f0e8ff]">금전</span>
                        <br />
                        {formatBoldSegments(reading.categories.money || "—")}
                      </span>
                    </p>
                    <p className="flex gap-2">
                      <span aria-hidden>👥</span>
                      <span>
                        <span className="font-semibold text-[#f0e8ff]">인간관계</span>
                        <br />
                        {formatBoldSegments(reading.categories.relationship || "—")}
                      </span>
                    </p>
                    <p className="flex gap-2">
                      <span aria-hidden>🏥</span>
                      <span>
                        <span className="font-semibold text-[#f0e8ff]">건강</span>
                        <br />
                        {formatBoldSegments(reading.categories.health || "—")}
                      </span>
                    </p>
                    <p className="flex gap-2">
                      <span aria-hidden>🍀</span>
                      <span>
                        <span className="font-semibold text-[#f0e8ff]">기회/행운</span>
                        <br />
                        {formatBoldSegments(reading.categories.luck || "—")}
                      </span>
                    </p>
                  </>
                )}
              </div>
            </Section>

            <Section icon="💡" title="오늘의 조언">
              {reading.advice.quote ? (
                <p className="mb-3 border-b border-white/10 pb-3 text-[15px] font-medium leading-relaxed text-[#f2ecff] underline decoration-[#9b7dff]/50 underline-offset-4">
                  {reading.advice.quote}
                </p>
              ) : null}
              <ul className="list-none space-y-2 text-[15px]">
                <li>
                  <span className="font-semibold text-[#d8ccff]">행운의 아이템</span>
                  <br />
                  {reading.advice.luckyItem || "—"}
                </li>
                <li>
                  <span className="font-semibold text-[#d8ccff]">행운의 장소</span>
                  <br />
                  {reading.advice.luckyPlace || "—"}
                </li>
                <li>
                  <span className="font-semibold text-[#d8ccff]">주의할 점</span>
                  <br />
                  {reading.advice.caution || "—"}
                </li>
              </ul>
            </Section>

            <Section icon="💎" title="핵심 키워드">
              <p>{kw}</p>
            </Section>
          </div>

          <ResultActionButtons
            masterId={current.id}
            cardIndex={cardIndex}
            titleEn={reading.titleEn}
            titleKo={reading.titleKo}
            masterName={current.name}
            cardImagePath={frontCardSrc}
            interpretation={interpretationText}
          />

          <div className="mt-6 text-center text-[18px] text-[#d8ccff]">🧿 친구에게 공유하기</div>
          <div className="mt-3 flex justify-center gap-3">
            <button type="button" onClick={onCopy} aria-label="링크 복사" className="inline-flex">
              <Image src={SHARE_LINK} alt="" width={40} height={40} />
            </button>
            <button
              type="button"
              onClick={async () => {
                await shareToKakao({
                  title: "유어타로 결과",
                  description: "당신의 운세를 확인하세요",
                  imageUrl: frontCardSrc,
                  url: tarotResultWith(current.id, card),
                  resultUrl: tarotResultWith(current.id, card),
                  testUrl: tarotDrawWithMaster(current.id),
                });
              }}
              aria-label="카카오 공유"
              className="inline-flex"
            >
              <Image src={SHARE_KAKAO} alt="" width={40} height={40} />
            </button>
            <button
              type="button"
              onClick={() => shareToFacebook()}
              aria-label="페이스북 공유"
              className="inline-flex"
            >
              <Image src={SHARE_FB} alt="" width={40} height={40} />
            </button>
            <button type="button" onClick={() => shareToX()} aria-label="X 공유" className="inline-flex">
              <Image src={SHARE_X} alt="" width={40} height={40} />
            </button>
          </div>

          {/* 다른 마스터 해석 보기 */}
          <div className="mt-7 rounded-xl border border-primary/40 bg-[rgba(8,7,22,0.72)] p-4">
            <div className="text-[15px] font-semibold text-center text-white">다른 마스터 해석 보기</div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              {FLOW_MASTERS.filter((m) => m.id !== current.id).map((m) => (
                <Link
                  key={m.id}
                  href={tarotResultWith(m.id, card)}
                  className="flex flex-col items-center gap-2 rounded-xl bg-[rgba(255,255,255,0.03)] p-3 transition-colors hover:bg-[rgba(255,255,255,0.06)]"
                >
                  <div className="relative aspect-square w-full overflow-hidden rounded-xl">
                    <Image
                      src={m.image}
                      alt={`${m.name} 해석 보기`}
                      width={150}
                      height={150}
                      className="h-auto w-full rounded-xl"
                    />
                  </div>
                  <div className="text-center">
                    <div className="text-[14px] font-semibold text-white">{m.name}</div>
                    <div className="text-[12px] text-[#cfc4ff]">({m.type})</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* 하단 네비게이션 */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <Link
              href="/masters"
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-[rgba(255,255,255,0.03)] px-3 py-3 transition-colors hover:bg-[rgba(255,255,255,0.06)]"
            >
              <span className="text-[18px]">👤</span>
              <span className="text-[13px] font-semibold text-white">마스터 프로필</span>
            </Link>
            <Link
              href="/recommended"
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-[rgba(255,255,255,0.03)] px-3 py-3 transition-colors hover:bg-[rgba(255,255,255,0.06)]"
            >
              <span className="text-[18px]">💬</span>
              <span className="text-[13px] font-semibold text-white">의견 보내기</span>
            </Link>
          </div>
        </section>

        <div className="mx-auto w-full max-w-[350px] pb-8 pt-4">
          <Link
            href="/"
            className="block rounded-xl bg-[#7B3BC7] px-5 py-4 text-center text-[16px] font-semibold text-white"
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
