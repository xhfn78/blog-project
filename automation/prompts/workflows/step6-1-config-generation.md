# Step 6-1: tool.config.ts 생성

## 🎯 이 단계의 목표
선택한 도구의 **메타데이터만** 작성하여 `tool.config.ts` 파일을 생성합니다.

---

## 🇰🇷 언어 규칙 (절대 준수)

**모든 도구명(name)과 설명(description)은 한국어로 작성합니다.**

### ✅ 올바른 예시:
```typescript
name: 'SVG to JSX 변환기 - React 개발자를 위한 자동 최적화 도구',
description: 'SVG 이미지를 React JSX 컴포넌트로 자동 변환하는 개발 도구입니다...'
```

### ❌ 잘못된 예시:
```typescript
name: 'SVG to JSX Converter - Automatic Optimization Tool for React Developers',
description: 'This tool converts SVG images to React JSX components...'
```

**기술 용어(SVG, JSX, React 등)는 영문 그대로 사용하되, 설명 문장은 반드시 한국어로 작성합니다.**

---

## 📋 입력 데이터

**파일:** `automation/cache/selected-tool.json`

```json
{
  "slug": "svg-to-jsx",
  "name": "SVG to JSX 변환기 - React 개발자를 위한 자동 최적화 도구",
  "category": "converter",
  "reason": "디자인 시스템 구축 시 SVG를 JSX로 변환하는 작업이 빈번함"
}
```

---

## ✏️ 작성 내용

### 필수 작성 항목:

1. **slug** (자동 - 선택한 도구의 slug)
2. **name** (자동 - 선택한 도구의 name, 롱테일 키워드 포함)
3. **description** (250자 이상, SEO 최적화)
4. **category** (자동 - 선택한 도구의 category)
5. **tags** (6-8개, 롱테일 키워드 조합)
6. **author** (기본값: 'V-Blog Team')

---

## 📝 description 작성 가이드 (250자 이상)

**⚠️ 중요:** description은 Google 검색 결과에 표시되는 메타 설명입니다. SEO 최적화가 필수입니다.

### 롱테일 키워드 전략:
- **핵심 키워드 포함:** 도구의 주요 기능을 나타내는 키워드 2-3개
- **대상 사용자 명시:** "프론트엔드 개발자", "React 개발자", "디자이너" 등
- **구체적 이점:** "30-50% 감소", "90% 단축" 등 수치 포함
- **기술 스택 언급:** Next.js, TypeScript, Tailwind 등

### 구조:
```
[핵심 기능 설명 2-3문장 (한국어)] +
[대상 사용자 1문장 (한국어)] +
[주요 이점 3가지 1문장 (한국어)] +
[기술적 특징 1문장 (한국어)]
```

### 예시:
```typescript
description:
  'SVG 이미지를 React JSX 컴포넌트로 자동 변환하는 개발 도구입니다. ' +
  '디자인 시스템 구축 시 Figma, Sketch에서 내보낸 SVG 파일을 복사-붙여넣기만 하면 즉시 JSX 코드로 변환되며, ' +
  'SVGO 최적화 엔진을 통해 파일 크기를 30-50% 감소시킵니다. ' +
  'React 프론트엔드 개발자와 UI 디자이너가 협업할 때 SVG 아이콘, 일러스트를 컴포넌트화하는 시간을 크게 단축시킵니다. ' +
  'TypeScript 타입 정의 자동 생성, camelCase 속성 변환, 불필요한 메타데이터 제거 기능을 제공하며, ' +
  'Next.js, React, Vite 프로젝트에서 즉시 사용 가능한 코드를 출력합니다. ' +
  '브라우저 환경에서 완전히 동작하여 외부 서버 전송 없이 안전하게 처리됩니다.',
```

**글자 수:** 276자 ✅

---

## 🏷️ tags 작성 가이드 (6-8개)

### 전략:
- 핵심 키워드 (도구 기능)
- 대상 사용자
- 기술 스택
- 활용 시나리오
- 롱테일 조합 (하이픈으로 연결)

### 예시:
```typescript
tags: [
  'svg-converter',           // 핵심 기능
  'jsx-generator',           // 핵심 기능
  'react-developer-tools',   // 대상 사용자
  'design-system',           // 활용 시나리오
  'svgo-optimization',       // 기술 스택
  'figma-to-react',          // 롱테일 조합
  'icon-component',          // 활용 시나리오
  'typescript-support',      // 추가 기능
],
```

**개수:** 8개 ✅

---

## ✅ 최종 출력물

**파일:** `src/features/tools/tools/svg-to-jsx/tool.config.ts`

```typescript
import { ToolRegistration } from '@/shared/config/tools-registry';

type ToolConfig = Omit<ToolRegistration, 'component'>;

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
    'svg-converter',
    'jsx-generator',
    'react-developer-tools',
    'design-system',
    'svgo-optimization',
    'figma-to-react',
    'icon-component',
    'typescript-support',
  ],

  author: 'V-Blog Team',
};
```

---

## 🚫 이 단계에서 하지 않을 것

- ❌ UI 구현 (Step 6-2에서 수행)
- ❌ SEO 콘텐츠 작성 (Step 6-3에서 수행)
- ❌ 로직 구현 (Step 6-2에서 수행)

**이 단계는 오직 "tool.config.ts 메타데이터"만 작성합니다.**

---

## ✅ 검증

작성 완료 후 자동 검증:
```bash
npm run validate-tool svg-to-jsx
```

**통과 기준:**
- ✅ description 250자 이상
- ✅ tags 6-8개
- ✅ slug가 고유함

---

## 🔄 다음 단계

→ **Step 6-2: UI 구현** (도구 실행 영역 + 사용 방법 섹션)
