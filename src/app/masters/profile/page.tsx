"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { FlowScene } from "@/components/FlowScene";
import { FLOW_MASTERS } from "@/lib/flowData";
import { getMasterBackgroundSrc } from "@/lib/masterCardAssets";
import { resolveMasterDiagramSrc } from "@/lib/masterDiagrams";
import masterProfiles from "@/data/master-profiles.json";
import { withAssetBase } from "@/lib/publicPath";
import { masterProfileWith, ROUTES, tarotDrawWithMaster } from "@/lib/routes";

type ProfileDetail = {
  name: string;
  diagramSrc?: string;
  type?: string;
  gender: string;
  job: string;
  subtitle?: string;
  quote?: string;
  basicInfo?: Record<string, string>;
  styleLines?: string[];
  styleNote?: string;
  storyLines?: string[];
  readingStyleLines?: string[];
  readingStyleNote?: string;
  message?: string;
  counselNote?: string;
  tendencyLines: string[];
  worldviewLines: string[];
  tags: string[];
  recommendedUsers: string[];
};

function PageMasterProfile01Inner() {
  const searchParams = useSearchParams();
  const currentId = (searchParams?.get("master") ?? "sera").toLowerCase();
  const current = FLOW_MASTERS.find((m) => m.id === currentId) ?? FLOW_MASTERS[0];
  const profiles = masterProfiles as Record<string, ProfileDetail>;
  const detail = profiles[current.id];

  if (!detail) {
    return (
      <main className="w-full px-4 py-10 text-center text-white">
        <p className="text-sm text-white/80">프로필 데이터를 찾을 수 없습니다.</p>
        <Link href={ROUTES.tarotStart} className="mt-4 inline-block text-[#d7ccff] underline">
          마스터 목록으로
        </Link>
      </main>
    );
  }

  const diagramSrc = withAssetBase(resolveMasterDiagramSrc(current.id) || detail.diagramSrc || "");

  return (
    <main className="w-full">
      <FlowScene
        backHref={ROUTES.tarotStart}
        backgroundSrc={getMasterBackgroundSrc(current.id, 2)}
        backVariant="page03"
        backLinkClassName="ml-0"
      >
        <div className="h-[170px]" />
        <div className="pt-3 text-center text-[28px] font-semibold text-white">
          {detail.name} <span className="text-[16px] font-normal text-[#d7ccff]">{current.id.toUpperCase()}</span>
        </div>
        {detail.subtitle ? (
          <p className="mt-1 text-center text-[14px] text-[#d7ccff]">{detail.subtitle}</p>
        ) : null}

        {/* 다이어그램 */}
        <div className="mt-4 rounded-xl border border-primary bg-[rgba(7,6,22,0.8)] p-3">
          <div className="mx-auto overflow-hidden rounded-lg">
            <Image src={diagramSrc} alt={`${detail.name} 성향 다이어그램`} width={300} height={300} className="h-auto w-full" />
          </div>
        </div>

        {/* 명대사 */}
        {detail.quote ? (
          <div className="mt-4 rounded-xl border border-primary/40 bg-[rgba(7,6,22,0.8)] p-4 text-center text-[15px] italic leading-[1.8] text-[#e0d6ff] whitespace-pre-line">
            &ldquo;{detail.quote}&rdquo;
          </div>
        ) : null}

        {/* 관련 태그 */}
        {detail.tags.length > 0 ? (
          <div className="mt-4 rounded-xl border border-primary/40 bg-[rgba(7,6,22,0.8)] p-4">
            <p className="text-[14px] font-semibold text-white">관련 태그</p>
            <p className="mt-2 text-[13px] leading-[1.8] text-[#d7ccff]">{detail.tags.join("  ")}</p>
          </div>
        ) : null}

        {/* 기본 정보 */}
        {detail.basicInfo ? (
          <div className="mt-4 rounded-xl border border-primary/40 bg-[rgba(7,6,22,0.8)] p-4">
            <p className="text-[14px] font-semibold text-white">기본 정보</p>
            <div className="mt-2 space-y-1 text-[13px] text-[#d7ccff]">
              {Object.entries(detail.basicInfo).map(([key, val]) => (
                <p key={key}><span className="text-white">{key}:</span> {val}</p>
              ))}
            </div>
          </div>
        ) : null}

        {/* 스타일 & 분위기 */}
        {detail.styleLines && detail.styleLines.length > 0 ? (
          <div className="mt-4 rounded-xl border border-primary/40 bg-[rgba(7,6,22,0.8)] p-4">
            <p className="text-[14px] font-semibold text-white">스타일 & 분위기</p>
            <ul className="mt-2 space-y-1 text-[13px] text-[#d7ccff]">
              {detail.styleLines.map((line) => (
                <li key={line}>• {line}</li>
              ))}
            </ul>
            {detail.styleNote ? (
              <p className="mt-3 text-[13px] text-[#e0d6ff]">{detail.styleNote}</p>
            ) : null}
          </div>
        ) : null}

        {/* 스토리 */}
        {detail.storyLines && detail.storyLines.length > 0 ? (
          <div className="mt-4 rounded-xl border border-primary/40 bg-[rgba(7,6,22,0.8)] p-4">
            <p className="text-[14px] font-semibold text-white">{detail.name}의 스토리</p>
            <div className="mt-2 space-y-3 text-[13px] leading-[1.7] text-[#d7ccff]">
              {detail.storyLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
        ) : null}

        {/* 리딩 스타일 */}
        {detail.readingStyleLines && detail.readingStyleLines.length > 0 ? (
          <div className="mt-4 rounded-xl border border-primary/40 bg-[rgba(7,6,22,0.8)] p-4">
            <p className="text-[14px] font-semibold text-white">리딩 스타일</p>
            <ul className="mt-2 space-y-1 text-[13px] text-[#d7ccff]">
              {detail.readingStyleLines.map((line) => (
                <li key={line}>• {line}</li>
              ))}
            </ul>
            {detail.readingStyleNote ? (
              <p className="mt-3 text-[13px] text-[#e0d6ff]">{detail.readingStyleNote}</p>
            ) : null}
          </div>
        ) : null}

        {/* 메시지 */}
        {detail.message ? (
          <div className="mt-4 rounded-xl border border-primary/40 bg-[rgba(7,6,22,0.8)] p-4">
            <p className="text-[14px] font-semibold text-white">{detail.name}의 메시지</p>
            <p className="mt-2 text-[13px] leading-[1.8] text-[#d7ccff] whitespace-pre-line">{detail.message}</p>
          </div>
        ) : null}

        {/* 상담 안내 */}
        {detail.counselNote ? (
          <div className="mt-4 rounded-xl border border-primary/40 bg-[rgba(7,6,22,0.8)] p-4 text-center">
            <p className="text-[13px] leading-[1.7] text-[#d7ccff] whitespace-pre-line">{detail.counselNote}</p>
          </div>
        ) : null}

        {/* 기존 마스터용 폴백 (성향/세계관/추천) */}
        {detail.tendencyLines.length > 0 || detail.worldviewLines.length > 0 ? (
          <div className="mt-4 rounded-xl border border-primary bg-[rgba(7,6,22,0.8)] p-3">
            <div className="space-y-3 text-[13px] leading-[1.6] text-white">
              <p>✨ 이름 / 유형 / 성별 / 직업</p>
              <p className="text-[#d7ccff]">
                {detail.name} / {detail.type ?? "—"} / {detail.gender} / {detail.job}
              </p>
              <p className="pt-1">✨ 성향</p>
              <div className="space-y-2 text-[#d7ccff]">
                {detail.tendencyLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
              <p className="pt-1">✨ 세계관</p>
              <div className="space-y-2 text-[#d7ccff]">
                {detail.worldviewLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
              {detail.recommendedUsers.length > 0 ? (
                <>
                  <p className="pt-1">✨ 추천 사용자</p>
                  <ul className="space-y-1 text-[#d7ccff]">
                    {detail.recommendedUsers.map((item) => (
                      <li key={item}>✔ {item}</li>
                    ))}
                  </ul>
                </>
              ) : null}
            </div>
          </div>
        ) : null}
      </FlowScene>

      <div className="mx-auto w-full max-w-[390px] px-4 py-6">
        <Link
          href={tarotDrawWithMaster(current.id)}
          className="block rounded-xl bg-[#7B3BC7] px-4 py-3 text-center text-sm font-semibold text-white"
        >
          지금 시작하기
        </Link>

        <div className="mt-4 rounded-xl border border-primary/40 bg-[rgba(8,7,22,0.72)] p-3 text-white">
          <div className="text-[16px] font-semibold">✅ 다른 마스터 소개 보기</div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {FLOW_MASTERS.map((m) => (
              <Link
                key={m.id}
                href={masterProfileWith(m.id)}
                className={`block overflow-hidden rounded-lg ring-offset-2 ring-offset-[rgba(8,7,22,0.72)] transition-opacity hover:opacity-95 ${
                  m.id === current.id ? "ring-2 ring-[#c4a8ff]" : "ring-0"
                }`}
                aria-current={m.id === current.id ? "page" : undefined}
              >
                <Image
                  src={m.image}
                  alt={`${m.name} 소개 보기`}
                  width={96}
                  height={96}
                  className="h-auto w-full rounded-lg"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function PageMasterProfile01() {
  return (
    <Suspense fallback={null}>
      <PageMasterProfile01Inner />
    </Suspense>
  );
}
