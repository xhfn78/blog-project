import * as React from "react"

import { cn } from "@/shared/lib/cn"
import { Typography } from "./typography"
import { CategoryBadge } from "./category-badge"
import { TOOL_CATEGORY_METADATA } from "@/entities/content/model/tool-category"
import { Card, CardContent } from "./card"
import { ToolRegistration } from "@/shared/config/tools-registry" // Import ToolRegistration

export interface ToolLayoutProps {
  /**
   * 도구 등록 정보
   */
  config: Omit<ToolRegistration, 'component'>
  /**
   * 도구 UI 컴포넌트
   */
  children: React.ReactNode
  /**
   * 추가 정보 또는 사용법 (옵션)
   */
  footer?: React.ReactNode
  /**
   * 커스텀 클래스
   */
  className?: string
}

/**
 * ToolLayout 컴포넌트
 * 도구 페이지의 공통 레이아웃을 제공하는 컴포넌트
 *
 * @example
 * ```tsx
 * <ToolLayout
 *   config={...} // ToolRegistration object
 * >
 *   <YourToolComponent />
 * </ToolLayout>
 * ```
 */
function ToolLayout({
  config, // Destructure config instead of individual props
  children,
  footer,
  className,
}: ToolLayoutProps) {
  return (
    <div
      data-slot="tool-layout"
      data-category={config.category} // Use config.category
      className={cn("container mx-auto px-4 py-10 max-w-6xl", className)}
    >
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-start gap-4 mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <Typography variant="h1" className="text-3xl md:text-4xl">
                {config.name} {/* Use config.name */}
              </Typography>
              <CategoryBadge category={config.category}>
                {TOOL_CATEGORY_METADATA[config.category].name}
              </CategoryBadge>
            </div>
            <Typography variant="lead" className="text-muted-foreground">
              {config.description} {/* Use config.description */}
            </Typography>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <Card>
          <CardContent className="p-6">
            {children}
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      {footer && (
        <footer className="mt-8">
          <Card>
            <CardContent className="p-6">
              {footer}
            </CardContent>
          </Card>
        </footer>
      )}
    </div>
  )
}

/**
 * ToolSection 컴포넌트
 * ToolLayout 내부에서 섹션을 구분하는 컴포넌트
 */
function ToolSection({
  title,
  description,
  children,
  className,
  headingLevel = "h3", // Add headingLevel prop with default h3
}: {
  title?: string
  description?: string
  children: React.ReactNode
  className?: string
  headingLevel?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" // Define prop type
}) {
  return (
    <section
      data-slot="tool-section"
      className={cn("space-y-4", className)}
    >
      {title && (
        <div className="space-y-1">
          <Typography variant={headingLevel} className="text-lg font-semibold"> {/* Use headingLevel here */}
            {title}
          </Typography>
          {description && (
            <Typography variant="muted" className="text-sm">
              {description}
            </Typography>
          )}
        </div>
      )}
      <div>{children}</div>
    </section>
  )
}

export { ToolLayout, ToolSection }
