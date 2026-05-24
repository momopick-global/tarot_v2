import type { Metadata } from "next";
import { MarkdownArticle } from "@/components/MarkdownArticle";
import { PRIVACY_POLICY_MARKDOWN } from "@/data/policies";
import { pageMetadata } from "@/lib/seo/pageMeta";

export const metadata: Metadata = pageMetadata(
  "개인정보처리방침",
  "유어타로 개인정보처리방침입니다. 쿠키, Google Analytics, Google AdSense, Kakao 공유 등 제3자 서비스의 정보 처리 및 이용자 권리를 안내합니다.",
  "/privacy-policy",
);

/**
 * /personal 과 동일한 정책 본문을 노출합니다. 두 경로 모두 유효하며,
 * /privacy-policy 는 AdSense 검토자가 표준적으로 기대하는 영문 슬러그 경로입니다.
 */
export default function PrivacyPolicyPage() {
  return (
    <main className="flex-1">
      <section className="mx-auto w-full max-w-[390px] px-5 pt-8 pb-6">
        <MarkdownArticle markdown={PRIVACY_POLICY_MARKDOWN} />
      </section>
    </main>
  );
}
