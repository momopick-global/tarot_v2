# SEO 기본 체크리스트

## 페이지 단위

페이지를 새로 만들 때 확인:

- [ ] `pageMetadata(title, description, path)` 호출로 title/description/canonical/OG 자동 생성
- [ ] `path`는 `trailingSlash: true` 정책에 맞게 끝 슬래시 포함
- [ ] 동적 라우트는 `generateStaticParams` 정의
- [ ] `params: Promise<…>` + `await params` 패턴 사용 (Next 16)
- [ ] OG 이미지가 webp 외에 jpg/png 호환 확인 필요할 경우 `/images/og/.../slug.jpg` 권장
- [ ] JSON-LD 구조화 데이터 필요한 페이지면 inline `<script type="application/ld+json">` 추가

## 사이트 전체 단위

- [ ] sitemap.xml 에 신규 URL 포함 (`scripts/write-sitemap-xml.cjs`)
- [ ] robots.txt 의 `Sitemap:` 라인이 운영 호스트(yourtarot.cc) 가리키는지
- [ ] canonical 도메인 일관성: 비-www
- [ ] hreflang 사용 안 함 (단일 언어 ko)

## 자세한 가이드

- [seo/sitemap-robots.md](sitemap-robots.md)
- [seo/metadata-og.md](metadata-og.md)
- [seo/adsense-review.md](adsense-review.md)
- [seo/search-console.md](search-console.md)

## 빌드 시 자동 처리

`npm run build` → prebuild 단계에서:
1. FAQ sync
2. 블로그 정적 HTML 생성 (글마다 canonical, OG, Article JSON-LD, FAQ JSON-LD 포함)
3. sitemap.xml + robots.txt 일괄 갱신

## 카카오톡 미리보기

- Kakao SDK 공유에서는 webp og 이미지가 일부 환경에서 무시될 수 있음
- 권장: `/images/og/blog/{slug}.{jpg|png}` 같은 별도 OG 경로
- 자세한 동작: [features/share-kakao.md](../features/share-kakao.md)
