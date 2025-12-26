'use client';

import { ToolLayout } from '@/shared/ui/tool-layout';
import { config } from './tool.config';
import { ColorPaletteTool } from './ui/color-palette-tool';
import { SeoGuide } from './ui/seo-guide';

export async function generateMetadata() {
  return {
    title: config.name,
    description: config.description,
  };
}

export default function ColorPaletteGeneratorPage() {
  return (
    <ToolLayout config={config}>
      <ColorPaletteTool />
      
      <div className="my-8 h-px bg-border" />
      
      <SeoGuide />
    </ToolLayout>
  );
}
