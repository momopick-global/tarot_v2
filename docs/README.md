# 유어타로(YourTarot v2) 문서 인덱스

> Claude Code(또는 다른 자동화 에이전트)가 작업을 시작할 때 **먼저 읽을 문서**의 진입점입니다.
> 본 인덱스는 현재 운영 기준을 1분 안에 파악할 수 있도록 핵심 사실과 가드레일을 모았습니다.

---

## 🚦 운영 기준 (한 줄 요약)

| 항목 | 값 |
|---|---|
| **대표 도메인 (canonical)** | `https://yourtarot.cc` (apex) |
| **www 처리** | `https://www.yourtarot.cc/*` → 308 → `https://yourtarot.cc/*` |
| **배포 환경** | Vercel (Production branch: `main`) |
| **`NEXT_PUBLIC_SITE_URL`** | `https://yourtarot.cc` |
| **빌드 출력** | Next.js 16 + `output: "export"` (정적 export) |
| **문서 기준 커밋** | `2672e35` (이후 자원 마이그레이션 커밋만 존재) |

---

## 📖 Claude Code 추천 읽기 순서

새 작업을 시작하기 전에 위→아래 순서로 훑으면 컨텍스트가 빠르게 채워집니다.

1. [`project/overview.md`](project/overview.md) — 서비스 개요·주요 기능
2. [`project/current-status.md`](project/current-status.md) — 운영 도메인·배포·최근 완료 작업
3. [`project/protected-areas.md`](project/protected-areas.md) — **수정·간섭 금지 영역**
4. [`setup/deployment.md`](setup/deployment.md) — 배포 방식·운영 검증 URL
5. [`setup/environment-variables.md`](setup/environment-variables.md) — env 변수 사용처
6. [`seo/adsense-review.md`](seo/adsense-review.md) — AdSense 심사 상태
7. [`features/psych-tests.md`](features/psych-tests.md) — 가장 최근 추가된 기능
8. [`design/design-overview.md`](design/design-overview.md) — 비주얼 톤
9. [`content/content-tone.md`](content/content-tone.md) — 문구·톤 가이드
10. [`troubleshooting/domain-dns-vercel.md`](troubleshooting/domain-dns-vercel.md) — 도메인/DNS 이슈

---

## 🗂️ 전체 문서 맵

### `project/` — 프로젝트 메타
- [overview.md](project/overview.md) — 서비스 소개와 주요 기능
- [current-status.md](project/current-status.md) — 현재 운영 상태 스냅샷
- [roadmap.md](project/roadmap.md) — 단기·장기 작업 후보
- [protected-areas.md](project/protected-areas.md) — **건드리지 말 것** 목록
- [work-before-checklist.md](project/work-before-checklist.md) — 작업 시작 전 가드레일 체크
- [folder-structure.md](project/folder-structure.md) — 디렉터리 구조 (legacy 참고)

### `setup/` — 로컬·운영 환경
- [local-development.md](setup/local-development.md) — 5분 시작 가이드
- [deployment.md](setup/deployment.md) — Vercel 배포 흐름
- [environment-variables.md](setup/environment-variables.md) — 환경변수 카탈로그
- [vercel-cloudflare.md](setup/vercel-cloudflare.md) — 도메인·DNS 구조
- [production-checklist.md](setup/production-checklist.md) — 배포 전 점검표

### `seo/` — 검색·광고·구조화
- [seo-checklist.md](seo/seo-checklist.md) — SEO 기본 체크
- [adsense-review.md](seo/adsense-review.md) — AdSense 심사 상태/리스크
- [adsense-final-audit.md](seo/adsense-final-audit.md) — 결제 중단 직전 최종 점검 리포트
- [blog-content-audit.md](seo/blog-content-audit.md) — 블로그 콘텐츠 점검 (짧은 글·썸네일·OG)
- [sitemap-robots.md](seo/sitemap-robots.md) — sitemap/robots 생성 구조
- [metadata-og.md](seo/metadata-og.md) — pageMetadata·OG 사용 규칙
- [search-console.md](seo/search-console.md) — Search Console 운영

### `features/` — 기능별 가이드
- [tarot.md](features/tarot.md) — 타로 플로우와 카테고리
- [psych-tests.md](features/psych-tests.md) — 심리테스트 구조
- [blog.md](features/blog.md) — 블로그 SSG 시스템
- [auth-login.md](features/auth-login.md) — 로그인·Supabase
- [share-kakao.md](features/share-kakao.md) — 카카오 공유
- [analytics-gtm-ga4.md](features/analytics-gtm-ga4.md) — GTM·GA4 이벤트
- [data-model.md](features/data-model.md) — Supabase 스키마 (참고)
- [supabase-tarot-results.md](features/supabase-tarot-results.md) — 결과 저장 RLS

