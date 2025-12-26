'use client';

import { ToolLayout } from "@/shared/ui/tool-layout";
import { config } from "./tool.config";
import { MarkdownEditorTool } from "./ui/markdown-editor-tool";
import { SeoGuide } from "./ui/seo-guide";

export async function generateMetadata() {
  return {
    title: config.name,
    description: config.description,
  };
}

export default function MarkdownEditorPage() {
  return (
    <ToolLayout config={config}>
      <MarkdownEditorTool />
      
      <div className="my-8" />
      
      <SeoGuide />
    </ToolLayout>
  );
}