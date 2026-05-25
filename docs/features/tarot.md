# 타로 기능

## 사용자 플로우

```
홈 / 카테고리 메뉴
   ↓
/menu/{category}            ← 카테고리 서브메인 (6개 메뉴 카드)
   ↓
/menu/{category}/{slug}     ← 서브메뉴 상세 (현재는 stub, CTA로 /tarot/draw 진입)
   ↓
/tarot/start                ← (현재는 / 로 redirect)
   ↓
/tarot/draw?master=…        ← 카드 뽑기 (스와이프)
   ↓
/tarot/reveal               ← 카드 공개
   ↓
/tarot/analyze              ← 해석 로딩
   ↓
/tarot/result               ← 결과
```

## 5개 카테고리 ("○○의 방")

| id | 이름 | 서브메뉴 수 |
|---|---|---|
| `emotion` | 감정의 방 | 6 |
| `relationship` | 관계의 방 | 6 |
| `choice` | 선택의 방 | 6 |
| `destiny` | 운명의 방 | 6 |
| `comfort` | 위로의 방 | 6 |

진원지: `src/lib/categories.ts`, `src/data/tarotMenus.ts`

## 마스터 9명

`src/lib/flowData.ts`의 `FLOW_MASTERS`:
- 01_Sera (세라)
- 02_Kai (카이)
- 03_Morgana (모르가나)
- 04_Noa (노아)
- 05_Erebus (에레보스)
- 06_Serena (세레나)
- 07_Nyx (닉스)
- 08_Clotho (클로토)
- 09_Pipi (피피)

각 마스터: `public/images/masters/{nn_Name}/` 폴더에 `thumb`, `bg_0{slot}`, 카드 이미지

## 핵심 파일

| 파일 | 역할 |
|---|---|
| `src/lib/categories.ts` | 5개 카테고리 정의 + 썸네일 |
| `src/data/tarotMenus.ts` | 30개 서브메뉴 정의 |
| `src/lib/flowData.ts` | 마스터 9명 데이터 |
| `src/lib/masterCardAssets.ts` | 카드/배경/썸네일 경로 헬퍼 |
| `src/lib/resolveCardReading.ts` | 마스터+카드 → 결과 해석 매핑 |
| `src/data/readings/*.json` | 마스터별 카드 해석 JSON |
| `src/lib/cardReadingTypes.ts` | 결과 타입 정의 |
| `src/lib/savedReadings.ts` | 결과 저장 (localStorage + Supabase) |
| `src/lib/tarotResultsDb.ts` | Supabase 결과 DB 헬퍼 |

## GTM 이벤트 (기존)

| 이벤트 | 발화 위치 | 파라미터 |
|---|---|---|
| `card_select` | 카드 뽑기 확정 | `cardIndex`, `masterName`, `cardName`, `resultType`, `platform` |
| `result_view` | 결과 페이지 진입 | `resultType`, `masterName`, `platform` |
| `share_click` | 공유 버튼 | `platform` |
| `tarot_category_click` | 상단 카테고리 탭 클릭 | `categoryName` |
| `tarot_submenu_click` | 카테고리 서브메뉴 카드 클릭 | `categoryName`, `menuTitle`, `menuSlug` |

→ 이벤트 이름·파라미터 절대 변경 금지 (GTM 컨테이너와 1:1 연결)

## 수정 시 주의사항

- `lib/flowData`, `lib/resolveCardReading`, `lib/savedReadings`: [protected-areas.md](../project/protected-areas.md)
- 새 마스터 추가: `FLOW_MASTERS` 배열에 항목 추가 + `public/images/masters/{nn_Name}/` 폴더 생성 + readings JSON 추가
- 새 카테고리 메뉴 추가: `tarotMenus.ts` 의 `TAROT_MENUS` 에 항목 추가 — 페이지 자동 생성
- 카드 해석 변경: `src/data/readings/*.json` 만 수정 (코드 변경 불필요)

## 결과 페이지 컴포넌트

`src/app/tarot/result/page.tsx`:
- 카드 이미지 + 결과 제목·키워드
- 부문별 해석(Section 컴포넌트 6개)
- 공유 (KakaoShareButton + ShareSection)
- 결과 저장 / 다시 뽑기 / 이미지 저장 / 로그인 다이얼로그

## 자세한 데이터 스키마

- [features/data-model.md](data-model.md)
- [features/supabase-tarot-results.md](supabase-tarot-results.md)
