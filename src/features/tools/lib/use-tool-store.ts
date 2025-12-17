import { create } from 'zustand';
import { Tool } from '@/entities/content/model/types';
import { InMemoryContentRepository } from '@/entities/content/repository/content.repository.impl';
import { ContentRepository } from '@/entities/content/repository/content.repository';
import { TOOLS_REGISTRY } from '@/shared/config/tools-registry';

interface ToolState {
    tools: Tool[];
    filteredTools: Tool[];
    activeCategory: string | null;
    searchTerm: string;
    repository: ContentRepository<Tool>;
    loadTools: () => Promise<void>;
    setCategory: (category: string | null) => void;
    setSearchTerm: (term: string) => void;
}

const toolContents: Tool[] = TOOLS_REGISTRY.map(reg => ({
  id: reg.slug,
  type: 'tool',
  title: reg.name,
  slug: reg.slug,
  description: reg.description,
  createdAt: new Date(),
  updatedAt: new Date(),
  published: true,
  category: reg.category,
  component: reg.slug, // Storing component slug/name
  tags: reg.tags,
  author: reg.author,
  featured: false,
  usageCount: 0,
}));

const repository = new InMemoryContentRepository(toolContents);

export const useToolStore = create<ToolState>((set, get) => ({
    tools: [],
    filteredTools: [],
    activeCategory: null,
    searchTerm: '',
    repository: repository as ContentRepository<Tool>,

    loadTools: async () => {
        const tools = await get().repository.findAll({ type: 'tool', published: true }) as Tool[];
        set({ tools, filteredTools: tools });
    },

    setCategory: (category: string | null) => {
        set({ activeCategory: category });
        const { tools, searchTerm } = get();
        const filtered = tools.filter(tool => 
            (category ? tool.category === category : true) &&
            (searchTerm ? tool.title.toLowerCase().includes(searchTerm.toLowerCase()) : true)
        );
        set({ filteredTools: filtered });
    },

    setSearchTerm: (term: string) => {
        set({ searchTerm: term });
        const { tools, activeCategory } = get();
        const filtered = tools.filter(tool =>
            (activeCategory ? tool.category === activeCategory : true) &&
            (term ? tool.title.toLowerCase().includes(term.toLowerCase()) : true)
        );
        set({ filteredTools: filtered });
    },
}));