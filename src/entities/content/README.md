# Content Entity

**FSD Lite Architecture - Entities Layer**

`entities/content`는 모든 콘텐츠(도구, 블로그, 스니펫)의 타입 시스템과 데이터 접근 로직을 담당합니다.

---

## 📁 폴더 구조

```
entities/content/
├── model/                      # 타입 시스템
│   ├── types.ts               # BaseContent, Tool, Post, Snippet 타입
│   ├── tool-category.ts       # 도구 카테고리 enum 및 메타데이터
│   ├── schemas.ts             # Zod 검증 스키마
│   └── index.ts               # 배럴 export
├── repository/                 # 데이터 접근 계층
│   ├── content.repository.ts  # Repository 인터페이스
│   ├── content.repository.impl.ts  # 인메모리 구현체
│   └── index.ts               # 배럴 export
├── ui/                        # Entity UI 컴포넌트 (옵션)
├── __test__.ts                # 타입 및 Repository 테스트
├── index.ts                   # 배럴 export
└── README.md                  # 이 문서
```

---

## 🎯 주요 개념

### 1. BaseContent

모든 콘텐츠의 기본 인터페이스입니다.

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
```

### 2. Tool (도구)

개발 도구, 변환기, 생성기 등의 타입입니다.

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
```

### 3. Post (블로그)

블로그 포스트 타입입니다.

```typescript
interface Post extends BaseContent {
  type: 'blog';
  content: string;
  excerpt: string;
}
```

### 4. Repository 패턴

데이터 접근 로직을 추상화합니다.

```typescript
interface ContentRepository<T extends BaseContent> {
  findAll(filter?, pagination?, sort?): Promise<T[] | PaginatedResult<T>>;
  findById(id): Promise<T | null>;
  findBySlug(slug): Promise<T | null>;
  create(data): Promise<T>;
  update(id, data): Promise<T>;
  delete(id): Promise<void>;
  count(filter?): Promise<number>;
}
```

---

## 🚀 사용법

### 1. 타입 import

```typescript
import type { Tool, Post, CreateToolDTO, CreatePostDTO } from '@/entities/content';
import { ToolCategory } from '@/entities/content';
```

### 2. Zod 검증

```typescript
import { createToolSchema, validateCreateTool } from '@/entities/content';

const toolData = {
  title: 'JSON Formatter',
  slug: 'json-formatter',
  category: 'formatter',
  // ...
};

// 검증
const validatedData = validateCreateTool(toolData);
```

### 3. Repository 사용

```typescript
import { contentRepository } from '@/entities/content';

// Tool 생성
const tool = await contentRepository.tools.create({
  type: 'tool',
  title: 'JSON Formatter',
  slug: 'json-formatter',
  category: 'formatter',
  // ...
});

// Tool 조회
const foundTool = await contentRepository.tools.findBySlug('json-formatter');

// 카테고리별 Tool 조회
const formatters = await contentRepository.tools.findByCategory('formatter');

// 추천 Tool 조회
const featured = await contentRepository.tools.findFeatured();

// Tool 수정
const updated = await contentRepository.tools.update(tool.id, {
  featured: true,
});

// Tool 삭제
await contentRepository.tools.delete(tool.id);
```

### 4. 필터링 & 페이지네이션

```typescript
// 필터링
const tools = await contentRepository.tools.findAll({
  category: 'formatter',
  published: true,
  tag: 'json',
});

// 페이지네이션
const paginatedTools = await contentRepository.tools.findAll(
  { published: true },
  { page: 1, limit: 10 },
);

// 결과
// {
//   data: Tool[],
//   total: number,
//   page: number,
//   limit: number,
//   totalPages: number,
// }
```

### 5. 타입 가드

```typescript
import { isTool, isPost } from '@/entities/content';

const contents = await contentRepository.findRecent(10);

contents.forEach((content) => {
  if (isTool(content)) {
    console.log('Tool:', content.category);
  } else if (isPost(content)) {
    console.log('Post:', content.excerpt);
  }
});
```

---

## 📋 Tool Category

도구는 4가지 카테고리로 분류됩니다:

| Category    | 설명           | 색상   | 아이콘           |
| ----------- | -------------- | ------ | ---------------- |
| `converter` | 변환기         | blue   | ArrowLeftRight   |
| `generator` | 생성기         | green  | Sparkles         |
| `formatter` | 포맷터         | purple | Code             |
| `utility`   | 유틸리티       | orange | Wrench           |

```typescript
import { ToolCategory, getToolCategoryMeta } from '@/entities/content';

const meta = getToolCategoryMeta(ToolCategory.Formatter);
// {
//   label: '포맷터',
//   color: 'purple-500',
//   icon: 'Code',
//   description: '코드나 텍스트를 포맷팅하는 도구',
// }
```

---

## 🔄 Repository 구현체

### 현재: 인메모리 구현체

- 프로토타입용 인메모리 저장소
- Singleton 패턴으로 전역 상태 관리
- 개발 환경에서만 `reset()` 메서드 제공

### 향후: DB 구현체 (예시)

```typescript
// content.repository.db.ts
import { db } from '@/lib/db';

class DatabaseToolRepository implements ToolRepository {
  async findAll(filter?, pagination?, sort?) {
    return db.tools.findMany({
      where: this.buildWhereClause(filter),
      skip: pagination?.page * pagination?.limit,
      take: pagination?.limit,
      orderBy: sort,
    });
  }

  // ...
}

export function createContentRepository(): UniversalContentRepository {
  // 환경 변수에 따라 다른 구현체 반환
  if (process.env.USE_DATABASE === 'true') {
    return new DatabaseContentRepository();
  }
  return InMemoryUniversalContentRepository.getInstance();
}
```

---

## ✅ 검증

### 타입스크립트 컴파일

```bash
npx tsc --noEmit
```

### 테스트 실행

```typescript
// __test__.ts 파일의 주석 해제 후
import '@/entities/content/__test__';
```

---

## 🛡️ 보안 & 품질

### 타입 안전성

- ✅ `any` 타입 사용 없음
- ✅ 모든 데이터 모델 Interface/Type 정의
- ✅ DTO 타입으로 입출력 명확화
- ✅ 타입 가드로 런타임 타입 안전성 확보

### Zod 검증

- ✅ 서버 측 입력 검증
- ✅ 에러 메시지 한국어화
- ✅ 최소/최대 길이 검증
- ✅ Regex 패턴 검증 (slug)

### Repository 패턴

- ✅ 인터페이스와 구현체 분리
- ✅ 테스트 용이성 (Mock 구현체 사용 가능)
- ✅ 데이터 소스 변경 시 유연성

---

## 📚 참고 자료

- [Repository 패턴](https://martinfowler.com/eaaCatalog/repository.html)
- [FSD (Feature-Sliced Design)](https://feature-sliced.design/)
- [Zod 공식 문서](https://zod.dev/)

---

**작성일:** 2025-12-17
**Agent:** Agent-FSD
**Phase:** 2-1, 2-2, 2-3 완료
