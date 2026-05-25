# 컬러 시스템

## 디자인 토큰 (`src/app/globals.css` `:root`)

| 토큰 | 값 | 의미 |
|---|---|---|
| `--ds-primary` | `#6f42c1` | 브랜드 보라 |
| `--ds-primary-light` | `#a992e2` | 밝은 보라 (focus ring) |
| `--ds-primary-dark` | `#4e2b8c` | 진한 보라 |
| `--ds-accent` | `#f5c542` | 골드 액센트 |
| `--ds-bg-content` | `#171828` | 콘텐츠 영역 배경 |
| `--ds-bg-outer` | `#1C1D2C` | 페이지 바깥 배경 |
| `--ds-neutral-90` | `#171828` | 어두운 중성 |
| `--ds-neutral-60` | `#666666` | 보조 텍스트 |
| `--ds-neutral-30` | `#bbbbbb` | 비활성 |
| `--ds-neutral-10` | `#f7f7f7` | 라이트 텍스트 |
| `--ds-error` | `#e94444` | 에러 |
| `--ds-success` | `#28a745` | 성공 |

### 텍스트

| 토큰 | 값 |
|---|---|
| `--ds-text-white` | `#f7f7f7` |
| `--ds-text-muted` | `#d8ccff` |
| `--ds-text-sub` | `#b8b3c9` |
| `--ds-text-dim` | `#aa9dce` |
| `--ds-text-highlight` | `#f0e8ff` |
| `--ds-text-pink` | `#ffd1e0` |
| `--ds-text-pink-sub` | `#ff9dbe` |
| `--ds-text-blue` | `#c8e2ff` |
| `--ds-text-blue-sub` | `#7db8ff` |
| `--ds-text-purple-link` | `#8E63FF` |
| `--ds-text-lavender` | `#e0d6ff` |
| `--ds-text-placeholder` | `#999` |

### 버튼·표면·보더

| 토큰 | 값 |
|---|---|
| `--ds-btn-primary` | `#7B3BC7` |
| `--ds-btn-primary-hover` | `#9655e0` |
| `--ds-surface` | `rgba(7, 6, 22, 0.8)` |
| `--ds-surface-light` | `rgba(255, 255, 255, 0.03)` |
| `--ds-surface-light-hover` | `rgba(255, 255, 255, 0.06)` |
| `--ds-border` | `rgba(255, 255, 255, 0.1)` |
| `--ds-border-purple` | `rgba(142, 99, 255, 0.4)` |

## Tailwind 매핑

`@theme inline` 블록에서 위 변수들을 Tailwind utility로 노출:
- `bg-primary`, `text-primary` ← `--ds-primary`
- `bg-bg-content`, `bg-bg-outer`
- `text-text-muted`, `text-text-pink`, …
- `border-ds-border`, `border-ds-border-purple`
- `bg-btn-primary`, `hover:bg-btn-primary-hover`
- `bg-surface`, `bg-surface-light`, `bg-surface-light-hover`

## 그라데이션 (자주 쓰는 조합)

```css
/* 카드 placeholder + 결과 카드 배경 */
background: linear-gradient(to bottom right,
  #3b1e6e,  /* 보라 */
  #1c0c3a,  /* 딥퍼플 */
  #100422   /* 거의 검정 */
);
```

Tailwind:
```
bg-gradient-to-br from-[#3b1e6e] via-[#1c0c3a] to-[#100422]
```

## 사용 원칙

1. 새 색상 추가는 최소화 — 기존 토큰으로 표현 가능한지 먼저 확인
2. 임의의 hex 값은 `text-[#…]` 같이 인라인으로 쓰지 말고 `:root` 토큰으로 승격
3. 어두운 배경 + 보라 brand + 골드 액센트 조합 유지
4. 강한 원색·형광색 자제 (브랜드 톤 깨짐)

## legacy 참고

이전 디자인 토큰 모음: [design-system.md](design-system.md)
