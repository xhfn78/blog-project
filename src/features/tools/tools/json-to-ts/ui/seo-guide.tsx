'use client';

import React from "react";
import { Typography } from "@/shared/ui/typography";
import Link from 'next/link';

export function SeoGuide() {
  return (
    <section className="bg-slate-950 rounded-2xl p-8 border border-slate-800 shadow-2xl overflow-hidden mt-12">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* 도입부 */}
        <div className="space-y-6">
          <Typography variant="h2" className="text-3xl font-extrabold text-slate-100">
            JSON to TypeScript 변환 완벽 가이드: 현대적 웹 개발의 필수 전략
          </Typography>
          <Typography variant="p" className="text-lg text-slate-300">
            현대 프론트엔드 개발 환경에서 TypeScript는 선택이 아닌 필수입니다. 하지만 백엔드 API로부터 전달받는 방대한 JSON 데이터의 타입을 수동으로 작성하는 과정은 반복적이고 오류가 발생하기 쉬운 작업입니다. JSON to TypeScript 변환기는 이러한 비효율성을 해결하기 위해 설계된 전문 도구입니다.
          </Typography>
          <Typography variant="p" className="text-lg text-slate-300">
            이 도구는 단순한 텍스트 변환을 넘어, JSON의 계층 구조를 심층적으로 분석합니다. 복잡한 중첩 객체(Nested Objects)와 배열 타입을 자동으로 추론하여 최적화된 인터페이스를 구성하며, 특히 React나 Next.js 프로젝트에서 API 응답값에 대한 안정적인 타입 가드를 구축하는 데 핵심적인 역할을 합니다.
          </Typography>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />

        {/* 주요 기능 */}
        <div className="space-y-6">
          <Typography variant="h3" className="text-2xl font-bold text-slate-100">
            이 도구가 제공하는 차별화된 기능
          </Typography>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
              <h4 className="text-lg font-semibold text-emerald-300 mb-2">⚡ 실시간 스키마 추론 엔진</h4>
              <p className="text-slate-400 text-sm">JSON 데이터를 입력하는 즉시 타입을 생성합니다. 데이터의 변화에 따른 타입의 변경 사항을 즉각적으로 확인할 수 있습니다.</p>
            </div>
            <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
              <h4 className="text-lg font-semibold text-emerald-300 mb-2">🛡️ Zod 스키마 자동 생성</h4>
              <p className="text-slate-400 text-sm">런타임 검증을 위한 Zod 스키마 생성을 지원하여 외부 데이터로부터 안전하게 애플리케이션을 보호합니다.</p>
            </div>
            <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
              <h4 className="text-lg font-semibold text-emerald-300 mb-2">🧩 지능적 네이밍 및 구조화</h4>
              <p className="text-slate-400 text-sm">루트 객체부터 깊은 계층까지 일관된 명명 규칙을 적용하며, 배열 내부 객체는 자동으로 분리합니다.</p>
            </div>
            <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
              <h4 className="text-lg font-semibold text-emerald-300 mb-2">👀 가독성 최적화</h4>
              <p className="text-slate-400 text-sm">TypeScript 최신 문법을 준수하며, 가독성 좋은 코드 정렬로 별도 포맷팅 없이 바로 사용할 수 있습니다.</p>
            </div>
          </div>
        </div>

        {/* 실무 사용 시나리오 */}
        <div className="space-y-6">
          <Typography variant="h3" className="text-2xl font-bold text-slate-100">
            실무에서 이렇게 사용하세요
          </Typography>
          <div className="space-y-4">
            <div>
              <Typography variant="h4" className="font-semibold text-slate-100 mb-1">1. 대규모 API 통합 및 데이터 매핑</Typography>
              <Typography variant="p" className="text-slate-400">
                수십 개의 필드를 가진 백엔드 API 응답을 처음 연동할 때, Postman 등으로 받은 JSON을 그대로 복사하여 이 도구에 넣으세요. 단 1초 만에 완벽한 TypeScript Interface가 완성됩니다.
              </Typography>
            </div>
            <div>
              <Typography variant="h4" className="font-semibold text-slate-100 mb-1">2. Zod를 활용한 런타임 데이터 검증</Typography>
              <Typography variant="p" className="text-slate-400">
                Next.js의 Server Actions나 API Routes에서 외부 데이터를 받을 때, 생성된 Zod 스키마를 활용하세요. 정적 타입(Interface)과 동적 검증(Zod)의 조화는 견고한 애플리케이션의 기반이 됩니다.
              </Typography>
            </div>
          </div>
        </div>

        {/* 기술적 배경 */}
        <div className="space-y-6">
          <Typography variant="h3" className="text-2xl font-bold text-slate-100">
            TypeScript Interface vs Zod: 왜 두 가지가 모두 필요한가?
          </Typography>
          
          <div className="overflow-hidden rounded-xl border border-slate-800">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900 text-slate-100">
                  <th className="p-4 border-b border-slate-800 font-semibold">비교 항목</th>
                  <th className="p-4 border-b border-slate-800 font-semibold">TypeScript Interface</th>
                  <th className="p-4 border-b border-slate-800 font-semibold text-emerald-400">Zod Schema</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-slate-950">
                <tr>
                  <td className="p-4 text-slate-300 font-medium">적용 시점</td>
                  <td className="p-4 text-slate-400 text-sm">컴파일 타임 (Compile-time)</td>
                  <td className="p-4 text-emerald-300 font-bold">런타임 (Run-time)</td>
                </tr>
                <tr>
                  <td className="p-4 text-slate-300 font-medium">데이터 검증</td>
                  <td className="p-4 text-slate-400 text-sm">불가능 (타입 힌트만 제공)</td>
                  <td className="p-4 text-emerald-300 font-bold">가능 (실제 값 유효성 체크)</td>
                </tr>
                <tr>
                  <td className="p-4 text-slate-300 font-medium">번들 크기 영향</td>
                  <td className="p-4 text-slate-400 text-sm">없음 (트랜스파일 후 소멸)</td>
                  <td className="p-4 text-emerald-300 font-bold">있음 (라이브러리 포함)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <Typography variant="p" className="text-slate-300 mt-4">
            이 도구는 두 가지 형식을 모두 지원함으로써, 개발자가 상황에 맞는 최적의 도구를 선택할 수 있게 합니다. 내부 링크인 
            <Link href="/converter/json-to-table" className="text-emerald-400 hover:underline mx-1 font-semibold">JSON to Table</Link>
            도구와 함께 사용하면 데이터를 시각적으로 확인하면서 동시에 견고한 타입 시스템을 구축할 수 있어 더욱 효과적입니다.
          </Typography>
        </div>

        {/* FAQ */}
        <div className="space-y-6">
          <Typography variant="h3" className="text-2xl font-bold text-slate-100">
            자주 묻는 질문 (FAQ)
          </Typography>
          <div className="space-y-4">
            <div className="bg-slate-900/30 p-5 rounded-lg border border-slate-800">
              <h4 className="text-lg font-semibold text-slate-100 mb-2">Q1: 대용량 JSON 파일을 변환할 때 성능 문제가 없나요?</h4>
              <p className="text-slate-400">A: 본 도구는 브라우저 사이드에서 효율적인 재귀 알고리즘을 사용하여 수천 줄의 JSON도 수 밀리초 내에 변환합니다. 다만, 수십 MB 단위의 파일은 적절한 샘플만 추출하여 변환하는 것을 권장합니다.</p>
            </div>
            <div className="bg-slate-900/30 p-5 rounded-lg border border-slate-800">
              <h4 className="text-lg font-semibold text-slate-100 mb-2">Q2: 비어 있는 배열([])은 어떻게 처리되나요?</h4>
              <p className="text-slate-400">A: JSON 데이터 내의 빈 배열은 구체적인 타입을 추론할 근거가 부족하기 때문에 기본적으로 <code>any[]</code>로 처리됩니다. 정확한 타입을 얻으려면 최소 하나 이상의 데이터가 포함된 샘플을 입력하세요.</p>
            </div>
            <div className="bg-slate-900/30 p-5 rounded-lg border border-slate-800">
              <h4 className="text-lg font-semibold text-slate-100 mb-2">Q3: 중첩된 객체의 이름이 중복되면 어떻게 하나요?</h4>
              <p className="text-slate-400">A: 변환 엔진은 계층 구조에 따라 유니크한 이름을 부여하려고 시도합니다. 만약 동일한 필드명이 반복된다면, 생성된 코드에서 수동으로 인터페이스 이름을 리팩토링하는 것이 좋습니다.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
