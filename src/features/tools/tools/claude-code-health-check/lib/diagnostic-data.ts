/**
 * 진단 아이템 데이터 타입 및 초기 데이터
 */

export interface DiagnosticItem {
  id: string;              // 고유 ID
  title: string;           // 단계 제목
  description: string;     // 설명
  commands?: string[];     // 명령어 목록 (선택적)
  successCriteria: string; // 성공 기준
  troubleshooting: string[]; // 실패 시 힌트
  isOptional: boolean;     // 선택적 단계 여부
  isCompleted: boolean;    // 완료 여부
}

export interface TroubleshootingItem {
  id: string;
  question: string;
  answer: string;
}

/**
 * Claude Code 헬스 체크 진단 항목 (7단계)
 */
export const DEFAULT_DIAGNOSTIC_ITEMS: DiagnosticItem[] = [
  {
    id: 'diag-1-nodejs',
    title: '1. Node.js 버전 확인',
    description: 'Node.js 18 이상이 설치되어 있는지 확인합니다. Claude Code CLI 실행을 위한 필수 요구사항입니다.',
    commands: ['node --version'],
    successCriteria: 'v18.0.0 이상 (권장: v20.0.0 이상)',
    troubleshooting: [
      'nvm을 사용하여 최신 버전으로 업그레이드: nvm install 20 && nvm use 20',
      'Node.js 공식 사이트에서 LTS 버전 다운로드: https://nodejs.org/',
    ],
    isOptional: false,
    isCompleted: false,
  },
  {
    id: 'diag-2-cli-installed',
    title: '2. Claude Code CLI 설치 확인',
    description: 'Claude Code CLI가 시스템에 설치되어 있고 PATH에 등록되어 있는지 확인합니다.',
    commands: [
      'claude-code --version',
      '# 설치되지 않은 경우:',
      'npm install -g @anthropic-ai/claude-code-cli',
    ],
    successCriteria: '버전 정보가 정상적으로 표시됨',
    troubleshooting: [
      'npm global bin 경로 확인: npm config get prefix',
      'PATH에 npm global bin 추가: export PATH="$PATH:$(npm config get prefix)/bin"',
      '관리자 권한으로 재설치: sudo npm install -g @anthropic-ai/claude-code-cli',
    ],
    isOptional: false,
    isCompleted: false,
  },
  {
    id: 'diag-3-api-key',
    title: '3. API 키 설정 확인',
    description: 'Anthropic API 키가 환경 변수에 올바르게 설정되어 있는지 확인합니다.',
    commands: [
      'echo $ANTHROPIC_API_KEY',
      '# 설정되지 않은 경우:',
      'export ANTHROPIC_API_KEY=your-api-key-here',
      '# 또는 .env 파일에 추가',
    ],
    successCriteria: 'API 키 값이 표시됨 (sk-로 시작)',
    troubleshooting: [
      'Anthropic 콘솔에서 API 키 발급: https://console.anthropic.com/',
      '.bashrc 또는 .zshrc에 영구 설정 추가 후 source 명령 실행',
      '프로젝트 루트에 .env 파일 생성 및 ANTHROPIC_API_KEY 추가',
    ],
    isOptional: false,
    isCompleted: false,
  },
  {
    id: 'diag-4-project-init',
    title: '4. 프로젝트 초기화 상태 확인',
    description: '현재 프로젝트가 Claude Code로 초기화되어 있고 .clauderc 파일이 존재하는지 확인합니다.',
    commands: [
      'ls -la | grep .clauderc',
      '# 초기화되지 않은 경우:',
      'claude-code init',
    ],
    successCriteria: '.clauderc 파일이 존재함',
    troubleshooting: [
      'claude-code init 명령으로 프로젝트 초기화',
      '.claudeignore 파일을 생성하여 제외할 파일/폴더 지정',
      'CLAUDE.md 파일로 프로젝트 컨텍스트 제공',
    ],
    isOptional: false,
    isCompleted: false,
  },
  {
    id: 'diag-5-test-command',
    title: '5. 기본 명령어 동작 확인',
    description: 'Claude Code CLI가 정상적으로 작동하는지 간단한 명령어로 테스트합니다.',
    commands: [
      'claude-code --help',
      'claude-code ask "Hello Claude, are you working?"',
    ],
    successCriteria: '명령어가 오류 없이 실행되고 응답이 반환됨',
    troubleshooting: [
      'API 키 재확인 (echo $ANTHROPIC_API_KEY)',
      '인터넷 연결 상태 확인',
      'CLI 재설치: npm uninstall -g @anthropic-ai/claude-code-cli && npm install -g @anthropic-ai/claude-code-cli',
      'Anthropic 서비스 상태 확인: https://status.anthropic.com/',
    ],
    isOptional: false,
    isCompleted: false,
  },
  {
    id: 'diag-6-mcp-server',
    title: '6. (선택) MCP 서버 설정 확인',
    description: 'Model Context Protocol 서버가 설정되어 있는지 확인합니다. 파일 시스템, 데이터베이스 등 확장 기능을 사용하려면 필요합니다.',
    commands: [
      'claude-code mcp list',
      '# MCP 서버 설치:',
      'claude-code mcp install @anthropic-ai/mcp-server-filesystem',
    ],
    successCriteria: 'MCP 서버 목록이 표시되거나 설치 완료',
    troubleshooting: [
      'MCP 서버 재설치 시도',
      '.clauderc 파일에서 MCP 설정 확인',
      'MCP 서버 문서 참조: https://docs.anthropic.com/mcp',
    ],
    isOptional: true,
    isCompleted: false,
  },
  {
    id: 'diag-7-performance',
    title: '7. (선택) 성능 최적화 설정 확인',
    description: 'Claude Code의 성능을 최적화하기 위한 설정이 올바르게 되어 있는지 확인합니다.',
    commands: [
      '# .clauderc에서 max_tokens, temperature 등 확인',
      'cat .clauderc',
    ],
    successCriteria: '.clauderc에 최적화된 설정이 포함됨',
    troubleshooting: [
      '.clauderc에서 max_tokens 조정 (기본: 4096, 권장: 8192)',
      'temperature 설정 확인 (코드 생성: 0.3, 창의적 작업: 0.7)',
      '불필요한 컨텍스트 제외를 위해 .claudeignore 활용',
      'CLAUDE.md로 프로젝트 가이드라인 명시',
    ],
    isOptional: true,
    isCompleted: false,
  },
];

