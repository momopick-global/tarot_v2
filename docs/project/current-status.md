# 현재 운영 상태 스냅샷

## 기준 커밋

- **`2672e35`** — chore(adsense): 정책·문의 페이지 보강 + 심리테스트 본문 강화 + sitemap 확장
- 이후 커밋(`0ab7fcf` blog UI / `324b89a` png→webp 마이그레이션 / `0d18b55` blog webp 추적 / `57e03aa` relationship 썸네일 등)은 **자원·UI 정비만** 진행되어 운영 기능 면에서는 동일합니다.

## 운영 환경

| 항목 | 값 |
|---|---|
| 대표 도메인 (canonical) | **`https://yourtarot.cc`** (apex) |
| www 처리 | `www.yourtarot.cc/*` → 308 → `yourtarot.cc/*` |
| 호스팅 | Vercel (Production) |
| Production 브랜치 | `main` |
| `NEXT_PUBLIC_SITE_URL` (Vercel env) | `https://yourtarot.cc` |
| 빌드 모드 | `output: "export"` (정적 export) |
| 출력 디렉터리 | `out/` |

## 운영 검증 URL

- 메인: https://yourtarot.cc/
- 사이트맵: https://yourtarot.cc/sitemap.xml
- robots: https://yourtarot.cc/robots.txt
- 정책: https://yourtarot.cc/privacy-policy , https://yourtarot.cc/personal , https://yourtarot.cc/terms , https://yourtarot.cc/disclaimer
- 문의: https://yourtarot.cc/contact
- 심리테스트: https://yourtarot.cc/psych-tests , https://yourtarot.cc/psych-tests/love-style
- 메뉴: https://yourtarot.cc/menu/emotion (외 4개 카테고리)
- 블로그: https://yourtarot.cc/blog/

## 최근 완료 작업 (역순)

1. **`0d18b55` fix(blog)**: 블로그 썸네일 webp 4장 git 추적 (운영 404 해소)
2. **`324b89a` chore(assets)**: 핵심 아이콘·배경 png → webp 마이그레이션 + 코드 참조 동기화
3. **`0ab7fcf` feat(blog)**: 블로그 카드 썸네일, featured 기반 인기글, 상하단 back link, OG 분리 경로
4. **`2672e35` chore(adsense)**: 정책·문의 페이지 보강 + 심리테스트 본문/FAQ 강화 + sitemap 확장
5. **`52a5e66` revert**: 운영 캐논 도메인 apex 유지 (직전 www 통일 시도 환원)
6. **`f11c949` feat**: 심리테스트 메뉴 + 예시 콘텐츠(love-style) 추가
7. **`55f7a59` feat**: 메인 상단 카테고리 메뉴 + `/menu/*` 카테고리 서브메인
8. **`e64ed07` feat**: 홈 히어로를 카테고리 carousel로 교체 + 썸네일·SEO 마무리

## 사이트맵 등록 URL 종류 (`public/sitemap.xml`)

- 정적 페이지 (`/`, `/about/`, `/contact/`, `/menu/`, …)
- 마스터 상세 9개 (`/masters/{slug}/`)
- 카테고리 서브메인 5개 (`/menu/{categoryId}/`)
- 카테고리 서브메뉴 30개 (`/menu/{categoryId}/{slug}/`)
- 심리테스트 + 결과 6개 (`/psych-tests/`, `/psych-tests/love-style/`, `/psych-tests/love-style/result-{1..4}/`)
- 블로그 61개 글 + 5개 카테고리 + 메인

## 광고·분석 적용 상태

- **AdSense** 로더 스크립트: 전체 페이지 `<head>` 1회 적용 (`ca-pub-2758905830381994`)
- **ads.txt**: `google.com, pub-2758905830381994, DIRECT, f08c47fec0942fa0`
- **GTM**: 컨테이너 ID `GTM-MGCK6P97` (env 미설정 시 fallback)
- **GA4**: GTM 안에서 태그 관리
- **AdSense 광고 슬롯 UI**: 아직 배치하지 않음 (심사 우선)

## 알려진 잔여 작업

- 블로그 58개 게시글의 개별 썸네일 누락 — [content/blog-missing-thumbnails.md](../content/blog-missing-thumbnails.md)
- 마스터 04~09 폴더 이미지가 아직 png (01~03만 webp 일부 보유)
- 미참조 디자인 mockup png 다수가 working tree 에 `D` 상태 (별도 정리 필요)

## 자세한 보호 영역

- [project/protected-areas.md](protected-areas.md) 참고
