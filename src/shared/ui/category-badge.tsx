import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/shared/lib/cn"
import { type ToolCategory } from "@/entities/content/model/tool-category"

const categoryBadgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer", // Add cursor-pointer for clickable
  {
    variants: {
      category: {
        converter: "border-transparent bg-tool-converter text-tool-converter-foreground",
        generator: "border-transparent bg-tool-generator text-tool-generator-foreground",
        formatter: "border-transparent bg-tool-formatter text-tool-formatter-foreground",
        utility: "border-transparent bg-tool-utility text-tool-utility-foreground",
        all: "border-transparent bg-gray-500 text-gray-900", // Style for 'all' category
      },
      isActive: { // New variant for active state
        true: "ring-2 ring-primary ring-offset-2", // Example active style
        false: ""
      }
    },
    defaultVariants: {
      category: "converter",
      isActive: false // Default to not active
    },
  }
)

export interface CategoryBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof categoryBadgeVariants> {
  /**
   * 도구 카테고리
   */
  category: ToolCategory | 'all'; // Allow 'all' as a category
  /**
   * 활성 상태 여부
   */
  isActive?: boolean;
}

/**
 * CategoryBadge 컴포넌트
 * 도구 카테고리를 표시하는 배지 컴포넌트
 *
 * @example
 * ```tsx
 * <CategoryBadge category="converter">변환기</CategoryBadge>
 * ```
 */
function CategoryBadge({ className, category, isActive, ...props }: CategoryBadgeProps) {
  return (
    <div
      data-slot="category-badge"
      data-category={category}
      className={cn(categoryBadgeVariants({ category, isActive }), className)}
      {...props}
    />
  )
}

export { CategoryBadge, categoryBadgeVariants }
