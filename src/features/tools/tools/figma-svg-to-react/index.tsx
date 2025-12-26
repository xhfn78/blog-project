'use client';

import { useEffect } from "react";
import { config } from "./tool.config";
import { useSvgToReact } from "./lib/use-svg-to-react";
import { useHistory } from "./lib/use-history";
import { PRESETS, PresetType } from "./lib/presets";
import { ControlPanel } from "./ui/ControlPanel";
import { ResultDisplay } from "./ui/ResultDisplay";
import { VisualPreview } from "./ui/VisualPreview";
import { HistoryPanel } from "./ui/HistoryPanel";
import { SeoGuide } from "./ui/seo-guide";
import { ToolLayout } from "@/shared/ui/tool-layout";
import { Typography } from "@/shared/ui/typography";
import { Card } from "@/shared/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { Button } from "@/shared/ui/button";
import { Code2, Zap, Eye } from "lucide-react";

export async function generateMetadata() {
  return {
    title: config.name,
    description: config.description,
  };
}

export default function SvgToReactPage() {
  const { state, setInputSvg, setOptions } = useSvgToReact();
  const { history, addToHistory, removeHistoryItem, clearHistory } = useHistory();

  // 변환 성공 시 히스토리에 자동 추가 (디바운스 필요)
  useEffect(() => {
    if (state.result && !state.result.error && state.inputSvg.length > 0) {
      const timer = setTimeout(() => {
        addToHistory(state.options.componentName, state.inputSvg);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [state.result, state.inputSvg, state.options.componentName, addToHistory]);

  const applyPreset = (type: PresetType) => {
    setOptions(PRESETS[type].options);
  };

  return (
    <ToolLayout config={config}>
      <div className="flex flex-col gap-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 왼쪽: 설정 및 입력 (3컬럼) */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex flex-wrap gap-2 items-center mb-4">
              <Typography variant="small" className="text-slate-500 mr-2">빠른 프리셋:</Typography>
              {(Object.keys(PRESETS) as PresetType[]).map((key) => (
                <Button
                  key={key}
                  variant="outline"
                  size="sm"
                  className="rounded-full text-xs"
                  onClick={() => applyPreset(key)}
                >
                  {PRESETS[key].name}
                </Button>
              ))}
            </div>

            <Tabs defaultValue="editor" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="editor" className="flex gap-2">
                  <Code2 className="w-4 h-4" /> 코드 변환기
                </TabsTrigger>
                <TabsTrigger value="preview" className="flex gap-2">
                  <Eye className="w-4 h-4" /> 실시간 미리보기
                </TabsTrigger>
              </TabsList>

              <TabsContent value="editor" className="space-y-6">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  <Card className="p-5 shadow-sm border-slate-200">
                    <ControlPanel
                      inputSvg={state.inputSvg}
                      onInputChange={setInputSvg}
                      options={state.options}
                      onOptionsChange={setOptions}
                    />
                  </Card>

                  <Card className="p-5 shadow-sm border-slate-200 bg-slate-900 overflow-hidden">
                    <ResultDisplay 
                      result={state.result} 
                      isTransforming={state.isTransforming} 
                    />
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="preview">
                <VisualPreview 
                  svg={state.inputSvg} 
                  useCurrentColor={state.options.useCurrentColor} 
                />
              </TabsContent>
            </Tabs>
          </div>

          {/* 오른쪽: 히스토리 및 보조 도구 (1컬럼) */}
          <div className="lg:col-span-1 space-y-8">
            <HistoryPanel
              history={history}
              onSelect={(item) => setInputSvg(item.svg)}
              onRemove={removeHistoryItem}
              onClear={clearHistory}
            />
            
            <Card className="p-5 bg-primary/5 border-primary/10">
              <Typography variant="h4" className="mb-3 text-primary flex items-center gap-2">
                <Zap className="w-4 h-4" /> Pro Tip
              </Typography>
              <Typography variant="small" className="text-slate-600 leading-relaxed">
                피그마에서 아이콘을 복사할 때 <strong>Frame</strong>을 선택하고 복사하면 여백(Padding)이 보존된 깨끗한 SVG를 얻을 수 있습니다.
              </Typography>
            </Card>
          </div>
        </div>

        {/* SEO 고도화 콘텐츠 섹션 */}
        <SeoGuide />
      </div>
    </ToolLayout>
  );
}