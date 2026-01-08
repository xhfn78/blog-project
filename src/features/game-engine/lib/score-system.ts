/**
 * BeatOnWord 점수 시스템
 */

import type { HitTiming, Grade, GameResult } from "@/entities/challenge";

// 점수 설정
export const SCORE_CONFIG = {
  perfect: {
    points: 100,
    comboMultiplier: 1.5,
    timingWindow: 50, // +/- 50ms
  },
  good: {
    points: 50,
    comboMultiplier: 1.2,
    timingWindow: 150, // +/- 150ms
  },
  miss: {
    points: 0,
    comboMultiplier: 0,
    timingWindow: Infinity,
  },
} as const;

// 등급 기준 (정확도 기준)
export const GRADE_THRESHOLDS = {
  S: 95,
  A: 85,
  B: 70,
  C: 50,
  D: 30,
  F: 0,
} as const;

/**
 * 타이밍에 따른 히트 판정
 */
export function judgeHitTiming(timingDiff: number): HitTiming {
  const absDiff = Math.abs(timingDiff);

  if (absDiff <= SCORE_CONFIG.perfect.timingWindow) {
    return "perfect";
  } else if (absDiff <= SCORE_CONFIG.good.timingWindow) {
    return "good";
  } else {
    return "miss";
  }
}

/**
 * 점수 계산
 */
export function calculateScore(
  timing: HitTiming,
  currentCombo: number
): { points: number; newCombo: number } {
  const config = SCORE_CONFIG[timing];

  if (timing === "miss") {
    return { points: 0, newCombo: 0 };
  }

  // 콤보 보너스 (10콤보마다 10% 추가)
  const comboBonus = Math.floor(currentCombo / 10) * 0.1;
  const multiplier = config.comboMultiplier + comboBonus;
  const points = Math.round(config.points * multiplier);

  return {
    points,
    newCombo: currentCombo + 1,
  };
}

/**
 * 정확도 계산
 */
export function calculateAccuracy(
  perfectCount: number,
  goodCount: number,
  missCount: number
): number {
  const total = perfectCount + goodCount + missCount;
  if (total === 0) return 0;

  // Perfect = 100%, Good = 50%, Miss = 0%
  const score = perfectCount * 1 + goodCount * 0.5 + missCount * 0;
  return Math.round((score / total) * 100);
}

/**
 * 등급 계산
 */
export function calculateGrade(accuracy: number): Grade {
  if (accuracy >= GRADE_THRESHOLDS.S) return "S";
  if (accuracy >= GRADE_THRESHOLDS.A) return "A";
  if (accuracy >= GRADE_THRESHOLDS.B) return "B";
  if (accuracy >= GRADE_THRESHOLDS.C) return "C";
  if (accuracy >= GRADE_THRESHOLDS.D) return "D";
  return "F";
}

/**
 * 최종 결과 계산
 */
export function calculateFinalResult(
  challengeId: string,
  score: number,
  maxCombo: number,
  perfectCount: number,
  goodCount: number,
  missCount: number
): GameResult {
  const accuracy = calculateAccuracy(perfectCount, goodCount, missCount);
  const grade = calculateGrade(accuracy);

  return {
    challengeId,
    totalScore: score,
    grade,
    accuracy,
    maxCombo,
    perfectCount,
    goodCount,
    missCount,
    playedAt: new Date(),
  };
}

/**
 * 등급별 메시지
 */
export function getGradeMessage(grade: Grade): string {
  const messages: Record<Grade, string> = {
    S: "완벽해요! 🌟",
    A: "대단해요! 👏",
    B: "잘했어요! 😊",
    C: "괜찮아요! 💪",
    D: "조금만 더! 🔥",
    F: "다시 도전! 🎯",
  };
  return messages[grade];
}

/**
 * 등급별 색상
 */
export function getGradeColor(grade: Grade): string {
  const colors: Record<Grade, string> = {
    S: "var(--playful-yellow)",
    A: "var(--playful-mint)",
    B: "var(--playful-blue)",
    C: "var(--playful-purple)",
    D: "var(--playful-orange)",
    F: "var(--playful-coral)",
  };
  return colors[grade];
}
