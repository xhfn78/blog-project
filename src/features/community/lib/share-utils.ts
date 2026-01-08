/**
 * 공유 유틸리티
 * TikTok/Instagram 최적화된 결과 이미지 생성
 */

import type { GameResult, Grade } from "@/entities/challenge";

interface ShareImageOptions {
  result: GameResult;
  challengeTitle: string;
  width?: number;
  height?: number;
}

const GRADE_COLORS: Record<Grade, { bg: string; text: string }> = {
  S: { bg: "#FFD700", text: "#1A1A2E" },
  A: { bg: "#FF85A1", text: "#1A1A2E" },
  B: { bg: "#85C1E9", text: "#1A1A2E" },
  C: { bg: "#88D8B0", text: "#1A1A2E" },
  D: { bg: "#F5B041", text: "#1A1A2E" },
  F: { bg: "#E74C3C", text: "#FFFFFF" },
};

const GRADE_MESSAGES: Record<Grade, string> = {
  S: "완벽해요! 🌟",
  A: "최고예요! 🔥",
  B: "잘했어요! 👏",
  C: "괜찮아요! 💪",
  D: "다시 도전! 🎯",
  F: "연습이 필요해요 📚",
};

/**
 * Canvas API로 공유용 이미지 생성
 * TikTok/Instagram 최적화 (9:16 비율)
 */
export async function generateShareImage(options: ShareImageOptions): Promise<Blob | null> {
  const { result, challengeTitle, width = 1080, height = 1920 } = options;

  try {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    if (!ctx) return null;

    const gradeColors = GRADE_COLORS[result.grade];

    // 배경 그라데이션
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, "#FFFBEB");
    gradient.addColorStop(0.5, gradeColors.bg);
    gradient.addColorStop(1, "#FFFBEB");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // 패턴 장식 (원형)
    ctx.globalAlpha = 0.1;
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const r = Math.random() * 100 + 50;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = ["#FF85A1", "#85C1E9", "#88D8B0", "#FFDE59"][i % 4];
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    // 로고
    ctx.font = "bold 48px sans-serif";
    ctx.fillStyle = "#2D3436";
    ctx.textAlign = "center";
    ctx.fillText("🎵 비트온워드", width / 2, 150);

    // 챌린지 제목
    ctx.font = "bold 36px sans-serif";
    ctx.fillStyle = "#2D3436";
    ctx.fillText(challengeTitle, width / 2, 230);

    // 등급 원형 배경
    const gradeY = height / 2 - 100;
    ctx.beginPath();
    ctx.arc(width / 2, gradeY, 180, 0, Math.PI * 2);
    ctx.fillStyle = gradeColors.bg;
    ctx.fill();
    ctx.strokeStyle = "#2D3436";
    ctx.lineWidth = 8;
    ctx.stroke();

    // 등급 텍스트
    ctx.font = "bold 200px sans-serif";
    ctx.fillStyle = gradeColors.text;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(result.grade, width / 2, gradeY);

    // 등급 메시지
    ctx.font = "bold 48px sans-serif";
    ctx.fillStyle = "#2D3436";
    ctx.fillText(GRADE_MESSAGES[result.grade], width / 2, gradeY + 250);

    // 통계 박스
    const statsY = height / 2 + 250;
    const boxWidth = 280;
    const boxHeight = 120;
    const boxGap = 30;
    const startX = (width - boxWidth * 3 - boxGap * 2) / 2;

    const stats = [
      { label: "점수", value: result.totalScore.toLocaleString(), icon: "💎" },
      { label: "정확도", value: `${result.accuracy}%`, icon: "🎯" },
      { label: "최대 콤보", value: `${result.maxCombo}x`, icon: "🔥" },
    ];

    stats.forEach((stat, i) => {
      const x = startX + i * (boxWidth + boxGap);

      // 박스
      ctx.fillStyle = "#FFFFFF";
      ctx.strokeStyle = "#2D3436";
      ctx.lineWidth = 4;
      roundRect(ctx, x, statsY, boxWidth, boxHeight, 20);

      // 아이콘
      ctx.font = "40px sans-serif";
      ctx.fillStyle = "#2D3436";
      ctx.textAlign = "center";
      ctx.fillText(stat.icon, x + boxWidth / 2, statsY + 35);

      // 값
      ctx.font = "bold 36px sans-serif";
      ctx.fillStyle = "#2D3436";
      ctx.fillText(stat.value, x + boxWidth / 2, statsY + 80);

      // 라벨
      ctx.font = "20px sans-serif";
      ctx.fillStyle = "#666";
      ctx.fillText(stat.label, x + boxWidth / 2, statsY + 110);
    });

    // Perfect/Good/Miss
    const hitY = statsY + 180;
    ctx.font = "bold 28px sans-serif";
    ctx.fillStyle = "#2D3436";
    ctx.textAlign = "center";
    ctx.fillText(
      `✨ Perfect: ${result.perfectCount}  👍 Good: ${result.goodCount}  ❌ Miss: ${result.missCount}`,
      width / 2,
      hitY
    );

    // 하단 워터마크
    ctx.font = "24px sans-serif";
    ctx.fillStyle = "#666";
    ctx.fillText("saythewordonbeat.com에서 플레이하세요!", width / 2, height - 100);

    // Blob으로 변환
    return new Promise((resolve) => {
      canvas.toBlob((blob) => resolve(blob), "image/png", 1.0);
    });
  } catch (error) {
    console.error("Failed to generate share image:", error);
    return null;
  }
}

// 둥근 사각형 헬퍼
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

/**
 * 이미지 다운로드
 */
export function downloadImage(blob: Blob, filename: string = "beatonword-result.png") {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * 클립보드에 이미지 복사
 */
export async function copyImageToClipboard(blob: Blob): Promise<boolean> {
  try {
    await navigator.clipboard.write([
      new ClipboardItem({ "image/png": blob }),
    ]);
    return true;
  } catch (error) {
    console.error("Failed to copy image to clipboard:", error);
    return false;
  }
}

/**
 * 네이티브 공유 (모바일)
 */
export async function shareNative(
  blob: Blob,
  title: string = "비트온워드 결과"
): Promise<boolean> {
  try {
    const file = new File([blob], "beatonword-result.png", { type: "image/png" });

    if (navigator.share && navigator.canShare({ files: [file] })) {
      await navigator.share({
        title,
        text: "비트온워드에서 도전해보세요! 🎵",
        files: [file],
      });
      return true;
    }
    return false;
  } catch (error) {
    console.error("Failed to share:", error);
    return false;
  }
}

/**
 * 텍스트 공유 (URL 공유)
 */
export function getShareText(result: GameResult, challengeId: string): string {
  return `🎵 비트온워드에서 ${result.grade}등급 달성! 🔥
💎 점수: ${result.totalScore.toLocaleString()}
🎯 정확도: ${result.accuracy}%
🔥 최대 콤보: ${result.maxCombo}x

나도 도전하기 👉 beatonword.com/play/${challengeId}`;
}
