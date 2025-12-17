# 마크다운 에디터 추가

## 개요

블로그 글 작성 시 실시간 프리뷰와 코드 하이라이팅 기능을 갖춘 마크다운 에디터를 추가했습니다. GitHub Flavored Markdown을 지원하며, 분할 화면으로 작성과 프리뷰를 동시에 확인할 수 있습니다.

## 주요 변경사항

### 개발한 것

- ✅ **MarkdownEditor 컴포넌트**: 실시간 프리뷰 분할 화면 에디터
- ✅ **코드 하이라이팅**: highlight.js로 구문 강조 (GitHub Dark 테마)
- ✅ **GFM 지원**: 테이블, 체크리스트, 취소선 등
- ✅ **PostForm 통합**: React Hook Form Controller로 연동
- ✅ **마크다운 렌더링**: 블로그 상세 페이지에 ReactMarkdown 적용
- ✅ **Typography 스타일링**: Tailwind Prose로 읽기 좋은 타이포그래피

### 수정한 것

- 🔧 **ESLint 설정**: workthrough 폴더 제외 (globalIgnores)
- 🔧 **의존성 재설치**: node_modules 충돌 해결
- 🔧 **불필요한 import 제거**: Separator 제거

### 개선한 것

- 🎨 **사용자 경험**: 타이핑하면 즉시 프리뷰 업데이트
- 📱 **반응형 레이아웃**: 데스크톱(분할), 모바일(단일 화면)
- 📖 **마크다운 가이드**: 접을 수 있는 문법 안내

## 핵심 코드

### MarkdownEditor 컴포넌트

```typescript
'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';

export function MarkdownEditor({ value, onChange, error }: MarkdownEditorProps) {
  const [showPreview, setShowPreview] = useState(true);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* 에디터 */}
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={20}
        className="font-mono"
      />

      {/* 실시간 프리뷰 */}
      {showPreview && (
        <article className="prose dark:prose-invert">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight, rehypeRaw]}
          >
            {value || '*No content to preview*'}
          </ReactMarkdown>
        </article>
      )}
    </div>
  );
}
```

### React Hook Form 통합

```typescript
// PostForm에서 Controller 사용
<Controller
  name="content"
  control={control}
  render={({ field }) => (
    <MarkdownEditor
      value={field.value}
      onChange={field.onChange}
      error={errors.content?.message}
    />
  )}
/>
```

### 블로그 상세 페이지 렌더링

```typescript
// Before: 일반 텍스트
<p className="whitespace-pre-wrap">{post.content}</p>

// After: 마크다운 렌더링
<article className="prose prose-lg dark:prose-invert max-w-none">
  <ReactMarkdown
    remarkPlugins={[remarkGfm]}
    rehypePlugins={[rehypeHighlight, rehypeRaw]}
  >
    {post.content}
  </ReactMarkdown>
</article>
```

## 설치된 패키지

```json
{
  "dependencies": {
    "react-markdown": "^10.1.0",
    "remark-gfm": "^4.0.1",
    "rehype-highlight": "^7.0.2",
    "rehype-raw": "^7.0.0",
    "highlight.js": "^11.11.1",
    "@tailwindcss/typography": "^0.5.19"
  }
}
```

## 지원하는 마크다운 문법

### 기본 문법
- **제목**: `# H1`, `## H2`, `### H3`
- **강조**: `**굵게**`, `*기울임*`, `~~취소선~~`
- **코드**: `` `인라인 코드` ``, ` ```언어 블록``` `
- **링크**: `[텍스트](URL)`
- **이미지**: `![alt](URL)`

### GitHub Flavored Markdown (GFM)
- **테이블**:
```markdown
| 헤더1 | 헤더2 |
|-------|-------|
| 셀1   | 셀2   |
```

- **체크리스트**:
```markdown
- [x] 완료
- [ ] 진행중
```

- **자동 링크**: https://example.com
- **취소선**: `~~텍스트~~`

### 코드 하이라이팅

````markdown
```javascript
const hello = 'world';
console.log(hello);
```

```python
def greet():
    print("Hello!")
```

```typescript
type User = {
  name: string;
  age: number;
}
```
````

## 결과

