import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CategoryTabs } from "@/components/CategoryTabs";
import { PsychTestOptionCard } from "@/components/PsychTestOptionCard";
import {
  PSYCH_TESTS,
  getPsychTestBySlug,
} from "@/data/psychTests";
import { canonicalPath, pageMetadata } from "@/lib/seo/pageMeta";
import { absoluteSiteUrl } from "@/lib/siteUrl";

type ParamsValue = { testSlug: string };
type Params = Promise<ParamsValue>;

export function generateStaticParams(): ParamsValue[] {
  return PSYCH_TESTS.filter((t) => t.isActive).map((t) => ({ testSlug: t.slug }));
}

export async function generateMetadata({
  params,
}: Readonly<{ params: Params }>): Promise<Metadata> {
  const { testSlug } = await params;
  const test = getPsychTestBySlug(testSlug);
  if (!test) {
    return pageMetadata(
      "심리테스트",
      "유어타로 심리테스트 페이지입니다.",
      `/psych-tests/${testSlug}`,
    );
  }
  const path = `/psych-tests/${test.slug}`;
  // pageMetadata가 자동으로 title 템플릿을 붙이므로 metaTitle에서 " | 유어타로" 제거
  const rawTitle = test.metaTitle.replace(/\s*\|\s*유어타로\s*$/, "");
  const base = pageMetadata(rawTitle, test.metaDescription, path, {
    ogTitle: test.ogTitle,
    ogDescription: test.ogDescription,
  });
  // og:image / twitter:image / keywords 를 테스트별 값으로 덮어쓰기
  return {
    ...base,
    keywords: test.metaKeywords,
    openGraph: {
      ...base.openGraph,
      images: [
        {
          url: test.ogImage,
          width: 1200,
          height: 630,
          alt: test.ogTitle,
        },
      ],
    },
    twitter: {
      ...base.twitter,
      images: [test.ogImage],
    },
  };
}

export default async function PsychTestDetailPage({
  params,
}: Readonly<{ params: Params }>) {
  const { testSlug } = await params;
  const test = getPsychTestBySlug(testSlug);
  if (!test) notFound();

  const detailUrl = absoluteSiteUrl(canonicalPath(`/psych-tests/${test.slug}`));
  const ogImageAbs = absoluteSiteUrl(test.ogImage);

  /** Quiz 구조화 데이터 (Schema.org) */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    name: test.title,
    description: test.subtitle,
    url: detailUrl,
    image: ogImageAbs,
    about: { "@type": "Thing", name: "연애 심리테스트" },
    publisher: {
      "@type": "Organization",
      name: "유어타로",
      url: absoluteSiteUrl(canonicalPath("/")),
    },
    mainEntity: {
      "@type": "Question",
      name: test.question,
      text: test.questionDescription,
      suggestedAnswer: test.options.map((opt) => ({
        "@type": "Answer",
        text: opt.title,
      })),
    },
  };

  return (
    <main className="flex-1">
      <CategoryTabs />
      <section className="mx-auto w-full max-w-[390px] px-5 pt-2 pb-10">
        <div className="mb-3">
          <Link
            href="/psych-tests"
            className="inline-flex items-center gap-1 text-sm text-text-sub hover:text-text-highlight"
            aria-label="심리테스트 목록으로"
          >
            <span aria-hidden>←</span>
            <span>심리테스트</span>
          </Link>
        </div>

        <header className="mb-6">
          <h1 className="text-xl font-semibold text-white">{test.title}</h1>
          <p className="mt-2 text-sm leading-relaxed text-text-muted">
            {test.subtitle}
          </p>
        </header>

        <div className="rounded-2xl border border-ds-border-purple bg-surface-light p-5">
          <h2 className="text-md font-semibold leading-relaxed text-white">
            {test.question}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-text-muted whitespace-pre-line">
            {test.questionDescription}
          </p>
        </div>

        <ul className="mt-6 grid grid-cols-2 gap-3">
          {test.options.map((opt, i) => (
            <li key={opt.id}>
              <PsychTestOptionCard
                href={`/psych-tests/${test.slug}/${opt.resultId}`}
                image={opt.image}
                title={opt.title}
                description={opt.description}
                number={i + 1}
              />
            </li>
          ))}
        </ul>
      </section>

      {/* JSON-LD Quiz 구조화 데이터 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
