import { ToolRegistration } from "@/shared/config/tools-registry";

// This type is used to ensure the config fits the registration shape
type ToolConfig = Omit<ToolRegistration, 'component'>;

export const config: ToolConfig = {
  slug: 'my-new-tool', // IMPORTANT: MUST BE UNIQUE
  name: 'My New Tool',
  description: 'A brief description of what this tool does.',
  category: 'utility', // 'converter', 'generator', 'formatter', or 'utility'
  tags: ['new', 'tool'],
  author: 'Your Name',
};