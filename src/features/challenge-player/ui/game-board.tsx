"use client";

import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/shared/lib/cn";
import type { Challenge } from "@/entities/challenge";
import { useGameStore } from "@/features/game-engine";
import { getStageConfig, TOTAL_STAGES } from "@/features/game-engine/lib/stage-config";
import { WordCard, HitFeedback } from "./word-card";
import { MiniScore } from "./score-display";
import { Countdown } from "./countdown";
import { ResultScreen } from "./result-screen";
import { StageDisplay, StageTransition } from "./stage-display";
import { BeatIndicatorBar } from "@/shared/ui/beat-pulse";
import { WobblyButton } from "@/shared/ui/wobbly-button";

interface GameBoardProps {
  challenge: Challenge;
  onBack: () => void;
}

export function GameBoard({ challenge, onBack }: GameBoardProps) {
  const {
    status,
    score,
    combo,
    maxCombo,
    currentWord,
    currentBeatIndex,
    currentStage,
    stageConfig,
    stageWords,
    currentWordIndex,
    wordsCompletedInStage,
    isStageTransition,
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

  const [hitFeedback, setHitFeedback] = useState<"perfect" | "good" | "miss" | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // 현재 스테이지의 단어 수
  const currentStageWords = stageWords[currentStage - 1] || [];
  const totalWordsInStage = currentStageWords.length;

  // 챌린지 초기화
  useEffect(() => {
    const init = async () => {
      try {
        await initGame(challenge);
        setIsInitialized(true);
      } catch (error) {
        console.error("Failed to initialize game:", error);
      }
    };
    init();

    return () => {
      resetGame();
    };
  }, [challenge.id]);

  // 카운트다운 완료 핸들러
  const handleCountdownComplete = useCallback(() => {
    startGame();
  }, [startGame]);

  // 히트 처리
  const handleHit = useCallback(() => {
    if (status !== "playing" || !currentWord || isStageTransition) return;

    // 타이밍 판정 (비트 기반)
    const beatPosition = currentBeatIndex % 4;
    const timing = beatPosition === 0 ? "perfect" : beatPosition <= 1 ? "good" : "miss";

    recordHit(timing);
    setHitFeedback(timing);

    // 피드백 제거
    setTimeout(() => {
      setHitFeedback(null);
    }, 500);
  }, [status, currentWord, currentBeatIndex, recordHit, isStageTransition]);

  // 키보드 입력
  useEffect(() => {
    if (status !== "playing") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "Enter") {
        e.preventDefault();
        handleHit();
      }
      if (e.code === "Escape") {
        pauseGame();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [status, handleHit, pauseGame]);

  // 재시작
  const handleReplay = useCallback(async () => {
    resetGame();
    await initGame(challenge);
    startCountdown();
  }, [resetGame, initGame, challenge, startCountdown]);

  // 결과
  const result = getResult();

  // 다음 스테이지 설정
  const nextStageConfig = currentStage < TOTAL_STAGES ? getStageConfig(currentStage + 1) : null;

  // 로딩 상태
  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[var(--bg-playful)]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 rounded-full border-4 border-[var(--playful-pink)] border-t-transparent"
        />
      </div>
    );
  }

  // 결과 화면
  if (status === "finished" && result) {
    return (
      <ResultScreen
        result={result}
        challengeId={challenge.id}
        challengeTitle={challenge.title}
        onReplay={handleReplay}
        onBack={onBack}
      />
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-[var(--bg-playful)]">
      {/* 카운트다운 */}
      <Countdown
        isActive={status === "countdown"}
        onComplete={handleCountdownComplete}
      />

      {/* 스테이지 전환 오버레이 */}
      <StageTransition
        isActive={isStageTransition}
        nextStage={currentStage + 1}
        nextStageConfig={nextStageConfig}
      />

      {/* 일시정지 오버레이 */}
      {status === "paused" && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={cn(
              "p-8 rounded-3xl bg-white",
              "border-4 border-[var(--border-dark)]",
              "shadow-[8px_8px_0px_var(--border-dark)]"
            )}
          >
            <p
              className="text-3xl font-bold text-center mb-6 text-[var(--border-dark)]"
              style={{ fontFamily: "var(--font-gaegu), cursive" }}
            >
              ⏸️ 일시정지
            </p>
            <div className="space-y-3">
              <WobblyButton
                variant="success"
                size="lg"
                className="w-full"
                onClick={resumeGame}
              >
                ▶️ 계속하기
              </WobblyButton>
              <WobblyButton
                variant="danger"
                size="md"
                className="w-full"
                onClick={onBack}
              >
                🏠 나가기
              </WobblyButton>
            </div>
          </motion.div>
        </div>
      )}

      {/* 헤더 */}
      <header className="p-4 flex items-center justify-between">
        <WobblyButton
          variant="ghost"
          size="sm"
          onClick={status === "playing" ? pauseGame : onBack}
        >
          {status === "playing" ? "⏸️" : "←"}
        </WobblyButton>

        {status === "playing" && <MiniScore score={score} combo={combo} />}

        <div className="w-12" /> {/* 스페이서 */}
      </header>

      {/* 스테이지 표시 */}
      {status === "playing" && (
        <div className="px-4 mb-4">
          <StageDisplay
            currentStage={currentStage}
            stageConfig={stageConfig}
            isTransition={isStageTransition}
            wordsCompleted={currentWordIndex}
            totalWords={totalWordsInStage}
          />
        </div>
      )}

      {/* 메인 게임 영역 */}
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        {/* 비트 인디케이터 */}
        {status === "playing" && (
          <div className="mb-8">
            <BeatIndicatorBar
              beatCount={4}
              currentBeat={currentBeatIndex}
              isPlaying={status === "playing"}
            />
          </div>
        )}

        {/* 단어 카드 */}
        <div className="relative">
          <WordCard
            word={currentWord}
            isActive={status === "playing" && !isStageTransition}
          />
          <HitFeedback timing={hitFeedback} />
        </div>

        {/* 시작 버튼 (대기 상태) */}
        {status === "idle" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 text-center"
          >
            <p
              className="text-lg text-[var(--border-dark)]/70 mb-4"
              style={{ fontFamily: "var(--font-gaegu), cursive" }}
            >
              5단계 스테이지! 비트가 점점 빨라져요 🔥
            </p>
            <WobblyButton
              variant="success"
              size="xl"
              onClick={startCountdown}
            >
              ▶️ 시작하기
            </WobblyButton>
          </motion.div>
        )}

        {/* 터치 영역 (모바일) */}
        {status === "playing" && !isStageTransition && (
          <motion.button
            className={cn(
              "mt-8 w-full max-w-md h-24 rounded-2xl",
              "border-4 border-[var(--border-dark)]",
              "shadow-[4px_4px_0px_var(--border-dark)]",
              "active:shadow-[2px_2px_0px_var(--border-dark)]",
              "active:translate-x-[2px] active:translate-y-[2px]",
              "transition-all"
            )}
            style={{ backgroundColor: stageConfig?.color || "var(--playful-pink)" }}
            onClick={handleHit}
            onTouchStart={(e) => {
              e.preventDefault();
              handleHit();
            }}
          >
            <span
              className="text-2xl font-bold text-[var(--border-dark)]"
              style={{ fontFamily: "var(--font-gaegu), cursive" }}
            >
              TAP! 👆
            </span>
          </motion.button>
        )}
      </main>

      {/* 하단 정보 */}
      <footer className="p-4 text-center">
        <p
          className="text-sm text-[var(--border-dark)]/50"
          style={{ fontFamily: "var(--font-gaegu), cursive" }}
        >
          스페이스바 또는 화면을 터치하세요!
        </p>
      </footer>
    </div>
  );
}
