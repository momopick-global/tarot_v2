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

        <div className="mb-6 rounded-2xl border border-ds-border bg-surface-light p-5 text-sm leading-relaxed text-text-muted">
          <h2 className="text-md font-semibold text-white">유어타로 심리테스트란?</h2>
          <p className="mt-2">
            연애, 관계, 마음 상태를 1~2분 안에 가볍게 들여다볼 수 있도록 만든 감성 테스트입니다.
            질문에 솔직하게 답하면 카드처럼 드러나는 나의 한 모습을 짧은 글로 받을 수 있어요.
            깊은 심리상담을 대체하기보다, 오늘의 나를 잠깐 돌아보는 거울로 사용해보세요.
          </p>
        </div>

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

        <section className="mt-10">
          <h2 className="text-md font-semibold text-white">자주 묻는 질문</h2>
          <dl className="mt-3 space-y-4 text-sm leading-relaxed text-text-muted">
            <div className="rounded-xl border border-ds-border bg-surface-light p-4">
              <dt className="font-semibold text-white">Q. 결과는 어떻게 정해지나요?</dt>
              <dd className="mt-2">
                각 질문에는 4가지 선택지가 있고, 선택한 보기에 따라 미리 설계된 결과 한 가지가
                나옵니다. 운으로 뽑히는 형식이 아니라 본인의 답을 그대로 비추는 구조입니다.
              </dd>
            </div>
            <div className="rounded-xl border border-ds-border bg-surface-light p-4">
              <dt className="font-semibold text-white">Q. 결과 페이지를 다른 사람에게 공유해도 되나요?</dt>
              <dd className="mt-2">
                네, 모든 결과 페이지에는 카카오톡·링크 복사·페이스북·X 공유 버튼이 있습니다.
                공유 시점에 카카오 SDK가 로드되며 자세한 처리는 개인정보처리방침을 참고해주세요.
              </dd>
            </div>
            <div className="rounded-xl border border-ds-border bg-surface-light p-4">
              <dt className="font-semibold text-white">Q. 무료인가요?</dt>
              <dd className="mt-2">
                네. 별도 결제 없이 누구나 이용할 수 있습니다. 운영 비용 마련을 위해 일부 페이지에는
                광고가 노출될 수 있어요.
              </dd>
            </div>
            <div className="rounded-xl border border-ds-border bg-surface-light p-4">
              <dt className="font-semibold text-white">Q. 의학적·심리학적 진단인가요?</dt>
              <dd className="mt-2">
                아니요. 유어타로 심리테스트는 자기 이해와 가벼운 위로를 돕기 위한 콘텐츠이며
                전문 상담·진단을 대체하지 않습니다. 마음의 어려움이 큰 경우 전문가와 상담을
                권장합니다.
              </dd>
            </div>
          </dl>
        </section>
      </section>
    </main>
  );
}
