# 📋 도구 플랫폼 + 디자인 시스템 구축 계획

**작성일:** 2025-12-17
**목표:** FSD Lite 아키텍처 + 디자인 시스템 기반의 팀 협업 도구 플랫폼 구축

---

## 🎯 전체 목표

### 1. 디자인 시스템 구축 (Single Source of Truth)
- Design Tokens 체계화 (Tailwind + TypeScript)
- 핵심 12종 컴포넌트 구현
- Storybook 문서화 + VRT/A11Y 자동 감사

### 2. FSD Lite 아키텍처 전환
- `src/shared` (UI/Lib) - 재사용 가능한 공통 계층
- `src/entities` (Type/Model) - 비즈니스 엔티티
- `src/features/[feature]` - 기능별 모듈
- `src/app` - Next.js 라우팅 및 조립

### 3. 팀 협업 인프라
- 도구 레지스트리 시스템
- 도구 추가 템플릿 (5분 컷)
- 자동화 스크립트 (`npm run create-tool`)

### 4. 첫 번째 도구 준비
- 코드 스냅샷 UI 스켈레톤 (팀원 작업 대기용)

---

## 🏗️ 아키텍처 설계

### 최종 폴더 구조
```
src/
├── shared/                                # 공통 계층 (SSOT)
│   ├── ui/                               # 디자인 시스템 (12종 컴포넌트)
│   │   ├── button.tsx + stories
│   │   ├── input.tsx + stories
│   │   ├── card.tsx + stories
│   │   ├── typography.tsx + stories
│   │   ├── icon.tsx + stories
│   │   ├── checkbox.tsx + stories
│   │   ├── dialog.tsx + stories
│   │   ├── tool-card.tsx + stories       # 도구 특화
│   │   ├── tool-layout.tsx + stories
│   │   ├── code-block.tsx + stories
│   │   ├── copy-button.tsx + stories
│   │   └── category-badge.tsx + stories
│   ├── lib/
│   │   ├── cn.ts                         # clsx/cva 래퍼
│   │   ├── utils.ts
│   │   ├── tokens/
│   │   │   └── design-tokens.ts
│   │   └── hooks/
│   │       └── use-copy-to-clipboard.ts
│   └── config/
│       └── tools-registry.ts             # 도구 레지스트리
│
├── entities/                              # 비즈니스 엔티티
│   └── content/
│       ├── model/
│       │   ├── types.ts                  # BaseContent, Tool, Post
│       │   ├── tool-category.ts
│       │   └── schemas.ts                # Zod 검증
│       ├── repository/
│       │   ├── content.repository.ts
│       │   └── content.repository.impl.ts
│       └── ui/
│           ├── content-card.tsx
│           └── content-badge.tsx
│
├── features/                              # 기능 모듈
│   ├── tools/
│   │   ├── model/
│   │   │   └── tool.service.ts
│   │   ├── ui/
│   │   │   ├── tool-grid.tsx
│   │   │   ├── tool-detail-layout.tsx
│   │   │   └── tool-form.tsx
│   │   ├── lib/
│   │   │   └── use-tool-store.ts
│   │   └── tools/                        # 실제 도구들
│   │       ├── _template/                # 템플릿
│   │       │   ├── index.tsx
│   │       │   ├── tool.config.ts
│   │       │   └── README.md
│   │       └── code-snapshot/            # 첫 번째 도구
│   │           ├── index.tsx
│   │           └── tool.config.ts
│   │
│   └── blog/                             # 블로그 기능
│       ├── ui/
│       │   ├── post-list.tsx
│       │   └── post-form.tsx
│       └── lib/
│           └── use-blog-store.ts
│
└── app/                                   # Next.js 라우팅
    ├── (tools)/
    │   ├── layout.tsx
    │   ├── page.tsx
    │   └── [category]/[slug]/
    │       └── page.tsx
    └── blog/
```

### 설정 파일
```
.storybook/                               # Storybook 설정
├── main.ts
├── preview.ts
└── addons/
    ├── vrt-addon.ts
    └── a11y-addon.ts

scripts/
└── create-tool.js                        # 도구 자동 생성 스크립트

tailwind.config.ts                        # 디자인 토큰 정의
```

---

## 📝 핵심 타입 시스템

