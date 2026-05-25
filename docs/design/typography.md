# 타이포그래피

## 폰트 스택

`src/app/globals.css` body:
```
ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"
```

별도 웹폰트 미사용 — 시스템 폰트가 한국어 가독성 최선.

## 사이즈 토큰 (`:root` 변수)

| 토큰 | 값 | 매핑 |
|---|---|---|
| `--ds-font-base` | `17px` | body 기본, `text-base` |
| `--ds-font-sm` | `15px` | `text-sm` |
| `--ds-font-md` | `18px` | `text-md` (커스텀 유틸) |
| `--ds-font-lg` | `20px` | `text-lg` |
| `--ds-font-xl` | `22px` | `text-xl` |
| `--ds-font-2xl` | `24px` | `text-2xl` |
| `--ds-font-3xl` | `27px` | `text-3xl` |

> 이전에 `base=18 / sm=18 / xl=24 / 2xl=26 / 3xl=30` 이었으나, 카카오 인앱 브라우저에서 글자가 과하게 커 보이는 이슈로 5~10% 축소(`base=17 / xl=22 / 2xl=24 / 3xl=27`). 추가 정밀 조정은 컴포넌트별로 진행.

## 컴포넌트별 권장

| 컴포넌트 | 클래스 |
|---|---|
| 페이지 h1 | `text-xl font-semibold text-white` (22px) |
| 섹션 h2 | `text-md font-semibold text-white` (18px) |
| 본문 p | base 17px (별도 클래스 없음) 또는 `text-sm leading-relaxed text-text-muted` (15px) |
| 보조 텍스트 | `text-sm text-text-sub` 또는 `text-xs text-text-sub` |
| CTA 버튼 | `text-sm font-semibold` (15px) |
| 카드 제목 | `text-md font-semibold text-white` |
| 동그라미 번호 배지 | `text-sm font-bold text-white` |

## 줄간격

- 본문 한글: `leading-relaxed` (1.625) ~ `leading-[1.7]`
- 제목: `leading-tight` ~ 명시 `leading-[30px]`
- 카드 내부 작은 텍스트: `leading-snug` (1.375)

## 카카오 인앱 브라우저 주의

- iOS 카카오 인앱에서 자동 텍스트 확대 발생 → `html` 에 `-webkit-text-size-adjust: 100%` 적용 (이미 globals.css)
- 일부 인앱 브라우저에서 `clamp()` + `vw` 단위 사이즈 해석이 다르게 동작 → **컨테이너 폭이 390px 고정**인 곳에서는 정적 rem 값 우선
- 자세한 이슈: [troubleshooting/kakao-inapp-browser.md](../troubleshooting/kakao-inapp-browser.md)

## 한글 줄바꿈

- `word-break: keep-all` (globals.css body)
- `overflow-wrap: anywhere` 보강
- 단어 단위 줄바꿈으로 어색한 단어 잘림 방지

## 변경 시 주의

- 토큰 값 변경은 사이트 전체에 즉시 영향
- 모바일 폭(360/390/430px)에서 가독성 회귀 확인 필요
- 카카오 인앱·iOS Safari·Chrome 모바일에서 글자 크기 거의 같은지 비교
