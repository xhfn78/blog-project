/**
 * 얼굴 특징 분석기
 * 랜드마크에서 관상학적 특징을 추출
 */

import * as faceapi from "@vladmandic/face-api";
import type { FaceAnalysis, FaceShape } from "@/entities/fun";

/**
 * 랜드마크에서 얼굴 특징 추출
 */
export function analyzeFacialFeatures(
  detection: faceapi.WithFaceLandmarks<faceapi.WithFaceDetection<{}>> & {
    age?: number;
    gender?: string;
    genderProbability?: number;
  }
): FaceAnalysis {
  const landmarks = detection.landmarks.positions;
  const box = detection.detection.box;

  // 얼굴형 판단
  const faceShape = determineFaceShape(box, landmarks);

  // 이마 (hairline ~ 눈썹)
  const foreheadWidth = calculateForeheadWidth(landmarks);

  // 눈썹
  const eyebrowThickness = calculateEyebrowThickness(landmarks);
  const eyebrowGap = calculateEyebrowGap(landmarks);

  // 눈
  const eyeSize = calculateEyeSize(landmarks);

  // 코
  const noseHeight = calculateNoseHeight(landmarks);
  const noseWidth = calculateNoseWidth(landmarks);

  // 입
  const mouthSize = calculateMouthSize(landmarks);

  // 광대
  const cheekboneWidth = calculateCheekboneWidth(landmarks);

  // 턱선
  const jawlineSharp = calculateJawlineSharpness(landmarks);

  return {
    faceShape,
    foreheadWidth,
    eyebrowThickness,
    eyebrowGap,
    eyeSize,
    noseHeight,
    noseWidth,
    mouthSize,
    cheekboneWidth,
    jawlineSharp,
    age: detection.age,
    gender: detection.gender as "male" | "female" | undefined,
    confidence: detection.detection.score,
  };
}

/**
 * 얼굴형 판단
 * 가로/세로 비율과 턱 각도로 판단
 */
function determineFaceShape(
  box: faceapi.Box,
  landmarks: faceapi.Point[]
): FaceShape {
  const aspectRatio = box.width / box.height;
  const jawlineSharpness = calculateJawlineSharpness(landmarks);

  // 비율 기반 판단
  if (aspectRatio > 0.85) {
    // 넓은 얼굴
    if (jawlineSharpness > 0.7) {
      return "square"; // 사각형
    }
    return "round"; // 둥근형
  } else if (aspectRatio < 0.70) {
    // 긴 얼굴
    return "long";
  } else {
    // 중간 비율
    if (jawlineSharpness > 0.7) {
      return "heart"; // 하트형 (턱이 뾰족)
    }
    return "oval"; // 계란형
  }
}

/**
 * 이마 넓이 (0-1)
 * 눈썹 간격 대비 이마 넓이
 */
function calculateForeheadWidth(landmarks: faceapi.Point[]): number {
  // 17-21: 왼쪽 눈썹, 22-26: 오른쪽 눈썹
  const leftBrow = landmarks[17];
  const rightBrow = landmarks[26];
  const browWidth = Math.abs(rightBrow.x - leftBrow.x);

  // 얼굴 전체 너비 (0번: 왼쪽 턱, 16번: 오른쪽 턱)
  const faceWidth = Math.abs(landmarks[16].x - landmarks[0].x);

  // 비율 계산 (0.7 ~ 1.0 범위로 정규화)
  const ratio = browWidth / faceWidth;
  return Math.min(Math.max((ratio - 0.6) / 0.3, 0), 1);
}

/**
 * 눈썹 두께 (0-1)
 */
function calculateEyebrowThickness(landmarks: faceapi.Point[]): number {
  // 눈썹 윤곽점들 사이의 평균 거리
  // 17-21: 왼쪽 눈썹
  const leftBrowHeight = calculateDistance(landmarks[19], landmarks[37]); // 눈썹 중앙 ~ 눈 중앙

  // 정규화 (3-8 픽셀 범위로 가정)
  return Math.min(Math.max((leftBrowHeight - 3) / 5, 0), 1);
}

/**
 * 눈썹 간격 (0-1)
 */
function calculateEyebrowGap(landmarks: faceapi.Point[]): number {
  // 21번(왼쪽 눈썹 끝)과 22번(오른쪽 눈썹 시작) 사이 거리
  const gap = calculateDistance(landmarks[21], landmarks[22]);

  // 얼굴 너비 대비 비율
  const faceWidth = Math.abs(landmarks[16].x - landmarks[0].x);
  const ratio = gap / faceWidth;

  // 정규화 (0.05 ~ 0.15 범위로 가정)
  return Math.min(Math.max((ratio - 0.05) / 0.10, 0), 1);
}

/**
 * 눈 크기 (0-1)
 */
