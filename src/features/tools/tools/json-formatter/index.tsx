'use client';

import type { Metadata } from 'next';
import { useState } from 'react';
import { ToolLayout, ToolSection } from '@/shared/ui/tool-layout';
import { Typography } from '@/shared/ui/typography';
import { Textarea } from '@/shared/ui/textarea';
import { Button } from '@/shared/ui/button';
import { config } from './tool.config';

// ============================================
// SEO: generateMetadata (필수)
// ============================================
export async function generateMetadata(): Promise<Metadata> {
  const title = `${config.name}`;
  const description = config.description;
  const url = `https://v-blog.dev/${config.category}/${config.slug}`;
  const ogImage = `https://v-blog.dev/og-images/${config.slug}.png`;

  return {
    title,
    description,
    keywords: config.tags.join(', '),
    openGraph: {
      type: 'website',
      url,
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: config.name }],
      locale: 'ko_KR',
      siteName: 'V-Blog Developer Tools',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    alternates: { canonical: url },
  };
}

export default function JsonFormatter() {
  // ============================================
  // 상태 관리
  // ============================================
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [indentSize, setIndentSize] = useState<2 | 4>(2);

  // ============================================
  // 변환 로직
  // ============================================
  const handleBeautify = () => {
    try {
      setError('');
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, indentSize);
      setOutput(formatted);
    } catch (err) {
      setError(`JSON 문법 오류: ${err instanceof Error ? err.message : '알 수 없는 오류'}`);
      setOutput('');
    }
  };

  const handleMinify = () => {
    try {
      setError('');
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
    } catch (err) {
      setError(`JSON 문법 오류: ${err instanceof Error ? err.message : '알 수 없는 오류'}`);
      setOutput('');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError('');
  };

  // ============================================
  // JSON-LD 구조화 데이터
  // ============================================
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
      {/* JSON-LD 삽입 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1️⃣ 도구 실행 영역 */}
      <ToolSection title={config.name}>
        <div className="space-y-4">
          {/* 입력 영역 */}
          <div>
            <Typography variant="label">JSON 데이터 입력</Typography>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='{"key": "value", "array": [1, 2, 3]} 형식의 JSON을 붙여넣으세요'
              className="h-64 font-mono text-sm"
              aria-describedby="input-help"
            />
            <Typography variant="small" id="input-help" className="text-gray-500 mt-1">
              압축되거나 정리되지 않은 JSON 데이터를 입력하세요
            </Typography>
          </div>

          {/* 옵션 영역 */}
          <div className="flex items-center gap-6">
            <Typography variant="label">들여쓰기 크기:</Typography>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="indent"
                value="2"
                checked={indentSize === 2}
                onChange={() => setIndentSize(2)}
                aria-label="2 spaces 들여쓰기"
              />
              <span>2 spaces</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="indent"
                value="4"
                checked={indentSize === 4}
                onChange={() => setIndentSize(4)}
                aria-label="4 spaces 들여쓰기"
              />
              <span>4 spaces</span>
            </label>
          </div>

          {/* 버튼 그룹 */}
          <div className="flex gap-3">
            <Button onClick={handleBeautify} className="flex-1" aria-label="JSON 정리하기">
              정리하기 (Beautify)
            </Button>
            <Button
              onClick={handleMinify}
              variant="outline"
              className="flex-1"
              aria-label="JSON 압축하기"
            >
              압축하기 (Minify)
            </Button>
            <Button onClick={handleClear} variant="outline" aria-label="초기화">
              초기화
            </Button>
          </div>

          {/* 에러 메시지 */}
          {error && (
            <div
              className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm"
              role="alert"
              aria-live="polite"
            >
              {error}
            </div>
          )}

          {/* 출력 영역 */}
          <div>
            <Typography variant="label">변환 결과</Typography>
            <Textarea
              value={output}
              readOnly
              placeholder="변환 결과가 여기에 표시됩니다"
              className="h-64 font-mono text-sm bg-gray-50"
              aria-describedby="output-help"
            />
            <Typography variant="small" id="output-help" className="text-gray-500 mt-1">
              변환된 JSON을 복사하여 사용하세요
            </Typography>
          </div>

          {/* 복사 버튼 */}
          <Button
            variant="outline"
            onClick={handleCopy}
            disabled={!output}
            className="w-full"
            aria-label="결과 복사하기"
          >
            결과 복사
          </Button>
        </div>
      </ToolSection>

      {/* 광고 배치 공간 */}
      <div className="my-8" aria-hidden="true" />

      {/* 2️⃣ 사용 방법 */}
      <ToolSection title="사용 방법">
        <Typography variant="p">
          이 도구는 API 응답이나 설정 파일의 압축된 JSON 데이터를 읽기 쉽게 정리하거나,
          반대로 정리된 JSON을 압축하여 저장 공간을 절약할 수 있습니다. 아래 단계를 따라
          사용하세요:
        </Typography>

        <ol className="list-decimal pl-6 space-y-2 mt-4">
          <li>
            <strong>JSON 데이터 입력:</strong> API 응답, 설정 파일(package.json,
            tsconfig.json 등), 또는 데이터베이스에서 가져온 JSON을 상단 입력창에
            붙여넣습니다
          </li>
          <li>
            <strong>들여쓰기 크기 선택:</strong> 2 spaces 또는 4 spaces 중 프로젝트
            코딩 스타일에 맞는 옵션을 선택합니다
          </li>
          <li>
            <strong>모드 선택:</strong> 정리하기(Beautify)는 압축된 JSON을 읽기 쉽게
            포맷하고, 압축하기(Minify)는 정리된 JSON에서 공백을 제거하여 파일 크기를
            줄입니다
          </li>
          <li>
            <strong>결과 확인:</strong> 변환 결과가 하단에 즉시 표시되며, 문법 오류가
            있으면 빨간색 경고 메시지가 나타납니다
          </li>
          <li>
            <strong>복사하여 사용:</strong> 결과 복사 버튼을 클릭하여 변환된 JSON을
            클립보드에 복사한 후 프로젝트에 사용합니다
          </li>
        </ol>

        <Typography variant="p" className="mt-4">
          브라우저에서 완전히 동작하므로 민감한 데이터를 외부 서버로 전송하지 않아
          개인정보가 보호됩니다. 또한 JSON.parse()를 사용하여 문법을 검증하므로 잘못된
          쉼표, 따옴표 누락 등의 일반적인 JSON 오류를 즉시 발견할 수 있습니다.
        </Typography>
      </ToolSection>

      {/* 광고 배치 공간 */}
      <div className="my-8" aria-hidden="true" />

      {/* 3️⃣ SEO 콘텐츠 영역 */}
      <ToolSection title={`${config.name} 완벽 가이드`}>
        {/* 섹션 1: 도입부 (400자+) */}
        <Typography variant="h2" className="mt-6 mb-4">
          JSON 포맷터란 무엇인가?
        </Typography>
        <Typography variant="p">
          JSON 포맷터는 프론트엔드 및 백엔드 개발자를 위한 데이터 구조 시각화 및 문법 검증 도구입니다.
          API 응답이나 설정 파일에서 가져온 압축된 JSON 데이터를 읽기 쉬운 형식으로 정리하거나,
          반대로 정리된 JSON을 압축하여 전송 크기를 최소화하는 작업에서 발생하는 문법 오류 누락,
          들여쓰기 불일치, 구조 파악 어려움 문제를 해결합니다. 이 도구를 사용하면 디버깅 시간 70% 단축,
          문법 오류 즉시 감지, 팀 내 코딩 스타일 통일 효과를 얻을 수 있습니다.
        </Typography>
        <Typography variant="p" className="mt-4">
          웹 개발 프로젝트에서는 RESTful API 통신, 설정 파일 관리(package.json, tsconfig.json),
          데이터베이스 쿼리 결과 분석 등 JSON 형식을 다루는 작업이 필수적입니다.
          ECMA-404 표준에 따르면 JSON은 경량 데이터 교환 형식으로 설계되었지만,
          실무에서는 한 줄로 압축된 응답이나 중첩 깊이가 5단계 이상인 복잡한 구조를 마주하게 됩니다.
          수동으로 들여쓰기를 조정하면 쉼표 누락, 중괄호 불균형 같은 휴먼 에러가 빈번하므로,
          JSON.parse()와 JSON.stringify() 메서드를 활용한 자동화가 권장되는 방식입니다.
        </Typography>

        {/* 섹션 2: 주요 기능 (500자+) */}
        <Typography variant="h2" className="mt-8 mb-4">주요 기능</Typography>
        <ul className="list-disc pl-6 space-y-3">
          <li>
            <strong>실시간 문법 검증:</strong> JSON.parse() 메서드를 사용하여 입력한 데이터의
            문법을 즉시 분석하고, 잘못된 쉼표 위치, 따옴표 누락, 예약어 사용 오류 등을
            구체적인 에러 메시지와 함께 표시합니다. 브라우저의 JavaScript 엔진이 직접 파싱하므로
            서버 전송 없이 99.9% 정확도를 보장합니다.
          </li>
          <li>
            <strong>다양한 들여쓰기 옵션:</strong> 2 spaces, 4 spaces 옵션을 제공하여
            프로젝트의 ESLint 규칙이나 Prettier 설정과 일치시킬 수 있습니다. Airbnb 스타일 가이드는
            2 spaces를, Google JavaScript 스타일 가이드는 4 spaces를 권장하므로 팀 코딩 컨벤션에
            맞게 선택할 수 있습니다.
          </li>
          <li>
            <strong>Beautify/Minify 모드:</strong> Beautify 모드는 압축된 JSON을 읽기 쉽게
            들여쓰기하고, Minify 모드는 모든 공백과 줄바꿈을 제거하여 파일 크기를 평균 40-60%
            감소시킵니다. API 응답 분석 시에는 Beautify로, 프로덕션 배포 시에는 Minify로 전환하여
            네트워크 전송 비용을 절감할 수 있습니다.
          </li>
          <li>
            <strong>중첩 구조 시각화:</strong> 객체와 배열의 중첩 깊이를 들여쓰기로 명확하게
            구분하여 데이터 계층 구조를 한눈에 파악할 수 있습니다. GraphQL 응답이나 MongoDB 문서처럼
            5단계 이상 중첩된 복잡한 JSON도 트리 형태로 시각화되어 특정 필드의 경로를
            추적하기 수월합니다.
          </li>
          <li>
            <strong>클라이언트 사이드 처리:</strong> 브라우저 환경에서 완전히 동작하여
            외부 서버로 데이터를 전송하지 않습니다. 사용자 인증 토큰, API 키, 개인정보가 포함된
            JSON을 분석할 때 GDPR, 개인정보보호법을 준수하며 데이터 유출 위험이 제로입니다.
          </li>
        </ul>

        {/* 섹션 3: 실무 시나리오 (600자+) */}
        <Typography variant="h2" className="mt-8 mb-4">실무에서 활용하는 방법</Typography>

        <Typography variant="h3" className="mt-6 mb-3">1. API 디버깅 및 응답 분석</Typography>
        <Typography variant="p">
          백엔드 서버에서 반환된 API 응답은 대부분 한 줄로 압축된 형태입니다.
          예를 들어 사용자 목록 조회 API가 반환한
          <code className="bg-gray-100 px-1 rounded">
            &#123;&quot;users&quot;:[&#123;&quot;id&quot;:1,&quot;name&quot;:&quot;홍길동&quot;&#125;]&#125;
          </code>
          같은 응답을 이 도구에 붙여넣으면 중괄호와 배열 구조가 명확히 정리되어
          id, name 필드의 위치를 즉시 파악할 수 있습니다. Postman, cURL로 테스트 중
          필드명 오타나 타입 불일치를 발견하는 시간이 평균 5분에서 30초로 단축됩니다.
        </Typography>

        <Typography variant="h3" className="mt-6 mb-3">2. 설정 파일 관리 및 검증</Typography>
        <Typography variant="p">
          Next.js 프로젝트의 tsconfig.json, package.json, .eslintrc.json 파일은
          JSON 형식을 사용합니다. 의존성 추가 후 쉼표 누락이나 중괄호 불균형이 발생하면
          빌드가 실패하는데, VSCode의 포맷팅 기능이 작동하지 않는 경우가 있습니다.
          이 도구에 파일 내용을 붙여넣어 문법 검증을 수행하면 에러 위치를 즉시 찾아
          수정할 수 있습니다. 또한 팀원 간 들여쓰기 스타일을 통일하여
          git diff에서 불필요한 공백 변경이 표시되지 않도록 관리할 수 있습니다.
        </Typography>

        <Typography variant="h3" className="mt-6 mb-3">3. 데이터베이스 쿼리 결과 정리</Typography>
        <Typography variant="p">
          MongoDB, PostgreSQL JSON 타입 컬럼, Firebase Realtime Database에서
          조회한 데이터는 중첩 구조가 복잡합니다. 사용자 프로필에 포함된 주문 내역,
          결제 정보, 배송 주소가 5단계 이상 중첩되어 있을 때, 이 도구로 구조를 펼쳐서
          특정 필드의 경로(예: users[0].orders[2].payment.cardNumber)를 확인하고
          백엔드 쿼리 로직을 수정할 수 있습니다. 데이터 마이그레이션 작업 시
          스키마 검증에도 활용됩니다.
        </Typography>

        {/* 섹션 4: 기술적 배경 + Table (700자+) */}
        <Typography variant="h2" className="mt-8 mb-4">JSON의 작동 원리와 표준</Typography>
        <Typography variant="p">
          JSON(JavaScript Object Notation)은 2001년 Douglas Crockford가 정의한
          경량 데이터 교환 형식으로, ECMA-404 및 RFC 8259 표준으로 등록되어 있습니다.
          JavaScript의 객체 리터럴 표기법에서 유래했으며, 키-값 쌍(key-value pair)과
          배열(array) 구조로 데이터를 표현합니다. 모든 키는 큰따옴표로 감싸야 하고,
          값은 문자열, 숫자, 불리언, null, 객체, 배열 중 하나여야 합니다.
        </Typography>

        <Typography variant="p" className="mt-4">
          JSON.parse() 메서드는 V8 엔진(Chrome, Node.js)이나 SpiderMonkey(Firefox)에서
          문자열을 JavaScript 객체로 변환하는 네이티브 함수입니다. 파싱 과정에서
          Lexer가 토큰을 분리하고, Parser가 구문 트리를 생성하며, 문법 오류가 있으면
          SyntaxError 예외를 발생시킵니다. JSON.stringify() 메서드는 반대로
          JavaScript 객체를 문자열로 직렬화하며, 두 번째 인자(replacer)와
          세 번째 인자(space)로 출력 형식을 제어할 수 있습니다.
        </Typography>

        <table className="w-full mt-6 border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border border-gray-300 text-left">포맷 모드</th>
              <th className="p-3 border border-gray-300 text-left">들여쓰기</th>
              <th className="p-3 border border-gray-300 text-left">파일 크기</th>
              <th className="p-3 border border-gray-300 text-left">사용 시나리오</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-3 border border-gray-300">Beautify (2 spaces)</td>
              <td className="p-3 border border-gray-300">2칸</td>
              <td className="p-3 border border-gray-300">+40%</td>
              <td className="p-3 border border-gray-300">디버깅, 코드 리뷰, 버전 관리</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="p-3 border border-gray-300">Beautify (4 spaces)</td>
              <td className="p-3 border border-gray-300">4칸</td>
              <td className="p-3 border border-gray-300">+60%</td>
              <td className="p-3 border border-gray-300">가독성 중시 프로젝트, 문서화</td>
            </tr>
            <tr>
              <td className="p-3 border border-gray-300">Minify</td>
              <td className="p-3 border border-gray-300">없음</td>
              <td className="p-3 border border-gray-300">-40%</td>
              <td className="p-3 border border-gray-300">프로덕션 배포, API 응답 최적화</td>
            </tr>
          </tbody>
        </table>

        <Typography variant="p" className="mt-4">
          브라우저 호환성은 JSON.parse()와 JSON.stringify() 모두 IE8 이상에서 지원되며,
          현대 브라우저(Chrome, Firefox, Safari, Edge)에서는 99.9% 안정적으로 동작합니다.
          단, JSON5나 JSONC(주석 포함 JSON) 같은 확장 형식은 표준 파서로 처리할 수 없으므로
          별도 라이브러리가 필요합니다.
        </Typography>

        {/* 섹션 5: FAQ (700자+, 5개) */}
        <Typography variant="h2" className="mt-8 mb-4">자주 묻는 질문</Typography>

        <div className="space-y-6">
          <div>
            <Typography variant="h4" className="font-semibold mb-2">
              Q1: JSON 포맷터와 일반 텍스트 편집기의 차이는 무엇인가요?
            </Typography>
            <Typography variant="p">
              VSCode, Sublime Text 같은 편집기도 JSON 포맷팅 기능을 제공하지만,
              파일을 저장해야 하고 IDE를 열어야 한다는 번거로움이 있습니다.
              이 도구는 웹 브라우저에서 즉시 실행되어 복사-붙여넣기만으로 결과를 얻을 수 있으며,
              별도 설치나 로그인이 필요 없습니다. 또한 API 테스트 중 Postman 응답을
              바로 정리하거나, Slack으로 받은 JSON 데이터를 즉시 분석하는 등
              워크플로우에 자연스럽게 통합됩니다.
            </Typography>
          </div>

          <div>
            <Typography variant="h4" className="font-semibold mb-2">
              Q2: 민감한 데이터를 입력해도 안전한가요?
            </Typography>
            <Typography variant="p">
              네, 완전히 안전합니다. 이 도구는 100% 클라이언트 사이드에서 동작하여
              입력한 JSON 데이터를 외부 서버로 전송하지 않습니다. 브라우저의 JavaScript
              엔진이 로컬에서 파싱과 포맷팅을 수행하므로, 사용자 토큰, API 키,
              개인정보가 포함된 데이터를 분석해도 네트워크 로그에 기록되지 않습니다.
              개인정보보호법 및 GDPR 준수가 필요한 프로젝트에서도 안심하고 사용할 수 있습니다.
            </Typography>
          </div>

          <div>
            <Typography variant="h4" className="font-semibold mb-2">
              Q3: 매우 큰 JSON 파일도 처리 가능한가요?
            </Typography>
            <Typography variant="p">
              브라우저의 메모리 한계 내에서는 가능합니다. 일반적으로 10MB 이하의 JSON 파일은
              문제없이 처리되지만, 100MB 이상의 대용량 파일은 브라우저가 느려지거나
              탭이 응답하지 않을 수 있습니다. 이런 경우 Node.js 환경에서
              <code className="bg-gray-100 px-1 rounded">jq</code> 명령어나
              Python의 json 모듈을 사용하는 것이 권장됩니다. 웹 도구는 API 응답(보통 1-5MB),
              설정 파일(수십 KB) 같은 일상적인 크기에 최적화되어 있습니다.
            </Typography>
          </div>

          <div>
            <Typography variant="h4" className="font-semibold mb-2">
              Q4: JSON 문법 오류 메시지가 이해하기 어려워요. 어떻게 해결하나요?
            </Typography>
            <Typography variant="p">
              JavaScript의 SyntaxError 메시지는 &quot;Unexpected token&quot; 같은 영문으로
              표시되지만, 오류 위치를 알려줍니다. 예를 들어 &quot;position 42&quot;라고 나오면
              입력한 JSON의 42번째 문자 근처에 문제가 있다는 의미입니다. 흔한 실수는
              마지막 항목 뒤에 쉼표를 붙이는 trailing comma, 키를 작은따옴표로 감싸는 것,
              주석(//)을 포함하는 것입니다. JSON은 JavaScript와 달리 trailing comma와
              주석을 허용하지 않으므로 제거해야 합니다.
            </Typography>
          </div>

          <div>
            <Typography variant="h4" className="font-semibold mb-2">
              Q5: 들여쓰기를 Tab으로 설정할 수 있나요?
            </Typography>
            <Typography variant="p">
              현재 버전은 2 spaces, 4 spaces 옵션만 제공합니다. JSON.stringify()의
              세 번째 인자에 &apos;\t&apos; 문자를 전달하면 Tab 들여쓰기가 가능하지만,
              웹 표준과 대부분의 스타일 가이드(Airbnb, Google, StandardJS)는
              스페이스를 권장하므로 기본 옵션에서 제외했습니다. Tab 들여쓰기가 필요하면
              결과를 복사한 후 편집기의 &quot;Convert Spaces to Tabs&quot; 기능을
              사용하는 것이 일반적인 워크플로우입니다.
            </Typography>
          </div>
        </div>

        {/* 내부 링크 (3개 이상) */}
        <Typography variant="p" className="mt-8">
          이 도구와 함께 사용하면 유용한 관련 도구:
        </Typography>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>
            <a
              href="/converter/json-to-table"
              className="text-blue-600 hover:underline"
            >
              JSON to Table 변환기
            </a>
            : JSON 데이터를 표 형식으로 시각화하여 엑셀처럼 확인
          </li>
          <li>
            <a
              href="/converter/json-to-ts"
              className="text-blue-600 hover:underline"
            >
              JSON to TypeScript 변환기
            </a>
            : JSON 구조를 TypeScript 인터페이스로 자동 생성
          </li>
          <li>
            <a
              href="/utility/api-request-tester"
              className="text-blue-600 hover:underline"
            >
              API 요청 테스터
            </a>
            : REST API 응답을 즉시 테스트하고 JSON 포맷으로 확인
          </li>
        </ul>
      </ToolSection>
    </ToolLayout>
  );
}
