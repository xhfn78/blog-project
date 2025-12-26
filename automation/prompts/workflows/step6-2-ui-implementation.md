# Step 6-2: UI 구현

## 🎯 이 단계의 목표
도구의 **실행 UI**와 **사용 방법 섹션**만 구현합니다. SEO 콘텐츠는 다음 단계에서 작성합니다.

---

## 🇰🇷 언어 규칙 (절대 준수)

**모든 UI 텍스트, 버튼 레이블, 플레이스홀더, 사용 방법 섹션은 한국어로 작성합니다.**

### ✅ 올바른 예시:
```tsx
<Button onClick={handleConvert}>JSX로 변환</Button>
<Textarea placeholder="<svg>...</svg> 코드를 붙여넣으세요" />
<Typography variant="h2">사용 방법</Typography>
```

### ❌ 잘못된 예시:
```tsx
<Button onClick={handleConvert}>Convert to JSX</Button>
<Textarea placeholder="Paste your SVG code here" />
<Typography variant="h2">How to Use</Typography>
```

---

## 🏗️ 아키텍처 규칙 (FSD Lite + Next.js)

### Server Component vs Client Component

**기본 원칙: Server Component First**

- **도구 페이지는 기본적으로 Server Component로 시작**하되, 상호작용(useState, onClick 등)이 필요한 **최소 단위만** `'use client'` 지시문 사용
- **대부분의 도구는 Client Component가 필요**하므로 파일 최상단에 `'use client'` 추가

```tsx
'use client';  // ✅ 상호작용이 필요한 경우 최상단에 배치

import { useState } from 'react';
// ...
```

### src/shared/ui 컴포넌트 우선 사용 (필수)

**절대 금지:** 도구별로 커스텀 UI 컴포넌트 만들기
**의무 사항:** `src/shared/ui`의 기존 컴포넌트만 사용

```tsx
// ✅ 올바른 사용
import { ToolLayout, ToolSection } from '@/shared/ui/tool-layout';
import { Typography } from '@/shared/ui/typography';
import { Textarea } from '@/shared/ui/textarea';
import { Button } from '@/shared/ui/button';

// ❌ 금지 - 커스텀 UI 컴포넌트 생성
const MyCustomButton = styled.button`...`;  // 이렇게 하지 마세요!
```

### FSD 폴더 구조 (복잡한 로직이 있는 경우)

도구가 복잡한 변환 로직을 포함한다면 다음 구조 사용:

```
src/features/tools/tools/svg-to-jsx/
├── tool.config.ts           # Step 6-1에서 생성됨
├── index.tsx                # 이 단계에서 생성 (UI + 간단한 로직)
├── lib/                     # 복잡한 로직 분리 (선택적)
│   └── svg-parser.ts        # 예: SVG 파싱 로직
├── model/                   # 타입 정의 (선택적)
│   └── types.ts
└── __tests__/               # 테스트 (선택적)
    └── svg-to-jsx.test.tsx
```

**이 단계에서는:**
- `index.tsx`에 모든 로직을 포함해도 됨 (간단한 도구인 경우)
- 로직이 100줄 이상이면 `lib/` 폴더에 분리 고려

---

## 📋 구현 범위

### ✅ 이 단계에서 작성할 부분:

1. **도구 실행 영역** (입력/출력/버튼)
2. **변환 로직** (useState, useEffect 등)
3. **옵션 UI** (있다면)
4. **사용 방법 섹션** (500자 정도의 간단한 가이드)

### ❌ 이 단계에서 작성하지 않을 부분:

- SEO 콘텐츠 영역 (2,500자) → Step 6-3에서 수행
- FAQ → Step 6-3에서 수행
- 기술적 배경 → Step 6-3에서 수행

---

## 🎯 Lighthouse 100점 최적화 (필수)

### 성능 최적화:
- **next/image 사용:** 이미지가 있다면 `<img>` 대신 `next/image` 사용
- **lazy loading:** 무거운 컴포넌트는 dynamic import 고려
- **불필요한 re-render 방지:** React.memo, useMemo, useCallback 활용

### 접근성 (a11y):
- **시맨틱 HTML:** `<div>` 남용 금지, `<section>`, `<article>`, `<nav>` 활용
- **ARIA 속성:** 버튼에 aria-label, 입력창에 aria-describedby
- **키보드 네비게이션:** 모든 인터랙션 요소에 tab 접근 가능

### SEO:
- **generateMetadata 필수:** 모든 도구 페이지에 메타데이터 정의
- **JSON-LD 스키마:** SoftwareApplication 타입으로 구조화된 데이터 삽입

---

## 📝 템플릿 구조

```tsx
'use client';  // ⚠️ 최상단에 배치 (상호작용 필요 시)

import type { Metadata } from 'next';
import { useState } from 'react';
import { ToolLayout, ToolSection } from '@/shared/ui/tool-layout';
import { Typography } from '@/shared/ui/typography';
import { Textarea } from '@/shared/ui/textarea';
import { Button } from '@/shared/ui/button';
import { config } from './tool.config';

// ============================================
// SEO: generateMetadata (필수 - 모든 도구에 포함)
// ============================================
export async function generateMetadata(): Promise<Metadata> {
  const title = `${config.name}`;
  const description = config.description;
  const url = `https://yourdomain.com/${config.category}/${config.slug}`;
  const ogImage = `https://yourdomain.com/og-images/${config.slug}.png`;

  return {
    title,
    description,
    keywords: config.tags.join(', '),
    openGraph: {
      type: 'website',
      url,
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: config.name }],
      locale: 'ko_KR',
      siteName: 'V-Blog Developer Tools',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    alternates: { canonical: url },
  };
}

