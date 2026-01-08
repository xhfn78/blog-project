"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/shared/lib/cn";

interface CountdownProps {
  isActive: boolean;
  duration?: number;
  onComplete: () => void;
  className?: string;
}

export function Countdown({
  isActive,
  duration = 3,
  onComplete,
  className,
}: CountdownProps) {
  const [count, setCount] = useState(duration);

  useEffect(() => {
    if (!isActive) {
      setCount(duration);
      return;
    }

    if (count === 0) {
      onComplete();
      return;
    }

    const timer = setTimeout(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isActive, count, duration, onComplete]);

  // 활성화되지 않으면 렌더링 안함
  if (!isActive) return null;

  const colors = ["var(--playful-coral)", "var(--playful-yellow)", "var(--playful-mint)"];
  const currentColor = colors[count - 1] || "var(--playful-pink)";

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center",
        "bg-black/50 backdrop-blur-sm",
        className
      )}
    >
      <AnimatePresence mode="wait">
        {count > 0 ? (
          <motion.div
            key={count}
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 2, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 15,
            }}
            className={cn(
              "w-40 h-40 rounded-full",
              "border-8 border-[var(--border-dark)]",
              "shadow-[8px_8px_0px_var(--border-dark)]",
              "flex items-center justify-center"
            )}
            style={{ backgroundColor: currentColor }}
          >
            <motion.span
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              className="text-7xl font-bold text-[var(--border-dark)]"
              style={{ fontFamily: "var(--font-gloria), cursive" }}
            >
              {count}
            </motion.span>
          </motion.div>
        ) : (
          <motion.div
            key="go"
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 2, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 15,
            }}
            className={cn(
              "px-12 py-6 rounded-3xl",
              "border-8 border-[var(--border-dark)]",
              "shadow-[8px_8px_0px_var(--border-dark)]",
              "bg-[var(--playful-pink)]"
            )}
          >
            <motion.span
              initial={{ scale: 0.5 }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.3 }}
              className="text-6xl font-bold text-[var(--border-dark)]"
              style={{ fontFamily: "var(--font-gloria), cursive" }}
            >
              GO!
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// 간단한 인라인 카운트다운
interface InlineCountdownProps {
  count: number;
}

export function InlineCountdown({ count }: InlineCountdownProps) {
  return (
    <motion.div
      key={count}
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 1.5, opacity: 0 }}
      className="text-8xl font-bold text-center"
      style={{
        fontFamily: "var(--font-gloria), cursive",
        color: "var(--playful-pink)",
        textShadow: "4px 4px 0px var(--border-dark)",
      }}
    >
      {count}
    </motion.div>
  );
}
