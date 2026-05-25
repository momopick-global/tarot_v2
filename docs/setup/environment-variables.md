# 환경변수 카탈로그

> ⚠️ **민감 키 값은 본 문서에 절대 적지 마세요.** Vercel Dashboard / `.env.local` 에서만 관리합니다.

## 필수 (Production)

| 변수명 | 용도 | 비고 |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | canonical / sitemap / OG URL 호스트 | **`https://yourtarot.cc`** 고정 |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 프로젝트 URL | 끝에 `/auth/v1/callback` 등 붙이지 말 것 |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon 키 | 클라이언트 노출 키 (RLS 의존) |

## 선택 (있을 때 기능 확장)

| 변수명 | 용도 | 미설정 시 동작 |
|---|---|---|
| `NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY` | Kakao SDK 피드 공유 | `sharer.kakao.com` 링크-only fallback |
| `NEXT_PUBLIC_GTM_ID` | GTM 컨테이너 ID | 코드 기본값 `GTM-MGCK6P97` 사용 |
| `NEXT_PUBLIC_ROBOTS_SITEMAP_ORIGIN` | robots.txt `Sitemap:` 라인 호스트 | `https://www.yourtarot.cc` 기본 (별도 정의 가능) |
| `NEXT_PUBLIC_BASE_PATH` | GitHub Pages basePath | 비어 있음 (Vercel 운영 기준) |

## 환경변수 변경 시 영향 매트릭스

| 변수 변경 | 영향 받는 영역 | 필요 조치 |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | canonical, sitemap.xml, OG `og:url`, JSON-LD URL | **Production Redeploy 필수** |
| `NEXT_PUBLIC_SUPABASE_*` | 로그인 / Supabase 호출 | Redeploy |
| `NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY` | 카카오톡 미리보기 공유 | Redeploy |
| `NEXT_PUBLIC_GTM_ID` | GTM 로딩 | Redeploy |
| `NEXT_PUBLIC_BASE_PATH` | 모든 asset 경로 | 별도 호스팅(GitHub Pages)용 — 운영에서는 변경 금지 |

## 보안

- `NEXT_PUBLIC_*` 접두사가 붙은 변수는 **클라이언트 번들에 포함됩니다**. 비밀 키는 절대 사용 금지.
- 진정한 비밀(서버 API 키 등)은 현재 사용하지 않으며, 필요할 경우 별도 정책으로 관리.
- `.env.local`은 `.gitignore`에 포함되어 있어 커밋되지 않습니다.

## Vercel Dashboard 설정 위치

Project → Settings → Environment Variables
- 환경별로 Production / Preview / Development 선택해서 설정
- Production 변경 후 자동 Redeploy되지 않으면 수동 Redeploy

## 로컬 env 동기화

```bash
cp .env.local.example .env.local
# 그 후 .env.local 안에 실제 값 입력
```

`.env.local.example`은 키 이름과 용도만 안내하며 실제 값은 비어 있습니다.
