import * as React from "react";
import { cn } from "@/shared/lib/cn";

interface HeroSectionProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  actions?: React.ReactNode;
  gradient?: boolean;
}

/**
 * Hero Section 컴포넌트
 * 페이지 상단의 주요 메시지를 표시하는 섹션
 */
export function HeroSection({
  title,
  subtitle,
  actions,
  gradient = true,
  className,
  ...props
}: HeroSectionProps) {
  return (
    <section
      className={cn(
        "relative py-20 md:py-32 overflow-hidden",
        gradient && "bg-gradient-to-br from-blue-50 via-white to-orange-50 dark:from-blue-950/20 dark:via-background dark:to-orange-950/20",
        className
      )}
      {...props}
    >
      {/* 배경 장식 */}
      {gradient && (
        <>
          <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-700/25 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] pointer-events-none" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 dark:bg-blue-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-400/10 dark:bg-orange-600/10 rounded-full blur-3xl" />
        </>
      )}

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* 제목 */}
          <div className="space-y-4">
            {title}
          </div>

          {/* 부제목 */}
          {subtitle && (
            <div className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              {subtitle}
            </div>
          )}

          {/* 액션 버튼 */}
          {actions && (
            <div className="flex flex-wrap gap-4 justify-center pt-6">
              {actions}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
