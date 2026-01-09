"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlayfulCard } from "@/shared/ui/playful-card";

interface AnalyzingLoaderProps {
  onComplete: () => void;
}

const STEPS = [
  { text: "얼굴 랜드마크를 추출하고 있어요...", duration: 1500, emoji: "🔍" },
  { text: "눈썹에서 재물운을 읽고 있어요...", duration: 1200, emoji: "💰" },
  { text: "눈에서 감성과 통찰력을 분석해요...", duration: 1000, emoji: "👁️" },
  { text: "코에서 건강운을 확인하고 있어요...", duration: 1000, emoji: "🎯" },
  { text: "입에서 대인운을 파악하고 있어요...", duration: 1000, emoji: "💬" },
  { text: "2026년 운세를 계산하고 있어요...", duration: 1500, emoji: "🔮" },
];

export function AnalyzingLoader({ onComplete }: AnalyzingLoaderProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (currentStep >= STEPS.length) {
      // 모든 단계 완료
      setTimeout(onComplete, 500);
      return;
    }

    const step = STEPS[currentStep];
    const timer = setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
      setProgress(((currentStep + 1) / STEPS.length) * 100);
    }, step.duration);

    return () => clearTimeout(timer);
  }, [currentStep, onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <PlayfulCard color="white" className="p-8">
            {/* 로딩 애니메이션 */}
            <div className="relative w-32 h-32 mx-auto mb-8">
              <motion.div
                animate={{
                  rotate: 360,
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                  scale: { duration: 1, repeat: Infinity },
                }}
                className="absolute inset-0 rounded-full border-8 border-purple-200 border-t-purple-600"
              />
              <motion.div
                animate={{
                  rotate: -360,
                  scale: [1, 0.9, 1],
                }}
                transition={{
                  rotate: { duration: 1.5, repeat: Infinity, ease: "linear" },
                  scale: { duration: 1.2, repeat: Infinity },
                }}
                className="absolute inset-4 rounded-full border-8 border-pink-200 border-t-pink-600"
              />

              {/* 중앙 이모지 */}
              <div className="absolute inset-0 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {currentStep < STEPS.length && (
                    <motion.span
                      key={currentStep}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180 }}
                      className="text-4xl"
                    >
                      {STEPS[currentStep].emoji}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* 진행 상태 텍스트 */}
            <AnimatePresence mode="wait">
              {currentStep < STEPS.length && (
                <motion.p
                  key={currentStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-xl text-center text-[var(--border-dark)] mb-6"
                  style={{ fontFamily: "var(--font-gaegu), cursive" }}
                >
                  {STEPS[currentStep].text}
                </motion.p>
              )}
            </AnimatePresence>

            {/* 프로그레스 바 */}
            <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden border-3 border-[var(--border-dark)]">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>

            {/* 퍼센트 */}
            <motion.p
              className="text-center text-2xl font-bold text-[var(--border-dark)] mt-4"
              style={{ fontFamily: "var(--font-gaegu), cursive" }}
            >
              {Math.round(progress)}%
            </motion.p>

            {/* 안내 */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-center text-sm text-[var(--border-dark)]/60 mt-6"
              style={{ fontFamily: "var(--font-gaegu), cursive" }}
            >
              AI가 당신의 얼굴을 정밀 분석하고 있습니다...
            </motion.p>
          </PlayfulCard>
        </motion.div>
      </div>
    </div>
  );
}
