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
        <Link href={ROUTES.tarotStart} className="mt-4 inline-block text-text-muted underline">
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
        <div className="pt-3 text-center text-3xl font-semibold text-white">
          {detail.name} <span className="font-normal text-text-muted">{current.id.toUpperCase()}</span>
        </div>
        {detail.subtitle ? (
          <p className="mt-1 text-center text-text-muted">{detail.subtitle}</p>
        ) : null}

        {/* 다이어그램 */}
        <div className="mt-4 rounded-xl border border-primary bg-surface p-3">
          <div className="mx-auto overflow-hidden rounded-lg">
            <Image src={diagramSrc} alt={`${detail.name} 성향 다이어그램`} width={300} height={300} className="h-auto w-full" />
          </div>
        </div>

        {/* 명대사 */}
        {detail.quote ? (
          <div className="mt-4 rounded-xl border border-ds-border-purple bg-surface p-4 text-center italic leading-[1.8] text-text-lavender whitespace-pre-line">
            &ldquo;{detail.quote}&rdquo;
          </div>
        ) : null}

        {/* 관련 태그 */}
        {detail.tags.length > 0 ? (
          <div className="mt-4 rounded-xl border border-ds-border-purple bg-surface p-4">
            <p className="font-semibold text-white">관련 태그</p>
            <p className="mt-2 leading-[1.8] text-text-muted">{detail.tags.join("  ")}</p>
          </div>
        ) : null}

        {/* 기본 정보 */}
        {detail.basicInfo ? (
          <div className="mt-4 rounded-xl border border-ds-border-purple bg-surface p-4">
            <p className="font-semibold text-white">기본 정보</p>
            <div className="mt-2 space-y-1 text-text-muted">
              {Object.entries(detail.basicInfo).map(([key, val]) => (
                <p key={key}><span className="text-white">{key}:</span> {val}</p>
              ))}
            </div>
          </div>
        ) : null}

        {/* 스타일 & 분위기 */}
        {detail.styleLines && detail.styleLines.length > 0 ? (
          <div className="mt-4 rounded-xl border border-ds-border-purple bg-surface p-4">
            <p className="font-semibold text-white">스타일 & 분위기</p>
            <ul className="mt-2 space-y-1 text-text-muted">
              {detail.styleLines.map((line) => (
                <li key={line}>• {line}</li>
              ))}
            </ul>
            {detail.styleNote ? (
              <p className="mt-3 text-text-lavender">{detail.styleNote}</p>
            ) : null}
          </div>
        ) : null}

        {/* 스토리 */}
        {detail.storyLines && detail.storyLines.length > 0 ? (
          <div className="mt-4 rounded-xl border border-ds-border-purple bg-surface p-4">
            <p className="font-semibold text-white">{detail.name}의 스토리</p>
            <div className="mt-2 space-y-3 leading-[1.7] text-text-muted">
              {detail.storyLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
        ) : null}

        {/* 리딩 스타일 */}
        {detail.readingStyleLines && detail.readingStyleLines.length > 0 ? (
          <div className="mt-4 rounded-xl border border-ds-border-purple bg-surface p-4">
            <p className="font-semibold text-white">리딩 스타일</p>
            <ul className="mt-2 space-y-1 text-text-muted">
              {detail.readingStyleLines.map((line) => (
                <li key={line}>• {line}</li>
              ))}
            </ul>
            {detail.readingStyleNote ? (
              <p className="mt-3 text-text-lavender">{detail.readingStyleNote}</p>
            ) : null}
          </div>
        ) : null}

        {/* 메시지 */}
        {detail.message ? (
          <div className="mt-4 rounded-xl border border-ds-border-purple bg-surface p-4">
            <p className="font-semibold text-white">{detail.name}의 메시지</p>
            <p className="mt-2 leading-[1.8] text-text-muted whitespace-pre-line">{detail.message}</p>
          </div>
        ) : null}

        {/* 상담 안내 + 시작 버튼 */}
        {detail.counselNote ? (
          <div className="mt-4 rounded-xl border border-ds-border-purple bg-surface p-4 text-center">
            <p className="leading-[1.7] text-text-muted whitespace-pre-line">{detail.counselNote}</p>
          </div>
        ) : null}
        <Link
          href={tarotDrawWithMaster(current.id)}
          className="mt-4 mb-8 block rounded-xl bg-btn-primary px-5 py-4 text-center text-md font-semibold text-white"
        >
          지금 시작하기
        </Link>

        <div className="mt-6 mb-6 rounded-xl border border-ds-border-purple bg-surface p-4 text-white">
          <div className="font-semibold text-center">다른 마스터 소개 보기</div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {FLOW_MASTERS.filter((m) => m.id !== current.id).map((m) => (
              <Link
                key={m.id}
                href={masterProfileWith(m.id)}
                className="flex flex-col items-center gap-2 rounded-xl bg-surface-light p-3 transition-colors hover:bg-surface-light-hover"
              >
                <div className="relative aspect-square w-full overflow-hidden rounded-xl">
                  <Image
                    src={m.image}
                    alt={`${m.name} 소개 보기`}
                    width={150}
                    height={150}
                    className="h-auto w-full rounded-xl"
                  />
                </div>
                <div className="text-center">
                  <div className="font-semibold">{m.name}</div>
                  <div className="text-text-muted">({m.type})</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* 기존 마스터용 폴백 (성향/세계관/추천) */}
        {detail.tendencyLines.length > 0 || detail.worldviewLines.length > 0 ? (
          <div className="mt-4 rounded-xl border border-primary bg-surface p-3">
            <div className="space-y-3 leading-[1.6] text-white">
              <p>✨ 이름 / 유형 / 성별 / 직업</p>
              <p className="text-text-muted">
                {detail.name} / {detail.type ?? "—"} / {detail.gender} / {detail.job}
              </p>
              <p className="pt-1">✨ 성향</p>
              <div className="space-y-2 text-text-muted">
                {detail.tendencyLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
              <p className="pt-1">✨ 세계관</p>
              <div className="space-y-2 text-text-muted">
                {detail.worldviewLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
              {detail.recommendedUsers.length > 0 ? (
                <>
                  <p className="pt-1">✨ 추천 사용자</p>
                  <ul className="space-y-1 text-text-muted">
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
