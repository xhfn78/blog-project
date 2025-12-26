"use client";

import React from "react";
import { ToolLayout } from "@/shared/ui/tool-layout";
import { BackgroundBeams } from "@/shared/ui/background-beams";
import { config } from "./tool.config";
import { useAddressGenerator } from "./lib/use-address-generator";
import { AddressOptions } from "./ui/AddressOptions";
import { AddressTable } from "./ui/AddressTable";
import { CodeBlock } from "@/shared/ui/code-block";
import { CopyButton } from "@/shared/ui/copy-button";
import { Card } from "@/shared/ui/card";
import { Database, FileDown, MapPin } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { SeoGuide } from "./ui/seo-guide";

export default function KoreanAddressGeneratorPage() {
  const { options, setOptions, data, isGenerating, generate, downloadFile } = useAddressGenerator();

  const formattedData = React.useMemo(() => {
    if (data.length === 0) return '';
    if (options.format === 'json') return JSON.stringify(data, null, 2);
    if (options.format === 'typescript') return `const mockAddresses = ${JSON.stringify(data, null, 2)};`;
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(obj => Object.values(obj).join(',')).join('\n');
    return `${headers}\n${rows}`;
  }, [data, options.format]);

  return (
    <ToolLayout config={config}>
      <div className="relative space-y-24 pb-20">
        <div className="absolute inset-0 -z-10 overflow-hidden opacity-20">
          <BackgroundBeams />
        </div>

        {/* 1. 도구 인터페이스 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4">
            <AddressOptions 
              options={options} 
              setOptions={setOptions} 
              onGenerate={generate} 
              isGenerating={isGenerating} 
            />
          </div>

          <div className="lg:col-span-8 space-y-8">
            {data.length > 0 ? (
              <>
                <AddressTable data={data} />
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center px-2">
                    <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
                      <Database className="w-4 h-4" /> Generated Output ({options.format})
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 gap-2 border-indigo-500/20 text-indigo-400"
                        onClick={() => downloadFile(formattedData, `mock-addresses.${options.format === 'typescript' ? 'ts' : options.format}`)}
                      >
                        <FileDown className="w-3 h-3" /> 다운로드
                      </Button>
                      <CopyButton text={formattedData} />
                    </div>
                  </div>
                  <Card className="p-0 border-primary/10 bg-[#0d1117] rounded-xl overflow-hidden shadow-2xl">
                    <CodeBlock code={formattedData} language={options.format === 'typescript' ? 'typescript' : 'json'} />
                  </Card>
                </div>
              </>
            ) : (
              <div className="h-[500px] flex flex-center items-center justify-center bg-slate-900/50 rounded-[3rem] border-2 border-dashed border-white/5">
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto animate-pulse">
                    <MapPin className="w-10 h-10 text-muted-foreground/40" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xl font-bold text-slate-400">데이터 생성 준비 완료</p>
                    <p className="text-sm text-muted-foreground max-w-xs mx-auto">왼쪽 설정 패널에서 생성할 주소의 개수와 형식을 선택하고 버튼을 클릭하세요.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 2. SEO 섹션 */}
        <SeoGuide />
      </div>
    </ToolLayout>
  );
}
