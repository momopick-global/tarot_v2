# AdSense 심사 대비 최종 점검 리포트

**점검 일자**: 2026-05-25 · **기준 도메인**: `https://yourtarot.cc` (apex)

> 본 리포트는 결제·작업 일시 중단 직전의 운영 스냅샷입니다. 이후 변경이 생기면 별도 audit 문서로 재작성을 권장.

## 1) 핵심 URL 응답 검증

라이브 환경(`https://yourtarot.cc/...`) 직접 응답 — 308 redirect 따라간 최종 상태 기준.

| 경로 | 응답 | 비고 |
|---|---|---|
| `/privacy-policy` | **200** | 정책 본문 정상 |
| `/contact` | **200** | 문의·이메일·운영 정보 노출 |
| `/terms` | **200** | 12조 본문 정상 |
| `/about` | **200** | 서비스 소개 본문 정상 |
| `/disclaimer` | **200** | 면책 안내 정상 |
| `/ads.txt` | **200** | `Content-Type: text/plain; charset=utf-8`, `pub-2758905830381994` 포함 |
| `/sitemap.xml` | **200** | XML, 140+ URL 등록 |
| `/robots.txt` | **200** | `Allow: /` + Sitemap 라인 |
| `/psych-tests` | **200** | 인트로 + 카드 + FAQ 4개 |
| `/psych-tests/love-style` | **200** | 질문·옵션·Quiz JSON-LD |
| `/menu/emotion` | **200** | 카테고리 카드 6개 |
| `/blog` | **200** | 카드 목록 61개 |

→ **빈 페이지·404·placeholder 없음.**

## 2) Canonical / OG URL 호스트 일관성

모든 페이지의 canonical / og:url / og:image가 `https://yourtarot.cc` (비-www) 호스트로 통일:

| 페이지 | canonical | og:url | og:image |
|---|---|---|---|
| `/` | `https://yourtarot.cc/` | `https://yourtarot.cc/` | `https://yourtarot.cc/og/yourtarot_og_kr2.png` |
| `/privacy-policy/` | `https://yourtarot.cc/privacy-policy/` | 동일 | 기본 OG |
| `/contact/` | `https://yourtarot.cc/contact/` | 동일 | 기본 OG |
| `/psych-tests/` | `https://yourtarot.cc/psych-tests/` | 동일 | 기본 OG |
| `/psych-tests/love-style/` | `https://yourtarot.cc/psych-tests/love-style/` | 동일 | `…/images/psych-tests/love-style/og.webp` |

> sitemap.xml 의 모든 `<loc>` 도 `yourtarot.cc` 단일 호스트로 확인됨.

## 3) 정책 페이지 본문 항목 점검

`/privacy-policy/` 본문(`src/data/policies.ts`)에 다음 키워드 모두 포함:

| 항목 | 노출 횟수 |
|---|---|
| 쿠키 | 30회 |
| Google AdSense | 12회 |
| Google Analytics | 12회 |
| Supabase | 4회 |
| 카카오 공유 | 4회 |

→ AdSense 정책 페이지 필수 항목(쿠키·맞춤형 광고·제3자) 모두 충족.

## 4) 빈 페이지 / 준비중 / 깨진 이미지 점검

- "이미지 준비중" 문자열: 컴포넌트 fallback 로직 안에만 존재. **운영 빌드에서 실제 노출 없음** (모든 참조 이미지가 git에 추적되어 운영 배포됨).
- 깨진 이미지: 직전 작업 `0d18b55` 에서 블로그 default thumb webp 4장 git 추적 → 운영 응답 200 확인 완료.
- 404 링크: 핵심 페이지 11개 모두 200. 푸터/햄버거 메뉴 링크 점검도 200.

## 5) 모바일 UI 리스크

| 항목 | 상태 |
|---|---|
| 컨테이너 폭 `max-w-[390px]` 일관 | ✅ |
| 카카오 인앱 텍스트 자동 확대 차단 (`-webkit-text-size-adjust: 100%`) | ✅ |
| `100dvh` 마이그레이션 (구 100vh 깨짐) | ✅ |
| InAppBrowserNotice 외부 브라우저 안내 | ✅ |
| 폰트 토큰 5~10% 축소 (인앱 글자 크기 통일) | ✅ |
| Hero 영역 `max-h-[calc(100dvh-128px)]` 안전 | ✅ |
| BottomNav 안전영역 처리 | ✅ |