### `design/` — UI·비주얼
- [design-overview.md](design/design-overview.md) — 전체 디자인 방향
- [ui-guidelines.md](design/ui-guidelines.md) — UI 패턴 원칙
- [color-system.md](design/color-system.md) — 컬러 토큰
- [typography.md](design/typography.md) — 폰트·계층
- [layout-mobile.md](design/layout-mobile.md) — 모바일 우선 레이아웃
- [image-guidelines.md](design/image-guidelines.md) — 이미지 공통 기준
- [tarot-image-style.md](design/tarot-image-style.md) — 타로 이미지 톤
- [psych-test-image-style.md](design/psych-test-image-style.md) — 심리테스트 이미지 톤
- [asset-paths.md](design/asset-paths.md) — 이미지 경로 규칙
- [design-system.md](design/design-system.md) — 디자인 시스템 (legacy 토큰 참고)

### `content/` — 카피·문구
- [content-tone.md](content/content-tone.md) — 전체 톤·매너
- [tarot-copy-style.md](content/tarot-copy-style.md) — 타로 결과 문구
- [psych-test-writing-guide.md](content/psych-test-writing-guide.md) — 심리테스트 문구
- [psych-test-template.md](content/psych-test-template.md) — 신규 심리테스트 추가 템플릿(데이터·이미지·SEO·이벤트 일괄)
- [blog-writing-guide.md](content/blog-writing-guide.md) — 블로그 작성 기준
- [blog-missing-thumbnails.md](content/blog-missing-thumbnails.md) — 썸네일 누락 감사 (현재 58개)

### `troubleshooting/` — 자주 마주치는 이슈
- [domain-dns-vercel.md](troubleshooting/domain-dns-vercel.md) — 도메인/DNS
- [build-errors.md](troubleshooting/build-errors.md) — 빌드 오류
- [search-console.md](troubleshooting/search-console.md) — Search Console fetch 문제
- [kakao-inapp-browser.md](troubleshooting/kakao-inapp-browser.md) — 카카오 인앱
- [adsense-issues.md](troubleshooting/adsense-issues.md) — AdSense 거절·재심사

### `archive/` — 더 이상 운영 기준이 아닌 문서
- [DEPLOY-GITHUB-PAGES.md](archive/DEPLOY-GITHUB-PAGES.md) — GitHub Pages 배포 (Vercel로 이전됨)
- [documentation-management-guide.md](archive/documentation-management-guide.md) — 옛 문서 관리 정책 (본 README가 대체)
- [api-spec.md](archive/api-spec.md) — 초기 API 스펙 초안

---

## ⛔ 절대 건드리면 안 되는 영역 (요약)

> 자세한 내용은 [`project/protected-areas.md`](project/protected-areas.md)

- **타로 라우트·로직**: `/tarot/*`, `/menu/*`, `lib/flowData`, `lib/resolveCardReading`, `lib/savedReadings`
- **로그인·인증**: `app/login`, `hooks/useUser`, `lib/supabase`, `lib/oauthErrors`, `lib/authReturnPath`
- **카카오 공유 인프라**: `lib/share.ts`, `lib/kakaoShareSdk.ts`, `components/ShareSection`(기존 호출 시그니처)
- **GTM/GA4 기존 이벤트**(10개): `card_select`, `result_view`, `share_click`, `tarot_category_click`, `tarot_submenu_click`, `psych_test_list_view`, `psych_test_start`, `psych_option_select`, `psych_result_view`, `psych_share_click`

### 신규 작업 원칙
1. 기존 컴포넌트 시그니처 **변경 금지** — 필요하면 *optional prop* 추가
2. 새 기능은 **모듈 단위로 분리** (새 파일·새 라우트)
3. 작업 후 `npm run build` 반드시 통과 확인
4. 정적 export 환경(`output: "export"`) — 동적 SSR 도입 금지

---

## ✅ 작업 시작 전 체크리스트

작업 시작하기 전에 30초 안에 훑어보세요.

- [ ] `git log --oneline -5` — 최근 커밋 흐름 확인
- [ ] `git status --short` — 미커밋 변경 확인
- [ ] `origin/main..HEAD` — 미푸시 커밋 확인
- [ ] 작업이 [protected-areas.md](project/protected-areas.md)와 충돌하지 않는지
- [ ] 작업 후 영향받는 SEO 항목이 있다면 [seo/](seo/) 문서들 확인
- [ ] 작업이 콘텐츠라면 [content/](content/) 가이드 확인
- [ ] AdSense 심사 중에는 [seo/adsense-review.md](seo/adsense-review.md) 리스크 영역 회피

---

## 📅 최근 주요 작업 (커밋 `2672e35` 기준)

1. **심리테스트 기능 출시** — `/psych-tests`, `/psych-tests/love-style/(+4 results)`
2. **AdSense 심사 대비** — `/privacy-policy`, `/contact` 신규 생성, 정책 보강
3. **GTM 이벤트 5종 추가** — `psych_test_*`, `psych_option_select`, `psych_share_click`
4. **sitemap 확장** — 36개 `/menu/*` URL + `/psych-tests/*` 6개 + 정책 페이지
5. **블로그 UI** — 카드 썸네일, featured 기반 인기글, 상하단 back link
6. **자원 마이그레이션** — 핵심 헤더/푸터/공유 아이콘 png → webp
