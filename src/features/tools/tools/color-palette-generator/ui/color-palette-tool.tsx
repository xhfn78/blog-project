'use client';

import { useState, useEffect } from 'react';
import { ToolSection } from '@/shared/ui/tool-layout';
import { ColorInput } from './ColorInput';
import { PaletteGrid } from './PaletteGrid';
import { useCopyToClipboard } from '@/shared/lib/hooks/use-copy-to-clipboard';
import { generatePalette, isValidHex, ColorShade } from '../lib/utils';

export function ColorPaletteTool() {
  const [baseColor, setBaseColor] = useState('#3B82F6');
  const [palette, setPalette] = useState<ColorShade[]>([]);
  const [error, setError] = useState('');
  const { status, copyToClipboard } = useCopyToClipboard();
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  useEffect(() => {
    handleGenerate(baseColor);
  }, []);

  const handleGenerate = (color: string) => {
    if (!isValidHex(color)) {
      setError('Invalid Hex Color');
      return;
    }
    setError('');
    const newPalette = generatePalette(color);
    setPalette(newPalette);
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setBaseColor(val);
    if (isValidHex(val)) {
      handleGenerate(val);
    }
  };

  const handleCopyHex = (hex: string) => {
    copyToClipboard(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1500);
  };

  const handleCopyConfig = () => {
    const configObj = palette.reduce((acc, curr) => {
      acc[curr.weight] = curr.hex;
      return acc;
    }, {} as Record<number, string>);

    const jsonString = JSON.stringify({ colors: { custom: configObj } }, null, 2);
    copyToClipboard(jsonString);
  };

  return (
    <>
      <ToolSection title="Palette Generator">
        <div className="space-y-8">
          <ColorInput 
            baseColor={baseColor}
            error={error}
            onColorChange={handleColorChange}
            onGenerate={() => handleGenerate(baseColor)}
            onCopyConfig={handleCopyConfig}
            isCopiedConfig={status === 'copied'}
            hasPalette={palette.length > 0}
          />
          <PaletteGrid 
            palette={palette} 
            copiedHex={copiedHex} 
            onCopyHex={handleCopyHex} 
          />
        </div>
      </ToolSection>

      {/* 광고 배치 공간 (my-8 필수) */}
      <div className="my-8 h-px bg-border" />

      {/* 2️⃣ 사용 가이드 */}
      <ToolSection title="사용 방법">
        <div className="prose dark:prose-invert max-w-none">
          <p>이 도구를 사용하여 프로젝트에 완벽하게 어울리는 Tailwind CSS 색상 스케일을 만드세요.</p>
          <ul>
            <li><strong>Base Color:</strong> 기준이 될 헥사 코드를 입력하거나 컬러 피커를 사용하세요.</li>
            <li><strong>팔레트 생성:</strong> 입력과 동시에 11단계(50-950)의 색상이 실시간으로 생성됩니다.</li>
            <li><strong>복사 및 적용:</strong> 색상 카드를 클릭해 개별 코드를 복사하거나, 전체 설정을 복사해 프로젝트에 적용하세요.</li>
          </ul>
        </div>
      </ToolSection>
    </>
  );
}
