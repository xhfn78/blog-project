"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  rotation: number;
  scale: number;
  delay: number;
  shape: "circle" | "square" | "star";
}

interface ConfettiProps {
  isActive: boolean;
  duration?: number;
  pieceCount?: number;
  colors?: string[];
  onComplete?: () => void;
}

const DEFAULT_COLORS = [
  "var(--playful-yellow)",
  "var(--playful-pink)",
  "var(--playful-blue)",
  "var(--playful-mint)",
  "var(--playful-purple)",
  "var(--playful-orange)",
];

const SHAPES = ["circle", "square", "star"] as const;

function ConfettiShape({ shape, color }: { shape: ConfettiPiece["shape"]; color: string }) {
  switch (shape) {
    case "circle":
      return (
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: color }}
        />
      );
    case "square":
      return (
        <div
          className="w-3 h-3 rounded-sm"
          style={{ backgroundColor: color }}
        />
      );
    case "star":
      return (
        <span className="text-lg" style={{ color }}>
          *
        </span>
      );
    default:
      return null;
  }
}

export function Confetti({
  isActive,
  duration = 3000,
  pieceCount = 50,
  colors = DEFAULT_COLORS,
  onComplete,
}: ConfettiProps) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  const generatePieces = useCallback(() => {
    return Array.from({ length: pieceCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // 0-100% 위치
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 720 - 360,
      scale: Math.random() * 0.5 + 0.5,
      delay: Math.random() * 0.5,
      shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
    }));
  }, [pieceCount, colors]);

  useEffect(() => {
    if (isActive) {
      setPieces(generatePieces());

      const timer = setTimeout(() => {
        setPieces([]);
        onComplete?.();
      }, duration);

      return () => clearTimeout(timer);
    } else {
      setPieces([]);
    }
  }, [isActive, duration, generatePieces, onComplete]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {pieces.map((piece) => (
          <motion.div
            key={piece.id}
            className="absolute"
            style={{
              left: `${piece.x}%`,
              top: -20,
            }}
            initial={{
              y: -20,
              x: 0,
              rotate: 0,
              scale: piece.scale,
              opacity: 1,
            }}
            animate={{
              y: window.innerHeight + 100,
              x: [0, 30, -30, 20, -20, 0],
              rotate: piece.rotation,
              opacity: [1, 1, 1, 0.8, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 3,
              delay: piece.delay,
              ease: "easeOut",
              x: {
                duration: 3,
                ease: "easeInOut",
              },
            }}
          >
            <ConfettiShape shape={piece.shape} color={piece.color} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// 등급별 컨페티 프리셋
export function GradeConfetti({ grade, isActive }: { grade: string; isActive: boolean }) {
  const getConfig = () => {
    switch (grade) {
      case "S":
        return { pieceCount: 100, duration: 5000 };
      case "A":
        return { pieceCount: 70, duration: 4000 };
      case "B":
        return { pieceCount: 50, duration: 3000 };
      default:
        return { pieceCount: 30, duration: 2000 };
    }
  };

  const config = getConfig();

  return <Confetti isActive={isActive} {...config} />;
}

// 버스트 효과 (중앙에서 폭발)
export function ConfettiBurst({ isActive, onComplete }: { isActive: boolean; onComplete?: () => void }) {
  const [particles, setParticles] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (isActive) {
      const newParticles = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: 50,
        color: DEFAULT_COLORS[Math.floor(Math.random() * DEFAULT_COLORS.length)],
        rotation: Math.random() * 360,
        scale: Math.random() * 0.5 + 0.5,
        delay: 0,
        shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
      }));
      setParticles(newParticles);

      const timer = setTimeout(() => {
        setParticles([]);
        onComplete?.();
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [isActive, onComplete]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {particles.map((particle, index) => {
          const angle = (index / particles.length) * Math.PI * 2;
          const distance = 200 + Math.random() * 100;

          return (
            <motion.div
              key={particle.id}
              className="absolute left-1/2 top-1/2"
              initial={{
                x: 0,
                y: 0,
                scale: 0,
                opacity: 1,
              }}
              animate={{
                x: Math.cos(angle) * distance,
                y: Math.sin(angle) * distance,
                scale: particle.scale,
                rotate: particle.rotation,
                opacity: [1, 1, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 1.5,
                ease: "easeOut",
              }}
            >
              <ConfettiShape shape={particle.shape} color={particle.color} />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
