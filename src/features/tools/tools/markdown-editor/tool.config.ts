import { ToolRegistration } from "@/shared/config/tools-registry";

// This type is used to ensure the config fits the registration shape
type ToolConfig = Omit<ToolRegistration, 'component'>;

export const config: ToolConfig = {
  slug: 'markdown-editor', // IMPORTANT: MUST BE UNIQUE
  name: 'Markdown 에디터 - 실시간 미리보기 및 HTML 변환',
  description: '실시간 Markdown 편집과 HTML 미리보기 기능을 제공합니다. 개발자, 블로거, 작가에게 최적화된 마크다운 에디터입니다. 간편한 HTML 변환 및 코드 내보내기로 생산성을 향상시키세요.',
  category: 'utility', // 'converter', 'generator', 'formatter', or 'utility'
  tags: ['markdown', 'editor', 'html', 'preview', 'converter', 'developer', 'blogging', 'writing'],
  author: 'Dev Toolbox Team',
};