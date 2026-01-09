"use client";

import { useState } from "react";

/**
 * 카메라 테스트 페이지
 * /fun/face-reading-2026/test 에서 접근
 */
export default function CameraTestPage() {
  const [logs, setLogs] = useState<string[]>([]);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const addLog = (message: string) => {
    console.log(message);
    setLogs((prev) => [...prev, `${new Date().toLocaleTimeString()} - ${message}`]);
  };

  const testCamera = async () => {
    setLogs([]);
    addLog("🔍 테스트 시작");

    // 1. 환경 체크
    addLog(`브라우저: ${navigator.userAgent}`);
    addLog(`프로토콜: ${window.location.protocol}`);
    addLog(`호스트: ${window.location.hostname}`);
    addLog(`navigator.mediaDevices 존재: ${!!navigator.mediaDevices}`);
    addLog(`getUserMedia 존재: ${!!navigator.mediaDevices?.getUserMedia}`);

    try {
      // 2. 장치 목록 가져오기
      if (navigator.mediaDevices.enumerateDevices) {
        addLog("📷 연결된 미디어 장치 확인 중...");
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter((d) => d.kind === "videoinput");
        addLog(`비디오 장치 개수: ${videoDevices.length}`);
        videoDevices.forEach((device, i) => {
          addLog(`  ${i + 1}. ${device.label || "이름 없음"} (${device.deviceId})`);
        });
      }

      // 3. 카메라 권한 요청
      addLog("🔐 카메라 권한 요청 중...");
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
        },
        audio: false,
      });

      addLog("✅ 카메라 권한 허용됨!");
      addLog(`스트림 ID: ${mediaStream.id}`);
      addLog(`비디오 트랙 개수: ${mediaStream.getVideoTracks().length}`);

      mediaStream.getVideoTracks().forEach((track, i) => {
        addLog(`  트랙 ${i + 1}: ${track.label}`);
        addLog(`    - 활성화: ${track.enabled}`);
        addLog(`    - 상태: ${track.readyState}`);
        addLog(`    - 설정: ${JSON.stringify(track.getSettings())}`);
      });

      setStream(mediaStream);
      addLog("🎉 테스트 성공! 아래에 카메라 화면이 표시됩니다.");
    } catch (err: any) {
      addLog(`❌ 에러 발생!`);
      addLog(`에러 이름: ${err.name}`);
      addLog(`에러 메시지: ${err.message}`);
      addLog(`에러 스택: ${err.stack}`);

      // 에러 유형별 해결 방법
      if (err.name === "NotAllowedError") {
        addLog("💡 해결: 브라우저 설정에서 카메라 권한을 허용하세요.");
        addLog("   - Chrome: 주소창 왼쪽 자물쇠 아이콘 클릭 → 카메라 → 허용");
      } else if (err.name === "NotFoundError") {
        addLog("💡 해결: 카메라가 연결되어 있는지 확인하세요.");
      } else if (err.name === "NotReadableError") {
        addLog("💡 해결: 다른 앱이 카메라를 사용 중입니다. 종료하세요.");
      }
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
      addLog("🛑 카메라 종료됨");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-4">🔧 카메라 디버깅 테스트</h1>
          <p className="text-gray-600 mb-6">
            카메라가 제대로 작동하는지 테스트합니다. 아래 버튼을 클릭하세요.
          </p>

          <div className="flex gap-3">
            <button
              onClick={testCamera}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-bold"
            >
              📸 카메라 테스트 시작
            </button>
            {stream && (
              <button
                onClick={stopCamera}
                className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 font-bold"
              >
                🛑 카메라 종료
              </button>
            )}
          </div>
        </div>

        {/* 카메라 화면 */}
        {stream && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">📹 카메라 화면</h2>
            <video
              autoPlay
              playsInline
              muted
              ref={(video) => {
                if (video && stream) {
                  video.srcObject = stream;
                }
              }}
              className="w-full max-w-2xl mx-auto rounded-lg border-4 border-green-500"
            />
          </div>
        )}

        {/* 로그 */}
        <div className="bg-gray-900 text-green-400 rounded-lg shadow-lg p-6 font-mono text-sm">
          <h2 className="text-xl font-bold mb-4 text-white">📋 디버그 로그</h2>
          <div className="space-y-1 max-h-96 overflow-y-auto">
            {logs.length === 0 ? (
              <p className="text-gray-500">로그가 없습니다. 위 버튼을 클릭하세요.</p>
            ) : (
              logs.map((log, i) => (
                <div key={i} className="py-1">
                  {log}
                </div>
              ))
            )}
          </div>
        </div>

        {/* 수동 권한 재설정 가이드 */}
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">🔐 권한 재설정 방법</h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-lg mb-2">Chrome (PC):</h3>
              <ol className="list-decimal list-inside space-y-1 text-gray-700">
                <li>주소창 왼쪽의 🔒 또는 ⓘ 아이콘 클릭</li>
                <li>&quot;사이트 설정&quot; 클릭</li>
                <li>&quot;카메라&quot; 항목을 &quot;허용&quot;으로 변경</li>
                <li>페이지 새로고침</li>
              </ol>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2">Chrome (Android):</h3>
              <ol className="list-decimal list-inside space-y-1 text-gray-700">
                <li>주소창 왼쪽의 자물쇠 아이콘 터치</li>
                <li>&quot;권한&quot; 터치</li>
                <li>&quot;카메라&quot;를 &quot;허용&quot;으로 변경</li>
                <li>페이지 새로고침</li>
              </ol>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2">Safari (iPhone):</h3>
              <ol className="list-decimal list-inside space-y-1 text-gray-700">
                <li>주소창의 &quot;aA&quot; 아이콘 터치</li>
                <li>&quot;웹사이트 설정&quot; 터치</li>
                <li>&quot;카메라&quot;를 &quot;허용&quot;으로 변경</li>
                <li>페이지 새로고침</li>
              </ol>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">❓ 문제 해결</h2>
          <ul className="space-y-2 text-gray-700">
            <li>
              <strong>권한이 계속 거부되는 경우:</strong>
              <br />
              Chrome 설정 → 개인정보 및 보안 → 사이트 설정 → 카메라 → 차단 목록에서 이 사이트 제거
            </li>
            <li>
              <strong>카메라를 찾을 수 없는 경우:</strong>
              <br />
              다른 앱(Zoom, Teams 등)을 모두 종료하고 재시도
            </li>
            <li>
              <strong>모바일에서 안 되는 경우:</strong>
              <br />
              카카오톡/인스타그램 내장 브라우저 대신 Safari/Chrome 앱에서 직접 접속
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
