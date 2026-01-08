/**
 * 게임 관련 커스텀 훅
 */

import { useCallback, useEffect, useRef } from "react";
import { useGameStore } from "../store/game-store";
import type { Challenge, HitTiming } from "@/entities/challenge";

/**
 * 게임 초기화 및 제어 훅
 */
export function useGame(challenge?: Challenge) {
  const {
    status,
    score,
    combo,
    maxCombo,
    currentWord,
    currentBeatIndex,
    initGame,
    startCountdown,
    startGame,
    pauseGame,
    resumeGame,
    endGame,
    resetGame,
    recordHit,
    getResult,
  } = useGameStore();

  // 챌린지가 변경되면 초기화
  useEffect(() => {
    if (challenge) {
      initGame(challenge).catch(console.error);
    }

    return () => {
      resetGame();
    };
  }, [challenge?.id]);

  // 카운트다운 후 게임 시작
  const startWithCountdown = useCallback(() => {
    startCountdown();

    // 3초 카운트다운
    setTimeout(() => {
      startGame();
    }, 3000);
  }, [startCountdown, startGame]);

  return {
    // 상태
    status,
    score,
    combo,
    maxCombo,
    currentWord,
    currentBeatIndex,
    isPlaying: status === "playing",
    isPaused: status === "paused",
    isFinished: status === "finished",
    isCountdown: status === "countdown",

    // 액션
    startWithCountdown,
    startGame,
    pauseGame,
    resumeGame,
    endGame,
    resetGame,
    recordHit,

    // 결과
    getResult,
  };
}

/**
 * 카운트다운 훅
 */
export function useCountdown(
  isActive: boolean,
  duration: number = 3,
  onComplete: () => void
) {
  const countRef = useRef(duration);
  const [count, setCount] = useState(duration);

  useEffect(() => {
    if (!isActive) {
      countRef.current = duration;
      setCount(duration);
      return;
    }

    const interval = setInterval(() => {
      countRef.current -= 1;
      setCount(countRef.current);

      if (countRef.current <= 0) {
        clearInterval(interval);
        onComplete();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, duration, onComplete]);

  return count;
}

// useState import 추가 필요
import { useState } from "react";

/**
 * 히트 피드백 훅
 */
export function useHitFeedback() {
  const [lastHit, setLastHit] = useState<{
    timing: HitTiming;
    timestamp: number;
  } | null>(null);

  const showFeedback = useCallback((timing: HitTiming) => {
    setLastHit({ timing, timestamp: Date.now() });

    // 0.5초 후 피드백 제거
    setTimeout(() => {
      setLastHit(null);
    }, 500);
  }, []);

  return {
    lastHit,
    showFeedback,
    isPerfect: lastHit?.timing === "perfect",
    isGood: lastHit?.timing === "good",
    isMiss: lastHit?.timing === "miss",
  };
}

/**
 * 키보드 입력 훅
 */
export function useGameInput(onInput: () => void, enabled: boolean = true) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // 스페이스바 또는 엔터키
      if (e.code === "Space" || e.code === "Enter") {
        e.preventDefault();
        onInput();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onInput, enabled]);
}

/**
 * 터치 입력 훅
 */
export function useTouchInput(onInput: () => void, enabled: boolean = true) {
  const handleTouch = useCallback(
    (e: React.TouchEvent | React.MouseEvent) => {
      if (!enabled) return;
      e.preventDefault();
      onInput();
    },
    [onInput, enabled]
  );

  return {
    onTouchStart: handleTouch,
    onClick: handleTouch,
  };
}
