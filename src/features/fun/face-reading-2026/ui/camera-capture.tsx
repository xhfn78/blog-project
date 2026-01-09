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

  const [isLoading, setIsLoading] = useState(true);
  const [videoStarted, setVideoStarted] = useState(false);
  const [faceDetected, setFaceDetected] = useState(false);
  const [error, setError] = useState<string>("");
  const [logs, setLogs] = useState<string[]>([]);
  const [capturedImage, setCapturedImage] = useState<string>("");

  const addLog = (msg: string) => {
    console.log(`[CameraLog] ${msg}`);
    if (msg.includes("AI 모델")) setLogs([msg]);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    let isMounted = true;
    let animationFrameId: number;

    async function startCamera() {
      try {
        addLog("카메라 연결 시도...");
        // 1. 가장 기본적인 설정으로 스트림 요청
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
          audio: false
        });

        if (!isMounted) {
          stream.getTracks().forEach(t => t.stop());
          return;
        }

        streamRef.current = stream;

        if (videoRef.current) {
          const video = videoRef.current;
          video.srcObject = stream;
          video.setAttribute("playsinline", "true");
          video.muted = true;
          
          // 메타데이터 로드 후 즉시 재생
          video.onloadedmetadata = () => {
            video.play().then(() => {
              setVideoStarted(true);
              addLog("카메라 작동 중");
            }).catch(() => addLog("자동 시작 차단됨"));
          };
        }
      } catch (err: any) {
        if (isMounted) {
          setError(`카메라를 켤 수 없습니다: ${err.message}`);
          setIsLoading(false);
        }
      }
    }

    async function init() {
      // AI와 카메라 병렬 실행
      loadFaceModels()
        .then(() => addLog("AI 모델 로드 완료"))
        .catch(() => addLog("AI 모델 로드 실패"));
      
      await startCamera();
      
      if (!isMounted) return;
      setIsLoading(false);

      const renderLoop = () => {
        if (!isMounted) return;
        const video = videoRef.current;
        const canvas = canvasRef.current;

        if (video && canvas && video.readyState >= 2) {
          const ctx = canvas.getContext("2d", { alpha: false });
          if (ctx) {
            if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
              canvas.width = video.videoWidth;
              canvas.height = video.videoHeight;
            }
            // 캔버스에 비디오 복사 (검은 화면 방지)
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

            // 얼굴 감지 (부하 분산)
            if (videoStarted && Date.now() % 20 === 0) {
              detectFaceFromVideo(video).then(detection => {
                if (isMounted) {
                  setFaceDetected(!!detection);
                  if (detection) {
                    ctx.strokeStyle = "#00ff00";
                    ctx.lineWidth = 4;
                    const box = detection.detection.box;
                    ctx.strokeRect(box.x, box.y, box.width, box.height);
                  }
                }
              }).catch(() => {});
            }
          }
        }
        animationFrameId = requestAnimationFrame(renderLoop);
      };
      renderLoop();
    }

    init();

    return () => {
      isMounted = false;
      cancelAnimationFrame(animationFrameId);
      if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
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
        // 재생 실패 시 스트림 재요청
        window.location.reload();
      }
    }
  };

  const handleCapture = () => {
    if (!canvasRef.current || !videoStarted) return;
    // 거울 모드 적용하여 캡처
    const canvas = document.createElement("canvas");
    const video = videoRef.current!;
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

  // 로딩 화면 (스트림 시작 전까지)
  if (isLoading && !videoStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 p-4 text-center">
        <PlayfulCard color="white" className="p-12">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-16 h-16 mx-auto mb-6 border-4 border-[var(--playful-purple)] border-t-transparent rounded-full" />
          <p className="text-2xl font-bold" style={{ fontFamily: "var(--font-gaegu), cursive" }}>카메라 연결 중...</p>
        </PlayfulCard>
      </div>
    );
  }

  // 에러 화면
  if (error && !videoStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 p-4 text-center">
        <PlayfulCard color="var(--playful-coral)" className="p-8 max-w-sm">
          <span className="text-6xl mb-4 block">😢</span>
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "var(--font-gaegu), cursive" }}>카메라 오류</h2>
          <p className="mb-6 opacity-70" style={{ fontFamily: "var(--font-gaegu), cursive" }}>{error}</p>
          <WobblyButton variant="success" className="w-full" onClick={() => window.location.reload()}>🔄 다시 시도</WobblyButton>
        </PlayfulCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 py-8 px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="mb-6 flex items-center justify-between">
          <WobblyButton variant="ghost" size="sm" onClick={onBack}>← 나가기</WobblyButton>
          {faceDetected && !capturedImage && (
            <div className="px-4 py-1.5 bg-green-500 text-white rounded-full flex items-center gap-2 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              <span className="text-sm font-bold">얼굴 인식 완료!</span>
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
                
                {!videoStarted && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-30">
                    <div className="text-center p-8 bg-white rounded-3xl border-4 border-[var(--border-dark)]">
                      <p className="text-2xl font-bold mb-6" style={{ fontFamily: "var(--font-gaegu), cursive" }}>카메라를 시작할까요?</p>
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

          <div className="mt-8">
            {capturedImage ? (
              <div className="flex gap-4">
                <WobblyButton variant="secondary" size="lg" className="flex-1" onClick={() => setCapturedImage("")}>🔄 다시 찍기</WobblyButton>
                <WobblyButton variant="success" size="lg" className="flex-1" onClick={() => onCapture(capturedImage)}>✓ 분석 시작</WobblyButton>
              </div>
            ) : (
              <WobblyButton variant="success" size="xl" className="w-full" onClick={handleCapture} disabled={!videoStarted}>
                {videoStarted ? "📸 사진 촬영하기" : "카메라 준비 중..."}
              </WobblyButton>
            )}
          </div>
        </PlayfulCard>
      </div>
    </div>
  );
}