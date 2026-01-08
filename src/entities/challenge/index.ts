/**
 * Challenge Entity
 * BeatOnWord 챌린지 엔티티 모듈
 */

// Types
export type {
  ChallengeCategory,
  Difficulty,
  Beat,
  WordItem,
  Challenge,
  HitTiming,
  GameResult,
  Grade,
  GameStatus,
  GameState,
  CreateChallengeInput,
  ChallengeSummary,
} from "./model/types";

// Category metadata
export {
  CATEGORY_INFO,
  DIFFICULTY_INFO,
  CATEGORIES,
  DIFFICULTIES,
  getCategoryInfo,
  getDifficultyInfo,
  getCategoryColor,
  getDifficultyColor,
} from "./model/category";

export type { CategoryInfo, DifficultyInfo } from "./model/category";
