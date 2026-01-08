"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/shared/lib/cn";
import { forwardRef } from "react";

export interface WobblyButtonProps extends Omit<HTMLMotionProps<"button">, "color"> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "success" | "danger" | "ghost";
  size?: "sm" | "md" | "lg" | "xl";
  color?: string;
  wobble?: boolean;
  className?: string;
  disabled?: boolean;
}

const VARIANT_COLORS = {
  primary: "var(--playful-pink)",
  secondary: "var(--playful-blue)",
  success: "var(--playful-mint)",
  danger: "var(--playful-coral)",
  ghost: "transparent",
};

const SIZE_CLASSES = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
  xl: "px-8 py-4 text-xl",
};

export const WobblyButton = forwardRef<HTMLButtonElement, WobblyButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      color,
      wobble = true,
      className,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const bgColor = color || VARIANT_COLORS[variant];
    const isGhost = variant === "ghost";

    return (
      <motion.button
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center gap-2",
          "rounded-xl font-bold",
          "border-3 border-[var(--border-dark)]",
          !isGhost && "shadow-[4px_4px_0px_var(--border-dark)]",
          "transition-all duration-150",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          SIZE_CLASSES[size],
          className
        )}
        style={{
          backgroundColor: bgColor,
          fontFamily: "var(--font-gaegu), cursive",
        }}
        whileHover={
          !disabled
            ? {
                scale: 1.02,
                rotate: wobble ? [0, -2, 2, -2, 0] : 0,
                boxShadow: isGhost
                  ? undefined
                  : "6px 6px 0px var(--border-dark)",
              }
            : undefined
        }
        whileTap={
          !disabled
            ? {
                scale: 0.98,
                boxShadow: isGhost
                  ? undefined
                  : "2px 2px 0px var(--border-dark)",
                x: 2,
                y: 2,
              }
            : undefined
        }
        transition={{
          rotate: { duration: 0.4 },
        }}
        disabled={disabled}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

WobblyButton.displayName = "WobblyButton";

// 아이콘 버튼 변형
export function WobblyIconButton({
  icon,
  label,
  ...props
}: WobblyButtonProps & { icon: React.ReactNode; label?: string }) {
  return (
    <WobblyButton {...props}>
      <span className="text-xl">{icon}</span>
      {label && <span>{label}</span>}
    </WobblyButton>
  );
}

// 플레이 버튼 프리셋
export function PlayButton({ onClick, ...props }: Omit<WobblyButtonProps, "children">) {
  return (
    <WobblyButton
      variant="success"
      size="xl"
      onClick={onClick}
      {...props}
    >
      <span className="text-2xl">▶️</span>
      <span>게임 시작!</span>
    </WobblyButton>
  );
}

// 만들기 버튼 프리셋
export function CreateButton({ onClick, ...props }: Omit<WobblyButtonProps, "children">) {
  return (
    <WobblyButton
      variant="secondary"
      size="lg"
      onClick={onClick}
      {...props}
    >
      <span className="text-xl">✨</span>
      <span>챌린지 만들기</span>
    </WobblyButton>
  );
}
