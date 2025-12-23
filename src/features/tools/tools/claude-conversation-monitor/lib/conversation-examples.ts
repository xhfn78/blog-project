/**
 * 대화 예제 데이터 타입 및 초기 데이터
 */

export interface ConversationExample {
  id: string;
  title: string;
  userPrompt: string;
  claudeResponse: string;
  reasoningSteps: string[];
  toolsUsed: string[];
  insights: string[];
}

export interface TroubleshootingItem {
  id: string;
  question: string;
  answer: string;
}

/**
 * Claude 대화 모니터링 예제 (4개)
 */
export const CONVERSATION_EXAMPLES: ConversationExample[] = [
  {
    id: 'example-1-bug-fix',
    title: '버그 수정 대화 분석',
    userPrompt: 'TypeError: Cannot read property \'map\' of undefined가 발생합니다',
    claudeResponse: '이 에러는 배열을 기대했지만 undefined가 전달되었을 때 발생합니다. 코드를 확인하여 해당 변수가 제대로 초기화되었는지, API 응답이 실패하지 않았는지 검토하겠습니다...',
    reasoningSteps: [
      '1. 에러 타입 분류: TypeError는 타입 불일치를 의미',
      '2. map 메서드는 배열 전용 메서드 → undefined가 배열 대신 전달됨',
      '3. 원인 추론: API 응답 실패, 초기값 미설정, 조건부 렌더링 누락',
      '4. 해결 방안 제시: null 체크, 기본값 설정, 옵셔널 체이닝',
    ],
    toolsUsed: ['Read', 'Grep', 'Edit'],
    insights: [
      'Claude는 먼저 에러 타입을 분석하여 문제 범위를 좁힙니다',
      '코드베이스에서 관련 파일을 검색하여 컨텍스트를 확보합니다',
      '여러 해결 방안을 제시하고 가장 안전한 방법을 권장합니다',
    ],
  },
  {
    id: 'example-2-feature-impl',
    title: '기능 구현 대화 분석',
    userPrompt: '사용자 로그인 기능을 추가해줘. JWT 토큰 방식으로 구현해야 해',
    claudeResponse: '로그인 기능을 JWT 토큰 방식으로 구현하겠습니다. 먼저 프로젝트 구조를 확인하고, 백엔드 API 엔드포인트와 프론트엔드 로그인 폼을 생성하겠습니다...',
    reasoningSteps: [
      '1. 요구사항 분석: JWT 기반 인증 시스템 구현',
      '2. 프로젝트 구조 파악: 백엔드/프론트엔드 분리 여부 확인',
      '3. 구현 계획 수립: API 엔드포인트, 토큰 저장소, 보안 고려사항',
      '4. 단계별 구현: 백엔드 로직 → 프론트엔드 UI → 상태 관리',
    ],
    toolsUsed: ['Read', 'Glob', 'Write', 'Edit'],
    insights: [
      'Claude는 큰 작업을 작은 단위로 분해하여 단계적으로 접근합니다',
      '기존 코드 패턴을 먼저 파악하여 일관성을 유지합니다',
      '보안 best practice를 자동으로 적용합니다 (토큰 저장, HTTPS 등)',
    ],
  },
  {
    id: 'example-3-code-review',
    title: '코드 리뷰 대화 분석',
    userPrompt: '이 코드를 리뷰해줘. 개선할 점이 있을까?',
    claudeResponse: '코드를 분석한 결과 다음과 같은 개선 사항을 발견했습니다: 1) 변수명이 불명확함, 2) 에러 핸들링 부족, 3) 중복 코드 존재. 각각에 대해 구체적인 개선 방안을 제시하겠습니다...',
    reasoningSteps: [
      '1. 코드 전체 구조 파악: 함수 역할, 입출력, 의존성',
      '2. 가독성 평가: 변수명, 함수명, 주석, 코드 복잡도',
      '3. 성능 분석: 불필요한 반복, 비효율적인 알고리즘',
      '4. 보안 점검: 입력 검증, SQL 인젝션, XSS 취약점',
      '5. 개선 우선순위 결정: 영향도 큼 → 작은 순서',
    ],
    toolsUsed: ['Read', 'LSP', 'Grep'],
    insights: [
      'Claude는 코드 리뷰 시 가독성, 성능, 보안을 종합적으로 평가합니다',
      'LSP를 활용하여 타입 정보와 참조 관계를 분석합니다',
      '개선 사항을 우선순위와 함께 제시하여 실용성을 높입니다',
    ],
  },
  {
    id: 'example-4-refactoring',
    title: '리팩토링 대화 분석',
    userPrompt: '이 컴포넌트가 너무 복잡해. 리팩토링해줘',
    claudeResponse: '컴포넌트를 분석한 결과 400줄이 넘는 단일 컴포넌트입니다. 작은 컴포넌트로 분리하고, 커스텀 훅으로 로직을 추출하며, 타입을 명확히 하여 리팩토링하겠습니다...',
    reasoningSteps: [
      '1. 컴포넌트 책임 분석: UI, 비즈니스 로직, 상태 관리 분리',
      '2. 재사용 가능한 부분 식별: 공통 UI 패턴, 로직',
      '3. 분리 전략 수립: 하위 컴포넌트, 커스텀 훅, 유틸리티',
      '4. 점진적 리팩토링: 테스트 가능한 작은 단위로 분리',
    ],
    toolsUsed: ['Read', 'Write', 'Edit', 'Bash'],
    insights: [
      'Claude는 대규모 리팩토링을 안전한 작은 단위로 나눕니다',
      '기존 동작을 보존하면서 구조만 개선합니다 (기능 변경 X)',
      '리팩토링 후 테스트 실행을 권장하여 회귀 버그를 방지합니다',
    ],
  },
];

