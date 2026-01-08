/**
 * 챌린지 카테고리 메타데이터
 */

import type { ChallengeCategory, Difficulty } from "./types";

// 카테고리 정보
export interface CategoryInfo {
  id: ChallengeCategory;
  name: string;
  nameEn: string;
  icon: string;
  color: string;
  description: string;
}

// 카테고리 메타데이터
export const CATEGORY_INFO: Record<ChallengeCategory, CategoryInfo> = {
  numbers: {
    id: "numbers",
    name: "숫자",
    nameEn: "Numbers",
    icon: "🔢",
    color: "var(--playful-yellow)",
    description: "숫자를 보고 빠르게 말해보세요!",
  },
  colors: {
    id: "colors",
    name: "색상",
    nameEn: "Colors",
    icon: "🎨",
    color: "var(--playful-pink)",
    description: "알록달록 색상을 맞춰보세요!",
  },
  animals: {
    id: "animals",
    name: "동물",
    nameEn: "Animals",
    icon: "🐾",
    color: "var(--playful-mint)",
    description: "귀여운 동물 친구들을 알아보세요!",
  },
  food: {
    id: "food",
    name: "음식",
    nameEn: "Food",
    icon: "🍎",
    color: "var(--playful-orange)",
    description: "맛있는 음식 이름을 말해보세요!",
  },
  rhymes: {
    id: "rhymes",
    name: "운율",
    nameEn: "Rhymes",
    icon: "🎤",
    color: "var(--playful-purple)",
    description: "운율에 맞춰 랩처럼 말해보세요!",
  },
  custom: {
    id: "custom",
    name: "커스텀",
    nameEn: "Custom",
    icon: "✨",
    color: "var(--playful-blue)",
    description: "나만의 챌린지를 만들어보세요!",
  },
};

// 난이도 정보
export interface DifficultyInfo {
  id: Difficulty;
  name: string;
  nameEn: string;
  icon: string;
  color: string;
  description: string;
  bpmRange: { min: number; max: number };
  wordCount: { min: number; max: number };
}

export const DIFFICULTY_INFO: Record<Difficulty, DifficultyInfo> = {
  easy: {
    id: "easy",
    name: "쉬움",
    nameEn: "Easy",
    icon: "⭐",
    color: "var(--playful-mint)",
    description: "천천히 따라해보세요",
    bpmRange: { min: 60, max: 90 },
    wordCount: { min: 5, max: 10 },
  },
  medium: {
    id: "medium",
    name: "보통",
    nameEn: "Medium",
    icon: "⭐⭐",
    color: "var(--playful-yellow)",
    description: "적당한 속도로 도전!",
    bpmRange: { min: 90, max: 120 },
    wordCount: { min: 10, max: 20 },
  },
  hard: {
    id: "hard",
    name: "어려움",
    nameEn: "Hard",
    icon: "⭐⭐⭐",
    color: "var(--playful-coral)",
    description: "빠른 비트에 맞춰보세요!",
    bpmRange: { min: 120, max: 180 },
    wordCount: { min: 20, max: 40 },
  },
};

// 카테고리 목록
export const CATEGORIES = Object.values(CATEGORY_INFO);

// 난이도 목록
export const DIFFICULTIES = Object.values(DIFFICULTY_INFO);

// 헬퍼 함수
export function getCategoryInfo(category: ChallengeCategory): CategoryInfo {
  return CATEGORY_INFO[category];
}

export function getDifficultyInfo(difficulty: Difficulty): DifficultyInfo {
  return DIFFICULTY_INFO[difficulty];
}

export function getCategoryColor(category: ChallengeCategory): string {
  return CATEGORY_INFO[category].color;
}

export function getDifficultyColor(difficulty: Difficulty): string {
  return DIFFICULTY_INFO[difficulty].color;
}
