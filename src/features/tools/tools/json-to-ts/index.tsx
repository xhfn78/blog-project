'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/shared/ui/card';
import { Switch } from '@/shared/ui/switch';
import { Label } from '@/shared/ui/label';
import { Textarea } from '@/shared/ui/textarea';
import { CopyButton } from '@/shared/ui/copy-button';
import { ToolLayout, ToolSection } from '@/shared/ui/tool-layout';
import { config } from './tool.config';
import { convertJsonToTs } from './lib/converter';
import { SeoGuide } from './ui/seo-guide';

export async function generateMetadata() {
  return {
    title: config.name,
    description: config.description,
  };
}

export default function JsonToTsTool() {
  const [input, setInput] = useState(`{
  "id": 1,
  "title": "Next.js 16과 TypeScript의 조화",
  "author": {
    "name": "홍길동",
    "email": "hong@example.com"
  },
  "tags": ["Next.js", "React", "TypeScript"],
  "published": true
}`);
  const [output, setOutput] = useState('');
  const [useTypeAlias, setUseTypeAlias] = useState(false);
  const [generateZod, setGenerateZod] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    handleConvert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, useTypeAlias, generateZod]);

  const handleConvert = () => {
    if (!input.trim()) {
      setOutput('');
      setError(null);
      return;
    }

    try {
      const result = convertJsonToTs(input, {
        rootName: 'ApiResponse',
        useTypeAlias,
        generateZod,
      });
      
      if (result.startsWith('Error:')) {
        setError(result);
        setOutput('');
      } else {
        setError(null);
        setOutput(result);
      }
    } catch (e) {
      setError('예기치 않은 오류가 발생했습니다.');
    }
  };

  return (
    <ToolLayout config={config}>
      {/* 1️⃣ 도구 실행 영역 */}
      <ToolSection title="JSON to TypeScript 변환기" headingLevel="h2">
        <Card className="p-4 bg-muted/30 border-none mb-6">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center space-x-2">
              <Switch
                id="type-alias"
                checked={useTypeAlias}
                onCheckedChange={setUseTypeAlias}
              />
              <Label htmlFor="type-alias" className="cursor-pointer">Type Alias 사용</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="zod-schema"
                checked={generateZod}
                onCheckedChange={setGenerateZod}
              />
              <Label htmlFor="zod-schema" className="cursor-pointer">Zod 스키마 생성</Label>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[500px]">
          <div className="flex flex-col space-y-2 h-full">
            <Label>JSON 데이터 입력</Label>
            <Textarea
              className="flex-1 font-mono text-sm resize-none p-4 bg-background"
              placeholder="여기에 JSON 데이터를 붙여넣으세요..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>

          <div className="flex flex-col space-y-2 h-full">
            <div className="flex justify-between items-center">
              <Label>변환된 TypeScript 코드</Label>
              {output && <CopyButton text={output} />}
            </div>
            <div className="relative flex-1">
              <Textarea
                readOnly
                className={`flex-1 font-mono text-sm resize-none p-4 h-full bg-muted/50 ${error ? 'text-red-500' : ''}`}
                value={error || output}
              />
            </div>
          </div>
        </div>
      </ToolSection>

      <div className="my-8" />

      {/* 2️⃣ SEO 가이드 */}
      <SeoGuide />
    </ToolLayout>
  );
}
