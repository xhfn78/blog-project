'use client';

import type { Metadata } from 'next';
import { useState, useEffect } from 'react';
import { config } from './tool.config';
import { safeEncode, safeDecode } from './lib/url-utils';
import { ToolLayout, ToolSection } from '@/shared/ui/tool-layout';
import { Textarea } from '@/shared/ui/textarea';
import { Button } from '@/shared/ui/button';
import { Label } from '@/shared/ui/label';
import { Card } from '@/shared/ui/card';
import { ArrowDown, Copy, Trash2 } from 'lucide-react';
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

export default function UrlEncoderDecoder() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  useEffect(() => {
    if (!input) {
      setOutput('');
      return;
    }
    if (mode === 'encode') {
      setOutput(safeEncode(input));
    } else {
      setOutput(safeDecode(input));
    }
  }, [input, mode]);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: config.name,
    description: config.description,
    applicationCategory: 'UtilityApplication',
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

      <ToolSection title="변환 도구">
        <div className="space-y-6">
          <div className="flex justify-center gap-4 mb-4">
            <Button
              variant={mode === 'encode' ? 'default' : 'outline'}
              onClick={() => setMode('encode')}
              className="w-32"
            >
              인코딩 (Encode)
            </Button>
            <Button
              variant={mode === 'decode' ? 'default' : 'outline'}
              onClick={() => setMode('decode')}
              className="w-32"
            >
              디코딩 (Decode)
            </Button>
          </div>

          <div className="space-y-2">
            <Label>입력 (Input)</Label>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === 'encode' ? '인코딩할 텍스트를 입력하세요 (예: 안녕하세요)' : '디코딩할 URL을 입력하세요 (예: %EC%95%88%EB%85%95)'}
              className="h-32 font-mono text-sm"
            />
            <div className="flex justify-end">
              <Button variant="ghost" size="sm" onClick={() => setInput('')} className="text-slate-500">
                <Trash2 className="w-4 h-4 mr-2" /> 초기화
              </Button>
            </div>
          </div>

          <div className="flex justify-center text-slate-400">
            <ArrowDown className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <Label>결과 (Output)</Label>
            <div className="relative">
              <Textarea
                value={output}
                readOnly
                className="h-32 font-mono text-sm bg-slate-50 dark:bg-slate-900"
              />
              <div className="absolute top-2 right-2">
                <Button variant="outline" size="sm" onClick={handleCopy}>
                  <Copy className="w-4 h-4 mr-2" /> 복사
                </Button>
              </div>
            </div>
          </div>
        </div>
      </ToolSection>

      <div className="my-12" />

      {/* --- SEO Content: Intro --- */}
      <ToolSection title="URL 인코딩이란 무엇인가요?">
        <div className="prose dark:prose-invert max-w-none">
          <p className="lead text-lg text-slate-600 dark:text-slate-300">
            <strong>URL 인코딩(Percent Encoding)</strong>은 인터넷을 통해 전송될 수 있는 문자 포맷으로 데이터를 변환하는 메커니즘입니다. 
            URL은 오직 ASCII 문자 집합(알파벳, 숫자, 일부 특수문자)만 포함할 수 있기 때문에, 
            한글이나 공백, <code>&</code>, <code>=</code>, <code>?</code> 와 같은 예약어들은 반드시 <code>%</code>로 시작하는 16진수 값으로 변환되어야 합니다.
          </p>
          <p>
            예를 들어, "안녕"이라는 한글은 URL에서 직접 사용할 수 없으며, 반드시 <code>%EC%95%88%EB%85%95</code> 형태로 인코딩되어야 서버가 올바르게 인식할 수 있습니다. 
            이 도구는 이러한 변환 과정을 실시간으로 처리하여 개발자의 디버깅을 돕습니다.
          </p>
        </div>
      </ToolSection>

      {/* --- SEO Content: Key Features --- */}
      <ToolSection title="주요 기능">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 bg-slate-50 dark:bg-slate-900 border-none">
            <h3 className="font-semibold text-lg mb-2 text-indigo-600 dark:text-indigo-400">🔄 실시간 변환</h3>
            <p className="text-slate-600 dark:text-slate-400">
              타이핑과 동시에 인코딩/디코딩 결과를 보여줍니다. 별도의 버튼 클릭 없이 즉시 결과를 확인하세요.
            </p>
          </Card>
          <Card className="p-6 bg-slate-50 dark:bg-slate-900 border-none">
            <h3 className="font-semibold text-lg mb-2 text-indigo-600 dark:text-indigo-400">🛡️ UTF-8 완벽 지원</h3>
            <p className="text-slate-600 dark:text-slate-400">
              한글, 이모지, 다국어 문자를 표준 UTF-8 방식으로 정확하게 처리하여 깨짐 현상을 방지합니다.
            </p>
          </Card>
          <Card className="p-6 bg-slate-50 dark:bg-slate-900 border-none">
            <h3 className="font-semibold text-lg mb-2 text-indigo-600 dark:text-indigo-400">🚫 오류 방지 로직</h3>
            <p className="text-slate-600 dark:text-slate-400">
              잘못된 형식의 URI 시퀀스가 입력되더라도 앱이 중단되지 않고 친절한 에러 메시지를 표시합니다.
            </p>
          </Card>
        </div>
      </ToolSection>

      {/* --- SEO Content: Mermaid Diagram --- */}
      <div className="my-8">
        <Card className="p-6 bg-slate-950 text-white border-slate-800">
          <h3 className="text-lg font-semibold mb-4 text-slate-200">인코딩 처리 흐름</h3>
          <div className="mermaid bg-slate-900 p-4 rounded-lg flex justify-center">
            {`graph LR
              A[사용자 입력 '가'] --> B{인코딩 엔진}
              B --> C[UTF-8 변환]
              C --> D[Hex 변환 E3 80 80]
              D --> E[%추가]
              E --> F[결과 %E3%80%80]
            `}
          </div>
        </Card>
      </div>

      {/* --- SEO Content: FAQ --- */}
      <ToolSection title="자주 묻는 질문 (FAQ)">
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-slate-200">Q1: encodeURI와 encodeURIComponent의 차이는 무엇인가요?</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              <code>encodeURI</code>는 전체 URL을 인코딩할 때 사용하며, <code>: / ? # & =</code> 같은 예약 문자는 변환하지 않습니다. 
              반면 <code>encodeURIComponent</code>는 URL의 파라미터(값) 부분을 인코딩할 때 사용하며, 예약 문자까지 모두 변환합니다. 
              이 도구는 더 안전한 파라미터 전송을 위해 <code>encodeURIComponent</code> 방식을 사용합니다.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-slate-200">Q2: 공백이 + 기호로 바뀌는 경우가 있는데 왜 그런가요?</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              과거 `application/x-www-form-urlencoded` 포맷에서는 공백을 `+`로 변환했으나, 최신 표준인 RFC 3986에서는 공백을 `%20`으로 변환하는 것을 권장합니다. 
              이 도구는 표준을 준수하여 `%20`으로 변환합니다.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-slate-200">Q3: 디코딩 시 "Malformed URI" 에러가 납니다.</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              입력된 문자열이 올바른 퍼센트 인코딩 형식이 아닐 때 발생합니다. 
              예를 들어 `%` 뒤에 유효한 16진수 두 자리가 오지 않는 경우(%G5 등)입니다. 입력값을 다시 확인해주세요.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-slate-200">Q4: Base64 인코딩과는 다른가요?</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              네, 완전히 다릅니다. URL 인코딩은 URL 안전성을 위한 것이고, Base64는 바이너리 데이터를 텍스트로 표현하기 위한 것입니다. 
              Base64 인코딩/디코딩이 필요하다면 별도의 Base64 도구를 사용해야 합니다.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-slate-200">Q5: 보안상 안전한가요?</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              네, 100% 안전합니다. 모든 변환 작업은 사용자의 브라우저(클라이언트 사이드)에서 자바스크립트로 수행되며, 
              입력하신 데이터는 그 어떤 서버로도 전송되지 않습니다.
            </p>
          </div>
        </div>
      </ToolSection>

      <div className="my-12" />

      {/* --- Related Tools --- */}
      <ToolSection title="함께 사용하면 좋은 도구">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/tools/utility/base64-encoder-decoder" className="block h-full">
            <Card className="h-full p-4 hover:border-indigo-500 transition-colors">
              <h4 className="font-semibold mb-2">Base64 인코더/디코더</h4>
              <p className="text-sm text-slate-500">파일이나 텍스트를 Base64 포맷으로 변환하세요.</p>
            </Card>
          </Link>
          <Link href="/tools/utility/regex-tester" className="block h-full">
            <Card className="h-full p-4 hover:border-indigo-500 transition-colors">
              <h4 className="font-semibold mb-2">정규식 테스터</h4>
              <p className="text-sm text-slate-500">URL 패턴 매칭을 위한 정규표현식을 테스트하세요.</p>
            </Card>
          </Link>
          <Link href="/tools/generator/jwt-decoder" className="block h-full">
            <Card className="h-full p-4 hover:border-indigo-500 transition-colors">
              <h4 className="font-semibold mb-2">JWT 디코더</h4>
              <p className="text-sm text-slate-500">JWT 토큰의 페이로드를 디코딩하여 내용을 확인하세요.</p>
            </Card>
          </Link>
        </div>
      </ToolSection>
    </ToolLayout>
  );
}
