# Google Search Console

## 등록 정책

- 등록 속성: **`https://yourtarot.cc`** (URL prefix 또는 Domain property)
- www 별도 속성으로 등록 필요할 수 있음(308 redirect 추적용)

## sitemap 제출

- Search Console → Sitemaps → "Add a new sitemap"
- 값: `sitemap.xml`
- 절대 URL: `https://yourtarot.cc/sitemap.xml`

## 자주 보는 이슈

| 증상 | 가능 원인 | 해결 |
|---|---|---|
| "Couldn't fetch" | Cloudflare WAF에서 Googlebot 차단, 캐시 stale, redirect 무한 루프 | Cloudflare WAF 화이트리스트 점검, robots.txt 200 확인, 캐시 무효화 |
| "Discovered – currently not indexed" | 콘텐츠 얇음·중복·canonical 충돌 | 본문 보강, canonical 유일성 점검 |
| "Indexed, though blocked by robots.txt" | robots.txt에 Disallow 충돌 | robots.txt 점검 — 현재 `Allow: /` 만 있음 |
| sitemap의 URL 호스트 불일치 | NEXT_PUBLIC_SITE_URL 변경 후 재배포 누락 | Vercel env 확인 + Redeploy |

## 핵심 검증 명령

```bash
# robots.txt 응답
curl -sI https://yourtarot.cc/robots.txt

# sitemap.xml 응답
curl -sI https://yourtarot.cc/sitemap.xml

# Googlebot UA로 페이지 fetch
curl -sI -A "Googlebot/2.1 (+http://www.google.com/bot.html)" https://yourtarot.cc/
```

자세한 트러블슈팅 → [troubleshooting/search-console.md](../troubleshooting/search-console.md)
