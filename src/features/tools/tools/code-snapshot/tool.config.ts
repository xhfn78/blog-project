import { ToolRegistration } from "@/shared/config/tools-registry";

type ToolConfig = Omit<ToolRegistration, 'component'>;

export const config: ToolConfig = {
  slug: 'code-snapshot',
  name: '코드 스냅샷',
  description: '당신의 코드를 아름다운 스냅샷으로 만들어보세요.',
  category: 'generator',
  tags: ['code', 'image', 'snapshot'],
  author: 'Team Member',
};