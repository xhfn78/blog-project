"use client";

import { Textarea } from "@/shared/ui/textarea";
import { Label } from "@/shared/ui/label";
import { Typography } from "@/shared/ui/typography";

interface CSSInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function CSSInput({ value, onChange }: CSSInputProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Label htmlFor="css-input" className="text-lg font-bold">
          기존 CSS 코드 입력
        </Label>
        <Typography variant="small" className="text-muted-foreground">
          속성: 값; 형태로 입력하세요
        </Typography>
      </div>
      <Textarea
        id="css-input"
        placeholder="display: flex;&#10;justify-content: center;&#10;padding: 20px;&#10;color: #3b82f6;"
        className="min-h-[300px] font-mono text-sm resize-none bg-slate-950 text-slate-200 border-primary/20"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
