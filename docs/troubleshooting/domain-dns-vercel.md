# 트러블슈팅 — 도메인·DNS·Vercel

## 현재 운영 상태

- **canonical**: `https://yourtarot.cc` (apex)
- **www 처리**: `www.yourtarot.cc` → 308 redirect → apex
- **Vercel Primary domain**: `yourtarot.cc`
- **NEXT_PUBLIC_SITE_URL env**: `https://yourtarot.cc`

## 자주 보는 이슈

### 1. www와 apex 모두 200 (redirect 안 됨)

원인:
- Vercel Primary 설정 누락
- `www.yourtarot.cc` 옆 "Redirect to" 미설정

해결:
- Vercel Dashboard → Project → Settings → Domains
- `www.yourtarot.cc` 행에서 "Redirect to yourtarot.cc" 설정

### 2. sitemap.xml의 호스트가 www로 나옴

원인: env `NEXT_PUBLIC_SITE_URL` 이 www로 잘못 설정됨

검증:
```bash
curl -s https://yourtarot.cc/sitemap.xml | grep -oE 'https://[a-z.]+' | sort -u
# 기대 출력: https://yourtarot.cc 만
```

해결:
1. Vercel env에서 `NEXT_PUBLIC_SITE_URL=https://yourtarot.cc` 로 수정
2. **Production Redeploy** 필수 (prebuild에서 sitemap 재생성)

### 3. canonical/OG URL이 사이트와 다름

원인: 동일 (env 변경 후 미배포)

해결: env 수정 + Redeploy

### 4. Vercel "DNS Change Recommended" 노란 배너

가능 원인:
- Cloudflare Proxy(orange cloud) 활성 — Vercel은 DNS only(grey cloud) 권장
- A 레코드 IP가 Vercel 권장 IP와 다름

영향: 보통 무해. 단 SSL 갱신·로그·access protection 기능 제한

해결:
- Cloudflare에서 yourtarot.cc 레코드 Proxy 끄기 (DNS only)
- Vercel이 권장하는 A/ALIAS/CNAME 레코드로 갱신

### 5. SSL 인증서 발급 실패

원인:
- Cloudflare Proxy가 ACME challenge 차단
- DNS 전파 지연

해결:
- Proxy off 후 5~30분 대기
- Vercel Dashboard에서 "Refresh" 또는 도메인 재추가

### 6. www 통일로 전환했다가 환원하고 싶음

이력: 커밋 `52a5e66` 으로 환원한 사례가 있음.

복원 절차:
1. Vercel env `NEXT_PUBLIC_SITE_URL=https://yourtarot.cc` 확인
2. Vercel Primary domain을 `yourtarot.cc` 로 설정
3. `www.yourtarot.cc` "Redirect to yourtarot.cc"
4. Redeploy
5. `.env.local.example`의 `NEXT_PUBLIC_SITE_URL` 기본값도 apex로

### 7. Cloudflare WAF가 검색엔진·AdSense 차단

증상:
- Search Console에서 "Couldn't fetch"
- AdSense 크롤러 접근 실패

해결:
- Cloudflare WAF rules에서 Googlebot / Mediapartners-Google UA 허용
- ads.txt, robots.txt, sitemap.xml은 항상 200 응답하도록 화이트리스트

## 검증 명령 모음

```bash
# www → apex redirect 확인
curl -sIL https://www.yourtarot.cc/ | grep -iE "HTTP/|location"

# apex 200 확인 + Vercel 헤더
curl -sI https://yourtarot.cc/ | grep -iE "HTTP/|server|x-vercel|last-modified"

# sitemap 호스트
curl -s https://yourtarot.cc/sitemap.xml | grep -oE 'https://[a-z.]+' | sort -u

# robots.txt
curl -s https://yourtarot.cc/robots.txt

# Googlebot fetch 시뮬레이션
curl -sI -A "Googlebot/2.1 (+http://www.google.com/bot.html)" https://yourtarot.cc/
```

## 관련 문서

- [setup/vercel-cloudflare.md](../setup/vercel-cloudflare.md)
- [setup/environment-variables.md](../setup/environment-variables.md)
- [seo/sitemap-robots.md](../seo/sitemap-robots.md)