/**
 * 트러블슈팅 FAQ (6개)
 */
export const TROUBLESHOOTING_ITEMS: TroubleshootingItem[] = [
  {
    id: 'faq-1',
    question: 'Q: Node.js 버전은 맞는데 Claude Code가 실행되지 않습니다',
    answer: 'npm global 패키지가 올바른 경로에 설치되었는지 확인하세요:\n\nnpm config get prefix\n\n위 명령어로 나온 경로가 PATH에 포함되어 있어야 합니다. ~/.bashrc 또는 ~/.zshrc에 다음을 추가하세요:\n\nexport PATH="$PATH:$(npm config get prefix)/bin"\n\n그리고 source ~/.bashrc (또는 source ~/.zshrc)를 실행하여 적용하세요.',
  },
  {
    id: 'faq-2',
    question: 'Q: API 키 오류가 계속 발생합니다',
    answer: '다음 사항을 확인하세요:\n\n1. API 키가 올바른지 확인: echo $ANTHROPIC_API_KEY\n2. API 키가 sk-로 시작하는지 확인\n3. Anthropic 콘솔에서 API 키 사용 한도 확인\n4. API 키를 재발급하여 다시 설정\n5. 환경 변수가 아닌 .env 파일 사용 시 파일 경로 확인\n\n터미널을 재시작한 후 다시 시도해보세요.',
  },
  {
    id: 'faq-3',
    question: 'Q: MCP 서버 설치가 실패합니다',
    answer: 'MCP 서버 설치 문제 해결 방법:\n\n1. Node.js 버전이 18 이상인지 확인\n2. npm 캐시 정리: npm cache clean --force\n3. 관리자 권한으로 재시도: sudo claude-code mcp install <server-name>\n4. .clauderc 파일 권한 확인 및 수정: chmod 644 .clauderc\n5. MCP 서버 GitHub 저장소에서 이슈 확인\n\nWindows 사용자는 WSL2 사용을 권장합니다.',
  },
  {
    id: 'faq-4',
    question: 'Q: Claude Code가 너무 느립니다',
    answer: '성능 개선을 위한 방법:\n\n1. .claudeignore에 불필요한 파일/폴더 추가 (node_modules, .git, dist 등)\n2. .clauderc에서 max_tokens 조정 (너무 높으면 느려짐)\n3. 프로젝트 크기가 크다면 CLAUDE.md로 핵심 정보만 제공\n4. 인터넷 연결 속도 확인\n5. Anthropic API 상태 확인: https://status.anthropic.com/\n\n컨텍스트 크기를 줄이면 응답 속도가 크게 향상됩니다.',
  },
  {
    id: 'faq-5',
    question: 'Q: 진단 상태가 저장되지 않습니다',
    answer: '브라우저의 localStorage가 비활성화되어 있거나 시크릿/프라이빗 모드를 사용 중일 수 있습니다.\n\n1. 일반 브라우저 모드에서 접속\n2. 브라우저 설정에서 쿠키 및 사이트 데이터 허용\n3. 브라우저 캐시 및 데이터 정리 후 재시도\n4. 다른 브라우저에서 테스트\n\n이 도구는 진단 완료 상태를 브라우저의 로컬 스토리지에 저장합니다.',
  },
  {
    id: 'faq-6',
    question: 'Q: Windows에서 설치 및 사용이 어렵습니다',
    answer: 'Windows 사용자를 위한 권장 설정:\n\n1. WSL2 (Windows Subsystem for Linux) 설치 권장\n2. Microsoft Store에서 Ubuntu 설치\n3. WSL2 터미널에서 Node.js 및 Claude Code CLI 설치\n4. PowerShell 사용 시 관리자 권한으로 실행\n5. 실행 정책 확인: Set-ExecutionPolicy RemoteSigned\n\nWSL2를 사용하면 Linux 환경과 동일하게 안정적으로 작동합니다.',
  },
];
