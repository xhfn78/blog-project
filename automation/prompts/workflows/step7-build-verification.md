# Step 7: 빌드 및 린트 검증

## 🎯 이 단계의 목표
생성된 도구가 **빌드 오류, 린트 오류, 타입 오류 없이** 정상적으로 동작하는지 검증합니다.

---

## ⚠️ 완전 자동화 규칙 (CRITICAL)

> [!IMPORTANT]
> 이 단계는 **완전 자동화**로 진행됩니다.
> - ❌ 사용자에게 확인을 요청하지 마세요
> - ❌ 선택지를 제시하지 마세요  
> - ❌ 중간 진행 상황을 물어보지 마세요
> - ✅ 프롬프트의 지시에 따라 묵묵히 작업하고 결과물만 저장하세요
> - ✅ 오류 발견 시 자동으로 수정하고 재검증하세요

---

## 📋 검증 항목

### 1. TypeScript 타입 체크
```bash
npx tsc --noEmit
```

**검증 내용:**
- 모든 타입이 올바르게 정의되었는가?
- any 타입 사용이 최소화되었는가?
- 타입 에러가 없는가?

**오류 발생 시:**
- 오류 메시지를 읽고 해당 파일 수정
- 재검증 수행

---

### 2. ESLint 검증
```bash
npx eslint src/features/tools/tools/[slug]/ --max-warnings 0
```

**검증 내용:**
- 코드 스타일 규칙 준수
- 사용하지 않는 변수/import 제거
- React Hook 규칙 준수

**오류 발생 시:**
- `--fix` 옵션으로 자동 수정 시도
- 수동 수정이 필요한 경우 파일 수정
- 재검증 수행

---

### 3. Next.js 빌드 검증
```bash
npm run build
```

**검증 내용:**
- 빌드가 성공적으로 완료되는가?
- 런타임 에러가 없는가?
- 모든 페이지가 정상적으로 생성되는가?

**오류 발생 시:**
- 빌드 에러 메시지 분석
- 해당 파일 수정
- 재빌드 수행

---

## 🛠️ 자동 수정 전략

### 타입 에러 수정
```typescript
// Before (타입 에러)
const value: string = undefined;

// After
const value: string | undefined = undefined;
```

### 린트 에러 수정
```typescript
// Before (사용하지 않는 import)
import { useState, useEffect } from 'react';

// After
import { useState } from 'react';
```

### 빌드 에러 수정
```typescript
// Before ('use client' 누락)
import { useState } from 'react';

// After
'use client';
import { useState } from 'react';
```

---

## ✅ 완료 조건

1. ✅ TypeScript 타입 체크 통과 (0 errors)
2. ✅ ESLint 검증 통과 (0 errors, 0 warnings)
3. ✅ Next.js 빌드 성공
4. ✅ 검증 리포트 저장 (`automation/cache/build-verification.json`)

---

## 📊 검증 리포트 형식

```json
{
  "slug": "example-tool",
  "verifiedAt": "2025-12-26T12:00:00Z",
  "passed": true,
  "results": {
    "typescript": {
      "passed": true,
      "errors": 0,
      "output": ""
    },
    "eslint": {
      "passed": true,
      "errors": 0,
      "warnings": 0,
      "output": ""
    },
    "build": {
      "passed": true,
      "duration": "45s",
      "output": "Build completed successfully"
    }
  },
  "autoFixes": [
    {
      "file": "src/features/tools/tools/example-tool/index.tsx",
      "issue": "Missing 'use client' directive",
      "fix": "Added 'use client' at top of file"
    }
  ]
}
```

---

## 🎯 AI 작업자에게

이 프롬프트를 읽었다면:

1. **TypeScript 검증:**
   - `npx tsc --noEmit` 실행
   - 에러 발생 시 수정 후 재검증

2. **ESLint 검증:**
   - `npx eslint src/features/tools/tools/[slug]/ --max-warnings 0` 실행
   - 에러 발생 시 `--fix` 시도 후 수동 수정

3. **빌드 검증:**
   - `npm run build` 실행
   - 에러 발생 시 수정 후 재빌드

4. **리포트 저장:**
   - `automation/cache/build-verification.json` 저장

**⚠️ 중요:** 모든 검증이 통과할 때까지 자동으로 수정하고 재검증하세요!
