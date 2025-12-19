## 📜 작업 시작 시 필수 출력: [계획 문서]

| 항목 | 내용 |
| :---: | :--- |
| **작업 목표** | Vibe Token Slimmer 도구의 Phase 2인 '프리미엄 UX/UI 구현'을 완료합니다. 구체적으로는 Framer Motion을 사용한 애니메이션 효과 추가, AI 서비스별 맞춤형 프롬프트 복사 기능, 옵션 토글 기능, 결과 리포트 모달, 그리고 관련 로직을 커스텀 훅으로 분리하는 작업을 포함합니다. |
| **TDD 전략** | 1. **Red:** UI 인터랙션 로직을 담을 `use-token-slimmer` 훅에 대한 실패하는 단위 테스트(`src/shared/lib/hooks/__test__/use-token-slimmer.test.ts`)를 먼저 작성합니다. (예: 옵션 변경에 따른 출력 텍스트 변화 검증)<br>2. **Green:** 테스트를 통과하기 위한 최소한의 훅 로직 (`use-token-slimmer.ts`)을 작성합니다.<br>3. **Refactor:** 훅 로직의 가독성 및 재사용성을 개선하고, UI 컴포넌트와 명확하게 분리합니다. |
| **예상 파일 변경** | `package.json`, `package-lock.json` (`framer-motion` 설치)<br>`src/features/tools/tools/vibe-token-slimmer/index.tsx` (수정)<br>`src/shared/config/ai-formats.ts` (신규)<br>`src/shared/lib/hooks/use-token-slimmer.ts` (신규)<br>`src/shared/lib/hooks/__test__/use-token-slimmer.test.ts` (신규) |
| **아키텍처 영향** | **`src/features`:** `vibe-token-slimmer`의 UI가 대폭 개선되고, 복잡한 상태 로직이 커스텀 훅으로 분리됩니다.<br>**`src/shared`:** 재사용 가능한 `use-token-slimmer` 훅과 `ai-formats` 설정이 추가되어 다른 기능에서도 활용할 수 있는 기반을 마련합니다. |
