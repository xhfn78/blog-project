/**
 * 메트릭 정의 데이터 타입 및 초기 데이터
 */

export interface MetricDefinition {
  id: string;
  name: string;
  description: string;
  unit: string;
  icon: string; // lucide icon name
  importance: 'high' | 'medium' | 'low';
  interpretation: {
    good: string;
    warning: string;
    critical: string;
  };
  howToView: string[];
}

export interface TroubleshootingItem {
  id: string;
  question: string;
  answer: string;
}

/**
 * Claude Code Analytics 추적 메트릭 (6개)
 */
export const TRACKED_METRICS: MetricDefinition[] = [
  {
    id: 'metric-1-response-time',
    name: '응답 시간 (Response Time)',
    description: 'Claude가 요청에 응답하는 평균 시간입니다. 응답 속도는 컨텍스트 크기, 네트워크 상태, API 서버 부하에 영향을 받습니다.',
    unit: 'seconds',
    icon: 'Clock',
    importance: 'high',
    interpretation: {
      good: '5초 이하: 최적화된 상태. 빠른 워크플로우 가능.',
      warning: '5-15초: 정상 범위. 대부분의 작업에 적합.',
      critical: '15초 이상: 느림. 컨텍스트 크기나 네트워크 확인 필요.',
    },
    howToView: [
      '터미널에서 time 명령어와 함께 실행: time claude-code ask "질문"',
      'Analytics 명령어: npx claude-code-templates@latest --analytics',
      '응답 시작부터 완료까지 걸린 시간 측정',
    ],
  },
  {
    id: 'metric-2-tool-usage',
    name: '도구 사용 패턴 (Tool Usage)',
    description: 'Claude가 사용하는 도구(Read, Write, Edit, Bash 등)의 빈도와 패턴을 추적합니다. 효율적인 워크플로우인지 파악할 수 있습니다.',
    unit: 'count',
    icon: 'Wrench',
    importance: 'high',
    interpretation: {
      good: 'Read → Edit 패턴: 효율적. 파일을 읽고 바로 수정.',
      warning: '과도한 Bash 사용: 검토 필요. Bash 대신 전용 도구 사용 권장.',
      critical: '반복적인 Read: 비효율적. 한 번에 필요한 파일 모두 읽기.',
    },
    howToView: [
      'Analytics 대시보드에서 도구 사용 통계 확인',
      '세션 로그 분석: claude-code --log-level=debug',
      '가장 많이 사용된 도구 Top 5 확인',
    ],
  },
  {
    id: 'metric-3-token-consumption',
    name: '토큰 소비량 (Token Consumption)',
    description: '각 요청에서 사용된 입력/출력 토큰 수입니다. 토큰 사용량은 직접적으로 API 비용과 연결됩니다.',
    unit: 'tokens',
    icon: 'Coins',
    importance: 'high',
    interpretation: {
      good: '< 8K tokens: 효율적. 비용 최적화됨.',
      warning: '8K-32K tokens: 주의. 불필요한 컨텍스트 제거 고려.',
      critical: '> 32K tokens: 높음. .claudeignore로 대용량 파일 제외 필수.',
    },
    howToView: [
      'Anthropic Console에서 API 사용량 확인',
      'Analytics 명령어로 세션별 토큰 사용량 보기',
      '.clauderc에서 max_tokens 설정 확인',
    ],
  },
  {
    id: 'metric-4-productivity-score',
    name: '세션 생산성 (Productivity Score)',
    description: '코드 작성, 파일 편집, 문제 해결 등 실제 작업 대비 대화 시간의 비율입니다. 높을수록 효율적입니다.',
    unit: 'percentage',
    icon: 'TrendingUp',
    importance: 'medium',
    interpretation: {
      good: '> 70%: 매우 생산적. 대부분의 시간이 실제 작업에 투입.',
      warning: '40-70%: 보통. 프롬프트 개선으로 향상 가능.',
      critical: '< 40%: 비효율적. 명확한 요청과 컨텍스트 제공 필요.',
    },
    howToView: [
      'Analytics 대시보드에서 생산성 점수 확인',
      '작업 완료 시간 vs 대화 시간 비교',
      '세션당 평균 파일 수정 횟수 추적',
    ],
  },
  {
    id: 'metric-5-error-rate',
    name: '에러율 (Error Rate)',
    description: 'CLI 실행 중 발생한 오류의 비율입니다. 높은 에러율은 설정 문제나 잘못된 사용 패턴을 나타낼 수 있습니다.',
    unit: 'percentage',
    icon: 'AlertTriangle',
    importance: 'medium',
    interpretation: {
      good: '< 5%: 안정적. 대부분의 요청이 성공.',
      warning: '5-15%: 주의. 반복되는 오류 패턴 확인 필요.',
      critical: '> 15%: 문제. Health Check 실행 권장.',
    },
    howToView: [
      '에러 로그 확인: claude-code --log-level=error',
      'Analytics에서 에러 타입별 통계 확인',
      '가장 빈번한 오류 메시지 Top 3 파악',
    ],
  },
  {
    id: 'metric-6-context-size',
    name: '평균 컨텍스트 크기 (Avg Context Size)',
    description: '각 요청에 포함되는 평균 컨텍스트 크기입니다. 컨텍스트가 클수록 응답이 느려지고 비용이 증가합니다.',
    unit: 'KB',
    icon: 'Database',
    importance: 'low',
    interpretation: {
      good: '< 100KB: 최적. 빠른 응답과 낮은 비용.',
      warning: '100-500KB: 보통. .claudeignore 활용 권장.',
      critical: '> 500KB: 과도. node_modules, .git 등 제외 필수.',
    },
    howToView: [
      'Analytics 대시보드에서 컨텍스트 크기 추이 확인',
      '.claudeignore 파일로 제외된 파일 목록 검토',
      'CLAUDE.md로 핵심 정보만 제공하여 크기 감소',
    ],
  },
];

