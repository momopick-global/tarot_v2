# GTM · GA4 · AdSense

## 로딩 위치

`src/app/layout.tsx`의 `<head>`:
```tsx
<GoogleTagManagerHead />        ← GTM dataLayer + gtm.js 로드
<GoogleAdSenseScript />         ← AdSense 로더 (광고 슬롯은 별도)
```

## GTM 컨테이너

- 기본 ID: **`GTM-MGCK6P97`** (`src/components/GoogleTagManager.tsx`의 fallback)
- env `NEXT_PUBLIC_GTM_ID`로 덮어쓸 수 있음
- GA4 태그는 GTM 컨테이너 안에서 관리 (코드 직접 호출 없음)

## AdSense

- Publisher ID: `ca-pub-2758905830381994`
- 로더 스크립트만 적용 (광고 슬롯 UI 미배치)
- `ads.txt`: `google.com, pub-2758905830381994, DIRECT, f08c47fec0942fa0`

## dataLayer 이벤트 카탈로그

진원지: `src/lib/gtmEvents.ts`

### 타로 관련 (기존 5개)

| 이벤트 | 파라미터 |
|---|---|
| `card_select` | `cardIndex, masterName, cardName, resultType, platform` |
| `result_view` | `resultType, masterName, platform` |
| `share_click` | `platform` (`kakao`/`facebook`/`x`/`link_copy`) |
| `tarot_category_click` | `categoryName` |
| `tarot_submenu_click` | `categoryName, menuTitle, menuSlug` |

### 심리테스트 관련 (5개)

| 이벤트 | 파라미터 |
|---|---|
| `psych_test_list_view` | `pagePath` |
| `psych_test_start` | `testSlug, testTitle, pagePath` |
| `psych_option_select` | `testSlug, testTitle, optionId, optionTitle, resultId, resultTitle, pagePath` |
| `psych_result_view` | `testSlug, testTitle, resultId, resultTitle, pagePath` |
| `psych_share_click` | 위 + `platform` |

## dataLayer 확인 방법

```js
// 모든 push 이력
window.dataLayer

// 심리테스트 이벤트만 필터
window.dataLayer.filter(e => e.event?.startsWith("psych_"))

// 타로 이벤트만 필터
window.dataLayer.filter(e => e.event && (
  e.event.startsWith("tarot_") ||
  ["card_select","result_view","share_click"].includes(e.event)
))
```

## 새 이벤트 추가 원칙

1. `src/lib/gtmEvents.ts`에 **신규 helper 함수 추가** (기존 함수 변경 금지)
2. 컨텍스트별 prefix 사용 (`psych_*`, `tarot_*`, 그 외는 사용 빈도 보고 결정)
3. 호출 시 옵셔널 prop 패턴 (ShareSection의 `onShare`처럼 기존 호출 무영향)
4. GTM 컨테이너에서 트리거·태그 설정 후 운영 검증

## CSP·인앱 브라우저

- AdSense·GTM 스크립트는 raw `<script>` 태그로 head에 직접 들어감
- 정적 export(`output: "export"`) 환경에서 `next/script`의 `beforeInteractive`가 동작하지 않아 raw 태그가 더 안정적
- 카카오 인앱 브라우저에서도 정상 로드 확인됨

## 정책 페이지 명시

`/privacy-policy` 본문 섹션:
- 섹션 4 — Google Analytics·GTM
- 섹션 5 — Google AdSense
- 섹션 7 — 제3자 서비스 (Google·Kakao·Supabase)
