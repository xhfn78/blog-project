import { ToolRegistration } from "@/shared/config/tools-registry";

type ToolConfig = Omit<ToolRegistration, 'component'>;

export const config: ToolConfig = {
  slug: 'visual-command-map',
  name: '비주얼 명령어 지도 - 풀스택 개발 워크플로우 시각화',
  description: '프론트엔드부터 백엔드, 배포까지 풀스택 개발의 전체 여정을 인터랙티브 트리 구조로 시각화합니다. 각 단계별 필수 터미널 명령어와 베스트 프랙티스를 확인하여 프로젝트 성공 확률을 높이세요.',
  category: 'utility',
  tags: ['fullstack-workflow', 'terminal-commands', 'git-workflow', 'deployment-guide', 'developer-roadmap', 'nextjs-guide'],
  author: 'Vlog Team',
};
