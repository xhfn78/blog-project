"use client";

import { motion } from "framer-motion";
import { cn } from "@/shared/lib/cn";

export type BadgeVariant = "numbers" | "colors" | "animals" | "food" | "rhymes" | "custom" | "difficulty";
export type DifficultyLevel = "easy" | "medium" | "hard";

interface StickerBadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  difficulty?: DifficultyLevel;
  className?: string;
  animate?: boolean;
  size?: "sm" | "md" | "lg";
}

const VARIANT_COLORS: Record<BadgeVariant, string> = {
  numbers: "var(--playful-yellow)",
  colors: "var(--playful-pink)",
  animals: "var(--playful-mint)",
  food: "var(--playful-orange)",
  rhymes: "var(--playful-purple)",
  custom: "var(--playful-blue)",
  difficulty: "var(--playful-coral)",
};

const DIFFICULTY_COLORS: Record<DifficultyLevel, string> = {
  easy: "var(--playful-mint)",
  medium: "var(--playful-yellow)",
  hard: "var(--playful-coral)",
};

const DIFFICULTY_LABELS: Record<DifficultyLevel, string> = {
  easy: "쉬움",
  medium: "보통",
  hard: "어려움",
};

const SIZE_CLASSES = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
  lg: "px-4 py-1.5 text-base",
};

export function StickerBadge({
  children,
  variant = "custom",
  difficulty,
  className,
  animate = true,
  size = "md",
}: StickerBadgeProps) {
  const bgColor = difficulty ? DIFFICULTY_COLORS[difficulty] : VARIANT_COLORS[variant];
  const displayText = difficulty ? DIFFICULTY_LABELS[difficulty] : children;

  const badgeContent = (
    <span
      className={cn(
        "inline-flex items-center justify-center",
        "rounded-lg border-2 border-[var(--border-dark)]",
        "shadow-[2px_2px_0px_var(--border-dark)]",
        "font-bold",
        SIZE_CLASSES[size],
        className
      )}
      style={{
        backgroundColor: bgColor,
        fontFamily: "var(--font-gaegu), cursive",
      }}
    >
      {displayText}
    </span>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 15,
        }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        className="inline-block"
      >
        {badgeContent}
      </motion.div>
    );
  }

  return badgeContent;
}

// 카테고리 뱃지 프리셋
export function CategoryBadge({ category }: { category: BadgeVariant }) {
  const CATEGORY_LABELS: Record<BadgeVariant, string> = {
    numbers: "숫자",
    colors: "색상",
    animals: "동물",
    food: "음식",
    rhymes: "운율",
    custom: "커스텀",
    difficulty: "난이도",
  };

  const CATEGORY_ICONS: Record<BadgeVariant, string> = {
    numbers: "🔢",
    colors: "🎨",
    animals: "🐾",
    food: "🍎",
    rhymes: "🎤",
    custom: "✨",
    difficulty: "⭐",
  };

  return (
    <StickerBadge variant={category}>
      {CATEGORY_ICONS[category]} {CATEGORY_LABELS[category]}
    </StickerBadge>
  );
}

// 난이도 뱃지 프리셋
export function DifficultyBadge({ level }: { level: DifficultyLevel }) {
  const DIFFICULTY_ICONS: Record<DifficultyLevel, string> = {
    easy: "⭐",
    medium: "⭐⭐",
    hard: "⭐⭐⭐",
  };

  return (
    <StickerBadge difficulty={level}>
      {DIFFICULTY_ICONS[level]}
    </StickerBadge>
  );
}
