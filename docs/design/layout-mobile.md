# 모바일 우선 레이아웃

## 컨테이너 폭

- **`max-w-[390px]`** — iPhone 표준에 맞춘 사이트 기본 폭
- 전체 사이트(`SiteFrame`)가 자식을 이 폭으로 가운데 정렬
- 페이지 좌우 패딩 일관 `px-5`

## 확인해야 할 폭

| 폭 | 디바이스 |
|---|---|
| `360px` | 구형 안드로이드 |
| `390px` | iPhone 표준 (사이트 컨테이너) |
| `430px` | iPhone Plus/Max |

## 그리드

| 패턴 | 사용처 |
|---|---|
| 1열 | 카테고리 서브메뉴 카드, 블로그 카드 |
| 2×2 | 심리테스트 옵션 카드 |
| 좌우 분할 (`grid-cols-2`) | 결과 페이지 CTA (다시/다른 테스트) |

```tsx
// 메뉴 카드: 1열 통일
<ul className="grid grid-cols-1 gap-6">…</ul>

// 옵션 카드: 2x2
<ul className="mt-6 grid grid-cols-2 gap-3">…</ul>
```

## 헤더·푸터·네비

- Header (sticky/fixed top): 52px + safe-area-top
- BottomNav (fixed bottom): 68px + `env(safe-area-inset-bottom)`
- z-index BottomNav: 9999
- 인앱 안내 팝업: 10000~10001 (BottomNav 위)

## 100dvh 사용

- `100vh` 대신 `100dvh`로 브라우저 chrome 변동 대응
- 메인 hero 영역에 `max-h-[calc(100dvh-128px)]` 적용 (Header 52 + BottomNav 76)
- 자세한 사례: 메인 hero(`src/app/page.tsx`), 카드 선택 페이지

## 카드형 UI 핵심 크기

- 카드 라운드: `rounded-2xl`
- 카드 패딩: `p-3` ~ `p-5`
- 카드 사이 간격: `gap-3` ~ `gap-6`
- 카드 그림자: `shadow-[0_8px_24px_rgba(0,0,0,0.35)]`

## 버튼 터치 영역

- 모든 버튼 높이 최소 **44px** (Apple HIG 권장 44pt)
- CTA: `h-11` 또는 `py-3` 보장
- 아이콘 버튼: 최소 40×40

## 공유·하단 액션

- 하단 고정 시 `bottom: calc(80px + env(safe-area-inset-bottom))`
- BottomNav 와 겹치지 않게 80px 이상 띄움

## 카카오톡 인앱 브라우저

- viewport 크기가 일반 브라우저와 다름 → 100dvh 기준
- 자동 텍스트 확대 차단 (`-webkit-text-size-adjust: 100%` globals.css)
- 자세한 이슈: [troubleshooting/kakao-inapp-browser.md](../troubleshooting/kakao-inapp-browser.md)

## 테스트 체크

새 페이지 추가 시:
- [ ] 360px 폭에서 깨짐 없는지
- [ ] 카카오 인앱(UA override) 에서 텍스트·이미지 정상
- [ ] BottomNav와 하단 CTA 겹치지 않는지
- [ ] 메인 hero/모달 100dvh 환경에서 적절한 높이
