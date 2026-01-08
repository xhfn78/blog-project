"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/shared/lib/cn";
import { PlayfulCard } from "@/shared/ui/playful-card";
import { WobblyButton } from "@/shared/ui/wobbly-button";
import { CATEGORY_INFO, DIFFICULTY_INFO, type ChallengeCategory, type Difficulty } from "@/entities/challenge";
import type { Challenge, WordItem, Beat } from "@/entities/challenge";

interface CreatorWizardProps {
  onComplete: (challenge: Challenge) => void;
  onCancel: () => void;
}

type Step = "info" | "words" | "settings" | "preview";

interface ChallengeFormData {
  title: string;
  description: string;
  category: ChallengeCategory;
  difficulty: Difficulty;
  bpm: number;
  words: WordItem[];
}

const initialFormData: ChallengeFormData = {
  title: "",
  description: "",
  category: "custom",
  difficulty: "medium",
  bpm: 100,
  words: [],
};

export function CreatorWizard({ onComplete, onCancel }: CreatorWizardProps) {
  const [step, setStep] = useState<Step>("info");
  const [formData, setFormData] = useState<ChallengeFormData>(initialFormData);

  const steps: Step[] = ["info", "words", "settings", "preview"];
  const currentStepIndex = steps.indexOf(step);

  const goNext = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setStep(steps[nextIndex]);
    }
  };

  const goPrev = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setStep(steps[prevIndex]);
    }
  };

  const updateFormData = useCallback((updates: Partial<ChallengeFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  }, []);

  const handleComplete = () => {
    // 챌린지 생성
    const beats: Beat[] = formData.words.map((_, i) => ({
      id: `beat-${i}`,
      index: i,
      timestamp: i * (60000 / formData.bpm),
      duration: 60000 / formData.bpm * 0.8,
    }));

    const challenge: Challenge = {
      id: `custom-${Date.now()}`,
      title: formData.title,
      description: formData.description,
      category: formData.category,
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      bpm: formData.bpm,
      startOffset: 0,
      beats,
      words: formData.words.map((w, i) => ({ ...w, beatIndex: i })),
      difficulty: formData.difficulty,
      duration: formData.words.length * (60 / formData.bpm) + 5,
      creatorId: "user",
      creatorName: "나",
      createdAt: new Date(),
      updatedAt: new Date(),
      published: false,
      playCount: 0,
      upvotes: 0,
      downvotes: 0,
      thumbnailUrls: formData.words.slice(0, 3).map((w) => w.imageUrl || ""),
      tags: [],
    };

    onComplete(challenge);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-playful)] py-8 px-4">
      <div className="container mx-auto max-w-2xl">
        {/* 진행 표시 */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center">
                <motion.div
                  className={cn(
                    "w-10 h-10 rounded-full border-3 border-[var(--border-dark)] flex items-center justify-center font-bold",
                    i <= currentStepIndex
                      ? "bg-[var(--playful-yellow)] shadow-[3px_3px_0px_var(--border-dark)]"
                      : "bg-white"
                  )}
                  animate={{ scale: i === currentStepIndex ? 1.1 : 1 }}
                  style={{ fontFamily: "var(--font-gaegu), cursive" }}
                >
                  {i + 1}
                </motion.div>
                {i < steps.length - 1 && (
                  <div
                    className={cn(
                      "w-16 h-1 mx-2",
                      i < currentStepIndex ? "bg-[var(--playful-yellow)]" : "bg-gray-200"
                    )}
                  />
                )}
              </div>
            ))}
          </div>
          <p
            className="text-center text-lg text-[var(--border-dark)]"
            style={{ fontFamily: "var(--font-gaegu), cursive" }}
          >
            {step === "info" && "📝 기본 정보"}
            {step === "words" && "🖼️ 단어 추가"}
            {step === "settings" && "⚙️ 설정"}
            {step === "preview" && "👀 미리보기"}
          </p>
        </div>

        {/* 스텝 컨텐츠 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {step === "info" && (
              <StepInfo formData={formData} updateFormData={updateFormData} />
            )}
            {step === "words" && (
              <StepWords formData={formData} updateFormData={updateFormData} />
            )}
            {step === "settings" && (
              <StepSettings formData={formData} updateFormData={updateFormData} />
            )}
            {step === "preview" && <StepPreview formData={formData} />}
          </motion.div>
        </AnimatePresence>

        {/* 네비게이션 버튼 */}
        <div className="mt-8 flex items-center justify-between">
          <WobblyButton
            variant="ghost"
            size="md"
            onClick={currentStepIndex === 0 ? onCancel : goPrev}
          >
            {currentStepIndex === 0 ? "취소" : "← 이전"}
          </WobblyButton>

          {step === "preview" ? (
            <WobblyButton
              variant="success"
              size="lg"
              onClick={handleComplete}
              disabled={formData.words.length === 0 || !formData.title}
            >
              ✨ 완료
            </WobblyButton>
          ) : (
            <WobblyButton
              variant="primary"
              size="lg"
              onClick={goNext}
              disabled={
                (step === "info" && (!formData.title || !formData.description)) ||
                (step === "words" && formData.words.length === 0)
              }
            >
              다음 →
            </WobblyButton>
          )}
        </div>
      </div>
    </div>
  );
}

