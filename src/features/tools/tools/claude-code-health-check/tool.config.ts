import { ToolRegistration } from "@/shared/config/tools-registry";

// This type is used to ensure the config fits the registration shape
type ToolConfig = Omit<ToolRegistration, 'component'>;

export const config: ToolConfig = {
  slug: 'claude-code-health-check',
  name: '클로드 코드 헬스 체크',
  description: 'Claude Code 설치 상태를 종합 진단하고 최적화 기회를 찾아냅니다. 시스템 구성 검증부터 성능 튜닝까지 완벽한 개발 환경을 보장합니다.',
  category: 'claude',
  tags: ['claude-code', 'health-check', 'diagnostics', 'optimization', 'setup', 'troubleshooting'],
  author: 'Vlog Team',
  featured: true,
};