# 블로그 (정적 SSG)

## 시스템 구조

```
data/blog/*.json                  ← 게시글 1개당 1 JSON
  ↓ scripts/generate-blog.js      ← prebuild 단계 실행
public/blog/{slug}/index.html     ← 정적 HTML 출력
public/blog/index.html            ← 전체 목록
public/blog/{category}/index.html ← 카테고리 목록
```

Next.js 라우트가 아닌 **prebuild로 생성되는 정적 HTML**입니다. `next build` 와 별개로 `npm run blog:generate` 만 따로 돌릴 수도 있음.

## 카테고리

| slug | 한글 |
|---|---|
| `love` | 연애·관계 |
| `tarot` | 타로 |
| `psychology` | 심리 |
| `test` | 테스트 |
| `life` | 일상·라이프 |

진원지: `BLOG_CATEGORIES` 상수 (`scripts/generate-blog.js`)

## JSON 스키마

```json
{
  "slug": "attachment-anxiety-in-love",
  "title": "불안형 애착이 연애에 미치는 영향",
  "description": "확인 욕구와 거리감에 민감한 패턴을 이해하고 다루는 법…",
  "category": "love",
  "tags": ["연애", "애착", "불안"],
  "date": "2026-03-29",
  "content": [
    { "type": "h2", "text": "…" },
    { "type": "p", "text": "…" },
    { "type": "ul", "items": ["…", "…"] }
  ],
  "faq": [{ "q": "…", "a": "…" }],
  "featured": true,            // optional — 홈의 "인기 블로그"에 노출
  "thumbnail": "/path...",     // optional override
  "image": "/path...",         // optional alias
  "ogImage": "/path..."        // optional, OG/공유용
}
```

## 썸네일 fallback 우선순위

코드: `scripts/generate-blog.js`의 `resolveThumbnail()`

1. `post.thumbnail`
2. `post.image`
3. `post.ogImage`
4. `/images/blog/{slug}.{webp|jpg|jpeg|png}` 자동 탐색
5. `/images/blog/blog-default-thumb.webp` (default)

## OG 이미지 우선순위

코드: `resolveOgImage()` — Kakao 등 호환성 위해 jpg/png 분리 경로 우선

1. `post.ogImage` 명시
2. `/images/og/blog/{slug}.{jpg|png|webp}` (전용 경로)
3. `/images/blog/{slug}.{webp|jpg|png}` (썸네일 재사용)
4. `/images/blog/blog-default-thumb.webp`

## 홈 "인기 블로그" (featured)

- 진원지: `src/lib/blogData.ts`의 `getFeaturedBlogPosts(limit)`
- `data/blog/*.json` 에 `"featured": true` 표시된 게시글만 노출 (최신순)
- 현재 4개:
  - `attachment-anxiety-in-love`
  - `love-failure-pattern`
  - `tarot-daily-one-card-meaning`
  - `psychology-attachment-styles-love`
- 변경: 해당 JSON의 `featured` 값만 토글하면 자동 반영

## 글 상세 페이지 UI

상단/하단 모두에 **`← 블로그 목록으로 돌아가기`** 링크 노출:
- 상단: `renderSiteHeader({ backHref, backLabel })`의 toolbar
- 하단: 관련 글·테스트 링크 다음 `.blog-toolbar.blog-toolbar--bottom`

## 메타·구조화 데이터

- `<link rel="canonical">`, `<meta property="og:*">`, `<meta name="twitter:*">`
- `Article` JSON-LD (headline·datePublished·image·publisher 등)
- `FAQPage` JSON-LD (faq 있을 때만)
- 관련 글 2~3개는 슬러그 해시 기반 결정적 셔플로 선정

## 썸네일 누락 감사

- 현재 58/61 게시글이 개별 썸네일 없음 (default thumb 사용)
- 자세한 누락 목록: [content/blog-missing-thumbnails.md](../content/blog-missing-thumbnails.md)

## 새 게시글 추가 순서

1. `data/blog/{slug}.json` 생성 (스키마 따름)
2. (선택) `public/images/blog/{slug}.webp` 썸네일 추가
3. (선택) `public/images/og/blog/{slug}.jpg` OG 이미지 추가
4. `npm run build` 한 번 돌리면 정적 HTML + sitemap 자동 반영

## 글 톤·작성 가이드

→ [content/blog-writing-guide.md](../content/blog-writing-guide.md)
