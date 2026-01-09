/**
 * 관상 운세 분석 엔진
 * 얼굴 특징 + 띠 운세 → 2026년 운세 결과
 */

import type { FaceAnalysis, FortuneResult, LuckScores, MonthlyAdvice, LuckyItems } from "@/entities/fun";
import { getZodiacInfo } from "../data/zodiac-2026";
import { MONTHLY_THEMES_2026, getLuckyMonths, getWarningMonths } from "../data/monthly-fortune";
import {
  FACE_SHAPE_READINGS,
  FOREHEAD_READINGS,
  EYEBROW_READINGS,
  EYE_READINGS,
  NOSE_READINGS,
  MOUTH_READINGS,
  FEATURE_WEIGHTS,
} from "../data/face-rules";

/**
 * 종합 관상 운세 분석
 */
export function analyzeFortune(
  faceAnalysis: FaceAnalysis,
  birthYear: number
): FortuneResult {
  // 1. 띠 정보
  const zodiacInfo = getZodiacInfo(birthYear);

  // 2. 운세별 점수 계산
  const luckScores = calculateLuckScores(faceAnalysis, zodiacInfo);

  // 3. 총점 계산
  const totalScore = calculateTotalScore(luckScores, faceAnalysis);

  // 4. 등급
  const grade = calculateGrade(totalScore);

  // 5. 얼굴 특징 해석
  const faceType = FACE_SHAPE_READINGS[faceAnalysis.faceShape].name;
  const keyFeatures = extractKeyFeatures(faceAnalysis);

  // 6. 강점과 주의사항
  const strengths = extractStrengths(faceAnalysis, zodiacInfo);
  const warnings = extractWarnings(faceAnalysis, zodiacInfo);

  // 7. 월별 조언
  const monthlyAdvice = generateMonthlyAdvice(zodiacInfo);

  // 8. 럭키 아이템
  const luckyItems = generateLuckyItems(zodiacInfo, faceAnalysis);

  // 9. 바이럴 메시지
  const { viralMessage, shareText, hashtags } = generateViralContent(
    faceAnalysis,
    zodiacInfo,
    luckScores,
    totalScore
  );

  return {
    totalScore,
    grade,
    luckScores,
    faceAnalysis,
    faceType,
    keyFeatures,
    strengths,
    warnings,
    zodiacSign: zodiacInfo.sign,
    zodiacDescription: zodiacInfo.fortuneTitle,
    yearTheme: "병오년 - 붉은 말의 해 🐴🔥",
    monthlyAdvice,
    luckyItems,
    viralMessage,
    shareText,
    hashtags,
    analyzedAt: new Date(),
    birthYear,
  };
}

/**
 * 운세별 점수 계산 (0-100)
 */
function calculateLuckScores(
  face: FaceAnalysis,
  zodiac: ReturnType<typeof getZodiacInfo>
): LuckScores {
  // 재물운 (눈썹, 코가 중요)
  const wealth = Math.round(
    (face.eyebrowThickness * 0.4 +
      face.noseHeight * 0.3 +
      face.noseWidth * 0.2 +
      face.foreheadWidth * 0.1) *
      100
  );

  // 사업운 (이마, 얼굴형이 중요)
  const career = Math.round(
    (face.foreheadWidth * 0.4 +
      (face.faceShape === "square" || face.faceShape === "oval" ? 0.9 : 0.6) * 0.3 +
      face.jawlineSharp * 0.3) *
      100
  );

  // 애정운 (눈, 입이 중요)
  const love = Math.round(
    (face.eyeSize * 0.4 + face.mouthSize * 0.3 + (face.faceShape === "heart" ? 0.9 : 0.6) * 0.3) * 100
  );

  // 건강운 (코, 광대)
  const health = Math.round((face.noseHeight * 0.5 + face.cheekboneWidth * 0.5) * 100);

  // 대인운 (입, 눈썹 간격)
  const social = Math.round(
    (face.mouthSize * 0.4 + face.eyebrowGap * 0.3 + face.eyeSize * 0.3) * 100
  );

  // 띠 보너스 (본띠는 모든 운에 +10)
  const bonus = zodiac.sign === "horse" ? 10 : 0;

  return {
    wealth: Math.min(wealth + bonus, 100),
    career: Math.min(career + bonus, 100),
    love: Math.min(love + bonus, 100),
    health: Math.min(health + bonus, 100),
    social: Math.min(social + bonus, 100),
  };
}

