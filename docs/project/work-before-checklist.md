# 작업 시작 전 체크리스트

> Claude Code(또는 다른 자동화 에이전트)가 **새 작업 한 사이클**을 시작할 때 1~2분 안에 훑어볼 가드레일입니다.

## 1) 먼저 읽어야 할 문서 (순서)

```
1) docs/README.md
2) docs/project/overview.md
3) docs/project/current-status.md
4) docs/project/protected-areas.md
5) (작업 관련) docs/features/* OR docs/design/* OR docs/seo/*
6) docs/setup/deployment.md  (배포 영향 있을 때)
```

## 2) 보호 영역 (수정 금지)

자세히는 [`protected-areas.md`](protected-areas.md). 핵심 한 줄 요약:

- **타로 라우트·로직**: `/tarot/*`, `/menu/*`, `lib/flowData|resolveCardReading|savedReadings`
- **로그인·인증**: `app/login`, `hooks/useUser`, `lib/supabase|oauthErrors|authReturnPath`
- **카카오 공유**: `lib/share.ts`, `lib/kakaoShareSdk.ts`, `components/ShareSection`(시그니처)
- **기존 GTM 이벤트 10개**: `card_select`, `result_view`, `share_click`, `tarot_category_click`, `tarot_submenu_click`, `psych_test_list_view`, `psych_test_start`, `psych_option_select`, `psych_result_view`, `psych_share_click`

원칙:
1. 기존 시그니처 변경 금지 → 필요시 **옵셔널 prop만 추가**
2. 새 기능은 **모듈 단위로 분리**
3. 작업 후 `npm run build` 통과 필수

## 3) 도메인 / canonical 기준

| 항목 | 값 |
|---|---|
| 캐논 도메인 | **`https://yourtarot.cc`** (apex) |
| www 처리 | `www.yourtarot.cc` → 308 → apex |
| sitemap/OG/canonical | 모두 비-www 기준 |
| 배포 | Vercel, Production = `main` |

> ⚠️ `https://yourtarot.cc` 외 다른 호스트로 변경 시도 금지. 환원 이력 있음 (커밋 `52a5e66`).

## 4) 환경변수 주의

| 변수 | 값 | 변경 시 영향 |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://yourtarot.cc` | canonical·sitemap·OG 전체 재생성 — Redeploy 필수 |
| `NEXT_PUBLIC_SUPABASE_URL/ANON_KEY` | (비밀) | 로그인 기능 |
| `NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY` | (비밀) | 카카오 공유 미리보기 |
| `NEXT_PUBLIC_GTM_ID` | (없으면 코드 fallback `GTM-MGCK6P97`) | GTM 컨테이너 |

원칙:
- **비밀 값은 문서에 적지 말기**
- env 변경 후 항상 Vercel **Production Redeploy**
- 자세히: [`docs/setup/environment-variables.md`](../setup/environment-variables.md)

## 5) 작업 후 확인할 URL (응답 200 + 본문 핵심 키워드)

```
https://yourtarot.cc/                       — 메인
https://yourtarot.cc/privacy-policy         — 정책
https://yourtarot.cc/contact                — 문의
https://yourtarot.cc/terms                  — 약관
https://yourtarot.cc/about                  — 소개
https://yourtarot.cc/disclaimer             — 면책
https://yourtarot.cc/ads.txt                — AdSense
https://yourtarot.cc/sitemap.xml            — sitemap
https://yourtarot.cc/robots.txt             — robots
https://yourtarot.cc/psych-tests            — 심리테스트 목록
https://yourtarot.cc/psych-tests/love-style — 상세
https://yourtarot.cc/menu/emotion           — 카테고리 서브
https://yourtarot.cc/blog/                  — 블로그 목록
```

작업이 영향 준 페이지를 우선 확인. 자세한 검증 명령은 [`docs/setup/deployment.md`](../setup/deployment.md).

## 6) `npm run build` 실행 기준

