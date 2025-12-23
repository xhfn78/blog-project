import { BaseContent, ContentType } from '../model/types';

export interface ContentFilter {
    type?: ContentType | null; // Allow null for type filter
    category?: string;
    published?: boolean;
}

export interface CreateContentDTO {
    [key: string]: unknown;
}

export interface UpdateContentDTO {
    [key: string]: unknown;
}

export interface ContentRepository<T extends BaseContent> {
  findAll(filter?: ContentFilter): Promise<T[]>;
  findBySlug(slug: string): Promise<T | null>;
  create(data: CreateContentDTO): Promise<T>;
  update(id: string, data: UpdateContentDTO): Promise<T>;
  delete(id: string): Promise<void>;
}

import { Tool } from '../model/types';

export interface ToolRepository extends ContentRepository<Tool> {
    // Re-declare methods from ContentRepository for direct access
    findAll(filter?: ContentFilter): Promise<Tool[]>;
    findById(id: string): Promise<Tool | null>;
    findBySlug(slug: string): Promise<Tool | null>;
    create(data: CreateContentDTO): Promise<Tool>;
    update(id: string, data: UpdateContentDTO): Promise<Tool>;
    delete(id: string): Promise<void>;

    // Specific methods for ToolRepository
    findByCategory(category: string, filter?: ContentFilter): Promise<Tool[]>;
    findFeatured(filter?: ContentFilter): Promise<Tool[]>;
    findByTag(tag: string, filter?: ContentFilter): Promise<Tool[]>;
    incrementUsageCount(id: string): Promise<Tool | null>;
}

export interface UniversalContentRepository {
    tools: ToolRepository;
    findByType(type: ContentType, filter?: ContentFilter): Promise<BaseContent[]>;
    findRecent(limit: number, type?: ContentType): Promise<BaseContent[]>;
}