# 블로그 작성 가이드

## 기본 정책

- 정적 SSG (Next.js 라우트가 아닌 `scripts/generate-blog.js`로 HTML 생성)
- 한 게시글 = 한 JSON 파일 (`data/blog/{slug}.json`)
- 빌드 시 자동으로 카테고리/태그/sitemap에 반영

## 필수 SEO 필드

| 필드 | 길이/형식 | 비고 |
|---|---|---|
| `title` | 30~50자 권장 | 검색 친화 + 브랜드 자동 부착 (`%s | 유어타로`) |
| `description` | 80~150자 권장 | meta description, og description |
| `slug` | 영문 슬러그 | URL 자동 생성 |
| `category` | `love/tarot/psychology/test/life` 중 하나 | |
| `tags` | 3~5개 | 키워드 자연스럽게 |
| `date` | `YYYY-MM-DD` | 정렬·sitemap lastmod |
| `content[]` | 본문 블록 배열 | h2/h3/p/ul 타입 |

## 본문 작성 원칙

- **충분한 길이** — 보통 700자 이상 (AdSense 심사용 thin content 회피)
- **H2/H3 구조** — 검색 친화, 가독성 향상
- **단락 짧게** — 모바일 우선 (3~4 문장 단위)
- **자연스러운 키워드 분포** — 키워드 스터핑 금지

블록 타입:
```json
{ "type": "h2", "text": "…" }
{ "type": "h3", "text": "…" }
{ "type": "p", "text": "…" }
{ "type": "ul", "items": ["…", "…"] }
```

## FAQ 권장

`faq[]` 필드에 Q&A 2~5개:
- 검색에서 "자주 묻는 질문" rich result 노출 기회
- 자동으로 `FAQPage` JSON-LD 생성
- 본문 끝에 details/summary 형태로 노출됨

```json
"faq": [
  { "q": "…?", "a": "…." },
  { "q": "…?", "a": "…." }
]
```

## 이미지

- 본문 인라인 이미지는 현재 미지원 (텍스트 + cover 1장)
- cover/썸네일: `public/images/blog/{slug}.webp`
- OG 이미지 (선택, Kakao 호환): `public/images/og/blog/{slug}.jpg`
- 자세한 fallback: [features/blog.md](../features/blog.md)

## 내부 링크

본문에서 다른 게시글이나 사이트 페이지로 안내 시:
- 절대 경로 (`/blog/other-slug/`, `/psych-tests/love-style/`)
- 자연스러운 anchor text
- 페이지 하단에는 "관련 글" 2~3개가 자동 셔플로 추가됨

## 톤

- 단정적·예언적 표현 회피
- 자기 이해와 따뜻한 안내 중심
- 사용자를 겁주지 않음
- 자세히: [content-tone.md](content-tone.md)

## featured (인기글)

홈에 노출하고 싶으면 JSON에 `"featured": true` 추가:
- 현재 4개 featured 노출 중
- 최신순으로 정렬됨
- `src/lib/blogData.ts`의 `getFeaturedBlogPosts(limit)`가 빌드 타임 로드

## AdSense 심사 중 주의

- 얇은 글 (300자 미만) 피하기
- 중복 글 피하기
- "준비중", "곧 작성" 같은 placeholder 본문 금지
- 이미지가 없어도 본문이 충분히 있으면 OK (default thumb 자동 적용)

자세히: [seo/adsense-review.md](../seo/adsense-review.md)

## 썸네일 누락 감사

현재 58/61 게시글이 개별 이미지 없음:
→ [content/blog-missing-thumbnails.md](blog-missing-thumbnails.md)

## 새 글 추가 워크플로

1. `data/blog/{slug}.json` 생성 (위 스키마)
2. (선택) `public/images/blog/{slug}.webp` 썸네일 추가
3. (선택) `public/images/og/blog/{slug}.jpg` OG 추가
4. `npm run build` — prebuild에서 자동 생성·sitemap 등록
5. dev 서버 또는 운영에서 확인
