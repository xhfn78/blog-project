'use client';

import { Button } from '@/shared/ui/button';

interface PresetButtonsProps {
  onSelect: (size: number) => void;
  currentSize: number;
}

const PRESETS = [10, 12, 14, 16, 18, 20, 24];

export function PresetButtons({ onSelect, currentSize }: PresetButtonsProps) {
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {PRESETS.map((size) => (
        <Button
          key={size}
          variant={currentSize === size ? 'default' : 'outline'}
          size="sm"
          onClick={() => onSelect(size)}
          className="font-mono"
        >
          {size}px
        </Button>
      ))}
    </div>
  );
}
