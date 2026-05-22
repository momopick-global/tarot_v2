import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CategoryTabs } from "@/components/CategoryTabs";
import { PsychTestResultImage } from "@/components/PsychTestResultImage";
import { ShareSection } from "@/components/ShareSection";
import {
  PSYCH_TESTS,
  getPsychTestBySlug,
  getPsychTestResult,
} from "@/data/psychTests";
import { canonicalPath, pageMetadata } from "@/lib/seo/pageMeta";
import { absoluteSiteUrl } from "@/lib/siteUrl";
import { withAssetBase } from "@/lib/publicPath";

type ParamsValue = { testSlug: string; resultId: string };
type Params = Promise<ParamsValue>;

export function generateStaticParams(): ParamsValue[] {
  return PSYCH_TESTS.filter((t) => t.isActive).flatMap((t) =>
    t.results.map((r) => ({ testSlug: t.slug, resultId: r.id })),
  );
}

function buildShareDescription(template: string, resultTitle: string): string {
  return template.replace("{result}", resultTitle);
}

export async function generateMetadata({
  params,
}: Readonly<{ params: Params }>): Promise<Metadata> {
  const { testSlug, resultId } = await params;
  const test = getPsychTestBySlug(testSlug);
  if (!test) {
    return pageMetadata(
      "심리테스트 결과",
      "유어타로 심리테스트 결과 페이지입니다.",
      `/psych-tests/${testSlug}/${resultId}`,
    );
  }
  const result = getPsychTestResult(test, resultId);
  if (!result) {
    return pageMetadata(
      test.title,
      test.cardDescription,
      `/psych-tests/${test.slug}/${resultId}`,
    );
  }
  const path = `/psych-tests/${test.slug}/${result.id}`;
  const titleForTemplate = `${result.title} — ${test.title}`;
  const shareDesc = buildShareDescription(
    test.shareDescriptionTemplate,
    result.title,
  );
  const base = pageMetadata(titleForTemplate, shareDesc, path, {
    ogTitle: `${result.title} — ${test.ogTitle}`,
    ogDescription: shareDesc,
  });
  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      images: [
        {
          url: result.image,
          width: 1024,
          height: 1024,
          alt: result.title,
        },
      ],
    },
    twitter: {
      ...base.twitter,
      images: [result.image],
    },
  };
}

export default async function PsychTestResultPage({
  params,
}: Readonly<{ params: Params }>) {
  const { testSlug, resultId } = await params;
  const test = getPsychTestBySlug(testSlug);
  if (!test) notFound();
  const result = getPsychTestResult(test, resultId);
  if (!result) notFound();

  const resultPath = `/psych-tests/${test.slug}/${result.id}`;
  const shareUrl = absoluteSiteUrl(canonicalPath(resultPath));
  const shareDesc = buildShareDescription(
    test.shareDescriptionTemplate,
    result.title,
  );
  const shareImageAbs = absoluteSiteUrl(result.image);
  const resultImageSrc = withAssetBase(result.image);

  return (
    <main className="flex-1">
      <CategoryTabs />
      <section className="mx-auto w-full max-w-[390px] px-5 pt-2 pb-6">
        <div className="mb-3">
          <Link
            href={`/psych-tests/${test.slug}`}
            className="inline-flex items-center gap-1 text-sm text-text-sub hover:text-text-highlight"
            aria-label="질문으로 돌아가기"
          >
            <span aria-hidden>←</span>
            <span>{test.title}</span>
          </Link>
        </div>

        <header className="text-center">
          <p className="text-xs font-medium text-text-purple-link">{test.title}</p>
          <h1 className="mt-2 text-2xl font-semibold leading-tight text-white">
            {result.title}
          </h1>
        </header>

        <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#3b1e6e] via-[#1c0c3a] to-[#100422] shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
          <PsychTestResultImage src={resultImageSrc} alt={result.title} />
        </div>

        <div className="mt-5 rounded-2xl border border-ds-border bg-surface-light p-5">
          <p className="text-sm leading-relaxed text-text-highlight whitespace-pre-line">
            {result.body}
          </p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <Link
            href={`/psych-tests/${test.slug}`}
            className="rounded-xl border border-primary bg-surface px-4 py-3 text-center text-sm font-semibold text-text-muted"
          >
            다시 테스트하기
          </Link>
          <Link
            href="/psych-tests"
            className="rounded-xl bg-btn-primary px-4 py-3 text-center text-sm font-semibold text-white"
          >
            다른 심리테스트 보기
          </Link>
        </div>
      </section>

      <ShareSection
        title="결과 공유하기"
        shareUrl={shareUrl}
        shareTitle={result.title}
        shareDescription={shareDesc}
        shareImageUrl={shareImageAbs}
      />
    </main>
  );
}

