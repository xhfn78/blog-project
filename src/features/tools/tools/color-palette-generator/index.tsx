'use client';

import { ToolSection } from '@/shared/ui/tool-layout';
import { config } from './tool.config';
import { ColorInput } from './ui/ColorInput';
import { PaletteGrid } from './ui/PaletteGrid';
import { useCopyToClipboard } from '@/shared/lib/hooks/use-copy-to-clipboard';
import { useState, useEffect } from 'react';
import { generatePalette, isValidHex, ColorShade } from './lib/utils';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

const seoContent = `# Tailwind CSS 컬러 팔레트 생성기 완벽 가이드

## 도입부: 왜 컬러 팔레트 생성기가 필요한가?

현대 웹 디자인에서 일관된 색상 시스템(Design System)을 구축하는 것은 선택이 아닌 필수입니다. 특히 Tailwind CSS와 같은 유틸리티 퍼스트 프레임워크를 사용할 때, 단순히 하나의 \`primary\` 색상을 정하는 것만으로는 부족합니다. 버튼의 호버(Hover) 상태, 테두리(Border), 배경(Background)의 미세한 명암 차이를 표현하기 위해서는 체계적인 색상 단계(Scale)가 필요합니다.

많은 개발자들이 디자인 도구(Figma 등)에서 색상을 추출하거나, 감으로 색상을 섞어 쓰곤 합니다. 하지만 이 과정은 시간이 많이 걸릴 뿐만 아니라, 명암비(Contrast Ratio)나 채도(Saturation)의 일관성을 해치기 쉽습니다. **'Color Palette Generator'**는 단 하나의 기준 색상(Base Color)만 입력하면, Tailwind CSS 표준 스케일인 50부터 950까지의 11단계 팔레트를 즉시 생성해 주는 도구입니다.

이 도구는 특히 프론트엔드 개발자, UI 디자이너, 그리고 디자인 시스템을 구축하려는 팀에게 다음과 같은 문제를 해결해 줍니다:
1.  **시간 절약:** 수동으로 명도를 조절하며 11개의 색상을 만드는 반복 작업을 1초 만에 해결합니다.
2.  **일관성 유지:** 알고리즘에 기반하여 색상을 혼합하므로, 모든 단계에서 균일한 시각적 흐름을 보장합니다.
3.  **즉시 사용 가능:** 생성된 팔레트를 Tailwind CSS 설정 파일(\`tailwind.config.ts\`) 형식으로 바로 복사하여 프로젝트에 적용할 수 있습니다.

## 주요 기능

이 도구는 단순한 색상 추출을 넘어, 실제 개발 워크플로우에 최적화된 다양한 기능을 제공합니다.

*   **스마트 헥사 코드 입력:** \`#\` 기호가 있든 없든, 혹은 \`000\`과 같은 단축 코드를 입력하든 자동으로 인식하여 정확한 색상을 찾아냅니다.
*   **11단계 정밀 스케일:** Tailwind CSS v3.0 이상에서 권장하는 50, 100, ..., 900, 950 단계의 모든 스펙트럼을 제공합니다. 이는 아주 밝은 배경색부터 아주 어두운 텍스트 색상까지 모두 커버합니다.
*   **원클릭 복사 시스템:** 개별 색상 블록을 클릭하면 해당 Hex 코드가 클립보드에 복사되며, 전체 설정을 한 번에 복사할 수도 있습니다.
*   **실시간 미리보기:** 색상을 변경할 때마다 팔레트가 즉시 갱신되어, 브랜드 컬러에 가장 적합한 톤을 빠르게 찾을 수 있습니다.
*   **다크 모드 지원:** 도구 자체도 다크 모드를 완벽하게 지원하여, 어두운 환경에서도 색상을 정확하게 인지할 수 있도록 돕습니다.

실무에서는 이렇게 활용할 수 있습니다. 예를 들어, 클라이언트가 메인 컬러로 "Blue(#3B82F6)"를 지정했다면, 이 도구에 해당 코드를 입력하는 즉시 버튼의 배경색(\`bg-blue-500\`), 호버 색상(\`hover:bg-blue-600\`), 텍스트 색상(\`text-blue-900\`) 등을 고민 없이 결정할 수 있게 됩니다.

## 실무 사용 시나리오

### 1. 새로운 프로젝트의 테마 설정
**Before:** 디자이너가 전달해 준 메인 컬러 하나만 \`tailwind.config.ts\`에 넣고, 나머지 색상은 필요할 때마다 임의로 만들어 썼습니다. 결과적으로 페이지마다 미묘하게 다른 파란색이 사용되어 디자인 통일성이 깨졌습니다.
**After:** 프로젝트 시작 전, 메인 컬러를 이 도구에 입력하여 전체 팔레트를 생성합니다. 생성된 JSON 객체를 \`theme.extend.colors.primary\`에 복사해 넣음으로써, 팀원 모두가 약속된 11개의 색상만을 사용하여 완벽한 일관성을 유지합니다.

### 2. 다크 모드 UI 구현
**Before:** 라이트 모드에서는 잘 보이던 텍스트가 다크 모드 배경에서는 너무 어둡거나 묻혀버리는 문제가 발생했습니다. 명암 대비를 맞추기 위해 매번 색상을 찍어봐야 했습니다.
**After:** 50~950 스케일을 활용하여 체계적으로 대응합니다. 예를 들어, 배경색은 \`bg-slate-900\`을 쓰고, 텍스트는 가장 밝은 단계인 \`text-slate-50\`을 사용하는 식입니다. 이 도구가 만들어주는 50/950 단계는 이러한 극단적인 대비가 필요한 상황에 최적화되어 있습니다.

### 3. 마이크로 인터랙션 디자인
**Before:** 버튼을 눌렀을 때(Active)나 마우스를 올렸을 때(Hover)의 색상을 정하기 위해 "조금 더 어두운 색"을 감으로 찾느라 시간을 허비했습니다.
**After:** \`bg-primary-500\`을 기본으로 쓰고, Hover 시에는 \`600\`, Active 시에는 \`700\`을 쓰는 규칙을 정립합니다. 이 도구가 그 '한 단계 더 어두운 색'을 정확하게 계산해서 보여주므로 고민할 필요가 없습니다.

## 기술적 배경: 색상 혼합 알고리즘

색상을 컴퓨터가 이해하고 사람이 보기 좋게 나열하는 것은 단순한 작업이 아닙니다. 이 도구는 어떻게 자연스러운 그라데이션을 만들어낼까요?

### HSL vs RGB 혼합
일반적으로 색상을 섞을 때 RGB(Red, Green, Blue) 값을 직접 더하거나 빼는 방식을 사용하면, 색상이 탁해지거나(Muddy) 채도가 급격히 떨어지는 현상이 발생합니다. 이를 보완하기 위해 많은 전문 도구들은 **HSL(Hue, Saturation, Lightness)** 색상 공간을 사용합니다.

HLS 모델에서는 '색상(Hue)'과 '채도(Saturation)'를 유지한 채 '밝기(Lightness)'만을 조절할 수 있기 때문에, 훨씬 더 선명하고 자연스러운 팔레트를 얻을 수 있습니다. Tailwind CSS의 기본 팔레트 역시 이러한 원리를 바탕으로 디자이너가 수동으로 보정한 값들입니다.

### Tailwind CSS의 색상 스케일 표준

| 단계 (Weight) | 용도 (Usage) | 명도 특성 (Lightness) |
| :--- | :--- | :--- |
| **50** | 배경 (Backgrounds) | 95% 이상 (아주 밝음) |
| **100 - 200** | 연한 배경 (Light Backgrounds) | 80% ~ 90% |
| **300 - 400** | 테두리, 구분선 (Borders) | 60% ~ 70% |
| **500 (Base)** | 주요 컴포넌트, 버튼 (Primary) | 기준 색상 |
| **600 - 700** | 호버, 강조 (Hover/Active) | 기준보다 약간 어두움 |
| **800 - 900** | 텍스트 (Headings, Body) | 아주 어두움 (가독성 확보) |
| **950** | 짙은 배경, 강한 텍스트 | 거의 검정에 가까움 |

본 도구는 입력받은 Base Color를 \`500\` 단계에 위치시키고, 흰색(#FFFFFF)과 검은색(#000000)을 향해 단계적으로 색상을 혼합(Interpolation)하는 알고리즘을 사용합니다. 이를 통해 어떤 색상을 입력하더라도 Tailwind의 표준 쓰임새에 부합하는 결과물을 만들어냅니다.

## 자주 묻는 질문 (FAQ)

### Q1. 생성된 색상이 Tailwind CSS 기본 색상과 정확히 일치하나요?
아닙니다. Tailwind CSS의 기본 팔레트는 알고리즘으로 만든 것이 아니라, 디자이너가 눈으로 보며 하나씩 세밀하게 조정한 '수작업' 결과물입니다. 이 도구는 그와 최대한 유사한 느낌을 주도록 알고리즘으로 계산한 값을 제공합니다. 따라서 커스텀 브랜드 컬러를 사용할 때 가장 유용합니다.

### Q2. 생성된 설정을 프로젝트에 어떻게 적용하나요?
\`tailwind.config.ts\` (또는 .js) 파일을 열어 \`theme.extend.colors\` 섹션에 붙여넣으면 됩니다.
\`\`\`typescript
// tailwind.config.ts 예시
export default {
  theme: {
    extend: {
      colors: {
        // 복사한 코드를 여기에 붙여넣으세요
        brand: {
          50: '#f0f9ff',
          // ...
          950: '#172554',
        },
      },
    },
  },
}
\`\`\n이렇게 설정하면 코드 내에서 \`bg-brand-500\` 처럼 바로 사용할 수 있습니다.

### Q3. RGB나 HSL 값으로도 입력할 수 있나요?
현재 버전에서는 **Hex 코드(예: #3B82F6)** 입력만을 지원합니다. 대부분의 디자인 툴과 웹 표준에서 Hex 코드가 가장 널리 쓰이기 때문입니다. 하지만 추후 업데이트를 통해 RGB, HSL 변환 및 입력 기능도 추가될 예정입니다. 만약 RGB 값만 알고 계시다면, 저희 사이트의 '색상 변환기'를 먼저 사용해 보시는 것을 추천합니다.`;

export default function ColorPaletteGenerator() {
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
    <div className="space-y-12">
      {/* 1️⃣ 도구 실행 영역 */}
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

      {/* 광고 배치 공간 (my-8 필수) */}
      <div className="my-8 h-px bg-border" />

      {/* 3️⃣ SEO 콘텐츠 영역 */}
      <ToolSection title="Tailwind CSS 컬러 팔레트 생성기 완벽 가이드">
        <article className="prose dark:prose-invert max-w-none">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          >
            {seoContent}
          </ReactMarkdown>
        </article>
      </ToolSection>
    </div>
  );
}