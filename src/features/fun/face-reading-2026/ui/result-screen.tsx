"use client";

import { motion } from "framer-motion";
import type { FortuneResult } from "@/entities/fun";
import { PlayfulCard } from "@/shared/ui/playful-card";
import { WobblyButton } from "@/shared/ui/wobbly-button";
import { getZodiacInfo } from "../data/zodiac-2026";

interface ResultScreenProps {
  result: FortuneResult;
  capturedImage: string;
  onRestart: () => void;
}

export function ResultScreen({
  result,
  capturedImage,
  onRestart,
}: ResultScreenProps) {
  const zodiacInfo = getZodiacInfo(result.birthYear);

  // 공유 기능
  const handleShare = async () => {
    const shareText = `🔮 2026년 나의 관상 분석 결과
    
내 관상 등급: [${result.grade}]
종합 점수: ${result.totalScore}점
한줄평: "${result.viralMessage}"

나의 2026년 운세가 궁금하다면? 지금 바로 확인해보세요!
#2026관상 #AI운세 #신년운세`;

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "2026 AI 관상 분석",
          text: shareText,
          url: window.location.origin + "/fun/face-reading-2026",
        });
      } catch (err) {
        console.error("공유 실패:", err);
      }
    } else {
      // 클립보드 복사
      try {
        await navigator.clipboard.writeText(shareText + "\n" + window.location.origin + "/fun/face-reading-2026");
        alert("분석 결과가 클립보드에 복사되었습니다! 친구들에게 공유해보세요.");
      } catch (err) {
        alert("공유하기를 지원하지 않는 브라우저입니다.");
      }
    }
  };

  // 재시작 시 최상단 이동 포함
  const handleRestartWithScroll = () => {
    window.scrollTo({ top: 0, behavior: "instant" });
    onRestart();
  };

  // 등급별 색상
  const gradeColors = {
    S: "from-yellow-400 to-orange-500",
    A: "from-green-400 to-emerald-500",
    B: "from-blue-400 to-cyan-500",
    C: "from-purple-400 to-pink-500",
    D: "from-gray-400 to-slate-500",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 py-8 px-4">
      <div className="container mx-auto max-w-3xl space-y-6">
        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1
            className="text-3xl font-bold text-[var(--border-dark)] mb-2"
            style={{ fontFamily: "var(--font-gaegu), cursive" }}
          >
            🔮 2026년 관상 분석 결과
          </h1>
          <p
            className="text-lg text-[var(--border-dark)]/70"
            style={{ fontFamily: "var(--font-gaegu), cursive" }}
          >
            {zodiacInfo.emoji} {zodiacInfo.name} - {zodiacInfo.fortuneTitle}
          </p>
        </motion.div>

        {/* 총점 & 등급 카드 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <PlayfulCard color="white" className="p-6 overflow-hidden relative">
            <div className={`absolute inset-0 bg-gradient-to-br ${gradeColors[result.grade]} opacity-10`} />

            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p
                  className="text-sm text-[var(--border-dark)]/70 mb-1"
                  style={{ fontFamily: "var(--font-gaegu), cursive" }}
                >
                  종합 운세 점수
                </p>
                <p
                  className="text-6xl font-bold text-[var(--border-dark)]"
                  style={{ fontFamily: "var(--font-gaegu), cursive" }}
                >
                  {result.totalScore}
                  <span className="text-3xl">점</span>
                </p>
              </div>

              <div className="text-right">
                <div
                  className={`inline-block px-6 py-3 rounded-2xl bg-gradient-to-r ${gradeColors[result.grade]} text-white text-4xl font-bold border-4 border-[var(--border-dark)] shadow-[4px_4px_0px_var(--border-dark)]`}
                >
                  {result.grade}
                </div>
              </div>
            </div>
          </PlayfulCard>
        </motion.div>

        {/* 바이럴 메시지 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <PlayfulCard color="var(--playful-yellow)" className="p-6">
            <p
              className="text-2xl font-bold text-center text-[var(--border-dark)]"
              style={{ fontFamily: "var(--font-gaegu), cursive" }}
            >
              {result.viralMessage}
            </p>
          </PlayfulCard>
        </motion.div>

        {/* 운세별 점수 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <PlayfulCard color="white" className="p-6">
            <h2
              className="text-2xl font-bold text-[var(--border-dark)] mb-4"
              style={{ fontFamily: "var(--font-gaegu), cursive" }}
            >
              📊 운세별 점수
            </h2>

            <div className="space-y-4">
              {Object.entries(result.luckScores).map(([key, value]) => {
                const names = {
                  wealth: "💰 재물운",
                  career: "💼 사업운",
                  love: "❤️ 애정운",
                  health: "🏥 건강운",
                  social: "👥 대인운",
                };

                return (
                  <div key={key}>
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className="font-bold text-[var(--border-dark)]"
                        style={{ fontFamily: "var(--font-gaegu), cursive" }}
                      >
                        {names[key as keyof typeof names]}
                      </span>
                      <span
                        className="text-2xl font-bold text-[var(--border-dark)]"
                        style={{ fontFamily: "var(--font-gaegu), cursive" }}
                      >
                        {value}점
                      </span>
                    </div>

                    <div className="relative h-6 bg-gray-200 rounded-full overflow-hidden border-3 border-[var(--border-dark)]">
                      <motion.div
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${value}%` }}
                        transition={{ duration: 1, delay: 0.5 + Object.keys(result.luckScores).indexOf(key) * 0.1 }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </PlayfulCard>
        </motion.div>

        {/* 얼굴 특징 분석 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <PlayfulCard color="white" className="p-6">
            <h2
              className="text-2xl font-bold text-[var(--border-dark)] mb-4"
              style={{ fontFamily: "var(--font-gaegu), cursive" }}
            >
              👤 얼굴 특징 분석
            </h2>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <img
                  src={capturedImage}
                  alt="분석된 얼굴"
                  className="w-full rounded-xl border-4 border-[var(--border-dark)]"
                />
              </div>

              <div className="flex flex-col justify-center">
                <div className="space-y-2">
                  <p
                    className="text-lg font-bold text-[var(--border-dark)]"
                    style={{ fontFamily: "var(--font-gaegu), cursive" }}
                  >
                    {result.faceType}
                  </p>
                  {result.keyFeatures.slice(0, 3).map((feature, idx) => (
                    <div key={idx} className="text-sm">
                      <span
                        className="font-bold text-[var(--border-dark)]"
                        style={{ fontFamily: "var(--font-gaegu), cursive" }}
                      >
                        {feature.feature}:
                      </span>
                      <span
                        className="text-[var(--border-dark)]/70 ml-1"
                        style={{ fontFamily: "var(--font-gaegu), cursive" }}
                      >
                        {feature.description}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 강점 */}
              <div className="p-4 bg-green-50 rounded-xl border-2 border-green-200">
                <h3
                  className="font-bold text-green-700 mb-2"
                  style={{ fontFamily: "var(--font-gaegu), cursive" }}
                >
                  ✅ 강점
                </h3>
                <ul className="space-y-1">
                  {result.strengths.map((strength, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-[var(--border-dark)]/70"
                      style={{ fontFamily: "var(--font-gaegu), cursive" }}
                    >
                      • {strength}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 주의사항 */}
              <div className="p-4 bg-yellow-50 rounded-xl border-2 border-yellow-200">
                <h3
                  className="font-bold text-yellow-700 mb-2"
                  style={{ fontFamily: "var(--font-gaegu), cursive" }}
                >
                  ⚠️ 주의사항
                </h3>
                <ul className="space-y-1">
                  {result.warnings.map((warning, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-[var(--border-dark)]/70"
                      style={{ fontFamily: "var(--font-gaegu), cursive" }}
                    >
                      • {warning}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </PlayfulCard>
        </motion.div>

        {/* 월별 조언 (상위 6개월) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <PlayfulCard color="white" className="p-6">
            <h2
              className="text-2xl font-bold text-[var(--border-dark)] mb-4"
              style={{ fontFamily: "var(--font-gaegu), cursive" }}
            >
              📅 2026년 월별 하이라이트
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {result.monthlyAdvice.filter((m) => zodiacInfo.luckyMonths.includes(m.month)).slice(0, 6).map((advice) => (
                <div
                  key={advice.month}
                  className="p-3 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl border-2 border-[var(--border-dark)]"
                >
                  <p
                    className="text-xl font-bold text-[var(--border-dark)] mb-1"
                    style={{ fontFamily: "var(--font-gaegu), cursive" }}
                  >
                    {advice.month}월
                  </p>
                  <p
                    className="text-sm text-[var(--border-dark)]/70"
                    style={{ fontFamily: "var(--font-gaegu), cursive" }}
                  >
                    {advice.theme}
                  </p>
                  {advice.warning && (
                    <p
                      className="text-xs text-red-600 mt-1"
                      style={{ fontFamily: "var(--font-gaegu), cursive" }}
                    >
                      ⚠️ {advice.warning}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </PlayfulCard>
        </motion.div>

        {/* 럭키 아이템 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <PlayfulCard color="var(--playful-mint)" className="p-6">
            <h2
              className="text-2xl font-bold text-[var(--border-dark)] mb-4"
              style={{ fontFamily: "var(--font-gaegu), cursive" }}
            >
              🍀 럭키 아이템
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p
                  className="font-bold text-[var(--border-dark)] mb-2"
                  style={{ fontFamily: "var(--font-gaegu), cursive" }}
                >
                  🎨 색상
                </p>
                <div className="flex flex-wrap gap-2">
                  {result.luckyItems.colors.map((color, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-white rounded-full text-sm border-2 border-[var(--border-dark)]"
                      style={{ fontFamily: "var(--font-gaegu), cursive" }}
                    >
                      {color}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p
                  className="font-bold text-[var(--border-dark)] mb-2"
                  style={{ fontFamily: "var(--font-gaegu), cursive" }}
                >
                  🔢 숫자
                </p>
                <div className="flex flex-wrap gap-2">
                  {result.luckyItems.numbers.map((num, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-white rounded-full text-sm border-2 border-[var(--border-dark)] font-bold"
                      style={{ fontFamily: "var(--font-gaegu), cursive" }}
                    >
                      {num}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p
                  className="font-bold text-[var(--border-dark)] mb-2"
                  style={{ fontFamily: "var(--font-gaegu), cursive" }}
                >
                  ✨ 아이템
                </p>
                <div className="space-y-1">
                  {result.luckyItems.items.map((item, idx) => (
                    <p
                      key={idx}
                      className="text-sm text-[var(--border-dark)]/70"
                      style={{ fontFamily: "var(--font-gaegu), cursive" }}
                    >
                      • {item}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </PlayfulCard>
        </motion.div>

        {/* 공유 버튼 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="space-y-4"
        >
          <div className="flex gap-3">
            <WobblyButton variant="success" size="xl" className="flex-1" onClick={handleShare}>
              📤 결과 공유하기
            </WobblyButton>
            <WobblyButton variant="secondary" size="xl" className="flex-1" onClick={handleRestartWithScroll}>
              🔄 다시 분석
            </WobblyButton>
          </div>
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 text-center">
            <p 
              className="text-lg text-red-600 font-bold leading-tight"
              style={{ fontFamily: "var(--font-gaegu), cursive" }}
            >
              ※ 사진은 결과에 포함되거나 공유되지 않으니 안심하세요! 🔒
            </p>
          </div>
        </motion.div>

        {/* 해시태그 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <p
            className="text-sm text-[var(--border-dark)]/60"
            style={{ fontFamily: "var(--font-gaegu), cursive" }}
          >
            {result.hashtags.join(" ")}
          </p>
        </motion.div>
      </div>
    </div>
  );
}