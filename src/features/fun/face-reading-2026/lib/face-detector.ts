/**
 * Face Detection Library
 * @vladmandic/face-api 래퍼
 */

import * as faceapi from "@vladmandic/face-api";

// 모델 로드 상태
let modelsLoaded = false;

/**
 * face-api 모델 로드
 * 최초 1회만 실행
 */
export async function loadFaceModels(): Promise<void> {
  if (modelsLoaded) return;

  // jsdelivr CDN (무료, 무제한) - 대역폭 비용 0원
  const MODEL_URL = "https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model";

  try {
    // 필수 모델 로드
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
      faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL), // 선택적
    ]);

    modelsLoaded = true;
    console.log("✅ Face-API models loaded successfully");
  } catch (error) {
    console.error("❌ Failed to load face-api models:", error);
    throw new Error("얼굴 인식 모델을 로드하지 못했습니다");
  }
}

/**
 * 이미지에서 얼굴 감지 및 랜드마크 추출
 */
export async function detectFace(input: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement) {
  if (!modelsLoaded) {
    throw new Error("모델이 로드되지 않았습니다. loadFaceModels()를 먼저 호출하세요.");
  }

  try {
    // 얼굴 감지 + 랜드마크 + 얼굴 설명자 추출
    const detection = await faceapi
      .detectSingleFace(input, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor()
      .withAgeAndGender();

    if (!detection) {
      throw new Error("얼굴을 감지하지 못했습니다");
    }

    return detection;
  } catch (error) {
    console.error("얼굴 감지 오류:", error);
    throw error;
  }
}

/**
 * 비디오에서 실시간 얼굴 감지
 */
export async function detectFaceFromVideo(video: HTMLVideoElement) {
  if (!modelsLoaded) {
    throw new Error("모델이 로드되지 않았습니다");
  }

  try {
    const detection = await faceapi
      .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks();

    return detection;
  } catch (error) {
    console.error("비디오 얼굴 감지 오류:", error);
    return null;
  }
}

/**
 * 랜드마크를 캔버스에 그리기 (디버깅/가이드용)
 */
export function drawLandmarks(
  canvas: HTMLCanvasElement,
  detection: faceapi.WithFaceLandmarks<any>
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // 캔버스 초기화
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 얼굴 박스
  const box = detection.detection.box;
  ctx.strokeStyle = "#00ff00";
  ctx.lineWidth = 3;
  ctx.strokeRect(box.x, box.y, box.width, box.height);

  // 랜드마크 점
  const landmarks = detection.landmarks.positions;
  ctx.fillStyle = "#ff0000";
  landmarks.forEach((point: { x: number; y: number }) => {
    ctx.beginPath();
    ctx.arc(point.x, point.y, 2, 0, 2 * Math.PI);
    ctx.fill();
  });
}

/**
 * 얼굴 감지 신뢰도 체크
 */
export function isDetectionConfident(detection: faceapi.WithFaceDetection<any>): boolean {
  const MIN_CONFIDENCE = 0.7; // 70% 이상
  return detection.detection.score >= MIN_CONFIDENCE;
}

/**
 * 모델 로드 상태 확인
 */
export function areModelsLoaded(): boolean {
  return modelsLoaded;
}
