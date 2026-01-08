"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/shared/lib/cn";
import type { GameResult } from "@/entities/challenge";
import {
  generateShareImage,
  downloadImage,
  copyImageToClipboard,
  shareNative,
  getShareText,
} from "../lib/share-utils";
import { WobblyButton } from "@/shared/ui/wobbly-button";

interface ShareButtonProps {
  result: GameResult;
  challengeId: string;
  challengeTitle: string;
  className?: string;
}

export function ShareButton({
  result,
  challengeId,
  challengeTitle,
  className,
}: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 2000);
  };

  const handleGenerateAndDownload = async () => {
    setIsGenerating(true);
    const blob = await generateShareImage({ result, challengeTitle });
    setIsGenerating(false);

    if (blob) {
      downloadImage(blob, `beatonword-${challengeId}.png`);
      showMessage("이미지 저장 완료!");
    } else {
      showMessage("이미지 생성 실패");
    }
  };

  const handleCopyImage = async () => {
    setIsGenerating(true);
    const blob = await generateShareImage({ result, challengeTitle });
    setIsGenerating(false);

    if (blob) {
      const success = await copyImageToClipboard(blob);
      showMessage(success ? "이미지 복사 완료!" : "복사 실패");
    } else {
      showMessage("이미지 생성 실패");
    }
  };

  const handleNativeShare = async () => {
    setIsGenerating(true);
    const blob = await generateShareImage({ result, challengeTitle });
    setIsGenerating(false);

    if (blob) {
      const success = await shareNative(blob, challengeTitle);
      if (!success) {
        // 네이티브 공유 불가 시 다운로드
        downloadImage(blob, `beatonword-${challengeId}.png`);
        showMessage("이미지 저장 완료!");
      }
    } else {
      showMessage("이미지 생성 실패");
    }
  };

  const handleCopyText = async () => {
    const text = getShareText(result, challengeId);
    try {
      await navigator.clipboard.writeText(text);
      showMessage("텍스트 복사 완료!");
    } catch {
      showMessage("복사 실패");
    }
  };

  return (
    <div className={cn("relative", className)}>
      {/* 공유 버튼 */}
      <WobblyButton
        variant="secondary"
        size="lg"
        onClick={() => setIsOpen(!isOpen)}
        disabled={isGenerating}
      >
        {isGenerating ? "⏳ 생성 중..." : "📱 공유하기"}
      </WobblyButton>

      {/* 공유 옵션 드롭다운 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className={cn(
              "absolute top-full left-0 mt-2 w-64 p-3 rounded-2xl",
              "border-3 border-[var(--border-dark)]",
              "shadow-[4px_4px_0px_var(--border-dark)]",
              "bg-white z-50"
            )}
          >
            <div className="space-y-2">
              <ShareOption
                icon="📲"
                label="공유하기"
                description="네이티브 공유"
                onClick={handleNativeShare}
              />
              <ShareOption
                icon="💾"
                label="이미지 저장"
                description="PNG로 다운로드"
                onClick={handleGenerateAndDownload}
              />
              <ShareOption
                icon="📋"
                label="이미지 복사"
                description="클립보드에 복사"
                onClick={handleCopyImage}
              />
              <ShareOption
                icon="📝"
                label="텍스트 복사"
                description="결과 텍스트 복사"
                onClick={handleCopyText}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 메시지 토스트 */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className={cn(
              "absolute bottom-full left-1/2 -translate-x-1/2 mb-2",
              "px-4 py-2 rounded-full",
              "bg-[var(--playful-mint)] border-2 border-[var(--border-dark)]",
              "text-sm font-bold text-[var(--border-dark)]",
              "whitespace-nowrap"
            )}
            style={{ fontFamily: "var(--font-gaegu), cursive" }}
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 오버레이 (드롭다운 닫기) */}
      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
}

// 공유 옵션 아이템
interface ShareOptionProps {
  icon: string;
  label: string;
  description: string;
  onClick: () => void;
}

function ShareOption({ icon, label, description, onClick }: ShareOptionProps) {
  return (
    <motion.button
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 p-2 rounded-xl",
        "hover:bg-[var(--playful-yellow)]/20 transition-colors"
      )}
    >
      <span className="text-2xl">{icon}</span>
      <div className="text-left">
        <p
          className="font-bold text-[var(--border-dark)]"
          style={{ fontFamily: "var(--font-gaegu), cursive" }}
        >
          {label}
        </p>
        <p
          className="text-xs text-[var(--border-dark)]/60"
          style={{ fontFamily: "var(--font-gaegu), cursive" }}
        >
          {description}
        </p>
      </div>
    </motion.button>
  );
}
