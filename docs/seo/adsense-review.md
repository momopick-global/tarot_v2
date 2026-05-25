# Google AdSense 심사 상태

## 적용 항목 ✅

| 항목 | 상태 | 비고 |
|---|---|---|
| AdSense 로더 스크립트 | ✅ 적용 | `<head>`에 `<GoogleAdSenseScript />` (`src/components/GoogleAdSense.tsx`) |
| Publisher ID | ✅ 적용 | `ca-pub-2758905830381994` |
| ads.txt | ✅ 적용 | `google.com, pub-2758905830381994, DIRECT, f08c47fec0942fa0` |
| 광고 슬롯 UI (`<ins class="adsbygoogle">`) | ⏳ 미배치 | 심사 통과 후 추가 예정 |

## 필수 정책 페이지

| 페이지 | 경로 | 상태 |
|---|---|---|
| 개인정보처리방침 (영문 슬러그) | `/privacy-policy` | ✅ |
| 개인정보처리방침 (백워드) | `/personal` | ✅ (동일 본문) |
| 이용약관 | `/terms` | ✅ |
| 면책조항 | `/disclaimer` | ✅ |
| 문의 | `/contact` | ✅ |
| 서비스 소개 | `/about` | ✅ |
| 제휴문의 | `/partner` | ✅ |
| 의견 보내기 | `/recommended` | ✅ |

## 개인정보처리방침 포함 항목

운영 본문(`src/data/policies.ts`)이 다음을 명시:

- [x] 쿠키 (사용 목적·거부 방법)
- [x] Google Analytics / Google Tag Manager
- [x] Google AdSense (맞춤형 광고, ads.txt 안내)
- [x] Kakao 공유 SDK (정책 링크)
- [x] Supabase 인증 연동 (선택적)
- [x] 이용자 권리·문의 이메일

## 네비게이션 접근성

- Footer: 모든 정책·문의 링크 노출
- 햄버거 메뉴 (`MenuContent`): 이용약관·개인정보처리방침·면책조항·문의하기

## 콘텐츠 강화 상태

| 영역 | 상태 |
|---|---|
| 블로그 글 61개 (h2/h3 구조 + FAQ JSON-LD) | ✅ |
| 심리테스트 목록 페이지 인트로 + FAQ 4개 | ✅ |
| 심리테스트 상세 안내 박스 + 면책 | ✅ |
| 심리테스트 결과 면책 문구 | ✅ |
| 블로그 카드 썸네일 | ✅ |
| 블로그 default thumb 운영 배포 | ✅ (`0d18b55`) |

## sitemap 등록

- 정적 페이지 + 정책 + 문의 + 메뉴(36) + 심리테스트(6) + 블로그(67) 등 모든 콘텐츠 URL 등록
- 자세한 구조: [seo/sitemap-robots.md](sitemap-robots.md)

## 잔여 리스크 ⚠️

심사 거절 위험 요인 점검:

| 리스크 | 현재 상태 | 메모 |
|---|---|---|
| 콘텐츠 양 부족 | 보통 | 블로그 61개 + 정책·심리테스트 페이지 다수 |
| 얇은 콘텐츠 (Thin content) | 일부 | 일부 블로그 글이 200~400자 정도 — 보강 권장 |
| 이미지 위주 페이지 | 부분 | 블로그 58개에 개별 썸네일 없음 (default thumb 사용) — 텍스트 본문은 있어 큰 위험은 아님 |
| 빈 페이지/404/준비중 | 없음 | "이미지 준비중" 텍스트는 fallback에만 존재 (실제 노출 없음) |
| 모바일 사용성 | 양호 | 모바일 우선 설계, 카카오 인앱 가이드 적용 |
| 외부 링크 | 정책 페이지 외 제한적 | 정책 외 외부 도메인 링크는 거의 없음 |
| 광고 슬롯 사전 배치 | 없음 | 정책상 심사 단계에서는 OK |

## 재심사 전 체크

자세한 트러블슈팅 → [troubleshooting/adsense-issues.md](../troubleshooting/adsense-issues.md)

- [ ] 모든 정책 페이지 200 응답
- [ ] sitemap.xml에 모든 콘텐츠 URL 포함
- [ ] AdSense 콘솔에서 ads.txt "승인됨" 상태 (반영 24h~수일)
- [ ] 콘텐츠 페이지에 충분한 텍스트 (300자 이상 권장)
- [ ] navigation에서 정책 페이지 도달 가능
- [ ] 모바일에서 빠른 로딩과 가독성

## 운영 검증

```bash
# head에 AdSense script 임베드 확인
curl -sL https://yourtarot.cc/ | grep -oE '<script[^>]*adsbygoogle[^>]*>'

# ads.txt
curl -s https://yourtarot.cc/ads.txt
```