// Step 1: 기본 정보
interface StepProps {
  formData: ChallengeFormData;
  updateFormData: (updates: Partial<ChallengeFormData>) => void;
}

function StepInfo({ formData, updateFormData }: StepProps) {
  const categories = Object.values(CATEGORY_INFO);

  return (
    <PlayfulCard color="white" className="p-6" hoverEffect={false}>
      <div className="space-y-6">
        {/* 제목 */}
        <div>
          <label
            className="block text-lg font-bold text-[var(--border-dark)] mb-2"
            style={{ fontFamily: "var(--font-gaegu), cursive" }}
          >
            챌린지 제목 *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => updateFormData({ title: e.target.value })}
            placeholder="예: 과일 챌린지"
            className="w-full px-4 py-3 rounded-xl border-3 border-[var(--border-dark)] text-lg"
            style={{ fontFamily: "var(--font-gaegu), cursive" }}
          />
        </div>

        {/* 설명 */}
        <div>
          <label
            className="block text-lg font-bold text-[var(--border-dark)] mb-2"
            style={{ fontFamily: "var(--font-gaegu), cursive" }}
          >
            설명 *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => updateFormData({ description: e.target.value })}
            placeholder="챌린지에 대한 간단한 설명을 적어주세요"
            rows={3}
            className="w-full px-4 py-3 rounded-xl border-3 border-[var(--border-dark)] text-lg resize-none"
            style={{ fontFamily: "var(--font-gaegu), cursive" }}
          />
        </div>

        {/* 카테고리 */}
        <div>
          <label
            className="block text-lg font-bold text-[var(--border-dark)] mb-2"
            style={{ fontFamily: "var(--font-gaegu), cursive" }}
          >
            카테고리
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => updateFormData({ category: cat.id })}
                className={cn(
                  "px-4 py-2 rounded-full border-2 border-[var(--border-dark)] font-bold transition-all",
                  formData.category === cat.id
                    ? "shadow-[3px_3px_0px_var(--border-dark)]"
                    : "bg-white hover:bg-gray-100"
                )}
                style={{
                  fontFamily: "var(--font-gaegu), cursive",
                  backgroundColor: formData.category === cat.id ? cat.color : undefined,
                }}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </PlayfulCard>
  );
}

