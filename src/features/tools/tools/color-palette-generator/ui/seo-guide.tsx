'use client';

import React from "react";
import { Typography } from "@/shared/ui/typography";
import Link from 'next/link';

export function SeoGuide() {
  return (
    <section className="bg-slate-950 rounded-2xl p-8 border border-slate-800 shadow-2xl overflow-hidden">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Hero Section */}
        <div className="space-y-6 text-center lg:text-left">
          <Typography variant="h2" className="text-3xl md:text-4xl font-extrabold text-slate-100 tracking-tight">
            Tailwind CSS 컬러 팔레트 생성기 완벽 가이드
          </Typography>
          <Typography variant="p" className="text-lg text-slate-300 leading-relaxed">
            현대 웹 디자인에서 일관된 색상 시스템(Design System)을 구축하는 것은 선택이 아닌 필수입니다. 
            특히 Tailwind CSS와 같은 유틸리티 퍼스트 프레임워크를 사용할 때, 단순히 하나의 <span className="text-emerald-400">primary</span> 색상을 정하는 것만으로는 부족합니다.
            이 도구는 단 하나의 기준 색상만으로 완벽한 11단계 스케일을 생성해줍니다.
          </Typography>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />

        {/* Working Principle with Mermaid Diagram */}
        <div className="space-y-6">
          <Typography variant="h3" className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <span className="text-emerald-500">⚙️</span> 색상 혼합 알고리즘 시각화
          </Typography>
          
          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-inner">
            <div className="flex justify-center">
              <div className="font-mono text-sm text-slate-400 whitespace-pre overflow-x-auto">
                {`graph LR
  A[Base Color] -->|입력| B{Color Engine}
  B -->|Luminance 분석| C[HSL 변환]
  C -->|밝게 5단계| D[Tint (50-400)]
  C -->|어둡게 5단계| E[Shade (600-950)]
  D & E --> F[Complete Palette]
  F -->|Config 생성| G[Tailwind JSON]`}
              </div>
            </div>
            <p className="text-center text-xs text-slate-500 mt-4">색상 스케일링 프로세스</p>
          </div>
        </div>

        {/* Major Features */}
        <div className="space-y-6">
          <Typography variant="h3" className="text-2xl font-bold text-slate-100">
            주요 기능 및 이점
          </Typography>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800/50 hover:border-emerald-500/30 transition-colors">
              <h4 className="text-lg font-semibold text-emerald-300 mb-2">⏱️ 시간 절약</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                수동으로 명도를 조절하며 11개의 색상을 만드는 반복 작업을 1초 만에 해결합니다. 디자이너가 없어도 전문적인 색상 시스템을 구축할 수 있습니다.
              </p>
            </div>
            <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800/50 hover:border-emerald-500/30 transition-colors">
              <h4 className="text-lg font-semibold text-emerald-300 mb-2">🎨 일관성 유지</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                HSL 알고리즘에 기반하여 색상을 혼합하므로, 모든 단계에서 균일한 시각적 흐름과 명암비를 보장합니다.
              </p>
            </div>
            <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800/50 hover:border-emerald-500/30 transition-colors">
              <h4 className="text-lg font-semibold text-emerald-300 mb-2">📋 즉시 사용 가능</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                생성된 팔레트를 Tailwind CSS 설정 파일(`tailwind.config.ts`) 형식의 JSON으로 바로 복사하여 프로젝트에 붙여넣을 수 있습니다.
              </p>
            </div>
            <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800/50 hover:border-emerald-500/30 transition-colors">
              <h4 className="text-lg font-semibold text-emerald-300 mb-2">🌑 다크 모드 대응</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                50~950 단계의 넓은 스펙트럼은 다크 모드 UI를 구현할 때 필수적인 미세한 배경색 차이를 완벽하게 제공합니다.
              </p>
            </div>
          </div>
        </div>

        {/* Technical Comparison Table */}
        <div className="space-y-6">
          <Typography variant="h3" className="text-2xl font-bold text-slate-100">
            Tailwind CSS 색상 스케일 표준
          </Typography>
          <div className="overflow-hidden rounded-xl border border-slate-800">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900 text-slate-100">
                  <th className="p-4 border-b border-slate-800 font-semibold">단계 (Weight)</th>
                  <th className="p-4 border-b border-slate-800 font-semibold">용도 (Usage)</th>
                  <th className="p-4 border-b border-slate-800 font-semibold text-emerald-400">명도 특성</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-slate-950">
                <tr>
                  <td className="p-4 text-slate-300 font-medium">50</td>
                  <td className="p-4 text-slate-400 text-sm">배경 (Backgrounds)</td>
                  <td className="p-4 text-emerald-300 font-bold">95% 이상 (아주 밝음)</td>
                </tr>
                <tr>
                  <td className="p-4 text-slate-300 font-medium">100 - 200</td>
                  <td className="p-4 text-slate-400 text-sm">연한 배경 (Light Backgrounds)</td>
                  <td className="p-4 text-emerald-300 font-bold">80% ~ 90%</td>
                </tr>
                <tr>
                  <td className="p-4 text-slate-300 font-medium">500 (Base)</td>
                  <td className="p-4 text-slate-400 text-sm">주요 컴포넌트, 버튼 (Primary)</td>
                  <td className="p-4 text-emerald-300 font-bold">기준 색상</td>
                </tr>
                <tr>
                  <td className="p-4 text-slate-300 font-medium">800 - 900</td>
                  <td className="p-4 text-slate-400 text-sm">텍스트 (Body Text)</td>
                  <td className="p-4 text-emerald-300 font-bold">아주 어두움 (가독성)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="space-y-6">
          <Typography variant="h3" className="text-2xl font-bold text-slate-100">
            자주 묻는 질문 (FAQ)
          </Typography>
          <div className="space-y-4">
            <div className="bg-slate-900/30 p-5 rounded-lg border border-slate-800">
              <h3 className="text-lg font-semibold text-slate-100 mb-2">Q1: 생성된 색상이 Tailwind CSS 기본 색상과 정확히 일치하나요?</h3>
              <p className="text-slate-400 leading-relaxed">
                아닙니다. Tailwind CSS의 기본 팔레트는 디자이너가 눈으로 보며 세밀하게 조정한 '수작업' 결과물입니다. 이 도구는 그와 최대한 유사한 느낌을 주도록 알고리즘으로 계산한 값을 제공하므로, 커스텀 브랜드 컬러를 사용할 때 가장 유용합니다.
              </p>
            </div>
            <div className="bg-slate-900/30 p-5 rounded-lg border border-slate-800">
              <h3 className="text-lg font-semibold text-slate-100 mb-2">Q2: 생성된 설정을 프로젝트에 어떻게 적용하나요?</h3>
              <p className="text-slate-400 leading-relaxed">
                `tailwind.config.ts` 파일을 열어 `theme.extend.colors` 섹션에 복사한 코드를 붙여넣으세요. 그러면 `bg-brand-500` 처럼 클래스명을 바로 사용할 수 있습니다.
              </p>
            </div>
            <div className="bg-slate-900/30 p-5 rounded-lg border border-slate-800">
              <h3 className="text-lg font-semibold text-slate-100 mb-2">Q3: RGB나 HSL 값으로도 입력할 수 있나요?</h3>
              <p className="text-slate-400 leading-relaxed">
                현재 버전에서는 Hex 코드(예: #3B82F6) 입력만을 지원합니다. 대부분의 디자인 툴에서 Hex 코드가 표준으로 사용되기 때문입니다.
              </p>
            </div>
          </div>
        </div>

        <div className="h-px bg-slate-800" />

        {/* CTA Section */}
        <div className="bg-slate-900 p-8 rounded-2xl text-center space-y-6">
          <Typography variant="h3" className="text-xl font-bold text-slate-100">
            디자인 생산성을 높여주는 도구들
          </Typography>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/utility/vibe-token-slimmer" className="group flex items-center gap-2 px-5 py-3 bg-slate-800 hover:bg-slate-700 rounded-full transition-all duration-300 border border-slate-700 hover:border-emerald-500/50">
              <span className="text-xl">✂️</span>
              <span className="text-indigo-300 group-hover:text-emerald-300 font-medium">AI 토큰 최적화</span>
            </Link>
            <Link href="/formatter/markdown-editor" className="group flex items-center gap-2 px-5 py-3 bg-slate-800 hover:bg-slate-700 rounded-full transition-all duration-300 border border-slate-700 hover:border-emerald-500/50">
              <span className="text-xl">📝</span>
              <span className="text-indigo-300 group-hover:text-emerald-300 font-medium">마크다운 에디터</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
