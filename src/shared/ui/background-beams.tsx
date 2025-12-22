"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const BackgroundBeams = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "absolute inset-0 h-full w-full pointer-events-none overflow-hidden",
        className
      )}
    >
      {/* 배경 도트 패턴 - 더 세밀하게 */}
      <div className="absolute inset-0 bg-dot-thick-neutral-200 dark:bg-dot-thick-neutral-800 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <Beam index={1} />
        <Beam index={2} />
        <Beam index={3} />
        <Beam index={4} />
        <Beam index={5} />
      </svg>
    </div>
  );
};

const Beam = ({ index }: { index: number }) => {
  const [path, setPath] = useState("");
  
  useEffect(() => {
    // 화면 전체를 가로지르는 동적 경로 생성 (0~100 단위 사용)
    const startX = Math.random() * 100;
    const endX = Math.random() * 100;
    const cp1x = Math.random() * 100;
    const cp1y = Math.random() * 50;
    const cp2x = Math.random() * 100;
    const cp2y = 50 + Math.random() * 50;
    
    setPath(`M ${startX} -10 C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} 110`);
  }, []);

  if (!path) return null;

  return (
    <motion.path
      d={path}
      stroke="url(#beam-gradient)"
      strokeWidth="0.2"
      fill="none"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ 
        pathLength: [0, 1], 
        opacity: [0, 0.5, 0],
        pathOffset: [0, 1] 
      }}
      transition={{
        duration: 10 + Math.random() * 10,
        repeat: Infinity,
        ease: "linear",
        delay: index * 2
      }}
    >
      <defs>
        <linearGradient id="beam-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="var(--brand-primary)" stopOpacity="0" />
          <stop offset="50%" stopColor="var(--brand-primary)" stopOpacity="1" />
          <stop offset="100%" stopColor="var(--brand-accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
    </motion.path>
  );
};