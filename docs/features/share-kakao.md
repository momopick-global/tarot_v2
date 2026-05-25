# 카카오 공유 (및 멀티 플랫폼)

## 공유 인프라

| 파일 | 역할 |
|---|---|
| `src/lib/share.ts` | 공유 로직 (`shareToKakao`, `shareToFacebook`, `shareToX`, `copyShareUrl`) |
| `src/lib/kakaoShareSdk.ts` | Kakao JavaScript SDK 로더 (지연 로딩) |
| `src/components/ShareSection.tsx` | 공통 공유 버튼 UI (링크/카카오/페이스북/X) |
| `src/components/ResultActionButtons.tsx` | 타로 결과 액션 (이미지 저장·저장·공유) |

## 환경변수

| 변수 | 용도 | 미설정 시 |
|---|---|---|
| `NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY` | Kakao SDK 피드 미리보기 공유 | `sharer.kakao.com` 링크-only fallback |

## ShareSection 사용

```tsx
<ShareSection
  shareUrl={absoluteUrl}            // 공유 대상 URL
  shareTitle={…}                    // og:title 호환
  shareDescription={…}              // og:description 호환
  shareImageUrl={absoluteUrl}       // og:image — jpg/png 권장 (Kakao 호환)
  onShare={(platform) => { … }}     // optional — psych_share_click 등 추가 이벤트
/>
```

### `onShare` 콜백 (선택 prop)

- 기존 호출은 `onShare`를 전달하지 않아 **타로 결과 페이지·홈 영향 없음**
- 심리테스트 결과는 `PsychResultClient.tsx`에서 `onShare`로 `trackPsychShareClick()` 호출

## 두 가지 공유 컨텍스트의 차이

| 컨텍스트 | 발화 이벤트 |
|---|---|
| 타로 결과 페이지 | `share_click` (lib/share.ts 내부의 `trackShareClick`) |
| 심리테스트 결과 페이지 | `share_click` + 추가로 `psych_share_click` (PsychResultClient의 `onShare`) |

두 이벤트가 함께 발화하는 게 정상입니다.

## 카카오 SDK 로딩 정책

- SDK는 **공유 버튼 클릭 순간에만 로드** (성능 비용 최소화)
- env 키 없으면 SDK 로드 시도조차 안 함 → 링크 fallback
- 자세한 동작: `src/lib/kakaoShareSdk.ts`

## OG 이미지 카카오 호환

- 카카오톡 미리보기는 webp를 일부 환경에서 무시할 수 있음
- 권장: jpg/png OG 이미지를 별도 경로(`/images/og/blog/{slug}.jpg`)로 관리
- 블로그 generator `resolveOgImage()` 는 og 경로를 먼저 탐색

## 인앱 브라우저 안내

`src/components/InAppBrowserNotice.tsx`:
- 카카오톡·인스타·페이스북·라인 등 인앱 브라우저 감지
- "외부 브라우저로 열기" CTA → Android intent / iOS scheme
- sessionStorage로 세션당 1회만 노출

자세한 가이드: [troubleshooting/kakao-inapp-browser.md](../troubleshooting/kakao-inapp-browser.md)

## 보호 영역

전체가 [protected-areas.md](../project/protected-areas.md)의 "카카오 공유 인프라" 항목.

기존 컴포넌트 시그니처 변경 금지 — 추가는 옵셔널 prop만.
