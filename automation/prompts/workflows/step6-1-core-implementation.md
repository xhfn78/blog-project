# Step 6-1: 핵심 구현 (Config + 로직 + UI 통합)

## 🎯 이 단계의 목표
선택한 도구의 메타데이터, 비즈니스 로직, UI 컴포넌트를 **한 번에** 구현하여 동작 가능한 MVP를 완성합니다.

**⚠️ 핵심 원칙:**
- 모든 도구명(name), 설명(description)은 **한국어**로 작성
- FSD Lite 구조 준수: `tool.config.ts`, `lib/`, `model/`, `ui/`, `index.tsx`
- `src/shared/ui` 컴포넌트 최우선 사용
- Server Component First (불필요한 'use client' 금지)

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

## 📋 입력 데이터

**파일:** `automation/cache/selected-tool.json`

```json
{
  "slug": "example-tool",
  "name": "예시 도구 - 롱테일 키워드 포함",
  "category": "converter",
  "reason": "선택 이유"
}
```

---

## 🏗️ 구현 순서

### ✅ 1단계: tool.config.ts 생성

**경로:** `src/features/tools/tools/[slug]/tool.config.ts`

#### 필수 항목:
1. **slug** (선택된 도구의 slug)
2. **name** (한국어, 롱테일 키워드 포함)
3. **description** (250자 이상, SEO 최적화, 한국어)
4. **category** (converter, generator, formatter, utility)
5. **tags** (6-8개, 롱테일 키워드)
6. **author** (기본값: 'V-Blog Team')

#### description 작성 규칙:
```
[핵심 기능 설명 2-3문장 (한국어)] +
[대상 사용자 1문장 (한국어)] +
[주요 이점 3가지 (구체적 수치 포함, 한국어)] +
[기술적 특징 1문장 (한국어)]
```

**예시:**
```typescript
export const config: ToolConfig = {
  slug: 'svg-to-jsx',
  name: 'SVG to JSX 변환기 - React 개발자를 위한 자동 최적화 도구',
  description:
    'SVG 이미지를 React JSX 컴포넌트로 자동 변환하는 개발 도구입니다. ' +
    '디자인 시스템 구축 시 Figma, Sketch에서 내보낸 SVG 파일을 복사-붙여넣기만 하면 즉시 JSX 코드로 변환되며, ' +
    'SVGO 최적화 엔진을 통해 파일 크기를 30-50% 감소시킵니다. ' +
    'React 프론트엔드 개발자와 UI 디자이너가 협업할 때 SVG 아이콘, 일러스트를 컴포넌트화하는 시간을 크게 단축시킵니다. ' +
    'TypeScript 타입 정의 자동 생성, camelCase 속성 변환, 불필요한 메타데이터 제거 기능을 제공하며, ' +
    'Next.js, React, Vite 프로젝트에서 즉시 사용 가능한 코드를 출력합니다. ' +
    '브라우저 환경에서 완전히 동작하여 외부 서버 전송 없이 안전하게 처리됩니다.',
  category: 'converter',
  tags: [
    'svg',
    'react-component',
    'jsx-converter',
    'frontend-tool',
    'design-system',
    'typescript',
    'nextjs'
  ],
  author: 'V-Blog Team',
};
```

---

### ✅ 2단계: 타입 정의 (model/types.ts)

**경로:** `src/features/tools/tools/[slug]/model/types.ts`

#### 작성 내용:
- 도구의 모든 상태(State)와 Props 인터페이스 정의
- 외부 라이브러리 타입 확장 (필요 시)

**예시:**
```typescript
// PX to REM 변환기 예시
export interface ConversionState {
  pxValue: number;
  baseFontSize: number;
  remValue: number;
}

export interface ConverterProps {
  onConvert?: (result: ConversionState) => void;
}
```

---

### ✅ 3단계: 비즈니스 로직 (lib/)

**경로:** `src/features/tools/tools/[slug]/lib/`

#### 구현 방식:
- **커스텀 훅** 또는 **순수 함수**로 분리
- UI에서 로직을 완전히 분리 (테스트 용이성)

**예시 1: 순수 함수**
```typescript
// lib/converter.ts
export function pxToRem(px: number, baseFontSize: number = 16): number {
  return px / baseFontSize;
}

export function remToPx(rem: number, baseFontSize: number = 16): number {
  return rem * baseFontSize;
}
```

**예시 2: 커스텀 훅**
```typescript
// lib/use-converter.ts
'use client';

import { useState } from 'react';

export function useConverter() {
  const [pxValue, setPxValue] = useState(16);
  const [baseFontSize, setBaseFontSize] = useState(16);

  const remValue = pxValue / baseFontSize;

  return {
    pxValue,
    setPxValue,
    baseFontSize,
    setBaseFontSize,
    remValue,
  };
}
```

---

### ✅ 4단계: UI 컴포넌트 분리 (ui/)

**경로:** `src/features/tools/tools/[slug]/ui/`

#### 원칙:
- 한 파일 150줄 이내 목표
- `src/shared/ui` 컴포넌트 최대한 활용
- Presentational Component (Props로 상태 전달받기)

