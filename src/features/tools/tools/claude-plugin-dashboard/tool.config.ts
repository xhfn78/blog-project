import { ToolRegistration } from "@/shared/config/tools-registry";

// This type is used to ensure the config fits the registration shape
type ToolConfig = Omit<ToolRegistration, 'component'>;

export const config: ToolConfig = {
  slug: 'claude-plugin-dashboard',
  name: '클로드 플러그인 대시보드',
  description: 'Claude Code 플러그인을 시각적 인터페이스로 관리하세요. 마켓플레이스 확인, 플러그인 활성화/비활성화, 실시간 상태 모니터링을 한 곳에서 제어할 수 있습니다.',
  category: 'claude',
  tags: ['claude-code', 'plugins', 'dashboard', 'marketplace', 'management', 'configuration'],
  author: 'Vlog Team',
};