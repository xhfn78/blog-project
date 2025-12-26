'use client';

import { useState } from 'react';
import { Card } from "@/shared/ui/card";
import { Label } from "@/shared/ui/label";
import { Slider } from "@/shared/ui/slider";
import { Typography } from "@/shared/ui/typography";

interface VisualPreviewProps {
  svg: string;
  useCurrentColor: boolean;
}

export function VisualPreview({ svg, useCurrentColor }: VisualPreviewProps) {
  const [color, setColor] = useState('#3b82f6'); // 기본 파란색
  const [size, setSize] = useState(128);

  if (!svg.trim()) return null;

  // 인라인 스타일로 currentColor 흉내내기
  const previewStyle = useCurrentColor 
    ? { color: color, fill: 'currentColor', stroke: 'currentColor' } 
    : {};

  return (
    <Card className="p-6 bg-slate-50 border-slate-200">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <Typography variant="h4">실시간 미리보기</Typography>
          {useCurrentColor && (
            <div className="flex items-center gap-3">
              <Label htmlFor="preview-color">색상:</Label>
              <input
                id="preview-color"
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-8 h-8 rounded border-none cursor-pointer"
              />
            </div>
          )}
        </div>

        <div className="flex items-center justify-center p-8 bg-white border rounded-xl shadow-inner min-h-[200px]">
          <div 
            style={{ 
              width: size, 
              height: size,
              ...previewStyle 
            }}
            className="flex items-center justify-center transition-all duration-200"
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-xs text-slate-500">
            <span>크기 조절</span>
            <span>{size}px</span>
          </div>
          <Slider
            value={[size]}
            min={24}
            max={256}
            step={1}
            onValueChange={(val) => setSize(val[0])}
          />
        </div>
      </div>
    </Card>
  );
}
