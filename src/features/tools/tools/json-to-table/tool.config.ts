import { ToolRegistration } from "@/shared/config/tools-registry";

// This type is used to ensure the config fits the registration shape
type ToolConfig = Omit<ToolRegistration, 'component'>;

export const config: ToolConfig = {
  slug: 'json-to-table', // IMPORTANT: MUST BE UNIQUE
  name: '스마트 JSON 변환기',
  description: '복잡한 중첩 JSON을 편집 가능한 테이블로 변환하며, 자동 보안 마스킹 및 양방향 편집을 지원합니다.',
  category: 'converter', // 'converter', 'generator', 'formatter', or 'utility'
  tags: ['json', 'table', 'excel', 'security', 'privacy'],
  author: 'Vlog Team',
};