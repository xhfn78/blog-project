# Step 3: 아이디어 브레인스토밍 (30개 선별)

## 🎯 이 단계의 목표
기존 도구와 **중복되지 않는** 새로운 도구 아이디어를 **카테고리별로** 30개 선별합니다.

> [!CAUTION]
> **정확히 30개만 생성하세요!** 100개가 아닙니다.
> - Converter: 10개
> - Generator: 10개
> - Formatter: 5개
> - Utility: 5개
> - **합계: 30개**

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

## ⚠️ 중요: 누락 방지 전략

AI가 한 번에 많은 양을 생성하면 누락이 발생하므로, **카테고리별로 분리**하여 생성합니다.

## 🇰🇷 언어 규칙 + 자연스러운 도구명

### 1. 한국어 필수

**모든 도구명과 설명은 한국어로 작성합니다.**
- ✅ 올바른 예: "SVG to JSX 변환기 - React 개발자를 위한 자동 최적화 도구"
- ❌ 잘못된 예: "SVG to JSX Converter - Automatic Optimization Tool for React Developers"

### 2. 자연스러운 도구명 작성 규칙

**도구명 구조: `[핵심 기능] - [대상 사용자 또는 구체적 가치]`**

**✅ 자연스러운 도구명:**
- "JSON Schema 생성기 - TypeScript 타입 기반 자동 변환"
- "API Mock 데이터 생성기 - 실시간 프론트엔드 개발 지원"
- "SQL 쿼리 포맷터 - 가독성 향상 및 문법 검증"
- "번들 크기 분석기 - Next.js 최적화 가이드"

**❌ AI 티 나는 도구명:**
- "최고의 JSON Schema 생성기" (과장)
- "누구나 쉽게 사용하는 API Mock 생성기" (친근감 과다)
- "완벽한 SQL 포맷터" (과장)

### 3. 롱테일 키워드 포함 원칙

**4-7단어로 구성하되, 구체적 기술 스택이나 사용 상황 포함:**

**좋은 예:**
- "Figma SVG to React 컴포넌트 변환기" (6단어, Figma/React 명시)
- "Tailwind CSS 클래스 조합 시각화 도구" (6단어, Tailwind 명시)
- "Next.js 빌드 번들 크기 최적화 분석기" (7단어, Next.js 명시)

**나쁜 예:**
- "변환기" (너무 짧음, 1단어)
- "정말 유용하고 강력한 개발자를 위한 최고의 변환 도구" (과장 + 너무 김)

### 4. reason 작성 시 자연스러움

**❌ AI 티:**
```json
"reason": "개발자들에게 정말 유용한 도구입니다. 간단하게 사용할 수 있어요!"
```

**✅ 자연스러움:**
```json
"reason": "디자인 시스템 구축 시 SVG 파일을 React 컴포넌트로 변환하는 작업이 빈번하며, 수동 변환 시 속성명 오류가 자주 발생합니다"
```

**차이점:**
- 구체적 상황 명시 (디자인 시스템 구축)
- 실제 문제점 설명 (속성명 오류)
- 과장 표현 제거 ("정말 유용한" → 구체적 설명)

### 카테고리별 목표 개수:
- **converter**: 10개
- **generator**: 10개
- **formatter**: 5개
- **utility**: 5개

**총 30개**

---

## 📋 카테고리별 생성 프로세스

### Step 3-1: Converter 아이디어 10개

**입력:**
- 기존 converter 도구 목록 (Step 1 결과)
- 경쟁 분석 데이터 (Step 2 결과, 선택적)

**생성 기준:**
1. 개발자가 실무에서 **자주 변환**하는 데이터 형식
2. 수동 변환 시 **오류가 발생하기 쉬운** 작업
3. **롱테일 키워드** 공략 가능 (경쟁 낮음)

**예시:**
```json
[
  {
    "slug": "svg-to-jsx",
    "name": "SVG to JSX 변환기 - React 개발자를 위한 자동 최적화 도구",
    "category": "converter",
    "reason": "디자인 시스템 구축 시 SVG를 JSX로 변환하는 작업이 빈번함",
    "difficulty": "medium",
    "demandScore": 8
  },
  {
    "slug": "postman-to-fetch",
    "name": "Postman to Fetch API 변환기 - API 테스트 코드 자동 생성",
    "category": "converter",
    "reason": "Postman Collection을 실제 코드로 변환할 때 필요",
    "difficulty": "high",
    "demandScore": 7
  }
]
```

