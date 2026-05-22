"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  TAROT_CATEGORIES,
  type TarotCategory,
  type TarotCategoryId,
} from "@/lib/categories";
import { trackCategoryClick } from "@/lib/gtmEvents";

const BASE =
  "shrink-0 whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-colors ";
const ACTIVE = "bg-btn-primary text-white shadow-[0_0_12px_rgba(123,59,199,0.45)]";
const INACTIVE = "bg-surface-light text-text-muted hover:bg-surface-light-hover";

/** 타로 카테고리 외의 추가 상단 메뉴(심리테스트 등). 향후 확장 시 항목만 추가. */
const EXTRA_TOP_MENU: ReadonlyArray<{ id: string; name: string; href: string }> = [
  { id: "psych-tests", name: "심리테스트", href: "/psych-tests" },
];

/**
 * 메인 상단 카테고리 탭.
 * - href가 정의된 카테고리(예: 감정의 방)는 Link로 서브메인 페이지로 이동
 * - href가 없는 카테고리는 클릭 시 active 상태만 토글 (서브메인 페이지 준비 전)
 * - 현재 경로와 href를 비교해 active를 표시 (페이지 이동 후에도 자연스럽게 유지)
 * - 끝에 EXTRA_TOP_MENU(심리테스트 등 비-타로 메뉴)도 함께 노출
 */
export function CategoryTabs() {
  const pathname = usePathname() ?? "";
  const [activeId, setActiveId] = useState<TarotCategoryId | null>(null);

  const isActive = (cat: TarotCategory): boolean => {
    if (cat.href) {
      return pathname === cat.href || pathname.startsWith(cat.href + "/");
    }
    return activeId === cat.id;
  };

  const isExtraActive = (href: string): boolean =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <nav
      aria-label="유어타로 상단 메뉴"
      className="mx-auto w-full max-w-[390px] bg-bg-content"
    >
      <div
        className="flex gap-2 overflow-x-auto px-5 py-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {TAROT_CATEGORIES.map((cat) => {
          const active = isActive(cat);
          const className = BASE + (active ? ACTIVE : INACTIVE);

          if (cat.href) {
            return (
              <Link
                key={cat.id}
                href={cat.href}
                onClick={() => trackCategoryClick(cat.name)}
                aria-current={active ? "page" : undefined}
                className={className}
              >
                {cat.name}
              </Link>
            );
          }
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                setActiveId(cat.id);
                trackCategoryClick(cat.name);
              }}
              aria-pressed={active}
              className={className}
            >
              {cat.name}
            </button>
          );
        })}

        {EXTRA_TOP_MENU.map((item) => {
          const active = isExtraActive(item.href);
          return (
            <Link
              key={item.id}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={BASE + (active ? ACTIVE : INACTIVE)}
            >
              {item.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
