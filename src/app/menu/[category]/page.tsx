import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CategoryTabs } from "@/components/CategoryTabs";
import { TarotSubmenuCard } from "@/components/TarotSubmenuCard";
import {
  TAROT_CATEGORIES,
  type TarotCategoryId,
  getCategoryById,
} from "@/lib/categories";
import { pageMetadata } from "@/lib/seo/pageMeta";
import { getMenusByCategory } from "@/data/tarotMenus";

type ParamsValue = { category: string };
type Params = Promise<ParamsValue>;

export function generateStaticParams(): ParamsValue[] {
  return TAROT_CATEGORIES.map((c) => ({ category: c.id }));
}

export async function generateMetadata({
  params,
}: Readonly<{ params: Params }>): Promise<Metadata> {
  const { category: categoryParam } = await params;
  const category = getCategoryById(categoryParam);
  if (!category) {
    return pageMetadata("타로 메뉴", "유어타로 타로 메뉴 페이지입니다.", `/menu/${categoryParam}`);
  }
  return pageMetadata(category.name, category.description, `/menu/${category.id}`);
}

export default async function CategoryMenuPage({
  params,
}: Readonly<{ params: Params }>) {
  const { category: categoryParam } = await params;
  const category = getCategoryById(categoryParam);
  if (!category) notFound();

  const menus = getMenusByCategory(category.id as TarotCategoryId);

  return (
    <main className="flex-1">
      <CategoryTabs />
      <section className="mx-auto w-full max-w-[390px] px-5 pt-2 pb-10">
        <header className="mb-6">
          <div className="mb-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-sm text-text-sub hover:text-text-highlight"
              aria-label="홈으로 이동"
            >
              <span aria-hidden>←</span>
              <span>홈</span>
            </Link>
          </div>
          <h1 className="text-xl font-semibold text-white">{category.name}</h1>
          <p className="mt-2 text-sm leading-relaxed text-text-muted">
            {category.description}
          </p>
        </header>

        {menus.length > 0 ? (
          <ul className="grid grid-cols-1 gap-6">
            {menus.map((item) => (
              <li key={item.slug}>
                <TarotSubmenuCard
                  href={`/menu/${category.id}/${item.slug}`}
                  thumbnail={item.thumbnail}
                  title={item.title}
                  description={item.description}
                  altText={item.altText}
                  ctaText={item.ctaText}
                  categoryName={item.categoryName}
                  slug={item.slug}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="rounded-xl border border-ds-border bg-surface-light px-4 py-6 text-center text-sm text-text-muted">
            곧 새로운 카드가 열릴 거예요.
          </p>
        )}
      </section>
    </main>
  );
}
