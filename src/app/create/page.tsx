"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CreatorWizard } from "@/features/challenge-creator";
import { PlayfulCard } from "@/shared/ui/playful-card";
import { WobblyButton } from "@/shared/ui/wobbly-button";
import { GameBoard } from "@/features/challenge-player";
import type { Challenge } from "@/entities/challenge";

type Mode = "intro" | "create" | "preview" | "done";

export default function CreatePage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("intro");
  const [createdChallenge, setCreatedChallenge] = useState<Challenge | null>(null);

  const handleComplete = (challenge: Challenge) => {
    setCreatedChallenge(challenge);
    setMode("done");
  };

  const handlePreview = () => {
    if (createdChallenge) {
      setMode("preview");
    }
  };

  // 게임 미리보기
  if (mode === "preview" && createdChallenge) {
    return (
      <GameBoard
        challenge={createdChallenge}
        onBack={() => setMode("done")}
      />
    );
  }

  // 생성 마법사
  if (mode === "create") {
    return (
      <CreatorWizard
        onComplete={handleComplete}
        onCancel={() => setMode("intro")}
      />
    );
  }

  // 완료 화면
  if (mode === "done" && createdChallenge) {
    return (
      <div className="min-h-screen bg-[var(--bg-playful)] py-8 px-4 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-md"
        >
          <PlayfulCard color="var(--playful-mint)" className="p-8 text-center">
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ delay: 0.2 }}
              className="text-6xl block mb-4"
            >
              🎉
            </motion.span>

            <h1
              className="text-3xl font-bold text-[var(--border-dark)] mb-2"
              style={{ fontFamily: "var(--font-gaegu), cursive" }}
            >
              챌린지 완성!
            </h1>

            <p
              className="text-lg text-[var(--border-dark)]/70 mb-6"
              style={{ fontFamily: "var(--font-gaegu), cursive" }}
            >
              &quot;{createdChallenge.title}&quot; 챌린지가 만들어졌어요
            </p>

            <div className="space-y-3">
              <WobblyButton
                variant="success"
                size="lg"
                className="w-full"
                onClick={handlePreview}
              >
                ▶️ 바로 플레이
              </WobblyButton>

              <WobblyButton
                variant="secondary"
                size="md"
                className="w-full"
                onClick={() => setMode("create")}
              >
                🎨 새로 만들기
              </WobblyButton>

              <WobblyButton
                variant="ghost"
                size="md"
                className="w-full"
                onClick={() => router.push("/play")}
              >
                🏠 챌린지 목록
              </WobblyButton>
            </div>

            <p
              className="mt-6 text-sm text-[var(--border-dark)]/50"
              style={{ fontFamily: "var(--font-gaegu), cursive" }}
            >
              * 현재 버전에서는 챌린지가 localStorage에 저장됩니다
            </p>
          </PlayfulCard>
        </motion.div>
      </div>
    );
  }

  // 인트로 화면
  return (
    <div className="min-h-screen bg-[var(--bg-playful)] py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1
            className="text-4xl md:text-5xl font-bold text-[var(--border-dark)] mb-4"
            style={{ fontFamily: "var(--font-gaegu), cursive" }}
          >
            🎨 챌린지 만들기
          </h1>
          <p
            className="text-xl text-[var(--border-dark)]/70"
            style={{ fontFamily: "var(--font-gaegu), cursive" }}
          >
            나만의 비트온워드 챌린지를 만들어보세요!
          </p>
        </motion.div>

        {/* 카드 선택 */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* 직접 만들기 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <PlayfulCard
              color="var(--playful-yellow)"
              className="p-8 h-full"
              onClick={() => setMode("create")}
            >
              <span className="text-5xl block mb-4">✍️</span>
              <h2
                className="text-2xl font-bold text-[var(--border-dark)] mb-2"
                style={{ fontFamily: "var(--font-gaegu), cursive" }}
              >
                직접 만들기
              </h2>
              <p
                className="text-[var(--border-dark)]/70 mb-6"
                style={{ fontFamily: "var(--font-gaegu), cursive" }}
              >
                단어와 이미지를 직접 입력해서 나만의 챌린지를 만들어요
              </p>

              <ul
                className="space-y-2 text-sm text-[var(--border-dark)]/60 mb-6"
                style={{ fontFamily: "var(--font-gaegu), cursive" }}
              >
                <li>✓ 원하는 단어 추가</li>
                <li>✓ 이미지 URL 연결</li>
                <li>✓ BPM/난이도 설정</li>
              </ul>

              <WobblyButton variant="primary" size="lg" className="w-full">
                시작하기 →
              </WobblyButton>
            </PlayfulCard>
          </motion.div>

          {/* AI 생성 (Coming Soon) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <PlayfulCard
              color="var(--playful-purple)"
              className="p-8 h-full relative overflow-hidden"
              hoverEffect={false}
            >
              {/* Coming Soon 배너 */}
              <div
                className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[var(--playful-pink)] border-2 border-[var(--border-dark)] text-sm font-bold text-[var(--border-dark)]"
                style={{ fontFamily: "var(--font-gaegu), cursive" }}
              >
                Coming Soon
              </div>

              <span className="text-5xl block mb-4 opacity-50">🤖</span>
              <h2
                className="text-2xl font-bold text-[var(--border-dark)]/50 mb-2"
                style={{ fontFamily: "var(--font-gaegu), cursive" }}
              >
                AI 자동 생성
              </h2>
              <p
                className="text-[var(--border-dark)]/40 mb-6"
                style={{ fontFamily: "var(--font-gaegu), cursive" }}
              >
                테마만 입력하면 AI가 단어와 이미지를 자동으로 찾아줘요
              </p>

              <ul
                className="space-y-2 text-sm text-[var(--border-dark)]/30 mb-6"
                style={{ fontFamily: "var(--font-gaegu), cursive" }}
              >
                <li>✓ 테마 기반 단어 생성</li>
                <li>✓ 자동 이미지 검색</li>
                <li>✓ 스마트 BPM 추천</li>
              </ul>

              <WobblyButton variant="ghost" size="lg" className="w-full opacity-50" disabled>
                준비 중...
              </WobblyButton>
            </PlayfulCard>
          </motion.div>
        </div>

        {/* 팁 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <PlayfulCard color="white" className="p-6" hoverEffect={false}>
            <h3
              className="text-xl font-bold text-[var(--border-dark)] mb-4"
              style={{ fontFamily: "var(--font-gaegu), cursive" }}
            >
              💡 좋은 챌린지 만들기 팁
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-[var(--playful-yellow)]/20">
                <span className="text-2xl block mb-2">🎯</span>
                <p
                  className="text-sm text-[var(--border-dark)]/70"
                  style={{ fontFamily: "var(--font-gaegu), cursive" }}
                >
                  <strong>테마 통일</strong>: 동물, 과일 등 하나의 주제로 단어를 모아요
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[var(--playful-mint)]/20">
                <span className="text-2xl block mb-2">🖼️</span>
                <p
                  className="text-sm text-[var(--border-dark)]/70"
                  style={{ fontFamily: "var(--font-gaegu), cursive" }}
                >
                  <strong>명확한 이미지</strong>: 한눈에 알아볼 수 있는 이미지를 사용해요
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[var(--playful-pink)]/20">
                <span className="text-2xl block mb-2">🎵</span>
                <p
                  className="text-sm text-[var(--border-dark)]/70"
                  style={{ fontFamily: "var(--font-gaegu), cursive" }}
                >
                  <strong>적절한 BPM</strong>: 처음엔 80~100 BPM으로 시작해보세요
                </p>
              </div>
            </div>
          </PlayfulCard>
        </motion.div>
      </div>
    </div>
  );
}
