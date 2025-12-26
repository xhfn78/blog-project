"use client";

import { CSS_PRESETS } from "../lib/presets";
import { Button } from "@/shared/ui/button";
import { Typography } from "@/shared/ui/typography";
import { MousePointer2 } from "lucide-react";

interface PresetSelectorProps {
  onSelect: (css: string) => void;
}

export function PresetSelector({ onSelect }: PresetSelectorProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 px-1">
        <MousePointer2 className="w-4 h-4 text-primary" />
        <Typography variant="small" className="font-bold">입력 샘플 프리셋</Typography>
      </div>
      <div className="flex flex-wrap gap-2">
        {CSS_PRESETS.map((preset) => (
          <Button
            key={preset.id}
            variant="outline"
            size="sm"
            onClick={() => onSelect(preset.css)}
            className="rounded-full bg-primary/5 hover:bg-primary/10 border-primary/20 text-xs"
          >
            {preset.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