### BaseContent (공통 베이스)
```typescript
interface BaseContent {
  id: string;
  type: ContentType;
  title: string;
  slug: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
}

type ContentType = 'tool' | 'blog' | 'snippet';
```

### Tool (도구 특화)
```typescript
interface Tool extends BaseContent {
  type: 'tool';
  category: ToolCategory;
  component: string;
  tags: string[];
  featured: boolean;
  author: string;
  usageCount?: number;
}

type ToolCategory = 'converter' | 'generator' | 'formatter' | 'utility';
```

### Post (블로그)
```typescript
interface Post extends BaseContent {
  type: 'blog';
  content: string;
  excerpt: string;
}
```

---

## 🎨 디자인 토큰

### Color System
```typescript
colors: {
  primary: { ... },
  secondary: { ... },
  accent: { ... },
  semantic: {
    success: { ... },
    warning: { ... },
    error: { ... },
    info: { ... },
  },
  tool: {
    converter: 'blue-500',
    generator: 'green-500',
    formatter: 'purple-500',
    utility: 'orange-500',
  }
}
```

### Spacing, Typography, Shadow, Breakpoints
- Tailwind config + TypeScript 변수로 이중 정의
- 일관된 사용을 위한 토큰화

---

## 🔄 Repository 패턴

### 인터페이스
```typescript
interface ContentRepository<T extends BaseContent> {
  findAll(filter?: ContentFilter): Promise<T[]>;
  findBySlug(slug: string): Promise<T | null>;
  create(data: CreateContentDTO): Promise<T>;
  update(id: string, data: UpdateContentDTO): Promise<T>;
  delete(id: string): Promise<void>;
}
```

### 장점
- UI에서 데이터 접근 로직 분리
- 테스트 용이성
- 향후 DB 교체 시 Repository만 수정

---

## 🚀 도구 추가 워크플로우

### 팀원이 새 도구를 추가하는 방법 (5분 컷)

#### 방법 1: 자동화 스크립트 사용
```bash
npm run create-tool json-formatter

# 자동 실행:
# 1. _template 복사 → tools/json-formatter/
# 2. slug 자동 삽입
# 3. TOOLS_REGISTRY에 엔트리 추가
# 4. Git 브랜치 생성 (feature/tool-json-formatter)
```

#### 방법 2: 수동 복사
```bash
# 1. 템플릿 복사
cp -r src/features/tools/tools/_template src/features/tools/tools/json-formatter

# 2. tool.config.ts 수정
export const config: ToolConfig = {
  slug: 'json-formatter',
  name: 'JSON Formatter',
  category: 'formatter',
  description: 'JSON을 예쁘게 포맷팅',
  tags: ['json', 'format'],
  author: 'your-name',
}

# 3. index.tsx 구현
export default function JsonFormatter() {
  return <ToolLayout config={config}>...</ToolLayout>
}

# 4. TOOLS_REGISTRY 등록
import { config as jsonFormatterConfig } from '../tools/json-formatter/tool.config';

export const TOOLS_REGISTRY: ToolRegistration[] = [
  {
    ...jsonFormatterConfig,
    component: lazy(() => import('../tools/json-formatter')),
  },
];

# 5. 커밋
git commit -m "feat(tools): json-formatter 추가"
```

---

## 🛡️ 보안 & 품질 체크리스트

### 디자인 시스템
- [ ] **DS-1**: Design Tokens가 Tailwind + TS 양쪽에 정의됨
- [ ] **DS-2**: 12종 컴포넌트 모두 `src/shared/ui`에 위치
- [ ] **DS-3**: 모든 컴포넌트에 `*.stories.tsx` 파일 존재
- [ ] **DS-4**: Storybook VRT 통과
- [ ] **DS-5**: Storybook A11Y 감사 통과
- [ ] **DS-6**: TSDoc으로 모든 Public API 문서화

### 아키텍처
- [ ] **A-1**: FSD Lite 계층 분리 준수 (`shared`, `entities`, `features`, `app`)
- [ ] **A-2**: `src/shared/ui` 외부에 UI 컴포넌트 중복 없음
- [ ] **A-3**: Repository 패턴을 통한 데이터 접근
- [ ] **A-4**: Server Component 우선 사용
- [ ] **A-5**: `'use client'` 최소화

