"use client";

import { ConversionResult } from "../model/types";
import { Card } from "@/shared/ui/card";
import { Label } from "@/shared/ui/label";
import { CopyButton } from "@/shared/ui/copy-button";
import { Typography } from "@/shared/ui/typography";
import { Badge } from "@/shared/ui/badge";

interface TailwindOutputProps {
  result: ConversionResult | null;
}

export function TailwindOutput({ result }: TailwindOutputProps) {
  if (!result || !result.fullClassName) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-12 border-2 border-dashed border-primary/10 rounded-xl bg-primary/5">
        <Typography variant="p" className="text-muted-foreground text-center">
          CSS 코드를 입력하면 변환된 <br /> Tailwind 클래스가 여기에 표시됩니다.
        </Typography>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label className="text-lg font-bold text-primary">변환된 Tailwind 클래스</Label>
          <CopyButton text={result.fullClassName} />
        </div>
        <Card className="p-6 bg-primary/5 border-primary/20 min-h-[100px] flex items-center justify-center">
          <Typography variant="h4" className="text-center break-all font-mono text-indigo-400">
            {result.fullClassName}
          </Typography>
        </Card>
      </div>

      <div className="space-y-4">
        <Label className="text-sm font-semibold text-muted-foreground">변환 상세 내역</Label>
        <div className="grid gap-2">
          {result.details.map((detail, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 rounded-lg bg-slate-900/50 border border-white/5 text-sm"
            >
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground line-through">
                  {detail.originalProperty}: {detail.originalValue};
                </span>
                <span className="font-mono text-indigo-300 font-bold">{detail.className}</span>
              </div>
              <Badge variant="outline" className="text-[10px] bg-indigo-500/10 text-indigo-400 border-indigo-500/20">
                변환 완료
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
