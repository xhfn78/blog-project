"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { PlayfulCard } from "@/shared/ui/playful-card";
import { WobblyButton } from "@/shared/ui/wobbly-button";
import { getZodiacInfo } from "@/features/fun/face-reading-2026/data/zodiac-2026";
import type { FortuneResult } from "@/entities/fun";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "2026년 AI 관상 분석 - 나의 신년 운세 확인하기",
  description: "최신 AI 기술로 68개 얼굴 포인트를 분석하여 2026년 재물운, 애정운을 알려드립니다. 완벽한 프라이버시 보호.",
  keywords: ["2026년운세", "AI관상", "얼굴분석", "신년운세", "무료관상"],
};

// face-api를 사용하는 컴포넌트들은 동적 import
const CameraCapture = dynamic(
  () => import("@/features/fun/face-reading-2026/ui/camera-capture").then((mod) => ({ default: mod.CameraCapture })),
  { ssr: false }
);

const AnalyzingLoader = dynamic(
  () => import("@/features/fun/face-reading-2026/ui/analyzing-loader").then((mod) => ({ default: mod.AnalyzingLoader })),
  { ssr: false }
);

const ResultScreen = dynamic(
  () => import("@/features/fun/face-reading-2026/ui/result-screen").then((mod) => ({ default: mod.ResultScreen })),
  { ssr: false }
);

type Step = "landing" | "camera" | "analyzing" | "result";

