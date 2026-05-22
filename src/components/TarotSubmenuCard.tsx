"use client";

import Link from "next/link";
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
 * 카테고리 서브메인 페이지의 카드.
 * - 정사각형 썸네일만 라운드 처리, 글자 영역은 라운드/배경 없음
 * - 썸네일 이미지가 없거나 404일 경우 그라데이션 fallback이 그대로 노출
 *   (background-image 방식이라 깨진 이미지 아이콘 없음)
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
  return (
    <Link
      href={href}
      onClick={() =>
        trackSubmenuClick({ categoryName, menuTitle: title, menuSlug: slug })
      }
      className="group block transition-opacity hover:opacity-90"
    >
      <div
        role="img"
        aria-label={altText || title}
        className="aspect-square w-full rounded-2xl bg-gradient-to-br from-[#3b1e6e] via-[#1c0c3a] to-[#100422] bg-cover bg-center"
        style={{ backgroundImage: `url("${thumbSrc}")` }}
      />
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
