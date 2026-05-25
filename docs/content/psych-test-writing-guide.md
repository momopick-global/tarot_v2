# 심리테스트 문구 작성 가이드

## 구조

1문항 4선택 4결과를 기본으로 함 (`src/data/psychTests.ts`의 `PsychTest` 타입):

```
title          ← 테스트 전체 제목 (목록·상세 페이지 h1)
subtitle       ← 부제목 (상세 페이지)
cardDescription ← 목록 카드 설명
question       ← 질문 본문
questionDescription ← 질문 부연 설명
options[4]     ← 보기 4개
results[4]     ← 결과 4개
```

## 질문 작성

- 직관적이고 짧게 — 1문장 권장
- 사용자가 1초 안에 자신과 매핑할 수 있어야 함
- 예: "좋아하는 사람이 생겼을 때, 당신과 가장 가까운 모습은?"

질문 부연 설명은 2~3문장으로:
- 이 선택이 무엇을 보여주는지
- 결과의 성격 예고
- 너무 무겁지 않게

## 선택지 (옵션) 작성

각 옵션:
- `title`: 행동·태도 한 줄 (15자 내외)
- `description`: 풀어쓴 한 문장

좋은 예:
```
title: 먼저 연락하고 자주 표현한다
description: 마음이 생기면 숨기기보다 자연스럽게 티를 내는 편이다.
```

## 결과 작성

각 결과:
- `title`: 감성적이고 공유하기 좋은 이름
  - "태양처럼 다가가는 사랑", "달빛처럼 지켜보는 사랑"
- `body`: **최소 250~500자 권장**

본문(`body`) 구성:
1. 성향 묘사 (1~2문장)
2. 장점 (1문장)
3. 주의점 (1문장)
4. 작은 조언 (1문장)

## 결과별 균형

4개 결과가 서로 가치 차이 없게:
- "이 결과만 좋은 결과처럼" 보이지 않도록
- 모든 타입에 장점과 주의점 균형

## 공유 문구 템플릿

테스트 단위로 `shareDescriptionTemplate` 정의. `{result}` 자리에 결과 제목 치환:

```
"나는 '{result}' 타입이래요. 당신의 연애 성향도 확인해보세요."
```

이 패턴이 카카오톡·페이스북·X 공유 시 og:description으로 자동 사용됨.

## SEO 메타

`makeMenu()` 헬퍼가 다음을 자동 생성:
- `metaTitle = "${title} | 유어타로"`
- `metaDescription = "${description} 유어타로에서 지금 나에게 필요한 타로 메시지를 확인해보세요."`
- `shareTitle = title`
- `shareDescription = description`

→ 작성자는 핵심 필드만 작성하면 됨.

## 면책 문구

상세 페이지 "테스트 안내" 박스 + 결과 페이지 하단에 다음과 같은 면책:

> 본 테스트/결과는 자기 이해를 돕기 위한 콘텐츠이며 의학·심리학적 진단을 대체하지 않습니다.

코드에 이미 포함됨. 새 테스트 추가 시 별도 작성 불필요.

## 키워드 (`metaKeywords`)

자연스러운 한국어 연관어 + 영문 일부 (검색 의도 반영):
```
연애 심리테스트, 사랑 심리테스트, 연애 성향 테스트, 썸 테스트, 이상형 테스트…
```

## 새 테스트 추가 워크플로

1. 4 옵션 / 4 결과 본문 작성
2. `src/data/psychTests.ts`의 `PSYCH_TESTS` 배열에 `makeMenu({…})` 추가
3. 이미지 10장 준비 ([design/psych-test-image-style.md](../design/psych-test-image-style.md))
4. `scripts/write-sitemap-xml.cjs`의 `PSYCH_TESTS` 동기화
5. `npm run build` 검증
