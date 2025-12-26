'use client';

import React from "react";
import { Typography } from "@/shared/ui/typography";
import Link from "next/link";

export function SeoGuide() {
  return (
    <section className="bg-slate-950 rounded-2xl p-8 border border-slate-800 shadow-2xl overflow-hidden mt-12">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="space-y-6 text-center lg:text-left">
          <Typography variant="h2" className="text-3xl font-extrabold text-slate-100 tracking-tight">
            코드를 '읽는' 시대에서 <span className="text-emerald-400">'이해하는' 시대</span>로
          </Typography>
          <Typography variant="p" className="text-lg text-slate-300 leading-relaxed">
            단순히 문법을 아는 것과 코드의 의도를 파악하는 것은 별개의 영역입니다. Code Lens는 개발자가 작성한 코드의 뼈대를 분석하여, 
            이 코드가 어떤 역할을 수행하고 데이터가 어떻게 흐르는지 자연어로 풀어 설명합니다.
          </Typography>
        </div>

        <div className="overflow-x-auto my-6 border border-slate-800 rounded-xl overflow-hidden shadow-inner">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-900 text-slate-100">
              <tr>
                <th className="p-4 border-b border-slate-800 font-bold">카테고리</th>
                <th className="p-4 border-b border-slate-800 font-bold">언어</th>
                <th className="p-4 border-b border-slate-800 font-bold">주요 분석 내용</th>
              </tr>
            </thead>
            <tbody className="bg-slate-950 text-slate-400">
              <tr>
                <td className="p-4 border-b border-slate-800 font-bold text-slate-200">프론트엔드</td>
                <td className="p-4 border-b border-slate-800 text-emerald-400">JS, TS, React</td>
                <td className="p-4 border-b border-slate-800">컴포넌트 구조, 상태 관리, 부수 효과 로직 분석</td>
              </tr>
              <tr>
                <td className="p-4 border-b border-slate-800 font-bold text-slate-200">데이터/서버</td>
                <td className="p-4 border-b border-slate-800 text-emerald-400">SQL, GraphQL</td>
                <td className="p-4 border-b border-slate-800">데이터베이스 쿼리 의도 및 필드 구조 추출</td>
              </tr>
              <tr>
                <td className="p-4 border-b border-slate-800 font-bold text-slate-200">설정/문서</td>
                <td className="p-4 border-b border-slate-800 text-emerald-400">JSON, YAML, MD</td>
                <td className="p-4 border-b border-slate-800">npm 설정, CI/CD 워크플로우, 마크다운 명세 분석</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
            <h4 className="text-lg font-semibold text-emerald-300 mb-2">⚡ 초고속 무지연 분석</h4>
            <p className="text-slate-400 text-sm">모든 연산이 브라우저 내부에서 이루어져 AI보다 수십 배 빠릅니다.</p>
          </div>
          <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
            <h4 className="text-lg font-semibold text-emerald-300 mb-2">🔒 강력한 보안</h4>
            <p className="text-slate-400 text-sm">코드가 외부 서버로 절대 전송되지 않아 기밀 코드 분석도 안전합니다.</p>
          </div>
        </div>
      </div>
    </section>
  );
}