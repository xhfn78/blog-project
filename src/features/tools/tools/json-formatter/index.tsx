'use client';

import { useState } from 'react';
import { ToolLayout, ToolSection } from '@/shared/ui/tool-layout';
import { Typography } from '@/shared/ui/typography';
import { Textarea } from '@/shared/ui/textarea';
import { Button } from '@/shared/ui/button';
import { config } from './tool.config';
import { SeoGuide } from './ui/seo-guide';

export async function generateMetadata() {
  return {
    title: config.name,
    description: config.description,
  };
}

export default function JsonFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [indentSize, setIndentSize] = useState<2 | 4>(2);

  const handleBeautify = () => {
    try {
      setError('');
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, indentSize);
      setOutput(formatted);
    } catch (err) {
      setError(`JSON 문법 오류: ${err instanceof Error ? err.message : '알 수 없는 오류'}`);
      setOutput('');
    }
  };

  const handleMinify = () => {
    try {
      setError('');
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
    } catch (err) {
      setError(`JSON 문법 오류: ${err instanceof Error ? err.message : '알 수 없는 오류'}`);
      setOutput('');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError('');
  };

  return (
    <ToolLayout config={config}>
      <ToolSection title={config.name}>
        <div className="space-y-4">
          <div>
            <Typography variant="small" className="mb-2 block">JSON 데이터 입력</Typography>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='{"key": "value"} 형식의 JSON을 붙여넣으세요'
              className="h-64 font-mono text-sm"
            />
          </div>

          <div className="flex items-center gap-6">
            <Typography variant="small">들여쓰기:</Typography>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="indent"
                value="2"
                checked={indentSize === 2}
                onChange={() => setIndentSize(2)}
              />
              <span>2 spaces</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="indent"
                value="4"
                checked={indentSize === 4}
                onChange={() => setIndentSize(4)}
              />
              <span>4 spaces</span>
            </label>
          </div>

          <div className="flex gap-3">
            <Button onClick={handleBeautify} className="flex-1">
              정리하기 (Beautify)
            </Button>
            <Button onClick={handleMinify} variant="outline" className="flex-1">
              압축하기 (Minify)
            </Button>
            <Button onClick={handleClear} variant="outline">
              초기화
            </Button>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
              {error}
            </div>
          )}

          <div>
            <Typography variant="small">결과</Typography>
            <Textarea
              value={output}
              readOnly
              placeholder="변환 결과가 여기에 표시됩니다"
              className="h-64 font-mono text-sm bg-gray-50"
            />
          </div>

          <Button onClick={handleCopy} disabled={!output} className="w-full" variant="outline">
            결과 복사
          </Button>
        </div>
      </ToolSection>

      <div className="my-8" />

      <ToolSection title="사용 방법">
        <Typography variant="p">
          API 응답이나 설정 파일의 JSON 데이터를 정리하거나 압축합니다.
        </Typography>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li><strong>입력:</strong> JSON 데이터를 붙여넣습니다.</li>
          <li><strong>선택:</strong> 들여쓰기 크기(2/4)를 선택합니다.</li>
          <li><strong>실행:</strong> Beautify(정리) 또는 Minify(압축) 버튼을 클릭합니다.</li>
        </ul>
      </ToolSection>

      <div className="my-8" />

      <SeoGuide />
    </ToolLayout>
  );
}