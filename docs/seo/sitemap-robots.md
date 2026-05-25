# sitemap.xml & robots.txt

## 생성 흐름

```
prebuild → scripts/write-sitemap-xml.cjs
            ├ public/sitemap.xml (배포용)
            ├ sitemap.xml          (루트 복사본, 일부 도구용)
            ├ public/robots.txt    (Sitemap: 라인 포함)
            └ robots.txt           (루트 복사본)
```

## sitemap 포함 URL 카테고리

| 카테고리 | 개수 | 출처 |
|---|---|---|
| 정적 페이지 (`/`, `/about/`, `/contact/`, `/menu/`, …) | ~27 | `STATIC_PATHS` 상수 |
| 마스터 상세 | 9 | `MASTERS_DETAIL_SLUGS` 상수 |
| 메뉴 카테고리 서브메인 | 5 | `TAROT_MENU_BY_CATEGORY` 상수 |
| 메뉴 서브메뉴 상세 | 30 | 위와 동일 (5 × 6) |
| 심리테스트 + 결과 | 1 + 1 + 4 | `PSYCH_TESTS` 상수 |
| 블로그 글 | 61 | `data/blog/*.json` 동적 |
| 블로그 카테고리 | 5 | `love`, `tarot`, `psychology`, `test`, `life` |

총 ≈ 140+ URL.

## 호스트 일관성

모든 `<loc>`는 `NEXT_PUBLIC_SITE_URL` 환경변수 기준으로 생성됨.
운영에서는 **`https://yourtarot.cc`** (apex/비-www) 고정.

```bash
curl -s https://yourtarot.cc/sitemap.xml | grep -oE 'https://[a-z.]+' | sort -u
# 기대 출력: https://yourtarot.cc 만
```

## robots.txt 형식

```
User-agent: *
Allow: /

Sitemap: https://www.yourtarot.cc/sitemap.xml
```

> 참고: `NEXT_PUBLIC_ROBOTS_SITEMAP_ORIGIN` env로 robots의 `Sitemap:` 라인 호스트만 별도 지정 가능 (기본값 `https://www.yourtarot.cc`). canonical(`yourtarot.cc`)과 다를 수 있어 운영팀 결정에 따름.

## 신규 페이지 추가 시

1. 정적 페이지: `STATIC_PATHS` 배열에 추가
2. 마스터: `MASTERS_DETAIL_SLUGS` 배열에 slug 추가
3. 메뉴 카테고리/서브메뉴: `TAROT_MENU_BY_CATEGORY` 객체 갱신 (`src/data/tarotMenus.ts` 와 동기화)
4. 심리테스트: `PSYCH_TESTS` 배열에 `{ slug, resultIds }` 추가 (`src/data/psychTests.ts` 와 동기화)
5. 블로그: `data/blog/{slug}.json` 추가 — 자동 감지

`npm run build` 후 sitemap.xml 갱신 확인.

## 우선순위·changefreq 가이드

| 페이지 | priority | changefreq |
|---|---|---|
| `/` | 1.0 | weekly |
| 정적 메인 페이지 | 0.8 | weekly |
| 카테고리 서브메인 | 0.8 | weekly |
| 카테고리 서브메뉴 상세 | 0.65 | monthly |
| 마스터 상세 | 0.7 | weekly |
| 블로그 글 | 0.75 | monthly |
| 심리테스트 상세 | 0.75 | monthly |
| 심리테스트 결과 | 0.6 | monthly |
