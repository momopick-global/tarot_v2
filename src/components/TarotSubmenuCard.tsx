"use client";

import Link from "next/link";
import { useState } from "react";
import { trackSubmenuClick } from "@/lib/gtmEvents";
import { withAssetBase } from "@/lib/publicPath";

type Props = {
  href: string;
  thumbnail: string;
  title: string;
  description: string;
  altText: string;
  ctaText: string;
  /** GTM 이벤트용 — 클릭 시 categoryName 로 그대로 전송 */
  categoryName: string;
  /** GTM 이벤트용 — 클릭 시 menuSlug 로 그대로 전송 */
  slug: string;
};

/**
 * 카테고리 서브메인의 카드.
 * 썸네일은 정사각형 + 라운드. 글자 영역은 라운드/배경 없음.
 *
 * 이전 구현 노트:
 *   부모 div에 `bg-gradient-to-br` + inline `style.backgroundImage`를 같이 넣으면
 *   둘 다 `background-image` 속성을 건드려 서로 덮어쓰면서, 이미지 404 시 그라데이션까지
 *   사라져 영역이 투명해 보였음. 그래서 이미지를 자식 <img>로 분리.
 */
export function TarotSubmenuCard({
  href,
  thumbnail,
  title,
  description,
  altText,
  ctaText,
  categoryName,
  slug,
}: Props) {
  const thumbSrc = withAssetBase(thumbnail);
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <Link
      href={href}
      onClick={() =>
        trackSubmenuClick({ categoryName, menuTitle: title, menuSlug: slug })
      }
      className="group block transition-opacity hover:opacity-90"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#3b1e6e] via-[#1c0c3a] to-[#100422] shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
        {!imageFailed ? (
          <img
            src={thumbSrc}
            alt={altText || title}
            loading="lazy"
            decoding="async"
            onError={() => setImageFailed(true)}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : null}

        {/* 가독성·통일감을 위한 옅은 하단 어둠 오버레이 (이미지 유무 무관) */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-transparent" />

        {/* 이미지 로드 실패 시에만 placeholder 텍스트 노출 */}
        {imageFailed ? (
          <div className="absolute bottom-3 left-3 right-3 text-center">
            <span className="text-xs text-white/70">이미지 준비중</span>
          </div>
        ) : null}
      </div>

      <div className="px-1 pt-3">
        <h3 className="text-md font-semibold text-white">{title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-text-muted">{description}</p>
        <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-text-purple-link">
          {ctaText}
          <span aria-hidden>→</span>
        </span>
      </div>
    </Link>
  );
}
