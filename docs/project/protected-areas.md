# 보호 영역 (Do-Not-Touch)

> 운영 안정성을 위해 아래 영역은 **신규 작업 시 직접 수정하지 마세요**. 꼭 필요한 경우 *optional prop 확장* 또는 *모듈 분리* 로만 영향이 가도록 합니다.

## 1. 타로 라우트·로직

| 영역 | 경로 |
|---|---|
| 타로 카드 플로우 | `src/app/tarot/{start,draw,reveal,analyze,result}/page.tsx` |
| 카테고리 서브메인 | `src/app/menu/[category]/page.tsx`, `src/app/menu/[category]/[slug]/page.tsx` |
| 카드 선택 컴포넌트 | `src/components/CardSwipeDeck.tsx`, `CardInteractionBoard.tsx`, `FlowScene.tsx` |
| 마스터·카드 자원 | `src/lib/masterCardAssets.ts`, `src/lib/flowData.ts` |
| 결과 해석 로직 | `src/lib/resolveCardReading.ts`, `src/lib/cardReadingTypes.ts` |
| 저장 로직 | `src/lib/savedReadings.ts`, `src/lib/tarotResultsDb.ts`, `src/lib/tarotCloudInsertOnce.ts` |

## 2. 로그인·인증

| 영역 | 경로 |
|---|---|
| 로그인 페이지 | `src/app/login/page.tsx`, `src/app/auth/callback/page.tsx` |
| 인증 훅 | `src/hooks/useUser.ts` |
| Supabase 클라이언트 | `src/lib/supabase.ts` |
| OAuth 에러 메시지 | `src/lib/oauthErrors.ts` |
| 인증 후 리턴 경로 | `src/lib/authReturnPath.ts` |
| 인증 리다이렉트 컴포넌트 | `src/components/AuthReturnRedirect.tsx` |

## 3. 카카오 공유 인프라

| 영역 | 경로 |
|---|---|
| 공유 라이브러리 | `src/lib/share.ts` |
| Kakao SDK 로더 | `src/lib/kakaoShareSdk.ts` |
| 공유 UI | `src/components/ShareSection.tsx` (옵셔널 `onShare` prop 만 확장 허용) |
| 결과 액션 버튼 | `src/components/ResultActionButtons.tsx` |

## 4. 기존 GTM·GA4 이벤트 (10개)

코드에서 이미 발화 중인 이벤트 이름과 파라미터는 변경하지 마세요. GTM 컨테이너 안의 트리거·태그 설정과 1:1로 연결돼 있습니다.

| 이벤트 | 발화 위치 | 주요 파라미터 |
|---|---|---|
| `card_select` | 카드 뽑기 확정 | `cardIndex`, `masterName`, `cardName`, `resultType`, `platform` |
| `result_view` | 결과 페이지 진입 | `resultType`, `masterName`, `platform` |
| `share_click` | 공유 버튼 클릭 | `platform` (`kakao`/`facebook`/`x`/`link_copy`) |
| `tarot_category_click` | 상단 카테고리 탭 클릭 | `categoryName` |
| `tarot_submenu_click` | 카테고리 서브메뉴 카드 클릭 | `categoryName`, `menuTitle`, `menuSlug` |
| `psych_test_list_view` | `/psych-tests` 진입 | `pagePath` |
| `psych_test_start` | 목록 카드 클릭 | `testSlug`, `testTitle`, `pagePath` |
| `psych_option_select` | 옵션 카드 클릭 | `testSlug`, `testTitle`, `optionId`, `optionTitle`, `resultId`, `resultTitle`, `pagePath` |
| `psych_result_view` | 결과 페이지 진입 | `testSlug`, `testTitle`, `resultId`, `resultTitle`, `pagePath` |
| `psych_share_click` | 결과 공유 버튼 | + `platform` |

자세한 헬퍼: `src/lib/gtmEvents.ts`

## 5. 빌드·배포 인프라

- `next.config.ts` (`output: "export"` 설정)
- `scripts/generate-blog.js`, `scripts/write-sitemap-xml.cjs` (prebuild)
- `vercel.json`
- `.github/workflows/github-pages.yml` (백업용)

## 6. 운영 캐논 도메인

- `NEXT_PUBLIC_SITE_URL=https://yourtarot.cc` (apex)
- canonical/OG/sitemap 모두 비-www 기준
- 변경하지 마세요. (이전에 한 번 www로 전환 시도 후 `52a5e66` 으로 환원한 이력 있음)

## 새 작업 원칙

1. **기존 컴포넌트 시그니처 변경 금지** — 필요한 경우 *optional prop* 만 추가
   - 예: `ShareSection`에 `onShare?: (platform) => void` 추가 — 기존 호출은 그대로
2. **새 기능은 모듈 단위로 분리** — 새 파일·새 라우트·새 helper
   - GTM 이벤트도 prefix 분리(`psych_*`, `tarot_*`)로 충돌 회피
3. **빌드 검증 필수** — `npm run build` 통과 후 커밋
4. **정적 export 호환** — 동적 SSR/`generateStaticParams` 빠뜨림 금지
5. **자원만 추가하는 변경**도 git 추적 확인 — untracked webp가 깨진 이미지를 만든 사례 있음 (`0d18b55` 참고)

## 이번 작업이 보호 영역과 충돌하면?

1. 충돌을 명시적으로 보고하고 다른 접근을 제안
2. 사용자 명시적 허가 없이는 진행 금지
3. 변경 시 영향 범위를 진단·검증 가능한 단위로 분리
