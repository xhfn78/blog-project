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
            복잡한 JSON 데이터, <span className="text-emerald-400">엑셀처럼 쉽고 안전하게</span>
          </Typography>
          <Typography variant="p" className="text-lg text-slate-300 leading-relaxed">
            중첩된 JSON 구조를 해석하느라 머리가 아프신가요? 
            <strong className="text-emerald-300"> Smart JSON Table Converter</strong>는 복잡한 계층형 데이터를 평면적인 테이블로 즉시 변환해주는 강력한 도구입니다.
            민감한 개인정보 자동 마스킹, CSV/Excel 내보내기, 그리고 양방향 편집까지 지원하여 데이터 분석가와 백엔드 개발자의 필수 도구로 자리 잡았습니다.
          </Typography>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />

        {/* Working Principle with Mermaid Diagram */}
        <div className="space-y-6">
          <Typography variant="h3" className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <span className="text-emerald-500">⚙️</span> Flattening 알고리즘 작동 원리
          </Typography>
          <Typography variant="p" className="text-slate-300">
            재귀적인 탐색(Recursive Traversal)을 통해 N-depth의 깊은 JSON 트리 구조를 1차원 키-값 쌍으로 '평탄화(Flatten)'합니다.
          </Typography>
          
          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-inner">
            <div className="flex justify-center">
              <div className="font-mono text-sm text-slate-400 whitespace-pre overflow-x-auto">
                {`graph LR
  A[Nested JSON] -->|파싱| B{Flatten Engine}
  B -->|재귀 탐색| C[트리 순회]
  C -->|키 조합| D[user_address_city]
  C -->|값 추출| E[Seoul]
  D & E --> F[Flat Table Row]
  F -->|내보내기| G[CSV / Excel]`}
              </div>
            </div>
            <p className="text-center text-xs text-slate-500 mt-4">데이터 변환 파이프라인 시각화</p>
          </div>
        </div>

        {/* Major Features */}
        <div className="space-y-6">
          <Typography variant="h3" className="text-2xl font-bold text-slate-100">
            왜 이 변환기를 사용해야 하나요?
          </Typography>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800/50 hover:border-emerald-500/30 transition-colors">
              <h4 className="text-lg font-semibold text-emerald-300 mb-2">🔒 지능형 보안 마스킹</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                이메일, 전화번호, 주민번호 등 민감한 개인정보 패턴을 자동으로 감지하여 `***` 처리합니다. 보안 사고 걱정 없이 데이터를 공유하세요.
              </p>
            </div>
            <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800/50 hover:border-emerald-500/30 transition-colors">
              <h4 className="text-lg font-semibold text-emerald-300 mb-2">⚡ 대용량 가상화 테이블</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                TanStack Virtual 기술을 적용하여 10만 줄 이상의 대용량 JSON 데이터도 버벅임 없이 부드럽게 스크롤하고 편집할 수 있습니다.
              </p>
            </div>
            <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800/50 hover:border-emerald-500/30 transition-colors">
              <h4 className="text-lg font-semibold text-emerald-300 mb-2">🔄 양방향 편집 지원</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                테이블에서 값을 수정하면 원본 중첩 구조를 유지한 채로 다시 JSON으로 변환(Unflatten)할 수 있습니다. 데이터 패치 작업에 최적화되어 있습니다.
              </p>
            </div>
            <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800/50 hover:border-emerald-500/30 transition-colors">
              <h4 className="text-lg font-semibold text-emerald-300 mb-2">🛡️ CSV 인젝션 방어</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                엑셀에서 실행될 수 있는 악성 수식(`=cmd|...`)을 자동으로 무력화하여 안전한 CSV 파일을 생성합니다.
              </p>
            </div>
          </div>
        </div>

        {/* Technical Comparison Table */}
        <div className="space-y-6">
          <Typography variant="h3" className="text-2xl font-bold text-slate-100">
            데이터 포맷 비교 및 활용 가이드
          </Typography>
          <div className="overflow-hidden rounded-xl border border-slate-800">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900 text-slate-100">
                  <th className="p-4 border-b border-slate-800 font-semibold">포맷</th>
                  <th className="p-4 border-b border-slate-800 font-semibold">특징</th>
                  <th className="p-4 border-b border-slate-800 font-semibold text-emerald-400">추천 용도</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-slate-950">
                <tr>
                  <td className="p-4 text-slate-300 font-medium">JSON (JavaScript Object Notation)</td>
                  <td className="p-4 text-slate-400 text-sm">계층적 구조 표현에 최적화. 가독성이 낮음.</td>
                  <td className="p-4 text-emerald-300 font-bold">API 통신, 설정 파일</td>
                </tr>
                <tr>
                  <td className="p-4 text-slate-300 font-medium">CSV (Comma Separated Values)</td>
                  <td className="p-4 text-slate-400 text-sm">범용적인 호환성. 계층 구조 표현 불가.</td>
                  <td className="p-4 text-emerald-300 font-bold">데이터 분석, 레거시 연동</td>
                </tr>
                <tr>
                  <td className="p-4 text-slate-300 font-medium">Flattened Table</td>
                  <td className="p-4 text-slate-400 text-sm">JSON의 정보를 유지하며 가독성 확보.</td>
                  <td className="p-4 text-emerald-300 font-bold">데이터 검수, 리포팅</td>
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
              <h3 className="text-lg font-semibold text-slate-100 mb-2">Q1: 파일 크기 제한이 있나요?</h3>
              <p className="text-slate-400 leading-relaxed">
                브라우저의 성능을 고려하여 기본적으로 <span className="text-slate-200">10MB</span>로 제한하고 있습니다. 이는 텍스트 기반 JSON 파일로는 매우 큰 용량(약 10~20만 줄)에 해당합니다. 그 이상의 파일은 서버 부하 및 브라우저 메모리 부족을 방지하기 위해 분할해서 처리하는 것을 권장합니다.
              </p>
            </div>
            <div className="bg-slate-900/30 p-5 rounded-lg border border-slate-800">
              <h3 className="text-lg font-semibold text-slate-100 mb-2">Q2: 내 데이터가 서버에 저장되나요?</h3>
              <p className="text-slate-400 leading-relaxed">
                아니요, 절대 저장되지 않습니다. 모든 파싱과 변환 작업은 사용자의 브라우저 내에서 <span className="text-emerald-300">Web Worker</span>를 통해 독립적으로 실행됩니다. 인터넷 연결을 끊고도 사용할 수 있을 정도로 완벽한 로컬 처리 방식을 고수합니다.
              </p>
            </div>
            <div className="bg-slate-900/30 p-5 rounded-lg border border-slate-800">
              <h3 className="text-lg font-semibold text-slate-100 mb-2">Q3: 중첩된 배열은 어떻게 표현되나요?</h3>
              <p className="text-slate-400 leading-relaxed">
                설정에 따라 인덱스 표기법(예: `users[0].name`, `users[1].name`)으로 평탄화됩니다. 이를 통해 데이터의 구조적 위치를 정확하게 파악할 수 있으며, 다시 JSON으로 복원할 때도 원래 구조를 완벽하게 재현할 수 있습니다.
              </p>
            </div>
             <div className="bg-slate-900/30 p-5 rounded-lg border border-slate-800">
              <h3 className="text-lg font-semibold text-slate-100 mb-2">Q4: 엑셀에서 한글이 깨져요.</h3>
              <p className="text-slate-400 leading-relaxed">
                CSV 다운로드 시 UTF-8 BOM(Byte Order Mark)을 자동으로 추가하여 엑셀에서 한글이 깨지는 문제를 해결했습니다. 별도의 인코딩 변환 없이 엑셀에서 바로 열어서 작업하시면 됩니다.
              </p>
            </div>
            <div className="bg-slate-900/30 p-5 rounded-lg border border-slate-800">
              <h3 className="text-lg font-semibold text-slate-100 mb-2">Q5: JSON 형식이 유효하지 않다고 나와요.</h3>
              <p className="text-slate-400 leading-relaxed">
                JSON 표준 문법(큰따옴표 사용, 마지막 쉼표 제거 등)을 준수해야 합니다. 형식이 올바른지 확인하려면 저희가 제공하는 <Link href="/utility/vibe-token-slimmer" className="text-blue-400 hover:underline">토큰 최적화 도구</Link>나 온라인 린터를 먼저 사용해보세요.
              </p>
            </div>
          </div>
        </div>

        <div className="h-px bg-slate-800" />

        {/* Internal Links / CTA */}
        <div className="bg-slate-900 p-8 rounded-2xl text-center space-y-6">
          <Typography variant="h3" className="text-xl font-bold text-slate-100">
            데이터 처리 생산성을 높여주는 도구들
          </Typography>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/utility/vibe-token-slimmer" className="group flex items-center gap-2 px-5 py-3 bg-slate-800 hover:bg-slate-700 rounded-full transition-all duration-300 border border-slate-700 hover:border-emerald-500/50">
              <span className="text-xl">✂️</span>
              <span className="text-indigo-300 group-hover:text-emerald-300 font-medium">AI 토큰 최적화</span>
            </Link>
            <Link href="/formatter/markdown-editor" className="group flex items-center gap-2 px-5 py-3 bg-slate-800 hover:bg-slate-700 rounded-full transition-all duration-300 border border-slate-700 hover:border-emerald-500/50">
              <span className="text-xl">📝</span>
              <span className="text-indigo-300 group-hover:text-emerald-300 font-medium">마크다운 편집기</span>
            </Link>
          </div>
          <p className="text-slate-500 text-sm">
            다양한 도구와 연계하여 데이터 가공 및 문서화 작업을 자동화하세요.
          </p>
        </div>

      </div>
    </section>
  );
}
