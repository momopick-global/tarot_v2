# 블로그 콘텐츠 점검

**점검 일자**: 2026-05-25 · **데이터 진원지**: `data/blog/*.json` · **이미지 경로**: `public/images/blog/`, `public/images/og/blog/`

## 1) 전체 현황

| 항목 | 값 |
|---|---|
| 총 게시글 수 | **61개** |
| 평균 본문 길이 | **1,878자** |
| FAQ 보유 글 | **61/61 (100%)** |
| 개별 썸네일 보유 글 | 3 / 61 |
| OG 전용 이미지 보유 글 | 0 / 61 |
| description 60자 미만 | 61 / 61 (전부) |
| 본문 400자 미만 | 11 / 61 |

## 2) 카테고리별 분포

| 카테고리 | 글 수 |
|---|---|
| `love` | 21 |
| `life` | 10 |
| `psychology` | 10 |
| `tarot` | 10 |
| `test` | 10 |

## 3) 본문 짧은 글 (< 400자)

검색 CTR·AdSense thin content 관점에서 가장 우선 보강 대상.

| # | 본문 길이 | 카테고리 | 제목 | slug |
|---|---|---|---|---|
| 1 | 99자 | love | 연락이 줄어든 이유 | `male-psychology-no-contact` |
| 2 | 126자 | love | 나를 힘들게 하는 사람 특징 | `toxic-relationship-signs` |
| 3 | 175자 | love | 이별 직후 새 만남이 위험한 이유 | `rebound-relationship-warning` |
| 4 | 177자 | love | 과한 애정 표현이 경고일 때 | `love-bombing-red-flags` |
| 5 | 185자 | love | 감정적으로 닫힌 사람의 특징 | `emotional-unavailability-signs` |
| 6 | 188자 | love | 서로 다른 사랑의 언어일 때 | `love-language-mismatch` |
| 7 | 190자 | love | 질투가 사랑일 때와 불안일 때 | `jealousy-healthy-boundary` |
| 8 | 191자 | love | 불안형 애착이 연애에 미치는 영향 | `attachment-anxiety-in-love` |
| 9 | 201자 | love | 이 관계를 끝내야 할 신호 | `when-to-end-relationship` |
| 10 | 214자 | love | 연애가 항상 실패하는 이유 | `love-failure-pattern` |
| 11 | <400자 추가 1개 | love | (전부 love 카테고리에 집중) | |

→ **11개 모두 love 카테고리**. love 21글 중 절반 이상이 짧은 본문.

## 4) description이 60자 미만인 글

거의 모든 글이 60자 미만 (sitemap·SNS 미리보기 텍스트 너무 짧음). 가장 짧은 사례:

| description 길이 | slug |
|---|---|
| 17자 | `male-psychology-no-contact` |
| 24자 | `toxic-relationship-signs` |
| 26자 | `love-bombing-red-flags` |
| 26자 | `love-pattern` |
| 26자 | `rebound-relationship-warning` |
| 28자 | `love-failure-pattern` |
| 31자 | `jealousy-healthy-boundary` |
| 32자 | `when-to-end-relationship` |
| 34자 | `emotional-unavailability-signs` |
| 34자 | `love-language-mismatch` |

→ description 80~150자로 권장. 검색결과 CTR과 og:description 품질에 영향.

## 5) 썸네일 없는 글 (58/61)

자세한 전체 목록·필요 파일명·저장 경로는 별도 감사 문서 참고:
→ [`docs/content/blog-missing-thumbnails.md`](../content/blog-missing-thumbnails.md)

요약:
| 카테고리 | 누락 |
|---|---|
| love | 18 (21 중) |
| life | 10 |
| psychology | 10 |
| tarot | 10 |
| test | 10 |

보유 (3개): `attachment-anxiety-in-love`, `emotional-unavailability-signs`, `love-failure-pattern`

## 6) OG 전용 이미지 없는 글 (61/61)

`public/images/og/blog/` 폴더는 `.gitkeep` 만 있고 실제 OG 이미지 0개. 현재는 `resolveOgImage()`가 인라인 썸네일 폴백을 거쳐 default thumb webp로 떨어짐.

카카오톡 공유 미리보기 품질을 위해 jpg/png 권장:
- 경로: `/images/og/blog/{slug}.jpg`
- 1200×630 권장, 핵심 시각이 중앙

## 7) 내부 링크 점검

블로그 generator(`scripts/generate-blog.js`)가 글마다 자동 생성:
- 관련 글 2~3개 (슬러그 해시 기반 결정적 셔플) ✅
- 타로 테스트 링크 2개 (`/quiz/love-test`, `/quiz/tarot-reading`) ⚠️ **404 위험** (해당 경로 미구현)
- 카테고리 목록 / 블로그 전체 목록 링크 ✅
- 상하단 "블로그 목록으로 돌아가기" 링크 ✅

> **잠재 리스크**: `QUIZ_LINKS` 의 `/quiz/love-test`, `/quiz/tarot-reading` 경로가 현재 라우트에 없음. 클릭 시 404. 추후 점검 필요 항목.

## 8) FAQ JSON-LD

`faq` 필드가 모든 글에 존재 → `FAQPage` JSON-LD가 헤드에 자동 임베드. 검색 rich result 기회 확보됨.

## 9) 개선 우선순위

### 🔥 P1 (즉시 권장)

1. **본문 < 400자 글 11개 보강**
   - 모두 love 카테고리에 집중
   - 각 600~800자+로 확장
   - 본문에 H3 소제목 1~2개 추가 권장

2. **`QUIZ_LINKS` 404 확인 및 수정**
   - `scripts/generate-blog.js` 의 `QUIZ_LINKS` 상수 점검
   - 미구현 경로면 `/tarot/start` 또는 `/psych-tests/` 등으로 대체

### 🌿 P2 (점진적)

3. **description 80~150자로 확장** (61글 전부)
   - sitemap/OG/검색결과 품질 향상
   - 글 1개당 1~2분 작업

4. **개별 썸네일 webp 추가** (58글)
   - love 카테고리 18글 우선 (가장 많고 본문 짧음 보강과 함께 시너지)
   - 자세한 규칙: [`docs/design/image-guidelines.md`](../design/image-guidelines.md)

### 🍃 P3 (선택)

5. **OG 전용 jpg/png 추가** (61글)
   - 카카오톡 공유 품질 ↑
   - 경로: `/images/og/blog/{slug}.jpg`
   - 자세한 규칙: [`docs/design/asset-paths.md`](../design/asset-paths.md)

## 10) 비교 데이터 (참고)

- 평균 본문 길이 1,878자 — 일반적인 SEO·AdSense 기준에서 양호한 수준
- 짧은 글 11개를 보강하면 평균 ↑ + 약한 글 제거
- 모든 글이 H2/H3 구조와 FAQ를 갖춰 구조적으로는 강함

## 11) 검증 스크립트

본 audit를 재생성하려면:

```bash
node -e "
const fs = require('fs');
const posts = fs.readdirSync('data/blog').filter(f=>f.endsWith('.json'))
  .map(f=>JSON.parse(fs.readFileSync('data/blog/'+f,'utf8')));
function bodyLen(p){return Array.isArray(p.content)?p.content.reduce((s,b)=>{
  if(['p','h2','h3'].includes(b.type))return s+(b.text||'').length;
  if(b.type==='ul'&&Array.isArray(b.items))return s+b.items.reduce((x,i)=>x+i.length,0);
  return s;},0):0;}
posts.forEach(p=>{const len=bodyLen(p);if(len<400)console.log(len+'자 '+p.slug);});
"
```
