"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { WobblyButton } from "@/shared/ui/wobbly-button";
import { PlayfulCard } from "@/shared/ui/playful-card";
import { loadFaceModels, detectFaceFromVideo } from "../lib/face-detector";

interface CameraCaptureProps {
  onCapture: (imageData: string) => void;
  onBack: () => void;
}

export function CameraCapture({ onCapture, onBack }: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [status, setStatus] = useState<"idle" | "requesting" | "active" | "error">("idle");
  const [error, setError] = useState<string>("");
  const [faceDetected, setFaceDetected] = useState(false);
  const [aiReady, setAiReady] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string>("");

  // 페이지 진입 시 스크롤만 수행
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    
    // AI 모델은 미리 백그라운드 로드
    loadFaceModels().then(() => setAiReady(true)).catch(() => console.error("AI Load Fail"));

    return () => {
      stopCamera();
    };
  }, []);

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  // 사용자가 직접 버튼을 눌러 카메라 시작 (모바일에서 가장 확실한 방법)
  const handleStartCamera = async () => {
    setStatus("requesting");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: "user",
          width: { ideal: 640 },
          height: { ideal: 640 }
        },
        audio: false
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute("playsinline", "true");
        await videoRef.current.play();
        setStatus("active");
        startRenderLoop();
      }
    } catch (err: any) {
      console.error(err);
      setError("카메라 권한이 필요합니다. 설정에서 허용해주세요.");
      setStatus("error");
    }
  };

  const startRenderLoop = () => {
    let isMounted = true;
    const render = async () => {
      if (!isMounted || status === "idle") return;

      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (video && canvas && video.readyState >= 2) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          if (canvas.width !== video.videoWidth) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
          }
          // 화면 그리기
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

          // AI 분석 (AI 로드 완료 후 1초에 5번만 실행)
          if (aiReady && Date.now() % 10 === 0) {
            try {
              const detection = await detectFaceFromVideo(video);
              setFaceDetected(!!detection);
              if (detection) {
                ctx.strokeStyle = "#00ff00";
                ctx.lineWidth = 4;
                const box = detection.detection.box;
                ctx.strokeRect(box.x, box.y, box.width, box.height);
              }
            } catch (e) {}
          }
        }
      }
      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
    return () => { isMounted = false; };
  };

  const handleCapture = () => {
    if (!canvasRef.current || status !== "active") return;
    const video = videoRef.current!;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      setCapturedImage(canvas.toDataURL("image/jpeg", 0.9));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 py-8 px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="mb-6 flex items-center justify-between">
          <WobblyButton variant="ghost" size="sm" onClick={onBack}>← 나가기</WobblyButton>
          {faceDetected && !capturedImage && (
            <div className="px-4 py-1.5 bg-green-500 text-white rounded-full text-sm font-bold shadow-lg animate-bounce">
              얼굴 인식 완료! ✓
            </div>
          )}
          <div className="w-20" />
        </div>

        <PlayfulCard color="white" className="p-4 overflow-hidden relative">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-black shadow-2xl">
            {capturedImage ? (
              <img src={capturedImage} alt="Captured" className="w-full h-full object-cover" />
            ) : (
              <>
                <video ref={videoRef} autoPlay playsInline muted className="absolute inset-0 w-full h-full object-cover opacity-0 pointer-events-none" />
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover" style={{ transform: "scaleX(-1)" }} />
                
                {status !== "active" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-30 p-6">
                    <div className="text-center bg-white p-8 rounded-3xl border-4 border-[var(--border-dark)] w-full">
                      {status === "requesting" ? (
                        <div className="space-y-4">
                          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto" />
                          <p className="text-xl font-bold" style={{ fontFamily: "var(--font-gaegu), cursive" }}>카메라 연결 중...</p>
                        </div>
                      ) : (
                        <>
                          <p className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-gaegu), cursive" }}>카메라를 켤까요?</p>
                          <p className="text-sm text-gray-500 mb-6" style={{ fontFamily: "var(--font-gaegu), cursive" }}>아래 버튼을 누르면 촬영이 시작됩니다</p>
                          <WobblyButton color="var(--playful-yellow)" size="xl" className="w-full" onClick={handleStartCamera}>
                            📸 카메라 시작하기
                          </WobblyButton>
                          {error && <p className="mt-4 text-red-500 text-sm font-bold">{error}</p>}
                        </>
                      )}
                    </div>
                  </div>
                )}

                {aiReady && status === "active" && (
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md text-[12px] text-white px-4 py-1.5 rounded-full z-40 font-bold border border-white/20">
                    AI 분석 엔진 가동 중 ✨
                  </div>
                )}
              </>
            )}
          </div>

          <div className="mt-8">
            {capturedImage ? (
              <div className="flex gap-4">
                <WobblyButton variant="secondary" size="lg" className="flex-1" onClick={() => setCapturedImage("")}>🔄 다시 찍기</WobblyButton>
                <WobblyButton variant="success" size="lg" className="flex-1" onClick={() => onCapture(capturedImage)}>✓ 분석 시작</WobblyButton>
              </div>
            ) : (
              <WobblyButton 
                variant="success" 
                size="xl" 
                className="w-full shadow-2xl" 
                onClick={handleCapture} 
                disabled={status !== "active"}
              >
                {status === "active" ? "📸 지금 촬영하기" : "카메라를 먼저 켜주세요"}
              </WobblyButton>
            )}
          </div>
        </PlayfulCard>
      </div>
    </div>
  );
}
