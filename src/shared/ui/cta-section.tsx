import * as React from "react";
import { cn } from "@/shared/lib/cn";

interface CTASectionProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  description?: string;
  actions: React.ReactNode;
  variant?: "default" | "gradient";
}

/**
 * CTA (Call-to-Action) Section 컴포넌트
 * 사용자 액션을 유도하는 섹션
 */
export function CTASection({
  title,
  description,
  actions,
  variant = "default",
  className,
  ...props
}: CTASectionProps) {
  return (
    <section
      className={cn(
        "py-16",
        variant === "gradient" && "bg-gradient-to-r from-blue-600 to-orange-500 text-white",
        variant === "default" && "bg-muted/30",
        className
      )}
      {...props}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2
            className={cn(
              "text-3xl md:text-4xl font-bold",
              variant === "gradient" && "text-white"
            )}
            style={{
              wordBreak: 'keep-all',
              whiteSpace: 'normal',
              writingMode: 'horizontal-tb',
              display: 'block',
              width: '100%',
              minWidth: '300px'
            }}
          >
            {title}
          </h2>

          {description && (
            <div
              className={cn(
                "text-lg",
                variant === "gradient" ? "text-white/90" : "text-muted-foreground"
              )}
            >
              {description}
            </div>
          )}

          <div className="flex flex-wrap gap-4 justify-center pt-4">
            {actions}
          </div>
        </div>
      </div>
    </section>
  );
}