/**
 * 트러블슈팅 FAQ (4개)
 */
export const TROUBLESHOOTING_ITEMS: TroubleshootingItem[] = [
  {
    id: 'faq-1',
    question: 'Q: 대화 모니터링 기능은 어떻게 활성화하나요?',
    answer: '대화 모니터링은 Claude Code를 사용하면 자동으로 로그에 기록됩니다:\n\ncd ~/.claude-code/logs/\nls -lt | head -10\n\n최근 세션 로그를 확인하려면:\n\ncat $(ls -t ~/.claude-code/logs/*.log | head -1)\n\n또는 실시간 모니터링:\n\nnpx claude-code-templates@latest --chats',
  },
  {
    id: 'faq-2',
    question: 'Q: Claude의 추론 과정을 더 자세히 볼 수 있나요?',
    answer: 'debug 모드로 실행하면 Claude의 사고 과정을 더 상세히 볼 수 있습니다:\n\nclaude-code --log-level=debug ask "질문"\n\n이 모드에서는 다음 정보가 표시됩니다:\n1. 도구 호출 순서와 파라미터\n2. 파일 읽기/쓰기 내역\n3. 내부 의사결정 로그\n4. 에러 및 재시도 내역',
  },
  {
    id: 'faq-3',
    question: 'Q: 더 나은 프롬프트를 작성하려면 어떻게 해야 하나요?',
    answer: '효과적인 프롬프트 작성 팁:\n\n1. **구체적으로**: "파일 수정해줘" → "src/utils/auth.ts의 validateToken 함수에서 만료 시간 체크 추가해줘"\n\n2. **컨텍스트 제공**: "이 프로젝트는 React + TypeScript이고, Zustand로 상태 관리를 합니다. ..."\n\n3. **예상 결과 명시**: "로그인 실패 시 에러 토스트를 표시하고, 입력 필드를 초기화해야 해"\n\n4. **제약사항 언급**: "기존 API는 변경하지 말고, 클라이언트 코드만 수정해줘"',
  },
  {
    id: 'faq-4',
    question: 'Q: Claude가 예상과 다르게 동작할 때는 어떻게 하나요?',
    answer: '다음 단계로 문제를 해결하세요:\n\n1. **명확한 피드백**: "이건 내가 원한 게 아니야. 대신 [구체적 요구사항]을 해줘"\n\n2. **예제 제공**: "이런 식으로 해줘: [코드 예제]"\n\n3. **단계별 진행**: "먼저 A만 해줘. 그 다음 B를 진행할게"\n\n4. **새 세션 시작**: 길어진 대화는 컨텍스트를 잃을 수 있으니 새로 시작\n\n5. **CLAUDE.md 활용**: 프로젝트 규칙을 문서화하여 일관성 유지',
  },
];
