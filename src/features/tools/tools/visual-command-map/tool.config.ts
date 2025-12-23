import { ToolRegistration } from "@/shared/config/tools-registry";

// This type is used to ensure the config fits the registration shape
type ToolConfig = Omit<ToolRegistration, 'component'>;

export const config: ToolConfig = {
  slug: 'visual-command-map',
  name: '비주얼 명령어 지도',
  description: '풀스택 개발의 전체 여정을 GitHub 스타일 트리 구조로 시각화하고, 각 단계별 필요한 명령어를 한눈에 확인하세요.',
  category: 'utility',
  tags: ['fullstack', 'command', 'workflow', 'visualization', 'guide', 'developer-tools', 'nextjs'],
  author: 'Vlog',
};