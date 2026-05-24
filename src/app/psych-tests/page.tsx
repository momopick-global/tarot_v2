import type { Metadata } from "next";
import { CategoryTabs } from "@/components/CategoryTabs";
import { PsychTestListCard } from "@/components/PsychTestListCard";
import { PsychTestListViewTracker } from "@/components/PsychTestListViewTracker";
import { getActivePsychTests } from "@/data/psychTests";
import { pageMetadata } from "@/lib/seo/pageMeta";

export const metadata: Metadata = pageMetadata(
  "심리테스트",
  "타로처럼 내 마음을 비춰보는 짧은 심리테스트를 만나보세요. 연애, 썸, 이상형, 취향을 주제로 한 감성 심리테스트를 제공합니다.",
  "/psych-tests",
);

export default function PsychTestsListPage() {
  const tests = getActivePsychTests();

  return (
    <main className="flex-1">
      <CategoryTabs />
      <PsychTestListViewTracker />
      <section className="mx-auto w-full max-w-[390px] px-5 pt-2 pb-10">
        <header className="mb-6">
          <h1 className="text-xl font-semibold text-white">심리테스트</h1>
          <p className="mt-2 text-sm leading-relaxed text-text-muted">
            타로처럼 내 마음을 비춰보는 짧은 심리테스트를 만나보세요.
          </p>
        </header>

        {tests.length > 0 ? (
          <ul className="grid grid-cols-1 gap-6">
            {tests.map((test) => (
              <li key={test.slug}>
                <PsychTestListCard
                  href={`/psych-tests/${test.slug}`}
                  thumbnail={test.thumbnail}
                  title={test.title}
                  description={test.cardDescription}
                  testSlug={test.slug}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="rounded-xl border border-ds-border bg-surface-light px-4 py-6 text-center text-sm text-text-muted">
            곧 새로운 심리테스트가 열릴 거예요.
          </p>
        )}
      </section>
    </main>
  );
}
