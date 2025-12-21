/**
 * 체크리스트 아이템 데이터 타입 및 초기 데이터
 */

export interface ChecklistItem {
  id: string;              // 고유 ID (예: "step-1-nodejs")
  title: string;           // 단계 제목
  description: string;     // 설명
  commands?: string[];     // 명령어 목록 (선택적)
  isOptional: boolean;     // 선택적 단계 여부
  isCompleted: boolean;    // 완료 여부
}

export interface TroubleshootingItem {
  id: string;
  question: string;
  answer: string;
}

/**
 * Claude Code CLI 설정 체크리스트 (7단계)
 */
export const DEFAULT_CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: 'step-1-nodejs',
    title: '1. Node.js 설치 확인',
    description: 'Node.js 18 이상이 설치되어 있는지 확인합니다. Claude Code CLI를 실행하기 위한 필수 요구사항입니다.',
    commands: ['node --version'],
    isOptional: false,
    isCompleted: false,
  },
  {
    id: 'step-2-install-cli',
    title: '2. Claude Code CLI 설치',
    description: 'npm을 통해 Claude Code CLI를 전역으로 설치합니다. 설치 후 터미널에서 claude-code 명령어를 사용할 수 있습니다.',
    commands: ['npm install -g @anthropic-ai/claude-code-cli'],
    isOptional: false,
    isCompleted: false,
  },
  {
    id: 'step-3-api-key',
    title: '3. API 키 설정',
    description: 'Anthropic API 키를 환경 변수에 설정합니다. API 키는 Anthropic 콘솔에서 발급받을 수 있습니다.',
    commands: [
      'export ANTHROPIC_API_KEY=your-api-key-here',
      '# 또는 .env 파일에 ANTHROPIC_API_KEY=your-api-key-here 추가',
    ],
    isOptional: false,
    isCompleted: false,
  },
  {
    id: 'step-4-init-project',
    title: '4. 첫 프로젝트 초기화',
    description: '새 프로젝트 디렉터리를 만들고 Claude Code를 초기화합니다. 프로젝트별 설정 파일이 생성됩니다.',
    commands: [
      'mkdir my-claude-project',
      'cd my-claude-project',
      'claude-code init',
    ],
    isOptional: false,
    isCompleted: false,
  },
  {
    id: 'step-5-test-commands',
    title: '5. 기본 명령어 테스트',
    description: '설치가 정상적으로 되었는지 기본 명령어를 실행해봅니다. 도움말과 간단한 질문으로 Claude Code가 작동하는지 확인합니다.',
    commands: [
      'claude-code --help',
      'claude-code ask "Hello Claude"',
    ],
    isOptional: false,
    isCompleted: false,
  },
  {
    id: 'step-6-mcp-server',
    title: '6. (선택) MCP 서버 설정',
    description: 'Model Context Protocol 서버를 설정하여 확장 기능을 사용합니다. 파일 시스템, 데이터베이스 등 외부 도구와 연동할 수 있습니다.',
    commands: ['claude-code mcp install'],
    isOptional: true,
    isCompleted: false,
  },
  {
    id: 'step-7-ide-integration',
    title: '7. (선택) IDE 통합',
    description: 'VS Code 또는 다른 IDE와 통합하여 더 편리하게 사용합니다. VS Code 마켓플레이스에서 "Claude Code" 확장 프로그램을 검색하여 설치하세요.',
    commands: ['# VS Code: Extensions > Search "Claude Code" > Install'],
    isOptional: true,
    isCompleted: false,
  },
];

/**
 * 트러블슈팅 FAQ (5개)
 */
export const TROUBLESHOOTING_ITEMS: TroubleshootingItem[] = [
  {
    id: 'faq-1',
    question: 'Q: Node.js 버전이 낮다고 나옵니다',
    answer: 'Claude Code CLI는 Node.js 18 이상이 필요합니다. nvm을 사용하여 최신 버전으로 업그레이드하세요: \n\nnvm install 20 && nvm use 20\n\nnvm이 설치되어 있지 않다면 https://github.com/nvm-sh/nvm 에서 설치할 수 있습니다.',
  },
  {
    id: 'faq-2',
    question: 'Q: API 키를 설정했는데도 인증 오류가 발생합니다',
    answer: '환경 변수가 제대로 설정되었는지 확인하세요. 다음 명령어로 확인할 수 있습니다:\n\necho $ANTHROPIC_API_KEY\n\n값이 표시되지 않으면 터미널을 재시작하거나, .bashrc 또는 .zshrc 파일에 export 명령어를 추가한 후 source ~/.bashrc (또는 source ~/.zshrc)를 실행하세요.',
  },
  {
    id: 'faq-3',
    question: 'Q: claude-code 명령어를 찾을 수 없다고 나옵니다',
    answer: 'npm global bin 경로가 PATH에 포함되어 있는지 확인하세요:\n\nnpm config get prefix\n\n위 명령어로 나온 경로를 확인한 후, ~/.bashrc 또는 ~/.zshrc 파일에 다음을 추가하세요:\n\nexport PATH="$PATH:$(npm config get prefix)/bin"\n\n그리고 source ~/.bashrc (또는 source ~/.zshrc)를 실행하여 적용하세요.',
  },
  {
    id: 'faq-4',
    question: 'Q: Windows에서 설치가 잘 안됩니다',
    answer: 'Windows에서는 다음 방법을 시도해보세요:\n\n1. 관리자 권한으로 PowerShell을 실행한 후 설치\n2. WSL2 (Windows Subsystem for Linux) 사용 권장\n3. Node.js가 PATH에 제대로 등록되어 있는지 확인\n\nWSL2 사용을 권장하며, Microsoft Store에서 Ubuntu를 설치한 후 Linux 환경에서 Claude Code CLI를 설치하면 더 안정적입니다.',
  },
  {
    id: 'faq-5',
    question: 'Q: 완료 상태가 저장되지 않습니다',
    answer: '브라우저의 localStorage가 비활성화되어 있거나 시크릿/프라이빗 모드를 사용 중일 수 있습니다. 일반 모드에서 다시 시도해보세요.\n\n또한 브라우저 설정에서 쿠키 및 사이트 데이터 차단 설정이 활성화되어 있는지 확인하세요. 이 도구는 완료 상태를 브라우저의 로컬 스토리지에 저장합니다.',
  },
];
