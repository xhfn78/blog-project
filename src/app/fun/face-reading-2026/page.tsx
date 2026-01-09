"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { PlayfulCard } from "@/shared/ui/playful-card";
import { WobblyButton } from "@/shared/ui/wobbly-button";
import { getZodiacInfo } from "@/features/fun/face-reading-2026/data/zodiac-2026";
import type { FortuneResult } from "@/entities/fun";

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
    if (/^\d{0,4}$/.test(value)) {
      setBirthYear(value);
      const year = parseInt(value);
      if (value.length === 4 && year >= 1900 && year <= 2030) {
        setZodiacInfo(getZodiacInfo(year));
      } else {
        setZodiacInfo(null);
      }
    }
  };

  const handleStart = () => {
    if (!birthYear || !zodiacInfo) return;
    setStep("camera");
  };

  const handleCapture = (imageData: string) => {
    setCapturedImage(imageData);
    setStep("analyzing");
  };

  const handleAnalysisComplete = async () => {
    try {
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

  const handleRestart = () => {
    setStep("landing");
    setBirthYear("");
    setZodiacInfo(null);
    setCapturedImage("");
    setFortuneResult(null);
  };

  const currentYear = new Date().getFullYear();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* 랜딩 스크린 */}
      {step === "landing" && (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 py-8 px-4">
          <div className="container mx-auto max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <div className="text-7xl mb-4">🔮</div>
              <h1 className="text-4xl font-bold text-[var(--border-dark)] mb-2" style={{ fontFamily: "var(--font-gaegu), cursive" }}>2026년 대박 날 관상인가?</h1>
              <p className="text-xl text-[var(--border-dark)]/70" style={{ fontFamily: "var(--font-gaegu), cursive" }}>AI가 당신의 얼굴을 분석해 2026년 운세를 알려드립니다</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <PlayfulCard color="white" className="p-8">
                <div className="mb-6">
                  <label htmlFor="birthYear" className="block text-lg font-bold text-[var(--border-dark)] mb-2" style={{ fontFamily: "var(--font-gaegu), cursive" }}>생년을 입력하세요</label>
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
                </div>

                {zodiacInfo && (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mb-6 p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl border-3 border-[var(--border-dark)] text-center">
                    <span className="text-5xl mb-2 block">{zodiacInfo.emoji}</span>
                    <p className="text-2xl font-bold text-[var(--border-dark)] mb-1" style={{ fontFamily: "var(--font-gaegu), cursive" }}>{zodiacInfo.name}</p>
                    <p className="text-lg text-[var(--border-dark)]/80" style={{ fontFamily: "var(--font-gaegu), cursive" }}>{zodiacInfo.fortuneTitle}</p>
                  </motion.div>
                )}

                <WobblyButton variant="success" size="xl" className="w-full" onClick={handleStart} disabled={!birthYear || !zodiacInfo}>
                  {zodiacInfo ? "🎬 얼굴 분석 시작" : "생년을 입력하세요"}
                </WobblyButton>
              </PlayfulCard>
            </motion.div>
          </div>
        </div>
      )}

      {step === "camera" && <CameraCapture onCapture={handleCapture} onBack={() => setStep("landing")} />}
      {step === "analyzing" && <AnalyzingLoader onComplete={handleAnalysisComplete} />}
      {step === "result" && fortuneResult && <ResultScreen result={fortuneResult} capturedImage={capturedImage} onRestart={handleRestart} />}
    </>
  );
}