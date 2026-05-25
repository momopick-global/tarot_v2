# 프로젝트 개요

## 서비스 정체성

**유어타로(YourTarot)** — 모바일 우선의 감성 타로·심리테스트 콘텐츠 서비스.

> ⚠️ 본 프로젝트는 **유어타로(YourTarot)** 이며 "모모픽(Momopick)"이 아닙니다. 모든 운영·SEO·공유 문구는 유어타로 기준으로 통일되어 있습니다.

## 서비스 목적

- 마스터 캐릭터를 통한 1분 타로 리딩 경험 제공
- 가벼운 자기 이해 도구로서의 심리테스트(연애·관계·감정)
- SEO·검색 트래픽을 끌어들이는 감성 블로그 콘텐츠
- 카카오톡 중심의 공유 흐름 최적화

## 주요 기능 한눈에

| 영역 | 라우트 | 진원지 |
|---|---|---|
| 메인 캐러셀 + 1뎁스 메뉴 | `/` | `src/app/page.tsx`, `src/lib/categories.ts` |
| 타로 카테고리 서브메인 | `/menu/{emotion,relationship,choice,destiny,comfort}` | `src/app/menu/[category]/page.tsx`, `src/data/tarotMenus.ts` |
| 타로 카드 플로우 | `/tarot/{start,draw,reveal,analyze,result}` | `src/app/tarot/*` |
| 마스터 프로필 | `/masters`, `/masters/[slug]` | `src/lib/flowData.ts` |
| 심리테스트 | `/psych-tests/*` | `src/data/psychTests.ts` |
| 블로그(정적 SSG) | `/blog/*` | `scripts/generate-blog.js` + `data/blog/*.json` |
| 로그인 | `/login` | `src/app/login`, Supabase |
| 정책·문의 | `/privacy-policy`, `/personal`, `/terms`, `/disclaimer`, `/contact`, `/about`, `/partner`, `/recommended`, `/faq` | `src/app/*` |

## 기술 스택

- **프레임워크**: Next.js 16.2 (App Router)
- **언어/UI**: TypeScript, React 19, Tailwind CSS 4
- **인증**: Supabase Auth (Google + Kakao OAuth)
- **이미지 형식**: webp 우선 + png 일부 (legacy)
- **분석**: GTM(`GTM-MGCK6P97` 기본) + GA4
- **광고**: Google AdSense (publisher `ca-pub-2758905830381994`)
- **공유 SDK**: Kakao JavaScript SDK (옵셔널, `NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY`)
- **배포**: Vercel(자동), 정적 `output: "export"`

## 데이터 진원지 (싱글소스)

| 데이터 | 파일 |
|---|---|
| 타로 카테고리 5개 + 메뉴 30개 | `src/lib/categories.ts`, `src/data/tarotMenus.ts` |
| 마스터 9명 (Sera·Kai·Morgana·Noa·Erebus·Serena·Nyx·Clotho·Pipi) | `src/lib/flowData.ts` |
| 카드 해석(JSON) | `src/data/readings/*.json` |
| 블로그 61개 글 | `data/blog/*.json` |
| 심리테스트 | `src/data/psychTests.ts` |
| 정책 마크다운 | `src/data/policies.ts` |
| FAQ | `src/data/faq.json` |

## 광고·분석 한눈에

- **GTM**: 모든 페이지 `<head>`에 `<GoogleTagManagerHead />` 로 자동 로드
- **AdSense**: 로더 스크립트만 추가 (광고 슬롯 UI 미배치)
- **GA4**: GTM 안에서 태그로 관리 (코드 직접 호출 없음)
- **이벤트 헬퍼**: `src/lib/gtmEvents.ts`

## 운영 정책 요약

- 캐논 도메인: **`https://yourtarot.cc`** (apex/비-www)
- www → 308 redirect → apex
- 정적 export — 동적 SSR 라우트 미사용
- 모든 이미지 자원은 `/public/images/` 기준, 코드에서는 `withAssetBase()` 사용
- 신규 콘텐츠 추가는 데이터 파일만 갱신하면 자동 페이지/사이트맵 확장
