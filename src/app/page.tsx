import { TOOLS_REGISTRY } from "@/shared/config/tools-registry";
import { ToolGrid } from "@/features/tools/ui/tool-grid";
import { Tool } from "@/entities/content/model/types";
import { HeroSection } from "@/shared/ui/hero-section";
import { FeatureCard } from "@/shared/ui/feature-card";
import { StatsSection } from "@/shared/ui/stats-section";
import { CTASection } from "@/shared/ui/cta-section";
import { Button } from "@/shared/ui/button";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "바이브코딩 도구 모음 - 개발자를 위한 무료 온라인 도구",
  description: "프론트엔드 개발을 가속화하는 전문가급 온라인 도구 모음. 코드 스냅샷, Tailwind CSS 클래스 시각화 등 실무에 바로 적용 가능한 무료 도구를 제공합니다.",
  keywords: ["개발 도구", "프론트엔드", "바이브코딩", "온라인 도구", "무료 도구", "웹 개발", "코드 변환기", "개발자 유틸리티"],
};

export default function Home() {
  // Convert TOOLS_REGISTRY to the expected Tool[] format for ToolGrid
  const allTools: Tool[] = TOOLS_REGISTRY.map(reg => ({
    id: reg.slug,
    type: 'tool',
    title: reg.name,
    slug: reg.slug,
    description: reg.description,
    createdAt: new Date(),
    updatedAt: new Date(),
    published: true,
    category: reg.category,
    component: reg.slug,
    tags: reg.tags,
    author: reg.author,
    featured: false,
    usageCount: 0,
  }));

  // 통계 데이터
  const stats = [
    {
      value: TOOLS_REGISTRY.length,
      label: "무료 도구",
      description: "계속 추가 중"
    },
    {
      value: "100%",
      label: "무료",
      description: "영구 무료 제공"
    },
    {
      value: "24/7",
      label: "접근 가능",
      description: "언제든지 사용"
    },
    {
      value: "0초",
      label: "설치 시간",
      description: "바로 사용 가능"
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <HeroSection
        title={
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-orange-500">
            개발을 더 빠르게,
            <br />
            더 스마트하게
          </h1>
        }
        subtitle="바이브코딩 도구 모음은 개발자의 생산성을 극대화하는 무료 온라인 도구를 제공합니다. 복잡한 작업을 간단하게, 반복적인 작업을 자동화하세요."
        actions={
          <>
            <Link href="/tools">
              <Button size="lg" className="text-lg px-8">
                도구 둘러보기
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="text-lg px-8">
                더 알아보기
              </Button>
            </Link>
          </>
        }
      />

      {/* Stats Section */}
      <StatsSection
        stats={stats}
        title="신뢰할 수 있는 개발 도구"
        subtitle="전문 개발자들이 실무에서 사용하는 검증된 도구들"
      />

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              왜 바이브코딩 도구 모음인가요?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              개발자의 시간을 아껴주는 핵심 가치
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <FeatureCard
              icon={
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              }
              title="즉시 사용 가능"
              description="설치나 회원가입 없이 브라우저에서 바로 사용할 수 있습니다. 필요할 때 언제든지 접속하여 작업을 시작하세요."
            />

            <FeatureCard
              icon={
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              }
              title="개인정보 보호"
              description="모든 데이터는 브라우저 내에서만 처리됩니다. 서버로 전송되지 않아 완벽하게 안전합니다."
            />

            <FeatureCard
              icon={
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              }
              title="지속적인 업데이트"
              description="개발자 커뮤니티의 피드백을 반영하여 기능을 개선하고 새로운 도구를 추가합니다."
            />

            <FeatureCard
              icon={
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              }
              title="실무 중심 설계"
              description="실제 개발 현장에서 필요한 기능들만 엄선했습니다. 불필요한 복잡함 없이 효율적으로 작업하세요."
            />

            <FeatureCard
              icon={
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              }
              title="모바일 최적화"
              description="데스크톱, 태블릿, 모바일 등 모든 기기에서 완벽하게 작동합니다. 언제 어디서나 편리하게 사용하세요."
            />

            <FeatureCard
              icon={
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              title="영구 무료"
              description="모든 도구를 제한 없이 무료로 사용할 수 있습니다. 숨겨진 비용이나 프리미엄 요금제가 없습니다."
            />
          </div>
        </div>
      </section>

      {/* Tools Preview Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              인기 도구 둘러보기
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              개발자들이 가장 많이 사용하는 도구들
            </p>
          </div>

          <div className="max-w-7xl mx-auto">
            <ToolGrid tools={allTools.slice(0, 6)} />
          </div>

          <div className="text-center mt-12">
            <Link href="/tools">
              <Button size="lg" variant="outline" className="text-lg px-8">
                모든 도구 보기 →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        variant="gradient"
        title="지금 바로 시작하세요"
        description="회원가입이나 설치 없이 바로 사용할 수 있습니다. 개발 생산성을 높여보세요."
        actions={
          <Link href="/tools">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              무료로 시작하기
            </Button>
          </Link>
        }
      />
    </div>
  );
}
