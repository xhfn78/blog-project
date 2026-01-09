"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getChallengeById } from "@/data/sample-challenges";
import { GameBoard } from "@/features/challenge-player";
import { VideoBoard } from "@/features/video-generator/ui/video-board";
import { PlayfulCard, getCategoryColor } from "@/shared/ui/playful-card";
import { StickerBadge, DifficultyBadge } from "@/shared/ui/sticker-badge";
import { WobblyButton } from "@/shared/ui/wobbly-button";
import { CATEGORY_INFO } from "@/entities/challenge";
import type { Challenge } from "@/entities/challenge";
import { LikeButton } from "@/features/community";

export default function PlayChallengePage() {
  const params = useParams();
  const router = useRouter();
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 챌린지 로드
  useEffect(() => {
    const id = params.id as string;
    const found = getChallengeById(id);

    if (found) {
      setChallenge(found);
    }
    setIsLoading(false);
  }, [params.id]);

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--bg-playful)] flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 rounded-full border-4 border-[var(--playful-pink)] border-t-transparent"
        />
      </div>
    );
  }

  // 챌린지 없음
  if (!challenge) {
    return (
      <div className="min-h-screen bg-[var(--bg-playful)] flex items-center justify-center p-4">
        <PlayfulCard color="var(--playful-coral)" className="max-w-md p-8 text-center">
          <span className="text-6xl mb-4 block">😢</span>
          <h1
            className="text-2xl font-bold text-[var(--border-dark)] mb-2"
            style={{ fontFamily: "var(--font-gaegu), cursive" }}
          >
            챌린지를 찾을 수 없어요
          </h1>
          <p
            className="text-[var(--border-dark)]/70 mb-6"
            style={{ fontFamily: "var(--font-gaegu), cursive" }}
          >
            존재하지 않거나 삭제된 챌린지예요
          </p>
          <WobblyButton variant="secondary" size="lg" onClick={() => router.push("/play")}>
            ← 챌린지 목록으로
          </WobblyButton>
        </PlayfulCard>
      </div>
    );
  }

  // 프리셋 챌린지 감지 (영상 생성 모드)
  const isPresetChallenge = challenge.id.startsWith("preset-");

  // 게임 플레이 중
  if (isPlaying) {
    // 프리셋 챌린지는 VideoBoard, 일반 챌린지는 GameBoard
    if (isPresetChallenge) {
      return (
        <VideoBoard
          challenge={challenge}
          onBack={() => setIsPlaying(false)}
          onComplete={() => {
            // 완료 후 처리 (선택사항)
            console.log("Video generation completed!");
          }}
        />
      );
    }

    return (
      <GameBoard
        challenge={challenge}
        onBack={() => setIsPlaying(false)}
      />
    );
  }

  // 챌린지 정보 화면 (시작 전)
  const categoryInfo = CATEGORY_INFO[challenge.category];

  return (
    <div className="min-h-screen bg-[var(--bg-playful)] py-8 px-4">
      <div className="container mx-auto max-w-2xl">
        {/* 뒤로가기 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <WobblyButton variant="ghost" size="sm" onClick={() => router.push("/play")}>
            ← 목록으로
          </WobblyButton>
        </motion.div>

        {/* 메인 카드 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <PlayfulCard
            color={getCategoryColor(challenge.category)}
            className="overflow-hidden"
            hoverEffect={false}
          >
            {/* 썸네일 영역 */}
            <div className="relative h-48 bg-white/50 flex items-center justify-center overflow-hidden">
              {challenge.thumbnailUrls.slice(0, 4).map((url, i) => (
                <motion.img
                  key={i}
                  src={url}
                  alt=""
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: -15 + i * 10 }}
                  transition={{ delay: 0.2 + i * 0.1, type: "spring" }}
                  className="absolute w-16 h-16 rounded-xl border-3 border-[var(--border-dark)] shadow-[3px_3px_0px_var(--border-dark)]"
                  style={{
                    left: `${15 + i * 20}%`,
                    zIndex: i,
                  }}
                />
              ))}
            </div>

            {/* 정보 */}
            <div className="p-6">
              {/* 뱃지 */}
              <div className="flex items-center gap-2 mb-4">
                <StickerBadge variant={challenge.category as any} size="md">
                  {categoryInfo.icon} {categoryInfo.name}
                </StickerBadge>
                <DifficultyBadge level={challenge.difficulty} />
              </div>

              {/* 제목 */}
              <h1
                className="text-3xl font-bold text-[var(--border-dark)] mb-2"
                style={{ fontFamily: "var(--font-gaegu), cursive" }}
              >
                {challenge.title}
              </h1>

              {/* 설명 */}
              <p
                className="text-lg text-[var(--border-dark)]/70 mb-6"
                style={{ fontFamily: "var(--font-gaegu), cursive" }}
              >
                {challenge.description}
              </p>

              {/* 통계 */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                <StatItem icon="🎮" label="플레이" value={challenge.playCount.toLocaleString()} />
                <div className="text-center">
                  <LikeButton
                    challengeId={challenge.id}
                    initialLikes={challenge.upvotes}
                    size="sm"
                  />
                </div>
                <StatItem icon="🎵" label="BPM" value={challenge.bpm.toString()} />
                <StatItem icon="📝" label="단어" value={`${challenge.words.length}개`} />
              </div>

              {/* 태그 */}
              {challenge.tags && challenge.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {challenge.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-white/50 rounded-lg text-sm text-[var(--border-dark)]/70 border border-[var(--border-dark)]/20"
                      style={{ fontFamily: "var(--font-gaegu), cursive" }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* 제작자 */}
              <div
                className="text-sm text-[var(--border-dark)]/50 mb-6"
                style={{ fontFamily: "var(--font-gaegu), cursive" }}
              >
                제작: {challenge.creatorName}
              </div>

              {/* 플레이/영상 생성 버튼 */}
              <WobblyButton
                variant="success"
                size="xl"
                className="w-full"
                onClick={() => setIsPlaying(true)}
              >
                {isPresetChallenge ? "📹 영상 생성 시작" : "▶️ 플레이 시작"}
              </WobblyButton>
            </div>
          </PlayfulCard>
        </motion.div>

        {/* 게임/영상 생성 방법 안내 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8"
        >
          <PlayfulCard color="white" className="p-6" hoverEffect={false}>
            <h2
              className="text-xl font-bold text-[var(--border-dark)] mb-4"
              style={{ fontFamily: "var(--font-gaegu), cursive" }}
            >
              {isPresetChallenge ? "📹 영상 생성 방법" : "🎯 플레이 방법"}
            </h2>
            <ul
              className="space-y-2 text-[var(--border-dark)]/70"
              style={{ fontFamily: "var(--font-gaegu), cursive" }}
            >
              {isPresetChallenge ? (
                <>
                  <li className="flex items-start gap-2">
                    <span className="text-xl">1️⃣</span>
                    <span>화면 녹화를 먼저 시작하세요 (Mac: Cmd+Shift+5, Windows: Win+G)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-xl">2️⃣</span>
                    <span>"영상 생성 시작" 버튼을 클릭하세요</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-xl">3️⃣</span>
                    <span>3초 카운트다운 후 자동으로 40개 단어가 재생됩니다</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-xl">4️⃣</span>
                    <span>완료되면 화면 녹화를 중지하고 영상을 저장하세요</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-xl">5️⃣</span>
                    <span>저장된 영상을 틱톡/유튜브의 "Say The Word On Beat" 음원과 함께 업로드하세요!</span>
                  </li>
                </>
              ) : (
                <>
                  <li className="flex items-start gap-2">
                    <span className="text-xl">1️⃣</span>
                    <span>화면에 이미지가 나타나면 해당 단어를 말해요</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-xl">2️⃣</span>
                    <span>비트에 맞춰 스페이스바 또는 화면을 터치해요</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-xl">3️⃣</span>
                    <span>타이밍이 정확할수록 높은 점수! Perfect를 노려보세요</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-xl">4️⃣</span>
                    <span>연속으로 맞추면 콤보 보너스 점수를 받아요</span>
                  </li>
                </>
              )}
            </ul>
          </PlayfulCard>
        </motion.div>
      </div>
    </div>
  );
}

// 통계 아이템
function StatItem({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="text-center">
      <span className="text-2xl block mb-1">{icon}</span>
      <p
        className="text-lg font-bold text-[var(--border-dark)]"
        style={{ fontFamily: "var(--font-gaegu), cursive" }}
      >
        {value}
      </p>
      <p
        className="text-xs text-[var(--border-dark)]/50"
        style={{ fontFamily: "var(--font-gaegu), cursive" }}
      >
        {label}
      </p>
    </div>
  );
}
