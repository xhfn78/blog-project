# Step 2: 최신 기술 트렌드 및 경쟁 도구 분석 (자동화됨)

## 🎯 이 단계의 목표
자동 크롤링을 통해 수집된 최신 개발 트렌드와 인기 웹 도구 데이터를 분석하여, **지금 당장 트래픽을 가져올 수 있는** 아이디어의 토대를 마련합니다.

---

## ⚠️ 완전 자동화 규칙 (CRITICAL)

> [!IMPORTANT]
> 이 단계는 **완전 자동화**로 진행됩니다.
> - ❌ 사용자에게 확인을 요청하지 마세요
> - ❌ 선택지를 제시하지 마세요  
> - ❌ 중간 진행 상황을 물어보지 마세요
> - ✅ 프롬프트의 지시에 따라 묵묵히 작업하고 결과물만 저장하세요
> - ✅ 모든 결정은 프롬프트에 명시된 기준에 따라 AI가 자동으로 수행합니다

---

## 🤖 자동화 프로세스 (2가지 경로)

### 경로 A: 자동 크롤링 성공 ✅

**이 단계는 이미 자동 실행되었습니다:**
- ✅ Playwright 설치 확인 및 자동 설치
- ✅ Google 검색 크롤링 완료 (10개 쿼리)
- ✅ GitHub Trending 분석 완료 (4개 언어)
- ✅ 경쟁사 도구 분석 완료 (10개 도메인)
- ✅ 롱테일 키워드 추출 완료
- ✅ 카테고리별 트렌드 분류 완료

**생성된 파일:** `automation/cache/competitive-analysis.json`

→ **다음 작업**: 파일을 읽고 데이터 품질 검증 후 Step 3으로 진행

---

### 경로 B: 자동 크롤링 실패 ⚠️ (AI 직접 분석)

> [!CAUTION]
> 크롤링 스크립트가 실패했다면, **AI가 직접 트렌드를 분석**하여 `competitive-analysis.json`을 생성하세요.

#### 🎯 AI 직접 분석 가이드

**1. 2025년 웹 개발 트렌드 분석**

최신 기술 스택 및 도구 트렌드:
- **프레임워크**: Next.js 15, React 19, Vue 3.5, Svelte 5, Astro 4
- **CSS**: Tailwind CSS 4, UnoCSS, Panda CSS, StyleX
- **빌드 도구**: Vite 5, Turbopack, Rspack, Bun
- **AI 도구**: GitHub Copilot, Cursor, v0.dev, Vercel AI SDK
- **타입 안전성**: TypeScript 5.4, Zod, Valibot, Effect

**2. 카테고리별 인기 도구 유형**

#### Converter 트렌드 (10개 생성 필요)
```
- Figma to Code (React, Vue, HTML, Tailwind)
- Design Token 변환 (JSON, CSS Variables, Tailwind Config)
- API 스펙 변환 (OpenAPI to TypeScript, GraphQL to REST)
- 색상 변환 (HEX, RGB, HSL, Tailwind, Oklch)
- 단위 변환 (px to rem, em, vw, vh)
- TypeScript 변환 (Interface to Type, Zod Schema)
- SQL to Prisma Schema
- JSON to YAML, TOML
- Markdown to HTML, JSX
- SVG to React Component, Vue Component
```

#### Generator 트렌드 (10개 생성 필요)
```
- AI 기반 코드 생성 (Component, API Route, Test Code)
- Mock 데이터 생성 (TypeScript 타입 기반, Faker.js 통합)
- 프로젝트 스캐폴딩 (Vite, Next.js, T3 Stack 템플릿)
- QR Code, Barcode 생성
- UUID, Nanoid, ULID 생성
- 암호화 키, JWT 토큰 생성
- Favicon, OG Image 생성
- Sitemap, robots.txt 생성
- TypeScript 타입 생성 (JSON Schema, OpenAPI)
- Prisma Seed 데이터 생성
```

#### Formatter 트렌드 (5개 생성 필요)
```
- SQL 쿼리 포맷터 (PostgreSQL, MySQL, SQLite)
- GraphQL 스키마 포맷터
- JSON, YAML 정렬 및 검증
- Prettier 설정 생성기
- ESLint 규칙 생성기
```

#### Utility 트렌드 (5개 생성 필요)
```
- 번들 크기 분석기 (Webpack, Vite, Next.js)
- 성능 측정 도구 (Lighthouse, Web Vitals)
- 정규식 테스터 (실시간 매칭, 설명 생성)
- 색상 팔레트 생성기 (접근성 체크 포함)
- Cron 표현식 생성기
```

**3. 롱테일 키워드 생성 (15개 이상)**

다음 패턴으로 생성:
```
"[기술스택] to [기술스택] converter"
"[프레임워크] [도구타입] generator"
"best [카테고리] tools for [대상]"
"[기능] online tool for developers"
```

