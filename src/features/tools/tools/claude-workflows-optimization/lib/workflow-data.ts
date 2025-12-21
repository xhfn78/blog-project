/**
 * 워크플로우 체크리스트 및 상세 데이터
 */

export interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  isOptional: boolean;
  isCompleted: boolean;
}

export interface WorkflowDetail {
  id: string;
  title: string;
  description: string;
  steps: string[];
  commands: string[];
  tips: string[];
}

/**
 * 워크플로우 학습 체크리스트 (6단계)
 */
export const DEFAULT_WORKFLOW_CHECKLIST: ChecklistItem[] = [
  {
    id: 'workflow-1-bugfix',
    title: '1. 버그 수정 워크플로우 학습',
    description: '에러 분석부터 수정, 테스트까지 전체 버그 수정 프로세스를 이해합니다.',
    isOptional: false,
    isCompleted: false,
  },
  {
    id: 'workflow-2-refactor',
    title: '2. 리팩토링 워크플로우 학습',
    description: '코드 스멜 파악과 개선 전략을 배웁니다.',
    isOptional: false,
    isCompleted: false,
  },
  {
    id: 'workflow-3-review',
    title: '3. 코드 리뷰 워크플로우 학습',
    description: 'PR 리뷰와 보안 체크를 효율적으로 수행하는 방법을 익힙니다.',
    isOptional: false,
    isCompleted: false,
  },
  {
    id: 'workflow-4-docs',
    title: '4. 문서화 워크플로우 학습',
    description: 'Docstring, README, API 문서를 자동화하는 방법을 배웁니다.',
    isOptional: false,
    isCompleted: false,
  },
  {
    id: 'workflow-5-testing',
    title: '5. 테스트 작성 워크플로우 학습',
    description: '유닛 테스트와 엣지 케이스 커버리지를 높이는 전략을 학습합니다.',
    isOptional: false,
    isCompleted: false,
  },
  {
    id: 'workflow-6-tool-dev',
    title: '6. 도구 개발 워크플로우 학습 (Vlog 특화)',
    description: 'npm run create-tool 명령어를 활용한 Vlog 플랫폼 도구 개발을 익힙니다.',
    isOptional: false,
    isCompleted: false,
  },
];

/**
 * 워크플로우 상세 가이드
 */