export default function FaceReading2026Page() {
  const [step, setStep] = useState<Step>("landing");
  const [birthYear, setBirthYear] = useState<string>("");
  const [zodiacInfo, setZodiacInfo] = useState<ReturnType<typeof getZodiacInfo> | null>(null);
  const [capturedImage, setCapturedImage] = useState<string>("");
  const [fortuneResult, setFortuneResult] = useState<FortuneResult | null>(null);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "2026 AI 관상 분석",
    "applicationCategory": "EntertainmentApplication",
    "description": "AI를 이용한 얼굴 특징 분석 및 2026년 신년 운세 서비스"
  };

  // 생년 입력 핸들러
  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // 숫자만 입력 가능, 최대 4자리
    if (/^\d{0,4}$/.test(value)) {
      setBirthYear(value);

      // 유효한 연도인지 확인
      const year = parseInt(value);
      if (value.length === 4 && year >= 1900 && year <= 2030) {
        setZodiacInfo(getZodiacInfo(year));
      } else {
        setZodiacInfo(null);
      }
    }
  };

  // 시작하기
  const handleStart = () => {
    if (!birthYear || !zodiacInfo) return;
    setStep("camera");
  };

  // 이미지 캡처 후 분석 시작
  const handleCapture = (imageData: string) => {
    setCapturedImage(imageData);
    setStep("analyzing");
  };

  // 분석 완료
  const handleAnalysisComplete = async () => {
    try {
      // 동적 import로 face-api 로드 (클라이언트에서만)
      const { analyzeImageForFortune } = await import(
        "@/features/fun/face-reading-2026/lib/analyze-service"
      );

      const result = await analyzeImageForFortune(capturedImage, parseInt(birthYear));

      setFortuneResult(result);
      setStep("result");
    } catch (error) {
      console.error("분석 오류:", error);
      alert("얼굴 분석에 실패했습니다. 다시 시도해주세요.");
      setStep("camera");
    }
  };

  // 재시작
  const handleRestart = () => {
    setStep("landing");
    setBirthYear("");
    setZodiacInfo(null);
    setCapturedImage("");
    setFortuneResult(null);
  };

  // 공유하기
  const handleShare = async () => {
    const shareText = fortuneResult?.shareText || "2026년 AI 관상 테스트 결과를 확인하세요!";
    const shareUrl = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "2026년 AI 관상 테스트",
          text: shareText,
          url: shareUrl,
        });
      } catch (error) {
        console.log("공유 취소됨");
      }
    } else {
      // 폴백: URL 복사
      navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      alert("링크가 클립보드에 복사되었습니다!");
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* 랜딩 스크린 */}
      {step === "landing" && (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 py-8 px-4">
          <div className="container mx-auto max-w-2xl">
            {/* 헤더 */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="text-7xl mb-4"
              >
                🔮
              </motion.div>
              <h1
                className="text-4xl font-bold text-[var(--border-dark)] mb-2"
                style={{ fontFamily: "var(--font-gaegu), cursive" }}
              >
                2026년 대박 날 관상인가?
              </h1>
              <p
                className="text-xl text-[var(--border-dark)]/70"
                style={{ fontFamily: "var(--font-gaegu), cursive" }}
              >
                AI가 당신의 얼굴을 분석해 2026년 운세를 알려드립니다
              </p>
            </motion.div>

            {/* 메인 카드 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <PlayfulCard color="white" className="p-8">
                <div className="mb-6 text-center">
                  <p
                    className="text-lg text-[var(--border-dark)]/80 mb-4"
                    style={{ fontFamily: "var(--font-gaegu), cursive" }}
                  >
                    병오년(丙午年) 🐴 <strong>붉은 말의 해</strong>를 맞아<br />
                    AI가 당신의 관상을 분석합니다
                  </p>
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="birthYear"
                    className="block text-lg font-bold text-[var(--border-dark)] mb-2"
                    style={{ fontFamily: "var(--font-gaegu), cursive" }}
                  >
                    생년을 입력하세요
                  </label>
                  <input
                    type="text"
                    id="birthYear"
                    value={birthYear}
                    onChange={handleYearChange}
                    placeholder="예: 1990"
                    maxLength={4}
                    className="w-full px-4 py-3 text-2xl text-center border-4 border-[var(--border-dark)] rounded-2xl font-bold shadow-[4px_4px_0px_var(--border-dark)] focus:shadow-[6px_6px_0px_var(--border-dark)] transition-all outline-none"
                    style={{ fontFamily: "var(--font-gaegu), cursive" }}
                  />
                  <p
                    className="mt-2 text-sm text-[var(--border-dark)]/60"
                    style={{ fontFamily: "var(--font-gaegu), cursive" }}
                  >
                    {currentYear - 100}년 ~ {currentYear - 10}년 사이를 입력하세요
                  </p>
                </div>

                {zodiacInfo && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-6 p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl border-3 border-[var(--border-dark)]"
                  >
                    <div className="text-center">
                      <span className="text-5xl mb-2 block">{zodiacInfo.emoji}</span>
                      <p
                        className="text-2xl font-bold text-[var(--border-dark)] mb-1"
                        style={{ fontFamily: "var(--font-gaegu), cursive" }}
                      >
                        {zodiacInfo.name}
                      </p>
                      <p
                        className="text-lg text-[var(--border-dark)]/80"
                        style={{ fontFamily: "var(--font-gaegu), cursive" }}
                      >
                        {zodiacInfo.fortuneTitle}
                      </p>
                    </div>
                  </motion.div>
                )}

                <WobblyButton
                  variant="success"
                  size="xl"
                  className="w-full"
                  onClick={handleStart}
                  disabled={!birthYear || !zodiacInfo}
                >
                  {zodiacInfo ? "🎬 얼굴 분석 시작" : "생년을 입력하세요"}
                </WobblyButton>

                <div className="mt-6 p-4 bg-yellow-50 rounded-xl border-2 border-yellow-200">
                  <p
                    className="text-sm text-[var(--border-dark)]/70 text-center"
                    style={{ fontFamily: "var(--font-gaegu), cursive" }}
                  >
                    💡 카메라 권한이 필요합니다<br />
                    분석 결과는 저장되지 않으며 재미로만 봐주세요
                  </p>
                </div>
              </PlayfulCard>
            </motion.div>

            {/* 하단 정보 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 text-center"
            >
              <PlayfulCard color="var(--playful-mint)" className="p-6">
                <h3
                  className="text-xl font-bold text-[var(--border-dark)] mb-3"
                  style={{ fontFamily: "var(--font-gaegu), cursive" }}
                >
                  🎯 어떻게 분석하나요?
                </h3>
                <ul
                  className="text-left space-y-2 text-[var(--border-dark)]/70"
                  style={{ fontFamily: "var(--font-gaegu), cursive" }}
                >
                  <li className="flex items-start gap-2">
                    <span>✨</span>
                    <span>AI가 68개 얼굴 랜드마크를 정밀 분석합니다</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>🎭</span>
                    <span>눈썹, 눈, 코, 입 등 각 부위별 관상을 해석합니다</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>🔮</span>
                    <span>2026년 띠별 운세와 결합하여 월별 조언을 제공합니다</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>💰</span>
                    <span>재물운, 사업운, 애정운 등 5가지 운세를 분석합니다</span>
                  </li>
                </ul>
              </PlayfulCard>
            </motion.div>
          </div>
        </div>
      )}

      {/* 카메라 스크린 */}
      {step === "camera" && (
        <CameraCapture onCapture={handleCapture} onBack={() => setStep("landing")} />
      )}

      {/* 분석 로딩 */}
      {step === "analyzing" && <AnalyzingLoader onComplete={handleAnalysisComplete} />}

      {/* 결과 화면 */}
      {step === "result" && fortuneResult && (
        <ResultScreen
          result={fortuneResult}
          capturedImage={capturedImage}
          onRestart={handleRestart}
        />
      )}
    </>
  );
}