/**
 * 총점 계산 (0-100)
 */
function calculateTotalScore(scores: LuckScores, face: FaceAnalysis): number {
  const avg = (scores.wealth + scores.career + scores.love + scores.health + scores.social) / 5;

  // 신뢰도 보정
  const confidence = face.confidence;
  const adjusted = avg * (0.8 + confidence * 0.2);

  return Math.round(Math.min(adjusted, 100));
}

/**
 * 등급 계산
 */
function calculateGrade(score: number): "S" | "A" | "B" | "C" | "D" {
  if (score >= 90) return "S";
  if (score >= 80) return "A";
  if (score >= 70) return "B";
  if (score >= 60) return "C";
  return "D";
}

/**
 * 주요 특징 추출
 */
function extractKeyFeatures(face: FaceAnalysis) {
  const features: { feature: string; description: string; impact: "positive" | "neutral" | "negative" }[] = [];

  // 얼굴형
  const faceReading = FACE_SHAPE_READINGS[face.faceShape];
  features.push({
    feature: "얼굴형",
    description: faceReading.fortune,
    impact: "positive",
  });

  // 눈썹 (가장 중요!)
  const eyebrowLevel = face.eyebrowThickness > 0.6 ? "thick" : face.eyebrowThickness < 0.4 ? "thin" : "arched";
  const eyebrowReading = EYEBROW_READINGS[eyebrowLevel];
  features.push({
    feature: "눈썹",
    description: eyebrowReading.description,
    impact: eyebrowReading.score > 80 ? "positive" : "neutral",
  });

  // 눈
  const eyeLevel = face.eyeSize > 0.6 ? "large" : face.eyeSize < 0.4 ? "small" : "medium";
  const eyeReading = EYE_READINGS[eyeLevel];
  features.push({
    feature: "눈",
    description: eyeReading.description,
    impact: eyeReading.score > 80 ? "positive" : "neutral",
  });

  // 코
  const noseLevel = face.noseHeight > 0.6 ? "high" : face.noseWidth > 0.6 ? "wide" : "medium";
  const noseReading = NOSE_READINGS[noseLevel];
  features.push({
    feature: "코",
    description: noseReading.description,
    impact: noseReading.score > 80 ? "positive" : "neutral",
  });

  // 입
  const mouthLevel = face.mouthSize > 0.6 ? "large" : face.mouthSize < 0.4 ? "small" : "medium";
  const mouthReading = MOUTH_READINGS[mouthLevel];
  features.push({
    feature: "입",
    description: mouthReading.description,
    impact: mouthReading.score > 80 ? "positive" : "neutral",
  });

  return features;
}

/**
 * 강점 추출
 */
function extractStrengths(
  face: FaceAnalysis,
  zodiac: ReturnType<typeof getZodiacInfo>
): string[] {
  const strengths: string[] = [];

  // 얼굴 특징 기반
  if (face.eyebrowThickness > 0.7) strengths.push("재물운이 강한 눈썹");
  if (face.noseHeight > 0.7) strengths.push("건강과 재물을 상징하는 높은 코");
  if (face.foreheadWidth > 0.7) strengths.push("지혜와 리더십의 넓은 이마");
  if (face.eyeSize > 0.7) strengths.push("매력적이고 표현력 있는 눈");

  // 띠 기반
  strengths.push(...zodiac.strengths.slice(0, 2));

  return strengths.slice(0, 5);
}

/**
 * 주의사항 추출
 */
