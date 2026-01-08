"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, forwardRef, useImperativeHandle } from "react";
import { cn } from "@/shared/lib/cn";

interface BeatPulseProps {
  children: React.ReactNode;
  bpm?: number;
  isPlaying?: boolean;
  color?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  showRing?: boolean;
}

export interface BeatPulseRef {
  pulse: () => void;
}

const SIZE_CONFIG = {
  sm: { dot: "w-4 h-4", ring: "w-8 h-8" },
  md: { dot: "w-6 h-6", ring: "w-12 h-12" },
  lg: { dot: "w-8 h-8", ring: "w-16 h-16" },
};

export const BeatPulse = forwardRef<BeatPulseRef, BeatPulseProps>(
  (
    {
      children,
      bpm = 120,
      isPlaying = false,
      color = "var(--playful-pink)",
      size = "md",
      className,
      showRing = true,
    },
    ref
  ) => {
    const controls = useAnimation();
    const ringControls = useAnimation();

    // 외부에서 수동으로 펄스 트리거
    useImperativeHandle(ref, () => ({
      pulse: () => {
        controls.start({
          scale: [1, 1.15, 1],
          transition: { duration: 0.15 },
        });
        if (showRing) {
          ringControls.start({
            scale: [1, 1.5],
            opacity: [0.8, 0],
            transition: { duration: 0.4 },
          });
        }
      },
    }));

    // BPM에 따른 자동 펄스
    useEffect(() => {
      if (!isPlaying) return;

      const interval = 60000 / bpm; // ms per beat
      const timer = setInterval(() => {
        controls.start({
          scale: [1, 1.15, 1],
          transition: { duration: 0.15 },
        });
        if (showRing) {
          ringControls.start({
            scale: [1, 1.5],
            opacity: [0.8, 0],
            transition: { duration: interval / 1000 },
          });
        }
      }, interval);

      return () => clearInterval(timer);
    }, [isPlaying, bpm, controls, ringControls, showRing]);

    return (
      <div className={cn("relative inline-flex items-center justify-center", className)}>
        {/* 펄스 링 */}
        {showRing && (
          <motion.div
            className={cn(
              "absolute rounded-full border-4",
              SIZE_CONFIG[size].ring
            )}
            style={{ borderColor: color }}
            animate={ringControls}
            initial={{ scale: 1, opacity: 0 }}
          />
        )}

        {/* 메인 컨텐츠 */}
        <motion.div animate={controls}>{children}</motion.div>
      </div>
    );
  }
);

BeatPulse.displayName = "BeatPulse";

// 비트 인디케이터 도트
interface BeatDotProps {
  isActive?: boolean;
  color?: string;
  size?: "sm" | "md" | "lg";
}

export function BeatDot({ isActive = false, color = "var(--playful-pink)", size = "md" }: BeatDotProps) {
  return (
    <motion.div
      className={cn(
        "rounded-full border-2 border-[var(--border-dark)]",
        SIZE_CONFIG[size].dot
      )}
      style={{
        backgroundColor: isActive ? color : "white",
      }}
      animate={
        isActive
          ? {
              scale: [1, 1.3, 1],
              transition: { duration: 0.2 },
            }
          : {}
      }
    />
  );
}

// 비트 인디케이터 바
interface BeatIndicatorBarProps {
  beatCount?: number;
  currentBeat: number;
  isPlaying?: boolean;
}

export function BeatIndicatorBar({
  beatCount = 4,
  currentBeat,
  isPlaying = false,
}: BeatIndicatorBarProps) {
  const colors = [
    "var(--playful-pink)",
    "var(--playful-yellow)",
    "var(--playful-mint)",
    "var(--playful-blue)",
  ];

  return (
    <div className="flex items-center justify-center gap-3">
      {Array.from({ length: beatCount }).map((_, index) => (
        <BeatDot
          key={index}
          isActive={isPlaying && currentBeat % beatCount === index}
          color={colors[index % colors.length]}
          size="md"
        />
      ))}
    </div>
  );
}

// 원형 비트 게이지
interface CircularBeatGaugeProps {
  progress: number; // 0-100
  color?: string;
  size?: number;
  strokeWidth?: number;
}

export function CircularBeatGauge({
  progress,
  color = "var(--playful-pink)",
  size = 100,
  strokeWidth = 8,
}: CircularBeatGaugeProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* 배경 원 */}
      <svg className="absolute" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--border-dark)"
          strokeWidth={strokeWidth}
          opacity={0.2}
        />
      </svg>

      {/* 진행 원 */}
      <motion.svg
        className="absolute"
        width={size}
        height={size}
        style={{ rotate: -90 }}
      >
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.1, ease: "linear" }}
        />
      </motion.svg>
    </div>
  );
}
