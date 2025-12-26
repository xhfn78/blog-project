import { ToolRegistration } from "@/shared/config/tools-registry";

// This type is used to ensure the config fits the registration shape
type ToolConfig = Omit<ToolRegistration, 'component'>;

export const config: ToolConfig = {
  slug: 'color-palette-generator', // IMPORTANT: MUST BE UNIQUE
  name: 'Color Palette Generator',
  description: 'Generates Tailwind CSS compatible color palettes (50-950) from a single color.',
  category: 'generator',
  tags: ['new', 'tool'],
  author: 'Your Name',
};