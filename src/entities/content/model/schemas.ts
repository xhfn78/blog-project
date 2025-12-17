import { z } from 'zod';
import { TOOL_CATEGORIES } from './tool-category';

export const createPostSchema = z.object({
  title: z.string().min(1, '제목을 입력해주세요.').max(200, '제목은 200자를 초과할 수 없습니다.'),
  slug: z.string().min(1, '슬러그를 입력해주세요.').regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, '슬러그는 소문자, 숫자, 하이픈만 포함해야 합니다.'),
  description: z.string().max(500, '설명은 500자를 초과할 수 없습니다.').optional(),
  content: z.string().min(1, '내용을 입력해주세요.'),
  published: z.boolean(),
});

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

export function validateCreatePost(data: unknown) {
  return createPostSchema.parse(data);
}