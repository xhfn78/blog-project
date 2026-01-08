/**
 * BeatOnWord 게임 상태 스토어 (Zustand)
 * 5단계 스테이지 시스템 지원
 */

import { create } from "zustand";
import type {
  Challenge,
  WordItem,
  GameStatus,
  HitTiming,
  GameResult,
} from "@/entities/challenge";
import { BeatSyncEngine } from "../lib/beat-sync";
import { BeatSoundPlayer, getBeatSoundPlayer } from "../lib/beat-sound";
import {
  judgeHitTiming,
  calculateScore,
  calculateFinalResult,
} from "../lib/score-system";
import {
  STAGES,
  TOTAL_STAGES,
  getStageConfig,
  distributeWordsToStages,
  STAGE_TRANSITION_DELAY,
  type StageConfig,
} from "../lib/stage-config";

interface GameStore {
  // 상태
  challenge: Challenge | null;
  status: GameStatus;
  currentBeatIndex: number;
  currentWord: WordItem | null;
  currentWordIndex: number;

  // 스테이지
  currentStage: number;
  stageWords: WordItem[][];
  stageConfig: StageConfig | null;
  wordsCompletedInStage: number;
  isStageTransition: boolean;

  // 점수
  score: number;
  combo: number;
  maxCombo: number;
  perfectHits: number;
  goodHits: number;
  missedHits: number;

  // 타이밍
  elapsedTime: number;

  // 엔진 (내부 관리)
  _beatEngine: BeatSyncEngine | null;
  _soundPlayer: BeatSoundPlayer | null;

  // 액션
  initGame: (challenge: Challenge) => Promise<void>;
  startCountdown: () => void;
  startGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  endGame: () => void;
  resetGame: () => void;

  // 스테이지
  nextStage: () => void;
  advanceWord: () => void;

  // 게임 로직
  recordHit: (timing: HitTiming) => void;
  checkHit: (targetBeatIndex: number) => HitTiming;

  // 결과
  getResult: () => GameResult | null;
}

const initialState = {
  challenge: null,
  status: "idle" as GameStatus,
  currentBeatIndex: 0,
  currentWord: null,
  currentWordIndex: 0,

  // 스테이지
  currentStage: 1,
  stageWords: [] as WordItem[][],
  stageConfig: null as StageConfig | null,
  wordsCompletedInStage: 0,
  isStageTransition: false,

  score: 0,
  combo: 0,
  maxCombo: 0,
  perfectHits: 0,
  goodHits: 0,
  missedHits: 0,
  elapsedTime: 0,
  _beatEngine: null,
  _soundPlayer: null,
};

