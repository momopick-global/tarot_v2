import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo/pageMeta";

export const metadata: Metadata = pageMetadata(
  "문의하기",
  "유어타로(YourTarot) 운영팀에 문의하는 방법을 안내합니다. 이메일, 제휴 제안, 의견·피드백 전달 경로를 확인하세요.",
  "/contact",
);

const SUPPORT_EMAIL = "yourtarot.global@gmail.com";

export default function ContactPage() {
  return (
    <main className="flex-1">
      <section className="mx-auto w-full max-w-[390px] px-5 pt-8 pb-10 text-text-highlight">
        <header className="mb-6">
          <h1 className="text-xl font-semibold text-white">문의하기</h1>
          <p className="mt-2 text-sm leading-relaxed text-text-muted">
            유어타로 운영팀에 직접 닿을 수 있는 경로를 안내합니다. 서비스 이용 중 궁금한 점,
            오류 제보, 제안 등 어떤 문의든 환영합니다.
          </p>
        </header>

        <article className="space-y-6 text-sm leading-relaxed">
          <section>
            <h2 className="text-md font-semibold text-white">이메일</h2>
            <p className="mt-2 text-text-muted">
              일반 문의·서비스 이용 안내·개인정보 관련 요청 등은 아래 이메일로 보내주세요.
              영업일 기준 3~5일 이내에 회신 드리도록 노력하고 있습니다.
            </p>
            <p className="mt-3">
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="inline-flex items-center rounded-xl border border-ds-border-purple bg-surface-light px-4 py-2 font-medium text-text-purple-link transition-colors hover:bg-surface-light-hover"
              >
                {SUPPORT_EMAIL}
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-md font-semibold text-white">제휴·광고 문의</h2>
            <p className="mt-2 text-text-muted">
              브랜드 제휴, 광고 협업, 콘텐츠 라이선스 관련 문의는 아래 페이지의 양식을 통해
              남겨주세요. 운영팀이 검토 후 별도로 회신 드립니다.
            </p>
            <p className="mt-3">
              <Link
                href="/partner"
                className="inline-flex items-center rounded-xl bg-btn-primary px-4 py-2 font-semibold text-white"
              >
                제휴 문의 양식으로 이동
              </Link>
            </p>
          </section>

          <section>
            <h2 className="text-md font-semibold text-white">서비스 의견·피드백</h2>
            <p className="mt-2 text-text-muted">
              개선 아이디어, 새로운 콘텐츠 제안, 사용 중 느낀 점 등은 의견 보내기에서
              가볍게 전달해주세요. 모든 의견을 운영팀이 직접 확인합니다.
            </p>
            <p className="mt-3">
              <Link
                href="/recommended"
                className="inline-flex items-center rounded-xl border border-primary bg-surface px-4 py-2 font-semibold text-text-muted"
              >
                의견 보내기
              </Link>
            </p>
          </section>

          <section>
            <h2 className="text-md font-semibold text-white">개인정보·약관</h2>
            <p className="mt-2 text-text-muted">
              개인정보 처리·이용약관에 대한 자세한 내용은 아래 페이지를 참고해주세요.
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-text-muted">
              <li>
                <Link href="/privacy-policy" className="text-text-purple-link underline">
                  개인정보처리방침
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-text-purple-link underline">
                  이용약관
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-text-purple-link underline">
                  면책조항
                </Link>
              </li>
            </ul>
          </section>

          <section className="rounded-xl border border-ds-border bg-surface-light p-4 text-text-muted">
            <h3 className="text-sm font-semibold text-white">운영 정보</h3>
            <p className="mt-2 leading-relaxed">
              ASOG Co., Ltd.
              <br />
              Address: Hancheon-Ro, Gangbuk-Gu, Seoul, Republic of Korea
              <br />
              Business Registration Number: 370-54-00601
            </p>
          </section>
        </article>
      </section>
    </main>
  );
}
