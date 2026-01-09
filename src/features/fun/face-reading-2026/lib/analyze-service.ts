/**
 * 얼굴 분석 서비스
 * 클라이언트에서만 동적으로 로드됨
 */

import { detectFace } from "./face-detector";
import { analyzeFacialFeatures } from "./face-analyzer";
import { analyzeFortune } from "./fortune-engine";
import type { FortuneResult } from "@/entities/fun";

export async function analyzeImageForFortune(
  imageData: string,
  birthYear: number
): Promise<FortuneResult> {
  // Base64 이미지를 HTMLImageElement로 변환
  const img = new Image();
  img.src = imageData;

  await new Promise((resolve) => {
    img.onload = resolve;
  });

  // 얼굴 감지
  const detection = await detectFace(img);

  // 얼굴 특징 분석
  const faceAnalysis = analyzeFacialFeatures(detection);

  // 운세 계산
  const result = analyzeFortune(faceAnalysis, birthYear);

  return result;
}
