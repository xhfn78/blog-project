import { ToolRegistration } from "@/shared/config/tools-registry";

// This type is used to ensure the config fits the registration shape
type ToolConfig = Omit<ToolRegistration, 'component'>;

export const config: ToolConfig = {
  slug: 'vibe-token-slimmer', // IMPORTANT: MUST BE UNIQUE
  name: 'AI 토큰 절감기 - 프롬프트 최적화 및 비용 50% 절약',
  description: 'AI 토큰 절감기는 ChatGPT, Claude, Gemini 등 LLM 사용 시 불필요한 비용 낭비를 막아주는 필수 개발자 도구입니다. 코드의 주석, 공백, 불필요한 임포트 구문을 지능적으로 제거하여 핵심 로직만 AI에게 전달함으로써, 토큰 사용량을 최대 50%까지 획기적으로 줄여줍니다. 긴 레거시 코드를 리팩토링하거나 복잡한 프롬프트를 작성할 때 컨텍스트 윈도우 제한을 극복하고 응답 속도를 높이세요. 실시간 절감 비용 예측과 원클릭 AI 서비스 복사 기능으로 프롬프트 엔지니어링의 생산성을 극대화합니다.',
  category: 'utility', // 'converter', 'generator', 'formatter', or 'utility'
  tags: ['ai', 'token', 'optimizer', 'cost-saving', 'developer-tool', 'prompt-engineering', 'llm-optimization', 'code-minifier'],
  author: 'Dev Toolbox Team',
};