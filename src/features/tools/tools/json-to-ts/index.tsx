'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/shared/ui/card';
import { Switch } from '@/shared/ui/switch';
import { Label } from '@/shared/ui/label';
import { Textarea } from '@/shared/ui/textarea';
import { CopyButton } from '@/shared/ui/copy-button';
import { Typography } from '@/shared/ui/typography';
import { ToolLayout, ToolSection } from '@/shared/ui/tool-layout';
import { config } from './tool.config';
import { convertJsonToTs } from './lib/converter';

export default function JsonToTsTool() {
  const [input, setInput] = useState(`{
  "id": 1,
  "title": "Next.js 16과 TypeScript의 조화",
  "author": {
    "name": "홍길동",
    "email": "hong@example.com"
  },
  "tags": ["Next.js", "React", "TypeScript"],
  "published": true
}`);
  const [output, setOutput] = useState('');
  const [useTypeAlias, setUseTypeAlias] = useState(false);
  const [generateZod, setGenerateZod] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    handleConvert();
  }, [input, useTypeAlias, generateZod]);

  const handleConvert = () => {
    if (!input.trim()) {
      setOutput('');
      setError(null);
      return;
    }

    try {
      const result = convertJsonToTs(input, {
        rootName: 'ApiResponse',
        useTypeAlias,
        generateZod,
      });
      
      if (result.startsWith('Error:')) {
        setError(result);
        setOutput('');
      } else {
        setError(null);
        setOutput(result);
      }
    } catch (e) {
      setError('예기치 않은 오류가 발생했습니다.');
    }
  };

  return (
    <ToolLayout config={config}>
      {/* 1️⃣ 도구 실행 영역 */}
      <ToolSection title="JSON to TypeScript 변환기" headingLevel="h2">
        <Card className="p-4 bg-muted/30 border-none mb-6">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center space-x-2">
              <Switch
                id="type-alias"
                checked={useTypeAlias}
                onCheckedChange={setUseTypeAlias}
              />
              <Label htmlFor="type-alias" className="cursor-pointer">Type Alias 사용</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="zod-schema"
                checked={generateZod}
                onCheckedChange={setGenerateZod}
              />
              <Label htmlFor="zod-schema" className="cursor-pointer">Zod 스키마 생성</Label>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[500px]">
          <div className="flex flex-col space-y-2 h-full">
            <Label>JSON 데이터 입력</Label>
            <Textarea
              className="flex-1 font-mono text-sm resize-none p-4 bg-background"
              placeholder="여기에 JSON 데이터를 붙여넣으세요..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>

          <div className="flex flex-col space-y-2 h-full">
            <div className="flex justify-between items-center">
              <Label>변환된 TypeScript 코드</Label>
              {output && <CopyButton text={output} />}
            </div>
            <div className="relative flex-1">
              <Textarea
                readOnly
                className={`flex-1 font-mono text-sm resize-none p-4 h-full bg-muted/50 ${error ? 'text-red-500' : ''}`}
                value={error || output}
              />
            </div>
          </div>
        </div>
      </ToolSection>

      <div className="my-12 border-t pt-12" />

      {/* 2️⃣ 사용 가이드 */}
      <ToolSection title="사용 방법" headingLevel="h2" className="my-8">
        <Typography variant="p" className="mb-4">
          JSON to TypeScript 변환기는 복잡한 데이터 구조를 가진 JSON을 기반으로 즉시 사용 가능한 TypeScript 인터페이스와 Zod 스키마를 생성합니다. 다음 단계를 통해 생산성을 높여보세요.
        </Typography>
        <ol className="list-decimal pl-6 space-y-3 mb-6">
          <li>
            <strong>JSON 입력:</strong> 왼쪽 입력창에 API 응답값이나 데이터 구조가 담긴 JSON을 붙여넣습니다. 실시간으로 변환이 시작됩니다.
          </li>
          <li>
            <strong>옵션 설정:</strong> 상단의 토글 스위치를 통해 <code>interface</code> 대신 <code>type</code> 정의를 사용할지, 혹은 런타임 검증을 위한 <code>Zod</code> 스키마를 함께 생성할지 선택합니다.
          </li>
          <li>
            <strong>코드 복사:</strong> 우측 상단의 복사 아이콘을 클릭하여 생성된 코드를 프로젝트의 타입 정의 파일이나 스키마 파일에 붙여넣습니다.
          </li>
          <li>
            <strong>자동 네이밍:</strong> 중첩된 객체가 있을 경우 시스템이 자동으로 <code>Item</code> 등의 접미사를 붙여 하위 타입을 분리해주므로, 복잡한 트리 구조도 체계적으로 관리할 수 있습니다.
          </li>
        </ol>
        <Typography variant="p" className="text-sm text-muted-foreground italic">
          팁: JSON 데이터에 특수문자가 포함된 키가 있는 경우, 변환기는 자동으로 따옴표를 추가하여 유효한 TypeScript 문법을 유지합니다.
        </Typography>
      </ToolSection>

      <div className="my-12 border-t pt-12" />

      {/* 3️⃣ SEO 콘텐츠 영역 */}
      <ToolSection title="JSON to TypeScript 변환 완벽 가이드: 현대적 웹 개발의 필수 전략" headingLevel="h2" className="my-8">
        
        {/* 도입부 */}
        <div className="space-y-4 mb-10">
          <Typography variant="h3">JSON to TypeScript 변환기란 무엇인가?</Typography>
          <Typography variant="p">
            현대 프론트엔드 개발 환경에서 TypeScript는 선택이 아닌 필수입니다. 하지만 백엔드 API로부터 전달받는 방대한 JSON 데이터의 타입을 수동으로 작성하는 과정은 반복적이고 오류가 발생하기 쉬운 작업입니다. JSON to TypeScript 변환기는 이러한 비효율성을 해결하기 위해 설계된 전문 도구입니다.
          </Typography>
          <Typography variant="p">
            이 도구는 단순한 텍스트 변환을 넘어, JSON의 계층 구조를 심층적으로 분석합니다. 복잡한 중첩 객체(Nested Objects)와 배열 타입을 자동으로 추론하여 최적화된 인터페이스를 구성하며, 특히 React나 Next.js 프로젝트에서 API 응답값에 대한 안정적인 타입 가드를 구축하는 데 핵심적인 역할을 합니다. 개발자는 타입을 정의하는 데 드는 시간을 절약하고, 비즈니스 로직 구현에 더 집중할 수 있게 됩니다.
          </Typography>
        </div>

        {/* 주요 기능 */}
        <div className="space-y-4 mb-10">
          <Typography variant="h3">이 도구가 제공하는 차별화된 기능</Typography>
          <ul className="list-disc pl-6 space-y-4">
            <li>
              <strong>실시간 스키마 추론 엔진:</strong> JSON 데이터를 입력하는 즉시 타입을 생성합니다. 데이터의 변화에 따른 타입의 변경 사항을 즉각적으로 확인할 수 있어 빠른 프로토타이핑이 가능합니다.
            </li>
            <li>
              <strong>Zod 스키마 자동 생성 (Full-Stack Type Safety):</strong> 단순한 정적 타입 정의뿐만 아니라, 런타임에서 데이터의 유효성을 검증할 수 있는 Zod 스키마 생성을 지원합니다. 이는 외부 API로부터 들어오는 불확실한 데이터를 안전하게 처리할 수 있는 강력한 방어막이 됩니다.
            </li>
            <li>
              <strong>지능적 네이밍 및 구조화:</strong> 루트 객체부터 깊은 계층의 속성까지 일관된 명명 규칙을 적용하여 타입을 생성합니다. 배열 내부의 객체는 자동으로 별도의 인터페이스로 추출되어 코드의 재사용성을 높여줍니다.
            </li>
            <li>
              <strong>가독성 최적화:</strong> TypeScript의 최신 문법을 준수하며, 가독성 좋은 코드 정렬과 적절한 세미콜론 처리를 통해 별도의 포맷팅 없이 프로젝트에 바로 적용할 수 있습니다.
            </li>
          </ul>
        </div>

        {/* 실무 사용 시나리오 */}
        <div className="space-y-4 mb-10">
          <Typography variant="h3">실무에서 이렇게 사용하세요</Typography>
          <Typography variant="p">
            실제 개발 현장에서는 다음과 같은 상황에서 이 변환기가 강력한 위력을 발휘합니다.
          </Typography>
          <div className="space-y-6">
            <div>
              <Typography variant="h4" className="font-semibold mb-1">1. 대규모 API 통합 및 데이터 매핑</Typography>
              <Typography variant="p">
                수십 개의 필드를 가진 백엔드 API 응답을 처음 연동할 때, Postman 등으로 받은 JSON을 그대로 복사하여 이 도구에 넣으세요. 단 1초 만에 완벽한 TypeScript Interface가 완성됩니다. 이는 수동 타이핑 중 발생할 수 있는 오타로 인한 런타임 에러를 100% 방지합니다.
              </Typography>
            </div>
            <div>
              <Typography variant="h4" className="font-semibold mb-1">2. Zod를 활용한 런타임 데이터 검증</Typography>
              <Typography variant="p">
                Next.js의 Server Actions나 API Routes에서 외부 데이터를 받을 때, 생성된 Zod 스키마를 활용하세요. <code>schema.parse()</code> 한 번으로 타입 세이프티와 데이터 유효성 검증을 동시에 달성할 수 있습니다. 정적 타입(Interface)과 동적 검증(Zod)의 조화는 견고한 애플리케이션의 기반이 됩니다.
              </Typography>
            </div>
            <div>
              <Typography variant="h4" className="font-semibold mb-1">3. 레거시 코드의 타입 마이그레이션</Typography>
              <Typography variant="p">
                JavaScript로 작성된 기존 프로젝트를 TypeScript로 마이그레이션할 때, 실제 흐르는 데이터를 캡처하여 이 도구로 타입을 추출하세요. 기존 데이터 구조를 정확히 반영한 타입 정의를 빠르게 구축하여 마이그레이션 속도를 비약적으로 향상시킬 수 있습니다.
              </Typography>
            </div>
          </div>
        </div>

        {/* 기술적 배경 */}
        <div className="space-y-4 mb-10">
          <Typography variant="h3">TypeScript Interface vs Zod: 왜 두 가지가 모두 필요한가?</Typography>
          <Typography variant="p">
            많은 개발자가 TypeScript Interface와 Zod 스키마 중 하나만 사용해도 충분한지 의문을 가집니다. 하지만 이 두 기술은 보완 관계에 있습니다. Interface는 컴파일 시점의 정적 분석을 담당하고, Zod는 실제 실행 시점의 동적 데이터 신뢰성을 보장합니다.
          </Typography>
          
          <div className="overflow-x-auto my-6">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="p-3 border text-left">비교 항목</th>
                  <th className="p-3 border text-left">TypeScript Interface</th>
                  <th className="p-3 border text-left">Zod Schema</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border font-semibold">적용 시점</td>
                  <td className="p-3 border">컴파일 타임 (Compile-time)</td>
                  <td className="p-3 border">런타임 (Run-time)</td>
                </tr>
                <tr>
                  <td className="p-3 border font-semibold">데이터 검증</td>
                  <td className="p-3 border">불가능 (타입 힌트만 제공)</td>
                  <td className="p-3 border">가능 (실제 값 유효성 체크)</td>
                </tr>
                <tr>
                  <td className="p-3 border font-semibold">번들 크기 영향</td>
                  <td className="p-3 border">없음 (트랜스파일 후 소멸)</td>
                  <td className="p-3 border">있음 (라이브러리 포함)</td>
                </tr>
                <tr>
                  <td className="p-3 border font-semibold">주요 용도</td>
                  <td className="p-3 border">내부 로직 개발, IDE 인텔리센스</td>
                  <td className="p-3 border">API 응답 검증, 폼 데이터 체크</td>
                </tr>
              </tbody>
            </table>
          </div>

          <Typography variant="p">
            이 도구는 두 가지 형식을 모두 지원함으로써, 개발자가 상황에 맞는 최적의 도구를 선택할 수 있게 합니다. 내부 링크인 
            <Link href="/converter/json-to-table" className="text-primary hover:underline mx-1 font-semibold">JSON to Table</Link>
            도구와 함께 사용하면 데이터를 시각적으로 확인하면서 동시에 견고한 타입 시스템을 구축할 수 있어 더욱 효과적입니다. 또한 성능 최적화가 필요하다면 
            <Link href="/utility/vibe-token-slimmer" className="text-primary hover:underline mx-1 font-semibold">Token Slimmer</Link>
            를 사용하여 데이터 전송량을 줄이는 전략도 함께 고려해 보세요.
          </Typography>
        </div>

        {/* FAQ */}
        <div className="space-y-4">
          <Typography variant="h3">자주 묻는 질문 (FAQ)</Typography>
          <div className="space-y-6">
            <div>
              <Typography variant="h4" className="font-semibold mb-2">Q1: 대용량 JSON 파일을 변환할 때 성능 문제가 없나요?</Typography>
              <Typography variant="p">
                A: 본 도구는 브라우저 사이드에서 효율적인 재귀 알고리즘을 사용하여 수천 줄의 JSON도 수 밀리초 내에 변환합니다. 다만, 브라우저의 메모리 제한으로 인해 수십 MB 단위의 극단적인 대용량 파일은 입력 시 렌더링 지연이 발생할 수 있으므로, 적절한 샘플 데이터만 추출하여 변환하는 것을 권장합니다.
              </Typography>
            </div>
            <div>
              <Typography variant="h4" className="font-semibold mb-2">Q2: 비어 있는 배열([])은 어떻게 처리되나요?</Typography>
              <Typography variant="p">
                A: JSON 데이터 내의 빈 배열은 구체적인 타입을 추론할 근거가 부족하기 때문에 기본적으로 <code>any[]</code>로 처리됩니다. 정확한 타입을 얻으려면 최소 하나 이상의 데이터가 포함된 JSON 샘플을 입력하는 것이 좋습니다.
              </Typography>
            </div>
            <div>
              <Typography variant="h4" className="font-semibold mb-2">Q3: 중첩된 객체의 이름이 중복되면 어떻게 하나요?</Typography>
              <Typography variant="p">
                A: 변환 엔진은 계층 구조에 따라 유니크한 이름을 부여하려고 시도합니다. 만약 동일한 필드명이 반복된다면, 생성된 코드에서 수동으로 인터페이스 이름을 리팩토링하는 것이 좋습니다. 이는 TypeScript의 타입 시스템에서 발생할 수 있는 충돌을 방지하기 위한 권장 사항입니다.
              </Typography>
            </div>
          </div>
        </div>
      </ToolSection>

      <div className="my-12 border-t pt-12 text-center">
        <Typography variant="p" className="text-muted-foreground">
          웹 개발의 복잡성을 줄이고 데이터의 신뢰성을 높이세요. <br />
          Vlog 개발 도구는 언제나 개발자의 생산성 향상을 위해 함께합니다.
        </Typography>
      </div>
    </ToolLayout>
  );
}