**예시**:
```json
[
  "figma to react component converter",
  "tailwind css to styled components converter",
  "typescript interface to zod schema",
  "next.js api route generator",
  "prisma schema to typescript types",
  "openapi to fetch client generator",
  "svg to react component converter online",
  "json to yaml converter with validation",
  "sql query formatter postgresql",
  "mock data generator from typescript types",
  "qr code generator with logo",
  "bundle size analyzer for nextjs",
  "regex tester with explanation",
  "color palette generator accessible",
  "cron expression generator visual"
]
```

**4. 경쟁사 Gap 분석**

주요 경쟁사 및 차별화 포인트:
```json
[
  {
    "name": "transform.tools",
    "title": "Transform - Code transformation tools",
    "description": "Transform code between different formats",
    "features": ["Multi-language support", "Real-time preview", "Many converters"],
    "gaps": ["No Korean support", "Complex UI", "No mobile optimization"]
  },
  {
    "name": "codebeautify.org",
    "title": "Code Beautify - Online Tools",
    "description": "Online code formatter and converter",
    "features": ["Many tools", "Free to use", "No registration"],
    "gaps": ["Too many ads", "Slow performance", "No Korean support", "Outdated UI"]
  },
  {
    "name": "jsonformatter.org",
    "title": "JSON Formatter",
    "description": "JSON formatter and validator",
    "features": ["Simple interface", "Fast"],
    "gaps": ["Single purpose only", "No Korean support", "Limited features"]
  }
]
```

**우리의 차별화 포인트**:
- ✅ 한국어 완벽 지원
- ✅ 깔끔하고 현대적인 UI/UX
- ✅ 광고 없는 경험
- ✅ 다양한 기능 통합
- ✅ 모바일 최적화
- ✅ 다크 모드 지원

**5. GitHub Trending 데이터 (추정)**

```json
[
  {
    "name": "vercel/next.js",
    "description": "The React Framework for Production",
    "stars": "120k"
  },
  {
    "name": "tailwindlabs/tailwindcss",
    "description": "A utility-first CSS framework",
    "stars": "78k"
  },
  {
    "name": "vitejs/vite",
    "description": "Next generation frontend tooling",
    "stars": "65k"
  },
  {
    "name": "microsoft/TypeScript",
    "description": "TypeScript is a superset of JavaScript",
    "stars": "98k"
  },
  {
    "name": "facebook/react",
    "description": "A JavaScript library for building user interfaces",
    "stars": "225k"
  }
]
```

**6. 인사이트 생성**

```
2025년 트렌드: AI 기반 코드 생성 도구 급증, Design to Code 변환 수요 증가, TypeScript 타입 기반 도구 인기. 
한국어 지원 부족한 경쟁사 다수 발견 (차별화 기회). 
Next.js, Tailwind CSS, TypeScript 생태계 도구 수요 높음. 
Figma to Code, API Mock 생성, 번들 크기 분석 등이 인기 키워드.
```

**7. 출력 파일 생성**

위 분석을 바탕으로 `automation/cache/competitive-analysis.json` 생성:

```json
{
  "scannedAt": "2025-12-26T12:00:00Z",
  "version": "1.0",
  "source": "AI_ANALYSIS",
  "trends": {
    "converter": [
      "figma to react component converter",
      "tailwind css to styled components",
      "typescript interface to zod schema",
      "svg to react component converter",
      "json to yaml converter"
    ],
    "generator": [
      "next.js api route generator",
      "prisma schema to typescript types",
      "mock data generator from typescript",
      "qr code generator with logo",
      "uuid nanoid generator"
    ],
    "formatter": [
      "sql query formatter postgresql",
      "graphql schema formatter",
      "json yaml formatter validator",
      "prettier config generator",
      "eslint rules generator"
    ],
    "utility": [
      "bundle size analyzer nextjs",
      "regex tester with explanation",
      "color palette generator accessible",
      "cron expression generator visual",
      "web vitals performance checker"
    ]
  },
  "longTailKeywords": [
    "figma to react component converter",
    "tailwind css to styled components converter",
    "typescript interface to zod schema",
    "next.js api route generator",
    "prisma schema to typescript types",
    "openapi to fetch client generator",
    "svg to react component converter online",
    "json to yaml converter with validation",
    "sql query formatter postgresql",
    "mock data generator from typescript types",
    "qr code generator with logo",
    "bundle size analyzer for nextjs",
    "regex tester with explanation",
    "color palette generator accessible",
    "cron expression generator visual"
  ],
  "competitors": [
    {
      "name": "transform.tools",
      "title": "Transform - Code transformation tools",
      "description": "Transform code between different formats",
      "features": ["Multi-language support", "Real-time preview"],
      "gaps": ["No Korean support", "Complex UI"]
    },
    {
      "name": "codebeautify.org",
      "title": "Code Beautify",
      "description": "Online code formatter and converter",
      "features": ["Many tools", "Free to use"],
      "gaps": ["Too many ads", "Slow performance", "No Korean support"]
    },
    {
      "name": "jsonformatter.org",
      "title": "JSON Formatter",
      "description": "JSON formatter and validator",
      "features": ["Simple interface"],
      "gaps": ["Single purpose only", "No Korean support"]
    }
  ],
  "githubTrending": [
    {
      "name": "vercel/next.js",
      "description": "The React Framework for Production",
      "stars": "120k"
    },
    {
      "name": "tailwindlabs/tailwindcss",
      "description": "A utility-first CSS framework",
      "stars": "78k"
    },
    {
      "name": "vitejs/vite",
      "description": "Next generation frontend tooling",
      "stars": "65k"
    }
  ],
  "insights": "2025년 트렌드: AI 기반 코드 생성, Design to Code 변환, TypeScript 타입 기반 도구 인기. 한국어 미지원 경쟁사 다수 (차별화 기회). Next.js, Tailwind CSS 생태계 도구 수요 높음."
}
```