→ 모바일 UX 리스크는 기존 안내·구조로 대응됨.

## 6) AdSense 심사 잔여 리스크

### 🟡 중간

- **블로그 본문이 짧은 글 11개** (< 400자). 가장 짧은 글은 99자.
  → 자세히는 [`docs/seo/blog-content-audit.md`](blog-content-audit.md)
- **블로그 description이 60자 미만** 인 글이 다수 (대부분의 글).
  → 짧지만 본문은 충분한 경우가 많아 결정적 리스크는 아님. 보강 시 검색 CTR ↑

### 🟢 낮음

- 블로그 58/61 게시글 개별 썸네일 없음 — `blog-default-thumb.webp` 일관 fallback. 본문이 있어 결정적 리스크 아님.
- 블로그 61/61 게시글에 OG 전용 이미지 없음 — 카카오 공유 시 webp 썸네일 사용 (일부 환경 호환성 영향). AdSense 심사 직접 리스크 아님.

### ✅ 위험 없음

- 정책·문의·about·terms·disclaimer 5개 모두 존재 + Footer/햄버거 노출
- ads.txt 운영 응답 200·text/plain·정확한 라인
- 광고 슬롯 UI 미배치 (심사 단계 권장)
- AdSense 정책 위반 콘텐츠 없음 (성인·도박 등)

## 7) AdSense 콘솔 "Ads.txt 승인되지 않음" 상태

운영 ads.txt 자체는 100% 정상. 콘솔 표시 지연은 다음 중 하나:
1. **크롤러 재방문 지연** (24h~수일)
2. **사이트 등록 호스트와 redirect 후 호스트의 차이** — AdSense에 `yourtarot.cc` (apex)로 등록 권장
3. **다시 검토 / 재크롤 요청** 버튼 활용

## 8) 권장 후속 작업 (선택)

우선순위 순:

1. 본문이 짧은 11개 블로그 글 보강 (300~600자 → 800자+ 권장)
2. AdSense 콘솔에 사이트 `yourtarot.cc` (apex) 호스트 명시적 등록 확인
3. 카카오 호환 OG 이미지(`/images/og/blog/{slug}.jpg`) 단계적 추가
4. 블로그 개별 썸네일(`/images/blog/{slug}.webp`) 단계적 추가 — [`docs/content/blog-missing-thumbnails.md`](../content/blog-missing-thumbnails.md)

## 9) 검증 명령 모음

```bash
# 핵심 정책 페이지 200
for p in privacy-policy contact terms about disclaimer; do
  echo -n "/$p → "; curl -sIL "https://yourtarot.cc/$p" -o /dev/null -w "%{http_code}\n"
done

# ads.txt
curl -sI https://yourtarot.cc/ads.txt | grep -iE "HTTP/|content-type|content-length"
curl -s https://yourtarot.cc/ads.txt

# sitemap 호스트 일관성
curl -s https://yourtarot.cc/sitemap.xml | grep -oE 'https://[a-z.]+' | sort -u
# 기대: https://yourtarot.cc 만

# AdSense 로더 스크립트 head 임베드
curl -sL https://yourtarot.cc/ | grep -oE '<script[^>]*adsbygoogle[^>]*>'

# Mediapartners-Google UA 차단 없음
curl -sI -A "Mediapartners-Google" https://yourtarot.cc/ads.txt | head -1
```

## 10) 결론

- **정책·기술 인프라**: 심사 충족 ✅
- **콘텐츠**: 다수 충실, 일부 짧은 글 보강 권장 🟡
- **심사 거절 가능 사유 중 즉시 위험한 항목 없음** ✅
- 콘솔 상태 갱신은 시간 문제로 추정

다음 점검 시점: 약 1주일 후 또는 AdSense 콘솔 상태 변경 시.
