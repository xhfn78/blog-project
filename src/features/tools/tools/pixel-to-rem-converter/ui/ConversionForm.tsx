'use client';

import { Label } from '@/shared/ui/label';
import { Input } from '@/shared/ui/input';
import { ArrowRightLeft } from 'lucide-react';

interface ConversionFormProps {
  px: number;
  rem: number;
  onPxChange: (val: number) => void;
  onRemChange: (val: number) => void;
}

export function ConversionForm({ px, rem, onPxChange, onRemChange }: ConversionFormProps) {
  return (
    <div className="flex flex-col md:flex-row items-center gap-6 p-6 bg-white dark:bg-slate-950 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
      <div className="flex-1 w-full space-y-2">
        <Label htmlFor="px-input" className="text-lg font-semibold">
          Pixels (px)
        </Label>
        <div className="relative">
          <Input
            id="px-input"
            type="number"
            value={px}
            onChange={(e) => onPxChange(Number(e.target.value))}
            className="h-14 text-2xl font-mono"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">px</span>
        </div>
      </div>

      <div className="hidden md:flex text-slate-400">
        <ArrowRightLeft className="w-8 h-8" />
      </div>

      <div className="flex-1 w-full space-y-2">
        <Label htmlFor="rem-input" className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
          REM
        </Label>
        <div className="relative">
          <Input
            id="rem-input"
            type="number"
            value={rem}
            onChange={(e) => onRemChange(Number(e.target.value))}
            className="h-14 text-2xl font-mono border-indigo-200 focus:border-indigo-500 dark:border-indigo-900"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">rem</span>
        </div>
      </div>
    </div>
  );
}
