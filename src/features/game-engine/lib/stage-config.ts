/**
 * 5단계 스테이지 설정
 * 비트가 점점 빨라지는 게임 구조
 */

export interface StageConfig {
  stage: number;
  name: string;
  bpm: number;
  wordsPerStage: number;
  description: string;
  color: string;
}

// 5단계 스테이지 설정
export const STAGES: StageConfig[] = [
  {
    stage: 1,
    name: "워밍업",
    bpm: 80,
    wordsPerStage: 4,
    description: "천천히 시작해볼까요?",
    color: "var(--playful-mint)",
  },
  {
    stage: 2,
    name: "기본",
    bpm: 100,
    wordsPerStage: 5,
    description: "조금 빨라졌어요!",
    color: "var(--playful-yellow)",
  },
  {
    stage: 3,
    name: "도전",
    bpm: 120,
    wordsPerStage: 6,
    description: "이제 진짜 시작이에요!",
    color: "var(--playful-orange)",
  },
  {
    stage: 4,
    name: "고속",
    bpm: 140,
    wordsPerStage: 6,
    description: "빠른 비트에 집중!",
    color: "var(--playful-pink)",
  },
  {
    stage: 5,
    name: "마스터",
    bpm: 160,
    wordsPerStage: 7,
    description: "최종 스테이지! 🔥",
    color: "var(--playful-purple)",
  },
];

export const TOTAL_STAGES = STAGES.length;

export function getStageConfig(stage: number): StageConfig {
  return STAGES[Math.min(stage - 1, STAGES.length - 1)];
}

export function getStageByBpm(bpm: number): StageConfig {
  // BPM에 가장 가까운 스테이지 찾기
  return STAGES.reduce((closest, stage) => {
    return Math.abs(stage.bpm - bpm) < Math.abs(closest.bpm - bpm) ? stage : closest;
  });
}

// 스테이지별 단어 배분
export function distributeWordsToStages<T>(words: T[]): T[][] {
  const stages: T[][] = [];
  let wordIndex = 0;

  for (const stageConfig of STAGES) {
    const stageWords = words.slice(wordIndex, wordIndex + stageConfig.wordsPerStage);
    stages.push(stageWords);
    wordIndex += stageConfig.wordsPerStage;

    // 단어가 더 없으면 종료
    if (wordIndex >= words.length) break;
  }

  // 남은 단어는 마지막 스테이지에 추가
  if (wordIndex < words.length) {
    const lastStage = stages[stages.length - 1];
    lastStage.push(...words.slice(wordIndex));
  }

  return stages;
}

// 스테이지 전환 시 대기 시간 (ms)
export const STAGE_TRANSITION_DELAY = 2000;

// 카운트다운 시간 (초)
export const COUNTDOWN_SECONDS = 3;
