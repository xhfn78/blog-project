/**
 * Fun 카테고리 타입 정의
 * 재미있는 테스트, 분석 도구 등
 */

// Fun 콘텐츠 카테고리
export type FunCategory = "fortune" | "personality" | "test" | "quiz";

// 띠 (12지신)
export type ZodiacSign =
  | "rat"      // 쥐띠
  | "ox"       // 소띠
  | "tiger"    // 호랑이띠
  | "rabbit"   // 토끼띠
  | "dragon"   // 용띠
  | "snake"    // 뱀띠
  | "horse"    // 말띠
  | "sheep"    // 양띠
  | "monkey"   // 원숭이띠
  | "rooster"  // 닭띠
  | "dog"      // 개띠
  | "pig";     // 돼지띠

// 얼굴형
export type FaceShape = "round" | "square" | "oval" | "heart" | "long";

// 얼굴 분석 결과
export interface FaceAnalysis {
  // 기본 특징
  faceShape: FaceShape;

  // 세부 특징 (0-1 범위의 정규화된 값)
  foreheadWidth: number;      // 이마 넓이
  eyebrowThickness: number;   // 눈썹 두께
  eyebrowGap: number;         // 눈썹 간격
  eyeSize: number;            // 눈 크기
  noseHeight: number;         // 코 높이
  noseWidth: number;          // 코 넓이
  mouthSize: number;          // 입 크기
  cheekboneWidth: number;     // 광대 넓이
  jawlineSharp: number;       // 턱선 각도

  // 추가 정보 (선택적)
  age?: number;
  gender?: "male" | "female";
  confidence: number;         // 분석 신뢰도 (0-1)
}

// 운세 종류별 점수
export interface LuckScores {
  wealth: number;    // 재물운 (0-100)
  career: number;    // 사업운 (0-100)
  love: number;      // 애정운 (0-100)
  health: number;    // 건강운 (0-100)
  social: number;    // 대인운 (0-100)
}

// 월별 조언
export interface MonthlyAdvice {
  month: number;           // 1-12
  theme: string;           // 주제 (예: "시작", "도약")
  description: string;     // 설명
  warning?: string;        // 주의사항 (예: "지갑 조심")
  luckyDay?: number;       // 길일
}

// 럭키 아이템
export interface LuckyItems {
  colors: string[];        // 럭키 컬러
  numbers: number[];       // 럭키 넘버
  items: string[];         // 럭키 아이템
  direction?: string;      // 길한 방향
}

// 관상 운세 결과
export interface FortuneResult {
  // 전체 점수
  totalScore: number;      // 0-100
  grade: "S" | "A" | "B" | "C" | "D";

  // 운세별 점수
  luckScores: LuckScores;

  // 얼굴 분석
  faceAnalysis: FaceAnalysis;
  faceType: string;        // "복스러운 둥근 얼굴"
  keyFeatures: {
    feature: string;       // 특징 (예: "눈썹")
    description: string;   // 설명
    impact: "positive" | "neutral" | "negative";
  }[];

  // 강점과 주의사항
  strengths: string[];
  warnings: string[];

  // 띠 정보
  zodiacSign: ZodiacSign;
  zodiacDescription: string;

  // 2026년 특화 정보
  yearTheme: string;       // "붉은 말의 해"
  monthlyAdvice: MonthlyAdvice[];
  luckyItems: LuckyItems;

  // 바이럴 요소
  viralMessage: string;    // "3월에 대박날 관상!"
  shareText: string;       // SNS 공유용 텍스트
  hashtags: string[];      // 해시태그

  // 메타데이터
  analyzedAt: Date;
  birthYear: number;
}

// 관상 분석 입력
export interface FaceReadingInput {
  imageData: string;       // Base64 이미지
  birthYear: number;       // 생년
  gender?: "male" | "female";
}

// Fun 콘텐츠 아이템
export interface FunItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: FunCategory;
  thumbnailUrl: string;

  // 통계
  playCount: number;
  shareCount: number;

  // 메타
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
  tags: string[];
}
