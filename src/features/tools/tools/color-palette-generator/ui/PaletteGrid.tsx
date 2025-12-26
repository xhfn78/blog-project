'use client';

import { ColorShade } from '../model/types';
import { Copy, Check } from 'lucide-react';
import { cn } from '@/shared/lib/cn';

interface PaletteGridProps {
  palette: ColorShade[];
  copiedHex: string | null;
  onCopyHex: (hex: string) => void;
}

export function PaletteGrid({ palette, copiedHex, onCopyHex }: PaletteGridProps) {
  if (palette.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground bg-muted/20 rounded-xl border-2 border-dashed border-muted">
        Enter a valid hex color above to generate a palette.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {palette.map((shade) => (
        <div 
          key={shade.weight} 
          className="group relative flex flex-col rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-all cursor-pointer bg-card"
          onClick={() => onCopyHex(shade.hex)}
        >
          <div 
            className="h-24 w-full transition-colors" 
            style={{ backgroundColor: shade.hex }}
          />
          
          <div className="p-3 flex justify-between items-center bg-card">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-foreground">{shade.weight}</span>
              <span className="text-xs text-muted-foreground font-mono">{shade.hex}</span>
            </div>
            
            <div className={cn(
              "transition-opacity",
              copiedHex === shade.hex ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            )}>
              {copiedHex === shade.hex ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4 text-muted-foreground" />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