- ✅ **ESLint 검증 통과** (0 errors)
- ✅ **TypeScript 빌드 성공**
- ✅ **프로덕션 빌드 성공**
- ✅ **실시간 프리뷰 동작 확인**

## 생성/수정된 파일

```
src/
├── components/blog/
│   ├── markdown-editor.tsx (NEW)
│   └── post-form.tsx (UPDATED)
├── app/blog/[slug]/
│   └── page.tsx (UPDATED)
└── app/
    └── globals.css (UPDATED - typography plugin)

eslint.config.mjs (UPDATED)
.eslintignore (NEW)
```

## 사용 방법

### 1. 글 작성
1. `/blog/write` 페이지 접속
2. 왼쪽 에디터에 마크다운 입력
3. 오른쪽 프리뷰에서 실시간 확인
4. "Create Post" 클릭

### 2. 글 읽기
1. `/blog` 페이지에서 글 목록 확인
2. 글 제목 클릭
3. 마크다운이 렌더링된 상태로 표시

### 3. 프리뷰 토글
- "Show/Hide Preview" 버튼으로 프리뷰 표시/숨김
- 모바일: 기본적으로 에디터만 표시
- 데스크톱: 분할 화면 (lg 이상)

## 다음 단계 제안

### 필수 개선사항

1. **이미지 업로드**
   - 드래그 앤 드롭으로 이미지 업로드
   - Cloudinary 또는 Vercel Blob Storage 연동
   - 이미지 URL 자동 삽입

2. **마크다운 툴바**
   - 버튼 클릭으로 문법 삽입 (굵게, 기울임, 링크 등)
   - 키보드 단축키 (Ctrl+B, Ctrl+I)

3. **초안 자동 저장**
   - LocalStorage에 5초마다 자동 저장
   - 페이지 새로고침 시 복구

### 추가 기능

4. **마크다운 템플릿**
   - 코드 리뷰, 튜토리얼, 릴리즈 노트 등
   - 템플릿 선택 → 자동 삽입

5. **목차(TOC) 자동 생성**
   - H1~H6 제목 추출
   - 사이드바에 목차 표시
   - 클릭 시 해당 섹션으로 스크롤

6. **코드 블록 복사 버튼**
   - 코드 블록 hover 시 복사 버튼 표시
   - 클릭 시 클립보드에 복사

### UI/UX 개선

7. **풀스크린 모드**
   - 집중 모드: 에디터만 전체 화면
   - ESC로 종료

8. **다크/라이트 테마**
   - 에디터 테마 선택
   - 프리뷰 스타일 동기화

9. **글자 수 / 단어 수 표시**
   - 실시간 카운팅
   - 읽는 시간 예상 (분)

### 고급 기능

10. **Mermaid 다이어그램**
    - 플로우차트, 시퀀스 다이어그램
    - ```mermaid 코드 블록 지원

11. **수식 지원 (KaTeX)**
    - $inline$ 및 $$block$$ 수식
    - 과학/수학 블로그에 유용

12. **글 버전 관리**
    - 수정 이력 저장
    - 이전 버전으로 복구

## 기술 스택 업데이트

| 카테고리 | 기술 | 용도 |
|---------|------|------|
| 마크다운 파싱 | react-markdown | 마크다운 → React 컴포넌트 |
| GFM 지원 | remark-gfm | 테이블, 체크박스 등 |
| 코드 하이라이팅 | rehype-highlight | 구문 강조 |
| 테마 | highlight.js | GitHub Dark 테마 |
| 타이포그래피 | @tailwindcss/typography | 읽기 좋은 스타일 |
| HTML 지원 | rehype-raw | 원시 HTML 허용 |

## 참고 사항

### 보안
- `rehype-raw` 사용으로 HTML 허용 → XSS 주의
- 실제 배포 시 HTML sanitization 필요 (DOMPurify)

### 성능
- 큰 문서 작성 시 debounce 고려
- 코드 블록이 많으면 하이라이팅 지연 가능

### 호환성
- 모든 브라우저에서 highlight.js 지원
- Tailwind Typography v4 호환

---

**작성일**: 2025-12-17 12:21
**소요 시간**: ~25분
**상태**: ✅ 완료 (빌드 성공, 기능 동작 확인)
