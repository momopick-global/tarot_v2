# Metadata · Open Graph · Twitter Card

## 진원지

- 헬퍼: `src/lib/seo/pageMeta.ts`
- 사이트 URL: `src/lib/siteUrl.ts`

## pageMetadata 사용

```ts
import { pageMetadata } from "@/lib/seo/pageMeta";

export const metadata: Metadata = pageMetadata(
  title,             // 예: "감정의 방"
  description,       // 페이지 본문 1~2줄 요약
  pathname,          // 예: "/menu/emotion" (trailingSlash 자동 부착)
  { ogTitle, ogDescription }  // optional — 클릭 유도 문구
);
```

## 자동 생성되는 항목

- `<title>{title}</title>` (루트 layout 의 title.template `%s | 유어타로`)
- `<meta name="description">`
- `<link rel="canonical" href="https://yourtarot.cc{path}/" />`
- `<meta property="og:type" content="website">`
- `<meta property="og:locale" content="ko_KR">`
- `<meta property="og:site_name" content="유어타로">`
- `<meta property="og:title">`, `og:description`, `og:url`
- `<meta property="og:image">` (기본 `/og/yourtarot_og_kr2.png`)
- `<meta name="twitter:card" content="summary_large_image">`
- `<meta name="twitter:title/description/image">`

## 페이지별 OG 이미지 override

`pageMetadata` 결과를 spread + 덮어쓰기:

```ts
const base = pageMetadata(title, description, path, { ogTitle, ogDescription });
return {
  ...base,
  keywords: customKeywords,
  openGraph: {
    ...base.openGraph,
    images: [{ url: customOgImage, width: 1200, height: 630, alt: ogTitle }],
  },
  twitter: { ...base.twitter, images: [customOgImage] },
};
```

예시: `src/app/psych-tests/[testSlug]/page.tsx`

## canonical 규칙

- 호스트: 항상 `https://yourtarot.cc`
- 트레일링 슬래시: 있음 (`next.config.ts: trailingSlash: true`)
- 쿼리스트링: 포함하지 않음 (정적 export 페이지 단위)

## OG 이미지 분리 전략 (블로그)

- 본문/카드 썸네일: `webp` 권장
- og:image: `jpg/png` 권장 (Kakao·일부 SNS 호환)
- 경로 우선순위 (`scripts/generate-blog.js` `resolveOgImage`):
  1. JSON의 `post.ogImage` 명시
  2. `/images/og/blog/{slug}.{jpg|png|webp}` 자동 탐색
  3. `/images/blog/{slug}.{webp|jpg|png}` 인라인 썸네일 재사용
  4. `/images/blog/blog-default-thumb.webp` 기본 이미지

## JSON-LD 구조화 데이터

- 블로그 글: `Article` + `FAQPage`
- 심리테스트 상세: `Quiz` (`mainEntity` = Question)
- 카테고리 목록: `CollectionPage`
- 메인 (root layout): `WebSite` (`src/components/WebSiteJsonLd.tsx`)

## 도메인 호스트 절대 변경 금지

- `NEXT_PUBLIC_SITE_URL` 변경 시 모든 canonical/OG/JSON-LD가 즉시 영향
- 변경 후 반드시 Production Redeploy → sitemap 재생성
- 운영에서는 `yourtarot.cc` 고정 (이전 www 전환 시도 환원 이력 있음 → [troubleshooting/domain-dns-vercel.md](../troubleshooting/domain-dns-vercel.md))
