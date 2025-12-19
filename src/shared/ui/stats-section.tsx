import * as React from "react";
import { cn } from "@/shared/lib/cn";

interface Stat {
  value: string | number;
  label: string;
  description?: string;
}

interface StatsSectionProps extends React.HTMLAttributes<HTMLElement> {
  stats: Stat[];
  title?: string;
  subtitle?: React.ReactNode;
}

/**
 * Stats Section 컴포넌트
 * 통계 및 신뢰도를 표시하는 섹션
 */
export function StatsSection({
  stats,
  title,
  subtitle,
  className,
  ...props
}: StatsSectionProps) {
  return (
    <section
      className={cn(
        "py-16 bg-muted/30",
        className
      )}
      {...props}
    >
      <div className="container mx-auto px-4">
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && (
              <h2
                className="mb-4"
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <div className="text-muted-foreground text-lg max-w-2xl mx-auto">
                {subtitle}
              </div>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-2 break-keep">
                {stat.value}
              </div>
              <div className="text-sm md:text-base font-semibold mb-1 break-keep">
                {stat.label}
              </div>
              {stat.description && (
                <div className="text-xs md:text-sm text-muted-foreground break-keep">
                  {stat.description}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
