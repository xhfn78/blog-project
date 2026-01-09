"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [videoStarted, setVideoStarted] = useState(false);
  const [faceDetected, setFaceDetected] = useState(false);
  const [error, setError] = useState<string>("");
  const [logs, setLogs] = useState<string[]>([]);
  const [capturedImage, setCapturedImage] = useState<string>("");

  const addLog = (msg: string) => {
    console.log(`[CameraLog] ${msg}`);
    if (msg.includes("AI 모델")) {
      setLogs([msg]); // 최신 상태 하나만 유지
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    let isMounted = true;
    let currentStream: MediaStream | null = null;
    let animationFrameId: number;

    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
          audio: false
        });
        if (!isMounted) {
          stream.getTracks().forEach(t => t.stop());
          return;
        }
        currentStream = stream;
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.setAttribute("playsinline", "true");
          videoRef.current.muted = true;
          try {
            await videoRef.current.play();
            setVideoStarted(true);
          } catch (e) {
            console.warn("Auto-play blocked");
          }
        }
      } catch (err: any) {
        if (isMounted) {
          setError(`카메라 오류: ${err.message}`);
          setIsLoading(false);
        }
      }
    }

    async function loadAI() {
      addLog("AI 모델 준비 중...");
      try {
        const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 10000));
        await Promise.race([loadFaceModels(), timeout]);
        addLog("AI 모델 로드 완료");
      } catch (e) {
        addLog("AI 모델 로드 실패");
      }
    }

    async function init() {
      loadAI();
      await startCamera();
      if (!isMounted) return;
      setIsLoading(false);
      setIsReady(true);

      const renderLoop = async () => {
        if (!isMounted) return;
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (video && canvas && video.readyState >= 2) {
          const ctx = canvas.getContext("2d", { alpha: false });
          if (ctx) {
            if (canvas.width !== video.videoWidth) {
              canvas.width = video.videoWidth;
              canvas.height = video.videoHeight;
            }
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            if (videoStarted && Date.now() % 15 === 0) {
              try {
                const detection = await detectFaceFromVideo(video);
                setFaceDetected(!!detection);
                if (detection) {
                  ctx.strokeStyle = "#00ff00";
                  ctx.lineWidth = 3;
                  const box = detection.detection.box;
                  ctx.strokeRect(box.x, box.y, box.width, box.height);
                }
              } catch (e) {}
            }
          }
        }
        animationFrameId = requestAnimationFrame(renderLoop);
      };
      animationFrameId = requestAnimationFrame(renderLoop);
    }

    init();

    return () => {
      isMounted = false;
      cancelAnimationFrame(animationFrameId);
      if (currentStream) currentStream.getTracks().forEach(t => t.stop());
      if (videoRef.current) {
        videoRef.current.srcObject = null;
        videoRef.current.load();
      }
    };
  }, []);

  const handleForcePlay = async () => {
    if (videoRef.current) {
      try {
        await videoRef.current.play();
        setVideoStarted(true);
      } catch (e) {
        window.location.reload();
      }
    }
  };

  const handleCapture = () => {
    if (!videoRef.current || !canvasRef.current || !videoStarted) return;
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      setCapturedImage(canvas.toDataURL("image/jpeg", 0.9));
    }
  };

  if (isLoading && !videoStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 p-4">
        <PlayfulCard color="white" className="p-8 text-center">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-16 h-16 mx-auto mb-4 border-4 border-[var(--playful-purple)] border-t-transparent rounded-full" />
          <p className="text-xl text-[var(--border-dark)]/70" style={{ fontFamily: "var(--font-gaegu), cursive" }}>카메라 연결 중...</p>
        </PlayfulCard>
      </div>
    );
  }

  if (error && !videoStarted) {
    const isInsecureContext = typeof window !== "undefined" && !window.isSecureContext;
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 p-4">
        <div className="max-w-md w-full space-y-4">
          <PlayfulCard color="var(--playful-coral)" className="p-8 text-center">
            <span className="text-6xl mb-4 block">😢</span>
            <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "var(--font-gaegu), cursive" }}>{isInsecureContext ? "보안 연결 필요" : "카메라 오류"}</h2>
            <p className="text-lg text-[var(--border-dark)]/70 mb-6" style={{ fontFamily: "var(--font-gaegu), cursive" }}>{isInsecureContext ? "모바일에서는 HTTPS 연결이 필수입니다." : error}</p>
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
                    <div className="text-center p-6">
                      <p className="text-white mb-4" style={{ fontFamily: "var(--font-gaegu), cursive" }}>카메라가 준비되었습니다!</p>
                      <WobblyButton color="var(--playful-yellow)" size="xl" onClick={handleForcePlay}>▶ 카메라 시작하기</WobblyButton>
                    </div>
                  </div>
                )}
                {logs.length > 0 && (
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md text-[12px] text-white px-4 py-1.5 rounded-full pointer-events-none z-40 font-bold border border-white/20">
                    {logs[0]}
                  </div>
                )}
              </>
            )}
          </div>

          <div className="mt-6">
            {capturedImage ? (
              <div className="flex gap-3">
                <WobblyButton variant="secondary" size="lg" className="flex-1" onClick={() => setCapturedImage("")}>🔄 다시 찍기</WobblyButton>
                <WobblyButton variant="success" size="lg" className="flex-1" onClick={() => onCapture(capturedImage)}>✓ 확인</WobblyButton>
              </div>
            ) : (
              <WobblyButton variant="success" size="xl" className="w-full" onClick={handleCapture} disabled={!videoStarted}>
                {videoStarted ? "📸 관상 분석하기" : "카메라 준비 중..."}
              </WobblyButton>
            )}
          </div>
        </PlayfulCard>
      </div>
    </div>
  );
}
