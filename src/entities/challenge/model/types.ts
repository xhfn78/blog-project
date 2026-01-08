/**
 * BeatOnWord Challenge 타입 정의
 */

// 챌린지 카테고리
export type ChallengeCategory =
  | "numbers"   // 숫자
  | "colors"    // 색상
  | "animals"   // 동물
  | "food"      // 음식
  | "rhymes"    // 운율
  | "custom";   // 사용자 정의

// 난이도
export type Difficulty = "easy" | "medium" | "hard";

// 비트 정보
export interface Beat {
  id: string;
  index: number;           // 비트 순서
  timestamp: number;       // 밀리초 단위
  duration: number;        // 표시 지속 시간 (ms)
}

// 단어 아이템
export interface WordItem {
  id: string;
  text: string;            // 단어 텍스트 (예: "사과")
  imageUrl?: string;       // 이미지 URL
  beatIndex: number;       // 어떤 비트에 표시될지
  correctAnswer?: string;  // 정답 (발음 검증용, 선택적)
}

// 챌린지 메인 타입
export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: ChallengeCategory;

  // 오디오 설정
  audioUrl: string;
  bpm: number;             // Beats Per Minute
  startOffset: number;     // 오디오 시작 오프셋 (ms)

  // 게임 데이터
  beats: Beat[];
  words: WordItem[];
  difficulty: Difficulty;
  duration: number;        // 총 게임 시간 (초)

  // 메타데이터
  creatorId: string;
  creatorName?: string;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;

  // 커뮤니티 데이터
  playCount: number;
  upvotes: number;
  downvotes: number;
  thumbnailUrls: string[]; // 최대 4개 (부채꼴 표시용)

  // 태그
  tags: string[];
}

// 게임 결과 타입
export type HitTiming = "perfect" | "good" | "miss";

export interface GameResult {
  challengeId: string;
  totalScore: number;
  grade: Grade;
  accuracy: number;        // 0-100
  maxCombo: number;
  perfectCount: number;
  goodCount: number;
  missCount: number;
  playedAt: Date;
}

// 등급
export type Grade = "S" | "A" | "B" | "C" | "D" | "F";

// 게임 상태
export type GameStatus = "idle" | "countdown" | "playing" | "paused" | "finished";

// 게임 상태 인터페이스
export interface GameState {
  // 현재 상태
  status: GameStatus;
  challenge: Challenge | null;
  currentBeatIndex: number;
  currentWord: WordItem | null;

  // 점수
  score: number;
  combo: number;
  maxCombo: number;
  perfectHits: number;
  goodHits: number;
  missedHits: number;

  // 타이밍
  elapsedTime: number;
  lastBeatTime: number;
}

// 챌린지 생성 입력
export interface CreateChallengeInput {
  title: string;
  description: string;
  category: ChallengeCategory;
  audioUrl: string;
  bpm: number;
  words: Omit<WordItem, "id">[];
  difficulty: Difficulty;
  tags?: string[];
}

// 챌린지 요약 (목록 표시용)
export interface ChallengeSummary {
  id: string;
  title: string;
  category: ChallengeCategory;
  difficulty: Difficulty;
  playCount: number;
  upvotes: number;
  thumbnailUrls: string[];
  creatorName?: string;
}
