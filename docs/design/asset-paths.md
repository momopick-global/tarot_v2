# 이미지·자원 경로 규칙

## 기본 원칙

- 모든 자원은 `public/` 아래
- 코드에서는 `/images/...` 또는 `/assets/...` 처럼 절대 경로로 참조
- `withAssetBase()` 헬퍼로 GitHub Pages basePath 환경 호환 (운영은 `NEXT_PUBLIC_BASE_PATH=""`)
- 파일명은 영문 슬러그 (한글 파일명 금지 — URL 인코딩 이슈)

## 디렉터리 맵

```
public/
├── images/
│   ├── blog/                       # 블로그 본문/카드 썸네일 (.webp 우선)
│   │   ├── {slug}.webp
│   │   └── blog-default-thumb.webp # 기본 fallback
│   ├── og/
│   │   └── blog/                   # 블로그 OG 전용 (.jpg/.png 권장)
│   │       └── {slug}.jpg
│   ├── tarot-categories/           # 카테고리 자원
│   │   ├── {categoryId}.webp       # 1뎁스 (홈 carousel) — 5장
│   │   └── {categoryId}/           # 2뎁스 (서브메뉴 30장)
│   │       └── {slug}.webp
│   ├── psych-tests/                # 심리테스트
│   │   └── {testSlug}/
│   │       ├── thumb.webp
│   │       ├── og.webp
│   │       ├── options/option-{N}.webp
│   │       └── results/result-{N}.webp
│   ├── masters/                    # 마스터 9명
│   │   └── {nn_Name}/              # 예: 01_Sera, 02_Kai
│   │       ├── thumb.{png|webp}
│   │       ├── bg_0{1..3}.{png|webp}
│   │       └── (카드 앞면 …)
│   ├── main/                       # 메인 hero 자원
│   │   ├── yourtarot_poster.jpg
│   │   └── main.mp4
│   ├── bg_final.webp               # 결과 페이지 배경
│   └── ch.webp                     # 캐릭터 보조
├── assets/                         # 아이콘·UI 자원
│   ├── icon-eye-header-v2.webp
│   ├── icon-menu-header-v3.webp
│   ├── icon-user-guest-v1.webp
│   ├── card-back-page04.webp
│   ├── svg-ic-share-{facebook,link,x}.svg-*.webp
│   ├── svg-ic-social-{instagram,kakao}.svg-*.webp
│   └── svg-logo-yourtarot.svg-*.webp
├── og/
│   └── yourtarot_og_kr2.png        # 사이트 기본 OG (Kakao 호환 png)
├── data/                            # 빌드 산출물 (FAQ JSON 등)
├── blog/                            # 빌드 산출물 (블로그 정적 HTML)
├── ads.txt
├── robots.txt
├── sitemap.xml
└── …
```

## 코드에서 참조 패턴

```ts
import { withAssetBase } from "@/lib/publicPath";

const ICON = withAssetBase("/assets/icon-eye-header-v2.webp");
const THUMB = `/images/tarot-categories/${categoryId}.webp`;
const OG = `/images/og/blog/${slug}.jpg`;
```

## 신규 자원 추가 시

1. 폴더 규칙에 맞게 배치 (위 트리 참고)
2. 파일명은 영문 슬러그 + 적절한 확장자 (.webp 우선, OG는 .jpg/.png)
3. `git add` 명시적으로 (untracked 상태로 두면 운영 배포 안 됨 — 사례: 커밋 `0d18b55`)
4. 빌드 후 운영에서 200 응답 확인

## 한글 파일명 위험

이전에 발생한 사례:
- `감정의 방.webp` → URL 인코딩 문제 → `emotion.webp` 로 리네임
- `대표 썸네일.webp` → `thumb.webp`
- 모든 파일명은 영문 + 하이픈 슬러그로 유지

## OG 이미지 분리 (블로그)

- 본문/카드 썸네일: `webp` 우선
- og:image: `jpg/png` 권장 (`/images/og/blog/{slug}.jpg`)
- Kakao·일부 SNS 의 webp 미지원 회피 목적
- `scripts/generate-blog.js`의 `resolveOgImage()` 가 분리 경로 우선 탐색

## 알려진 inconsistency

- 마스터 폴더 일부 webp 미완료 (01~03 부분, 04~09 png 유지)
- 미참조 디자인 mockup png 다수 `D` 상태 (정리 대기)
- 자세한 현황: [project/current-status.md](../project/current-status.md)
