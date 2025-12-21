import { ToolRegistration } from "@/shared/config/tools-registry";

// This type is used to ensure the config fits the registration shape
type ToolConfig = Omit<ToolRegistration, 'component'>;

export const config: ToolConfig = {
  slug: 'claude-config-master',
  name: 'Claude Code 설정 마스터 가이드',
  description: '.clauderc, CLAUDE.md, .claudeignore 설정을 마스터하여 Claude Code를 최대한 활용하세요. 프로젝트별 템플릿과 최적화 팁 포함.',
  category: 'claude',
  tags: ['claude-code', 'config', 'clauderc', 'claude-md', 'context', 'optimization'],
  author: 'Vlog Team',
  featured: true,
};