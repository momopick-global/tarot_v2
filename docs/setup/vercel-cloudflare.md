# Vercel & Cloudflare 도메인 구조

## 현재 도메인 매트릭스

| 호스트 | 역할 | 응답 |
|---|---|---|
| `yourtarot.cc` | **Production canonical (apex)** | HTTP/2 200 |
| `www.yourtarot.cc` | apex로 308 redirect | `Location: https://yourtarot.cc/…` |

## Vercel 측 설정 (Settings → Domains)

- **Primary domain**: `yourtarot.cc` (apex)
- `www.yourtarot.cc` 옆: "Redirect to `yourtarot.cc`"
- 인증서: Vercel 자동 갱신 (Let's Encrypt)

## Cloudflare 측 DNS (참고)

- `yourtarot.cc` → Vercel A 또는 ALIAS 레코드
- `www.yourtarot.cc` → Vercel CNAME
- Proxy: 보통 **DNS only** 권장 (Vercel SSL과 이중 프록시 충돌 방지)

## "DNS Change Recommended" 경고

Vercel Dashboard에서 가끔 노란 배너로 표시될 수 있음:
- 의미: Cloudflare proxy가 켜져 있거나 Vercel 권장 레코드와 다를 때
- 영향: 대부분 무해. SSL 갱신·로그 분석에 지장이 생기면 권장 설정으로 조정

## 도메인 변경 시 영향 (다시 보지 않게 주의)

`https://yourtarot.cc` → 다른 호스트로 변경 시 다음을 모두 갱신해야 함:
1. Vercel Environment Variable `NEXT_PUBLIC_SITE_URL`
2. Vercel Primary Domain 설정
3. Redeploy → sitemap.xml / canonical / OG 재생성
4. Search Console에 새 속성 등록
5. AdSense Site URL 갱신

> ⚠️ 운영 도메인은 apex(`yourtarot.cc`)로 **확정**되어 있습니다. www 통일 시도를 한 번 했다가 즉시 환원한 이력(`52a5e66`)이 있으므로 신중히 결정하세요.

## 검증 명령

```bash
# www → apex 308 redirect 확인
curl -sIL https://www.yourtarot.cc/ | grep -iE "HTTP/|location"

# apex 200 확인 + 서버
curl -sI https://yourtarot.cc/ | grep -iE "HTTP/|server|x-vercel"
```

## Cloudflare WAF 주의

- Search Console / AdSense / Googlebot 차단되지 않게 화이트리스트 점검
- robots.txt 와 sitemap.xml 은 항상 200 응답해야 함

## 추가 트러블슈팅

→ [troubleshooting/domain-dns-vercel.md](../troubleshooting/domain-dns-vercel.md)