// Step 2: 단어 추가
function StepWords({ formData, updateFormData }: StepProps) {
  const [newWord, setNewWord] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");

  const addWord = () => {
    if (!newWord.trim()) return;

    const word: WordItem = {
      id: `word-${Date.now()}`,
      text: newWord.trim(),
      imageUrl: newImageUrl.trim() || `https://em-content.zobj.net/source/apple/391/speech-balloon_1f4ac.png`,
      beatIndex: formData.words.length,
    };

    updateFormData({ words: [...formData.words, word] });
    setNewWord("");
    setNewImageUrl("");
  };

  const removeWord = (id: string) => {
    updateFormData({
      words: formData.words.filter((w) => w.id !== id),
    });
  };

  return (
    <PlayfulCard color="white" className="p-6" hoverEffect={false}>
      <div className="space-y-6">
        {/* 단어 입력 */}
        <div className="space-y-4">
          <div>
            <label
              className="block text-lg font-bold text-[var(--border-dark)] mb-2"
              style={{ fontFamily: "var(--font-gaegu), cursive" }}
            >
              단어 *
            </label>
            <input
              type="text"
              value={newWord}
              onChange={(e) => setNewWord(e.target.value)}
              placeholder="예: 사과"
              className="w-full px-4 py-3 rounded-xl border-3 border-[var(--border-dark)] text-lg"
              style={{ fontFamily: "var(--font-gaegu), cursive" }}
              onKeyDown={(e) => e.key === "Enter" && addWord()}
            />
          </div>

          <div>
            <label
              className="block text-lg font-bold text-[var(--border-dark)] mb-2"
              style={{ fontFamily: "var(--font-gaegu), cursive" }}
            >
              이미지 URL (선택)
            </label>
            <input
              type="url"
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              placeholder="https://example.com/image.png"
              className="w-full px-4 py-3 rounded-xl border-3 border-[var(--border-dark)] text-lg"
              style={{ fontFamily: "var(--font-gaegu), cursive" }}
            />
          </div>

          <WobblyButton
            variant="secondary"
            size="md"
            onClick={addWord}
            disabled={!newWord.trim()}
          >
            ➕ 단어 추가
          </WobblyButton>
        </div>

        {/* 단어 목록 */}
        <div>
          <p
            className="text-lg font-bold text-[var(--border-dark)] mb-3"
            style={{ fontFamily: "var(--font-gaegu), cursive" }}
          >
            추가된 단어 ({formData.words.length}개)
          </p>

          {formData.words.length === 0 ? (
            <p
              className="text-center py-8 text-[var(--border-dark)]/50"
              style={{ fontFamily: "var(--font-gaegu), cursive" }}
            >
              아직 추가된 단어가 없어요
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {formData.words.map((word, index) => (
                <motion.div
                  key={word.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="relative p-3 rounded-xl border-2 border-[var(--border-dark)] bg-[var(--playful-yellow)]/30"
                >
                  <button
                    onClick={() => removeWord(word.id)}
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[var(--playful-coral)] border-2 border-[var(--border-dark)] text-white text-xs font-bold"
                  >
                    ×
                  </button>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-[var(--border-dark)]/50">{index + 1}</span>
                    {word.imageUrl && (
                      <img
                        src={word.imageUrl}
                        alt={word.text}
                        className="w-8 h-8 rounded object-cover"
                      />
                    )}
                    <span
                      className="font-bold text-[var(--border-dark)]"
                      style={{ fontFamily: "var(--font-gaegu), cursive" }}
                    >
                      {word.text}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PlayfulCard>
  );
}

// Step 3: 설정
function StepSettings({ formData, updateFormData }: StepProps) {
  const difficulties = Object.values(DIFFICULTY_INFO);

  return (
    <PlayfulCard color="white" className="p-6" hoverEffect={false}>
      <div className="space-y-6">
        {/* BPM */}
        <div>
          <label
            className="block text-lg font-bold text-[var(--border-dark)] mb-2"
            style={{ fontFamily: "var(--font-gaegu), cursive" }}
          >
            🎵 BPM (속도): {formData.bpm}
          </label>
          <input
            type="range"
            min="60"
            max="180"
            value={formData.bpm}
            onChange={(e) => updateFormData({ bpm: Number(e.target.value) })}
            className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-sm text-[var(--border-dark)]/50 mt-1">
            <span>느림 (60)</span>
            <span>보통 (120)</span>
            <span>빠름 (180)</span>
          </div>
        </div>

        {/* 난이도 */}
        <div>
          <label
            className="block text-lg font-bold text-[var(--border-dark)] mb-2"
            style={{ fontFamily: "var(--font-gaegu), cursive" }}
          >
            📊 난이도
          </label>
          <div className="flex gap-3">
            {difficulties.map((diff) => (
              <button
                key={diff.id}
                onClick={() => updateFormData({ difficulty: diff.id })}
                className={cn(
                  "flex-1 py-3 rounded-xl border-3 border-[var(--border-dark)] font-bold transition-all",
                  formData.difficulty === diff.id
                    ? "shadow-[4px_4px_0px_var(--border-dark)]"
                    : "bg-white hover:bg-gray-100"
                )}
                style={{
                  fontFamily: "var(--font-gaegu), cursive",
                  backgroundColor: formData.difficulty === diff.id ? diff.color : undefined,
                }}
              >
                {diff.icon} {diff.name}
              </button>
            ))}
          </div>
        </div>

        {/* 예상 시간 */}
        <div
          className="p-4 rounded-xl bg-[var(--playful-mint)]/30 border-2 border-[var(--border-dark)]"
          style={{ fontFamily: "var(--font-gaegu), cursive" }}
        >
          <p className="text-[var(--border-dark)]">
            ⏱️ 예상 플레이 시간:{" "}
            <strong>
              {Math.ceil(formData.words.length * (60 / formData.bpm) + 5)}초
            </strong>
          </p>
        </div>
      </div>
    </PlayfulCard>
  );
}

// Step 4: 미리보기
function StepPreview({ formData }: { formData: ChallengeFormData }) {
  const categoryInfo = CATEGORY_INFO[formData.category];
  const difficultyInfo = DIFFICULTY_INFO[formData.difficulty];

  return (
    <PlayfulCard color={categoryInfo.color} className="overflow-hidden" hoverEffect={false}>
      {/* 썸네일 */}
      <div className="h-40 bg-white/50 flex items-center justify-center overflow-hidden">
        {formData.words.slice(0, 4).map((word, i) => (
          <motion.img
            key={word.id}
            src={word.imageUrl}
            alt={word.text}
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: -15 + i * 10 }}
            transition={{ delay: i * 0.1, type: "spring" }}
            className="absolute w-14 h-14 rounded-xl border-3 border-[var(--border-dark)] shadow-[3px_3px_0px_var(--border-dark)]"
            style={{ left: `${15 + i * 20}%` }}
          />
        ))}
      </div>

      {/* 정보 */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span
            className="px-3 py-1 rounded-full border-2 border-[var(--border-dark)] text-sm font-bold"
            style={{ backgroundColor: categoryInfo.color }}
          >
            {categoryInfo.icon} {categoryInfo.name}
          </span>
          <span
            className="px-3 py-1 rounded-full border-2 border-[var(--border-dark)] text-sm font-bold"
            style={{ backgroundColor: difficultyInfo.color }}
          >
            {difficultyInfo.icon} {difficultyInfo.name}
          </span>
        </div>

        <h2
          className="text-2xl font-bold text-[var(--border-dark)] mb-2"
          style={{ fontFamily: "var(--font-gaegu), cursive" }}
        >
          {formData.title || "제목 없음"}
        </h2>

        <p
          className="text-[var(--border-dark)]/70 mb-4"
          style={{ fontFamily: "var(--font-gaegu), cursive" }}
        >
          {formData.description || "설명 없음"}
        </p>

        <div className="flex items-center gap-4 text-sm text-[var(--border-dark)]/60">
          <span>🎵 {formData.bpm} BPM</span>
          <span>📝 {formData.words.length}개 단어</span>
        </div>
      </div>
    </PlayfulCard>
  );
}
