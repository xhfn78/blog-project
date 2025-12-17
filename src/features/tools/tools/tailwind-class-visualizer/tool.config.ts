import { ToolRegistration } from "@/shared/config/tools-registry";

// This type is used to ensure the config fits the registration shape
type ToolConfig = Omit<ToolRegistration, 'component'>;

export const config: ToolConfig = {
  slug: 'tailwind-class-visualizer', // IMPORTANT: MUST BE UNIQUE
  name: 'Tailwind class visualizer',
  description: 'A brief description of what this tool does.',
  category: 'utility', // 'converter', 'generator', 'formatter', or 'utility'
  tags: ['new', 'tool'],
  author: 'Your Name',
};