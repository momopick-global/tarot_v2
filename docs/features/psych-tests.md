# 심리테스트 기능

## 라우트

| 경로 | 목적 |
|---|---|
| `/psych-tests/` | 목록 페이지 (인트로 + 카드 + FAQ) |
| `/psych-tests/{testSlug}/` | 상세 (질문 + 4 옵션 카드) |
| `/psych-tests/{testSlug}/{resultId}/` | 결과 (이미지 + 본문 + 공유 + CTA) |

상단 메뉴(`CategoryTabs`)에 "심리테스트" 탭 노출 → `/psych-tests/`로 이동.

## 현재 등록된 테스트

| testSlug | 제목 | 결과 수 |
|---|---|---|
| `love-style` | 사랑할 때 나는 어떤 사람일까? | 4개 |

결과 4개:
- `result-1`: 태양처럼 다가가는 사랑
- `result-2`: 달빛처럼 지켜보는 사랑
- `result-3`: 별처럼 숨기는 사랑
- `result-4`: 안개처럼 깊어지는 사랑

## 데이터 진원지

- `src/data/psychTests.ts` — `PSYCH_TESTS` 배열 (확장 가능)
- 헬퍼: `getPsychTestBySlug`, `getActivePsychTests`, `getPsychTestResult`

### `PsychTest` 타입 필드

```ts
{
  categoryId, categoryName, slug,
  title, shortTitle, description,
  question, questionDescription,
  thumbnail, ogImage,
  options: PsychTestOption[],   // id, resultId, title, description, image
  results: PsychTestResult[],   // id, title, body, image
  metaTitle, metaDescription, metaKeywords,
  ogTitle, ogDescription,
  shareDescriptionTemplate,     // 결과 공유 문구 ("나는 '{result}' 타입이래요…")
  isActive, sortOrder,
}
```

SEO·공유 필드(`metaTitle/metaDescription/metaKeywords/shareTitle/…`)는 `makeMenu()` 헬퍼로 자동 생성됨.

## 이미지 경로 규칙

```
public/images/psych-tests/{testSlug}/
├── thumb.webp                    # 목록 카드 썸네일
├── og.webp                       # OG 이미지
├── options/
│   ├── option-1.webp
│   ├── option-2.webp
│   ├── option-3.webp
│   └── option-4.webp
└── results/
    ├── result-1.webp
    ├── result-2.webp
    ├── result-3.webp
    └── result-4.webp
```

- 정사각형 1:1 권장 1024×1024
- 글자 없음 / 워터마크 없음 (이미지 톤 가이드 → [design/psych-test-image-style.md](../design/psych-test-image-style.md))
- 파일 누락 시 카드의 그라데이션 fallback 노출

## GTM 이벤트 (psych_*)

| 이벤트 | 발화 시점 | 주요 파라미터 |
|---|---|---|
| `psych_test_list_view` | `/psych-tests/` 진입 (useEffect 1회) | `pagePath` |
| `psych_test_start` | 목록 카드 클릭 | `testSlug`, `testTitle`, `pagePath` |
| `psych_option_select` | 옵션 카드 클릭 | `testSlug`, `testTitle`, `optionId`, `optionTitle`, `resultId`, `resultTitle`, `pagePath` |
| `psych_result_view` | 결과 페이지 진입 (useEffect 1회) | `testSlug`, `testTitle`, `resultId`, `resultTitle`, `pagePath` |
| `psych_share_click` | 결과 페이지 공유 버튼 | + `platform` (`kakao`/`facebook`/`x`/`link_copy`) |

브라우저 콘솔 확인:
```js
window.dataLayer.filter(e => e.event?.startsWith("psych_"))
```

## 핵심 컴포넌트

| 파일 | 역할 |
|---|---|
| `src/components/PsychTestListCard.tsx` | 목록 카드 + click 시 `psych_test_start` |
| `src/components/PsychTestOptionCard.tsx` | 옵션 2×2 그리드 카드 (좌상단 1~4 번호 배지) |
| `src/components/PsychTestResultImage.tsx` | 결과 이미지 (404 fallback) |
| `src/components/PsychTestListViewTracker.tsx` | 목록 진입 시 `psych_test_list_view` |
| `src/components/PsychResultClient.tsx` | 결과 페이지 useEffect + ShareSection 래퍼 (`psych_share_click`) |

## 정적 export 패턴

- `/psych-tests/[testSlug]/page.tsx` 와 `[resultId]/page.tsx` 모두 `generateStaticParams` 사용
- `params: Promise<…>` + `await params` (Next 16)
- 결과별 OG title 분리 (`{result.title} — {test.ogTitle}`)
- Quiz JSON-LD 임베드 (상세 페이지)

## 새 테스트 추가 순서

1. `src/data/psychTests.ts`의 `PSYCH_TESTS` 배열에 `makeMenu({…})` 형태로 추가
2. `public/images/psych-tests/{newSlug}/` 폴더 + 이미지 10장 추가 (thumb·og·options 4·results 4)
3. `scripts/write-sitemap-xml.cjs`의 `PSYCH_TESTS` 상수에 `{ slug, resultIds: […] }` 추가
4. `npm run build`로 검증

## 결과 공유 문구 템플릿

```
"나는 '{result}' 타입이래요. 당신의 연애 성향도 확인해보세요."
```

→ `shareDescriptionTemplate` 필드에서 테스트별로 커스터마이즈 가능. `{result}` 자리에 결과 제목이 치환됨.
