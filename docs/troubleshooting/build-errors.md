# 트러블슈팅 — 빌드 오류

## 표준 빌드 흐름

```
npm run build
  ├─ prebuild
  │  ├─ npm run faq:sync                            ← FAQ JSON 복사
  │  ├─ npm run blog:generate                        ← 블로그 정적 HTML
  │  └─ node scripts/write-sitemap-xml.cjs           ← sitemap.xml + robots.txt
  ├─ next build
  │  ├─ Compile (Turbopack)
  │  ├─ TypeScript check
  │  └─ Generating static pages
```

## 자주 보는 오류

### 1. `Type error: Cannot find name 'canonicalUrl'`

원인: 존재하지 않는 헬퍼를 import. 실제 헬퍼는 `absoluteSiteUrl(canonicalPath(path))` 조합.

해결: `src/lib/siteUrl.ts`와 `src/lib/seo/pageMeta.ts` 확인 후 올바른 헬퍼 사용.

### 2. `params: Promise` 관련 sync 에러

증상: dev 서버 콘솔에 `params is a Promise and must be unwrapped with await`

원인: Next 16에서 dynamic route의 `params`가 Promise.

해결:
```ts
type ParamsValue = { slug: string };
type Params = Promise<ParamsValue>;

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  …
}

export default async function Page({ params }: { params: Params }) {
  const { slug } = await params;
  …
}
```

### 3. Static export에서 `output: "export"` 위반

증상: `Page X is not statically generatable`

원인:
- Route Handler가 dynamic (`force-dynamic` 등)
- `generateStaticParams` 미정의
- Server Action 사용

해결:
- 동적 SSR 기능 제거
- 동적 라우트는 반드시 `generateStaticParams` 정의

### 4. CJS 스크립트에서 ESM import 충돌

원인: `scripts/write-sitemap-xml.cjs` 같은 CJS 파일이 TS 모듈 import 시도

해결: TS 데이터를 직접 import하지 말고 CJS-friendly 상수로 동기화 (현재 `PSYCH_TESTS`, `TAROT_MENU_BY_CATEGORY` 등으로 분리됨)

### 5. 이미지 404 (빌드는 통과, 운영에서 깨짐)

원인: 이미지가 untracked 상태 (`git add` 누락)

해결:
```bash
git status --short | grep "^?? public/"
# 이미지 파일이 ?? 상태인지 확인
git add <specific file>
```

사례: 커밋 `0d18b55` — blog default thumb 등 4장 webp가 git 추적 안 돼서 운영 404 발생.

### 6. blog generator가 일부 글 누락

증상: 새 JSON 추가했는데 `public/blog/`에 HTML이 안 생김

해결:
- JSON 스키마 점검 (`slug`, `title` 필수)
- `npm run blog:generate` 직접 실행 → 콘솔 메시지 확인
- 콘솔에 `스킵 (slug/title 없음)` 메시지가 나오면 해당 JSON 점검

### 7. sitemap에 새 URL이 안 들어감

원인: `scripts/write-sitemap-xml.cjs` 의 데이터 상수가 동기화 안 됨

해결:
- 정적 페이지 → `STATIC_PATHS` 배열에 추가
- 카테고리/심리테스트 → 각각 `TAROT_MENU_BY_CATEGORY`, `PSYCH_TESTS` 상수에 추가
- 빌드 후 `public/sitemap.xml` 확인

## 검증 패턴

```bash
# 빌드 + 핵심 메시지만
npm run build 2>&1 | grep -E "Compiled|TypeScript|Failed|error|Generating static pages using"

# 빌드 산출물의 정적 페이지 수
ls -d out/*/ | wc -l

# sitemap의 URL 개수
grep -c "<loc>" public/sitemap.xml
```

## TypeScript 점검

- `tsconfig.json` 의 `paths` → `@/*` → `./src/*`
- 새 모듈 추가 시 import 경로 일관성
- `Readonly<{ params: Params }>` 등 readonly 패턴 사용

## ESLint 점검

`npm run lint` — 별도 빌드 단계 아님. CI에서 분리되어 있고, 빌드 통과해도 lint 경고 있을 수 있음. 새 코드는 lint 통과 권장.
