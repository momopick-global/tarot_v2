# 트러블슈팅 — 카카오톡 인앱 브라우저

## 안내 팝업 위치

`src/components/InAppBrowserNotice.tsx`:
- 카카오톡·인스타·페이스북·라인·네이버 인앱·다음 브라우저 감지
- "외부 브라우저로 열기" CTA + "주소 복사하기" + "닫기"
- sessionStorage로 세션당 1회만 노출

## 자주 보는 이슈

### 1. 글자가 너무 크게 보임

원인: iOS 카카오 인앱이 텍스트 자동 확대

해결 (이미 적용됨):
```css
html {
  -webkit-text-size-adjust: 100%;
  -moz-text-size-adjust: 100%;
  text-size-adjust: 100%;
}
```

추가로 폰트 사이즈 토큰 자체를 5~10% 축소 (`docs/design/typography.md` 참고).

### 2. 100vh 깨짐

원인: 카카오 인앱의 동적 viewport 처리

해결 (적용됨): `100vh` → `100dvh` 마이그레이션
- `src/components/SiteFrame.tsx`: `min-h-dvh`
- 메인 hero 등: `max-h-[calc(100dvh-128px)]`

### 3. 가로 스크롤바 잡힘

원인: 일부 인앱 viewport 폭 계산 차이

해결 (적용됨):
```css
body {
  overflow-x: hidden;
  word-break: keep-all;
  overflow-wrap: anywhere;
}
```

### 4. 캐시 우회로도 안 보임

원인: 카카오톡 자체 인앱 캐시는 일반 브라우저보다 더 오래 유지됨

해결:
- 안내 팝업으로 외부 브라우저 유도
- 또는 사용자에게 `?v=2` 같은 캐시 우회 파라미터 안내

### 5. "외부 브라우저로 열기" 가 동작 안 함

**Android**:
- intent URL 사용: `intent://...#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=...;end`
- Chrome 미설치 시 `S.browser_fallback_url` 로 기본 브라우저 폴백
- 일부 인앱은 intent 자체 차단 → 1.5초 후 실패 안내 노출

**iOS**:
- `googlechromes://...` 스킴 시도
- Chrome 미설치 시 페이지가 그대로 — 700ms 후 실패 안내 노출
- Safari 자동 실행은 보장되지 않으므로 "주소 복사 후 직접 열기" 권장

### 6. 공유 미리보기가 안 보임 (카카오톡)

원인:
- Kakao SDK 키 미설정 (`NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY` 없음)
- og:image가 webp만 — 일부 카카오 환경에서 미지원

해결:
- env에 키 설정
- og 전용 jpg/png 이미지 추가 (`/images/og/blog/{slug}.jpg`)

### 7. iOS 카카오 인앱에서 OAuth 로그인 깨짐

원인:
- 카카오 인앱 → 외부 브라우저 전환 흐름이 끊김
- Supabase OAuth redirect URL 검증 실패

해결:
- 인앱 브라우저 안내로 외부 브라우저 유도 (현재 적용)
- Supabase Authentication → URL Configuration → Redirect URL에 `https://yourtarot.cc/` 등록 확인

## 인앱 브라우저 감지 패턴

```ts
const IN_APP_PATTERNS = [
  /KAKAOTALK/i,
  /Instagram/i,
  /FBAN|FBAV|FB_IAB|FBIOS/i,  // Facebook
  /Line\//i,
  /NAVER\(inapp/i,
  /Daum/i,
];
```

## 테스트 방법

DevTools → Network conditions → User agent → Custom:

```
Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 KAKAOTALK 10.0.0
```

→ 새로고침 시 InAppBrowserNotice 즉시 노출되어야 함.

세션 리셋:
```js
sessionStorage.removeItem("inapp-browser-notice-dismissed")
```

## 관련 문서

- [design/typography.md](../design/typography.md)
- [design/layout-mobile.md](../design/layout-mobile.md)
- [features/share-kakao.md](../features/share-kakao.md)
