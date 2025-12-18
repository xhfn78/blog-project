import { BaseContent, Tool, ContentType } from '../model/types';
import {
    ContentRepository,
    ContentFilter,
    CreateContentDTO,
    UpdateContentDTO,
    ToolRepository,
    UniversalContentRepository,
} from './content.repository';

export class InMemoryContentRepository<T extends BaseContent> implements ContentRepository<T> {
    protected contents: T[];

    constructor(initialContents: T[] = []) {
        this.contents = initialContents;
    }

    async findAll(filter?: ContentFilter): Promise<T[]> {
        let result = this.contents.filter(content => content.published); // Only published content by default

        if (filter?.type) {
            result = result.filter(content => content.type === filter.type);
        }
        // Category filtering is specific to Tool, so it should be handled in InMemoryToolRepository
        // if (filter?.category) {
        //     result = result.filter(content => (content as Tool).category === filter.category);
        // }
        // Assuming no other filters like tags or author are needed for findAll generic
        return result;
    }

    async findById(id: string): Promise<T | null> {
        return this.contents.find(content => content.id === id) || null;
    }

    async findBySlug(slug: string): Promise<T | null> {
        return this.contents.find(content => content.slug === slug) || null;
    }

    async create(data: CreateContentDTO): Promise<T> {
        const newContent: T = {
            id: crypto.randomUUID(), // Use UUID for unique ID
            createdAt: new Date(),
            updatedAt: new Date(),
            ...data,
        } as T;
        this.contents.push(newContent);
        return newContent;
    }

    async update(id: string, data: UpdateContentDTO): Promise<T> {
        const index = this.contents.findIndex(content => content.id === id);
        if (index === -1) {
            throw new Error('Content not found');
        }
        this.contents[index] = { ...this.contents[index], ...data, updatedAt: new Date() };
        return this.contents[index];
    }

    async delete(id: string): Promise<void> {
        const index = this.contents.findIndex(content => content.id === id);
        if (index === -1) {
            throw new Error('Content not found');
        }
        this.contents.splice(index, 1);
    }
}

export class InMemoryToolRepository
    extends InMemoryContentRepository<Tool>
    implements ToolRepository {
    constructor(initialTools: Tool[] = []) {
        super(initialTools.filter(tool => tool.type === 'tool'));
    }

    async findAll(filter?: ContentFilter): Promise<Tool[]> {
        let result = await super.findAll(filter); // Apply base filters (type, published)

        if (filter?.category) {
            result = result.filter(tool => tool.category === filter.category);
        }
        // Note: super.findAll already filters by published.
        return result;
    }

    async findByCategory(category: string, options?: ContentFilter): Promise<Tool[]> {
        return (await this.findAll(options)).filter(tool => tool.category === category);
    }

    async findFeatured(options?: ContentFilter): Promise<Tool[]> {
        return (await this.findAll(options)).filter(tool => tool.featured);
    }

    async findByTag(tag: string, options?: ContentFilter): Promise<Tool[]> {
        return (await this.findAll(options)).filter(tool => tool.tags.includes(tag));
    }

    async incrementUsageCount(id: string): Promise<Tool | null> {
        const tool = await this.findById(id);
        if (!tool) return null;

        tool.usageCount = (tool.usageCount || 0) + 1;
        await this.update(id, { usageCount: tool.usageCount });
        return tool;
    }
}

export class InMemoryUniversalContentRepository implements UniversalContentRepository {
    private static instance: InMemoryUniversalContentRepository;

    public tools: InMemoryToolRepository;

    private constructor(initialContents: BaseContent[] = []) {
        this.tools = new InMemoryToolRepository(
            initialContents.filter((c) => c.type === 'tool') as Tool[]
        );
    }

    static getInstance(initialContents: BaseContent[] = []): InMemoryUniversalContentRepository {
        if (!InMemoryUniversalContentRepository.instance) {
            InMemoryUniversalContentRepository.instance = new InMemoryUniversalContentRepository(initialContents);
        }
        return InMemoryUniversalContentRepository.instance;
    }

    async findByType(type: ContentType, filter?: ContentFilter): Promise<BaseContent[]> {
        if (type === 'tool') {
            return this.tools.findAll(filter);
        }
        return [];
    }

    async findRecent(limit: number, type?: ContentType): Promise<BaseContent[]> {
        const allContent: BaseContent[] = [
            ...(await this.tools.findAll()),
        ];

        return allContent
            .filter((c) => (!type || c.type === type) && c.published)
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
            .slice(0, limit);
    }
}

export function createContentRepository(
    initialContents: BaseContent[] = []
): UniversalContentRepository {
    return InMemoryUniversalContentRepository.getInstance(initialContents);
}

// Global instance
export const contentRepository = createContentRepository();