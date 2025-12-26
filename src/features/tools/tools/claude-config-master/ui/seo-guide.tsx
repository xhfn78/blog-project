'use client';

import React from "react";
import { Typography } from "@/shared/ui/typography";

export function SeoGuide() {
  return (
    <section className="bg-slate-950 rounded-2xl p-8 border border-slate-800 shadow-2xl overflow-hidden mt-12">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="space-y-6 text-center lg:text-left">
          <Typography variant="h2" className="text-3xl font-extrabold text-slate-100">
            Claude Config 마스터: <span className="text-emerald-400">최적의 AI 프로젝트 환경</span>
          </Typography>
          <Typography variant="p" className="text-lg text-slate-300 leading-relaxed">
            `.clauderc`와 `CLAUDE.md`는 Claude AI에게 프로젝트의 문맥과 코딩 컨벤션을 전달하는 핵심 통로입니다. 
            이 가이드는 AI가 불필요한 질문을 줄이고, 당신의 코딩 스타일을 완벽하게 모방하도록 만드는 고급 설정 팁을 제공합니다.
          </Typography>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
            <h4 className="text-lg font-semibold text-emerald-300 mb-2">🎯 컨텍스트 주입 전략</h4>
            <p className="text-slate-400 text-sm">AI가 프로젝트의 기술 스택, 아키텍처 패턴, 파일 구조를 한눈에 이해하도록 `CLAUDE.md`를 구성하는 법을 설명합니다.</p>
          </div>
          <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
            <h4 className="text-lg font-semibold text-emerald-300 mb-2">🛡️ 가드레일 설정</h4>
            <p className="text-slate-400 text-sm">수정하면 안 되는 파일이나 준수해야 할 보안 규칙을 정의하여 AI의 실수를 원천 차단하는 방법을 수록했습니다.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