function extractWarnings(
  face: FaceAnalysis,
  zodiac: ReturnType<typeof getZodiacInfo>
): string[] {
  const warnings: string[] = [];

  // 얼굴 특징 기반
  if (face.eyebrowGap < 0.3) warnings.push("스트레스 관리가 필요합니다");
  if (face.jawlineSharp < 0.4) warnings.push("건강 관리에 신경 쓰세요");

  // 띠 기반
  if (zodiac.challenges.length > 0) {
    warnings.push(...zodiac.challenges.slice(0, 2));
  }

  // 일반 조언
  warnings.push("과욕은 금물, 꾸준함이 중요합니다");

  return warnings.slice(0, 4);
}

/**
 * 월별 조언 생성
 */
function generateMonthlyAdvice(zodiac: ReturnType<typeof getZodiacInfo>): MonthlyAdvice[] {
  const luckyMonths = getLuckyMonths(zodiac.luckyMonths);
  const warningMonths = getWarningMonths(zodiac.warningMonths);

  // 행운의 달 강조, 주의할 달 표시
  return MONTHLY_THEMES_2026.map((advice) => {
    const isLucky = zodiac.luckyMonths.includes(advice.month);
    const isWarning = zodiac.warningMonths.includes(advice.month);

    return {
      ...advice,
      description: isLucky
        ? `✨ ${advice.description} (행운의 달!)`
        : isWarning
          ? `⚠️ ${advice.description} (조심하세요)`
          : advice.description,
    };
  });
}

/**
 * 럭키 아이템 생성
 */
function generateLuckyItems(
  zodiac: ReturnType<typeof getZodiacInfo>,
  face: FaceAnalysis
): LuckyItems {
  // 2026년 말띠 해 공통 럭키 아이템
  const baseColors = ["빨강", "금색", "주황"];
  const baseNumbers = [3, 7, 21, 28];

  // 얼굴 특징 기반 추가 아이템
  const items = ["말 모양 장식", "붉은 지갑"];

  if (face.eyebrowThickness > 0.7) {
    items.push("골드 액세서리");
  }

  if (face.noseHeight > 0.7) {
    items.push("에너지 스톤");
  }

  return {
    colors: baseColors,
    numbers: baseNumbers,
    items,
    direction: "남쪽 (火 방향)",
  };
}

/**
 * 바이럴 컨텐츠 생성
 */
function generateViralContent(
  face: FaceAnalysis,
  zodiac: ReturnType<typeof getZodiacInfo>,
  scores: LuckScores,
  totalScore: number
) {
  // 가장 높은 운 찾기
  const maxScore = Math.max(scores.wealth, scores.career, scores.love, scores.health, scores.social);
  let topLuck = "종합운";
  if (maxScore === scores.wealth) topLuck = "재물운";
  else if (maxScore === scores.career) topLuck = "사업운";
  else if (maxScore === scores.love) topLuck = "애정운";
  else if (maxScore === scores.health) topLuck = "건강운";
  else if (maxScore === scores.social) topLuck = "대인운";

  // 바이럴 메시지
  let viralMessage = "";

  if (zodiac.sign === "horse") {
    viralMessage = `🔥 2026년 본띠! ${topLuck} 최고조! 모든 운이 폭발합니다!`;
  } else if (totalScore >= 85) {
    viralMessage = `✨ ${topLuck}이 ${maxScore}점! 특히 ${zodiac.luckyMonths[0]}월에 대박 예감!`;
  } else if (maxScore >= 90) {
    viralMessage = `💰 ${topLuck} ${maxScore}점! ${zodiac.luckyMonths[0]}월이 기회의 달입니다!`;
  } else {
    viralMessage = `🎯 ${zodiac.fortuneTitle}! 꾸준히 노력하면 좋은 결과가 있을 것입니다.`;
  }

  // 특정 특징 강조
  if (face.eyebrowThickness > 0.75) {
    viralMessage += " 눈썹이 돈을 부르는 관상! 💸";
  }

  // 공유용 텍스트
  const shareText = `나는 2026년 ${totalScore}점! ${topLuck}이 최고네요 🔮 당신은?`;

  // 해시태그
  const hashtags = [
    "#2026년운세",
    "#AI관상",
    `#${zodiac.name}`,
    "#재물운",
    "#얼굴분석",
    "#무료운세",
  ];

  return { viralMessage, shareText, hashtags };
}
