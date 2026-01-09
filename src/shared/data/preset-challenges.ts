/**
 * Say The Word On Beat 프리셋 챌린지
 * 실제 음원(/audio/say-the-word-on-beat.webm)에 맞춰 타이밍 조정됨
 */

import type { Challenge } from "@/entities/challenge";

/**
 * 음원 설정
 * - 개발 환경: 로컬 음원 사용
 * - 프로덕션: 음원 제거 (사용자가 유튜브/틱톡 음원과 함께 사용)
 */
const AUDIO_URL = process.env.NODE_ENV === "development"
  ? "/audio/say-the-word-on-beat.webm"
  : "";

/**
 * Say The Word On Beat 음원 분석 결과
 *
 * 구조:
 * - 인트로: "Moo Ma Ga Gai, 1 2 3 GO!" (약 3초)
 * - 본 게임: 4박자 리듬
 * - BPM: 약 130 (추정, 실제 음원 들으면서 조정 필요)
 *
 * TODO: 실제 음원을 들으면서 다음 값들을 fine-tuning 해야 함
 * - BPM
 * - startOffset (인트로 끝나는 시점)
 * - 각 비트의 정확한 타이밍
 */
const BEAT_CONFIG = {
  bpm: 130,
  startOffset: 3000, // 인트로 3초 (조정 필요)
  beatInterval: (60 / 130) * 1000, // 약 461ms
};

/**
 * 운율 챌린지 #1: sun/gun/run/fun 계열
 * 영상 생성용 (총 40개 단어)
 * - Stage 1-5: 각 8개씩 (8 × 5 = 40개)
 */
const SUN_WORDS = [
  // Stage 1 (8개)
  { text: "sun", emoji: "☀️", url: "https://em-content.zobj.net/source/apple/391/sun_2600-fe0f.png" },
  { text: "gun", emoji: "🔫", url: "https://em-content.zobj.net/source/apple/391/pistol_1f52b.png" },
  { text: "run", emoji: "🏃", url: "https://em-content.zobj.net/source/apple/391/person-running_1f3c3.png" },
  { text: "fun", emoji: "🎉", url: "https://em-content.zobj.net/source/apple/391/party-popper_1f389.png" },
  { text: "bun", emoji: "🍔", url: "https://em-content.zobj.net/source/apple/391/hamburger_1f354.png" },
  { text: "ton", emoji: "⚖️", url: "https://em-content.zobj.net/source/apple/391/balance-scale_2696-fe0f.png" },
  { text: "won", emoji: "🏆", url: "https://em-content.zobj.net/source/apple/391/trophy_1f3c6.png" },
  { text: "one", emoji: "1️⃣", url: "https://em-content.zobj.net/source/apple/391/digit-one_0031-fe0f-20e3.png" },

  // Stage 2 (8개)
  { text: "done", emoji: "✅", url: "https://em-content.zobj.net/source/apple/391/check-mark-button_2705.png" },
  { text: "none", emoji: "🚫", url: "https://em-content.zobj.net/source/apple/391/prohibited_1f6ab.png" },
  { text: "son", emoji: "👦", url: "https://em-content.zobj.net/source/apple/391/boy_1f466.png" },
  { text: "nun", emoji: "👩", url: "https://em-content.zobj.net/source/apple/391/woman_1f469.png" },
  { text: "pun", emoji: "😄", url: "https://em-content.zobj.net/source/apple/391/grinning-face-with-big-eyes_1f603.png" },
  { text: "spun", emoji: "🔄", url: "https://em-content.zobj.net/source/apple/391/counterclockwise-arrows-button_1f504.png" },
  { text: "stun", emoji: "😲", url: "https://em-content.zobj.net/source/apple/391/astonished-face_1f632.png" },
  { text: "shun", emoji: "🙅", url: "https://em-content.zobj.net/source/apple/391/person-gesturing-no_1f645.png" },

  // Stage 3 (8개)
  { text: "hon", emoji: "🍯", url: "https://em-content.zobj.net/source/apple/391/honey-pot_1f36f.png" },
  { text: "dun", emoji: "🟤", url: "https://em-content.zobj.net/source/apple/391/brown-circle_1f7e4.png" },
  { text: "hun", emoji: "💕", url: "https://em-content.zobj.net/source/apple/391/two-hearts_1f495.png" },
  { text: "begun", emoji: "▶️", url: "https://em-content.zobj.net/source/apple/391/play-button_25b6-fe0f.png" },
  { text: "outrun", emoji: "💨", url: "https://em-content.zobj.net/source/apple/391/dashing-away_1f4a8.png" },
  { text: "rerun", emoji: "🔁", url: "https://em-content.zobj.net/source/apple/391/repeat-button_1f501.png" },
  { text: "undone", emoji: "↩️", url: "https://em-content.zobj.net/source/apple/391/right-arrow-curving-left_21a9-fe0f.png" },
  { text: "overdone", emoji: "🔥", url: "https://em-content.zobj.net/source/apple/391/fire_1f525.png" },

  // Stage 4 (8개)
  { text: "homerun", emoji: "⚾", url: "https://em-content.zobj.net/source/apple/391/baseball_26be.png" },
  { text: "shotgun", emoji: "🎯", url: "https://em-content.zobj.net/source/apple/391/direct-hit_1f3af.png" },
  { text: "someone", emoji: "🤷", url: "https://em-content.zobj.net/source/apple/391/person-shrugging_1f937.png" },
  { text: "anyone", emoji: "👤", url: "https://em-content.zobj.net/source/apple/391/bust-in-silhouette_1f464.png" },
  { text: "everyone", emoji: "👥", url: "https://em-content.zobj.net/source/apple/391/busts-in-silhouette_1f465.png" },
  { text: "no one", emoji: "🚷", url: "https://em-content.zobj.net/source/apple/391/no-pedestrians_1f6b7.png" },
  { text: "upon", emoji: "⬆️", url: "https://em-content.zobj.net/source/apple/391/up-arrow_2b06-fe0f.png" },
  { text: "salon", emoji: "💇", url: "https://em-content.zobj.net/source/apple/391/person-getting-haircut_1f487.png" },

  // Stage 5 (8개)
  { text: "wagon", emoji: "🚗", url: "https://em-content.zobj.net/source/apple/391/automobile_1f697.png" },
  { text: "dragon", emoji: "🐉", url: "https://em-content.zobj.net/source/apple/391/dragon_1f409.png" },
  { text: "weapon", emoji: "⚔️", url: "https://em-content.zobj.net/source/apple/391/crossed-swords_2694-fe0f.png" },
  { text: "reason", emoji: "💡", url: "https://em-content.zobj.net/source/apple/391/light-bulb_1f4a1.png" },
  { text: "season", emoji: "🍂", url: "https://em-content.zobj.net/source/apple/391/fallen-leaf_1f342.png" },
  { text: "prison", emoji: "🔒", url: "https://em-content.zobj.net/source/apple/391/locked_1f512.png" },
  { text: "lesson", emoji: "📚", url: "https://em-content.zobj.net/source/apple/391/books_1f4da.png" },
  { text: "person", emoji: "🧑", url: "https://em-content.zobj.net/source/apple/391/person_1f9d1.png" },
];