다음 중 하나라도 해당하면 **빌드 필수**:
- 소스 코드(`src/`) 변경
- 스크립트(`scripts/`) 변경
- `data/blog/*.json` 추가/수정
- 환경변수 의존성 변경
- `next.config.ts`, `package.json`, `tsconfig.json` 변경

다음은 빌드 불필요 (안전):
- `docs/` 만 변경
- `public/` 안 이미지·자원만 추가 (코드 무변경)
- `terminal-log.md` 같은 자동 로그

빌드 통과 기준:
```bash
npm run build 2>&1 | grep -E "Compiled|TypeScript|Failed|error|Generating static pages using"
```
출력에 `✓ Compiled successfully` + `Finished TypeScript` + `✓ Generating static pages using` 모두 보이면 통과.

## 7) `git diff` / `git status` 확인 기준

커밋 직전 항상:

```bash
git status --short              # 변경 종류·파일 수
git diff --cached --stat        # 스테이지된 변경 통계
git diff --cached --name-only | grep -v "^docs/"  # docs 외 변경 검토
```

- **의도하지 않은 변경**이 스테이지에 섞이지 않았는지
- `public/blog/`, `terminal-log.md`, `public/sitemap.xml`, `sitemap.xml` 같은 **자동 생성물**은 보통 커밋에서 제외 (prebuild가 재생성)
- `D` 상태의 미참조 디자인 mockup 파일들은 본 작업과 별도로 분리

## 8) 커밋 전 확인사항

- [ ] 작업이 [`protected-areas.md`](protected-areas.md)와 충돌하지 않는지
- [ ] `npm run build` 통과 (코드 변경이 있는 경우)
- [ ] 의도하지 않은 파일이 스테이지에 섞이지 않았는지
- [ ] `git diff --cached --stat`으로 변경 규모 확인
- [ ] 비밀 키·env 값이 코드/문서에 노출되지 않았는지
- [ ] 커밋 메시지가 의미 있는지 (단순 "update" 금지)
- [ ] `Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>` 포함

## 9) 푸시 전 확인사항

- [ ] `git log --oneline origin/main..HEAD` 로 푸시할 커밋들 확인
- [ ] 푸시 시 Vercel 자동 배포 트리거됨 (2~4분 소요)
- [ ] 운영 도메인 검증 가능한 시간 확보

## 10) 위험 신호 (감지 시 즉시 중단)

다음이 보이면 작업 중단하고 사용자에게 보고:

- ❌ `git add -A` 또는 무차별 staging
- ❌ 보호 영역의 코드 시그니처가 바뀌어 있음
- ❌ `NEXT_PUBLIC_SITE_URL` 또는 canonical 호스트가 yourtarot.cc 외로 변경
- ❌ 빌드 실패 + 원인 불명
- ❌ 운영 URL이 갑자기 404/500
- ❌ Vercel·Cloudflare 설정 의도치 않은 변경
- ❌ Supabase RLS 정책 변경
- ❌ 광고 슬롯 UI를 AdSense 심사 통과 전에 배치
- ❌ 의도하지 않은 이미지·파일 일괄 삭제 staged

## 11) 작업 종료 후 정리

- [ ] 변경된 파일 목록 요약
- [ ] 새 문서가 생겼다면 `docs/README.md` 인덱스에 추가
- [ ] 운영 검증 결과 사용자 보고
- [ ] 추가 후속 작업이 필요하면 [`roadmap.md`](roadmap.md)에 메모

## 12) 관련 문서

- [`README.md`](../README.md) — 전체 인덱스
- [`current-status.md`](current-status.md) — 운영 스냅샷
- [`protected-areas.md`](protected-areas.md) — 보호 영역 상세
- [`../setup/deployment.md`](../setup/deployment.md) — 배포 흐름
- [`../setup/environment-variables.md`](../setup/environment-variables.md) — env 카탈로그
- [`../troubleshooting/build-errors.md`](../troubleshooting/build-errors.md) — 빌드 오류 대응
