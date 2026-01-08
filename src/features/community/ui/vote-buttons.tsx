"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/shared/lib/cn";
import { useVote } from "../lib/use-vote-store";

interface VoteButtonsProps {
  challengeId: string;
  initialUpvotes?: number;
  initialDownvotes?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function VoteButtons({
  challengeId,
  initialUpvotes = 0,
  initialDownvotes = 0,
  size = "md",
  className,
}: VoteButtonsProps) {
  const { myVote, upvotes, downvotes, handleUpvote, handleDownvote, initVoteCounts } =
    useVote(challengeId);

  // 초기 값 설정
  useEffect(() => {
    initVoteCounts(initialUpvotes, initialDownvotes);
  }, [initialUpvotes, initialDownvotes, initVoteCounts]);

  const sizes = {
    sm: { button: "px-2 py-1 text-sm", icon: "text-lg" },
    md: { button: "px-3 py-2 text-base", icon: "text-xl" },
    lg: { button: "px-4 py-3 text-lg", icon: "text-2xl" },
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* 좋아요 버튼 */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={handleUpvote}
        className={cn(
          "flex items-center gap-1 rounded-full border-2 border-[var(--border-dark)] transition-all",
          sizes[size].button,
          myVote === "up"
            ? "bg-[var(--playful-pink)] shadow-[2px_2px_0px_var(--border-dark)]"
            : "bg-white hover:bg-gray-100"
        )}
        style={{ fontFamily: "var(--font-gaegu), cursive" }}
      >
        <motion.span
          animate={{ rotate: myVote === "up" ? [0, -10, 10, 0] : 0 }}
          transition={{ duration: 0.3 }}
          className={sizes[size].icon}
        >
          {myVote === "up" ? "❤️" : "🤍"}
        </motion.span>
        <span className="font-bold text-[var(--border-dark)]">{upvotes}</span>
      </motion.button>

      {/* 싫어요 버튼 */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={handleDownvote}
        className={cn(
          "flex items-center gap-1 rounded-full border-2 border-[var(--border-dark)] transition-all",
          sizes[size].button,
          myVote === "down"
            ? "bg-[var(--playful-coral)] shadow-[2px_2px_0px_var(--border-dark)]"
            : "bg-white hover:bg-gray-100"
        )}
        style={{ fontFamily: "var(--font-gaegu), cursive" }}
      >
        <motion.span
          animate={{ rotate: myVote === "down" ? [0, -10, 10, 0] : 0 }}
          transition={{ duration: 0.3 }}
          className={sizes[size].icon}
        >
          👎
        </motion.span>
        <span className="font-bold text-[var(--border-dark)]">{downvotes}</span>
      </motion.button>
    </div>
  );
}

// 간단한 좋아요 버튼 (싫어요 없음)
interface LikeButtonProps {
  challengeId: string;
  initialLikes?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function LikeButton({
  challengeId,
  initialLikes = 0,
  size = "md",
  className,
}: LikeButtonProps) {
  const { myVote, upvotes, handleUpvote, initVoteCounts } = useVote(challengeId);

  useEffect(() => {
    initVoteCounts(initialLikes, 0);
  }, [initialLikes, initVoteCounts]);

  const sizes = {
    sm: { button: "px-3 py-1", icon: "text-lg", text: "text-sm" },
    md: { button: "px-4 py-2", icon: "text-xl", text: "text-base" },
    lg: { button: "px-5 py-3", icon: "text-2xl", text: "text-lg" },
  };

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      whileHover={{ rotate: [-2, 2, -2, 0] }}
      onClick={handleUpvote}
      className={cn(
        "flex items-center gap-2 rounded-full border-3 border-[var(--border-dark)] transition-all",
        sizes[size].button,
        myVote === "up"
          ? "bg-[var(--playful-pink)] shadow-[3px_3px_0px_var(--border-dark)]"
          : "bg-white hover:bg-[var(--playful-pink)]/20"
      )}
      style={{ fontFamily: "var(--font-gaegu), cursive" }}
    >
      <motion.span
        animate={{
          scale: myVote === "up" ? [1, 1.3, 1] : 1,
        }}
        transition={{ duration: 0.3 }}
        className={sizes[size].icon}
      >
        {myVote === "up" ? "❤️" : "🤍"}
      </motion.span>
      <span className={cn("font-bold text-[var(--border-dark)]", sizes[size].text)}>
        {upvotes}
      </span>
    </motion.button>
  );
}