export const WORKFLOW_DETAILS: WorkflowDetail[] = [
  {
    id: 'bugfix',
    title: '버그 수정 워크플로우',
    description: '에러를 분석하고 체계적으로 수정하는 방법',
    steps: [
      '에러 메시지와 스택 트레이스를 Claude에게 공유',
      '"이 에러의 원인을 분석하고 해결 방안을 제시해줘" 요청',
      '제시된 수정 사항 적용',
      '테스트 실행 및 재현 여부 확인',
      '커밋 및 PR 생성',
    ],
    commands: [
      'claude-code ask "다음 에러를 분석해줘: [에러 메시지]"',
      'npm test',
      'git add . && git commit -m "fix: [버그 설명]"',
    ],
    tips: [
      '에러 로그는 최대한 자세히 제공할수록 정확한 답변을 받습니다',
      '재현 가능한 최소 예제(MRE)를 만들면 더 빠르게 해결할 수 있습니다',
      '수정 후에는 반드시 테스트를 실행하여 다른 부분에 영향이 없는지 확인하세요',
    ],
  },
  {
    id: 'refactor',
    title: '리팩토링 워크플로우',
    description: '코드 품질을 개선하는 체계적인 접근',
    steps: [
      '코드 스멜 파악 (중복, 복잡도, 불명확한 이름 등)',
      'Claude에게 개선 방법 문의',
      '단계적으로 수정 (한 번에 하나씩)',
      '각 단계마다 테스트 검증',
      '커밋 및 리뷰',
    ],
    commands: [
      'claude-code ask "이 코드를 더 깔끔하게 리팩토링하는 방법은?"',
      'npm test',
      'git add . && git commit -m "refactor: [개선 내용]"',
    ],
    tips: [
      '작은 단위로 리팩토링하고 매번 테스트하세요',
      '테스트 커버리지를 확인하여 안전하게 리팩토링하세요',
      '성능이 중요한 부분은 벤치마크를 먼저 측정하세요',
    ],
  },
  {
    id: 'review',
    title: '코드 리뷰 워크플로우',
    description: 'PR을 효율적으로 리뷰하고 개선점 찾기',
    steps: [
      'PR 생성 또는 받기',
      'Claude에게 코드 리뷰 요청',
      '보안 취약점, 성능 이슈, 코드 스타일 확인',
      '피드백 반영',
      '승인 또는 추가 수정 요청',
    ],
    commands: [
      'git diff main...feature-branch | claude-code ask "이 변경사항을 리뷰해줘"',
      'claude-code ask "보안 취약점이 있는지 확인해줘"',
    ],
    tips: [
      '보안 취약점(XSS, SQL Injection 등)을 우선적으로 체크하세요',
      '성능에 영향을 줄 수 있는 변경사항은 프로파일링을 요청하세요',
      '코드 스타일과 네이밍은 프로젝트 컨벤션을 따르는지 확인하세요',
    ],
  },
  {
    id: 'docs',
    title: '문서화 워크플로우',
    description: '코드 문서를 자동으로 작성하고 유지하기',
    steps: [
      '문서화가 필요한 함수/모듈 선택',
      'Claude에게 docstring/주석 생성 요청',
      'README 또는 API 문서 업데이트',
      '예제 코드 추가',
      '커밋',
    ],
    commands: [
      'claude-code ask "이 함수에 대한 docstring을 작성해줘"',
      'claude-code ask "이 API의 README를 작성해줘"',
    ],
    tips: [
      '함수 시그니처와 반환값을 명확히 문서화하세요',
      '실제 사용 예제를 포함하면 이해하기 쉽습니다',
      '공개 API는 반드시 문서화하세요',
    ],
  },
  {
    id: 'testing',
    title: '테스트 작성 워크플로우',
    description: '유닛 테스트와 통합 테스트 자동 생성',
    steps: [
      '테스트 대상 선정 (함수, 컴포넌트 등)',
      'Claude에게 테스트 케이스 생성 요청',
      '엣지 케이스 추가 요청',
      '테스트 실행 및 검증',
      '커버리지 확인',
    ],
    commands: [
      'claude-code ask "이 함수에 대한 유닛 테스트를 작성해줘"',
      'npm test',
      'npm run test:coverage',
    ],
    tips: [
      'AAA 패턴(Arrange-Act-Assert)을 따르세요',
      '경계 조건(boundary conditions)을 반드시 테스트하세요',
      '테스트는 독립적이어야 합니다 (다른 테스트에 의존하지 않음)',
    ],
  },
  {
    id: 'tool-dev',
    title: '도구 개발 워크플로우 (Vlog 특화)',
    description: 'Vlog 플랫폼에 새로운 도구 추가하기',
    steps: [
      'npm run create-tool <slug> 실행',
      'Claude에게 요구사항 설명 및 컴포넌트 구현 요청',
      'tool.config.ts 설정 (name, description, tags 등)',
      '컴포넌트 개발 (index.tsx)',
      '테스트 및 빌드 확인',
      'PR 생성',
    ],
    commands: [
      'npm run create-tool my-new-tool',
      'claude-code ask "React로 [도구 설명] 만들어줘. ShadCN UI 사용."',
      'npm run build',
      'git add . && git commit -m "feat(tools): add my-new-tool"',
    ],
    tips: [
      'tool.config.ts의 featured를 true로 설정하면 홈페이지에 표시됩니다',
      'Vlog의 UI 패턴(ToolLayout, ToolSection)을 따르세요',
      '기존 도구(quick-start-checklist, claude-config-master)를 참고하세요',
      'localStorage를 활용하여 사용자 상태를 저장하세요',
    ],
  },
];
