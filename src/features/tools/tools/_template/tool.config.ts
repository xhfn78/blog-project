import { ToolRegistration } from '@/shared/config/tools-registry';

// This type is used to ensure the config fits the registration shape
type ToolConfig = Omit<ToolRegistration, 'component'>;

export const config: ToolConfig = {
  // ============================================
  // ⚠️ slug: 고유한 kebab-case 식별자 (필수)
  // ============================================
  slug: 'my-new-tool', // IMPORTANT: MUST BE UNIQUE

  // ============================================
  // ⚠️ name: 롱테일 키워드 포함 (4-7단어 조합)
  // ============================================
  // ❌ 나쁜 예: "JSON 변환기" (경쟁 높음)
  // ✅ 좋은 예: "JSON to TypeScript 인터페이스 자동 변환기 - React 개발자 필수 도구"
  //
  // 전략:
  // - 핵심 기능 + 대상 사용자 + 추가 가치 조합
  // - 4-7개 단어로 구성
  // - 구체적인 기술 스택 포함 (Next.js, React, TypeScript 등)
  name: 'My New Tool - [핵심 기능] + [대상 사용자] + [추가 가치]',

  // ============================================
  // ⚠️ description: 최소 250자 (구글 검색 결과용)
  // ============================================
  // 이 내용이 Google 검색 결과에 그대로 표시됩니다!
  //
  // 필수 포함 요소:
  // 1. 핵심 기능 설명 (2-3문장)
  // 2. 대상 사용자 명시 (1문장)
  // 3. 주요 이점 3가지 (1문장)
  // 4. 기술적 특징 (1문장)
  //
  // ❌ 금지 표현: "쉽습니다", "간단합니다", "여러분", "해보세요"
  // ✅ 권장 표현: "~합니다", "~제공합니다", "~보장합니다", 구체적 수치
  description:
    '[핵심 기능을 2-3문장으로 설명]. ' +
    '[대상 사용자 명시 - 프론트엔드 개발자, 디자이너 등]. ' +
    '[주요 이점 3가지 - 시간 절약, 정확도, 생산성]. ' +
    '[기술적 특징 - 실시간 변환, AST 파싱, 브라우저 호환성 등]. ' +
    // 250자 이상 작성 (현재 예시는 템플릿이므로 실제 작성 시 구체적으로 채워야 함)
    '[추가 설명으로 250자를 채우세요 - W3C 표준, MDN 문서 언급, 실무 활용 예시 등].',

  // ============================================
  // ⚠️ category: 4가지 중 선택
  // ============================================
  category: 'utility', // 'converter' | 'generator' | 'formatter' | 'utility'

  // ============================================
  // ⚠️ tags: 6-8개 (SEO 강화)
  // ============================================
  // 전략:
  // - 핵심 키워드 (도구명, 기능)
  // - 대상 사용자 (developer, designer, frontend 등)
  // - 기술 스택 (nextjs, react, typescript 등)
  // - 활용 시나리오 (api-testing, debugging, optimization 등)
  // - 롱테일 조합 (json-to-typescript-converter 등)
  //
  // ❌ 나쁜 예: ['tool', 'converter', 'utility', 'web']
  // ✅ 좋은 예: ['json-converter', 'typescript-generator', 'react-developer-tools', 'api-response-viewer', 'frontend-development', 'nextjs-tools', 'data-visualization', 'csv-export']
  tags: [
    'keyword-1', // 핵심 기능
    'keyword-2', // 대상 사용자
    'keyword-3', // 기술 스택
    'keyword-4', // 활용 시나리오
    'keyword-5', // 롱테일 조합
    'keyword-6', // 추가 키워드
    // 선택: 7-8개까지 추가 가능
  ],

  // ============================================
  // ⚠️ author: 작성자 이름 또는 팀명
  // ============================================
  author: 'V-Blog Team',
};