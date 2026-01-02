'use client';

import type { Metadata } from 'next';
import { useState } from 'react';
import { config } from './tool.config';
import { generateApiRoute } from './lib/generator';
import { GeneratorOptions } from './model/types';
import { ToolLayout, ToolSection } from '@/shared/ui/tool-layout';
import { OptionControls } from './ui/OptionControls';
import { CodePreview } from './ui/CodePreview';
import { Card } from '@/shared/ui/card';
import { Label } from '@/shared/ui/label';
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

export default function ApiRouteGenerator() {
  const [options, setOptions] = useState<GeneratorOptions>({
    methods: {
      GET: true,
      POST: true,
      PUT: false,
      DELETE: false,
      PATCH: false,
    },
    features: {
      includeZod: true,
      includeTryCatch: true,
      includeComments: true,
      dynamicRoute: false,
    },
  });

  const generatedCode = generateApiRoute(options);

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

      <ToolSection title="설정 및 코드 생성">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <OptionControls options={options} onChange={setOptions} />
          </div>
          <div>
             <Label className="text-base font-semibold mb-3 block text-slate-700 dark:text-slate-300">
               미리보기 (route.ts)
             </Label>
            <CodePreview code={generatedCode} />
          </div>
        </div>
      </ToolSection>

      <div className="my-12" />

      {/* --- SEO Content: Intro --- */}
      <ToolSection title="Next.js App Router API 개발의 표준">
        <div className="prose dark:prose-invert max-w-none">
          <p className="lead text-lg text-slate-600 dark:text-slate-300">
            Next.js 13.4부터 도입된 <strong>App Router</strong>는 기존 Pages Router와는 완전히 다른 API Route 작성 방식을 요구합니다. 
            <code>pages/api/hello.ts</code> 대신 <code>app/api/hello/route.ts</code> 파일 시스템을 사용하며, 
            함수 이름 또한 HTTP 메서드명(GET, POST 등)과 일치시켜야 합니다.
          </p>
          <p>
            이 생성기는 이러한 새로운 규격에 완벽하게 대응하는 TypeScript 보일러플레이트 코드를 제공합니다. 
            단순한 핸들러뿐만 아니라 <strong>Zod</strong>를 이용한 유효성 검사, 표준화된 에러 처리 패턴을 포함하여 
            실무에서 즉시 사용할 수 있는 수준의 코드를 만들어줍니다.
          </p>
        </div>
      </ToolSection>

      {/* --- SEO Content: Key Features --- */}
      <ToolSection title="주요 기능">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 bg-slate-50 dark:bg-slate-900 border-none">
            <h3 className="font-semibold text-lg mb-2 text-indigo-600 dark:text-indigo-400">🛡️ Zod 유효성 검사 통합</h3>
            <p className="text-slate-600 dark:text-slate-400">
              API 개발에서 가장 번거로운 Request Body 검증 로직을 Zod 스키마와 함께 자동으로 생성합니다. 타입 안전성을 손쉽게 확보하세요.
            </p>
          </Card>
          <Card className="p-6 bg-slate-50 dark:bg-slate-900 border-none">
            <h3 className="font-semibold text-lg mb-2 text-indigo-600 dark:text-indigo-400">📝 App Router 규격 준수</h3>
            <p className="text-slate-600 dark:text-slate-400">
              NextRequest, NextResponse 등 Next.js의 최신 서버 사이드 API 타입을 정확하게 사용하여 타입 에러 없는 코드를 제공합니다.
            </p>
          </Card>
          <Card className="p-6 bg-slate-50 dark:bg-slate-900 border-none">
            <h3 className="font-semibold text-lg mb-2 text-indigo-600 dark:text-indigo-400">⚡️ 다이나믹 라우트 지원</h3>
            <p className="text-slate-600 dark:text-slate-400">
              <code>[id]/route.ts</code> 패턴을 위한 params 타입 정의와 추출 로직을 옵션 하나로 추가할 수 있습니다.
            </p>
          </Card>
          <Card className="p-6 bg-slate-50 dark:bg-slate-900 border-none">
            <h3 className="font-semibold text-lg mb-2 text-indigo-600 dark:text-indigo-400">🛡️ 에러 처리 패턴화</h3>
            <p className="text-slate-600 dark:text-slate-400">
              try-catch 블록과 표준화된 500 에러 응답 형식을 미리 작성하여, 예외 상황에서도 안정적인 API 동작을 보장합니다.
            </p>
          </Card>
        </div>
      </ToolSection>

      {/* --- SEO Content: Mermaid Diagram --- */}
      <div className="my-8">
        <Card className="p-6 bg-slate-950 text-white border-slate-800">
          <h3 className="text-lg font-semibold mb-4 text-slate-200">API 처리 흐름도</h3>
          <div className="mermaid bg-slate-900 p-4 rounded-lg flex justify-center">
            {`graph LR
              A[Client Request] --> B{NextRequest}
              B --> C[HTTP Method Match]
              C --> D{Body Validation}
              D -->|Success| E[Business Logic]
              D -->|Fail| F[400 Bad Request]
              E --> G[NextResponse JSON]
            `}
          </div>
        </Card>
      </div>

      {/* --- SEO Content: Comparison Table --- */}
      <ToolSection title="Pages Router vs App Router 비교">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-500 dark:text-slate-400">
            <thead className="text-xs text-slate-700 uppercase bg-slate-50 dark:bg-slate-800 dark:text-slate-200">
              <tr>
                <th scope="col" className="px-6 py-3">구분</th>
                <th scope="col" className="px-6 py-3">Pages Router (Legacy)</th>
                <th scope="col" className="px-6 py-3">App Router (Modern)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b dark:bg-slate-900 dark:border-slate-800">
                <td className="px-6 py-4 font-medium">파일 경로</td>
                <td className="px-6 py-4">pages/api/user.ts</td>
                <td className="px-6 py-4 text-indigo-600">app/api/user/route.ts</td>
              </tr>
              <tr className="bg-white border-b dark:bg-slate-900 dark:border-slate-800">
                <td className="px-6 py-4 font-medium">함수 정의</td>
                <td className="px-6 py-4">export default function handler(...)</td>
                <td className="px-6 py-4 text-indigo-600">export async function GET(...)</td>
              </tr>
              <tr className="bg-white border-b dark:bg-slate-900 dark:border-slate-800">
                <td className="px-6 py-4 font-medium">Request 객체</td>
                <td className="px-6 py-4">NextApiRequest (Node.js 기반)</td>
                <td className="px-6 py-4 text-indigo-600">NextRequest (Web API 기반)</td>
              </tr>
              <tr className="bg-white border-b dark:bg-slate-900 dark:border-slate-800">
                <td className="px-6 py-4 font-medium">Response 객체</td>
                <td className="px-6 py-4">res.status(200).json(...)</td>
                <td className="px-6 py-4 text-indigo-600">NextResponse.json(...)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </ToolSection>

      <div className="my-12" />

      {/* --- SEO Content: FAQ --- */}
      <ToolSection title="자주 묻는 질문 (FAQ)">
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-slate-200">Q1: 생성된 코드는 어디에 저장해야 하나요?</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              <code>app/api/[폴더명]/route.ts</code> 위치에 저장해야 합니다. 
              예를 들어 사용자 관련 API라면 <code>app/api/user/route.ts</code> 파일을 생성하고 코드를 붙여넣으세요.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-slate-200">Q2: Zod는 반드시 설치해야 하나요?</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              네, Zod 옵션을 켰다면 프로젝트에 Zod가 설치되어 있어야 합니다. 
              터미널에서 <code>npm install zod</code> 명령어로 설치할 수 있습니다. 
              만약 Zod를 사용하지 않는다면 옵션에서 체크를 해제하세요.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-slate-200">Q3: 여러 메서드를 한 파일에 넣을 수 있나요?</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              네, App Router에서는 하나의 <code>route.ts</code> 파일 내에 GET, POST, PUT, DELETE 등 여러 함수를 동시에 export 할 수 있습니다. 
              이 도구에서도 여러 메서드를 선택하면 하나의 파일에 모두 생성해줍니다.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-slate-200">Q4: Edge Runtime을 사용할 수 있나요?</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              네, 생성된 코드는 표준 Web API를 사용하므로 Edge Runtime과 호환됩니다. 
              파일 상단에 <code>export const runtime = 'edge';</code>를 추가하면 Edge 환경에서 동작합니다.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-slate-200">Q5: Context(params)는 어떻게 사용하나요?</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              동적 라우팅(Dynamic Route)을 사용하는 경우, 두 번째 인자로 <code>context</code> 객체를 받습니다. 
              'Dynamic Route ([id])' 옵션을 켜면 <code>params</code> 타입을 포함한 코드가 생성됩니다.
            </p>
          </div>
        </div>
      </ToolSection>

      <div className="my-12" />

      {/* --- Related Tools --- */}
      <ToolSection title="함께 사용하면 좋은 도구">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/tools/converter/json-to-ts" className="block h-full">
            <Card className="h-full p-4 hover:border-indigo-500 transition-colors">
              <h4 className="font-semibold mb-2">JSON to TypeScript</h4>
              <p className="text-sm text-slate-500">API 응답 JSON을 TypeScript 인터페이스로 변환하세요.</p>
            </Card>
          </Link>
          <Link href="/tools/converter/curl-to-fetch" className="block h-full">
            <Card className="h-full p-4 hover:border-indigo-500 transition-colors">
              <h4 className="font-semibold mb-2">cURL to Fetch</h4>
              <p className="text-sm text-slate-500">API 테스트 명령어를 프론트엔드 코드로 변환하세요.</p>
            </Card>
          </Link>
          <Link href="/tools/utility/visual-command-map" className="block h-full">
            <Card className="h-full p-4 hover:border-indigo-500 transition-colors">
              <h4 className="font-semibold mb-2">풀스택 명령어 지도</h4>
              <p className="text-sm text-slate-500">개발부터 배포까지 필요한 터미널 명령어를 확인하세요.</p>
            </Card>
          </Link>
        </div>
      </ToolSection>
    </ToolLayout>
  );
}
