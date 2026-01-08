"use client";

import { motion } from "framer-motion";
import { cn } from "@/shared/lib/cn";
import type { GameResult, Grade } from "@/entities/challenge";
import { getGradeMessage, getGradeColor } from "@/features/game-engine";
import { WobblyButton } from "@/shared/ui/wobbly-button";
import { Confetti } from "@/shared/ui/confetti";
import { ShareButton } from "@/features/community";

interface ResultScreenProps {
  result: GameResult;
  challengeId?: string;
  challengeTitle?: string;
  onReplay: () => void;
  onBack: () => void;
  className?: string;
}

export function ResultScreen({
  result,
  challengeId,
  challengeTitle,
  onReplay,
  onBack,
  className,
}: ResultScreenProps) {
  const showConfetti = result.grade === "S" || result.grade === "A";

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-4",
        "bg-[var(--bg-playful)]",
        className
      )}
    >
      {/* 컨페티 */}
      <Confetti
        isActive={showConfetti}
        pieceCount={result.grade === "S" ? 100 : 60}
      />

      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className={cn(
          "w-full max-w-md p-8 rounded-3xl",
          "border-4 border-[var(--border-dark)]",
          "shadow-[8px_8px_0px_var(--border-dark)]",
          "bg-white"
        )}
      >
        {/* 등급 */}
        <GradeDisplay grade={result.grade} />

        {/* 메시지 */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl text-center text-[var(--border-dark)] mt-4"
          style={{ fontFamily: "var(--font-gaegu), cursive" }}
        >
          {getGradeMessage(result.grade)}
        </motion.p>

        {/* 점수 통계 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 space-y-3"
        >
          <StatRow label="총점" value={result.totalScore.toLocaleString()} icon="💎" />
          <StatRow label="정확도" value={`${result.accuracy}%`} icon="🎯" />
          <StatRow label="최대 콤보" value={`${result.maxCombo}x`} icon="🔥" />

          <div className="flex justify-between pt-2 border-t-2 border-dashed border-[var(--border-dark)]/20">
            <StatMini label="Perfect" value={result.perfectCount} color="var(--playful-yellow)" />
            <StatMini label="Good" value={result.goodCount} color="var(--playful-mint)" />
            <StatMini label="Miss" value={result.missCount} color="var(--playful-coral)" />
          </div>
        </motion.div>

        {/* 버튼 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 space-y-3"
        >
          <WobblyButton
            variant="success"
            size="lg"
            className="w-full"
            onClick={onReplay}
          >
            🔄 다시 하기
          </WobblyButton>

          {challengeId && challengeTitle && (
            <ShareButton
              result={result}
              challengeId={challengeId}
              challengeTitle={challengeTitle}
              className="w-full"
            />
          )}

          <WobblyButton
            variant="ghost"
            size="md"
            className="w-full"
            onClick={onBack}
          >
            🏠 홈으로
          </WobblyButton>
        </motion.div>
      </motion.div>
    </div>
  );
}

// 등급 표시
interface GradeDisplayProps {
  grade: Grade;
}

function GradeDisplay({ grade }: GradeDisplayProps) {
  const color = getGradeColor(grade);

  return (
    <motion.div
      initial={{ scale: 0, rotate: -20 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className="flex justify-center"
    >
      <div
        className={cn(
          "w-32 h-32 rounded-full",
          "border-6 border-[var(--border-dark)]",
          "shadow-[6px_6px_0px_var(--border-dark)]",
          "flex items-center justify-center"
        )}
        style={{ backgroundColor: color }}
      >
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-6xl font-bold text-[var(--border-dark)]"
          style={{ fontFamily: "var(--font-gloria), cursive" }}
        >
          {grade}
        </motion.span>
      </div>
    </motion.div>
  );
}

// 통계 행
interface StatRowProps {
  label: string;
  value: string;
  icon: string;
}

function StatRow({ label, value, icon }: StatRowProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-xl">{icon}</span>
        <span
          className="text-lg text-[var(--border-dark)]/70"
          style={{ fontFamily: "var(--font-gaegu), cursive" }}
        >
          {label}
        </span>
      </div>
      <span
        className="text-2xl font-bold text-[var(--border-dark)]"
        style={{ fontFamily: "var(--font-gaegu), cursive" }}
      >
        {value}
      </span>
    </div>
  );
}

// 미니 통계
interface StatMiniProps {
  label: string;
  value: number;
  color: string;
}

function StatMini({ label, value, color }: StatMiniProps) {
  return (
    <div className="flex flex-col items-center">
      <span
        className="text-xs text-[var(--border-dark)]/60"
        style={{ fontFamily: "var(--font-gaegu), cursive" }}
      >
        {label}
      </span>
      <span
        className="text-xl font-bold"
        style={{ fontFamily: "var(--font-gaegu), cursive", color }}
      >
        {value}
      </span>
    </div>
  );
}
