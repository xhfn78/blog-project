"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/shared/lib/cn";
import type { Challenge, WordItem } from "@/entities/challenge";
import { WobblyButton } from "@/shared/ui/wobbly-button";

interface VideoBoardProps {
  challenge: Challenge;
  onBack: () => void;
  onComplete?: () => void;
}

type VideoStatus = "ready" | "countdown" | "recording" | "finished";

export function VideoBoard({ challenge, onBack, onComplete }: VideoBoardProps) {
  const [status, setStatus] = useState<VideoStatus>("ready");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentStage, setCurrentStage] = useState(1);
  const [countdown, setCountdown] = useState(3);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const startTimeRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);

  // 스테이지별 단어 분배 (8개씩)
  const stageWords = Array.from({ length: 5 }, (_, i) =>
    challenge.words.slice(i * 8, (i + 1) * 8)
  );

  const currentWord = challenge.words[currentWordIndex];
  const totalWords = challenge.words.length;
  const currentStageWords = stageWords[currentStage - 1];
  const wordsCompletedInStage = currentWordIndex % 8;

  // 카운트다운
  useEffect(() => {
    if (status !== "countdown") return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          startRecording();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [status]);

  // 녹화 시작
  const startRecording = useCallback(async () => {
    setStatus("recording");

    // 음원 로드 및 재생
    if (challenge.audioUrl) {
      try {
        audioRef.current = new Audio(challenge.audioUrl);
        await audioRef.current.play();
        startTimeRef.current = performance.now();

        // 비트 트래킹 시작
        trackBeats();
      } catch (error) {
        console.error("Audio play failed:", error);
        // 음원 없이 타이머 기반으로 진행
        startTimeRef.current = performance.now();
        trackBeats();
      }
    } else {
      // 음원 없이 타이머 기반
      startTimeRef.current = performance.now();
      trackBeats();
    }
  }, [challenge.audioUrl]);

  // 비트 트래킹
  const trackBeats = useCallback(() => {
    const beatInterval = (60 / challenge.bpm) * 1000; // ms

    const checkBeat = () => {
      const elapsed = performance.now() - startTimeRef.current - challenge.startOffset;
      const expectedWordIndex = Math.floor(elapsed / beatInterval);

      if (expectedWordIndex >= 0 && expectedWordIndex < totalWords) {
        if (expectedWordIndex !== currentWordIndex) {
          setCurrentWordIndex(expectedWordIndex);

          // 스테이지 업데이트 (8개마다)
          const newStage = Math.floor(expectedWordIndex / 8) + 1;
          if (newStage !== currentStage && newStage <= 5) {
            setCurrentStage(newStage);
          }
        }
      }

      // 40개 단어 모두 완료
      if (expectedWordIndex >= totalWords) {
        finishRecording();
        return;
      }

      animationFrameRef.current = requestAnimationFrame(checkBeat);
    };

    checkBeat();
  }, [challenge.bpm, challenge.startOffset, currentWordIndex, currentStage, totalWords]);

  // 녹화 종료
  const finishRecording = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    setStatus("finished");
    onComplete?.();
  }, [onComplete]);

  // 시작 핸들러
  const handleStart = () => {
    setStatus("countdown");
    setCountdown(3);
  };

  // 재시작
  const handleRestart = () => {
    setStatus("ready");
    setCurrentWordIndex(0);
    setCurrentStage(1);
    setCountdown(3);
  };

  // 클린업
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col bg-[var(--bg-playful)]">
      {/* 카운트다운 오버레이 */}
      {status === "countdown" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <motion.div
            key={countdown}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            className="text-[200px] font-bold text-white"
            style={{ fontFamily: "var(--font-gaegu), cursive" }}
          >
            {countdown}
          </motion.div>
        </div>
      )}

      {/* 완료 화면 */}
      {status === "finished" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-8 border-4 border-[var(--border-dark)] shadow-[8px_8px_0px_var(--border-dark)] max-w-md"
          >
            <div className="text-center">
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ delay: 0.2 }}
                className="text-6xl block mb-4"
              >
                🎉
              </motion.span>

              <h2
                className="text-3xl font-bold text-[var(--border-dark)] mb-4"
                style={{ fontFamily: "var(--font-gaegu), cursive" }}
              >
                촬영 완료!
              </h2>

              <p
                className="text-lg text-[var(--border-dark)]/70 mb-6"
                style={{ fontFamily: "var(--font-gaegu), cursive" }}
              >
                화면 녹화를 중지하고 영상을 저장하세요
              </p>

              <div className="space-y-3">
                <WobblyButton
                  variant="success"
                  size="lg"
                  className="w-full"
                  onClick={handleRestart}
                >
                  🔄 다시 촬영
                </WobblyButton>

                <WobblyButton
                  variant="ghost"
                  size="md"
                  className="w-full"
                  onClick={onBack}
                >
                  ← 돌아가기
                </WobblyButton>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* 헤더 */}
      <header className="p-4 flex items-center justify-between">
        <WobblyButton variant="ghost" size="sm" onClick={onBack}>
          ← 나가기
        </WobblyButton>

        {status === "recording" && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-3 h-3 rounded-full bg-red-500"
              />
              <span
                className="text-sm font-bold text-[var(--border-dark)]"
                style={{ fontFamily: "var(--font-gaegu), cursive" }}
              >
                녹화 중
              </span>
            </div>

            <div
              className="text-sm text-[var(--border-dark)]/70"
              style={{ fontFamily: "var(--font-gaegu), cursive" }}
            >
              Stage {currentStage}/5 · {currentWordIndex + 1}/{totalWords}
            </div>
          </div>
        )}

        <div className="w-20" />
      </header>

      {/* 메인 영역 */}
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        {status === "ready" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-2xl"
          >
            <h1
              className="text-4xl font-bold text-[var(--border-dark)] mb-4"
              style={{ fontFamily: "var(--font-gaegu), cursive" }}
            >
              📹 영상 생성 준비
            </h1>

            <p
              className="text-xl text-[var(--border-dark)]/70 mb-8"
              style={{ fontFamily: "var(--font-gaegu), cursive" }}
            >
              {challenge.title}
            </p>

            <div
              className="mb-8 p-6 bg-white/80 rounded-2xl border-3 border-[var(--border-dark)]"
              style={{ fontFamily: "var(--font-gaegu), cursive" }}
            >
              <h3 className="text-lg font-bold text-[var(--border-dark)] mb-4">
                📝 촬영 방법
              </h3>
              <ol className="text-left space-y-2 text-[var(--border-dark)]/70">
                <li>1️⃣ 화면 녹화를 먼저 시작하세요 (Mac: Cmd+Shift+5)</li>
                <li>2️⃣ 아래 "시작" 버튼을 클릭하세요</li>
                <li>3️⃣ 3초 카운트다운 후 자동 재생됩니다</li>
                <li>4️⃣ 40개 단어가 자동으로 재생됩니다 (약 20초)</li>
                <li>5️⃣ 완료되면 화면 녹화를 중지하세요</li>
              </ol>
            </div>

            <WobblyButton
              variant="success"
              size="xl"
              onClick={handleStart}
            >
              ▶️ 시작
            </WobblyButton>
          </motion.div>
        )}

        {status === "recording" && (
          <div className="w-full max-w-4xl">
            {/* 워드 카드 (큰 화면) */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentWordIndex}
                initial={{ scale: 0, rotate: -20, y: 100 }}
                animate={{ scale: 1, rotate: 0, y: 0 }}
                exit={{ scale: 0, rotate: 20, y: -100 }}
                transition={{
                  type: "spring",
                  damping: 15,
                  stiffness: 200
                }}
                className={cn(
                  "mx-auto p-12 rounded-[40px]",
                  "border-8 border-[var(--border-dark)]",
                  "shadow-[16px_16px_0px_var(--border-dark)]",
                  "flex flex-col items-center justify-center gap-8"
                )}
                style={{
                  backgroundColor: currentWord?.imageUrl ? "white" : "var(--playful-yellow)",
                  minHeight: "500px"
                }}
              >
                {/* 이미지 */}
                {currentWord?.imageUrl && (
                  <motion.img
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1 }}
                    src={currentWord.imageUrl}
                    alt={currentWord.text}
                    className="w-64 h-64 object-contain"
                  />
                )}

                {/* 단어 텍스트 */}
                <motion.h2
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-8xl font-bold text-[var(--border-dark)] text-center"
                  style={{ fontFamily: "var(--font-gaegu), cursive" }}
                >
                  {currentWord?.text}
                </motion.h2>
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </main>

      {/* 하단 정보 */}
      {status === "recording" && (
        <footer className="p-4">
          <div className="max-w-4xl mx-auto">
            {/* 진행 바 */}
            <div className="h-3 bg-white/30 rounded-full overflow-hidden border-2 border-[var(--border-dark)]">
              <motion.div
                className="h-full bg-[var(--playful-yellow)]"
                initial={{ width: 0 }}
                animate={{ width: `${((currentWordIndex + 1) / totalWords) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
