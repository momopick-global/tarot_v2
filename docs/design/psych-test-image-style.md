# 심리테스트 이미지 스타일

## 톤 키워드

- **몽환적인 타로풍 감성 일러스트**
- 부드러운 파스텔 톤 + 은은한 골드 액센트
- 인물 표정이 잘 보이는 중간 클로즈업
- 연애·썸·자기 감정이 드러나야 함
- 실사보다 일러스트 우선
- 이미지 안 글자 없음

## 필수 사양

| 항목 | 기준 |
|---|---|
| 비율 | **1:1 정사각형** |
| 권장 크기 | 1024×1024 |
| 형식 | webp |
| 글자 | 없음 |
| 로고 / 워터마크 | 없음 |
| 인물 위치 | 중앙 클로즈업 |

## 이미지별 의미

### 목록 카드 썸네일 (`thumb.webp`)

- 테스트 전체를 대표하는 시각
- 옵션 4개의 평균 톤 + 인물 분위기

### OG 이미지 (`og.webp`)

- 공유 시 카카오톡·페이스북·X 미리보기
- 1200×630 권장이지만 1:1 1024×1024도 가능 (분기 정책 + Kakao 호환을 위해 jpg/png 별도 권장)
- 현재 운영: `thumb.webp` 와 동일 파일 복사본 사용

### 옵션 이미지 4장 (`options/option-1.webp` ~ `option-4.webp`)

- 각 보기의 표정·행동을 시각화
- 좌상단에 자동으로 번호 배지(1·2·3·4) 오버레이 — 이미지 안에 번호 합성 금지

### 결과 이미지 4장 (`results/result-{1..4}.webp`)

- 결과 타입을 상징
- 예시 (love-style):
  - result-1: 햇살, 외향, 적극 (태양처럼)
  - result-2: 달빛, 차분, 기다림 (달처럼)
  - result-3: 별, 무심한 척, 장난 (별처럼)
  - result-4: 안개, 깊은 상상 (안개처럼)

## 톤 통일성

같은 테스트의 10장 (thumb·og·options 4·results 4)은 한 일러스트레이터/한 톤으로 통일.
다른 테스트로 넘어갈 때 톤이 바뀌어도 됨.

## 폴더 구조

```
public/images/psych-tests/{testSlug}/
├── thumb.webp
├── og.webp
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

## 404 fallback

이미지 누락 시:
- 카드의 부모 div가 `bg-gradient-to-br from-[#3b1e6e] via-[#1c0c3a] to-[#100422]` 그라데이션
- `<img onError>` 가 자체 숨김 처리
- "이미지 준비중" 텍스트는 dev/staging 용 — 운영에서는 노출되지 않게 모든 이미지 채워두기