### 보안
- [ ] **S-1**: `NEXT_PUBLIC_` 오남용 없음
- [ ] **S-2**: Zod 서버 측 입력 검증 구현
- [ ] **S-3**: 민감 정보 클라이언트 노출 없음

### SEO & 성능
- [ ] **P-1**: 모든 페이지에 `generateMetadata` 구현
- [ ] **P-2**: `next/image` 사용
- [ ] **P-3**: JSON-LD 구조화된 데이터 삽입

### 팀 협업
- [ ] **T-1**: 도구 추가 템플릿 제공
- [ ] **T-2**: 도구 레지스트리 시스템 작동
- [ ] **T-3**: `npm run create-tool` 스크립트 작동
- [ ] **T-4**: 템플릿 README.md에 5분 가이드 포함

---

## 📊 작업 단계 (Phase별 진행)

### Phase 1: 디자인 시스템 기반 구축 🎨
#### 1-1. Design Tokens 정의
- [x] `tailwind.config.ts`에 토큰 정의
  - [x] Color System (primary, secondary, tool categories)
  - [x] Spacing Scale (4px 기반)
  - [x] Typography Scale (font sizes, weights, line heights)
  - [x] Shadow/Elevation
  - [x] Breakpoints (responsive)
- [x] `src/shared/lib/tokens/design-tokens.ts` 생성
  - [x] TypeScript 변수로 토큰 export
  - [x] 타입 안전성 확보 (`as const`)

#### 1-2. Storybook 환경 설정
- [x] `.storybook/` 폴더 생성
- [x] `main.ts`, `preview.ts` 설정
- [x] VRT Addon 설치 및 설정
- [x] A11Y Addon 설치 및 설정
- [x] Tailwind CSS 연동

#### 1-3. 핵심 컴포넌트 구현 (기본 7종)
- [x] Button (variants, sizes, states)
  - [x] `button.tsx` 구현
  - [x] `button.stories.tsx` 작성
  - [ ] A11Y 감사 통과
- [x] Input (text, password, email, etc.)
  - [x] `input.tsx` 구현
  - [x] `input.stories.tsx` 작성
- [x] Card (header, content, footer)
  - [x] `card.tsx` 구현
  - [x] `card.stories.tsx` 작성
- [x] Typography (h1-h6, p, span)
  - [x] `typography.tsx` 구현
  - [x] `typography.stories.tsx` 작성
- [x] Icon (Lucide wrapper)
  - [x] `icon.tsx` 구현
  - [x] `icon.stories.tsx` 작성
- [x] Checkbox
  - [x] `checkbox.tsx` 구현
  - [x] `checkbox.stories.tsx` 작성
- [x] Dialog (modal)
  - [x] `dialog.tsx` 구현
  - [x] `dialog.stories.tsx` 작성

#### 1-4. 도구 특화 컴포넌트 (추가 5종)
- [x] ToolCard
  - [x] `tool-card.tsx` 구현
  - [x] `tool-card.stories.tsx` 작성
- [x] ToolLayout
  - [x] `tool-layout.tsx` 구현
  - [x] `tool-layout.stories.tsx` 작성
- [x] CodeBlock (syntax highlight)
  - [x] `code-block.tsx` 구현
  - [x] `code-block.stories.tsx` 작성
- [x] CopyButton
  - [x] `copy-button.tsx` 구현
  - [x] `copy-button.stories.tsx` 작성
- [x] CategoryBadge
  - [x] `category-badge.tsx` 구현
  - [x] `category-badge.stories.tsx` 작성

#### 1-5. 공통 유틸리티
- [x] `src/shared/lib/cn.ts` 구현 (clsx/cva 래퍼)
- [x] `src/shared/lib/hooks/use-copy-to-clipboard.ts` 구현

---

### Phase 2: FSD Lite 구조 + 도구 인프라 🏗️
#### 2-1. 폴더 구조 생성
- [x] `src/shared/ui/` 생성 (Phase 1에서 구현)
- [x] `src/shared/lib/` 생성
- [x] `src/shared/config/` 생성
- [x] `src/entities/content/` 생성
- [x] `src/features/tools/` 생성
- [x] `src/features/blog/` 생성