---

## 📋 수행 작업 (데이터 검토 및 정제)

### 1. 자동 생성된 데이터 읽기

다음 파일을 읽어주세요:
```
automation/cache/competitive-analysis.json
```

이 파일에는 다음 정보가 포함되어 있습니다:
- **trends**: 카테고리별 트렌드 키워드 (converter, generator, formatter, utility)
- **longTailKeywords**: SEO 최적화를 위한 3단어+ 키워드 15개
- **competitors**: 경쟁사 분석 결과 (features, gaps)
- **githubTrending**: 최근 인기 GitHub 저장소 TOP 5
- **insights**: 전문가 요약 인사이트

### 2. 데이터 품질 검증

자동 생성된 데이터를 검토하고 다음을 확인하세요:
- ✅ 트렌드 키워드가 실제 개발 트렌드를 반영하는가?
- ✅ 경쟁사 gap 분석이 정확한가?
- ✅ 롱테일 키워드가 SEO에 유용한가?

### 3. 추가 인사이트 도출 (선택)

자동 데이터를 기반으로 추가 인사이트를 도출할 수 있습니다:
- 한국 시장에 특화된 기회 발견
- 특정 프레임워크 (Next.js, Tailwind) 관련 도구 부족
- 접근성 개선 기회

---

## ✅ 출력물 (자동 생성됨)

**파일:** `automation/cache/competitive-analysis.json`

**⚠️ 주의: 이 파일은 이미 자동으로 생성되었습니다. 필요시 수동으로 수정할 수 있습니다.**

**파일 구조:**
```json
{
  "scannedAt": "2025-12-26T15:30:00Z",
  "version": "1.0",
  "trends": {
    "converter": ["px to rem converter", "css to tailwind converter"],
    "generator": ["uuid generator", "qr code generator"],
    "formatter": ["json formatter", "code beautifier"],
    "utility": ["regex tester", "color picker tool"]
  },
  "longTailKeywords": [
    "trending web developer tools 2025",
    "popular developer utilities github",
    "best online converter tools"
  ],
  "competitors": [
    {
      "name": "transform.tools",
      "title": "Transform - Code transformation tools",
      "description": "Transform code from one format to another",
      "features": ["Multi-language support", "Real-time preview"],
      "gaps": ["No Korean support", "Complex UI"]
    }
  ],
  "githubTrending": [
    {
      "name": "facebook/react",
      "description": "A JavaScript library for building user interfaces",
      "stars": "225k"
    }
  ],
  "insights": "최근 인기 주제: converter 카테고리: px to rem converter. 한국어 미지원 경쟁사 3개 발견 (차별화 기회). GitHub 트렌딩 1위: facebook/react (225k stars)",
  "rawData": {
    "googleResults": ["Result 1", "Result 2"],
    "relatedSearches": ["Related 1", "Related 2"]
  }
}
```

---

## 🎯 AI 작업자에게

이 단계를 수행할 때:

1. **파일 확인:**
   - `automation/cache/competitive-analysis.json` 파일을 읽어주세요
   - 자동 생성된 데이터가 있는지 확인하세요

2. **데이터 검증:**
   - 트렌드 키워드가 합리적인지 확인
   - 경쟁사 분석이 정확한지 검토
   - 필요시 수동으로 데이터 수정

3. **완료 조건:**
   - `competitive-analysis.json` 파일이 존재하고 유효한 JSON 형식
   - `trends` 객체에 4개 카테고리 모두 포함
   - `insights` 필드에 전문가 요약 포함

**⚠️ 참고:** 자동 크롤링이 실패한 경우, 수동으로 Google 검색을 수행하여 데이터를 채워주세요.