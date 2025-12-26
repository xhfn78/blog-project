"use client";

import React from "react";
import { ToolLayout } from "@/shared/ui/tool-layout";
import { BackgroundBeams } from "@/shared/ui/background-beams";
import { config } from "./tool.config";
import { useGitHubCard } from "./lib/use-github-card";
import { CardControls } from "./ui/CardControls";
import { CardPreview } from "./ui/CardPreview";
import { Code, Share2 } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { motion } from "framer-motion";
import { SeoGuide } from "./ui/seo-guide";

/**
 * SEO 메타데이터 생성
 */
export async function generateMetadata() {
  return {
    title: `${config.name} | VibeVisual`,
    description: config.description,
    keywords: config.tags.join(", "),
  };
}

export default function GitHubProfileCardTool() {
  const { 
    username, 
    setUsername, 
    options, 
    stats, 
    isLoading, 
    fetchMockStats, 
    updateOption,
    generatedSVG
  } = useGitHubCard();

  const handleCopySVG = () => {
    navigator.clipboard.writeText(generatedSVG);
    alert("SVG 코드가 복사되었습니다!");
  };

  return (
    <ToolLayout config={config}>
      <div className="relative space-y-24 pb-20">
        <div className="absolute inset-0 -z-10 overflow-hidden opacity-30">
          <BackgroundBeams />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4">
            <CardControls 
              username={username}
              onUsernameChange={setUsername}
              options={options}
              onOptionChange={updateOption}
              onGenerate={() => fetchMockStats(username)}
            />
          </div>

          <div className="lg:col-span-8 space-y-8">
            <div className="perspective-1000">
              <CardPreview 
                stats={stats}
                options={options}
                isLoading={isLoading}
              />
            </div>

            {stats && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-4"
              >
                <Button onClick={handleCopySVG} className="flex-1 h-14 text-lg font-bold shadow-xl shadow-indigo-500/20" variant="default">
                  <Code className="w-5 h-5 mr-2" /> SVG 코드 복사
                </Button>
                <Button className="flex-1 h-14 text-lg font-bold" variant="outline">
                  <Share2 className="w-5 h-5 mr-2" /> PNG 이미지 저장
                </Button>
              </motion.div>
            )}
          </div>
        </div>

        {/* SEO Content Component */}
        <SeoGuide />
      </div>
    </ToolLayout>
  );
}