'use client';

import { Label } from '@/shared/ui/label';
import { Input } from '@/shared/ui/input';
import { ControlPanelProps } from '../model/types';

export function ControlPanel({ baseSize, onBaseSizeChange }: ControlPanelProps) {
  return (
    <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
      <Label htmlFor="base-size" className="mb-2 block text-sm font-medium">
        기본 글꼴 크기 (Base Font Size)
      </Label>
      <div className="flex items-center gap-2">
        <Input
          id="base-size"
          type="number"
          value={baseSize}
          onChange={(e) => onBaseSizeChange(Number(e.target.value))}
          className="w-24 font-mono"
        />
        <span className="text-sm text-slate-500">px (기본값: 16px)</span>
      </div>
      <p className="text-xs text-slate-500 mt-2">
        대부분의 브라우저 기본값은 16px입니다. Tailwind CSS도 16px을 기준으로 합니다.
      </p>
    </div>
  );
}
