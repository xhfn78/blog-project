"use client";

import { useEffect, useState } from "react";
import { ToolGrid } from "@/features/tools/ui/tool-grid";
import { useToolStore } from "@/features/tools/lib/use-tool-store";
import { Input } from "@/shared/ui/input";
import { CategoryBadge } from "@/shared/ui/category-badge";
import { TOOL_CATEGORIES, TOOL_CATEGORY_METADATA } from "@/entities/content/model/tool-category";

export default function ToolsHomePage() {
  const { loadTools, setSearchTerm, setCategory, activeCategory, searchTerm } = useToolStore();
  const [currentSearchTerm, setCurrentSearchTerm] = useState(searchTerm);

  useEffect(() => {
    loadTools();
  }, [loadTools]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchTerm(currentSearchTerm);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [currentSearchTerm, setSearchTerm]);

  const categories = TOOL_CATEGORIES;

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">개발 도구 모음</h1>
        <p className="text-sm text-muted-foreground">
          자주 쓰는 작은 개발 도구들을 한 곳에서 검색하고 바로 실행해 보세요.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="도구 이름이나 기능으로 검색해 보세요..."
          value={currentSearchTerm}
          onChange={(e) => setCurrentSearchTerm(e.target.value)}
          className="flex-grow"
        />
        <div className="flex flex-wrap gap-2">
          <CategoryBadge
            category="all"
            isActive={activeCategory === null}
            onClick={() => setCategory(null)}
          >
            전체
          </CategoryBadge>
          {categories.map((category) => (
            <CategoryBadge
              key={category}
              category={category}
              isActive={activeCategory === category}
              onClick={() => setCategory(category)}
            >
              {TOOL_CATEGORY_METADATA[category].name}
            </CategoryBadge>
          ))}
        </div>
      </div>

      <ToolGrid />
    </div>
  );
}