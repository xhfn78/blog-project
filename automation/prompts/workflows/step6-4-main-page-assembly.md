# Step 6-4: 메인 페이지 조립

## 🎯 이 단계의 목표
앞서 구현한 로직(Step 6-2)과 하위 컴포넌트(Step 6-3)를 `index.tsx`에서 결합하여 최종 도구를 완성합니다.

---

## 📋 수행 작업

### 1. 메인 조립 (`index.tsx`)
- `use-logic.ts` 훅을 호출하여 상태를 관리합니다.
- `ui/` 폴더의 하위 컴포넌트들을 배치하고 필요한 Props를 주입합니다.
- `ToolLayout`으로 전체 구조를 감쌉니다.

### 2. 레이아웃 조정
- `project-ui-standards.md`에 정의된 배경 효과(`BackgroundBeams`, `Spotlight`)를 적용합니다.

---

## 🛠️ 구현 가이드
- **Clean Index**: `index.tsx`는 이제 매우 간결해야 합니다. 실제 로직은 `lib/`에, UI 조각은 `ui/`에 있기 때문입니다.
- **상태 흐름**: 데이터가 상위에서 하위로 매끄럽게 흐르는지 최종 점검합니다.

---

## ✅ 완료 기준
- `src/features/tools/tools/[slug]/index.tsx` 파일이 완성됨.
- 브라우저에서 실행 시 모든 기능이 유기적으로 작동함.
