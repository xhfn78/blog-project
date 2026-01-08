/**
 * 샘플 챌린지 데이터
 */

import type { Challenge } from "@/entities/challenge";

// 샘플 오디오 URL (무료 비트)
const SAMPLE_AUDIO_URL = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

export const SAMPLE_CHALLENGES: Challenge[] = [
  {
    id: "numbers-basic",
    title: "숫자 기초",
    description: "1부터 10까지 숫자를 비트에 맞춰 말해보세요!",
    category: "numbers",
    audioUrl: SAMPLE_AUDIO_URL,
    bpm: 90,
    startOffset: 0,
    beats: Array.from({ length: 10 }, (_, i) => ({
      id: `beat-${i}`,
      index: i,
      timestamp: i * (60000 / 90),
      duration: 500,
    })),
    words: [
      { id: "w1", text: "1", imageUrl: "https://em-content.zobj.net/source/apple/391/keycap-digit-one_31-fe0f-20e3.png", beatIndex: 0 },
      { id: "w2", text: "2", imageUrl: "https://em-content.zobj.net/source/apple/391/keycap-digit-two_32-fe0f-20e3.png", beatIndex: 1 },
      { id: "w3", text: "3", imageUrl: "https://em-content.zobj.net/source/apple/391/keycap-digit-three_33-fe0f-20e3.png", beatIndex: 2 },
      { id: "w4", text: "4", imageUrl: "https://em-content.zobj.net/source/apple/391/keycap-digit-four_34-fe0f-20e3.png", beatIndex: 3 },
      { id: "w5", text: "5", imageUrl: "https://em-content.zobj.net/source/apple/391/keycap-digit-five_35-fe0f-20e3.png", beatIndex: 4 },
      { id: "w6", text: "6", imageUrl: "https://em-content.zobj.net/source/apple/391/keycap-digit-six_36-fe0f-20e3.png", beatIndex: 5 },
      { id: "w7", text: "7", imageUrl: "https://em-content.zobj.net/source/apple/391/keycap-digit-seven_37-fe0f-20e3.png", beatIndex: 6 },
      { id: "w8", text: "8", imageUrl: "https://em-content.zobj.net/source/apple/391/keycap-digit-eight_38-fe0f-20e3.png", beatIndex: 7 },
      { id: "w9", text: "9", imageUrl: "https://em-content.zobj.net/source/apple/391/keycap-digit-nine_39-fe0f-20e3.png", beatIndex: 8 },
      { id: "w10", text: "10", imageUrl: "https://em-content.zobj.net/source/apple/391/keycap-10_1f51f.png", beatIndex: 9 },
    ],
    difficulty: "easy",
    duration: 30,
    creatorId: "system",
    creatorName: "비트온워드",
    createdAt: new Date("2025-01-01"),
    updatedAt: new Date("2025-01-01"),
    published: true,
    playCount: 1250,
    upvotes: 89,
    downvotes: 3,
    thumbnailUrls: [
      "https://em-content.zobj.net/source/apple/391/keycap-digit-one_31-fe0f-20e3.png",
      "https://em-content.zobj.net/source/apple/391/keycap-digit-two_32-fe0f-20e3.png",
      "https://em-content.zobj.net/source/apple/391/keycap-digit-three_33-fe0f-20e3.png",
    ],
    tags: ["숫자", "기초", "쉬움", "입문"],
  },
  {
    id: "colors-rainbow",
    title: "무지개 색상",
    description: "빨주노초파남보! 무지개 색상을 말해보세요!",
    category: "colors",
    audioUrl: SAMPLE_AUDIO_URL,
    bpm: 100,
    startOffset: 0,
    beats: Array.from({ length: 7 }, (_, i) => ({
      id: `beat-${i}`,
      index: i,
      timestamp: i * (60000 / 100),
      duration: 500,
    })),
    words: [
      { id: "c1", text: "빨강", imageUrl: "https://em-content.zobj.net/source/apple/391/red-circle_1f534.png", beatIndex: 0 },
      { id: "c2", text: "주황", imageUrl: "https://em-content.zobj.net/source/apple/391/orange-circle_1f7e0.png", beatIndex: 1 },
      { id: "c3", text: "노랑", imageUrl: "https://em-content.zobj.net/source/apple/391/yellow-circle_1f7e1.png", beatIndex: 2 },
      { id: "c4", text: "초록", imageUrl: "https://em-content.zobj.net/source/apple/391/green-circle_1f7e2.png", beatIndex: 3 },
      { id: "c5", text: "파랑", imageUrl: "https://em-content.zobj.net/source/apple/391/blue-circle_1f535.png", beatIndex: 4 },
      { id: "c6", text: "남색", imageUrl: "https://em-content.zobj.net/source/apple/391/purple-circle_1f7e3.png", beatIndex: 5 },
      { id: "c7", text: "보라", imageUrl: "https://em-content.zobj.net/source/apple/391/purple-heart_1f49c.png", beatIndex: 6 },
    ],
    difficulty: "easy",
    duration: 25,
    creatorId: "system",
    creatorName: "비트온워드",
    createdAt: new Date("2025-01-02"),
    updatedAt: new Date("2025-01-02"),
    published: true,
    playCount: 980,
    upvotes: 72,
    downvotes: 5,
    thumbnailUrls: [
      "https://em-content.zobj.net/source/apple/391/red-circle_1f534.png",
      "https://em-content.zobj.net/source/apple/391/orange-circle_1f7e0.png",
      "https://em-content.zobj.net/source/apple/391/yellow-circle_1f7e1.png",
    ],
    tags: ["색상", "무지개", "쉬움"],
  },
  {
    id: "animals-farm",
    title: "농장 동물",
    description: "귀여운 농장 동물 친구들을 알아보세요!",
    category: "animals",
    audioUrl: SAMPLE_AUDIO_URL,
    bpm: 110,
    startOffset: 0,
    beats: Array.from({ length: 8 }, (_, i) => ({
      id: `beat-${i}`,
      index: i,
      timestamp: i * (60000 / 110),
      duration: 450,
    })),
    words: [
      { id: "a1", text: "강아지", imageUrl: "https://em-content.zobj.net/source/apple/391/dog-face_1f436.png", beatIndex: 0 },
      { id: "a2", text: "고양이", imageUrl: "https://em-content.zobj.net/source/apple/391/cat-face_1f431.png", beatIndex: 1 },
      { id: "a3", text: "돼지", imageUrl: "https://em-content.zobj.net/source/apple/391/pig-face_1f437.png", beatIndex: 2 },
      { id: "a4", text: "소", imageUrl: "https://em-content.zobj.net/source/apple/391/cow-face_1f42e.png", beatIndex: 3 },
      { id: "a5", text: "닭", imageUrl: "https://em-content.zobj.net/source/apple/391/chicken_1f414.png", beatIndex: 4 },
      { id: "a6", text: "오리", imageUrl: "https://em-content.zobj.net/source/apple/391/duck_1f986.png", beatIndex: 5 },
      { id: "a7", text: "말", imageUrl: "https://em-content.zobj.net/source/apple/391/horse-face_1f434.png", beatIndex: 6 },
      { id: "a8", text: "양", imageUrl: "https://em-content.zobj.net/source/apple/391/ewe_1f411.png", beatIndex: 7 },
    ],
    difficulty: "medium",
    duration: 30,
    creatorId: "system",
    creatorName: "비트온워드",
    createdAt: new Date("2025-01-03"),
    updatedAt: new Date("2025-01-03"),
    published: true,
    playCount: 756,
    upvotes: 58,
    downvotes: 2,
    thumbnailUrls: [
      "https://em-content.zobj.net/source/apple/391/dog-face_1f436.png",
      "https://em-content.zobj.net/source/apple/391/cat-face_1f431.png",
      "https://em-content.zobj.net/source/apple/391/pig-face_1f437.png",
    ],
    tags: ["동물", "농장", "보통"],
  },
  {
    id: "food-fruits",
    title: "과일 파티",
    description: "맛있는 과일 이름을 빠르게 말해보세요!",
    category: "food",
    audioUrl: SAMPLE_AUDIO_URL,
    bpm: 120,
    startOffset: 0,
    beats: Array.from({ length: 10 }, (_, i) => ({
      id: `beat-${i}`,
      index: i,
      timestamp: i * (60000 / 120),
      duration: 400,
    })),
    words: [
      { id: "f1", text: "사과", imageUrl: "https://em-content.zobj.net/source/apple/391/red-apple_1f34e.png", beatIndex: 0 },
      { id: "f2", text: "바나나", imageUrl: "https://em-content.zobj.net/source/apple/391/banana_1f34c.png", beatIndex: 1 },
      { id: "f3", text: "포도", imageUrl: "https://em-content.zobj.net/source/apple/391/grapes_1f347.png", beatIndex: 2 },
      { id: "f4", text: "딸기", imageUrl: "https://em-content.zobj.net/source/apple/391/strawberry_1f353.png", beatIndex: 3 },
      { id: "f5", text: "수박", imageUrl: "https://em-content.zobj.net/source/apple/391/watermelon_1f349.png", beatIndex: 4 },
      { id: "f6", text: "오렌지", imageUrl: "https://em-content.zobj.net/source/apple/391/tangerine_1f34a.png", beatIndex: 5 },
      { id: "f7", text: "복숭아", imageUrl: "https://em-content.zobj.net/source/apple/391/peach_1f351.png", beatIndex: 6 },
      { id: "f8", text: "체리", imageUrl: "https://em-content.zobj.net/source/apple/391/cherries_1f352.png", beatIndex: 7 },
      { id: "f9", text: "레몬", imageUrl: "https://em-content.zobj.net/source/apple/391/lemon_1f34b.png", beatIndex: 8 },
      { id: "f10", text: "키위", imageUrl: "https://em-content.zobj.net/source/apple/391/kiwi-fruit_1f95d.png", beatIndex: 9 },
    ],
    difficulty: "medium",
    duration: 35,
    creatorId: "system",
    creatorName: "비트온워드",
    createdAt: new Date("2025-01-04"),
    updatedAt: new Date("2025-01-04"),
    published: true,
    playCount: 1120,
    upvotes: 95,
    downvotes: 4,
    thumbnailUrls: [
      "https://em-content.zobj.net/source/apple/391/red-apple_1f34e.png",
      "https://em-content.zobj.net/source/apple/391/banana_1f34c.png",
      "https://em-content.zobj.net/source/apple/391/grapes_1f347.png",
    ],
    tags: ["음식", "과일", "보통"],
  },
  {
    id: "emoji-emotions",
    title: "이모지 챌린지",
    description: "다양한 감정 이모지를 빠르게 말해보세요! 🔥",
    category: "custom",
    audioUrl: SAMPLE_AUDIO_URL,
    bpm: 140,
    startOffset: 0,
    beats: Array.from({ length: 12 }, (_, i) => ({
      id: `beat-${i}`,
      index: i,
      timestamp: i * (60000 / 140),
      duration: 350,
    })),
    words: [
      { id: "e1", text: "웃음", imageUrl: "https://em-content.zobj.net/source/apple/391/grinning-face-with-smiling-eyes_1f604.png", beatIndex: 0 },
      { id: "e2", text: "사랑", imageUrl: "https://em-content.zobj.net/source/apple/391/smiling-face-with-heart-eyes_1f60d.png", beatIndex: 1 },
      { id: "e3", text: "울음", imageUrl: "https://em-content.zobj.net/source/apple/391/loudly-crying-face_1f62d.png", beatIndex: 2 },
      { id: "e4", text: "화남", imageUrl: "https://em-content.zobj.net/source/apple/391/pouting-face_1f621.png", beatIndex: 3 },
      { id: "e5", text: "놀람", imageUrl: "https://em-content.zobj.net/source/apple/391/face-screaming-in-fear_1f631.png", beatIndex: 4 },
      { id: "e6", text: "윙크", imageUrl: "https://em-content.zobj.net/source/apple/391/winking-face_1f609.png", beatIndex: 5 },
      { id: "e7", text: "생각", imageUrl: "https://em-content.zobj.net/source/apple/391/thinking-face_1f914.png", beatIndex: 6 },
      { id: "e8", text: "졸림", imageUrl: "https://em-content.zobj.net/source/apple/391/sleeping-face_1f634.png", beatIndex: 7 },
      { id: "e9", text: "축하", imageUrl: "https://em-content.zobj.net/source/apple/391/partying-face_1f973.png", beatIndex: 8 },
      { id: "e10", text: "쿨", imageUrl: "https://em-content.zobj.net/source/apple/391/smiling-face-with-sunglasses_1f60e.png", beatIndex: 9 },
      { id: "e11", text: "병맛", imageUrl: "https://em-content.zobj.net/source/apple/391/zany-face_1f92a.png", beatIndex: 10 },
      { id: "e12", text: "불", imageUrl: "https://em-content.zobj.net/source/apple/391/fire_1f525.png", beatIndex: 11 },
    ],
    difficulty: "hard",
    duration: 40,
    creatorId: "system",
    creatorName: "비트온워드",
    createdAt: new Date("2025-01-05"),
    updatedAt: new Date("2025-01-05"),
    published: true,
    playCount: 2340,
    upvotes: 189,
    downvotes: 12,
    thumbnailUrls: [
      "https://em-content.zobj.net/source/apple/391/grinning-face-with-smiling-eyes_1f604.png",
      "https://em-content.zobj.net/source/apple/391/smiling-face-with-heart-eyes_1f60d.png",
      "https://em-content.zobj.net/source/apple/391/fire_1f525.png",
    ],
    tags: ["이모지", "감정", "어려움", "인기"],
  },
];

// 챌린지 가져오기 헬퍼
export function getChallengeById(id: string): Challenge | undefined {
  return SAMPLE_CHALLENGES.find((c) => c.id === id);
}

export function getChallengesByCategory(category: string): Challenge[] {
  return SAMPLE_CHALLENGES.filter((c) => c.category === category);
}

export function getPopularChallenges(limit: number = 5): Challenge[] {
  return [...SAMPLE_CHALLENGES]
    .sort((a, b) => b.playCount - a.playCount)
    .slice(0, limit);
}

export function getFeaturedChallenges(): Challenge[] {
  return SAMPLE_CHALLENGES.filter((c) => c.playCount > 1000);
}
