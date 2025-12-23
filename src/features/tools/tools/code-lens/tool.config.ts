// src/features/tools/tools/code-lens/tool.config.ts
import { ToolRegistration } from '@/shared/config/tools-registry.types';

type ToolConfig = Omit<ToolRegistration, 'component'>;

export const config: ToolConfig = {
  slug: 'code-lens',
  name: '코드 렌즈 (Code Lens) - 전천후 실시간 코드 해설사',
  description: 'AI 없이 0.1초 만에 코드의 의도와 구조를 분석합니다. HTML, CSS, JS/TS는 물론 JSON, SQL, YAML, Markdown, GraphQL까지 웹 개발 필수 9개 언어를 완벽히 지원합니다.',
  category: 'utility',
  tags: ['code-analysis', 'no-ai', 'web-development', 'parser', 'developer-tool', 'productivity'],
  author: 'Vlog Team',
};