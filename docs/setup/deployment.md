# 배포

## 운영 환경

| 항목 | 값 |
|---|---|
| 호스팅 | Vercel |
| Production 브랜치 | `main` |
| 자동 배포 트리거 | `git push origin main` |
| 빌드 명령 | `npm run build` (prebuild 자동 포함) |
| 출력 디렉터리 | `out/` (정적 export) |
| 대표 도메인 | `https://yourtarot.cc` |
| 부 도메인 | `https://www.yourtarot.cc` → 308 redirect |
| 배포 소요 시간 | 보통 2~4분 |

## 배포 흐름

```
git push origin main
  ↓
Vercel webhook 수신
  ↓
npm ci → npm run build (prebuild + next build)
  ↓
out/ 정적 자원 업로드
  ↓
Edge CDN 갱신 (yourtarot.cc 즉시 반영)
```

## 배포 전 체크리스트

작업 후 커밋 전:
- [ ] `npm run build` 통과 (TypeScript + Generating static pages)
- [ ] 영향받는 페이지 dev 서버에서 200 응답 확인
- [ ] `git status --short` 로 의도하지 않은 변경 없는지
- [ ] 보호 영역([protected-areas.md](../project/protected-areas.md)) 침범 없음

## 배포 후 검증 URL

| URL | 기대 |
|---|---|
| https://yourtarot.cc/ | 메인 200 |
| https://yourtarot.cc/sitemap.xml | XML 200, 호스트 `yourtarot.cc` (비-www) |
| https://yourtarot.cc/robots.txt | 200, Sitemap 라인 비-www |
| https://yourtarot.cc/privacy-policy/ | 정책 200 |
| https://yourtarot.cc/contact/ | 문의 200 |
| https://yourtarot.cc/psych-tests/ | 심리테스트 목록 200 |
| https://yourtarot.cc/psych-tests/love-style/ | 상세 200 |
| https://yourtarot.cc/psych-tests/love-style/result-1/ | 결과 200 |
| https://yourtarot.cc/blog/ | 블로그 목록 200 |
| https://yourtarot.cc/blog/love/ | 카테고리 200 |
| https://yourtarot.cc/menu/emotion/ | 카테고리 200 |
| https://yourtarot.cc/ads.txt | 200, `pub-2758905830381994` 포함 |

## 배포 검증 명령 (CLI)

```bash
# Last-modified로 최근 배포 시각 확인
curl -sI https://yourtarot.cc/ | grep -iE "HTTP/|last-modified|x-vercel"

# sitemap 호스트 일관성
curl -s https://yourtarot.cc/sitemap.xml | grep -oE 'https://[a-z.]+' | sort -u
# 기대: https://yourtarot.cc 만 출력

# canonical
curl -sL https://yourtarot.cc/<path>/ | grep '<link rel="canonical"'
```

## Redeploy 방법

코드 변경 없이 환경변수만 바꾼 경우:

1. Vercel Dashboard → Project → Deployments
2. 가장 최근 Production 배포 옆 `…` → **Redeploy** 클릭
3. "Use existing Build Cache" 해제 권장 (env 반영을 위해)

## CI 백업 (GitHub Pages)

`.github/workflows/github-pages.yml` 가 존재하지만 운영 도메인은 Vercel입니다.
GitHub Pages는 백업 미러로만 유지하고 운영 트래픽은 보내지 않습니다.

## 정적 export 주의

- `next.config.ts`에 `output: "export"` 설정
- 동적 SSR (Route Handlers, Server Actions, ISR 등) 금지
- 동적 라우트는 `generateStaticParams` 필수
- `params`는 Promise 형태 (`await params`)
