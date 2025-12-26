"use client";

import React from "react";
import { ToolLayout } from "@/shared/ui/tool-layout";
import { BackgroundBeams } from "@/shared/ui/background-beams";
import { config } from "./tool.config";
import { FramerBuilderTool } from "./ui/framer-builder-tool";
import { SeoGuide } from "./ui/seo-guide";

/**
 * SEO 메타데이터 생성 함수
 */
export async function generateMetadata() {
  return {
    title: `${config.name} | VibeVisual 개발 도구`,
    description: config.description,
    keywords: config.tags.join(", "),
  };
}

export default function FramerMotionBuilderPage() {
  return (
    <ToolLayout config={config}>
      <div className="relative space-y-20 pb-20">
        <div className="absolute inset-0 -z-10 overflow-hidden opacity-20">
          <BackgroundBeams />
        </div>

        {/* 1. 메인 빌더 섹션 */}
        <FramerBuilderTool />

        {/* 2. SEO 섹션 */}
        <SeoGuide />
      </div>
    </ToolLayout>
  );
}
