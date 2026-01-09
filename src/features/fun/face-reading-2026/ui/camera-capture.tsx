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

  // 캔버스 크기 설정
  useEffect(() => {
    if (videoRef.current && canvasRef.current) {
      const updateSize = () => {
        if (videoRef.current && videoRef.current.videoWidth > 0) {
          canvasRef.current!.width = videoRef.current.videoWidth;
          canvasRef.current!.height = videoRef.current.videoHeight;
        } else {
          setTimeout(updateSize, 500);
        }
      };
      updateSize();
    }
  }, [videoStarted]);

  // 촬영
  const handleCapture = () => {
    if (!videoRef.current || !canvasRef.current || !faceDetected) return;

    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 비디오 프레임을 캔버스에 그리기
    ctx.drawImage(videoRef.current, 0, 0);

    // Base64 이미지 데이터 생성
    const imageData = canvas.toDataURL("image/jpeg", 0.9);

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
  if (isLoading) {
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
            AI 모델 로딩 중...
          </p>
        </PlayfulCard>
      </div>
    );
  }

  // 에러
  if (error) {
    const isInsecureContext = debugInfo && !debugInfo.isSecureContext;

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 p-4">
        <div className="max-w-md w-full space-y-4">
          <PlayfulCard color="var(--playful-coral)" className="p-8 text-center">
            <span className="text-6xl mb-4 block">😢</span>
            <h2
              className="text-2xl font-bold text-[var(--border-dark)] mb-4"
              style={{ fontFamily: "var(--font-gaegu), cursive" }}
            >
              {isInsecureContext ? "보안 연결 필요" : "카메라 오류"}
            </h2>
            <p
              className="text-lg text-[var(--border-dark)]/70 mb-6"
              style={{ fontFamily: "var(--font-gaegu), cursive" }}
            >
              {isInsecureContext 
                ? "모바일에서는 보안(HTTPS) 연결에서만 카메라를 사용할 수 있습니다." 
                : error}
            </p>
            
            {isInsecureContext ? (
              <div className="bg-white/50 rounded-lg p-4 text-left text-sm text-[var(--border-dark)] space-y-2 mb-4">
                <p className="font-bold">💡 해결 방법:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>PC 브라우저에서 <b>localhost</b>로 접속하세요.</li>
                  <li>또는 <b>Vercel</b> 등으로 배포 후 접속하세요.</li>
                  <li>개발 중이라면 <b>localtunnel</b> 등을 이용해 HTTPS 주소를 생성하세요.</li>
                </ul>
              </div>
            ) : (
              debugInfo && (
                <div className="bg-black/5 text-left p-3 rounded-lg text-xs font-mono mb-4 overflow-auto max-h-32">
                  <p className="font-bold mb-1">🔍 진단 정보:</p>
                  <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
                </div>
              )
            )}

            <div className="flex gap-3">
              <WobblyButton variant="secondary" className="flex-1" onClick={onBack}>
                ← 돌아가기
              </WobblyButton>
              <WobblyButton
                variant="success"
                className="flex-1"
                onClick={() => window.location.reload()}
              >
                🔄 재시도
              </WobblyButton>
            </div>
          </PlayfulCard>

          <PlayfulCard color="var(--playful-yellow)" className="p-4">
            <h3
              className="text-lg font-bold text-[var(--border-dark)] mb-2"
              style={{ fontFamily: "var(--font-gaegu), cursive" }}
            >
              💡 해결 방법
            </h3>
            <ul
              className="text-sm text-[var(--border-dark)]/70 space-y-2"
              style={{ fontFamily: "var(--font-gaegu), cursive" }}
            >
              <li>• 브라우저 주소창의 🔒 아이콘을 클릭하여 카메라 권한을 허용하세요</li>
              <li>• 다른 앱이나 탭에서 카메라를 사용 중이라면 종료하세요</li>
              <li>• Chrome, Safari, Edge 최신 버전을 사용하세요</li>
              <li>• 모바일에서는 브라우저(앱 내 브라우저 제외)를 사용하세요</li>
            </ul>
          </PlayfulCard>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 py-8 px-4">
      <div className="container mx-auto max-w-2xl">
        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex items-center justify-between"
        >
          <WobblyButton variant="ghost" size="sm" onClick={onBack}>
            ← 나가기
          </WobblyButton>

          {/* 얼굴 감지 상태 */}
          <AnimatePresence mode="wait">
            {faceDetected && !capturedImage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-2 px-3 py-1 bg-green-100 border-2 border-green-500 rounded-full"
              >
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span
                  className="text-sm font-bold text-green-700"
                  style={{ fontFamily: "var(--font-gaegu), cursive" }}
                >
                  얼굴 인식됨 ✓
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="w-20" />
        </motion.div>

        {/* 카메라 화면 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <PlayfulCard color="white" className="p-4 overflow-hidden">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-black">
              {/* 비디오 또는 캡처 이미지 */}
              {capturedImage ? (
                <img
                  src={capturedImage}
                  alt="Captured"
                  className="w-full h-full object-cover"
                />
              ) : (
                <>
                  {/* 비디오는 데이터 소스로만 사용하고 화면에서는 숨김 */}
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="absolute inset-0 w-full h-full object-cover opacity-0 pointer-events-none"
                  />

                  {/* 실제 화면은 캔버스에 직접 그려서 보여줌 (검은 화면 방지) */}
                  <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full object-cover transform scale-x-[-1]"
                  />

                  {/* 수동 재생 버튼 (자동 재생 차단 시) */}
                  {!videoStarted && !isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-30">
                      <div className="text-center p-6">
                        <p className="text-white mb-4" style={{ fontFamily: "var(--font-gaegu), cursive" }}>
                          카메라가 준비되었습니다!
                        </p>
                        <WobblyButton color="var(--playful-yellow)" onClick={handleForcePlay}>
                          ▶ 카메라 시작하기
                        </WobblyButton>
                      </div>
                    </div>
                  )}

                  {/* 가이드 프레임 */}
                  {!faceDetected && videoStarted && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                      <div className="w-[80%] h-[80%] border-4 border-dashed border-white/30 rounded-full" />
                    </div>
                  )}
                </>
              )}

              {/* 안내 메시지 */}
              {!capturedImage && videoStarted && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-4 text-center z-20">
                  <p
                    className="text-white text-lg"
                    style={{ fontFamily: "var(--font-gaegu), cursive" }}
                  >
                    {faceDetected
                      ? "얼굴이 인식되었습니다! 촬영하세요 📸"
                      : "얼굴을 화면 중앙에 맞춰주세요"}
                  </p>
                </div>
              )}
            </div>

            {/* 촬영 버튼 */}
            <div className="mt-4">
              {capturedImage ? (
                <div className="flex gap-3">
                  <WobblyButton
                    variant="secondary"
                    size="lg"
                    className="flex-1"
                    onClick={handleRetake}
                  >
                    🔄 다시 촬영
                  </WobblyButton>
                  <WobblyButton
                    variant="success"
                    size="lg"
                    className="flex-1"
                    onClick={handleConfirm}
                  >
                    ✓ 이 사진 사용
                  </WobblyButton>
                </div>
              ) : (
                <WobblyButton
                  variant="success"
                  size="xl"
                  className="w-full"
                  onClick={handleCapture}
                  disabled={!videoStarted} // 얼굴 인식 안 되더라도 비디오만 나오면 촬영 가능하게 완화
                >
                  📸 촬영하기
                </WobblyButton>
              )}
            </div>
          </PlayfulCard>
        </motion.div>

        {/* 안내사항 */}
        {!capturedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6"
          >
            <PlayfulCard color="var(--playful-yellow)" className="p-4">
              <h3
                className="text-lg font-bold text-[var(--border-dark)] mb-2"
                style={{ fontFamily: "var(--font-gaegu), cursive" }}
              >
                💡 촬영 팁
              </h3>
              <ul
                className="text-sm text-[var(--border-dark)]/70 space-y-1"
                style={{ fontFamily: "var(--font-gaegu), cursive" }}
              >
                <li>• 밝은 곳에서 촬영하세요</li>
                <li>• 정면을 바라봐주세요</li>
                <li>• 머리카락이 얼굴을 가리지 않도록 해주세요</li>
                <li>• 안경은 벗어도 되고 쓰셔도 됩니다</li>
              </ul>
            </PlayfulCard>
          </motion.div>
        )}
      </div>
    </div>
  );
}
