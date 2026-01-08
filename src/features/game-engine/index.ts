/**
 * BeatOnWord Game Engine
 * 게임 로직 및 상태 관리 모듈
 */

// Store
export { useGameStore } from "./store/game-store";
export {
  selectIsPlaying,
  selectIsFinished,
  selectCurrentWord,
  selectScore,
  selectCombo,
  selectCurrentStage,
  selectStageConfig,
} from "./store/game-store";

// Beat Sync
export {
  BeatSyncEngine,
  getBeatSyncEngine,
  disposeBeatSyncEngine,
} from "./lib/beat-sync";
export type { BeatCallback } from "./lib/beat-sync";

// Score System
export {
  SCORE_CONFIG,
  GRADE_THRESHOLDS,
  judgeHitTiming,
  calculateScore,
  calculateAccuracy,
  calculateGrade,
  calculateFinalResult,
  getGradeMessage,
  getGradeColor,
} from "./lib/score-system";

// Hooks
export {
  useGame,
  useCountdown,
  useHitFeedback,
  useGameInput,
  useTouchInput,
} from "./hooks/use-game";

// Beat Sound
export {
  BeatSoundPlayer,
  getBeatSoundPlayer,
  disposeBeatSoundPlayer,
} from "./lib/beat-sound";

// Stage Config
export {
  STAGES,
  TOTAL_STAGES,
  getStageConfig,
  getStageByBpm,
  distributeWordsToStages,
  STAGE_TRANSITION_DELAY,
  COUNTDOWN_SECONDS,
} from "./lib/stage-config";
export type { StageConfig } from "./lib/stage-config";
