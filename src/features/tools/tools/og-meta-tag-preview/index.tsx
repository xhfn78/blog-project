'use client';

import { useState } from "react";
import { config } from "./tool.config";
import { MetaTagsData } from "./model/types";
import { generateHtmlTags, generateNextJsMetadata } from "./lib/meta-generator";
import { MetaInputForm } from "./ui/MetaInputForm";
import { SocialPreviewCard } from "./ui/SocialPreviewCard";
import { SeoContent } from "./ui/SeoContent";
import { ToolLayout } from "@/shared/ui/tool-layout";
import { Typography } from "@/shared/ui/typography";
import { Card } from "@/shared/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { CodeBlock } from "@/shared/ui/code-block";
import { Share2, Eye, Code2, Sparkles, CheckCircle2 } from "lucide-react";

export default function OgMetaTagGenerator() {
  const [data, setData] = useState<MetaTagsData>({
    title: "",
    description: "",
    url: "https://codepis.com",
    image: "",
    siteName: "코드피스",
    type: "website",
    twitterHandle: "",
  });

  const updateData = (newData: Partial<MetaTagsData>) => {
    setData((prev) => ({ ...prev, ...newData }));
  };

  const htmlCode = generateHtmlTags(data);
  const nextJsCode = generateNextJsMetadata(data);

  return (
    <ToolLayout config={config}>
      <div className="flex flex-col gap-12">
        {/* 메인 에디터 영역 */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* 왼쪽: 입력 폼 (2컬럼) */}
          <Card className="lg:col-span-2 p-6 shadow-lg border-slate-200 h-fit">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-primary" />
              <Typography variant="h4">메타데이터 입력</Typography>
            </div>
            <MetaInputForm data={data} onChange={updateData} />
          </Card>

          {/* 오른쪽: 결과 및 미리보기 (3컬럼) */}
          <div className="lg:col-span-3 space-y-6">
            <Tabs defaultValue="preview" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="preview" className="flex gap-2">
                  <Eye className="w-4 h-4" /> 시각적 미리보기
                </TabsTrigger>
                <TabsTrigger value="code" className="flex gap-2">
                  <Code2 className="w-4 h-4" /> 코드 획득
                </TabsTrigger>
              </TabsList>

              <TabsContent value="preview" className="space-y-8 animate-in fade-in duration-500">
                <div className="grid grid-cols-1 gap-10">
                  <SocialPreviewCard data={data} platform="facebook" />
                  <SocialPreviewCard data={data} platform="twitter" />
                </div>
              </TabsContent>

              <TabsContent value="code" className="space-y-6 animate-in fade-in duration-500">
                <div className="space-y-4">
                  <Typography variant="small" className="font-bold text-slate-500 uppercase tracking-wider">
                    표준 HTML 메타 태그
                  </Typography>
                  <CodeBlock code={htmlCode} language="html" />
                </div>

                <div className="space-y-4 pt-4">
                  <div className="flex items-center justify-between">
                    <Typography variant="small" className="font-bold text-slate-500 uppercase tracking-wider">
                      Next.js Metadata (App Router)
                    </Typography>
                    <div className="flex items-center gap-1 text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded-full font-bold uppercase">
                      <CheckCircle2 className="w-3 h-3" /> Recommended
                    </div>
                  </div>
                  <CodeBlock code={nextJsCode} language="tsx" />
                </div>
              </TabsContent>
            </Tabs>

            <Card className="p-5 bg-blue-50/50 border-blue-100 flex gap-4 items-start">
              <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                <Share2 className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <Typography variant="small" className="font-bold text-blue-900">공유 최적화 팁</Typography>
                <Typography variant="p" className="text-xs text-blue-700 leading-relaxed">
                  이미지 크기는 <strong>1200x630 픽셀</strong>을 권장합니다. 주요 텍스트는 이미지의 정중앙에 배치해야 다양한 플랫폼에서 잘리지 않고 선명하게 노출됩니다.
                </Typography>
              </div>
            </Card>
          </div>
        </div>

        {/* SEO 콘텐츠 섹션 */}
        <SeoContent />
      </div>
    </ToolLayout>
  );
}
