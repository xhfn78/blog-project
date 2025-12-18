import { z } from 'zod';
import { TOOL_CATEGORIES } from './tool-category';

export const createToolSchema = z.object({
  title: z.string().min(1, '도구 이름을 입력해주세요.'),
  slug: z.string().min(1, '슬러그를 입력해주세요.'),
  description: z.string().min(1, '설명을 입력해주세요.'),
  category: z.enum(TOOL_CATEGORIES),
  tags: z.array(z.string()).optional(),
  author: z.string().min(1, '제작자를 입력해주세요.'),
  published: z.boolean(),
});

export function validateCreateTool(data: unknown) {
  return createToolSchema.parse(data);
}