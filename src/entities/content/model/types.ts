import { ToolCategory } from './tool-category';

export type ContentType = 'tool' | 'snippet';

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

export function isTool(content: BaseContent): content is Tool {
  return content.type === 'tool';
}