export default function SvgToJsxConverter() {
  // ============================================
  // 상태 관리
  // ============================================
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [options, setOptions] = useState({
    typescript: true,
    optimize: true,
  });

  // ============================================
  // 변환 로직
  // ============================================
  const handleConvert = () => {
    try {
      // TODO: 실제 변환 로직 구현
      let result = input;

      if (options.optimize) {
        // SVGO 최적화 로직
        result = result.replace(/\s+/g, ' '); // 간단한 예시
      }

      if (options.typescript) {
        // TypeScript 타입 추가
        result = `const Icon: React.FC = () => (${result});`;
      }

      setOutput(result);
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };

  // ============================================
  // JSON-LD 구조화 데이터
  // ============================================
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: config.name,
    description: config.description,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web Browser',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
    author: { '@type': 'Organization', name: config.author || 'V-Blog Team' },
  };

  return (
    <ToolLayout config={config}>
      {/* JSON-LD 삽입 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1️⃣ 도구 실행 영역 */}
      <ToolSection title={config.name}>
        <div className="space-y-4">
          {/* 입력 영역 */}
          <div>
            <Typography variant="label">SVG 코드 입력</Typography>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="<svg>...</svg> 코드를 붙여넣으세요"
              className="h-64 font-mono text-sm"
            />
          </div>

          {/* 옵션 영역 (도구에 따라 다름) */}
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={options.typescript}
                onChange={(e) =>
                  setOptions({ ...options, typescript: e.target.checked })
                }
              />
              <span>TypeScript 타입 추가</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={options.optimize}
                onChange={(e) =>
                  setOptions({ ...options, optimize: e.target.checked })
                }
              />
              <span>SVGO 최적화</span>
            </label>
          </div>

          {/* 변환 버튼 */}
          <Button onClick={handleConvert} className="w-full">
            JSX로 변환
          </Button>

          {/* 출력 영역 */}
          <div>
            <Typography variant="label">변환 결과</Typography>
            <Textarea
              value={output}
              readOnly
              placeholder="변환 결과가 여기에 표시됩니다"
              className="h-64 font-mono text-sm"
            />
          </div>

          {/* 복사 버튼 */}
          <Button
            variant="outline"
            onClick={() => navigator.clipboard.writeText(output)}
            disabled={!output}
          >
            결과 복사
          </Button>
        </div>
      </ToolSection>

      {/* 광고 배치 공간 */}
      <div className="my-8" />

      {/* 2️⃣ 사용 방법 (간단하게) */}
      <ToolSection title="사용 방법">
        <Typography variant="p">
          이 도구는 SVG 이미지를 React JSX 컴포넌트로 자동 변환합니다. 아래 단계를
          따라 사용하세요:
        </Typography>

        <ol className="list-decimal pl-6 space-y-2 mt-4">
          <li>
            <strong>SVG 복사:</strong> Figma, Sketch, 또는 디자인 툴에서 SVG 코드를
            복사합니다
          </li>
          <li>
            <strong>붙여넣기:</strong> 상단 입력창에 SVG 코드를 붙여넣습니다
          </li>
          <li>
            <strong>옵션 선택:</strong> TypeScript 타입 추가, SVGO 최적화 등을
            선택합니다
          </li>
          <li>
            <strong>변환 실행:</strong> "JSX로 변환" 버튼을 클릭합니다
          </li>
          <li>
            <strong>결과 복사:</strong> 변환된 JSX 코드를 복사하여 프로젝트에
            사용합니다
          </li>
        </ol>
      </ToolSection>

      {/* 광고 배치 공간 */}
      <div className="my-8" />

      {/* 3️⃣ SEO 콘텐츠 영역은 Step 6-3에서 추가 */}
      {/* 여기에는 아무것도 작성하지 않음 */}
    </ToolLayout>
  );
}
```

---

## 🎨 도구별 UI 변형

### Converter 타입:
- 입력/출력 Textarea 2개
- 변환 버튼 1개
- 옵션 체크박스 (선택적)

### Generator 타입:
- 옵션 입력 폼
- 생성 버튼 1개
- 출력 Textarea 1개

### Formatter 타입:
- 입력 Textarea 1개
- 포맷 버튼 1개
- 출력 Textarea 1개 (또는 in-place 편집)

### Utility 타입:
- 도구에 따라 자유 형식
- 파일 업로드, 드래그앤드롭 등

---

## ✅ 완료 기준

- [ ] useState로 입력/출력 상태 관리
- [ ] 변환/생성 로직 구현 (간단한 버전)
- [ ] 버튼 클릭 시 동작 확인
- [ ] 사용 방법 섹션 작성 (500자 정도)
- [ ] generateMetadata 함수 포함
- [ ] JSON-LD script 태그 포함

---

## 🚫 이 단계에서 하지 않을 것

- ❌ SEO 콘텐츠 2,500자 작성 (Step 6-3)
- ❌ FAQ 작성 (Step 6-3)
- ❌ 기술적 배경 작성 (Step 6-3)
- ❌ 비교 표 작성 (Step 6-3)
- ❌ 내부 링크 추가 (Step 6-3)

**이 단계는 오직 "도구 실행 UI + 간단한 사용 방법"만 작성합니다.**

---

## 🔄 다음 단계

→ **Step 6-3: SEO 콘텐츠 작성** (2,500자+ 본문 + FAQ + 기술 배경)
