import { ToolRegistration } from "@/shared/config/tools-registry";

// This type is used to ensure the config fits the registration shape
type ToolConfig = Omit<ToolRegistration, 'component'>;

export const config: ToolConfig = {
  slug: 'json-to-table', // IMPORTANT: MUST BE UNIQUE
  name: 'Smart JSON Converter',
  description: 'Convert complex nested JSON to editable tables with automatic security masking and bidirectional editing support.',
  category: 'converter', // 'converter', 'generator', 'formatter', or 'utility'
  tags: ['json', 'table', 'excel', 'security', 'privacy'],
  author: 'Vlog Team',
};