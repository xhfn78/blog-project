import { Metadata } from "next";

export const metadata: Metadata = {
  title: "2026년 AI 관상 분석 - 나의 신년 운세 확인하기",
  description: "최신 AI 기술로 68개 얼굴 포인트를 분석하여 2026년 재물운, 애정운을 알려드립니다. 완벽한 프라이버시 보호.",
  keywords: ["2026년운세", "AI관상", "얼굴분석", "신년운세", "무료관상"],
  openGraph: {
    title: "2026년 나의 AI 관상 분석 결과는?",
    description: "AI가 알려주는 2026년 대박 날 관상 분석! 지금 바로 확인해보세요.",
    images: ["/og-face-reading.png"],
  },
};

export default function FaceReadingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
