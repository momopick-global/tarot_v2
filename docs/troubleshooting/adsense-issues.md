# 트러블슈팅 — Google AdSense

## 자주 보는 거절 사유

| 사유 | 점검 |
|---|---|
| 콘텐츠 부족 (Insufficient content) | 페이지당 본문 300자+, 사이트 전체 글 30개+ |
| 정책 페이지 부족 | `/privacy-policy`, `/terms`, `/disclaimer`, `/contact`, `/about` 노출 |
| 탐색성 부족 (navigation) | Footer/햄버거에서 정책·정보 페이지 접근 가능 |
| 이미지 위주 페이지 | 텍스트와 균형 (블로그·심리테스트 본문 충분) |
| 준비중/404/placeholder | 운영 페이지에 노출 금지 |
| 모바일 사용성 | 모바일 우선 디자인, 빠른 로딩 |
| 중복 콘텐츠 | 동일 글 다른 URL 노출 금지 (canonical 사용) |
| 광고 위치 부적절 | 심사 중에는 광고 슬롯 UI 미배치 권장 |
| AdSense 정책 위반 콘텐츠 | 성인·도박·차별 등 제외 |
| ads.txt 미설정 | `/ads.txt` 200 응답 + `pub-...` 라인 |

## 현재 사이트 상태 (요약)

자세한 항목별 상태: [seo/adsense-review.md](../seo/adsense-review.md)

✅ 정책·문의·about 페이지 모두 존재  
✅ ads.txt 운영 응답 200  
✅ AdSense 로더 스크립트 head 1회 적용  
✅ 정책 본문에 쿠키·GA·AdSense·Kakao 명시  
✅ 심리테스트 본문/FAQ 보강 완료  
⏳ 광고 슬롯 UI는 심사 통과 후 추가 예정  
⚠️ 블로그 58/61 게시글 개별 썸네일 누락 (default thumb 사용 — 큰 위험 아님)  
⚠️ 일부 블로그 본문이 짧을 수 있음

## 재심사 전 체크

```bash
# 정책 페이지 응답
for p in privacy-policy personal terms disclaimer about contact; do
  echo -n "/$p → "
  curl -sIL "https://yourtarot.cc/$p" -o /dev/null -w "%{http_code}\n"
done

# ads.txt
curl -s https://yourtarot.cc/ads.txt

# AdSense head script
curl -sL https://yourtarot.cc/ | grep -oE '<script[^>]*adsbygoogle[^>]*>'

# sitemap에 핵심 URL 포함
curl -s https://yourtarot.cc/sitemap.xml | grep -cE '(privacy-policy|contact|psych-tests|menu/|blog/)'
```

## "ads.txt 승인되지 않음" 메시지

AdSense 콘솔에서 ads.txt 인식까지 **24시간~수일** 걸림. 파일은 즉시 서빙되어도 콘솔 표시는 지연.

검증:
```bash
curl -sI https://yourtarot.cc/ads.txt
# HTTP/2 200 + Content-Type: text/plain
curl -s https://yourtarot.cc/ads.txt
# google.com, pub-2758905830381994, DIRECT, f08c47fec0942fa0
```

## 광고 슬롯 추가 시 주의 (심사 통과 후)

- `<ins class="adsbygoogle">` 슬롯은 콘텐츠 안에 적절히 배치
- 페이지당 광고 수 과다 금지
- 모바일 sticky 광고는 위치 신중 (BottomNav 와 충돌 회피)
- AdSense Auto Ads 활성화 시 별도 슬롯 코드 없이 동작
- 광고 슬롯 추가는 [project/protected-areas.md](../project/protected-areas.md) 의 신규 작업 원칙 따름

## 콘텐츠 강화 우선순위

1. 블로그 글 본문 길이 (300자 미만 글 보강)
2. 심리테스트 추가 (현재 1개 → 2~3개)
3. 카테고리 페이지 본문 텍스트 강화
4. 결과 페이지 disclaimer + 추가 안내

## 관련 문서

- [seo/adsense-review.md](../seo/adsense-review.md) — AdSense 상세 상태
- [content/blog-writing-guide.md](../content/blog-writing-guide.md) — 블로그 본문 기준
- [content/psych-test-writing-guide.md](../content/psych-test-writing-guide.md) — 결과 본문 기준
