import type { Metadata } from 'next';
import { ToolLayout, ToolSection } from '@/shared/ui/tool-layout';
import { Typography } from '@/shared/ui/typography';
import { config } from './tool.config';
import { Textarea } from '@/shared/ui/textarea';
import { Button } from '@/shared/ui/button';
import Link from 'next/link';

// ============================================
// SEO: Open Graph + JSON-LD 메타데이터
// ============================================
export async function generateMetadata(): Promise<Metadata> {
  const title = `${config.name} - ${config.description.split('.')[0]}`;
  const description = config.description;
  const url = `https://yourdomain.com/${config.category}/${config.slug}`;
  const ogImage = `https://yourdomain.com/og-images/${config.slug}.png`;

  return {
    title,
    description,
    keywords: config.tags.join(', '),
    openGraph: {
      type: 'website',
      url,
      title,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: config.name,
        },
      ],
      locale: 'ko_KR',
      siteName: 'V-Blog Developer Tools',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default function ToolTemplate() {
  // JSON-LD 구조화 데이터 (SoftwareApplication)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: config.name,
    description: config.description,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'KRW',
    },
    author: {
      '@type': 'Organization',
      name: config.author || 'V-Blog Team',
    },
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
        <Textarea placeholder="입력 데이터를 붙여넣으세요" className="h-48" />

        <div className="my-4" />

        <Textarea
          placeholder="결과가 여기에 표시됩니다"
          className="h-48"
          readOnly
        />

        <div className="flex justify-end mt-4">
          <Button>변환 실행</Button>
        </div>
      </ToolSection>

      {/* 광고 배치 공간 */}
      <div className="my-8" />

      {/* 2️⃣ 사용 방법 */}
      <ToolSection title="사용 방법">
        <Typography variant="p">
          이 도구는 [기능 설명]을 수행합니다. 아래 단계를 따라 사용하세요:
        </Typography>

        <ol className="list-decimal pl-6 space-y-2 mt-4">
          <li>
            <strong>입력:</strong> 상단 입력창에 [데이터 타입]을 붙여넣습니다
          </li>
          <li>
            <strong>실행:</strong> 변환 실행 버튼을 클릭합니다
          </li>
          <li>
            <strong>결과:</strong> 하단에 [결과 형식]이 실시간으로 표시됩니다
          </li>
          <li>
            <strong>복사:</strong> 결과를 클립보드에 복사하여 프로젝트에 사용합니다
          </li>
        </ol>
      </ToolSection>

      {/* 광고 배치 공간 */}
      <div className="my-8" />

      {/* 3️⃣ SEO 콘텐츠 영역 (최소 2,500자) */}
      <ToolSection title={`${config.name} 완벽 가이드`}>
        {/* 📌 1. 도입부 (400자+) */}
        <Typography variant="h2" className="mt-6 mb-4">
          {config.name}이란 무엇인가?
        </Typography>
        <Typography variant="p">
          [도구명]은 [대상 사용자]를 위한 [핵심 기능] 도구입니다. [기술
          스택/상황]에서 발생하는 [문제점 1], [문제점 2], [문제점 3]을 해결하기
          위해 설계되었습니다. 이 도구를 사용하면 [시간 절약 수치], [정확도
          향상], [생산성 증대] 효과를 얻을 수 있습니다.
        </Typography>
        <Typography variant="p" className="mt-4">
          [업계 표준/프레임워크]에서는 [관련 기술]이 필수적이며, 특히 [구체적
          상황]에서는 수동 작업으로 인한 휴먼 에러가 빈번합니다. [도구명]은
          [핵심 알고리즘/방식]을 기반으로 이 과정을 완전 자동화합니다.
        </Typography>

        {/* 📌 2. 주요 기능 (500자+) */}
        <Typography variant="h2" className="mt-8 mb-4">
          주요 기능
        </Typography>
        <ul className="list-disc pl-6 space-y-3">
          <li>
            <strong>기능 1:</strong> [구체적 설명 2-3문장]. 예를 들어 [실무
            예시]에서 [효과]를 볼 수 있습니다.
          </li>
          <li>
            <strong>기능 2:</strong> [구체적 설명 2-3문장]. [기술적 세부사항]을
            활용하여 [정확도/속도] 향상을 제공합니다.
          </li>
          <li>
            <strong>기능 3:</strong> [구체적 설명 2-3문장]. [표준/규약]을
            준수하며 [호환성/확장성]을 보장합니다.
          </li>
          <li>
            <strong>기능 4:</strong> [구체적 설명 2-3문장]. [사용자 경험] 관점에서
            [편의성 요소]를 강화했습니다.
          </li>
          <li>
            <strong>기능 5:</strong> [구체적 설명 2-3문장]. [성능 최적화/보안]
            측면에서 [구체적 이점]을 제공합니다.
          </li>
        </ul>

        {/* 📌 3. 실무 활용 시나리오 (600자+) */}
        <Typography variant="h2" className="mt-8 mb-4">
          실무에서 이렇게 활용하세요
        </Typography>

        <Typography variant="h3" className="mt-6 mb-3">
          시나리오 1: [상황명]
        </Typography>
        <Typography variant="p">
          [디자인 툴/백엔드/기획서] 등에서 [입력 형태]를 받을 때, 수동으로
          [작업명]하면 [문제점 1]과 [문제점 2]가 발생합니다. 이 도구를 사용하면
          [Before 예시] → [After 예시]로 즉시 변환되어 [시간 절약 수치]를 아낄
          수 있습니다.
        </Typography>

        <Typography variant="h3" className="mt-6 mb-3">
          시나리오 2: [상황명]
        </Typography>
        <Typography variant="p">
          [프로젝트 타입]에서 [기술 요구사항]을 구현할 때, [도구명]을 활용하면
          [구체적 이점]을 얻습니다. 특히 [복잡한 상황]에서도 [정확도/일관성]이
          보장됩니다.
        </Typography>

        <Typography variant="h3" className="mt-6 mb-3">
          시나리오 3: [상황명]
        </Typography>
        <Typography variant="p">
          [표준/가이드라인] 준수가 필요한 경우, 이 도구는 [규격명]에 따라
          자동으로 [검증/변환]을 수행합니다. [인증/감사] 과정에서도 [신뢰성]을
          입증할 수 있습니다.
        </Typography>

        {/* 📌 4. 기술적 배경 (700자+ & 표 필수) */}
        <Typography variant="h2" className="mt-8 mb-4">
          [기술명]의 원리와 작동 방식
        </Typography>
        <Typography variant="p">
          [기술명]은 [년도/버전]에 [기관/단체]에서 제정한 [표준명]을 기반으로
          합니다. 이 기술의 핵심 원리는 [작동 원리 설명]이며, [계산 공식 또는
          알고리즘]을 통해 [결과물]을 생성합니다.
        </Typography>
        <Typography variant="p" className="mt-4">
          MDN 문서에 따르면, [브라우저 호환성]은 [지원율 수치]에 달하며,
          [최신 버전] 이상의 환경에서 안정적으로 작동합니다. 단, [제약사항]에서는
          [한계/주의사항]을 고려해야 합니다.
        </Typography>

        {/* 비교 표 (필수) */}
        <table className="w-full mt-6 border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border border-gray-300 text-left">항목</th>
              <th className="p-3 border border-gray-300 text-left">설명</th>
              <th className="p-3 border border-gray-300 text-left">실무 적용</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-3 border border-gray-300">
                <strong>[항목1]</strong>
              </td>
              <td className="p-3 border border-gray-300">[설명]</td>
              <td className="p-3 border border-gray-300">[활용 예시]</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="p-3 border border-gray-300">
                <strong>[항목2]</strong>
              </td>
              <td className="p-3 border border-gray-300">[설명]</td>
              <td className="p-3 border border-gray-300">[활용 예시]</td>
            </tr>
            <tr>
              <td className="p-3 border border-gray-300">
                <strong>[항목3]</strong>
              </td>
              <td className="p-3 border border-gray-300">[설명]</td>
              <td className="p-3 border border-gray-300">[활용 예시]</td>
            </tr>
          </tbody>
        </table>

        <Typography variant="p" className="mt-4">
          위 표에서 보듯이, [항목1]과 [항목2]의 차이는 [핵심 차이점]에 있으며,
          실무에서는 [선택 기준]에 따라 적절한 옵션을 선택해야 합니다.
        </Typography>

        {/* 📌 5. FAQ (700자+ & 최소 5개) */}
        <Typography variant="h2" className="mt-8 mb-4">
          자주 묻는 질문
        </Typography>

        <div className="space-y-6">
          <div>
            <Typography variant="h4" className="font-semibold mb-2">
              Q1: [실제 사용자가 궁금해할 구체적 질문]
            </Typography>
            <Typography variant="p">
              A: [전문적이고 상세한 답변 3-4문장]. 예를 들어 [구체적 예시]에서는
              [해결 방법]을 적용할 수 있습니다. [추가 팁이나 주의사항]도
              고려하세요.
            </Typography>
          </div>

          <div>
            <Typography variant="h4" className="font-semibold mb-2">
              Q2: [실제 사용자가 궁금해할 구체적 질문]
            </Typography>
            <Typography variant="p">
              A: [전문적이고 상세한 답변 3-4문장]. [기술적 근거]에 따르면
              [설명]이며, 이는 [표준/규격]에서도 권장하는 방식입니다.
            </Typography>
          </div>

          <div>
            <Typography variant="h4" className="font-semibold mb-2">
              Q3: [실제 사용자가 궁금해할 구체적 질문]
            </Typography>
            <Typography variant="p">
              A: [전문적이고 상세한 답변 3-4문장]. [호환성/성능] 측면에서
              [구체적 수치]를 보장하며, [예외 상황]에서는 [대응 방안]을
              권장합니다.
            </Typography>
          </div>

          <div>
            <Typography variant="h4" className="font-semibold mb-2">
              Q4: [실제 사용자가 궁금해할 구체적 질문]
            </Typography>
            <Typography variant="p">
              A: [전문적이고 상세한 답변 3-4문장]. [도구명]은 [한계]가 있으므로,
              [대용량/특수 케이스]에서는 [대안 도구/방법]을 고려하는 것이
              좋습니다.
            </Typography>
          </div>

          <div>
            <Typography variant="h4" className="font-semibold mb-2">
              Q5: [실제 사용자가 궁금해할 구체적 질문]
            </Typography>
            <Typography variant="p">
              A: [전문적이고 상세한 답변 3-4문장]. [에러 메시지]가 표시되면
              [원인]을 확인하고 [해결 단계]를 따라 수정할 수 있습니다.
            </Typography>
          </div>

          <div>
            <Typography variant="h4" className="font-semibold mb-2">
              Q6: [실제 사용자가 궁금해할 구체적 질문]
            </Typography>
            <Typography variant="p">
              A: [전문적이고 상세한 답변 3-4문장]. [보안/개인정보] 측면에서
              [처리 방식]을 보장하며, 모든 데이터는 [처리 위치/방식]에서만
              사용됩니다.
            </Typography>
          </div>

          <div>
            <Typography variant="h4" className="font-semibold mb-2">
              Q7: [실제 사용자가 궁금해할 구체적 질문]
            </Typography>
            <Typography variant="p">
              A: [전문적이고 상세한 답변 3-4문장]. [추가 기능 요청]이 있다면
              [피드백 방법]을 통해 제안할 수 있으며, [로드맵]에 반영될 예정입니다.
            </Typography>
          </div>
        </div>

        {/* 내부 링크 (최소 3개 필수) */}
        <Typography variant="p" className="mt-8">
          이 도구와 함께{' '}
          <Link
            href="/converter/json-to-table"
            className="text-blue-600 hover:underline"
          >
            JSON to Table 변환기
          </Link>
          와{' '}
          <Link
            href="/formatter/markdown-editor"
            className="text-blue-600 hover:underline"
          >
            Markdown 에디터
          </Link>
          를 활용하면 더욱 효율적인 개발 워크플로우를 구축할 수 있습니다. 또한{' '}
          <Link href="/utility/vibe-token-slimmer" className="text-blue-600 hover:underline">
            AI 토큰 최적화 도구
          </Link>
          에서 추가 최적화 기법을 확인하세요.
        </Typography>
      </ToolSection>
    </ToolLayout>
  );
}