"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/shared/lib/cn";
import { TOTAL_STAGES, type StageConfig } from "@/features/game-engine/lib/stage-config";

interface StageDisplayProps {
  currentStage: number;
  stageConfig: StageConfig | null;
  isTransition: boolean;
  wordsCompleted: number;
  totalWords: number;
}

export function StageDisplay({
  currentStage,
  stageConfig,
  isTransition,
  wordsCompleted,
  totalWords,
}: StageDisplayProps) {
  if (!stageConfig) return null;

  return (
    <div className="w-full max-w-md mx-auto">
      {/* 스테이지 인디케이터 */}
      <div className="flex items-center justify-center gap-2 mb-4">
        {Array.from({ length: TOTAL_STAGES }).map((_, i) => (
          <motion.div
            key={i}
            className={cn(
              "w-8 h-8 rounded-full border-3 border-[var(--border-dark)] flex items-center justify-center",
              "font-bold text-sm"
            )}
            style={{
              backgroundColor: i < currentStage ? stageConfig.color : "white",
              opacity: i < currentStage ? 1 : 0.5,
            }}
            animate={{
              scale: i + 1 === currentStage ? [1, 1.1, 1] : 1,
            }}
            transition={{
              duration: 0.5,
              repeat: i + 1 === currentStage ? Infinity : 0,
              repeatType: "reverse",
            }}
          >
            <span style={{ fontFamily: "var(--font-gaegu), cursive" }}>
              {i + 1}
            </span>
          </motion.div>
        ))}
      </div>

      {/* 스테이지 정보 */}
      <motion.div
        key={currentStage}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "px-4 py-2 rounded-xl border-3 border-[var(--border-dark)]",
          "shadow-[3px_3px_0px_var(--border-dark)]"
        )}
        style={{ backgroundColor: stageConfig.color }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p
              className="font-bold text-lg text-[var(--border-dark)]"
              style={{ fontFamily: "var(--font-gaegu), cursive" }}
            >
              Stage {currentStage}: {stageConfig.name}
            </p>
            <p
              className="text-sm text-[var(--border-dark)]/70"
              style={{ fontFamily: "var(--font-gaegu), cursive" }}
            >
              🎵 {stageConfig.bpm} BPM
            </p>
          </div>

          {/* 진행률 */}
          <div className="text-right">
            <p
              className="font-bold text-[var(--border-dark)]"
              style={{ fontFamily: "var(--font-gaegu), cursive" }}
            >
              {wordsCompleted}/{totalWords}
            </p>
          </div>
        </div>

        {/* 진행바 */}
        <div className="mt-2 h-2 bg-white/50 rounded-full border border-[var(--border-dark)]">
          <motion.div
            className="h-full bg-[var(--border-dark)] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(wordsCompleted / totalWords) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>
    </div>
  );
}

// 스테이지 전환 오버레이
interface StageTransitionProps {
  isActive: boolean;
  nextStage: number;
  nextStageConfig: StageConfig | null;
}

export function StageTransition({
  isActive,
  nextStage,
  nextStageConfig,
}: StageTransitionProps) {
  return (
    <AnimatePresence>
      {isActive && nextStageConfig && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
        >
          <motion.div
            initial={{ scale: 0.5, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 1.5, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={cn(
              "p-8 rounded-3xl border-4 border-[var(--border-dark)]",
              "shadow-[8px_8px_0px_var(--border-dark)]"
            )}
            style={{ backgroundColor: nextStageConfig.color }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <p
                className="text-2xl text-[var(--border-dark)]/70 mb-2"
                style={{ fontFamily: "var(--font-gaegu), cursive" }}
              >
                다음 스테이지!
              </p>
              <p
                className="text-5xl font-bold text-[var(--border-dark)] mb-2"
                style={{ fontFamily: "var(--font-gaegu), cursive" }}
              >
                Stage {nextStage}
              </p>
              <p
                className="text-3xl font-bold text-[var(--border-dark)] mb-4"
                style={{ fontFamily: "var(--font-gaegu), cursive" }}
              >
                {nextStageConfig.name}
              </p>
              <p
                className="text-xl text-[var(--border-dark)]/80"
                style={{ fontFamily: "var(--font-gaegu), cursive" }}
              >
                🎵 {nextStageConfig.bpm} BPM
              </p>
              <p
                className="text-lg text-[var(--border-dark)]/60 mt-2"
                style={{ fontFamily: "var(--font-gaegu), cursive" }}
              >
                {nextStageConfig.description}
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// BPM 표시
interface BpmDisplayProps {
  bpm: number;
  className?: string;
}

export function BpmDisplay({ bpm, className }: BpmDisplayProps) {
  return (
    <motion.div
      key={bpm}
      initial={{ scale: 1.2 }}
      animate={{ scale: 1 }}
      className={cn(
        "px-3 py-1 rounded-full border-2 border-[var(--border-dark)]",
        "bg-[var(--playful-yellow)]",
        className
      )}
    >
      <span
        className="font-bold text-sm text-[var(--border-dark)]"
        style={{ fontFamily: "var(--font-gaegu), cursive" }}
      >
        🎵 {bpm} BPM
      </span>
    </motion.div>
  );
}