function calculateEyeSize(landmarks: faceapi.Point[]): number {
  // 36-41: 왼쪽 눈
  const leftEyeWidth = calculateDistance(landmarks[36], landmarks[39]);
  const leftEyeHeight = calculateDistance(landmarks[37], landmarks[41]);
  const leftEyeArea = leftEyeWidth * leftEyeHeight;

  // 얼굴 크기 대비 정규화
  const faceArea = Math.abs(landmarks[16].x - landmarks[0].x) * Math.abs(landmarks[8].y - landmarks[27].y);
  const ratio = leftEyeArea / faceArea;

  // 정규화 (0.01 ~ 0.04 범위로 가정)
  return Math.min(Math.max((ratio - 0.01) / 0.03, 0), 1);
}

/**
 * 코 높이 (0-1)
 */
function calculateNoseHeight(landmarks: faceapi.Point[]): number {
  // 27번(코 윗부분) ~ 33번(코 아래) 거리
  const noseHeight = calculateDistance(landmarks[27], landmarks[33]);

  // 얼굴 높이 대비
  const faceHeight = Math.abs(landmarks[8].y - landmarks[27].y);
  const ratio = noseHeight / faceHeight;

  // 정규화 (0.25 ~ 0.40 범위로 가정)
  return Math.min(Math.max((ratio - 0.25) / 0.15, 0), 1);
}

/**
 * 코 넓이 (0-1)
 */
function calculateNoseWidth(landmarks: faceapi.Point[]): number {
  // 31번(왼쪽 콧방울) ~ 35번(오른쪽 콧방울)
  const noseWidth = calculateDistance(landmarks[31], landmarks[35]);

  // 얼굴 너비 대비
  const faceWidth = Math.abs(landmarks[16].x - landmarks[0].x);
  const ratio = noseWidth / faceWidth;

  // 정규화 (0.15 ~ 0.30 범위로 가정)
  return Math.min(Math.max((ratio - 0.15) / 0.15, 0), 1);
}

/**
 * 입 크기 (0-1)
 */
function calculateMouthSize(landmarks: faceapi.Point[]): number {
  // 48번(왼쪽 입꼬리) ~ 54번(오른쪽 입꼬리)
  const mouthWidth = calculateDistance(landmarks[48], landmarks[54]);

  // 51번(윗입술 중앙) ~ 57번(아랫입술 중앙)
  const mouthHeight = calculateDistance(landmarks[51], landmarks[57]);

  const mouthArea = mouthWidth * mouthHeight;

  // 얼굴 크기 대비
  const faceArea = Math.abs(landmarks[16].x - landmarks[0].x) * Math.abs(landmarks[8].y - landmarks[27].y);
  const ratio = mouthArea / faceArea;

  // 정규화 (0.02 ~ 0.08 범위로 가정)
  return Math.min(Math.max((ratio - 0.02) / 0.06, 0), 1);
}

/**
 * 광대 넓이 (0-1)
 */
function calculateCheekboneWidth(landmarks: faceapi.Point[]): number {
  // 얼굴 가장 넓은 부분 (1번 ~ 15번 중 최대 너비)
  let maxWidth = 0;
  for (let i = 1; i < 16; i++) {
    const width = Math.abs(landmarks[16 - i].x - landmarks[i].x);
    maxWidth = Math.max(maxWidth, width);
  }

  // 턱 너비
  const jawWidth = Math.abs(landmarks[16].x - landmarks[0].x);

  // 비율 (1.0 ~ 1.3 범위로 가정)
  const ratio = maxWidth / jawWidth;
  return Math.min(Math.max((ratio - 1.0) / 0.3, 0), 1);
}

/**
 * 턱선 날카로움 (0-1)
 */
function calculateJawlineSharpness(landmarks: faceapi.Point[]): number {
  // 턱 각도 계산 (5번, 8번, 11번 점)
  const leftJaw = landmarks[5];
  const chin = landmarks[8];
  const rightJaw = landmarks[11];

  // 각도 계산
  const angle1 = Math.atan2(chin.y - leftJaw.y, chin.x - leftJaw.x);
  const angle2 = Math.atan2(chin.y - rightJaw.y, chin.x - rightJaw.x);
  const jawAngle = Math.abs(angle2 - angle1);

  // 정규화 (각도가 작을수록 날카로운 턱)
  // 2.0 ~ 2.8 라디안 범위로 가정
  const sharpness = 1 - Math.min(Math.max((jawAngle - 2.0) / 0.8, 0), 1);
  return sharpness;
}

/**
 * 두 점 사이 거리 계산
 */
function calculateDistance(p1: faceapi.Point, p2: faceapi.Point): number {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}

/**
 * 분석 결과를 카테고리로 변환
 */
export function categorizeFeature(value: number): "low" | "medium" | "high" {
  if (value < 0.33) return "low";
  if (value < 0.67) return "medium";
  return "high";
}
