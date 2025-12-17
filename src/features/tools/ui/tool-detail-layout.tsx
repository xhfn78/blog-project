
import React from 'react';
import { ToolLayout, ToolSection } from '@/shared/ui/tool-layout';
import { Typography } from '@/shared/ui/typography';
import { Card, CardContent } from '@/shared/ui/card';
import { Tool } from '@/entities/content/model/types';

interface ToolDetailLayoutProps {
  tool: Tool;
  children: React.ReactNode;
}

export function ToolDetailLayout({ tool, children }: ToolDetailLayoutProps) {
  return (
    <ToolLayout
      config={{
        slug: tool.slug,
        name: tool.title,
        description: tool.description,
        category: tool.category,
        tags: tool.tags ?? [],
        author: tool.author,
      }}
    >
      {/* Tool-specific UI */}
      {children}

      {/* Additional information, usage guides, etc. */}
      {tool.tags && tool.tags.length > 0 && (
        <ToolSection title="Tags">
          <div className="flex flex-wrap gap-2">
            {tool.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-sm font-medium text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </ToolSection>
      )}

      <ToolSection title="Author">
        <Typography variant="p">{tool.author}</Typography>
      </ToolSection>

      {tool.usageCount !== undefined && (
        <ToolSection title="Usage">
          <Typography variant="p">{tool.usageCount.toLocaleString()} times used</Typography>
        </ToolSection>
      )}

      {/* TODO: Add a comment section or related tools */}
    </ToolLayout>
  );
}