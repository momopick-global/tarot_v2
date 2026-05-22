"use client";

import Link from "next/link";
import { useState } from "react";
import { withAssetBase } from "@/lib/publicPath";

type Props = {
  href: string;
  image: string;
  title: string;
  description: string;
  /** 이미지 좌상단에 표시할 번호 (1부터). 시각 보조용으로 aria-hidden 처리 */
  number: number;
};

/**
 * 심리테스트 상세 페이지의 옵션 카드.
 * - 모바일 2x2 그리드에서 한 칸을 차지
 * - 클릭 → 결과 페이지 이동
 * - 이미지 fallback: 그라데이션 + "이미지 준비중"
 */
export function PsychTestOptionCard({ href, image, title, description, number }: Props) {
  const [imageFailed, setImageFailed] = useState(false);
  const src = withAssetBase(image);

  return (
    <Link
      href={href}
      className="group block rounded-2xl border border-white/10 bg-surface-light p-3 transition-colors hover:bg-surface-light-hover"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gradient-to-br from-[#3b1e6e] via-[#1c0c3a] to-[#100422]">
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
        {/* 번호 배지 — 시각 보조용 */}
        <span
          aria-hidden
          className="absolute left-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-black/55 text-sm font-bold text-white ring-1 ring-white/25 backdrop-blur-sm"
        >
          {number}
        </span>
        {imageFailed ? (
          <div className="absolute bottom-2 left-2 right-2 text-center">
            <span className="text-[11px] text-white/70">이미지 준비중</span>
          </div>
        ) : null}
      </div>
      <div className="pt-2">
        <h3 className="text-sm font-semibold leading-snug text-white">{title}</h3>
        <p className="mt-1 text-xs leading-relaxed text-text-muted">{description}</p>
      </div>
    </Link>
  );
}
