'use client';

import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Button } from '@/shared/ui/button';
import { RefreshCw, Check, FileJson } from 'lucide-react';
import { cn } from '@/shared/lib/cn';

interface ColorInputProps {
  baseColor: string;
  error: string;
  onColorChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onGenerate: () => void;
  onCopyConfig: () => void;
  isCopiedConfig: boolean;
  hasPalette: boolean;
}

export function ColorInput({
  baseColor,
  error,
  onColorChange,
  onGenerate,
  onCopyConfig,
  isCopiedConfig,
  hasPalette
}: ColorInputProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-end bg-card p-6 rounded-lg border border-border shadow-sm">
      <div className="flex-1 w-full">
        <Label htmlFor="color-input" className="mb-2 block text-foreground">Base Color (Hex)</Label>
        <div className="flex gap-2">
          <div className="relative w-12 h-10 shrink-0 overflow-hidden rounded-md border border-input shadow-sm">
            <input
              type="color"
              value={baseColor.length === 7 ? baseColor : '#000000'}
              onChange={onColorChange}
              className="absolute inset-0 w-[150%] h-[150%] -translate-x-1/4 -translate-y-1/4 cursor-pointer p-0 border-0"
            />
          </div>
          <Input
            id="color-input"
            value={baseColor}
            onChange={onColorChange}
            placeholder="#3B82F6"
            className={cn("font-mono uppercase", error && "border-red-500 focus-visible:ring-red-500")}
          />
        </div>
        {error && <p className="text-xs text-red-500 mt-1 font-medium">{error}</p>}
      </div>
      
      <Button 
        variant="outline" 
        onClick={onGenerate}
        disabled={!!error}
      >
        <RefreshCw className="w-4 h-4 mr-2" />
        Regenerate
      </Button>

      <Button 
        variant="secondary"
        onClick={onCopyConfig}
        disabled={!hasPalette}
      >
        {isCopiedConfig ? (
          <Check className="w-4 h-4 mr-2 text-green-600" />
        ) : (
          <FileJson className="w-4 h-4 mr-2" />
        )}
        Copy Config
      </Button>
    </div>
  );
}
