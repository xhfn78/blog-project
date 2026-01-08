"use client";

import { motion } from "framer-motion";
import { cn } from "@/shared/lib/cn";

interface ScoreDisplayProps {
  score: number;
  combo: number;
  maxCombo: number;
  className?: string;
}

export function ScoreDisplay({ score, combo, maxCombo, className }: ScoreDisplayProps) {
  return (
    <div className={cn("flex items-center gap-6", className)}>
      {/* 점수 */}
      <div className="flex flex-col items-center">
        <p
          className="text-sm text-[var(--border-dark)]/60"
          style={{ fontFamily: "var(--font-gaegu), cursive" }}
        >
          점수
        </p>
        <motion.p
          key={score}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          className="text-3xl font-bold text-[var(--border-dark)]"
          style={{ fontFamily: "var(--font-gaegu), cursive" }}
        >
          {score.toLocaleString()}
        </motion.p>
      </div>

      {/* 콤보 */}
      <ComboCounter combo={combo} />
    </div>
  );
}

interface ComboCounterProps {
  combo: number;
}

export function ComboCounter({ combo }: ComboCounterProps) {
  const isHighCombo = combo >= 10;
  const isSuperCombo = combo >= 20;

  return (
    <motion.div
      className={cn(
        "relative px-6 py-3 rounded-2xl",
        "border-3 border-[var(--border-dark)]",
        "shadow-[4px_4px_0px_var(--border-dark)]",
        isSuperCombo
          ? "bg-[var(--playful-yellow)]"
          : isHighCombo
          ? "bg-[var(--playful-mint)]"
          : "bg-white"
      )}
      animate={
        combo > 0
          ? {
              scale: [1, 1.1, 1],
              rotate: isHighCombo ? [0, -3, 3, 0] : 0,
            }
          : {}
      }
      transition={{ duration: 0.2 }}
    >
      <p
        className="text-sm text-[var(--border-dark)]/60 text-center"
        style={{ fontFamily: "var(--font-gaegu), cursive" }}
      >
        콤보
      </p>
      <motion.p
        key={combo}
        initial={{ scale: 1.3, y: -5 }}
        animate={{ scale: 1, y: 0 }}
        className="text-4xl font-bold text-center text-[var(--border-dark)]"
        style={{ fontFamily: "var(--font-gaegu), cursive" }}
      >
        {combo}
      </motion.p>

      {/* 콤보 불꽃 효과 */}
      {isHighCombo && (
        <motion.span
          className="absolute -top-2 -right-2 text-2xl"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          🔥
        </motion.span>
      )}
    </motion.div>
  );
}

// 미니 점수 표시 (게임 중 작은 버전)
interface MiniScoreProps {
  score: number;
  combo: number;
}

export function MiniScore({ score, combo }: MiniScoreProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 px-4 py-2",
        "rounded-xl bg-white/80 backdrop-blur-sm",
        "border-2 border-[var(--border-dark)]",
        "shadow-[2px_2px_0px_var(--border-dark)]"
      )}
    >
      <div className="flex items-center gap-1">
        <span className="text-lg">💎</span>
        <span
          className="font-bold text-[var(--border-dark)]"
          style={{ fontFamily: "var(--font-gaegu), cursive" }}
        >
          {score.toLocaleString()}
        </span>
      </div>

      {combo > 0 && (
        <div className="flex items-center gap-1">
          <span className="text-lg">🔥</span>
          <span
            className="font-bold text-[var(--playful-orange)]"
            style={{ fontFamily: "var(--font-gaegu), cursive" }}
          >
            x{combo}
          </span>
        </div>
      )}
    </div>
  );
}
