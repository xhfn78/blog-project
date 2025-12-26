'use client';

import { ToolLayout } from '@/shared/ui/tool-layout';
import { config } from './tool.config';
import { JsonConverterTool } from './ui/json-converter-tool';
import { SeoGuide } from './ui/seo-guide';

export async function generateMetadata() {
  return {
    title: config.name,
    description: config.description,
  };
}

export default function JsonToTablePage() {
  return (
    <ToolLayout config={config}>
      <JsonConverterTool />
      
      <div className="my-8" />
      
      <SeoGuide />
    </ToolLayout>
  );
}