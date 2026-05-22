import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CategoryTabs } from "@/components/CategoryTabs";
import {
  getCategoryById,
  type TarotCategoryId,
} from "@/lib/categories";
import { pageMetadata } from "@/lib/seo/pageMeta";
import {
  TAROT_MENUS,
  getMenuBySlug,
} from "@/data/tarotMenus";

type ParamsValue = { category: string; slug: string };
type Params = Promise<ParamsValue>;

export function generateStaticParams(): ParamsValue[] {
  return TAROT_MENUS.filter((m) => m.isActive).map((m) => ({
    category: m.categoryId,
    slug: m.slug,
  }));
}

export async function generateMetadata({
  params,
}: Readonly<{ params: Params }>): Promise<Metadata> {
  const { category: categoryParam, slug } = await params;
  const category = getCategoryById(categoryParam);
  if (!category) {
    return pageMetadata(
      "타로 메뉴",
      "유어타로 타로 메뉴 상세 페이지입니다.",
      `/menu/${categoryParam}/${slug}`,
    );
  }
  const menu = getMenuBySlug(category.id as TarotCategoryId, slug);
  if (!menu) {
    return pageMetadata(
      category.name,
      category.description,
      `/menu/${categoryParam}/${slug}`,
    );
  }
  return pageMetadata(
    menu.metaTitle.replace(" | 유어타로", ""),
    menu.metaDescription,
    `/menu/${categoryParam}/${slug}`,
    {
      ogTitle: menu.shareTitle,
      ogDescription: menu.shareDescription,
    },
  );
}

/**
 * 상세/카드 선택 플로우 stub.
 * 추후 실제 readingType별 카드 선택 로직을 연결하면 됨.
 * 현재는 기존 카드 뽑기 플로우(/tarot/draw)로 진입하는 CTA만 노출.
 */
export default async function MenuDetailPage({
  params,
}: Readonly<{ params: Params }>) {
  const { category: categoryParam, slug } = await params;
  const category = getCategoryById(categoryParam);
  if (!category) notFound();

  const menu = getMenuBySlug(category.id as TarotCategoryId, slug);
  if (!menu) notFound();

  return (
    <main className="flex-1">
      <CategoryTabs />
      <section className="mx-auto w-full max-w-[390px] px-5 pt-2 pb-10">
        <div className="mb-3">
          <Link
            href={`/menu/${category.id}`}
            className="inline-flex items-center gap-1 text-sm text-text-sub hover:text-text-highlight"
            aria-label={`${category.name}으로 돌아가기`}
          >
            <span aria-hidden>←</span>
            <span>{category.name}</span>
          </Link>
        </div>

        <header>
          <h1 className="text-xl font-semibold text-white">{menu.title}</h1>
          <p className="mt-2 text-sm leading-relaxed text-text-muted">
            {menu.description}
          </p>
        </header>

        <div className="mt-6 rounded-2xl border border-ds-border-purple bg-surface-light p-5 text-center">
          <p className="text-sm leading-relaxed text-text-muted">
            곧 만나요. 지금은 기존 카드 뽑기 플로우로 안내해 드려요.
          </p>
          <Link
            href="/tarot/draw?master=sera"
            className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-xl bg-btn-primary text-sm font-semibold text-white"
          >
            {menu.ctaText}
          </Link>
        </div>
      </section>
    </main>
  );
}