export const RHYME_SUN_CHALLENGE: Challenge = {
  id: "preset-rhyme-sun",
  title: "☀️ Sun 운율 마스터",
  description: "sun, gun, run! 40개 단어로 영상 생성하기 🎬",
  category: "rhymes",

  audioUrl: AUDIO_URL,
  bpm: 130, // 고정 BPM (스테이지별로 변경되지 않음)
  startOffset: BEAT_CONFIG.startOffset,

  // 비트 생성 (40개 단어)
  beats: Array.from({ length: 40 }, (_, i) => ({
    id: `beat-${i}`,
    index: i,
    timestamp: BEAT_CONFIG.startOffset + i * BEAT_CONFIG.beatInterval,
    duration: BEAT_CONFIG.beatInterval * 0.8,
  })),

  // 단어 데이터 (40개 = 8개 × 5스테이지)
  words: SUN_WORDS.map((word, i) => ({
    id: `word-${i}`,
    text: word.text,
    imageUrl: word.url,
    beatIndex: i,
  })),

  difficulty: "medium",
  duration: 60, // 40개 단어 × 0.46초 ≈ 18초 + 여유

  creatorId: "system",
  creatorName: "BeatOnWord",
  createdAt: new Date("2026-01-09"),
  updatedAt: new Date("2026-01-09"),
  published: true,

  playCount: 0,
  upvotes: 0,
  downvotes: 0,
  thumbnailUrls: SUN_WORDS.slice(0, 4).map((w) => w.url),
  tags: ["rhyme", "영어", "sun계열", "영상생성", "40단어"],
};

/**
 * TODO: 추가 프리셋 챌린지 (향후 확장)
 * - cat/hat/bat 계열
 * - rock/clock/sock 계열
 * - 한국어 숫자
 * - 한국어 과일
 * 등을 28개 단어씩 추가 예정
 */

/**
 * 모든 프리셋 챌린지
 */
export const PRESET_CHALLENGES: Challenge[] = [
  RHYME_SUN_CHALLENGE,
  // 추가 챌린지는 여기에 추가
];

/**
 * ID로 프리셋 챌린지 찾기
 */
export function getPresetChallenge(id: string): Challenge | undefined {
  return PRESET_CHALLENGES.find((c) => c.id === id);
}

/**
 * 카테고리별 프리셋 챌린지 필터링
 */
export function getPresetChallengesByCategory(
  category: Challenge["category"]
): Challenge[] {
  return PRESET_CHALLENGES.filter((c) => c.category === category);
}

/**
 * 난이도별 프리셋 챌린지 필터링
 */
export function getPresetChallengesByDifficulty(
  difficulty: Challenge["difficulty"]
): Challenge[] {
  return PRESET_CHALLENGES.filter((c) => c.difficulty === difficulty);
}
