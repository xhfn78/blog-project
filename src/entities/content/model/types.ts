import { ToolCategory } from './tool-category';

export type ContentType = 'tool' | 'blog' | 'snippet';

export interface BaseContent {
  id: string;
  type: ContentType;
  title: string;
  slug: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
}

export interface Tool extends BaseContent {
  type: 'tool';
  category: ToolCategory;
  component: string;
  tags: string[];
  featured: boolean;
  author: string;
  usageCount?: number;
}

export interface Post extends BaseContent {
  type: 'blog';
  content: string;
  excerpt: string;
}

export function isTool(content: BaseContent): content is Tool {
  return content.type === 'tool';
}

export function isPost(content: BaseContent): content is Post {
  return content.type === 'blog';
}