import { ToolRegistration } from "@/shared/config/tools-registry";

// This type is used to ensure the config fits the registration shape
type ToolConfig = Omit<ToolRegistration, 'component'>;

export const config: ToolConfig = {
  slug: 'vibe-token-slimmer', // IMPORTANT: MUST BE UNIQUE
  name: 'AI 토큰 절감기 - 저사양 AI 최적화 및 비용 효율화 도구',
  description: 'AI가 이해하는 핵심 로직을 유지하며 토큰 소모량을 30~50% 줄여주는 AI 토큰 절감기입니다. AI 개발자 및 사용자를 위한 저사양 AI 모델 최적화 및 비용 효율화 도구로, 작업 효율성을 극대화합니다.',
  category: 'utility', // 'converter', 'generator', 'formatter', or 'utility'
  tags: ['ai', 'token', 'optimizer', 'cost-saving', 'developer-tool'],
  author: 'Dev Toolbox Team',
};