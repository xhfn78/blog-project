import { Metadata } from "next";
import { Target, Users, Zap, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "소개",
  description: "Dev Toolbox는 개발자의 생산성을 높이는 무료 웹 도구 플랫폼입니다.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-4">Dev Toolbox 소개</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-12">
        개발자의 생산성을 높이는 실용적인 웹 도구를 한곳에서
      </p>

      <div className="prose dark:prose-invert max-w-none space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">우리의 미션</h2>
          <p className="text-gray-700 dark:text-gray-300">
            Dev Toolbox는 프론트엔드 개발자들이 일상적으로 마주하는 반복 작업을
            빠르고 간편하게 처리할 수 있도록 돕습니다. 복잡한 설치나 회원가입 없이,
            브라우저만 있으면 누구나 사용할 수 있는 실용적인 도구들을 제공합니다.
          </p>
        </section>

        <div className="grid gap-6 md:grid-cols-2 not-prose my-12">
          <div className="p-6 border rounded-lg bg-white dark:bg-zinc-900">
            <Target className="w-8 h-8 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">목표 지향적</h3>
            <p className="text-gray-600 dark:text-gray-400">
              실제 개발 현장에서 필요한 도구에 집중합니다.
              화려함보다는 실용성을 우선시합니다.
            </p>
          </div>

          <div className="p-6 border rounded-lg bg-white dark:bg-zinc-900">
            <Zap className="w-8 h-8 text-yellow-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">빠른 실행</h3>
            <p className="text-gray-600 dark:text-gray-400">
              모든 도구는 브라우저에서 즉시 실행됩니다.
              별도의 설치나 서버 통신 없이 빠르게 작동합니다.
            </p>
          </div>

          <div className="p-6 border rounded-lg bg-white dark:bg-zinc-900">
            <Shield className="w-8 h-8 text-green-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">데이터 안전</h3>
            <p className="text-gray-600 dark:text-gray-400">
              입력하신 데이터는 절대 서버로 전송되지 않습니다.
              모든 처리는 여러분의 브라우저에서만 이루어집니다.
            </p>
          </div>

          <div className="p-6 border rounded-lg bg-white dark:bg-zinc-900">
            <Users className="w-8 h-8 text-purple-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">커뮤니티 중심</h3>
            <p className="text-gray-600 dark:text-gray-400">
              개발자들의 피드백을 기반으로 지속적으로
              새로운 도구를 추가하고 개선합니다.
            </p>
          </div>
        </div>

        <section>
          <h2 className="text-2xl font-semibold mb-4">왜 Dev Toolbox인가?</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            개발 과정에서 종종 마주하는 간단한 작업들 - 색상 코드 변환,
            JSON 포맷팅, Base64 인코딩 등 - 을 위해 매번 다른 사이트를
            검색하고 찾아다니는 것은 비효율적입니다.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            Dev Toolbox는 이런 도구들을 한곳에 모아 개발자들의 시간을 절약하고,
            작업 흐름을 끊지 않도록 돕습니다. 모든 도구는 직관적인 UI와
            명확한 설명을 통해 누구나 쉽게 사용할 수 있도록 설계되었습니다.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">제공하는 도구</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950">
              <h4 className="font-semibold mb-2">변환 도구 (Converters)</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                단위, 색상, 인코딩 등 다양한 형식 간 변환
              </p>
            </div>
            <div className="p-4 border-l-4 border-green-500 bg-green-50 dark:bg-green-950">
              <h4 className="font-semibold mb-2">생성 도구 (Generators)</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                더미 데이터, UUID, QR 코드 등 자동 생성
              </p>
            </div>
            <div className="p-4 border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-950">
              <h4 className="font-semibold mb-2">포맷팅 도구 (Formatters)</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                코드 정리, 압축, 검증 및 포맷팅
              </p>
            </div>
            <div className="p-4 border-l-4 border-orange-500 bg-orange-50 dark:bg-orange-950">
              <h4 className="font-semibold mb-2">유틸리티 (Utilities)</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                정규식 테스트, 코드 비교, 이미지 최적화
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">운영 정보</h2>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li><strong>시작일:</strong> 2025년 12월</li>
            <li><strong>플랫폼:</strong> Next.js 15 + TypeScript</li>
            <li><strong>특징:</strong> 서버리스, 프라이버시 우선, 오픈소스 지향</li>
            <li><strong>목표:</strong> 개발자 커뮤니티에 실질적인 가치 제공</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">함께 만들어가요</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Dev Toolbox는 개발자 커뮤니티의 피드백을 바탕으로 성장합니다.
            새로운 도구 제안, 버그 리포트, 개선 아이디어 등
            어떤 의견이든 환영합니다.
          </p>
          <a
            href="/contact"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            문의하기
          </a>
        </section>
      </div>
    </div>
  );
}
