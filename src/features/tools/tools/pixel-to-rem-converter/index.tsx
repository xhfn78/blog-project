'use client';

import type { Metadata } from 'next';
import { config } from './tool.config';
import { useConverter } from './lib/use-converter';
import { ToolLayout, ToolSection } from '@/shared/ui/tool-layout';
import { ControlPanel } from './ui/ControlPanel';
import { ConversionForm } from './ui/ConversionForm';
import { PresetButtons } from './ui/PresetButtons';
import { Card } from '@/shared/ui/card';
import Link from 'next/link';

export async function generateMetadata(): Promise<Metadata> {
  const title = config.name;
  const description = config.description;
  const url = `https://www.v-log.dev/tools/${config.category}/${config.slug}`;

  return {
    title,
    description,
    keywords: config.tags.join(', '),
    openGraph: {
      type: 'website',
      url,
      title,
      description,
      siteName: 'V-Log Developer Tools',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: { canonical: url },
  };
}

export default function PixelToRemConverter() {
  const { px, rem, baseSize, setPx, setRem, setBaseSize } = useConverter();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: config.name,
    description: config.description,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web Browser',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
    author: { '@type': 'Organization', name: config.author || 'V-Blog Team' },
  };

  return (
    <ToolLayout config={config}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* --- Tool Execution Area --- */}
      <ToolSection title="변환 계산기">
        <div className="space-y-6">
          <ControlPanel baseSize={baseSize} onBaseSizeChange={setBaseSize} />
          
          <div>
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              빠른 설정 (Base Size)
            </p>
            <PresetButtons currentSize={baseSize} onSelect={setBaseSize} />
          </div>

          <ConversionForm
            px={px}
            rem={rem}
            onPxChange={setPx}
            onRemChange={setRem}
          />
        </div>
      </ToolSection>

      <div className="my-12" />

      {/* --- SEO Content: Introduction --- */}
      <ToolSection title="왜 REM 단위를 사용해야 할까요?">
        <div className="prose dark:prose-invert max-w-none">
          <p className="lead text-lg text-slate-600 dark:text-slate-300">
            현대 웹 개발에서 <strong>반응형 디자인(Responsive Design)</strong>과 <strong>웹 접근성(Web Accessibility)</strong>은 선택이 아닌 필수입니다. 
            고정된 픽셀(PX) 단위는 사용자의 브라우저 설정이나 기기 환경에 유연하게 대응하기 어렵습니다. 
            반면, <strong>REM(Root EM)</strong> 단위는 최상위 요소(html)의 폰트 사이즈에 비례하여 크기가 결정되므로, 
            사용자가 브라우저 글꼴 크기를 크게 설정하더라도 레이아웃이 깨지지 않고 자연스럽게 확장됩니다.
          </p>
          <p>
            Tailwind CSS, Bootstrap 등 최신 CSS 프레임워크들도 기본적으로 REM 단위를 채택하고 있습니다. 
            이 도구를 사용하여 디자인 시안의 PX 값을 개발에 적합한 REM 값으로 쉽고 정확하게 변환해보세요.
          </p>
        </div>
      </ToolSection>

      {/* --- SEO Content: Key Features --- */}
      <ToolSection title="주요 기능">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 bg-slate-50 dark:bg-slate-900 border-none">
            <h3 className="font-semibold text-lg mb-2 text-indigo-600 dark:text-indigo-400">⚡️ 실시간 양방향 변환</h3>
            <p className="text-slate-600 dark:text-slate-400">
              PX를 입력하면 REM이, REM을 입력하면 PX가 즉시 계산됩니다. 별도의 변환 버튼을 누를 필요가 없어 작업 흐름이 끊기지 않습니다.
            </p>
          </Card>
          <Card className="p-6 bg-slate-50 dark:bg-slate-900 border-none">
            <h3 className="font-semibold text-lg mb-2 text-indigo-600 dark:text-indigo-400">🎛️ 자유로운 기준 크기 설정</h3>
            <p className="text-slate-600 dark:text-slate-400">
              기본 16px 외에도 10px(62.5% 트릭), 14px 등 프로젝트 설정에 맞는 Base Font Size를 자유롭게 지정할 수 있습니다.
            </p>
          </Card>
          <Card className="p-6 bg-slate-50 dark:bg-slate-900 border-none">
            <h3 className="font-semibold text-lg mb-2 text-indigo-600 dark:text-indigo-400">🎨 Tailwind CSS 친화적</h3>
            <p className="text-slate-600 dark:text-slate-400">
              변환된 수치가 Tailwind CSS의 어떤 유틸리티 클래스(예: text-lg, p-4)에 해당하는지 참조 표를 통해 바로 확인할 수 있습니다.
            </p>
          </Card>
          <Card className="p-6 bg-slate-50 dark:bg-slate-900 border-none">
            <h3 className="font-semibold text-lg mb-2 text-indigo-600 dark:text-indigo-400">📱 반응형 웹 최적화</h3>
            <p className="text-slate-600 dark:text-slate-400">
              미디어 쿼리 브레이크포인트나 유동적인 글꼴 크기 설정 시 필요한 정확한 REM 값을 제공하여 접근성 높은 웹 사이트를 구축하도록 돕습니다.
            </p>
          </Card>
        </div>
      </ToolSection>

      {/* --- SEO Content: Mermaid Diagram --- */}
      <div className="my-8">
        <Card className="p-6 bg-slate-950 text-white border-slate-800">
          <h3 className="text-lg font-semibold mb-4 text-slate-200">PX to REM 변환 원리</h3>
          <div className="mermaid bg-slate-900 p-4 rounded-lg flex justify-center">
            {`graph LR
              A[사용자 입력 (PX)] -->|나누기| B{Base Size}
              B -->|계산| C[REM 결과]
              C -->|곱하기| B
              B -->|역변환| D[PX 결과]
            `}
          </div>
          <p className="text-sm text-slate-400 mt-4 text-center">
            공식: <code>REM = PX / Base Size</code>
          </p>
        </Card>
      </div>

      {/* --- SEO Content: Conversion Table --- */}
      <ToolSection title="자주 사용하는 변환 표 (Base 16px)">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-500 dark:text-slate-400">
            <thead className="text-xs text-slate-700 uppercase bg-slate-50 dark:bg-slate-800 dark:text-slate-200">
              <tr>
                <th scope="col" className="px-6 py-3">Pixels (px)</th>
                <th scope="col" className="px-6 py-3">REM</th>
                <th scope="col" className="px-6 py-3">Tailwind Class</th>
              </tr>
            </thead>
            <tbody>
              {[
                { px: 12, rem: 0.75, tw: 'text-xs' },
                { px: 14, rem: 0.875, tw: 'text-sm' },
                { px: 16, rem: 1, tw: 'text-base' },
                { px: 18, rem: 1.125, tw: 'text-lg' },
                { px: 20, rem: 1.25, tw: 'text-xl' },
                { px: 24, rem: 1.5, tw: 'text-2xl' },
                { px: 30, rem: 1.875, tw: 'text-3xl' },
                { px: 36, rem: 2.25, tw: 'text-4xl' },
                { px: 48, rem: 3, tw: 'text-5xl' },
              ].map((row) => (
                <tr key={row.px} className="bg-white border-b dark:bg-slate-900 dark:border-slate-800">
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{row.px}px</td>
                  <td className="px-6 py-4 text-indigo-600 dark:text-indigo-400">{row.rem}rem</td>
                  <td className="px-6 py-4 font-mono text-slate-600 dark:text-slate-400">{row.tw}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ToolSection>

      <div className="my-12" />

      {/* --- SEO Content: FAQ --- */}
      <ToolSection title="자주 묻는 질문 (FAQ)">
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-slate-200">Q1: 왜 16px이 기본값인가요?</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              대부분의 최신 웹 브라우저(Chrome, Firefox, Safari 등)의 기본 루트 폰트 사이즈는 <strong>16px</strong>입니다. 
              사용자가 브라우저 설정을 변경하지 않는 한, <code>1rem</code>은 <code>16px</code>과 같습니다. 
              따라서 웹 개발 표준으로 16px을 기준으로 계산하는 것이 가장 일반적입니다.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-slate-200">Q2: EM과 REM의 차이는 무엇인가요?</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              <strong>REM</strong>(Root EM)은 항상 최상위 요소(html)의 폰트 사이즈를 기준으로 합니다. 
              반면 <strong>EM</strong>은 해당 요소의 부모 요소 폰트 사이즈를 기준으로 계산됩니다. 
              따라서 중첩된 구조에서 EM을 사용하면 계산이 복잡해질 수 있어, 레이아웃 크기를 잡을 때는 일관성 있는 REM 사용을 권장합니다.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-slate-200">Q3: Tailwind CSS에서 REM을 어떻게 활용하나요?</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Tailwind CSS의 유틸리티 클래스들은 기본적으로 REM 단위를 사용합니다. 
              예를 들어 <code>w-4</code>는 <code>1rem</code>(16px), <code>p-2</code>는 <code>0.5rem</code>(8px)을 의미합니다. 
              이 계산기를 사용하여 커스텀 수치를 <code>w-[1.125rem]</code>과 같이 Arbitrary Value로 적용할 수 있습니다.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-slate-200">Q4: REM 단위 사용 시 주의할 점은 무엇인가요?</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              <code>border-width</code>나 아주 미세한 간격 조정과 같이 1px 단위의 정교한 제어가 필요한 경우에는 여전히 PX 단위를 사용하는 것이 더 나을 수 있습니다. 
              하지만 폰트 크기, 패딩, 마진, 레이아웃 너비 등 대부분의 UI 요소에는 REM을 사용하는 것이 접근성과 반응형 측면에서 유리합니다.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-slate-200">Q5: 모바일 환경에서도 REM이 유리한가요?</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              네, 그렇습니다. 모바일 기기는 다양한 화면 크기와 해상도를 가지고 있으며, 사용자가 OS 레벨에서 글자 크기를 조절하는 경우도 많습니다. 
              REM을 사용하면 이러한 사용자 설정과 환경 변화에 맞춰 콘텐츠가 자동으로 최적화되어 표시되므로 모바일 가독성을 크게 향상시킬 수 있습니다.
            </p>
          </div>
        </div>
      </ToolSection>

      <div className="my-12" />

      {/* --- Related Tools --- */}
      <ToolSection title="함께 사용하면 좋은 도구">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/tools/converter/css-to-tailwind" className="block h-full">
            <Card className="h-full p-4 hover:border-indigo-500 transition-colors">
              <h4 className="font-semibold mb-2">CSS to Tailwind 변환기</h4>
              <p className="text-sm text-slate-500">기존 CSS 코드를 Tailwind 유틸리티 클래스로 자동 변환하세요.</p>
            </Card>
          </Link>
          <Link href="/tools/generator/color-palette-generator" className="block h-full">
            <Card className="h-full p-4 hover:border-indigo-500 transition-colors">
              <h4 className="font-semibold mb-2">Tailwind 컬러 팔레트</h4>
              <p className="text-sm text-slate-500">브랜드 컬러에 맞는 완벽한 Tailwind 색상 코드를 생성합니다.</p>
            </Card>
          </Link>
          <Link href="/tools/utility/tailwind-class-visualizer" className="block h-full">
            <Card className="h-full p-4 hover:border-indigo-500 transition-colors">
              <h4 className="font-semibold mb-2">Tailwind 클래스 미리보기</h4>
              <p className="text-sm text-slate-500">Tailwind 클래스가 어떤 CSS로 변환되는지 실시간으로 확인하세요.</p>
            </Card>
          </Link>
        </div>
      </ToolSection>
    </ToolLayout>
  );
}