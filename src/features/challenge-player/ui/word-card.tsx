"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/shared/lib/cn";
import type { WordItem } from "@/entities/challenge";

interface WordCardProps {
  word: WordItem | null;
  isActive: boolean;
  className?: string;
}

export function WordCard({ word, isActive, className }: WordCardProps) {
  return (
    <div
      className={cn(
        "relative w-full max-w-md aspect-square",
        "flex items-center justify-center",
        className
      )}
    >
      <AnimatePresence mode="wait">
        {word && isActive ? (
          <motion.div
            key={word.id}
            initial={{ scale: 0, rotate: -15, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0.8, rotate: 15, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 20,
            }}
            className={cn(
              "relative w-full h-full",
              "rounded-3xl border-4 border-[var(--border-dark)]",
              "bg-white shadow-[8px_8px_0px_var(--border-dark)]",
              "flex flex-col items-center justify-center p-8",
              "overflow-hidden"
            )}
          >
            {/* 이미지 */}
            {word.imageUrl ? (
              <div className="relative w-48 h-48 mb-4">
                <motion.img
                  src={word.imageUrl}
                  alt={word.text}
                  className="w-full h-full object-contain"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, duration: 0.2 }}
                />
              </div>
            ) : (
              // 텍스트만 있는 경우 큰 이모지나 아이콘
              <motion.div
                className="text-8xl mb-4"
                initial={{ scale: 0.8 }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.3 }}
              >
                ❓
              </motion.div>
            )}

            {/* 단어 텍스트 */}
            <motion.p
              className="text-4xl font-bold text-center text-[var(--border-dark)]"
              style={{ fontFamily: "var(--font-gaegu), cursive" }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.2 }}
            >
              {word.text}
            </motion.p>

            {/* 장식 요소 */}
            <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-[var(--playful-yellow)] border-2 border-[var(--border-dark)] opacity-50" />
            <div className="absolute bottom-4 right-4 w-6 h-6 rounded-full bg-[var(--playful-pink)] border-2 border-[var(--border-dark)] opacity-50" />
          </motion.div>
        ) : (
          // 대기 상태
          <motion.div
            key="waiting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={cn(
              "w-full h-full",
              "rounded-3xl border-4 border-dashed border-[var(--border-dark)]/30",
              "bg-white/50",
              "flex items-center justify-center"
            )}
          >
            <motion.p
              className="text-2xl text-[var(--border-dark)]/40"
              style={{ fontFamily: "var(--font-gaegu), cursive" }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              비트를 기다려요...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// 히트 피드백 오버레이
interface HitFeedbackProps {
  timing: "perfect" | "good" | "miss" | null;
}

export function HitFeedback({ timing }: HitFeedbackProps) {
  if (!timing) return null;

  const config = {
    perfect: {
      text: "PERFECT!",
      color: "var(--playful-yellow)",
      emoji: "⭐",
    },
    good: {
      text: "GOOD!",
      color: "var(--playful-mint)",
      emoji: "👍",
    },
    miss: {
      text: "MISS",
      color: "var(--playful-coral)",
      emoji: "💨",
    },
  };

  const { text, color, emoji } = config[timing];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 1.5, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
      >
        <div
          className={cn(
            "px-8 py-4 rounded-2xl",
            "border-4 border-[var(--border-dark)]",
            "shadow-[6px_6px_0px_var(--border-dark)]"
          )}
          style={{ backgroundColor: color }}
        >
          <p
            className="text-4xl font-bold text-[var(--border-dark)]"
            style={{ fontFamily: "var(--font-gaegu), cursive" }}
          >
            {emoji} {text}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
