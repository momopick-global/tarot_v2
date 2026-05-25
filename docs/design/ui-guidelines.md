# UI 가이드라인

## 핵심 원칙

1. **카드형 UI 중심** — 클릭/탭 영역이 카드로 통일됨
2. **모바일 390px 기준 확인 후 디자인 결정**
3. **버튼은 명확하고 터치하기 쉬워야 함** (높이 44px+ 권장)
4. **CTA는 눈에 잘 띄게** (브랜드 보라 + 흰 글자 + glow)
5. **기존 컴포넌트 스타일 우선 재사용** — 새 패턴 도입은 신중히
6. **여백·라운드·그림자 일관성 유지**

## 자주 쓰는 컴포넌트 패턴

| 컴포넌트 | 용도 |
|---|---|
| `CategoryTabs` | 상단 1뎁스 메뉴 (5 카테고리 + 심리테스트) |
| `HomeCategoryCarousel` | 홈 히어로 carousel |
| `TarotSubmenuCard` | 카테고리 서브메뉴 카드 (정사각형 라운드) |
| `PsychTestListCard` | 심리테스트 목록 카드 |
| `PsychTestOptionCard` | 심리테스트 옵션 2x2 카드 (번호 배지) |
| `PsychResultClient` | 결과 페이지 클라이언트 (useEffect + Share) |
| `ShareSection` | 공유 버튼 그룹 |
| `MarkdownArticle` | 정책 페이지 마크다운 렌더링 |
| `MasterIntroPopup`, `CardGuidePopup`, `MasterIntroPopup` | 모달·팝업 |
| `InAppBrowserNotice` | 카카오 인앱 안내 |
| `BottomNav`, `Header`, `Footer` | 사이트 기본 chrome |

## 새 UI 추가 시 체크

- [ ] 기존 컴포넌트로 표현 불가능한지 먼저 검토
- [ ] 컬러는 `bg-btn-primary`, `text-text-muted` 등 디자인 토큰 사용
- [ ] 라운드/보더/그림자 스케일을 기존 패턴과 맞춤
- [ ] 모바일 390px 컨테이너에서 깨지지 않는지
- [ ] sr-only / aria-label 등 접근성 속성

## 라운드·여백 스케일

| 사이즈 | Tailwind 클래스 | 사용처 |
|---|---|---|
| 작은 컨트롤 | `rounded-md` / `rounded-lg` | 작은 버튼, 인풋 |
| 카드 | `rounded-xl` ~ `rounded-2xl` | 옵션 카드, 콘텐츠 카드 |
| 풀폭 컨테이너 | `rounded-2xl` | 결과 카드, 큰 박스 |

여백:
- 페이지 좌우 패딩: `px-5`
- 섹션 사이: `mt-6` ~ `mt-10`
- 카드 내부: `p-4` ~ `p-5`

## CTA 버튼 스타일

```tsx
// Primary
className="rounded-xl bg-btn-primary px-4 py-3 text-center text-sm font-semibold text-white"

// Secondary
className="rounded-xl border border-primary bg-surface px-4 py-3 text-center text-sm font-semibold text-text-muted"
```

## 모달·팝업

- 배경 dim: `bg-black/55` ~ `bg-black/70`
- z-index 계층:
  - 일반 모달/팝업: 40 ~ 50
  - BottomNav: 9999
  - 인앱 브라우저 안내: 10000~10001

## sr-only 활용

이미지 위에 의미 있는 텍스트가 필요하지만 시각적으로 가리고 싶을 때:
- `<h2 className="sr-only">{title}</h2>` 패턴
- SEO·스크린리더 정상, 시각만 1×1 px 클리핑
- 적용 사례: `HomeCategoryCarousel`, `TarotSubmenuCard` (카드 아래 제목)
