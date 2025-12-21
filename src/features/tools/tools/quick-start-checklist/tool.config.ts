import { ToolRegistration } from "@/shared/config/tools-registry";

// This type is used to ensure the config fits the registration shape
type ToolConfig = Omit<ToolRegistration, 'component'>;

export const config: ToolConfig = {
  slug: 'quick-start-checklist', // IMPORTANT: MUST BE UNIQUE
  name: 'Claude Code CLI 빠른 시작 가이드',
  description: 'Claude Code CLI 설치부터 첫 프로젝트까지, 단계별 체크리스트로 쉽게 시작하세요. 복사 가능한 명령어와 트러블슈팅 가이드 포함.',
  category: 'claude',
  tags: ['claude-code', 'cli', 'setup', 'guide', 'checklist'],
  author: 'Vlog Team',
  featured: true, // 메인 페이지 인기 도구 섹션에 표시
};