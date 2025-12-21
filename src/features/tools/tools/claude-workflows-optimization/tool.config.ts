import { ToolRegistration } from "@/shared/config/tools-registry";

// This type is used to ensure the config fits the registration shape
type ToolConfig = Omit<ToolRegistration, 'component'>;

export const config: ToolConfig = {
  slug: 'claude-workflows-optimization', // IMPORTANT: MUST BE UNIQUE
  name: '클로드 워크플로우 최적화',
  description: 'Claude Code의 6가지 핵심 워크플로우를 학습하고 토큰 비용을 최적화하는 실전 가이드입니다.',
  category: 'claude',
  tags: ['claude', 'workflow', 'optimization', 'cost', 'guide'],
  author: 'Vlog',
};