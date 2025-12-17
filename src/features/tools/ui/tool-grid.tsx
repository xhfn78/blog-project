
"use client";

import { useEffect } from "react";
import { ToolCard } from "@/shared/ui/tool-card";
import { useToolStore } from "../lib/use-tool-store";

export function ToolGrid() {
  const { filteredTools, loadTools } = useToolStore();

  useEffect(() => {
    loadTools();
  }, [loadTools]);

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredTools.length > 0 ? (
        filteredTools.map((tool) => (
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