**출력 파일:** `automation/cache/ideas-converter.json`

---

### Step 3-2: Generator 아이디어 10개

**생성 기준:**
1. 개발자가 **수동으로 작성하면 시간이 오래 걸리는** 코드
2. **패턴이 반복**되는 작업
3. **보안/무결성**이 중요한 데이터 생성

**예시:**
```json
[
  {
    "slug": "api-mock-generator",
    "name": "API Mock 데이터 생성기 - TypeScript 타입 기반 자동 생성",
    "category": "generator",
    "reason": "프론트엔드 개발 시 백엔드 API 대기 중 Mock 데이터 필요",
    "difficulty": "high",
    "demandScore": 9
  },
  {
    "slug": "dockerfile-generator",
    "name": "Dockerfile 자동 생성기 - Next.js/React 프로젝트 최적화",
    "category": "generator",
    "reason": "Docker 설정이 어려운 개발자를 위한 템플릿 생성",
    "difficulty": "medium",
    "demandScore": 7
  }
]
```

**출력 파일:** `automation/cache/ideas-generator.json`

---

### Step 3-3: Formatter 아이디어 5개

**생성 기준:**
1. **가독성** 향상이 필요한 데이터
2. **표준 규격** 준수가 필요한 형식
3. **팀 협업** 시 일관된 포맷 필요

**예시:**
```json
[
  {
    "slug": "sql-formatter",
    "name": "SQL 쿼리 포맷터 - 가독성 향상 및 문법 검증",
    "category": "formatter",
    "reason": "복잡한 SQL 쿼리를 읽기 쉽게 정리",
    "difficulty": "medium",
    "demandScore": 8
  },
  {
    "slug": "package-json-sorter",
    "name": "package.json 정렬 도구 - 알파벳 순 자동 정리",
    "category": "formatter",
    "reason": "팀 프로젝트에서 package.json 충돌 방지",
    "difficulty": "low",
    "demandScore": 5
  }
]
```

**출력 파일:** `automation/cache/ideas-formatter.json`

---

### Step 3-4: Utility 아이디어 5개

**생성 기준:**
1. **디버깅/테스트**에 도움이 되는 도구
2. **워크플로우 자동화**에 유용한 도구
3. **성능 최적화/분석** 도구

**예시:**
```json
[
  {
    "slug": "bundle-size-analyzer",
    "name": "번들 크기 분석기 - Next.js/React 최적화 가이드",
    "category": "utility",
    "reason": "프로젝트 빌드 시 번들 크기 확인 및 최적화 제안",
    "difficulty": "high",
    "demandScore": 8
  },
  {
    "slug": "git-commit-message-generator",
    "name": "Git 커밋 메시지 생성기 - Conventional Commits 자동화",
    "category": "utility",
    "reason": "일관된 커밋 메시지 작성 지원",
    "difficulty": "low",
    "demandScore": 6
  }
]
```

**출력 파일:** `automation/cache/ideas-utility.json`

---

## ✅ 최종 출력물

**파일:** `automation/cache/all-ideas.json`

```json
{
  "generatedAt": "2025-01-10T12:30:00Z",
  "totalIdeas": 30,
  "byCategory": {
    "converter": 10,
    "generator": 10,
    "formatter": 5,
    "utility": 5
  },
  "ideas": [
    /* 30개 아이디어 병합 */
  ]
}
```

---

## 🚫 이 단계에서 하지 않을 것

- ❌ 우선순위 평가 (Step 4에서 수행)
- ❌ 5개 선정 (Step 4에서 수행)
- ❌ 구현 시작 (Step 6에서 수행)

**이 단계는 오직 "아이디어 생성"만 수행합니다.**

---

## 📊 아이디어 평가 기준 (Step 4에서 사용)

각 아이디어는 다음 속성을 포함해야 합니다:

```typescript
interface ToolIdea {
  slug: string;
  name: string; // 롱테일 키워드 포함
  category: 'converter' | 'generator' | 'formatter' | 'utility';
  reason: string; // 왜 이 도구가 필요한지
  difficulty: 'low' | 'medium' | 'high'; // 구현 난이도
  demandScore: number; // 1-10점 (수요 예상)

  // Step 4에서 추가될 속성
  priorityScore?: number; // 최종 우선순위 점수
}
```

---

## 🔄 다음 단계

→ **Step 4: 우선순위 평가 및 5개 선정**
