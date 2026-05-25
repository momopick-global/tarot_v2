# 심리테스트 추가 템플릿

> 새로운 심리테스트 1개를 추가할 때 따라야 할 표준 템플릿입니다. 데이터·이미지·SEO·이벤트까지 일관되게 한 번에 준비할 수 있도록 정리했습니다.

## 1) 1문항 4선택 구조

기본 단위:

```
1 테스트
  ↓
1 질문
  ↓
4 옵션 (사용자 선택)
  ↓
4 결과 (각 옵션 → 1 결과 매핑)
```

진원지: `src/data/psychTests.ts` 의 `PSYCH_TESTS` 배열에 `makeMenu({...})` 형태로 1개 항목 추가.

## 2) 질문 문구 작성법

- **1문장 / 15~40자 내외**
- 직관적, 즉시 답을 떠올릴 수 있어야 함
- 예: "좋아하는 사람이 생겼을 때, 당신과 가장 가까운 모습은?"
- 회피: 이중 부정, 길고 추상적, 도덕적 판단 유도

## 3) 질문 하단 설명 문구

- 2~3문장
- 이 선택이 무엇을 보여주는지 한 줄
- 결과 흐름 예고 한 줄
- 너무 무겁지 않게, 가벼운 호기심 유발

예시:
```
이 선택은 당신이 사랑 앞에서 어떤 에너지로 움직이는 사람인지 보여줍니다.
카드처럼 드러나는 당신의 연애 성향을 다음 페이지에서 확인해보세요.
```

## 4) 선택지 4개 작성법

각 옵션 필드:
- `id`: `option-1` ~ `option-4`
- `resultId`: 연결될 결과의 id (`result-1` 등)
- `title`: 행동·태도 한 줄 (10~20자)
- `description`: 풀어쓴 한 문장 (20~40자)
- `image`: `options/option-N.webp`

좋은 예:
```ts
{
  id: "option-1",
  resultId: "result-1",
  title: "먼저 연락하고 자주 표현한다",
  description: "마음이 생기면 숨기기보다 자연스럽게 티를 내는 편이다.",
  image: "/images/psych-tests/love-style/options/option-1.webp",
}
```

옵션 간 가치 차이 없게 — "이 옵션을 골라야 좋다"는 인상 금지.

## 5) 결과 4개 작성법

각 결과 필드:
- `id`: `result-1` ~ `result-4`
- `title`: 감성적이고 공유하기 좋은 이름 (15자 내외)
- `body`: 본문 — **250~500자 권장**
- `image`: `results/result-N.webp`

### 결과 본문 구조

```
1. 성향 묘사   (1~2문장)
2. 장점       (1문장)
3. 주의점     (1문장)
4. 작은 조언   (1문장)
```

### 결과 본문 권장 글자수

| 길이 | 평가 |
|---|---|
| 200자 미만 | 너무 짧음, 가치 떨어짐 |
| **250~500자** | ✅ 권장 범위 |
| 600자+ | 길어도 OK, 모바일 가독성만 확보 |

### 4개 결과 균형

- 각 타입에 장점·주의점 모두 포함
- "이 결과만 정답" 인상 금지
- 결과명 톤 통일 (예: love-style은 "○○처럼 ○○하는 사랑" 패턴 4개 일관)

## 6) 이미지 경로 규칙 (총 10장)

```
public/images/psych-tests/{testSlug}/
├── thumb.webp           # 목록 카드 (1:1, 1024×1024)
├── og.webp              # OG 공유 이미지 (1:1, 1024×1024)
├── options/
│   ├── option-1.webp    # 옵션 카드 (1:1)
│   ├── option-2.webp
│   ├── option-3.webp
│   └── option-4.webp
└── results/
    ├── result-1.webp    # 결과 이미지 (1:1)
    ├── result-2.webp
    ├── result-3.webp
    └── result-4.webp
```

> ⚠️ 10장 모두 git에 명시적으로 `git add` 하세요. untracked 상태로 두면 운영 배포되지 않습니다 (사례: 커밋 `0d18b55`).

## 7) 이미지 프롬프트 작성 규칙

자세한 톤·스타일은 [`docs/design/psych-test-image-style.md`](../design/psych-test-image-style.md).

### 공통 베이스 프롬프트 (영문)

```
1:1 square illustration, soft pastel tones with subtle gold accents,
dreamy mystical mood, gentle warm lighting, medium close-up of a person,
emotion clearly visible on face, mid-twenties Korean appearance,
no text, no logo, no watermark, illustrative not photorealistic,
soft purple and lavender palette with cream highlights, 1024x1024
```

### 옵션 이미지 (각 옵션 행동을 시각화)

- 좌상단에 번호 배지가 자동 오버레이됨 → **이미지 안에 번호 합성 금지**
- 옵션별 행동·태도 차이가 잘 보여야 함
- 예 (love-style):
  - option-1 (적극): "smiling brightly, looking at phone with anticipation"
  - option-2 (관조): "looking down quietly, hands folded, soft melancholy"
  - option-3 (장난기): "smirking playfully, looking away with mock disinterest"
  - option-4 (내향): "gazing into distance, lost in thought, dreamy expression"

### 결과 이미지 (감성 모티프)

