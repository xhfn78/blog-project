"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WobblyButton } from "@/shared/ui/wobbly-button";
import { PlayfulCard } from "@/shared/ui/playful-card";
import { loadFaceModels, detectFaceFromVideo, drawLandmarks } from "../lib/face-detector";

interface CameraCaptureProps {
  onCapture: (imageData: string) => void;
  onBack: () => void;
}

export function CameraCapture({ onCapture, onBack }: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [videoStarted, setVideoStarted] = useState(false); // 비디오 실제 재생 여부
  const [faceDetected, setFaceDetected] = useState(false);
  const [error, setError] = useState<string>("");
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [capturedImage, setCapturedImage] = useState<string>("");

  // 모델 로드 및 카메라 시작
  useEffect(() => {
    let isMounted = true;
    let detectionInterval: NodeJS.Timeout;
    let currentStream: MediaStream | null = null;

    async function startCamera() {
      try {
        const envInfo = {
          userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "unknown",
          isSecureContext: typeof window !== "undefined" ? window.isSecureContext : false,
          hasMediaDevices: typeof navigator !== "undefined" && !!navigator.mediaDevices,
        };

        if (!envInfo.hasMediaDevices) {
          throw new Error("카메라 API를 지원하지 않는 환경입니다.");
        }

        console.log("🔄 카메라 권한 요청 중...");
        // 제약 조건을 최소화하여 호환성 극대화
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
          audio: false,
        });

        if (!isMounted) {
          stream.getTracks().forEach(track => track.stop());
          return;
        }

        currentStream = stream;
        streamRef.current = stream;

        if (videoRef.current) {
          const video = videoRef.current;
          video.srcObject = stream;
          
          // 모바일 브라우저 필수 속성
          video.setAttribute("playsinline", "true");
          video.setAttribute("muted", "true");
          video.muted = true;

          // 비디오 데이터가 실제로 들어오는지 확인
          video.onloadeddata = () => {
            console.log("✅ 비디오 데이터 로드됨");
            video.play().then(() => {
              setVideoStarted(true);
            }).catch(e => console.warn("자동 재생 차단:", e));
          };

          // 대체 재생 시도
          setTimeout(() => {
            if (video.paused) {
              video.play().then(() => setVideoStarted(true)).catch(() => {});
            }
          }, 1000);
        }
      } catch (err: any) {
        console.error("❌ 카메라 시작 오류:", err);
        if (isMounted) {
           setError(err.message || "카메라를 시작할 수 없습니다.");
           setIsLoading(false);
           setDebugInfo((prev: any) => ({ ...prev, error: err.name, msg: err.message }));
        }
      }
    }

    async function loadAI() {
       try {
         await loadFaceModels();
         return true;
       } catch (e) {
         return false;
       }
    }

    async function init() {
      try {
        await startCamera();
        await loadAI();
        if (!isMounted) return;
        setIsReady(true);
        setIsLoading(false);

        // 실시간 렌더링 및 감지 루프
        const renderLoop = async () => {
          if (!isMounted) return;
          
          if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d", { alpha: false });

            if (video.readyState === 4 && !video.paused) {
              if (!videoStarted) setVideoStarted(true);
              
              if (ctx) {
                // 1. 비디오 프레임을 캔버스에 직접 그리기 (검은 화면 방지 핵심)
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                
                // 2. 얼굴 감지 실행
                try {
                  const detection = await detectFaceFromVideo(video);
                  if (detection) {
                    setFaceDetected(true);
                    // 랜드마크 그리기 (기존 drawLandmarks 대신 직접 그림)
                    ctx.strokeStyle = "#00ff00";
                    ctx.lineWidth = 2;
                    const box = detection.detection.box;
                    ctx.strokeRect(box.x, box.y, box.width, box.height);
                  } else {
                    setFaceDetected(false);
                  }
                }
                catch (e) {}
              }
            }
          }
          requestAnimationFrame(renderLoop);
        };

        requestAnimationFrame(renderLoop);
      } catch (err) {
        if (isMounted) setIsLoading(false);
      }
    }

    init();

    return () => {
      isMounted = false;
      if (currentStream) currentStream.getTracks().forEach(track => track.stop());
    };
  }, []);

  // 비디오 수동 재생 핸들러
  const handleForcePlay = async () => {
    if (videoRef.current) {
      try {
        await videoRef.current.play();
        setVideoStarted(true);
      } catch (err) {
        alert("카메라를 시작할 수 없습니다. 브라우저 설정을 확인해주세요.");
      }
    }
  };

  // 촬영
  const handleCapture = () => {
    if (!videoRef.current || !canvasRef.current || !videoStarted) return;

    // 현재 캔버스(화면에 보이는 그대로)를 이미지로 변환
    const imageData = canvasRef.current.toDataURL("image/jpeg", 0.9);
    setCapturedImage(imageData);
  };

  // 재촬영
  const handleRetake = () => {
    setCapturedImage("");
  };

  // 확인
  const handleConfirm = () => {
    if (capturedImage) {
      onCapture(capturedImage);
    }
  };

  // 로딩 중
  if (isLoading && !videoStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 p-4">
        <PlayfulCard color="white" className="p-8 text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 mx-auto mb-4 border-4 border-[var(--playful-purple)] border-t-transparent rounded-full"
          />
          <p
            className="text-xl text-[var(--border-dark)]/70"
            style={{ fontFamily: "var(--font-gaegu), cursive" }}
          >
            카메라 연결 중...
          </p>
        </PlayfulCard>
      </div>
    );
  }

  // 에러
  if (error && !videoStarted) {
    const isInsecureContext = typeof window !== "undefined" && !window.isSecureContext;
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 p-4">
        <div className="max-w-md w-full space-y-4">
          <PlayfulCard color="var(--playful-coral)" className="p-8 text-center">
            <span className="text-6xl mb-4 block">😢</span>
            <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "var(--font-gaegu), cursive" }}>
              {isInsecureContext ? "보안 연결 필요" : "카메라 오류"}
            </h2>
            <p className="text-lg text-[var(--border-dark)]/70 mb-6" style={{ fontFamily: "var(--font-gaegu), cursive" }}>
              {isInsecureContext ? "모바일에서는 HTTPS 연결이 필수입니다." : error}
            </p>
            <WobblyButton variant="success" className="w-full" onClick={() => window.location.reload()}>🔄 다시 시도</WobblyButton>
          </PlayfulCard>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 py-8 px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="mb-6 flex items-center justify-between">
          <WobblyButton variant="ghost" size="sm" onClick={onBack}>← 나가기</WobblyButton>
          {faceDetected && !capturedImage && (
            <div className="px-3 py-1 bg-green-100 border-2 border-green-500 rounded-full flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-bold text-green-700" style={{ fontFamily: "var(--font-gaegu), cursive" }}>인식됨</span>
            </div>
          )}
          <div className="w-20" />
        </div>

        <PlayfulCard color="white" className="p-4 overflow-hidden">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-black shadow-inner">
            {capturedImage ? (
              <img src={capturedImage} alt="Captured" className="w-full h-full object-cover" />
            ) : (
              <>
                <video ref={videoRef} autoPlay playsInline muted className="absolute inset-0 w-full h-full object-cover opacity-0 pointer-events-none" />
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover" style={{ transform: "scaleX(-1)" }} />
                
                {!videoStarted && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-30">
                    <WobblyButton color="var(--playful-yellow)" size="xl" onClick={handleForcePlay}>▶ 카메라 켜기</WobblyButton>
                  </div>
                )}

                {!faceDetected && videoStarted && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none border-4 border-dashed border-white/20 rounded-full m-8" />
                )}
              </>
            )}
          </div>

          <div className="mt-6">
            {capturedImage ? (
              <div className="flex gap-3">
                <WobblyButton variant="secondary" size="lg" className="flex-1" onClick={handleRetake}>🔄 다시 찍기</WobblyButton>
                <WobblyButton variant="success" size="lg" className="flex-1" onClick={handleConfirm}>✓ 확인</WobblyButton>
              </div>
            ) : (
              <WobblyButton variant="success" size="xl" className="w-full" onClick={handleCapture} disabled={!videoStarted}>
                📸 관상 분석하기
              </WobblyButton>
            )}
          </div>
        </PlayfulCard>
      </div>
    </div>
  );
}