#### 2-2. 타입 시스템 구현
- [x] `src/entities/content/model/types.ts`
  - [x] `BaseContent` 인터페이스
  - [x] `Tool` 인터페이스
  - [x] `Post` 인터페이스
  - [x] `ContentType` 타입
- [x] `src/entities/content/model/tool-category.ts`
  - [x] `ToolCategory` enum
  - [x] 카테고리별 메타데이터 (color, icon)
- [x] `src/entities/content/model/schemas.ts`
  - [x] Zod 검증 스키마 (createToolSchema, createPostSchema)

#### 2-3. Repository 패턴 구현
- [x] `src/entities/content/repository/content.repository.ts`
  - [x] `ContentRepository<T>` 인터페이스 정의
- [x] `src/entities/content/repository/content.repository.impl.ts`
  - [x] 인메모리 구현체 (초기)
  - [x] CRUD 메서드 구현
  - [x] 타입별 필터링 지원

#### 2-4. 도구 레지스트리 시스템
- [x] `src/shared/config/tools-registry.ts`
  - [x] `ToolRegistration` 인터페이스
  - [x] `TOOLS_REGISTRY` 배열 생성
  - [x] 동적 import 지원
- [x] `src/features/tools/lib/use-tool-store.ts`
  - [x] Zustand Store (Repository 기반)
  - [x] 도구 목록 관리
  - [x] 카테고리별 필터링

#### 2-5. 도구 추가 템플릿
- [x] `src/features/tools/tools/_template/` 생성
  - [x] `index.tsx` (템플릿 컴포넌트)
  - [x] `tool.config.ts` (설정 템플릿)
  - [x] `README.md` (5분 가이드)
- [x] `src/features/tools/tools/code-snapshot/` 생성
  - [x] UI 스켈레톤만 제공 (비워둠)
  - [x] `tool.config.ts` 기본 설정
  - [x] 주석으로 가이드 제공

---

### Phase 3: 자동화 & 라우팅 🔄
#### 3-1. 자동화 스크립트
- [x] `scripts/create-tool.js` 생성
  - [ ] 템플릿 복사 로직
  - [ ] slug 자동 생성
  - [ ] TOOLS_REGISTRY 자동 업데이트
  - [ ] Git 브랜치 자동 생성
- [x] `package.json`에 스크립트 추가
  ```json
  "scripts": {
    "create-tool": "node scripts/create-tool.js"
  }
  ```

#### 3-2. Next.js 라우팅
- [x] `src/app/(tools)/layout.tsx`
  - [ ] 도구 공통 레이아웃
  - [ ] 네비게이션
  - [ ] SEO 메타데이터
- [x] `src/app/(tools)/page.tsx`
  - [ ] 도구 그리드 홈페이지
  - [ ] 카테고리별 필터링
  - [ ] 검색 기능
- [x] `src/app/(tools)/[category]/[slug]/page.tsx`
  - [ ] 동적 도구 페이지
  - [ ] Server Component로 데이터 페칭
  - [ ] 도구 컴포넌트 동적 렌더링

#### 3-3. Features UI 컴포넌트
- [x] `src/features/tools/ui/tool-grid.tsx`
  - [ ] 도구 목록 그리드 레이아웃
  - [ ] shared/ui 컴포넌트 조합
- [x] `src/features/tools/ui/tool-detail-layout.tsx`
  - [ ] 도구 상세 페이지 레이아웃
- [x] `src/features/tools/ui/tool-form.tsx`
  - [ ] 도구 추가/수정 폼

---

### Phase 4: 기존 코드 마이그레이션 📦
#### 4-1. 블로그 기능 이동
- [x] `src/components/blog/` → `src/features/blog/ui/` 이동
  - [x] `post-list.tsx`
  - [x] `post-form.tsx`
  - [x] `post-card.tsx`
  - [x] `markdown-editor.tsx`
- [x] `src/lib/stores/post-store.ts` → `src/features/blog/lib/use-blog-store.ts`
  - [x] Repository 패턴으로 전환
- [x] `src/lib/validations/post.ts` → `src/entities/content/model/schemas.ts` 통합

#### 4-2. UI 컴포넌트 통합
- [x] `src/components/ui/` → `src/shared/ui/` 통합
  - [x] 중복 제거
  - [x] 디자인 시스템 컴포넌트와 병합
  - [x] Stories 파일 확인

