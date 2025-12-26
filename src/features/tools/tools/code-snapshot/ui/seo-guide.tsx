'use client';

import React from "react";
import { Typography } from "@/shared/ui/typography";
import Link from "next/link";

export function SeoGuide() {
  return (
    <section className="bg-slate-950 rounded-2xl p-8 border border-slate-800 shadow-2xl overflow-hidden mt-12">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* 1. 도입부 */}
        <div className="space-y-6">
          <Typography variant="h2" className="text-3xl font-extrabold text-slate-100 tracking-tight">
            코드 스냅샷 생성이 왜 중요한가요?
          </Typography>
          <Typography variant="p" className="text-lg text-slate-300 leading-relaxed">
            코드 스냅샷 생성기는 개발자가 작성한 소스 코드를 시각적으로 매력적인 이미지로 변환하는 도구입니다.
            블로그 포스팅, 기술 문서, 소셜 미디어 공유 시 단순 텍스트 대신 문법 하이라이팅이 적용된 코드 이미지를 사용하면 
            가독성과 전문성을 동시에 높일 수 있습니다.
          </Typography>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />

        {/* 2. 주요 기능 */}
        <div className="space-y-6">
          <Typography variant="h3" className="text-2xl font-bold text-slate-100">
            핵심 기능 일람
          </Typography>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
              <h4 className="text-lg font-semibold text-emerald-300 mb-2">🎨 프리미엄 테마</h4>
              <p className="text-slate-400 text-sm">VS Code, Dracula, Nord 등 인기 있는 5가지 테마를 즉시 적용할 수 있습니다.</p>
            </div>
            <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
              <h4 className="text-lg font-semibold text-emerald-300 mb-2">🪟 윈도우 스타일</h4>
              <p className="text-slate-400 text-sm">macOS와 Windows 스타일의 프레임을 선택하여 실제 앱과 같은 느낌을 줍니다.</p>
            </div>
            <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
              <h4 className="text-lg font-semibold text-emerald-300 mb-2">🔢 줄 번호 및 하이라이트</h4>
              <p className="text-slate-400 text-sm">복잡한 로직을 설명할 때 유용한 줄 번호 표시 기능을 지원합니다.</p>
            </div>
            <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
              <h4 className="text-lg font-semibold text-emerald-300 mb-2">🚀 고해상도 PNG</h4>
              <p className="text-slate-400 text-sm">2배율 스케일링을 통해 레티나 디스플레이에서도 깨지지 않는 선명한 이미지를 보장합니다.</p>
            </div>
          </div>
        </div>

        {/* 3. 사용 시나리오 */}
        <div className="space-y-6">
          <Typography variant="h3" className="text-2xl font-bold text-slate-100">
            실무 활용 시나리오
          </Typography>
          <ul className="list-disc pl-6 space-y-4 text-slate-300">
            <li><strong>기술 블로그 포스팅:</strong> 벨로그, 티스토리 등에서 코드의 가로 스크롤 없이 전체 구조를 보여주고 싶을 때</li>
            <li><strong>소셜 미디어 공유:</strong> 트위터나 링크드인에서 짧은 팁을 공유할 때 가독성을 극대화</li>
            <li><strong>GitHub Issue:</strong> 버그 리포트 시 문제가 발생한 지점을 명확하게 시각화하여 전달</li>
          </ul>
        </div>

        {/* 4. FAQ */}
        <div className="space-y-6">
          <Typography variant="h3" className="text-2xl font-bold text-slate-100">
            자주 묻는 질문 (FAQ)
          </Typography>
          <div className="space-y-4">
            <div className="bg-slate-900/30 p-5 rounded-lg border border-slate-800">
              <h3 className="text-lg font-semibold text-slate-100 mb-2">Q1: 생성된 이미지의 해상도는 어떻게 되나요?</h3>
              <p className="text-slate-400">A: 기본적으로 Scale 2배율로 렌더링되어 레티나 디스플레이에서도 선명한 텍스트를 보장합니다.</p>
            </div>
            <div className="bg-slate-900/30 p-5 rounded-lg border border-slate-800">
              <h3 className="text-lg font-semibold text-slate-100 mb-2">Q2: 내 코드가 서버에 저장되나요?</h3>
              <p className="text-slate-400">A: 아니요, 모든 렌더링은 브라우저(HTML2Canvas)에서 로컬로 처리되며 어떠한 데이터도 외부로 전송되지 않습니다.</p>
            </div>
          </div>
        </div>

        <div className="h-px bg-slate-800" />

        {/* 관련 도구 링크 */}
        <div className="bg-slate-900 p-8 rounded-2xl text-center space-y-6 border border-slate-800">
          <Typography variant="h3" className="text-xl font-bold text-slate-100">
            생산성을 더 높여주는 도구들
          </Typography>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/utility/tailwind-class-visualizer" className="group flex items-center gap-2 px-5 py-3 bg-slate-800 hover:bg-slate-700 rounded-full border border-slate-700">
              <span className="text-indigo-300 group-hover:text-emerald-300 font-medium">Tailwind 시각화</span>
            </Link>
            <Link href="/formatter/json-formatter" className="group flex items-center gap-2 px-5 py-3 bg-slate-800 hover:bg-slate-700 rounded-full border border-slate-700">
              <span className="text-indigo-300 group-hover:text-emerald-300 font-medium">JSON 포맷터</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
