/**
 * 플러그인 데이터 타입 및 초기 데이터
 */

export interface PluginInfo {
  id: string;
  name: string;
  category: 'mcp-server' | 'ide-extension' | 'marketplace' | 'custom-tool';
  description: string;
  installation: string;
  documentation?: string;
  icon: string;
}

export interface TroubleshootingItem {
  id: string;
  question: string;
  answer: string;
}

/**
 * 플러그인 카테고리별 예제 (8개)
 */
export const PLUGIN_EXAMPLES: PluginInfo[] = [
  {
    id: 'mcp-filesystem',
    name: 'Filesystem MCP',
    category: 'mcp-server',
    description: '파일 시스템 접근 및 파일 조작 기능을 제공합니다. 파일 읽기, 쓰기, 삭제, 디렉터리 관리 등을 Claude가 직접 수행할 수 있게 합니다.',
    installation: 'claude-code mcp install @anthropic-ai/mcp-server-filesystem',
    documentation: 'https://docs.anthropic.com/mcp/filesystem',
    icon: 'FolderOpen',
  },
  {
    id: 'mcp-database',
    name: 'Database MCP',
    category: 'mcp-server',
    description: 'PostgreSQL, MySQL 등 데이터베이스 쿼리 및 관리 기능을 제공합니다. SQL 쿼리 실행, 스키마 확인, 데이터 조작이 가능합니다.',
    installation: 'claude-code mcp install @anthropic-ai/mcp-server-database',
    documentation: 'https://docs.anthropic.com/mcp/database',
    icon: 'Database',
  },
  {
    id: 'mcp-web-api',
    name: 'Web API MCP',
    category: 'mcp-server',
    description: 'RESTful API 호출 및 응답 처리 기능을 제공합니다. 외부 서비스와 통합하여 데이터를 가져오거나 전송할 수 있습니다.',
    installation: 'claude-code mcp install @anthropic-ai/mcp-server-web-api',
    icon: 'Globe',
  },
  {
    id: 'vscode-extension',
    name: 'VS Code Extension',
    category: 'ide-extension',
    description: 'Visual Studio Code에서 Claude Code를 사용할 수 있게 하는 확장 프로그램입니다. 에디터 내에서 직접 Claude와 대화하고 코드를 수정할 수 있습니다.',
    installation: 'VS Code Marketplace에서 "Claude Code" 검색 후 설치',
    documentation: 'https://marketplace.visualstudio.com/items?itemName=Anthropic.claude-code',
    icon: 'Code',
  },
  {
    id: 'jetbrains-plugin',
    name: 'JetBrains Plugin',
    category: 'ide-extension',
    description: 'IntelliJ IDEA, WebStorm 등 JetBrains IDE에서 사용하는 Claude Code 플러그인입니다.',
    installation: 'JetBrains Marketplace에서 "Claude Code" 검색 후 설치',
    icon: 'Code',
  },
  {
    id: 'marketplace-git-ops',
    name: 'Git Operations',
    category: 'marketplace',
    description: 'Git 명령어를 자연어로 실행할 수 있는 마켓플레이스 플러그인입니다. "지난 주 커밋 내역 보여줘" 같은 요청을 이해하고 실행합니다.',
    installation: 'npx claude-code-templates@latest --plugins',
    icon: 'GitBranch',
  },
  {
    id: 'marketplace-docker',
    name: 'Docker Management',
    category: 'marketplace',
    description: 'Docker 컨테이너, 이미지, 볼륨 관리를 자연어로 수행합니다. "실행 중인 컨테이너 목록 보여줘" 같은 요청을 처리합니다.',
    installation: 'npx claude-code-templates@latest --plugins',
    icon: 'Package',
  },
  {
    id: 'custom-testing',
    name: 'Custom Testing Tool',
    category: 'custom-tool',
    description: '프로젝트별 커스텀 테스트 자동화 도구입니다. 테스트 작성, 실행, 리포트 생성을 Claude가 자동으로 수행합니다.',
    installation: 'CLAUDE.md에 커스텀 도구 설정 추가',
    icon: 'TestTube',
  },
];

/**
 * 트러블슈팅 FAQ (4개)
 */
export const TROUBLESHOOTING_ITEMS: TroubleshootingItem[] = [
  {
    id: 'faq-1',
    question: 'Q: 플러그인 대시보드에 어떻게 접근하나요?',
    answer: '다음 명령어로 플러그인 대시보드를 실행할 수 있습니다:\n\nnpx claude-code-templates@latest --plugins\n\n이 명령어는 설치된 플러그인 목록, 활성화 상태, 버전 정보를 시각적으로 표시합니다.\n\n또는 .clauderc 파일을 직접 확인:\n\ncat ~/.claude-code/.clauderc',
  },
  {
    id: 'faq-2',
    question: 'Q: MCP 서버 설치가 실패합니다',
    answer: 'MCP 서버 설치 문제 해결:\n\n1. Node.js 버전 확인 (18 이상 필요): node --version\n2. npm 캐시 정리: npm cache clean --force\n3. 관리자 권한으로 재시도: sudo claude-code mcp install <서버명>\n4. 수동 설치:\n   mkdir -p ~/.claude-code/mcp-servers\n   cd ~/.claude-code/mcp-servers\n   git clone <MCP 서버 저장소>\n\nWindows 사용자는 WSL2 사용을 권장합니다.',
  },
  {
    id: 'faq-3',
    question: 'Q: 플러그인을 활성화/비활성화하려면?',
    answer: '.clauderc 파일을 직접 수정하여 플러그인을 제어할 수 있습니다:\n\n{\n  "mcp": {\n    "servers": {\n      "filesystem": {\n        "enabled": true\n      },\n      "database": {\n        "enabled": false\n      }\n    }\n  }\n}\n\n또는 CLI 명령어 사용:\n\nclaude-code mcp enable filesystem\nclaude-code mcp disable database',
  },
  {
    id: 'faq-4',
    question: 'Q: 커스텀 플러그인을 만들 수 있나요?',
    answer: '네, Claude Agent SDK를 사용하여 커스텀 플러그인을 만들 수 있습니다:\n\n1. SDK 설치: npm install @anthropic-ai/claude-agent-sdk\n2. 플러그인 구조 생성:\n   my-plugin/\n   ├── index.js\n   ├── package.json\n   └── README.md\n\n3. .clauderc에 등록:\n   "custom_tools": [\n     {"path": "./my-plugin"}\n   ]\n\n자세한 내용은 공식 문서 참조:\nhttps://docs.anthropic.com/claude-agent-sdk',
  },
];