export const useGameStore = create<GameStore>((set, get) => ({
  ...initialState,

  /**
   * 게임 초기화
   */
  initGame: async (challenge: Challenge) => {
    // 기존 엔진 정리
    const { _beatEngine: oldEngine } = get();
    if (oldEngine) {
      oldEngine.dispose();
    }

    // 단어를 스테이지별로 분배
    const stageWords = distributeWordsToStages(challenge.words);
    const firstStageConfig = getStageConfig(1);

    // 새 엔진 생성 (첫 스테이지 BPM으로 시작)
    const engine = new BeatSyncEngine(firstStageConfig.bpm, challenge.startOffset);
    const soundPlayer = getBeatSoundPlayer();

    try {
      await engine.init();
      await soundPlayer.init();
      await engine.loadAudio(challenge.audioUrl);

      // 비트 콜백 설정
      engine.onBeat((beatIndex) => {
        const { status, currentStage, stageWords, currentWordIndex } = get();
        if (status !== "playing") return;

        // 비트 사운드 재생
        const isAccent = beatIndex % 4 === 0;
        soundPlayer.playBeat(isAccent);

        set({
          currentBeatIndex: beatIndex,
          elapsedTime: engine.getCurrentTime(),
        });
      });

      // 첫 번째 단어 설정
      const firstWord = stageWords[0]?.[0] || null;

      set({
        ...initialState,
        challenge,
        stageWords,
        stageConfig: firstStageConfig,
        currentStage: 1,
        currentWord: firstWord,
        currentWordIndex: 0,
        _beatEngine: engine,
        _soundPlayer: soundPlayer,
        status: "idle",
      });
    } catch (error) {
      console.error("Failed to initialize game:", error);
      throw error;
    }
  },

  /**
   * 카운트다운 시작
   */
  startCountdown: () => {
    set({ status: "countdown" });
  },

  /**
   * 게임 시작
   */
  startGame: () => {
    const { _beatEngine } = get();
    if (!_beatEngine) return;

    _beatEngine.start();
    set({ status: "playing" });
  },

  /**
   * 일시 정지
   */
  pauseGame: () => {
    const { _beatEngine } = get();
    if (!_beatEngine) return;

    _beatEngine.pause();
    set({ status: "paused" });
  },

  /**
   * 재개
   */
  resumeGame: () => {
    const { _beatEngine } = get();
    if (!_beatEngine) return;

    _beatEngine.resume();
    set({ status: "playing" });
  },

  /**
   * 게임 종료
   */
  endGame: () => {
    const { _beatEngine } = get();
    if (_beatEngine) {
      _beatEngine.stop();
    }
    set({ status: "finished" });
  },

  /**
   * 게임 리셋
   */
  resetGame: () => {
    const { _beatEngine } = get();
    if (_beatEngine) {
      _beatEngine.stop();
    }

    set({
      status: "idle",
      currentBeatIndex: 0,
      currentWord: null,
      currentWordIndex: 0,
      currentStage: 1,
      wordsCompletedInStage: 0,
      isStageTransition: false,
      score: 0,
      combo: 0,
      maxCombo: 0,
      perfectHits: 0,
      goodHits: 0,
      missedHits: 0,
      elapsedTime: 0,
    });
  },

  /**
   * 다음 스테이지로 전환
   */
  nextStage: () => {
    const { currentStage, _beatEngine, _soundPlayer, stageWords } = get();

    if (currentStage >= TOTAL_STAGES) {
      // 마지막 스테이지 완료 - 게임 종료
      get().endGame();
      return;
    }

    const nextStageNum = currentStage + 1;
    const nextStageConfig = getStageConfig(nextStageNum);

    // 스테이지 전환 사운드
    _soundPlayer?.playStageUp();

    // BPM 변경
    _beatEngine?.setBpm(nextStageConfig.bpm);

    // 다음 스테이지의 첫 번째 단어
    const nextStageWords = stageWords[nextStageNum - 1] || [];
    const firstWord = nextStageWords[0] || null;

    set({
      currentStage: nextStageNum,
      stageConfig: nextStageConfig,
      wordsCompletedInStage: 0,
      currentWord: firstWord,
      currentWordIndex: 0,
      isStageTransition: false,
    });
  },

  /**
   * 다음 단어로 진행
   */
  advanceWord: () => {
    const {
      currentStage,
      stageWords,
      currentWordIndex,
      wordsCompletedInStage,
    } = get();

    const currentStageWords = stageWords[currentStage - 1] || [];
    const nextWordIndex = currentWordIndex + 1;
    const newWordsCompleted = wordsCompletedInStage + 1;

    // 현재 스테이지의 모든 단어 완료
    if (nextWordIndex >= currentStageWords.length) {
      if (currentStage >= TOTAL_STAGES) {
        // 마지막 스테이지 완료
        get().endGame();
      } else {
        // 스테이지 전환 시작
        set({ isStageTransition: true });

        // 잠시 후 다음 스테이지로
        setTimeout(() => {
          get().nextStage();
        }, STAGE_TRANSITION_DELAY);
      }
      return;
    }

    // 다음 단어 설정
    const nextWord = currentStageWords[nextWordIndex];
    set({
      currentWord: nextWord,
      currentWordIndex: nextWordIndex,
      wordsCompletedInStage: newWordsCompleted,
    });
  },

  /**
   * 히트 기록
   */
  recordHit: (timing: HitTiming) => {
    const {
      combo,
      maxCombo,
      perfectHits,
      goodHits,
      missedHits,
      score,
      _soundPlayer,
    } = get();

    const result = calculateScore(timing, combo);

    // 성공 사운드
    if (timing === "perfect" || timing === "good") {
      _soundPlayer?.playSuccess();
    }

    set({
      score: score + result.points,
      combo: result.newCombo,
      maxCombo: Math.max(maxCombo, result.newCombo),
      perfectHits: timing === "perfect" ? perfectHits + 1 : perfectHits,
      goodHits: timing === "good" ? goodHits + 1 : goodHits,
      missedHits: timing === "miss" ? missedHits + 1 : missedHits,
    });

    // 다음 단어로 진행 (miss가 아닐 때만)
    if (timing !== "miss") {
      get().advanceWord();
    }
  },

  /**
   * 히트 체크 (타이밍 기반)
   */
  checkHit: (targetBeatIndex: number) => {
    const { _beatEngine, currentBeatIndex } = get();
    if (!_beatEngine) return "miss";

    // 비트 인덱스 차이를 시간 차이로 변환
    const beatInterval = _beatEngine.getBeatInterval();
    const timingDiff = (currentBeatIndex - targetBeatIndex) * beatInterval;

    const timing = judgeHitTiming(timingDiff);
    get().recordHit(timing);

    return timing;
  },

  /**
   * 결과 가져오기
   */
  getResult: () => {
    const {
      challenge,
      score,
      maxCombo,
      perfectHits,
      goodHits,
      missedHits,
      currentStage,
    } = get();

    if (!challenge) return null;

    return calculateFinalResult(
      challenge.id,
      score,
      maxCombo,
      perfectHits,
      goodHits,
      missedHits
    );
  },
}));

// 선택자 (Selectors)
export const selectIsPlaying = (state: GameStore) => state.status === "playing";
export const selectIsFinished = (state: GameStore) => state.status === "finished";
export const selectCurrentWord = (state: GameStore) => state.currentWord;
export const selectScore = (state: GameStore) => state.score;
export const selectCombo = (state: GameStore) => state.combo;
export const selectCurrentStage = (state: GameStore) => state.currentStage;
export const selectStageConfig = (state: GameStore) => state.stageConfig;
