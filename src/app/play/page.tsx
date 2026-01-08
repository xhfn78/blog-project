"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PlayfulCard, getCategoryColor } from "@/shared/ui/playful-card";
import { StickerBadge, DifficultyBadge } from "@/shared/ui/sticker-badge";
import { WobblyButton } from "@/shared/ui/wobbly-button";
import { SAMPLE_CHALLENGES } from "@/data/sample-challenges";
import { CATEGORY_INFO, DIFFICULTY_INFO, type ChallengeCategory, type Difficulty } from "@/entities/challenge";

type SortOption = "popular" | "newest" | "difficulty";

export default function PlayPage() {
  const [selectedCategory, setSelectedCategory] = useState<ChallengeCategory | "all">("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | "all">("all");
  const [sortBy, setSortBy] = useState<SortOption>("popular");

  // 필터링 및 정렬
  const filteredChallenges = useMemo(() => {
    let challenges = [...SAMPLE_CHALLENGES];

    // 카테고리 필터
    if (selectedCategory !== "all") {
      challenges = challenges.filter((c) => c.category === selectedCategory);
    }

    // 난이도 필터
    if (selectedDifficulty !== "all") {
      challenges = challenges.filter((c) => c.difficulty === selectedDifficulty);
    }

    // 정렬
    switch (sortBy) {
      case "popular":
        challenges.sort((a, b) => b.playCount - a.playCount);
        break;
      case "newest":
        challenges.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "difficulty":
        const diffOrder = { easy: 0, medium: 1, hard: 2 };
        challenges.sort((a, b) => diffOrder[a.difficulty] - diffOrder[b.difficulty]);
        break;
    }

    return challenges;
  }, [selectedCategory, selectedDifficulty, sortBy]);

  const categories = Object.values(CATEGORY_INFO);
  const difficulties = Object.values(DIFFICULTY_INFO);

  return (
    <div className="min-h-screen bg-[var(--bg-playful)] py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1
            className="text-4xl font-bold text-[var(--border-dark)] mb-2"
            style={{ fontFamily: "var(--font-gaegu), cursive" }}
          >
            🎮 챌린지 선택
          </h1>
          <p
            className="text-lg text-[var(--border-dark)]/70"
            style={{ fontFamily: "var(--font-gaegu), cursive" }}
          >
            마음에 드는 챌린지를 골라 플레이하세요!
          </p>
        </motion.div>

        {/* 필터 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 space-y-4"
        >
          {/* 카테고리 필터 */}
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="text-sm font-bold text-[var(--border-dark)]/70"
              style={{ fontFamily: "var(--font-gaegu), cursive" }}
            >
              카테고리:
            </span>
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-3 py-1 rounded-full border-2 border-[var(--border-dark)] text-sm font-bold transition-all ${
                selectedCategory === "all"
                  ? "bg-[var(--playful-yellow)] shadow-[2px_2px_0px_var(--border-dark)]"
                  : "bg-white hover:bg-gray-100"
              }`}
              style={{ fontFamily: "var(--font-gaegu), cursive" }}
            >
              전체
            </button>
            {categories.filter(c => c.id !== "custom").map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 py-1 rounded-full border-2 border-[var(--border-dark)] text-sm font-bold transition-all ${
                  selectedCategory === category.id
                    ? `shadow-[2px_2px_0px_var(--border-dark)]`
                    : "bg-white hover:bg-gray-100"
                }`}
                style={{
                  fontFamily: "var(--font-gaegu), cursive",
                  backgroundColor: selectedCategory === category.id ? category.color : undefined,
                }}
              >
                {category.icon} {category.name}
              </button>
            ))}
          </div>

          {/* 난이도 & 정렬 */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="text-sm font-bold text-[var(--border-dark)]/70"
                style={{ fontFamily: "var(--font-gaegu), cursive" }}
              >
                난이도:
              </span>
              <button
                onClick={() => setSelectedDifficulty("all")}
                className={`px-3 py-1 rounded-full border-2 border-[var(--border-dark)] text-sm font-bold transition-all ${
                  selectedDifficulty === "all"
                    ? "bg-[var(--playful-mint)] shadow-[2px_2px_0px_var(--border-dark)]"
                    : "bg-white hover:bg-gray-100"
                }`}
                style={{ fontFamily: "var(--font-gaegu), cursive" }}
              >
                전체
              </button>
              {difficulties.map((diff) => (
                <button
                  key={diff.id}
                  onClick={() => setSelectedDifficulty(diff.id)}
                  className={`px-3 py-1 rounded-full border-2 border-[var(--border-dark)] text-sm font-bold transition-all ${
                    selectedDifficulty === diff.id
                      ? `shadow-[2px_2px_0px_var(--border-dark)]`
                      : "bg-white hover:bg-gray-100"
                  }`}
                  style={{
                    fontFamily: "var(--font-gaegu), cursive",
                    backgroundColor: selectedDifficulty === diff.id ? diff.color : undefined,
                  }}
                >
                  {diff.icon} {diff.name}
                </button>
              ))}
            </div>

            {/* 정렬 */}
            <div className="flex items-center gap-2">
              <span
                className="text-sm font-bold text-[var(--border-dark)]/70"
                style={{ fontFamily: "var(--font-gaegu), cursive" }}
              >
                정렬:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-3 py-1 rounded-lg border-2 border-[var(--border-dark)] bg-white text-sm font-bold"
                style={{ fontFamily: "var(--font-gaegu), cursive" }}
              >
                <option value="popular">🔥 인기순</option>
                <option value="newest">✨ 최신순</option>
                <option value="difficulty">📊 난이도순</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* 챌린지 그리드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredChallenges.map((challenge, index) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link href={`/play/${challenge.id}`}>
                <PlayfulCard
                  color={getCategoryColor(challenge.category)}
                                    className="overflow-hidden h-full"
                >
                  {/* 썸네일 */}
                  <div className="relative h-36 bg-white/50 flex items-center justify-center overflow-hidden">
                    {challenge.thumbnailUrls.slice(0, 3).map((url, i) => (
                      <img
                        key={i}
                        src={url}
                        alt=""
                        className="absolute w-14 h-14 rounded-lg border-2 border-[var(--border-dark)]"
                        style={{
                          left: `${20 + i * 25}%`,
                          transform: `rotate(${-10 + i * 10}deg)`,
                          zIndex: i,
                        }}
                      />
                    ))}
                    {/* 플레이 오버레이 */}
                    <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
                      <span className="text-4xl">▶️</span>
                    </div>
                  </div>

                  {/* 정보 */}
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <StickerBadge variant={challenge.category as any} size="sm" animate={false}>
                        {CATEGORY_INFO[challenge.category].icon}
                      </StickerBadge>
                      <DifficultyBadge level={challenge.difficulty} />
                    </div>

                    <h3
                      className="font-bold text-lg text-[var(--border-dark)] mb-1 line-clamp-1"
                      style={{ fontFamily: "var(--font-gaegu), cursive" }}
                    >
                      {challenge.title}
                    </h3>

                    <p
                      className="text-sm text-[var(--border-dark)]/60 mb-3 line-clamp-2"
                      style={{ fontFamily: "var(--font-gaegu), cursive" }}
                    >
                      {challenge.description}
                    </p>

                    <div className="flex items-center justify-between text-sm text-[var(--border-dark)]/60">
                      <span>🎮 {challenge.playCount.toLocaleString()}</span>
                      <span>❤️ {challenge.upvotes}</span>
                      <span>🎵 {challenge.bpm} BPM</span>
                    </div>
                  </div>
                </PlayfulCard>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* 결과 없음 */}
        {filteredChallenges.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <span className="text-6xl mb-4 block">😢</span>
            <p
              className="text-xl text-[var(--border-dark)]/70"
              style={{ fontFamily: "var(--font-gaegu), cursive" }}
            >
              해당 조건에 맞는 챌린지가 없어요
            </p>
            <WobblyButton
              variant="secondary"
              size="md"
              className="mt-4"
              onClick={() => {
                setSelectedCategory("all");
                setSelectedDifficulty("all");
              }}
            >
              🔄 필터 초기화
            </WobblyButton>
          </motion.div>
        )}

        {/* 챌린지 만들기 CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center"
        >
          <PlayfulCard color="var(--playful-purple)" className="inline-block p-6">
            <p
              className="text-lg text-[var(--border-dark)] mb-4"
              style={{ fontFamily: "var(--font-gaegu), cursive" }}
            >
              나만의 챌린지를 만들어보세요! ✨
            </p>
            <Link href="/create">
              <WobblyButton variant="success" size="lg">
                🎨 챌린지 만들기
              </WobblyButton>
            </Link>
          </PlayfulCard>
        </motion.div>
      </div>
    </div>
  );
}
