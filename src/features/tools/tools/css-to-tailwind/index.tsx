"use client";

import React from "react";
import { ToolLayout } from "@/shared/ui/tool-layout";
import { Card } from "@/shared/ui/card";
import { BackgroundBeams } from "@/shared/ui/background-beams";
import { config } from "./tool.config";
import { useCSSToTailwind } from "./lib/use-css-to-tailwind";
import { useHistory } from "./lib/use-history";
import { CSSInput } from "./ui/CSSInput";
import { TailwindOutput } from "./ui/TailwindOutput";
import { PresetSelector } from "./ui/PresetSelector";
import { HistoryPanel } from "./ui/HistoryPanel";
import { History } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { SeoGuide } from "./ui/seo-guide";

export async function generateMetadata() {
  return {
    title: config.name,
    description: config.description,
  };
}

export default function CSSToTailwindPage() {
  const { input, setInput, result } = useCSSToTailwind();
  const { history, addToHistory, removeFromHistory, clearHistory } = useHistory("css-to-tailwind-history");

  // 변환 결과가 있고 유효할 때 히스토리에 자동 추가 (Debounced 처리된 result 사용)
  React.useEffect(() => {
    if (result && result.fullClassName && input.trim()) {
      const timer = setTimeout(() => {
        addToHistory(input, result.fullClassName);
      }, 2000); // 사용자가 입력을 멈추고 2초 뒤에 저장
      return () => clearTimeout(timer);
    }
  }, [result, input, addToHistory]);

  return (
    <ToolLayout config={config}>
      <div className="relative space-y-20 pb-20">
        <div className="absolute inset-0 -z-10 overflow-hidden opacity-20">
          <BackgroundBeams />
        </div>

        {/* 1. 메인 변환 영역 */}
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="flex-1 w-full">
              <PresetSelector onSelect={setInput} />
            </div>
          </div>

          <Tabs defaultValue="editor" className="w-full">
            <TabsList className="grid w-[400px] grid-cols-2 mb-4">
              <TabsTrigger value="editor">변환 에디터</TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-2">
                <History className="w-4 h-4" />
                히스토리 {history.length > 0 && `(${history.length})`}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="editor" className="mt-0">
              <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <Card className="p-8 border-primary/20 bg-background/50 backdrop-blur-md shadow-2xl">
                  <CSSInput value={input} onChange={setInput} />
                </Card>

                <Card className="p-8 border-primary/20 bg-background/50 backdrop-blur-md shadow-2xl h-full">
                  <TailwindOutput result={result} />
                </Card>
              </section>
            </TabsContent>

            <TabsContent value="history" className="mt-0">
              <Card className="p-10 border-primary/20 bg-background/50 backdrop-blur-md shadow-2xl min-h-[400px]">
                <HistoryPanel 
                  history={history} 
                  onSelect={(val) => setInput(val)}
                  onRemove={removeFromHistory}
                  onClear={clearHistory}
                />
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* 2. 상세 안내 및 SEO 섹션 */}
        <SeoGuide />
      </div>
    </ToolLayout>
  );
}