import * as React from "react"
import Link from "next/link"

import { cn } from "@/shared/lib/cn"
import { type ToolCategory } from "@/entities/content/model/tool-category"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./card"
import { CategoryBadge } from "./category-badge"

export interface ToolCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 도구 이름
   */
  name: string
  /**
   * 도구 설명
   */
  description: string
  /**
   * 도구 카테고리
   */
  category: ToolCategory
  /**
   * 도구 페이지 링크
   */
  href: string
  /**
   * 도구 태그
   */
  tags?: string[]
  /**
   * 추천 도구 여부
   */
  featured?: boolean
  /**
   * 사용 횟수
   */
  usageCount?: number
}

/**
 * ToolCard 컴포넌트
 * 도구 목록에서 각 도구를 표시하는 카드 컴포넌트
 *
 * @example
 * ```tsx
 * <ToolCard
 *   name="JSON Formatter"
 *   description="JSON을 예쁘게 포맷팅합니다"
 *   category="formatter"
 *   href="/tools/formatter/json-formatter"
 *   tags={["json", "format"]}
 * />
 * ```
 */
function ToolCard({
  name,
  description,
  category,
  href,
  tags = [],
  featured = false,
  usageCount,
  className,
  ...props
}: ToolCardProps) {
  return (
    <Link href={href} className="block group">
      <Card
        data-slot="tool-card"
        data-category={category}
        data-featured={featured}
        className={cn(
          "transition-all hover:shadow-md hover:border-primary/50",
          "group-hover:scale-[1.02]",
          featured && "border-primary/50 bg-accent/50",
          className
        )}
        {...props}
      >
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <CardTitle className="flex items-center gap-2 text-lg">
                {name}
                {featured && (
                  <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                    추천
                  </span>
                )}
              </CardTitle>
              <CardDescription className="mt-2 line-clamp-2">
                {description}
              </CardDescription>
            </div>
            <CategoryBadge category={category}>
              {category}
            </CategoryBadge>
          </div>
        </CardHeader>

        {(tags.length > 0 || usageCount !== undefined) && (
          <CardContent className="pt-0">
            <div className="flex items-center justify-between gap-4 text-xs">
              {/* 태그 */}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 flex-1 min-w-0">
                  {tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-[10px] text-muted-foreground">
                      #{tag}
                    </span>
                  ))}
                  {tags.length > 3 && (
                    <span className="inline-flex items-center text-xs text-muted-foreground">
                      +{tags.length - 3}
                    </span>
                  )}
                </div>
              )}

              {/* 사용 횟수 */}
              {usageCount !== undefined && (
                <div className="text-muted-foreground whitespace-nowrap">
                  사용 {usageCount.toLocaleString()}회
                </div>
              )}
            </div>
          </CardContent>
        )}
      </Card>
    </Link>
  )
}

export { ToolCard }
