# 로컬 개발

## 5분 시작

```bash
# 1. 의존성 설치
npm install

# 2. 환경변수 (없으면 example에서 복사)
cp .env.local.example .env.local
# .env.local 안에서 NEXT_PUBLIC_SUPABASE_URL / ANON_KEY 채우기
# (없어도 대부분 기능은 동작하지만 로그인은 비활성화됨)

# 3. 개발 서버
npm run dev          # http://localhost:3000
npm run dev:3037     # http://127.0.0.1:3037 (팀 공유 포트, polling 활성)
```

## 주요 npm 스크립트

| 명령 | 용도 |
|---|---|
| `npm run dev` | 로컬 개발 서버 |
| `npm run build` | prebuild(faq:sync + blog:generate + sitemap) + next build |
| `npm run start` | 프로덕션 빌드 결과 실행 |
| `npm run lint` | ESLint |
| `npm run blog:generate` | `data/blog/*.json` → `public/blog/*` 정적 HTML |
| `npm run faq:sync` | `src/data/faq.json` → `public/data/faq.json` 복사 |
| `npm run cards:*` | 마스터 카드 이미지 일괄 가공 (선택) |
| `npm run readings:seed-templates` | 카드 해석 JSON 시드 생성 |

## prebuild 흐름

`npm run build` 직전에 자동 실행되는 단계:

```
prebuild:
  1) faq:sync         — FAQ JSON 동기화
  2) blog:generate    — data/blog/*.json → public/blog/ HTML 생성
  3) write-sitemap-xml — public/sitemap.xml + 루트 sitemap.xml 갱신
```

→ 블로그·sitemap 변경 후에는 별도 명령 없이 `npm run build` 한 번이면 모두 갱신됨.

## 작업 흐름

1. 브랜치는 거의 `main` 단일 사용 (Vercel 자동 배포가 main 푸시 트리거)
2. 큰 작업은 별도 토픽 브랜치 권장
3. 빌드 통과 후 커밋
4. `git push origin main` → Vercel 자동 배포 (2~4분)
5. 운영 도메인에서 결과 검증

## 카카오 인앱 브라우저 테스트

DevTools → Network conditions → User agent → Custom 에 아래 입력:

```
Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 KAKAOTALK 10.0.0
```

→ `<InAppBrowserNotice />` 가 표시되어야 함 (`src/components/InAppBrowserNotice.tsx`).

## 모바일 뷰포트 확인 폭

- `360px` — 구형 안드로이드
- `390px` — iPhone 표준 (사이트 컨테이너 기본 폭)
- `430px` — iPhone Plus/Max

## 트러블슈팅

- 빌드가 오래 걸리거나 폴링 오류: `npm run dev:3037` 사용
- 카카오 SDK 미동작: `.env.local`에 `NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY` 누락 → 공유는 sharer.kakao.com 링크로 fallback
- 블로그 변경이 안 보임: `npm run blog:generate` 직접 실행
