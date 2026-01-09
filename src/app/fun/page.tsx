"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PlayfulCard } from "@/shared/ui/playful-card";
import { WobblyButton } from "@/shared/ui/wobbly-button";

export default function FunPage() {
  const funTools = [
    {
      id: "beat-on-word",
      name: "비트온워드",
      description: "비트에 맞춰 이미지를 보고 단어를 빠르게 말하는 리듬 게임!",
      icon: "🎵",
      color: "var(--playful-yellow)",
      link: "/play",
      tag: "인기",
    },
    {
      id: "face-reading",
      name: "2026 AI 관상",
      description: "AI가 당신의 얼굴을 분석하여 2026년 운세를 알려드립니다!",
      icon: "🎭",
      color: "var(--playful-pink)",
      link: "/fun/face-reading-2026",
      tag: "NEW",
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-playful)] py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* 헤더 */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-[var(--border-dark)] mb-6"
            style={{ fontFamily: "var(--font-gaegu), cursive" }}
          >
            놀이터 <span className="text-[var(--playful-pink)]">Fun!</span>
          </motion.h1>
          <p
            className="text-xl text-[var(--border-dark)]/70"
            style={{ fontFamily: "var(--font-gaegu), cursive" }}
          >
            심심할 때 즐기는 다양한 AI 도구와 게임 모음
          </p>
        </div>

        {/* 도구 리스트 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {funTools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <Link href={tool.link}>
                <PlayfulCard
                  color={tool.color}
                  className="h-full p-8 flex flex-col items-center text-center group"
                >
                  <div className="relative mb-6">
                    <span className="text-8xl group-hover:scale-110 transition-transform duration-300 block">
                      {tool.icon}
                    </span>
                    <div className="absolute -top-2 -right-2 bg-[var(--border-dark)] text-white text-xs px-2 py-1 rounded-full font-bold">
                      {tool.tag}
                    </div>
                  </div>

                  <h2
                    className="text-3xl font-bold text-[var(--border-dark)] mb-4"
                    style={{ fontFamily: "var(--font-gaegu), cursive" }}
                  >
                    {tool.name}
                  </h2>
                  <p
                    className="text-lg text-[var(--border-dark)]/70 mb-8"
                    style={{ fontFamily: "var(--font-gaegu), cursive" }}
                  >
                    {tool.description}
                  </p>

                  <div className="mt-auto w-full">
                    <WobblyButton
                      color="white"
                      size="lg"
                      className="w-full"
                    >
                      지금 시작하기 →
                    </WobblyButton>
                  </div>
                </PlayfulCard>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* 하단 돌아가기 */}
        <div className="mt-16 text-center">
          <Link href="/">
            <WobblyButton variant="ghost" size="sm">
              ← 메인으로 돌아가기
            </WobblyButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
