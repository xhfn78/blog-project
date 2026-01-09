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
  const isRunningRef = useRef(false); // 루프 제어용 Ref (상태 꼬임 방지)

  const [status, setStatus] = useState<"idle" | "requesting" | "active" | "error">("idle");
  const [error, setError] = useState<string>("");
  const [faceDetected, setFaceDetected] = useState(false);
  const [aiReady, setAiReady] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string>("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    loadFaceModels().then(() => setAiReady(true)).catch(() => {});
    
    return () => {
      isRunningRef.current = false;
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

  const handleStartCamera = async () => {
    if (status === "requesting") return;
    setStatus("requesting");
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: 640, height: 640 },
        audio: false
      });

      if (videoRef.current) {
        const video = videoRef.current;
        video.srcObject = stream;
        video.setAttribute("playsinline", "true");
        video.muted = true;
        
        await video.play();
        streamRef.current = stream;
        setStatus("active");
        isRunningRef.current = true;
        startDrawing(); // 렌더링 루프 시작
      }
    } catch (err: any) {
      setError("카메라를 시작할 수 없습니다. 권한 설정을 확인해주세요.");
      setStatus("error");
    }
  };

  const startDrawing = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const render = async () => {
      if (!isRunningRef.current) return;

      // 비디오 데이터가 유효한지 체크 (검은 화면 방지 핵심)
      if (video.readyState >= 2 && video.videoWidth > 0) {
        if (canvas.width !== video.videoWidth) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
        }

        // 1. 캔버스에 비디오 프레임 강제 복사
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // 2. AI 분석 (시각적 피드백용)
        if (aiReady && Date.now() % 20 === 0) {
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
      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
  };

  const handleCapture = () => {
    if (!canvasRef.current || status !== "active") return;
    
    // 현재 화면에 보이는 캔버스 자체를 캡처 (가장 확실함)
    const finalCanvas = document.createElement("canvas");
    finalCanvas.width = canvasRef.current.width;
    finalCanvas.height = canvasRef.current.height;
    const fCtx = finalCanvas.getContext("2d");
    
    if (fCtx) {
      // 거울 모드로 캡처
      fCtx.translate(finalCanvas.width, 0);
      fCtx.scale(-1, 1);
      // 비디오 원본을 다시 그려서 가이드라인 없는 깨끗한 사진 생성
      fCtx.drawImage(videoRef.current!, 0, 0, finalCanvas.width, finalCanvas.height);
      
      const data = finalCanvas.toDataURL("image/jpeg", 0.9);
      setCapturedImage(data);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 py-8 px-4 font-[family-name:var(--font-gaegu)]">
      <div className="container mx-auto max-w-2xl">
        <div className="mb-6 flex items-center justify-between">
          <WobblyButton variant="ghost" size="sm" onClick={onBack}>← 나가기</WobblyButton>
          {faceDetected && !capturedImage && (
            <div className="px-4 py-1.5 bg-green-500 text-white rounded-full text-sm font-bold shadow-lg">인식 성공! ✓</div>
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
                        <div className="space-y-4 text-[var(--border-dark)]">
                          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto" />
                          <p className="text-xl font-bold">카메라 연결 시도 중...</p>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          <p className="text-2xl font-bold text-[var(--border-dark)]">카메라를 켤까요?</p>
                          <WobblyButton color="var(--playful-yellow)" size="xl" className="w-full" onClick={handleStartCamera}>
                            📸 카메라 시작하기
                          </WobblyButton>
                          {error && <p className="text-red-500 text-sm font-bold">{error}</p>}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {aiReady && status === "active" && (
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md text-[12px] text-white px-4 py-1.5 rounded-full z-40 font-bold border border-white/20">
                    AI 분석 준비 완료 ✨
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
              <WobblyButton variant="success" size="xl" className="w-full shadow-2xl" onClick={handleCapture} disabled={status !== "active"}>
                {status === "active" ? "📸 지금 촬영하기" : "카메라를 먼저 켜주세요"}
              </WobblyButton>
            )}
          </div>
        </PlayfulCard>
      </div>
    </div>
  );
}