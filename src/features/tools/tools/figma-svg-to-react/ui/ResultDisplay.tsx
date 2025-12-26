'use client';

import { CodeBlock } from "@/shared/ui/code-block";
import { CopyButton } from "@/shared/ui/copy-button";
import { Badge } from "@/shared/ui/badge";
import { SvgTransformResult } from "../model/types";

interface ResultDisplayProps {
  result: SvgTransformResult | null;
  isTransforming: boolean;
}

export function ResultDisplay({ result, isTransforming }: ResultDisplayProps) {
  if (isTransforming) {
    return (
      <div className="flex items-center justify-center p-12 border-2 border-dashed rounded-xl bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 font-medium">React 컴포넌트로 변환 중...</p>
        </div>
      </div>
    );
  }

  if (!result || !result.code) {
    return (
      <div className="flex items-center justify-center p-12 border-2 border-dashed rounded-xl bg-slate-50 text-slate-400">
        SVG 소스 코드를 입력하면 이곳에 변환된 React 코드가 표시됩니다.
      </div>
    );
  }

  if (result.error) {
    return (
      <div className="p-6 border-2 border-red-100 rounded-xl bg-red-50 text-red-600">
        <h3 className="font-bold mb-2">변환 오류</h3>
        <p className="text-sm">{result.error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold">변환 결과 (React Component)</h3>
          <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">
            {Math.round((1 - result.optimizedSize / result.originalSize) * 100)}% 최적화됨
          </Badge>
        </div>
        <CopyButton value={result.code} />
      </div>

      <div className="relative group">
        <CodeBlock 
          code={result.code} 
          language="tsx" 
          showLineNumbers 
        />
      </div>

      <div className="flex gap-4 text-xs text-slate-500 justify-end">
        <span>원본 크기: {(result.originalSize / 1024).toFixed(2)} KB</span>
        <span>•</span>
        <span>최적화 크기: {(result.optimizedSize / 1024).toFixed(2)} KB</span>
      </div>
    </div>
  );
}
