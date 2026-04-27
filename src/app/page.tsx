import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HeroHeadline } from "@/components/HeroHeadline";
import { HomeHeroBackground } from "@/components/HomeHeroBackground";
import { HomeParticipantCount } from "@/components/HomeParticipantCount";
import { HomeShareSection } from "@/components/HomeShareSection";
import { FLOW_MASTERS } from "@/lib/flowData";
import { ROUTES } from "@/lib/routes";
import { canonicalPath, OG_IMAGE_PATH } from "@/lib/seo/pageMeta";

const homeOgTitle = "지금 카드가 말해 주는 오늘의 힌트 | 유어타로";
const homeOgDescription =
  "감정은 어디로 흐르고, 지금 무엇을 선택하면 좋을까요? 1분 리딩 후 바로 공유해 보세요.";

/** 루트는 title 템플릿과 중복되지 않도록 absolute 사용 */
export const metadata: Metadata = {
  title: {
    absolute: "유어타로 | 오늘의 마음과 타로 힌트",
  },
  description:
    "오늘 당신의 마음과 별의 힌트를 타로 카드로 확인하세요. 1분 안에 감정 흐름과 행동 제안을 만나볼 수 있습니다.",
  alternates: {
    canonical: canonicalPath("/"),
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "유어타로",
    title: homeOgTitle,
    description: homeOgDescription,
    url: "/",
    images: [
      {
        url: OG_IMAGE_PATH,
        width: 1200,
        height: 630,
        alt: homeOgTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: homeOgTitle,
    description: homeOgDescription,
    images: [OG_IMAGE_PATH],
  },
};


export default function Home() {
  return (
    <main className="flex-1">
      <section className="relative mx-auto h-[620px] w-full max-w-[390px] overflow-hidden">
        <HomeHeroBackground />
        <div className="absolute inset-0 z-[5] bg-[linear-gradient(180deg,rgba(8,6,25,0.12)_0%,rgba(8,6,25,0.24)_45%,rgba(8,6,25,0.72)_100%)]" />
        <div className="absolute inset-x-0 bottom-8 z-20 px-5">
          <HeroHeadline />

          <p className="mt-3 text-center text-[16px] leading-[24px] text-[#d6d2ea]">
            카드가 전하는 오늘의 감정 흐름과 행동 힌트를 1분 안에 확인해 보세요.
          </p>

        </div>
      </section>
      <section className="mx-auto w-full max-w-[390px] bg-bg-content px-5 pb-8 pt-8">
        <div className="mb-6 grid grid-cols-2 gap-4">
          <Link
            href="/tarot/draw?master=sera"
            className="flex flex-col items-center rounded-xl bg-[rgba(255,107,157,0.12)] p-3 transition-colors hover:bg-[rgba(255,107,157,0.2)]"
          >
            <span className="mb-2 text-center text-[18px] font-semibold text-[#ffd1e0]">연애 운세</span>
            <div className="relative aspect-square w-full overflow-hidden rounded-xl">
              <Image
                src={FLOW_MASTERS[0].image}
                alt="세라"
                width={200}
                height={200}
                className="h-auto w-full rounded-xl"
              />
            </div>
            <span className="mt-2 text-center text-[12px] text-[#ff9dbe]">세라와 함께</span>
            <span className="mt-1 flex items-center gap-1 text-[12px] text-[#ff9dbe]">
              <span>🔮</span>
              <span>1,284명 참여</span>
            </span>
          </Link>
          <Link
            href="/tarot/draw?master=kai"
            className="flex flex-col items-center rounded-xl bg-[rgba(74,158,255,0.12)] p-3 transition-colors hover:bg-[rgba(74,158,255,0.2)]"
          >
            <span className="mb-2 text-center text-[18px] font-semibold text-[#c8e2ff]">오늘의 운세</span>
            <div className="relative aspect-square w-full overflow-hidden rounded-xl">
              <Image
                src={FLOW_MASTERS[1].image}
                alt="카이"
                width={200}
                height={200}
                className="h-auto w-full rounded-xl"
              />
            </div>
            <span className="mt-2 text-center text-[12px] text-[#7db8ff]">카이와 함께</span>
            <span className="mt-1 flex items-center gap-1 text-[12px] text-[#7db8ff]">
              <span>✨</span>
              <span>2,517명 참여</span>
            </span>
          </Link>
        </div>
        <nav aria-label="주요 페이지로 이동" className="mt-6">
          <Link href="/masters" className="flex items-center gap-3 rounded-xl bg-[rgba(123,59,199,0.15)] px-4 py-4 transition-colors hover:bg-[rgba(123,59,199,0.25)]">
            <span className="shrink-0 text-[22px]">👤</span>
            <div>
              <div className="text-[15px] font-semibold text-white">타로 마스터 프로필 보기</div>
              <div className="text-[12px] text-[#c9b8ff]">세라와 카이의 리딩 스타일을 비교해 보세요</div>
            </div>
          </Link>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <Link href="/about" className="rounded-xl border border-white/10 bg-[rgba(255,255,255,0.03)] px-4 py-4 text-center transition-colors hover:bg-[rgba(255,255,255,0.06)]">
              <div className="text-[20px]">✨</div>
              <div className="mt-1 text-[13px] font-semibold text-white">서비스 소개</div>
            </Link>
            <Link href="/recommended" className="rounded-xl border border-white/10 bg-[rgba(255,255,255,0.03)] px-4 py-4 text-center transition-colors hover:bg-[rgba(255,255,255,0.06)]">
              <div className="text-[20px]">💬</div>
              <div className="mt-1 text-[13px] font-semibold text-white">의견 보내기</div>
            </Link>
          </div>
        </nav>
      </section>
      <section className="mx-auto w-full max-w-[390px] bg-bg-content px-5 pb-8">
        <h2 className="page-title">인기 블로그 글</h2>
        <div className="mt-4 flex flex-col gap-3">
          <Link href="/blog/attachment-anxiety-in-love/" className="block rounded-xl border border-white/10 bg-[rgba(255,255,255,0.03)] p-4 transition-colors hover:bg-[rgba(255,255,255,0.06)]">
            <div className="text-[15px] font-semibold text-white">불안형 애착이 연애에 미치는 영향</div>
            <p className="mt-1 text-[13px] text-[#d7ccff]">확인 욕구와 거리감에 민감한 패턴을 이해하고 다루는 법</p>
          </Link>
          <Link href="/blog/love-failure-pattern/" className="block rounded-xl border border-white/10 bg-[rgba(255,255,255,0.03)] p-4 transition-colors hover:bg-[rgba(255,255,255,0.06)]">
            <div className="text-[15px] font-semibold text-white">연애가 항상 실패하는 이유</div>
            <p className="mt-1 text-[13px] text-[#d7ccff]">연애 패턴이 반복되는 이유를 심리적으로 분석합니다</p>
          </Link>
          <Link href="/blog/tarot-daily-one-card-meaning/" className="block rounded-xl border border-white/10 bg-[rgba(255,255,255,0.03)] p-4 transition-colors hover:bg-[rgba(255,255,255,0.06)]">
            <div className="text-[15px] font-semibold text-white">오늘의 타로 한 장, 어떻게 읽으면 좋을까</div>
            <p className="mt-1 text-[13px] text-[#d7ccff]">질문과 맥락으로 읽는 방법을 단계별로 설명합니다</p>
          </Link>
          <Link href="/blog/psychology-attachment-styles-love/" className="block rounded-xl border border-white/10 bg-[rgba(255,255,255,0.03)] p-4 transition-colors hover:bg-[rgba(255,255,255,0.06)]">
            <div className="text-[15px] font-semibold text-white">애착 유형은 연애에서 어떻게 드러날까</div>
            <p className="mt-1 text-[13px] text-[#d7ccff]">불안·회피·안정적 패턴이 관계 습관에 미치는 영향</p>
          </Link>
          <Link href="/blog/" className="mt-1 block text-center text-[13px] text-[#8E63FF] hover:text-[#BFA8FF]">
            블로그 전체 보기 →
          </Link>
        </div>
      </section>
      <section className="mx-auto w-full max-w-[390px] bg-bg-content px-5 pb-8">
        <h2 className="page-title">자주 묻는 질문</h2>
        <div className="mt-4 flex flex-col">
          <Link href="/faq/" className="flex items-center justify-between border-b border-white/10 py-3 text-[14px] text-white hover:text-[#d8ccff]">
            <span>타로는 무엇인가요?</span>
            <span className="text-[#999]">›</span>
          </Link>
          <Link href="/faq/" className="flex items-center justify-between border-b border-white/10 py-3 text-[14px] text-white hover:text-[#d8ccff]">
            <span>타로는 정말 미래를 맞추나요?</span>
            <span className="text-[#999]">›</span>
          </Link>
          <Link href="/faq/" className="flex items-center justify-between border-b border-white/10 py-3 text-[14px] text-white hover:text-[#d8ccff]">
            <span>타로 결과는 왜 사람마다 다른가요?</span>
            <span className="text-[#999]">›</span>
          </Link>
          <Link href="/faq/" className="flex items-center justify-between border-b border-white/10 py-3 text-[14px] text-white hover:text-[#d8ccff]">
            <span>타로는 과학인가요?</span>
            <span className="text-[#999]">›</span>
          </Link>
          <Link href="/faq/" className="flex items-center justify-between border-b border-white/10 py-3 text-[14px] text-white hover:text-[#d8ccff]">
            <span>타로를 믿어도 되나요?</span>
            <span className="text-[#999]">›</span>
          </Link>
          <Link href="/faq/" className="flex items-center justify-between border-b border-white/10 py-3 text-[14px] text-white hover:text-[#d8ccff]">
            <span>타로는 초보자도 사용할 수 있나요?</span>
            <span className="text-[#999]">›</span>
          </Link>
          <Link href="/faq/" className="mt-2 block text-center text-[13px] text-[#8E63FF] hover:text-[#BFA8FF]">
            질문 더 보기 →
          </Link>
        </div>
      </section>
      <HomeShareSection />
    </main>
  );
}
