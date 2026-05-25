# 로그인 · Supabase 인증

## 라우트

| 경로 | 역할 |
|---|---|
| `/login` | 로그인 화면 (Google + Kakao 버튼) |
| `/auth/callback` | OAuth 콜백 수신 |
| `/mypage` | 로그인 후 마이페이지 |

## Provider

- **Google** (OAuth)
- **Kakao** (OAuth, scope `profile_nickname profile_image` — KOE205 방지)
- **Facebook 제거됨** (운영 정책상 미사용, 커밋 `48d841e`로 코드도 정리)

진원지: `src/hooks/useUser.ts` 의 `OAuthProvider = "google" | "kakao"`

## 핵심 파일

| 파일 | 역할 |
|---|---|
| `src/app/login/page.tsx` | 로그인 화면 UI |
| `src/app/auth/callback/page.tsx` | OAuth 콜백 처리 |
| `src/hooks/useUser.ts` | 인증 상태 훅 + `loginWithProvider` / `logout` |
| `src/lib/supabase.ts` | `getSupabaseClient()` 싱글톤 |
| `src/lib/oauthErrors.ts` | OAuth 에러 메시지 한글화 |
| `src/lib/authReturnPath.ts` | 로그인 후 리턴 경로 |
| `src/components/AuthReturnRedirect.tsx` | 로그인 후 자동 이동 |

## 환경변수

| 변수 | 용도 |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 프로젝트 루트 URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | anon 공개 키 (RLS 의존) |

env 미설정 시 `getSupabaseClient()`가 `null` 반환 → 로그인 기능 자동 비활성화 (다른 페이지는 정상 동작).

## OAuth 리다이렉트 URL

```
{site origin}/{basePath}/
```

운영에서는 `https://yourtarot.cc/`.
Supabase Dashboard → Authentication → URL Configuration → Redirect URLs 에 등록되어야 함.

## 로그인 후 리턴 경로

- `?returnTo=…` 쿼리 또는 `sessionStorage[AUTH_RETURN_PATH_KEY]`
- `sanitizeAuthReturnPath()`로 외부 도메인·이상한 경로 차단

## 보호 영역

전체가 [protected-areas.md](../project/protected-areas.md) 의 "로그인·인증" 항목.

- 컴포넌트 시그니처 변경 금지
- 새 OAuth provider 추가 시 `OAuthProvider` 유니온 + `PROVIDER_MAP` + `oauthErrors.ts` 분기 + 버튼 UI 일관 갱신 필요

## 정책 페이지 안내

`/privacy-policy` 본문(섹션 7)에 Supabase 인증 연동 안내 포함.
