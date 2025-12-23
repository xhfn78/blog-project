import { ToolRegistration } from "@/shared/config/tools-registry";

// This type is used to ensure the config fits the registration shape
type ToolConfig = Omit<ToolRegistration, 'component'>;

export const config: ToolConfig = {
  slug: 'claude-code-analytics',
  name: '클로드 코드 실시간 분석기',
  description: 'Claude Code 개발 세션을 실시간으로 모니터링하고 생산성 지표를 추적하세요. 도구 사용 패턴과 성능 메트릭을 분석하여 워크플로우를 최적화할 수 있습니다.',
  category: 'claude',
  tags: ['claude-code', 'analytics', 'monitoring', 'productivity', 'metrics', 'performance'],
  author: 'Vlog Team',
};