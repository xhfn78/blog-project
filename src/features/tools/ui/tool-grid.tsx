
"use client";

import { useEffect } from "react";
import { ToolCard } from "@/shared/ui/tool-card";
import { useToolStore } from "../lib/use-tool-store";
import { Tool } from "@/entities/content/model/types";

interface ToolGridProps {
  tools?: Tool[]; // Optional tools prop
}

export function ToolGrid({ tools }: ToolGridProps) { // Accept tools prop
  const { filteredTools, loadTools } = useToolStore();

  // Determine which tools to render
  const toolsToRender = tools || filteredTools;

  // Only load tools from store if tools prop is not provided
  useEffect(() => {
    if (!tools) {
      loadTools();
    }
  }, [loadTools, tools]);

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {toolsToRender.length > 0 ? (
        toolsToRender.map((tool) => (
          <ToolCard
            key={tool.id}
            name={tool.title}
            description={tool.description}
            category={tool.category}
            href={`/tools/${tool.category}/${tool.slug}`}
            tags={tool.tags}
            featured={tool.featured}
            usageCount={tool.usageCount}
          />
        ))
      ) : (
        <div className="col-span-full text-center text-muted-foreground py-10">
          No tools found for your selection.
        </div>
      )}
    </section>
  );
}

