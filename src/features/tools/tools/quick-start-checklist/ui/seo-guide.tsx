'use client';

import React from "react";
import { Typography } from "@/shared/ui/typography";
import { ToolSection } from "@/shared/ui/tool-layout";

export function SeoGuide() {
  return (
    <section className="bg-slate-950 rounded-2xl p-8 border border-slate-800 shadow-2xl overflow-hidden mt-12">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="space-y-6">
          <Typography variant="h2" className="text-3xl font-extrabold text-slate-100">
            Claude Code CLI 완벽 가이드
          </Typography>
          <Typography variant="p" className="text-lg text-slate-300">
            Claude Code CLI는 Anthropic에서 제공하는 명령줄 인터페이스 도구로, 터미널에서 직접 Claude AI와 대화하고 코드 작성을 도울 수 있습니다.
          </Typography>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
            <h4 className="text-lg font-semibold text-emerald-300 mb-2">🤖 지능형 AI 지원</h4>
            <p className="text-slate-400 text-sm">터미널을 떠나지 않고도 코드 작성, 디버깅, 시스템 아키텍처 설명을 요청할 수 있습니다.</p>
          </div>
          <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
            <h4 className="text-lg font-semibold text-emerald-300 mb-2">📂 프로젝트 맥락 이해</h4>
            <p className="text-slate-400 text-sm">현재 작업 중인 프로젝트의 파일 구조와 코드를 스스로 분석하여 최적의 제안을 합니다.</p>
          </div>
        </div>

        <div className="space-y-6">
          <Typography variant="h3" className="text-2xl font-bold text-slate-100">자주 묻는 질문 (FAQ)</Typography>
          <div className="space-y-4">
            <div className="bg-slate-900/30 p-5 rounded-lg border border-slate-800">
              <h4 className="font-semibold text-slate-100 mb-2">Q: API 사용료는 어떻게 되나요?</h4>
              <p className="text-slate-400 text-sm">Claude API 사용량에 따라 과금됩니다. Anthropic 콘솔에서 실시간 사용량을 확인할 수 있습니다.</p>
            </div>
            <div className="bg-slate-900/30 p-5 rounded-lg border border-slate-800">
              <h4 className="font-semibold text-slate-100 mb-2">Q: 프로젝트 파일이 외부로 전송되나요?</h4>
              <p className="text-slate-400 text-sm">사용자가 명시적으로 공유한 파일 컨텍스트만 전송됩니다. `.claudeignore`를 통해 보안을 유지할 수 있습니다.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}