"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/shared/lib/cn";
import { forwardRef, useState, useEffect } from "react";

export interface PlayfulCardProps extends Omit<HTMLMotionProps<"div">, "color"> {
  children: React.ReactNode;
  color?: string;
  rotation?: number;
  className?: string;
  hoverEffect?: boolean;
  clickEffect?: boolean;
}

export const PlayfulCard = forwardRef<HTMLDivElement, PlayfulCardProps>(
  (
    {
      children,
      color = "var(--playful-yellow)",
      rotation,
      className,
      hoverEffect = true,
      clickEffect = true,
      ...props
    },
    ref
  ) => {
    // Hydration 오류 방지: 클라이언트에서만 랜덤 회전 적용
    const [clientRotation, setClientRotation] = useState(rotation ?? 0);

    useEffect(() => {
      // rotation prop이 없을 때만 랜덤 값 생성
      if (rotation === undefined) {
        setClientRotation(Math.random() * 6 - 3);
      }
    }, [rotation]);

    return (
      <motion.div
        ref={ref}
        className={cn(
          "relative rounded-2xl border-4 border-[var(--border-dark)]",
          "shadow-[4px_4px_0px_var(--border-dark)]",
          "transition-all cursor-pointer overflow-hidden",
          hoverEffect && "hover:shadow-[6px_6px_0px_var(--border-dark)] hover:-translate-y-1",
          className
        )}
        style={{
          backgroundColor: color,
          rotate: `${clientRotation}deg`,
        }}
        whileHover={
          hoverEffect
            ? {
                rotate: 0,
                scale: 1.02,
              }
            : undefined
        }
        whileTap={clickEffect ? { scale: 0.98 } : undefined}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

PlayfulCard.displayName = "PlayfulCard";

// 카테고리별 색상 매핑
export const CATEGORY_COLORS: Record<string, string> = {
  numbers: "var(--playful-yellow)",
  colors: "var(--playful-pink)",
  animals: "var(--playful-mint)",
  food: "var(--playful-orange)",
  rhymes: "var(--playful-purple)",
  custom: "var(--playful-blue)",
};

// 카테고리 색상 가져오기 헬퍼
export function getCategoryColor(category: string): string {
  return CATEGORY_COLORS[category] || CATEGORY_COLORS.custom;
}