#### 4-3. 타입 정리
- [x] `src/lib/types/post.ts` → `src/entities/content/model/types.ts` 통합
  - [x] `Post` 타입을 새로운 구조에 맞게 수정

#### 4-4. API 라우트 업데이트
- [x] `src/app/api/posts/route.ts`
  - [x] Repository 패턴 사용하도록 수정
  - [x] Content 기반 API로 확장 (tools도 지원)

---

### Phase 5: 문서화 & 품질 검증 ✅
#### 5-1. Storybook 검증
- [ ] `npm run storybook` 실행
- [ ] 모든 컴포넌트 Story 렌더링 확인
- [ ] VRT 실행 및 통과
- [ ] A11Y 감사 실행 및 통과

#### 5-2. 빌드 & 테스트
- [ ] `npm run build` 성공
- [ ] `npm run dev` 실행 확인
- [ ] 도구 목록 페이지 렌더링 확인
- [ ] 코드 스냅샷 스켈레톤 페이지 확인

#### 5-3. 문서 작성
- [ ] `CONTRIBUTING.md` 업데이트
  - [ ] 도구 추가 가이드
  - [ ] 폴더 구조 설명
  - [ ] 컨벤션 가이드
- [ ] `README.md` 업데이트
  - [ ] 새로운 구조 설명
  - [ ] 디자인 시스템 소개
  - [ ] Storybook 링크
- [ ] `ARCHITECTURE.md` 생성
  - [ ] FSD Lite 설명
  - [ ] Repository 패턴 설명
  - [ ] 타입 시스템 설명

---

## 🎯 서브에이전트 실행 전략

### 에이전트 1: 디자인 시스템 구축 (Agent-DS)
**책임:** Phase 1 전체
**산출물:** `src/shared/ui` 완성, Storybook 설정

### 에이전트 2: FSD Lite 구조 전환 (Agent-FSD)
**책임:** Phase 2-1, 2-2, 2-3
**산출물:** 폴더 구조, 타입 시스템, Repository

### 에이전트 3: 도구 인프라 구축 (Agent-Tools)
**책임:** Phase 2-4, 2-5, Phase 3-1
**산출물:** 레지스트리, 템플릿, 자동화 스크립트

### 에이전트 4: 라우팅 & UI 구현 (Agent-Routes)
**책임:** Phase 3-2, 3-3
**산출물:** Next.js 페이지, Features UI

### 에이전트 5: 마이그레이션 (Agent-Migration)
**책임:** Phase 4 전체
**산출물:** 기존 코드 이동 완료

### 에이전트 6: 문서화 & QA (Agent-QA)
**책임:** Phase 5 전체
**산출물:** 문서, 품질 검증 완료

---

## 📈 진행 상황 추적

### 전체 진행률
- [ ] Phase 1: 디자인 시스템 (0/23)
- [ ] Phase 2: FSD Lite + 도구 인프라 (0/19)
- [ ] Phase 3: 자동화 & 라우팅 (0/10)
- [ ] Phase 4: 마이그레이션 (0/11)
- [ ] Phase 5: 문서화 & QA (0/9)

**총 진행률: 63/72**

---

## 🚨 주의사항 & 리스크

### 주의사항
1. **Phase 1 완료 전까지는 Phase 2 시작 금지** (의존성)
2. **Repository 패턴 구현 전까지 Store 수정 금지**
3. **디자인 시스템 컴포넌트 외부 중복 생성 절대 금지**

### 알려진 리스크
1. **Storybook 설정 복잡도** - 해결: 기본 설정으로 시작
2. **타입 시스템 복잡도** - 해결: 점진적 타입 확장
3. **마이그레이션 중 기존 기능 동작** - 해결: Strangler Fig 패턴

---

## 🎓 참고 자료

- [FSD (Feature-Sliced Design)](https://feature-sliced.design/)
- [Storybook 공식 문서](https://storybook.js.org/)
- [Repository 패턴](https://martinfowler.com/eaaCatalog/repository.html)
- [Next.js 15 App Router](https://nextjs.org/docs)

---

**마지막 업데이트:** 2025-12-17
**다음 단계:** 서브에이전트 승인 대기
