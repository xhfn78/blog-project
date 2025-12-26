'use client';

import React from "react";
import { Typography } from "@/shared/ui/typography";

export function SeoGuide() {
  return (
    <section className="bg-slate-950 rounded-2xl p-8 border border-slate-800 shadow-2xl overflow-hidden mt-12">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="space-y-6">
          <Typography variant="h2" className="text-3xl font-extrabold text-slate-100">
            JSON 포맷터 & 검증기 완벽 가이드
          </Typography>
          <Typography variant="p" className="text-lg text-slate-300">
            복잡하고 엉망인 JSON 데이터를 한 번의 클릭으로 깔끔하게 정리하세요. 문법 오류 자동 검출부터 트리 뷰 시각화까지, 개발자를 위한 최고의 JSON 도구입니다.
          </Typography>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
            <h4 className="text-lg font-semibold text-emerald-300 mb-2">⚡ 실시간 유효성 검사</h4>
            <p className="text-slate-400 text-sm">JSON 문법 오류를 즉시 찾아내고, 정확한 위치와 원인을 알려주어 디버깅 시간을 단축시킵니다.</p>
          </div>
          <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
            <h4 className="text-lg font-semibold text-emerald-300 mb-2">🌳 인터랙티브 트리 뷰</h4>
            <p className="text-slate-400 text-sm">중첩된 데이터를 접고 펼칠 수 있는 트리 구조로 시각화하여 데이터 구조를 쉽게 파악할 수 있습니다.</p>
          </div>
        </div>

        <div className="space-y-6">
          <Typography variant="h3" className="text-2xl font-bold text-slate-100">자주 묻는 질문 (FAQ)</Typography>
          <div className="space-y-4">
            <div className="bg-slate-900/30 p-5 rounded-lg border border-slate-800">
              <h4 className="font-semibold text-slate-100 mb-2">Q1. 대용량 JSON 파일도 처리할 수 있나요?</h4>
              <p className="text-slate-400 text-sm">네, 브라우저 메모리가 허용하는 한 최대 수십 MB의 대용량 JSON 파일도 끊김 없이 포맷팅하고 검증할 수 있습니다.</p>
            </div>
            <div className="bg-slate-900/30 p-5 rounded-lg border border-slate-800">
              <h4 className="font-semibold text-slate-100 mb-2">Q2. 데이터가 서버로 전송되나요?</h4>
              <p className="text-slate-400 text-sm">아니요, 100% 클라이언트 사이드에서 처리됩니다. 민감한 데이터도 안심하고 붙여넣으세요.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
