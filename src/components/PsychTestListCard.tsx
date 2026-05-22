"use client";

import Link from "next/link";
import { useState } from "react";
import { withAssetBase } from "@/lib/publicPath";

type Props = {
  href: string;
  thumbnail: string;
  title: string;
  description: string;
};

/**
 * 심리테스트 목록 카드.
 * - 이미지 정사각형 라운드, 파일이 없으면 그라데이션 fallback 노출
 * - 시각 노출 제목/설명 + 우측 CTA 화살표
 */
export function PsychTestListCard({ href, thumbnail, title, description }: Props) {
  const [imageFailed, setImageFailed] = useState(false);
  const src = withAssetBase(thumbnail);

  return (
    <Link
      href={href}
      className="group block transition-opacity hover:opacity-90"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#3b1e6e] via-[#1c0c3a] to-[#100422] shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
        {!imageFailed ? (
          <img
            src={src}
            alt={title}
            loading="lazy"
            decoding="async"
            onError={() => setImageFailed(true)}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : null}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-transparent" />
        {imageFailed ? (
          <div className="absolute bottom-3 left-3 right-3 text-center">
            <span className="text-xs text-white/70">이미지 준비중</span>
          </div>
        ) : null}
      </div>

      <div className="px-1 pt-3">
        <h2 className="text-md font-semibold text-white">{title}</h2>
        <p className="mt-1 text-sm leading-relaxed text-text-muted">{description}</p>
        <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-text-purple-link">
          테스트 시작하기
          <span aria-hidden>→</span>
        </span>
      </div>
    </Link>
  );
}
