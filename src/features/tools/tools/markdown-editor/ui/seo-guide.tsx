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
            Markdown Editor 완벽 가이드: 당신의 <span className="text-emerald-400">글쓰기 경험을 혁신</span>하다
          </Typography>
          <Typography variant="p" className="text-lg text-slate-300 leading-relaxed">
            Markdown Editor는 단순한 텍스트 변환을 넘어, 당신의 실무 워크플로우를 혁신할 수 있는 다양한 활용 시나리오를 제공합니다.
            복잡한 HTML 태그 없이도 직관적인 마크다운 문법으로 문서를 작성하고, 실시간으로 변환된 결과를 확인하세요.
          </Typography>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />

        {/* Working Principle with Mermaid Diagram */}
        <div className="space-y-6">
          <Typography variant="h3" className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <span className="text-emerald-500">⚙️</span> 변환 프로세스 시각화
          </Typography>
          
          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-inner">
            <div className="flex justify-center">
              <div className="font-mono text-sm text-slate-400 whitespace-pre overflow-x-auto">
                {`graph LR
  A[Markdown Input] -->|파싱| B{Marked Parser}
  B -->|토큰화| C[AST 생성]
  C -->|렌더링| D[HTML String]
  D -->|정화| E[DOMPurify]
  E --> F[Safe HTML Output]`}
              </div>
            </div>
            <p className="text-center text-xs text-slate-500 mt-4">안전한 HTML 변환 파이프라인</p>
          </div>
        </div>

        {/* Major Features */}
        <div className="space-y-6">
          <Typography variant="h3" className="text-2xl font-bold text-slate-100">
            주요 기능 및 이점
          </Typography>
          <ul className="grid md:grid-cols-2 gap-6">
            <li className="bg-slate-900/50 p-6 rounded-xl border border-slate-800/50 hover:border-emerald-500/30 transition-colors">
              <h4 className="text-lg font-semibold text-emerald-300 mb-2">⚡ 실시간 미리보기</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                좌측 에디터 입력과 동시에 우측에서 렌더링된 결과를 확인하여 오타를 즉시 수정할 수 있습니다.
              </p>
            </li>
            <li className="bg-slate-900/50 p-6 rounded-xl border border-slate-800/50 hover:border-emerald-500/30 transition-colors">
              <h4 className="text-lg font-semibold text-emerald-300 mb-2">🐙 GFM 완벽 지원</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                GitHub Flavored Markdown 스펙을 준수하여 테이블, 체크박스, 자동 링크 등을 문제없이 사용할 수 있습니다.
              </p>
            </li>
            <li className="bg-slate-900/50 p-6 rounded-xl border border-slate-800/50 hover:border-emerald-500/30 transition-colors">
              <h4 className="text-lg font-semibold text-emerald-300 mb-2">💾 자동 저장 및 복원</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                로컬 스토리지를 활용하여 작업 내용을 1초마다 자동 저장하므로 브라우저가 종료되어도 데이터가 안전합니다.
              </p>
            </li>
            <li className="bg-slate-900/50 p-6 rounded-xl border border-slate-800/50 hover:border-emerald-500/30 transition-colors">
              <h4 className="text-lg font-semibold text-emerald-300 mb-2">🛡️ XSS 보안 방지</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                DOMPurify를 통해 악성 스크립트를 필터링하여 안전하고 깨끗한 HTML 코드만 생성합니다.
              </p>
            </li>
          </ul>
        </div>

        {/* Technical Comparison Table */}
        <div className="space-y-6">
          <Typography variant="h3" className="text-2xl font-bold text-slate-100">
            Markdown vs HTML 비교
          </Typography>
          <div className="overflow-hidden rounded-xl border border-slate-800">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900 text-slate-100">
                  <th className="p-4 border-b border-slate-800 font-semibold">특징</th>
                  <th className="p-4 border-b border-slate-800 font-semibold">Markdown</th>
                  <th className="p-4 border-b border-slate-800 font-semibold text-emerald-400">HTML</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-slate-950">
                <tr>
                  <td className="p-4 text-slate-300 font-medium">가독성</td>
                  <td className="p-4 text-slate-400 text-sm">높음 (순수 텍스트로도 읽기 편함)</td>
                  <td className="p-4 text-emerald-300 font-bold">낮음 (태그가 혼재됨)</td>
                </tr>
                <tr>
                  <td className="p-4 text-slate-300 font-medium">작성 속도</td>
                  <td className="p-4 text-slate-400 text-sm">매우 빠름 (특수문자 몇 개로 해결)</td>
                  <td className="p-4 text-emerald-300 font-bold">느림 (여는 태그/닫는 태그 필요)</td>
                </tr>
                <tr>
                  <td className="p-4 text-slate-300 font-medium">활용처</td>
                  <td className="p-4 text-slate-400 text-sm">블로그, 문서화(README), 메모</td>
                  <td className="p-4 text-emerald-300 font-bold">웹 페이지 구조화, 앱 개발</td>
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
              <h3 className="text-lg font-semibold text-slate-100 mb-2">Q1: Markdown Editor를 사용해야 하는 주된 이유는 무엇인가요?</h3>
              <p className="text-slate-400 leading-relaxed">
                Markdown Editor는 텍스트 기반의 콘텐츠를 빠르고 효율적으로 작성하고, 이를 웹 표준 HTML로 변환하는 데 최적화된 도구입니다. 복잡한 HTML 태그를 일일이 기억하거나 수동으로 입력할 필요 없이, 간결한 Markdown 문법만으로도 다양한 서식의 문서를 만들 수 있습니다.
              </p>
            </div>
            <div className="bg-slate-900/30 p-5 rounded-lg border border-slate-800">
              <h3 className="text-lg font-semibold text-slate-100 mb-2">Q2: GFM(GitHub Flavored Markdown)은 무엇인가요?</h3>
              <p className="text-slate-400 leading-relaxed">
                GFM은 GitHub에서 표준 마크다운을 확장한 문법으로, 테이블, 태스크 리스트(체크박스), 코드 블록 구문 강조 등 개발자에게 유용한 기능들이 추가되었습니다. 본 에디터는 이를 완벽 지원합니다.
              </p>
            </div>
            <div className="bg-slate-900/30 p-5 rounded-lg border border-slate-800">
              <h3 className="text-lg font-semibold text-slate-100 mb-2">Q3: 생성된 HTML 코드는 안전한가요?</h3>
              <p className="text-slate-400 leading-relaxed">
                네, `marked.js`로 변환된 후 `DOMPurify`를 거쳐 철저히 소독(Sanitize)됩니다. XSS 공격에 사용될 수 있는 악성 스크립트 태그가 제거되므로 안심하고 사용하셔도 됩니다.
              </p>
            </div>
            <div className="bg-slate-900/30 p-5 rounded-lg border border-slate-800">
              <h3 className="text-lg font-semibold text-slate-100 mb-2">Q4: 오프라인에서도 사용할 수 있나요?</h3>
              <p className="text-slate-400 leading-relaxed">
                이 도구는 PWA(Progressive Web App) 기술을 기반으로 하여, 페이지가 한 번 로드되면 오프라인 상태에서도 기본적인 편집 기능을 사용할 수 있습니다. (현재 버전은 브라우저 캐시 활용)
              </p>
            </div>
            <div className="bg-slate-900/30 p-5 rounded-lg border border-slate-800">
              <h3 className="text-lg font-semibold text-slate-100 mb-2">Q5: 스크롤 동기화 기능이 있나요?</h3>
              <p className="text-slate-400 leading-relaxed">
                네, 긴 문서를 작성할 때 에디터와 미리보기 화면의 스크롤 위치를 자동으로 동기화하여, 현재 편집 중인 내용이 미리보기에서 어떻게 보이는지 즉시 확인할 수 있습니다.
              </p>
            </div>
          </div>
        </div>

        <div className="h-px bg-slate-800" />

        {/* CTA Section */}
        <div className="bg-slate-900 p-8 rounded-2xl text-center space-y-6">
          <Typography variant="h3" className="text-xl font-bold text-slate-100">
            생산성을 높여주는 다른 도구들
          </Typography>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/utility/vibe-token-slimmer" className="group flex items-center gap-2 px-5 py-3 bg-slate-800 hover:bg-slate-700 rounded-full transition-all duration-300 border border-slate-700 hover:border-emerald-500/50">
              <span className="text-xl">✂️</span>
              <span className="text-indigo-300 group-hover:text-emerald-300 font-medium">AI 토큰 최적화</span>
            </Link>
            <Link href="/converter/json-to-table" className="group flex items-center gap-2 px-5 py-3 bg-slate-800 hover:bg-slate-700 rounded-full transition-all duration-300 border border-slate-700 hover:border-emerald-500/50">
              <span className="text-xl">📊</span>
              <span className="text-indigo-300 group-hover:text-emerald-300 font-medium">JSON 테이블 변환</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
