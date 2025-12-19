import * as React from "react";
import { cn } from "@/shared/lib/cn";
import { Card } from "./card";

interface FeatureCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  description: string;
}

/**
 * Feature Card 컴포넌트
 * 주요 기능이나 특징을 설명하는 카드
 */
export function FeatureCard({
  icon,
  title,
  description,
  className,
  ...props
}: FeatureCardProps) {
  return (
    <Card
      className={cn(
        "p-6 transition-all hover:shadow-lg hover:-translate-y-1",
        "border-2 hover:border-primary/50",
        className
      )}
      {...props}
    >
      {icon && (
        <div className="mb-4 text-primary">
          {icon}
        </div>
      )}
      <h3 className="text-xl font-semibold mb-2 break-keep">{title}</h3>
      <div className="text-muted-foreground leading-relaxed break-keep">
        {description}
      </div>
    </Card>
  );
}
