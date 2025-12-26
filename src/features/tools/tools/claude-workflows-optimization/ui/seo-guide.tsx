'use client';

import React from "react";
import { Typography } from "@/shared/ui/typography";

export function SeoGuide() {
  return (
    <section className="bg-slate-950 rounded-2xl p-8 border border-slate-800 shadow-2xl overflow-hidden mt-12">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="space-y-6 text-center lg:text-left">
          <Typography variant="h2" className="text-3xl font-extrabold text-slate-100">
            Claude 워크플로우: <span className="text-emerald-400">생산성의 차이</span>
          </Typography>
          <Typography variant="p" className="text-lg text-slate-300 leading-relaxed">
            AI와 대화하는 것과 AI를 시스템의 일부로 활용하는 것은 다릅니다. 
            이 가이드는 단순 질의응답을 넘어, 코드 분석, 리팩토링, 테스트 자동화 등 실무 중심의 6가지 최적화된 워크플로우를 제시합니다.
          </Typography>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
            <h4 className="text-lg font-semibold text-emerald-300 mb-2">💸 비용 최적화(Token Saving)</h4>
            <p className="text-slate-400 text-sm">불필요한 컨텍스트를 제거하고, 정밀한 지침을 통해 토큰 낭비를 40% 이상 줄이는 구체적인 기법을 배웁니다.</p>
          </div>
          <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
            <h4 className="text-lg font-semibold text-emerald-300 mb-2">⚡ 자동화 파이프라인</h4>
            <p className="text-slate-400 text-sm">CLI를 활용하여 반복적인 코드 수정 작업을 배치 처리하고, 결과를 자동으로 검증하는 워크플로우를 구축하세요.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
