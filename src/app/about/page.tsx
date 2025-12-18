import { Metadata } from "next";
import { Target, Users, Zap, Shield, Code2, Rocket } from "lucide-react";
import Link from "next/link";
import { Button } from "@/shared/ui/button";

export const metadata: Metadata = {
  title: "소개 - 바이브코딩이 만드는 개발 도구 생태계",
  description: "바이브코딩 도구 모음은 개발자의 생산성을 극대화하는 무료 온라인 도구 플랫폼입니다. 실무 중심의 도구로 개발 워크플로우를 최적화하세요.",
  openGraph: {
    title: "소개 - 바이브코딩 도구 모음",
    description: "개발자의 생산성을 극대화하는 무료 온라인 도구 플랫폼",
  },
};

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-orange-50 dark:from-blue-950/20 dark:via-background dark:to-orange-950/20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1
            className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-orange-500"
            style={{
              wordBreak: 'keep-all',
              whiteSpace: 'normal',
              writingMode: 'horizontal-tb',
              display: 'block',
              width: '100%',
              minWidth: '300px'
            }}
          >
            개발자를 위한 도구,
            <br />
            바이브코딩이 만듭니다
          </h1>
          <div className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            복잡한 작업을 간단하게, 반복적인 작업을 자동화하여 개발자의 생산성을 극대화합니다.
            바이브코딩 도구 모음은 실무에서 검증된 무료 온라인 도구를 제공합니다.
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Mission Section */}
        <section className="mb-16">
          <h2
            className="text-3xl font-bold mb-6"
            style={{
              wordBreak: 'keep-all',
              whiteSpace: 'normal',
              writingMode: 'horizontal-tb',
              display: 'block',
              width: '100%',
              minWidth: '300px'
            }}
          >
            우리의 미션
          </h2>
          <div className="text-lg text-muted-foreground leading-relaxed mb-6">
            바이브코딩 도구 모음은 개발자의 시간을 가장 가치있게 만드는 것을 목표로 합니다.
            프론트엔드 개발자들이 일상적으로 마주하는 반복 작업과 번거로운 변환 과정을
            빠르고 간편하게 처리할 수 있도록 돕습니다.
          </div>
          <div className="text-lg text-muted-foreground leading-relaxed">
            복잡한 설치나 회원가입 없이, 브라우저만 있으면 누구나 사용할 수 있는 실용적인
            도구들을 무료로 제공합니다. 모든 도구는 실제 개발 현장에서 필요성이 검증된
            기능들로 구성되어 있으며, 직관적인 UI와 명확한 설명을 통해 학습 곡선 없이
            바로 사용할 수 있습니다.
          </div>
        </section>

        {/* Core Values */}
        <section className="mb-16">
          <h2
            className="text-3xl font-bold mb-8 text-center"
            style={{
              wordBreak: 'keep-all',
              whiteSpace: 'normal',
              writingMode: 'horizontal-tb',
              display: 'block',
              width: '100%',
              minWidth: '300px'
            }}
          >
            핵심 가치
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="p-6 border-2 rounded-lg hover:shadow-lg transition-all hover:-translate-y-1">
              <Target className="w-12 h-12 text-blue-600 mb-4" />
              <h3
                className="text-xl font-semibold mb-3"
                style={{
                  wordBreak: 'keep-all',
                  whiteSpace: 'normal',
                  writingMode: 'horizontal-tb',
                  display: 'block',
                  width: '100%',
                  minWidth: '200px'
                }}
              >
                목표 지향적
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                실제 개발 현장에서 필요한 도구에 집중합니다.
                화려함보다는 실용성을 우선시하며, 개발자가 진짜 필요로 하는 기능만 제공합니다.
              </p>
            </div>

            <div className="p-6 border-2 rounded-lg hover:shadow-lg transition-all hover:-translate-y-1">
              <Zap className="w-12 h-12 text-yellow-600 mb-4" />
              <h3
                className="text-xl font-semibold mb-3"
                style={{
                  wordBreak: 'keep-all',
                  whiteSpace: 'normal',
                  writingMode: 'horizontal-tb',
                  display: 'block',
                  width: '100%',
                  minWidth: '200px'
                }}
              >
                빠른 실행
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                모든 도구는 브라우저에서 즉시 실행됩니다.
                별도의 설치나 서버 통신 없이 클라이언트 사이드에서 빠르게 작동하여
                작업 흐름을 끊지 않습니다.
              </p>
            </div>

            <div className="p-6 border-2 rounded-lg hover:shadow-lg transition-all hover:-translate-y-1">
              <Shield className="w-12 h-12 text-green-600 mb-4" />
              <h3
                className="text-xl font-semibold mb-3"
                style={{
                  wordBreak: 'keep-all',
                  whiteSpace: 'normal',
                  writingMode: 'horizontal-tb',
                  display: 'block',
                  width: '100%',
                  minWidth: '200px'
                }}
              >
                데이터 안전
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                입력하신 데이터는 절대 서버로 전송되지 않습니다.
                모든 처리는 사용자의 브라우저에서만 이루어지며, 개인정보 보호를 최우선으로 합니다.
              </p>
            </div>

            <div className="p-6 border-2 rounded-lg hover:shadow-lg transition-all hover:-translate-y-1">
              <Users className="w-12 h-12 text-purple-600 mb-4" />
              <h3
                className="text-xl font-semibold mb-3"
                style={{
                  wordBreak: 'keep-all',
                  whiteSpace: 'normal',
                  writingMode: 'horizontal-tb',
                  display: 'block',
                  width: '100%',
                  minWidth: '200px'
                }}
              >
                커뮤니티 중심
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                개발자 커뮤니티의 피드백을 기반으로 지속적으로
                새로운 도구를 추가하고 개선합니다. 함께 만들어가는 플랫폼입니다.
              </p>
            </div>

            <div className="p-6 border-2 rounded-lg hover:shadow-lg transition-all hover:-translate-y-1">
              <Code2 className="w-12 h-12 text-indigo-600 mb-4" />
              <h3
                className="text-xl font-semibold mb-3"
                style={{
                  wordBreak: 'keep-all',
                  whiteSpace: 'normal',
                  writingMode: 'horizontal-tb',
                  display: 'block',
                  width: '100%',
                  minWidth: '200px'
                }}
              >
                오픈소스 정신
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                개발 과정과 코드를 투명하게 공개하여 누구나 학습하고 기여할 수 있도록 합니다.
                오픈소스 생태계에 가치를 환원합니다.
              </p>
            </div>

            <div className="p-6 border-2 rounded-lg hover:shadow-lg transition-all hover:-translate-y-1">
              <Rocket className="w-12 h-12 text-orange-600 mb-4" />
              <h3
                className="text-xl font-semibold mb-3"
                style={{
                  wordBreak: 'keep-all',
                  whiteSpace: 'normal',
                  writingMode: 'horizontal-tb',
                  display: 'block',
                  width: '100%',
                  minWidth: '200px'
                }}
              >
                지속적인 발전
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                최신 웹 기술을 적극 도입하여 성능과 사용자 경험을 지속적으로 개선합니다.
                멈추지 않고 계속 발전하는 플랫폼입니다.
              </p>
            </div>
          </div>
        </section>

        {/* Why Section */}
        <section className="mb-16 bg-muted/30 p-8 rounded-lg">
          <h2
            className="text-3xl font-bold mb-6"
            style={{
              wordBreak: 'keep-all',
              whiteSpace: 'normal',
              writingMode: 'horizontal-tb',
              display: 'block',
              width: '100%',
              minWidth: '300px'
            }}
          >
            왜 바이브코딩 도구 모음인가?
          </h2>
          <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
            <p>
              개발 과정에서 우리는 종종 간단한 작업들을 위해 작업 흐름을 멈춰야 합니다.
              코드 스냅샷 생성, Tailwind CSS 클래스 시각화, 색상 코드 변환, JSON 포맷팅,
              Base64 인코딩 등 - 이런 작업들을 위해 매번 다른 사이트를 검색하고
              찾아다니는 것은 시간 낭비입니다.
            </p>
            <p>
              바이브코딩 도구 모음은 이런 도구들을 한곳에 모아 개발자들의 시간을 절약하고,
              작업 흐름을 끊지 않도록 돕습니다. 북마크 하나면 언제든지 필요한 도구에
              즉시 접근할 수 있습니다.
            </p>
            <p>
              모든 도구는 직관적인 UI, 명확한 설명, 풍부한 옵션을 제공하여
              초보자도 쉽게 사용할 수 있으면서도, 전문가의 섬세한 요구사항도 충족시킵니다.
            </p>
          </div>
        </section>

        {/* Tools Categories */}
        <section className="mb-16">
          <h2
            className="text-3xl font-bold mb-8 text-center"
            style={{
              wordBreak: 'keep-all',
              whiteSpace: 'normal',
              writingMode: 'horizontal-tb',
              display: 'block',
              width: '100%',
              minWidth: '300px'
            }}
          >
            제공하는 도구 카테고리
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="p-6 border-l-4 border-blue-500 bg-blue-50/50 dark:bg-blue-950/20 rounded-r-lg">
              <h3
                className="text-xl font-semibold mb-3"
                style={{
                  wordBreak: 'keep-all',
                  whiteSpace: 'normal',
                  writingMode: 'horizontal-tb',
                  display: 'block',
                  width: '100%',
                  minWidth: '200px'
                }}
              >
                변환 도구 (Converters)
              </h3>
              <p className="text-muted-foreground mb-3">
                다양한 형식 간의 변환을 지원합니다. 단위, 색상, 인코딩, 데이터 포맷 등
                개발 과정에서 자주 필요한 변환 작업을 간편하게 처리합니다.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>PX ↔ REM 변환기</li>
                <li>색상 코드 변환 (HEX, RGB, HSL)</li>
                <li>Base64 인코더/디코더</li>
              </ul>
            </div>

            <div className="p-6 border-l-4 border-green-500 bg-green-50/50 dark:bg-green-950/20 rounded-r-lg">
              <h3
                className="text-xl font-semibold mb-3"
                style={{
                  wordBreak: 'keep-all',
                  whiteSpace: 'normal',
                  writingMode: 'horizontal-tb',
                  display: 'block',
                  width: '100%',
                  minWidth: '200px'
                }}
              >
                생성 도구 (Generators)
              </h3>
              <p className="text-muted-foreground mb-3">
                개발에 필요한 다양한 데이터와 리소스를 자동으로 생성합니다.
                테스트 데이터부터 프로덕션 에셋까지 빠르게 만들 수 있습니다.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>코드 스냅샷 생성기</li>
                <li>UUID 생성기</li>
                <li>QR 코드 생성기</li>
              </ul>
            </div>

            <div className="p-6 border-l-4 border-purple-500 bg-purple-50/50 dark:bg-purple-950/20 rounded-r-lg">
              <h3
                className="text-xl font-semibold mb-3"
                style={{
                  wordBreak: 'keep-all',
                  whiteSpace: 'normal',
                  writingMode: 'horizontal-tb',
                  display: 'block',
                  width: '100%',
                  minWidth: '200px'
                }}
              >
                포맷팅 도구 (Formatters)
              </h3>
              <p className="text-muted-foreground mb-3">
                코드와 데이터를 읽기 쉽게 정리하고, 검증하고, 최적화합니다.
                협업 시 코드 일관성을 유지하는 데 필수적인 도구들입니다.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>JSON/XML 포맷터</li>
                <li>CSS/JavaScript 압축기</li>
                <li>Markdown 프리뷰</li>
              </ul>
            </div>

            <div className="p-6 border-l-4 border-orange-500 bg-orange-50/50 dark:bg-orange-950/20 rounded-r-lg">
              <h3
                className="text-xl font-semibold mb-3"
                style={{
                  wordBreak: 'keep-all',
                  whiteSpace: 'normal',
                  writingMode: 'horizontal-tb',
                  display: 'block',
                  width: '100%',
                  minWidth: '200px'
                }}
              >
                유틸리티 (Utilities)
              </h3>
              <p className="text-muted-foreground mb-3">
                개발 과정에서 유용하게 쓰이는 다목적 도구들입니다.
                디버깅부터 최적화까지 다양한 상황에서 활용할 수 있습니다.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Tailwind CSS 클래스 시각화</li>
                <li>정규식 테스터</li>
                <li>텍스트 비교 도구</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Technical Info */}
        <section className="mb-16 bg-gradient-to-r from-blue-50 to-orange-50 dark:from-blue-950/20 dark:to-orange-950/20 p-8 rounded-lg">
          <h2
            className="text-3xl font-bold mb-6"
            style={{
              wordBreak: 'keep-all',
              whiteSpace: 'normal',
              writingMode: 'horizontal-tb',
              display: 'block',
              width: '100%',
              minWidth: '300px'
            }}
          >
            기술 스택 & 운영 정보
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3
                className="text-xl font-semibold mb-4"
                style={{
                  wordBreak: 'keep-all',
                  whiteSpace: 'normal',
                  writingMode: 'horizontal-tb',
                  display: 'block',
                  width: '100%',
                  minWidth: '200px'
                }}
              >
                사용 기술
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><strong>프레임워크:</strong> Next.js 15 (App Router)</li>
                <li><strong>언어:</strong> TypeScript</li>
                <li><strong>스타일링:</strong> Tailwind CSS</li>
                <li><strong>배포:</strong> Vercel</li>
                <li><strong>특징:</strong> 서버리스, 클라이언트 사이드 처리</li>
              </ul>
            </div>
            <div>
              <h3
                className="text-xl font-semibold mb-4"
                style={{
                  wordBreak: 'keep-all',
                  whiteSpace: 'normal',
                  writingMode: 'horizontal-tb',
                  display: 'block',
                  width: '100%',
                  minWidth: '200px'
                }}
              >
                운영 원칙
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><strong>시작일:</strong> 2025년 12월</li>
                <li><strong>비용:</strong> 100% 무료, 광고 없음</li>
                <li><strong>데이터:</strong> 서버 전송 없음, 프라이버시 최우선</li>
                <li><strong>접근성:</strong> WCAG 2.1 AA 준수</li>
                <li><strong>목표:</strong> 개발자 커뮤니티에 실질적인 가치 제공</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <h2
            className="text-3xl font-bold mb-6 text-center"
            style={{
              wordBreak: 'keep-all',
              whiteSpace: 'normal',
              writingMode: 'horizontal-tb',
              display: 'block',
              width: '100%',
              minWidth: '300px'
            }}
          >
            누가 만드나요?
          </h2>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              바이브코딩 도구 모음은 실무 프론트엔드 개발자들이 직접 겪은 불편함을 해결하기 위해
              시작되었습니다. 현업에서 일하며 느낀 "이런 도구가 있으면 좋겠다"는 생각을
              직접 구현하여 커뮤니티와 공유합니다.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              우리는 코드의 품질, 사용자 경험, 성능을 타협하지 않으며,
              개발자가 개발자를 위해 만드는 진정성 있는 도구를 지향합니다.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-to-r from-blue-600 to-orange-500 text-white p-12 rounded-lg">
          <h2
            className="text-3xl font-bold mb-4"
            style={{
              wordBreak: 'keep-all',
              whiteSpace: 'normal',
              writingMode: 'horizontal-tb',
              display: 'block',
              width: '100%',
              minWidth: '300px'
            }}
          >
            함께 만들어가요
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            바이브코딩 도구 모음은 개발자 커뮤니티의 피드백으로 성장합니다.
            새로운 도구 제안, 버그 리포트, 개선 아이디어 등 어떤 의견이든 환영합니다.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/contact">
              <Button size="lg" variant="secondary" className="text-lg">
                문의하기
              </Button>
            </Link>
            <Link href="/tools">
              <Button size="lg" variant="outline" className="text-lg bg-white/10 hover:bg-white/20 border-white text-white">
                도구 둘러보기
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
