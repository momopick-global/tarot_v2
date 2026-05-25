# 트러블슈팅 — Search Console

## "Couldn't fetch" sitemap

### 원인 후보

1. **Cloudflare WAF가 Googlebot 차단**
2. **redirect 무한 루프** — www↔apex 양방향 redirect 충돌
3. **sitemap URL 호스트 불일치** — Search Console 속성과 다른 호스트
4. **edge cache stale** — 이전 호스트 응답이 캐시됨
5. **SSL 인증서 갱신 실패** — HTTPS 요청이 깨짐

### 단계별 진단

```bash
# 1) sitemap 자체 응답
curl -sI https://yourtarot.cc/sitemap.xml
# 기대: HTTP/2 200 + content-type: text/xml

# 2) Googlebot UA로 sitemap 요청
curl -sI -A "Googlebot/2.1 (+http://www.google.com/bot.html)" https://yourtarot.cc/sitemap.xml

# 3) robots.txt
curl -s https://yourtarot.cc/robots.txt
# Sitemap: 라인 확인

# 4) sitemap 내용 호스트 일관성
curl -s https://yourtarot.cc/sitemap.xml | grep -oE 'https://[a-z.]+' | sort -u
```

## sitemap URL 등록 정책

- 절대 URL: `https://yourtarot.cc/sitemap.xml`
- Search Console에 "sitemap.xml" 만 추가하면 자동으로 위 URL 사용
- 도메인 속성(Domain property)이 아니라 URL prefix 속성이면 호스트 일치 필요

## robots.txt 검증

현재 운영:
```
User-agent: *
Allow: /

Sitemap: https://www.yourtarot.cc/sitemap.xml
```

> 주의: `Sitemap:` 라인은 `NEXT_PUBLIC_ROBOTS_SITEMAP_ORIGIN` env (기본 `https://www.yourtarot.cc`)로 결정됨. canonical(`yourtarot.cc`)과 다를 수 있음.
> Search Console에서는 sitemap이 정상 fetch되면 호스트 차이 자체는 큰 문제 아님.

## "Indexed, though blocked by robots.txt"

원인: robots.txt 의 Disallow 와 충돌

현재 `Allow: /` 만 있어 차단된 페이지 없음. 만약 새 Disallow 추가 시 영향 확인 필요.

## "Discovered – currently not indexed"

원인:
- 콘텐츠 얇음 (thin content)
- canonical 충돌
- 중복 콘텐츠
- 내부 링크 부족

해결:
- 본문 강화 ([content/blog-writing-guide.md](../content/blog-writing-guide.md))
- canonical 유일성 점검 ([seo/metadata-og.md](../seo/metadata-og.md))
- sitemap 우선순위 조정

## "Page with redirect" 경고

원인: www → apex redirect 페이지가 등록됨

해결: Search Console 속성을 canonical(apex)로 통일하고 재제출

## Cloudflare WAF 화이트리스트

다음 UA·IP를 차단하지 않게 점검:
- `Googlebot` (User-Agent)
- `Mediapartners-Google` (AdSense crawler)
- `AdsBot-Google` (Google Ads landing page checker)
- Google IP 범위 (필요 시)

## 재제출 절차

1. sitemap.xml 200 응답 확인
2. Search Console → Sitemaps → 기존 항목 삭제
3. "sitemap.xml" 다시 추가
4. 24~72시간 후 status 확인

## 관련 문서

- [seo/sitemap-robots.md](../seo/sitemap-robots.md)
- [seo/search-console.md](../seo/search-console.md)
- [troubleshooting/domain-dns-vercel.md](domain-dns-vercel.md)
