# 새 도구 구현 요청 (Strict Protocol)

**목표:** `v-log` 프로젝트에 Google AdSense 승인 기준을 충족하는 고품질 도구를 구현합니다.

## 도구 정보
- **이름:** {{TOOL_NAME}}
- **슬러그:** {{TOOL_SLUG}}
- **카테고리:** {{TOOL_CATEGORY}}
- **설명:** {{TOOL_DESCRIPTION}}

## 🛑 필수 작업 순서 (Strict Steps)
다음 순서를 엄격히 준수하며, 각 단계 완료 후 **사용자 승인**을 받고 다음으로 넘어가세요.

### 1단계: 테스트 작성 (TDD Red) 🧪
- `src/features/tools/tools/{{TOOL_SLUG}}/__tests__/{{TOOL_SLUG}}.test.tsx` 작성.
- 비즈니스 로직(`lib/utils.ts` 예정)에 대한 실패하는 유닛 테스트 작성.

### 2단계: SEO 콘텐츠 작성 (Content First) 📝
- `src/features/tools/tools/{{TOOL_SLUG}}/SEO_CONTENT.md` 작성.
- **필수 요건:**
  - 순수 텍스트 **2,000자 이상**.
  - **5대 섹션:** 도입부(300자+), 주요 기능(400자+), 사용 시나리오(500자+), 기술적 배경(600자+, **표 필수**), FAQ(500자+).
  - **내부 링크:** 관련 도구/블로그 포스트 링크 2개 이상.
  - **어투:** "여러분" 금지, 전문적/객관적 어투 사용.

### 3단계: 로직 및 모델 구현 (Logic & Model) 🧠
- `model/schema.ts`: Zod 입력 검증 스키마 정의.
- `lib/utils.ts`: 비즈니스 로직 구현 (테스트 통과 목표).
- `model/store.ts`: 상태 관리 훅 구현 (`useState` 또는 `useReducer` 권장).

### 4단계: UI 구현 및 조립 (UI & Integration) 🎨
- `ui/`: 작은 단위 컴포넌트 구현 (Tailwind, ShadCN/UI 패턴).
- `index.tsx`: **3단 레이어 구조** 준수.
  1.  **도구 실행 영역:** 상단 배치.
  2.  **사용 가이드:** 중단 배치 (500자+).
  3.  **SEO 콘텐츠 영역:** 하단 배치 (`SEO_CONTENT.md` 내용 삽입).
- **필수:** `generateMetadata` 함수 export.

### 5단계: 검증 (Verification) ✅
- `npm run test` (Pass)
- `npm run type-check` (Pass)
- `tools-registry.ts` 업데이트 확인.

**"1단계: 테스트 작성"부터 시작해주세요.**