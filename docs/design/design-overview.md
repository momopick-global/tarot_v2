# 디자인 방향

## 디자인 키워드

- **몽환적** (Dreamy)
- **신비로운 타로 감성** (mystical, 별빛·달빛 모티프)
- **어두운 배경** (네이비·딥퍼플 기반)
- **은은한 빛** (골드 포인트, glow 효과 절제)
- **과한 점집/공포 톤은 피함** — 캐주얼하고 부드럽게
- **모바일 우선** — 한 손 사용 흐름
- **감성적이지만 깔끔한 UI** — 정보 위계 명확
- **연애·관계·위로 콘텐츠에 어울리는 부드러운 분위기**

## 톤 기준 사례

| 좋은 예 | 피할 예 |
|---|---|
| 별빛 그라데이션 + 카드 클로즈업 | 강한 붉은 조명·해골 모티프 |
| "지금 마음을 비춰보세요" | "당신의 운명을 절대 피할 수 없어요" |
| 파스텔 + 골드 액센트 | 형광색 / 짙은 검정만 |
| 인물의 부드러운 표정 | 무서운 인상의 캐릭터 |

## 컬러 톤

자세히는 [color-system.md](color-system.md) 참고. 핵심:
- 배경: 딥 네이비 / 딥 퍼플
- 카드 표면: 약간 밝은 보라 톤
- 포인트: 보라(brand) + 골드 액센트
- 텍스트: 흰색·연보라·연한 회색

## 타이포

- 한글 시스템 폰트 스택
- 모바일 가독성 최우선 — 너무 큰 글자 회피
- 카카오 인앱 브라우저 환산 사이즈 신경 쓰기 ([typography.md](typography.md))

## 컴포넌트 일관성

같은 패턴 재사용:
- 카드형 UI (옵션 카드, 메뉴 카드, 결과 카드)
- 라운드 `rounded-xl ~ rounded-2xl`
- 보더 `border-ds-border-purple` / `border-white/10`
- 배경 그라데이션 `bg-gradient-to-br from-[#3b1e6e] via-[#1c0c3a] to-[#100422]`
- 그림자 `shadow-[0_8px_24px_rgba(0,0,0,0.35)]`

## 모바일 폭

- 컨테이너 기본 폭 **`max-w-[390px]`**
- 페이지 양옆 패딩 `px-5`
- 옵션 그리드 2×2 또는 1열
- 자세한 폭별 가이드: [layout-mobile.md](layout-mobile.md)

## 이미지 스타일

- 인물 일러스트 (실사보다 일러스트 우선)
- 부드러운 파스텔 + 골드 포인트
- 이미지 안에 글자 없음 / 워터마크 없음
- 자세한 카테고리별 가이드:
  - [tarot-image-style.md](tarot-image-style.md)
  - [psych-test-image-style.md](psych-test-image-style.md)
  - [image-guidelines.md](image-guidelines.md)

## 디자인 시스템 토큰

기존 디자인 토큰 참고: [design-system.md](design-system.md)
