'use client';

import { ToolLayout, ToolSection } from "@/shared/ui/tool-layout";
import { config } from "./tool.config";
import { Typography } from "@/shared/ui/typography";
import { SlimmerToolUI } from "./ui/slimmer-tool";
import { SeoGuide } from "./ui/seo-guide";
import Link from 'next/link';

export async function generateMetadata() {
  return {
    title: config.name,
    description: config.description,
  };
}

export default function VibeTokenSlimmerPage() {
  return (
    <ToolLayout config={config}>
      {/* 1️⃣ Tool Execution Area */}
      <ToolSection title="AI 토큰 절감기">
        <SlimmerToolUI />
      </ToolSection>

      {/* Ad space */}
      <div className="my-8" />

      {/* 2️⃣ Usage Guide */}
      <ToolSection title="사용 방법">
        <div className="space-y-4">
          <Typography variant="p">
            AI 토큰 절감기는 복잡한 코드나 프롬프트를 AI에게 전달하기 전에 군더더기를 제거하여 토큰 사용량을 최적화하는 도구입니다. 사용법은 매우 간단합니다.
          </Typography>
          <ol className="list-decimal list-inside space-y-2">
            <li><strong>입력:</strong> 좌측 'Input' 영역에 분석하거나 질문하고 싶은 코드 스니펫, 긴 프롬프트, 또는 일반 텍스트를 붙여넣습니다.</li>
            <li><strong>실시간 변환 확인:</strong> 텍스트를 입력하는 즉시, 우측 'Slimmed Output' 영역에 최적화된 결과가 실시간으로 표시됩니다. 동시에 'Real-time Savings Dashboard'에서 원본 토큰, 절감된 토큰, 그리고 예상 비용 절감액을 확인할 수 있습니다.</li>
            <li><strong>옵션 조절:</strong> 'Slimming Options' 카드에서 'Strip Imports'(임포트 구문 제거), 'Strip Comments'(주석 제거), 'Compress Whitespace'(공백 압축) 옵션을 켜고 끄며 필요에 맞게 최적화 수준을 조절할 수 있습니다.</li>
            <li><strong>결과 복사:</strong> 'One-Click AI Direct Injection' 카드에서 사용하려는 AI 서비스(ChatGPT, Cursor 등)에 맞는 버튼을 클릭하세요. 해당 AI에 최적화된 형식으로 가공된 결과가 클립보드에 복사됩니다.</li>
          </ol>
        </div>
      </ToolSection>

      {/* Ad space */}
      <div className="my-8" />

      {/* 3️⃣ SEO Content Area */}
      <SeoGuide />
    </ToolLayout>
  );
}