/**
 * 트러블슈팅 FAQ (5개)
 */
export const TROUBLESHOOTING_ITEMS: TroubleshootingItem[] = [
  {
    id: 'faq-1',
    question: 'Q: Analytics 명령어가 작동하지 않습니다',
    answer: 'Analytics 기능은 claude-code-templates 패키지를 통해 제공됩니다:\n\nnpx claude-code-templates@latest --analytics\n\n만약 오류가 발생한다면:\n1. Node.js 18 이상 설치 확인\n2. npx 캐시 정리: npx clear-npx-cache\n3. 인터넷 연결 확인\n4. 패키지 재설치: npm uninstall -g claude-code-templates && npm install -g claude-code-templates',
  },
  {
    id: 'faq-2',
    question: 'Q: 메트릭 데이터가 표시되지 않습니다',
    answer: 'Analytics 데이터는 Claude Code를 사용한 후부터 수집됩니다.\n\n데이터가 없다면:\n1. Claude Code CLI를 최소 5회 이상 사용\n2. 로그 레벨 확인: claude-code --log-level=info\n3. 데이터 저장 위치 확인: ~/.claude-code/analytics/\n4. 권한 문제 확인: ls -la ~/.claude-code/\n\n데이터 수집이 시작되면 다음 세션부터 메트릭이 표시됩니다.',
  },
  {
    id: 'faq-3',
    question: 'Q: 토큰 사용량이 예상보다 높습니다',
    answer: '토큰 사용량을 줄이는 방법:\n\n1. .claudeignore 파일 생성 및 대용량 파일 제외:\nnode_modules/\n.git/\ndist/\nbuild/\n*.log\n\n2. .clauderc에서 max_tokens 조정 (기본 4096 → 8192)\n3. CLAUDE.md로 핵심 컨텍스트만 제공\n4. 불필요한 대화는 새 세션에서 시작\n5. 대용량 파일은 직접 읽지 말고 요약 요청',
  },
  {
    id: 'faq-4',
    question: 'Q: 생산성 점수를 어떻게 향상시킬 수 있나요?',
    answer: '생산성 향상을 위한 팁:\n\n1. **명확한 요청**: "파일 읽어줘" 대신 "src/index.ts의 main 함수 수정해줘"\n2. **컨텍스트 제공**: CLAUDE.md에 프로젝트 구조와 규칙 명시\n3. **한 번에 처리**: 여러 작은 요청 대신 관련 작업을 한 번에\n4. **프롬프트 템플릿 사용**: 반복 작업은 템플릿화\n5. **도구 활용**: MCP 서버로 자동화\n\n효율적인 프롬프트 예시:\n"tests/ 폴더의 모든 테스트 파일에서 jest를 vitest로 마이그레이션해줘. import 구문도 변경하고 설정 파일도 업데이트해줘."',
  },
  {
    id: 'faq-5',
    question: 'Q: 에러율이 높은 이유는 무엇인가요?',
    answer: '높은 에러율의 주요 원인:\n\n1. **API 키 문제**: echo $ANTHROPIC_API_KEY로 확인\n2. **네트워크 불안정**: 안정적인 인터넷 연결 필요\n3. **잘못된 명령어**: claude-code --help로 올바른 사용법 확인\n4. **권한 문제**: 파일/디렉터리 접근 권한 확인\n5. **버전 호환성**: npm update -g @anthropic-ai/claude-code-cli\n\n에러 로그 확인:\nclaude-code --log-level=debug ask "질문"\n\n반복되는 오류는 Health Check 도구로 진단하세요.',
  },
];