- 결과명의 메타포에 맞는 시각 (태양·달·별·안개 등)
- 인물 + 모티프가 함께 보이게
- 예:
  - result-1 (태양처럼): "person bathed in warm sunlight, golden rays"
  - result-2 (달빛처럼): "moonlit serene scene, soft blue tones"
  - result-3 (별처럼): "starry night background, person gazing up"
  - result-4 (안개처럼): "misty atmosphere, dreamy ethereal feel"

### thumb / og

- 4개 옵션의 평균 분위기 + 테스트 키 비주얼
- 1장으로 테스트 전체를 대표할 수 있어야 함

## 8) SEO title / description / OG

### 자동 생성

`makeMenu()` 헬퍼가 다음을 자동 생성:
- `metaTitle = "${title} | 유어타로"`
- `metaDescription = "${description} 유어타로에서 지금 나에게 필요한 타로 메시지를 확인해보세요."`
- `shareTitle = title`
- `shareDescription = description`

### 작성자가 직접 작성하는 필드

```ts
{
  // 핵심 메타
  metaTitle: "사랑할 때 나는 어떤 사람일까? 연애 성향 심리테스트 | 유어타로",
  metaDescription: "좋아하는 사람 앞에서 나는 어떤 모습일까요? 1문항으로 알아보는 연애 성향 심리테스트…",
  metaKeywords: "연애 심리테스트, 사랑 심리테스트, 연애 성향 테스트, 썸 테스트, …",

  // OG (카카오 공유 미리보기)
  ogTitle: "사랑할 때 나는 어떤 사람일까?",
  ogDescription: "카드처럼 드러나는 나의 진짜 연애 성향을 확인해보세요.",

  // 결과 공유 템플릿 — {result} 자리에 결과 제목 치환
  shareDescriptionTemplate: "나는 '{result}' 타입이래요. 당신의 연애 성향도 확인해보세요.",
}
```

### 권장 길이

| 필드 | 길이 |
|---|---|
| `metaTitle` | 30~60자 (브랜드 자동 부착 후) |
| `metaDescription` | 80~160자 |
| `metaKeywords` | 5~10개 (한국어 자연어 + 검색 의도 반영) |
| `ogTitle` | 30자 내외 |
| `ogDescription` | 50~100자 |

## 9) GTM 이벤트 체크리스트

새 테스트가 자동으로 사용하는 이벤트(코드 변경 불필요):

| 이벤트 | 발화 시점 | 검증 |
|---|---|---|
| `psych_test_list_view` | `/psych-tests/` 진입 | dev console에서 `dataLayer.filter(e=>e.event==='psych_test_list_view')` |
| `psych_test_start` | 목록 카드 클릭 | 동일 |
| `psych_option_select` | 옵션 카드 클릭 | + `testSlug, optionId, resultId, resultTitle` 포함 |
| `psych_result_view` | 결과 페이지 진입 | 동일 |
| `psych_share_click` | 결과 공유 버튼 | + `platform` (kakao/facebook/x/link_copy) |

→ 별도 코드 추가 불필요. `PsychTestListCard`, `PsychTestOptionCard`, `PsychResultClient`가 자동 처리.

## 10) 신규 테스트 추가 워크플로 (총 6단계)

1. **데이터 작성**: `src/data/psychTests.ts` 의 `PSYCH_TESTS` 배열에 `makeMenu({...})` 추가
2. **이미지 준비**: `public/images/psych-tests/{newSlug}/` 폴더에 webp 10장 (thumb·og·options 4·results 4)
3. **sitemap 등록**: `scripts/write-sitemap-xml.cjs` 의 `PSYCH_TESTS` 상수에 `{ slug, resultIds: [...] }` 추가
4. **`npm run build`** 통과 확인
5. **로컬 dev에서 결과 페이지 4개 모두 200 응답·OG·JSON-LD 확인**
6. **커밋·푸시** → Vercel 자동 배포 → 운영 검증

## 11) 운영 검증 명령

```bash
SLUG=new-test-slug

# 라우트 응답
for p in "" "/${SLUG}" "/${SLUG}/result-1" "/${SLUG}/result-2" "/${SLUG}/result-3" "/${SLUG}/result-4"; do
  echo -n "/psych-tests${p}/ → "
  curl -sIL "https://yourtarot.cc/psych-tests${p}/" -o /dev/null -w "%{http_code}\n"
done

# 이미지 응답
for img in thumb og options/option-1 options/option-2 options/option-3 options/option-4 \
           results/result-1 results/result-2 results/result-3 results/result-4; do
  code=$(curl -sI "https://yourtarot.cc/images/psych-tests/${SLUG}/${img}.webp" -o /dev/null -w "%{http_code}")
  echo "  ${img}.webp → $code"
done

# Quiz JSON-LD 임베드 여부
curl -sL "https://yourtarot.cc/psych-tests/${SLUG}/" | grep -oE '"@type":"Quiz"'

# OG 분리 호스트 일관성
curl -sL "https://yourtarot.cc/psych-tests/${SLUG}/result-1/" | grep -oE 'og:image"[^>]+'
```

## 12) 참고 문서

- [`features/psych-tests.md`](../features/psych-tests.md) — 기능 구조
- [`design/psych-test-image-style.md`](../design/psych-test-image-style.md) — 이미지 톤
- [`content/psych-test-writing-guide.md`](psych-test-writing-guide.md) — 글 톤·작성 원칙
- [`content/content-tone.md`](content-tone.md) — 전체 카피 톤
