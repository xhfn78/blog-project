"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PlayfulCard, getCategoryColor } from "@/shared/ui/playful-card";
import { StickerBadge, DifficultyBadge } from "@/shared/ui/sticker-badge";
import { WobblyButton } from "@/shared/ui/wobbly-button";
import { getPopularChallenges, SAMPLE_CHALLENGES } from "@/data/sample-challenges";
import { CATEGORY_INFO } from "@/entities/challenge";

export default function Home() {
  const popularChallenges = getPopularChallenges(4);
  const categories = Object.values(CATEGORY_INFO).filter(c => c.id !== "custom");

  return (
    <div className="min-h-screen bg-[var(--bg-playful)]">
      {/* Hero Section */}
      <section className="relative py-16 px-4 overflow-hidden">
        {/* 배경 장식 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[var(--playful-pink)]/20"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-[var(--playful-mint)]/20"
          />
        </div>

        <div className="container mx-auto max-w-4xl text-center relative z-10">
          {/* 로고 애니메이션 */}
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="mb-8"
          >
            <div
              className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-[var(--playful-yellow)] border-4 border-[var(--border-dark)] shadow-[6px_6px_0px_var(--border-dark)]"
            >
              <span className="text-4xl">🎵</span>
              <span
                className="text-3xl font-bold text-[var(--border-dark)]"
                style={{ fontFamily: "var(--font-gaegu), cursive" }}
              >
                비트온워드
              </span>
            </div>
          </motion.div>

          {/* 메인 타이틀 */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold mb-6 text-[var(--border-dark)]"
            style={{ fontFamily: "var(--font-gaegu), cursive" }}
          >
            비트에 맞춰<br />
            <span className="text-[var(--playful-pink)]">단어</span>를 말해요!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-[var(--border-dark)]/70 mb-10 max-w-lg mx-auto"
            style={{ fontFamily: "var(--font-gaegu), cursive" }}
          >
            음악 비트에 맞춰 이미지를 보고 단어를 말하는
            재미있는 게임! 친구들과 함께 도전해보세요 🔥
          </motion.p>

          {/* CTA 버튼 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/play">
              <WobblyButton variant="success" size="xl">
                🎮 지금 플레이하기
              </WobblyButton>
            </Link>
            <Link href="/create">
              <WobblyButton variant="secondary" size="lg">
                ✨ 챌린지 만들기
              </WobblyButton>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 카테고리 섹션 */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-center mb-8 text-[var(--border-dark)]"
            style={{ fontFamily: "var(--font-gaegu), cursive" }}
          >
            🎯 카테고리 선택
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/play?category=${category.id}`}>
                  <PlayfulCard
                    color={category.color}
                                        className="p-4 text-center"
                  >
                    <span className="text-3xl mb-2 block">{category.icon}</span>
                    <p
                      className="font-bold text-[var(--border-dark)]"
                      style={{ fontFamily: "var(--font-gaegu), cursive" }}
                    >
                      {category.name}
                    </p>
                  </PlayfulCard>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 인기 챌린지 섹션 */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center justify-between mb-8">
            <h2
              className="text-2xl font-bold text-[var(--border-dark)]"
              style={{ fontFamily: "var(--font-gaegu), cursive" }}
            >
              🔥 인기 챌린지
            </h2>
            <Link href="/play">
              <span
                className="text-[var(--playful-pink)] font-bold hover:underline"
                style={{ fontFamily: "var(--font-gaegu), cursive" }}
              >
                전체 보기 →
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularChallenges.map((challenge, index) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/play/${challenge.id}`}>
                  <PlayfulCard
                    color={getCategoryColor(challenge.category)}
                                        className="overflow-hidden"
                  >
                    {/* 썸네일 */}
                    <div className="relative h-32 bg-white/50 flex items-center justify-center overflow-hidden">
                      {challenge.thumbnailUrls.slice(0, 3).map((url, i) => (
                        <img
                          key={i}
                          src={url}
                          alt=""
                          className="absolute w-12 h-12 rounded-lg border-2 border-[var(--border-dark)]"
                          style={{
                            left: `${25 + i * 20}%`,
                            transform: `rotate(${-10 + i * 10}deg)`,
                            zIndex: i,
                          }}
                        />
                      ))}
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
                        className="font-bold text-lg text-[var(--border-dark)] mb-1"
                        style={{ fontFamily: "var(--font-gaegu), cursive" }}
                      >
                        {challenge.title}
                      </h3>

                      <div className="flex items-center gap-3 text-sm text-[var(--border-dark)]/60">
                        <span>🎮 {challenge.playCount.toLocaleString()}</span>
                        <span>❤️ {challenge.upvotes}</span>
                      </div>
                    </div>
                  </PlayfulCard>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 사용 방법 섹션 */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2
            className="text-2xl font-bold text-center mb-12 text-[var(--border-dark)]"
            style={{ fontFamily: "var(--font-gaegu), cursive" }}
          >
            📖 이렇게 플레이해요!
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: 1, emoji: "🎯", title: "챌린지 선택", desc: "좋아하는 카테고리를 골라요" },
              { step: 2, emoji: "🎵", title: "비트 맞추기", desc: "음악 비트에 맞춰 준비!" },
              { step: 3, emoji: "🗣️", title: "단어 말하기", desc: "이미지를 보고 빠르게 말해요" },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <PlayfulCard
                  color="white"
                  className="p-6 text-center"
                  hoverEffect={false}
                >
                  <div
                    className="w-12 h-12 mx-auto mb-4 rounded-full bg-[var(--playful-yellow)] border-3 border-[var(--border-dark)] flex items-center justify-center shadow-[3px_3px_0px_var(--border-dark)]"
                  >
                    <span
                      className="text-xl font-bold text-[var(--border-dark)]"
                      style={{ fontFamily: "var(--font-gaegu), cursive" }}
                    >
                      {item.step}
                    </span>
                  </div>
                  <span className="text-4xl mb-3 block">{item.emoji}</span>
                  <h3
                    className="text-xl font-bold mb-2 text-[var(--border-dark)]"
                    style={{ fontFamily: "var(--font-gaegu), cursive" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-[var(--border-dark)]/60"
                    style={{ fontFamily: "var(--font-gaegu), cursive" }}
                  >
                    {item.desc}
                  </p>
                </PlayfulCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 하단 CTA */}
      <section className="py-20 px-4 bg-[var(--playful-pink)]">
        <div className="container mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-3xl font-bold mb-6 text-[var(--border-dark)]"
              style={{ fontFamily: "var(--font-gaegu), cursive" }}
            >
              준비됐나요? 🎤
            </h2>
            <p
              className="text-lg mb-8 text-[var(--border-dark)]/70"
              style={{ fontFamily: "var(--font-gaegu), cursive" }}
            >
              지금 바로 비트에 맞춰 도전해보세요!
            </p>
            <Link href="/play">
              <WobblyButton
                color="var(--playful-yellow)"
                size="xl"
              >
                🚀 시작하기
              </WobblyButton>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 개발자 도구 링크 (하단에 작게) */}
      <section className="py-8 px-4 bg-white/30">
        <div className="container mx-auto max-w-4xl text-center">
          <p
            className="text-sm text-[var(--border-dark)]/50"
            style={{ fontFamily: "var(--font-gaegu), cursive" }}
          >
            개발자이신가요?{" "}
            <Link href="/tools" className="text-[var(--playful-blue)] underline">
              개발자 도구 모음 →
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
