import { ToolRegistration } from "@/shared/config/tools-registry";

// This type is used to ensure the config fits the registration shape
type ToolConfig = Omit<ToolRegistration, 'component'>;

export const config: ToolConfig = {
  slug: 'claude-conversation-monitor',
  name: '클로드 대화 모니터링',
  description: 'Claude의 응답을 실시간으로 분석하고 AI 추론 과정을 시각화합니다. 에이전트 검색 패턴과 코드 생성 전략을 이해하여 더 나은 프롬프트를 작성할 수 있습니다.',
  category: 'claude',
  tags: ['claude-code', 'conversation', 'monitoring', 'ai-reasoning', 'prompts', 'agentic-search'],
  author: 'Vlog Team',
};