**예시 구조:**
```
ui/
├── ControlPanel.tsx    // 입력 UI
├── ResultDisplay.tsx   // 결과 표시
└── HistoryList.tsx     // 히스토리 (선택적)
```

**예시 코드:**
```typescript
// ui/ControlPanel.tsx
'use client';

import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';

interface ControlPanelProps {
  pxValue: number;
  onPxChange: (value: number) => void;
  baseFontSize: number;
  onBaseFontSizeChange: (value: number) => void;
}

export function ControlPanel({
  pxValue,
  onPxChange,
  baseFontSize,
  onBaseFontSizeChange,
}: ControlPanelProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="px-input">PX 값</Label>
        <Input
          id="px-input"
          type="number"
          value={pxValue}
          onChange={(e) => onPxChange(Number(e.target.value))}
        />
      </div>

      <div>
        <Label htmlFor="base-font">기본 폰트 크기</Label>
        <Input
          id="base-font"
          type="number"
          value={baseFontSize}
          onChange={(e) => onBaseFontSizeChange(Number(e.target.value))}
        />
      </div>
    </div>
  );
}
```

---

### ✅ 5단계: 메인 페이지 조립 (index.tsx)

**경로:** `src/features/tools/tools/[slug]/index.tsx`

#### 구조:
```typescript
'use client';

import { config } from './tool.config';
import { useConverter } from './lib/use-converter';
import { ControlPanel } from './ui/ControlPanel';
import { ResultDisplay } from './ui/ResultDisplay';

export default function ToolPage() {
  const { pxValue, setPxValue, baseFontSize, setBaseFontSize, remValue } = useConverter();

  return (
    <div className="container mx-auto py-12 px-4">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">{config.name}</h1>
        <p className="text-lg text-gray-600">{config.description}</p>
      </header>

      <main className="max-w-3xl mx-auto space-y-8">
        {/* 도구 실행 영역 */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-6">변환 도구</h2>
          <ControlPanel
            pxValue={pxValue}
            onPxChange={setPxValue}
            baseFontSize={baseFontSize}
            onBaseFontSizeChange={setBaseFontSize}
          />
          <ResultDisplay remValue={remValue} />
        </section>

        {/* 광고 배치 공간 (나중에 추가) */}
        <div className="my-8" />

        {/* 사용 방법 섹션 */}
        <section className="prose max-w-none">
          <h2>사용 방법</h2>
          <ol>
            <li>PX 값을 입력하세요</li>
            <li>기본 폰트 크기를 설정하세요 (기본값: 16px)</li>
            <li>자동으로 REM 값이 계산됩니다</li>
          </ol>
        </section>
      </main>
    </div>
  );
}
```

---

## 🛠️ 구현 시 주의사항

### 🚫 절대 금지:
1. ❌ **영어로 도구명/설명 작성** (반드시 한국어)
2. ❌ **src/shared/ui 외부에 커스텀 UI 컴포넌트 생성**
3. ❌ **불필요한 'use client' 남발** (상호작용 필요한 곳만)
4. ❌ **AI 티 나는 표현** ("여러분", "해보세요", "간단합니다")

### ✅ 반드시 준수:
1. ✅ description 250자 이상 (구체적 수치 포함)
2. ✅ tags 6-8개 (롱테일 키워드)
3. ✅ FSD 폴더 구조 (tool.config.ts, lib/, model/, ui/, index.tsx)
4. ✅ `src/shared/ui` 컴포넌트 우선 사용

---

## 📂 최종 폴더 구조

```
src/features/tools/tools/[slug]/
├── tool.config.ts           # 메타데이터
├── index.tsx                # 메인 페이지
├── model/
│   └── types.ts            # TypeScript 타입
├── lib/
│   ├── converter.ts        # 순수 함수
│   └── use-converter.ts    # 커스텀 훅
└── ui/
    ├── ControlPanel.tsx    # 입력 UI
    └── ResultDisplay.tsx   # 결과 UI
```

---

## ✅ 완료 조건

이 단계를 완료하면 다음이 준비되어야 합니다:

1. ✅ `tool.config.ts` 생성됨 (description 250자+, tags 6-8개)
2. ✅ `index.tsx` 생성됨 (기본 UI + 사용 방법 섹션)
3. ✅ `lib/` 폴더에 로직 파일 1개 이상
4. ✅ `model/` 폴더에 타입 파일
5. ✅ `ui/` 폴더에 컴포넌트 2개 이상
6. ✅ 브라우저에서 기본 기능이 동작함 (MVP)

**다음 단계:** Step 6-2 (고도화 분석 + 파워업 구현)

---

## 🎯 AI 작업자에게

이 프롬프트를 읽었다면:

1. `automation/cache/selected-tool.json`을 읽어서 선택된 도구 정보를 확인하세요
2. 위 5단계를 순서대로 수행하세요
3. 모든 파일을 생성한 후 **"완료"**라고 응답하세요
4. 생성한 파일 경로 목록을 출력하세요

**⚠️ 한국어 작성 필수!** description과 name은 반드시 한국어로 작성해야 합니다.
