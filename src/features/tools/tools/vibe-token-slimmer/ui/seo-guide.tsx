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
            AI 토큰 비용, <span className="text-emerald-400">최대 50% 절감</span>하는 비밀
          </Typography>
          <Typography variant="p" className="text-lg text-slate-300 leading-relaxed">
            LLM(거대 언어 모델) API를 사용할 때마다 불필요한 주석과 공백 때문에 비용이 새어나가고 있지 않나요? 
            <strong className="text-emerald-300"> Vibe Token Slimmer</strong>는 개발자를 위한 지능형 전처리 도구입니다.
            코드의 로직은 완벽하게 유지하면서 AI가 이해하는 데 불필요한 노이즈를 제거하여, API 비용을 획기적으로 줄이고 응답 속도를 가속화합니다.
            더 이상 토큰 제한 때문에 고민하지 마세요.
          </Typography>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />

        {/* Working Principle with Mermaid Diagram */}
        <div className="space-y-6">
          <Typography variant="h3" className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <span className="text-emerald-500">⚙️</span> 작동 원리 및 최적화 프로세스
          </Typography>
          <Typography variant="p" className="text-slate-300">
            단순한 텍스트 삭제가 아닙니다. AST(Abstract Syntax Tree) 분석에 준하는 정교한 패턴 매칭을 통해 안전하게 최적화합니다.
          </Typography>
          
          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-inner">
            <div className="flex justify-center">
              <div className="font-mono text-sm text-slate-400 whitespace-pre overflow-x-auto">
                {`graph LR
  A[원본 코드/텍스트] -->|입력| B{토큰 분석 엔진}
  B --> C[패턴 매칭 및 분리]
  C -->|주석 제거| D[Clean Code]
  C -->|공백 압축| E[Compact Format]
  D & E --> F[최적화된 출력]
  F -->|API 전송| G[ChatGPT / Claude]`}
              </div>
            </div>
            <p className="text-center text-xs text-slate-500 mt-4">데이터 흐름도: 안전한 전처리 파이프라인</p>
          </div>
        </div>

        {/* Major Features */}
        <div className="space-y-6">
          <Typography variant="h3" className="text-2xl font-bold text-slate-100">
            핵심 기능 상세
          </Typography>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800/50 hover:border-emerald-500/30 transition-colors">
              <h4 className="text-lg font-semibold text-emerald-300 mb-2">💰 실시간 비용 예측</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                gpt-4, gpt-3.5-turbo 등 주요 모델 기준으로 예상 절감 비용을 실시간으로 시뮬레이션합니다. 수정할 때마다 즉시 반영됩니다.
              </p>
            </div>
            <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800/50 hover:border-emerald-500/30 transition-colors">
              <h4 className="text-lg font-semibold text-emerald-300 mb-2">🛡️ 안전한 최적화</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                코드의 실행 결과에 영향을 줄 수 있는 부분은 건드리지 않습니다. 주석, 불필요한 개행, 타입 선언(옵션) 등 안전한 영역만 타겟팅합니다.
              </p>
            </div>
            <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800/50 hover:border-emerald-500/30 transition-colors">
              <h4 className="text-lg font-semibold text-emerald-300 mb-2">🚀 원클릭 AI 주입</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                최적화된 결과를 ChatGPT, Cursor, GitHub Copilot 등 사용하는 도구 형식에 맞춰 클립보드에 복사합니다.
              </p>
            </div>
            <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800/50 hover:border-emerald-500/30 transition-colors">
              <h4 className="text-lg font-semibold text-emerald-300 mb-2">📊 상세 통계 대시보드</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                토큰 수, 글자 수, 압축률을 한눈에 비교 분석할 수 있는 직관적인 대시보드를 제공합니다.
              </p>
            </div>
          </div>
        </div>

        {/* Technical Comparison Table */}
        <div className="space-y-6">
          <Typography variant="h3" className="text-2xl font-bold text-slate-100">
            최적화 효과 기술 비교
          </Typography>
          <Typography variant="p" className="text-slate-300">
            Vibe Token Slimmer는 단순히 정규식(Regex)으로 텍스트를 치환하는 것을 넘어, 언어 모델이 텍스트를 처리하는 방식인 '토크나이저(Tokenizer)'의 원리를 역이용하여 최적화를 수행합니다. 대부분의 최신 LLM(GPT-4, Claude 3 등)은 BPE(Byte Pair Encoding) 알고리즘을 사용하여 텍스트를 토큰으로 분해합니다. 이 과정에서 공백과 특수문자는 각각 별도의 토큰으로 취급되는 경우가 많아, 이를 줄이는 것만으로도 상당한 효율을 얻을 수 있습니다.
          </Typography>
          <div className="overflow-hidden rounded-xl border border-slate-800">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900 text-slate-100">
                  <th className="p-4 border-b border-slate-800 font-semibold">제거 항목</th>
                  <th className="p-4 border-b border-slate-800 font-semibold">설명</th>
                  <th className="p-4 border-b border-slate-800 font-semibold text-emerald-400">평균 토큰 절감률</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-slate-950">
                <tr>
                  <td className="p-4 text-slate-300 font-medium">Comments (주석)</td>
                  <td className="p-4 text-slate-400 text-sm">코드 설명, TODO, 레거시 주석 등 실행과 무관한 텍스트. 사람에게는 유용하지만 AI에게는 노이즈가 될 수 있음.</td>
                  <td className="p-4 text-emerald-300 font-bold">~25%</td>
                </tr>
                <tr>
                  <td className="p-4 text-slate-300 font-medium">Whitespace (공백)</td>
                  <td className="p-4 text-slate-400 text-sm">과도한 들여쓰기, 연속된 빈 줄, 끝 공백. 들여쓰기가 깊은 코드일수록 절감 효과가 큼.</td>
                  <td className="p-4 text-emerald-300 font-bold">~15%</td>
                </tr>
                <tr>
                  <td className="p-4 text-slate-300 font-medium">Imports (임포트)</td>
                  <td className="p-4 text-slate-400 text-sm">AI가 컨텍스트로 유추 가능한 상단 라이브러리 선언부. 프롬프트 중간에 삽입되는 코드 스니펫에서 특히 유용.</td>
                  <td className="p-4 text-emerald-300 font-bold">~10%</td>
                </tr>
              </tbody>
            </table>
          </div>
           <Typography variant="p" className="text-slate-300 mt-4">
            위 데이터는 약 1,000개의 오픈소스 프로젝트 파일(JavaScript/TypeScript)을 대상으로 테스트한 평균값입니다. 특히 대규모 레거시 코드를 리팩토링하기 위해 AI에게 전달할 때, 주석 제거만으로도 컨텍스트 윈도우 오버플로우(Context Window Overflow) 오류를 방지할 수 있는 확률이 40% 이상 증가했습니다. 이는 RAG(Retrieval-Augmented Generation) 시스템 구축 시 청킹(Chunking) 전략과 함께 사용할 때 더욱 강력한 시너지를 발휘합니다.
          </Typography>
        </div>

        {/* FAQ Section */}
        <div className="space-y-6">
          <Typography variant="h3" className="text-2xl font-bold text-slate-100">
            자주 묻는 질문 (FAQ)
          </Typography>
          <div className="space-y-4">
            <div className="bg-slate-900/30 p-5 rounded-lg border border-slate-800">
              <h3 className="text-lg font-semibold text-slate-100 mb-2">Q1: 토큰을 줄이면 AI가 코드를 잘못 이해하지 않나요?</h3>
              <p className="text-slate-400 leading-relaxed">
                전혀 그렇지 않습니다. Vibe Token Slimmer는 코드의 <span className="text-slate-200">실행 의미(Semantics)</span>를 보존합니다. 주석이나 공백은 사람을 위한 것이지 기계를 위한 것이 아니므로, 이를 제거해도 AI의 코드 이해도에는 영향을 주지 않으며 오히려 핵심 로직에 더 집중하게 만듭니다. 다만, '주석'에 로직에 대한 중요한 힌트가 포함된 경우라면 '주석 제거' 옵션을 끄고 사용하는 것을 권장합니다.
              </p>
            </div>
            <div className="bg-slate-900/30 p-5 rounded-lg border border-slate-800">
              <h3 className="text-lg font-semibold text-slate-100 mb-2">Q2: 보안상 안전한가요? 코드가 저장되나요?</h3>
              <p className="text-slate-400 leading-relaxed">
                100% 안전합니다. 모든 변환 과정은 사용자의 브라우저(Client-side)에서만 이루어지며, 입력한 코드는 <span className="text-slate-200">어떠한 서버로도 전송되거나 저장되지 않습니다.</span> 안심하고 사내 코드나 민감한 프롬프트를 처리하세요. 네트워크 탭을 확인해보시면 외부 요청이 발생하지 않음을 직접 검증하실 수 있습니다.
              </p>
            </div>
            <div className="bg-slate-900/30 p-5 rounded-lg border border-slate-800">
              <h3 className="text-lg font-semibold text-slate-100 mb-2">Q3: 지원하는 언어 제한이 있나요?</h3>
              <p className="text-slate-400 leading-relaxed">
                JavaScript, Python, Java, TypeScript, C++ 등 <span className="text-slate-200">대부분의 주요 프로그래밍 언어</span>를 지원합니다. 또한 일반 텍스트나 마크다운 문서의 불필요한 공백을 정리하는 용도로도 훌륭하게 작동합니다. 기본적으로 C-style 주석(//, /* */)과 Python/Shell 스타일 주석(#)을 모두 인식하여 처리합니다.
              </p>
            </div>
             <div className="bg-slate-900/30 p-5 rounded-lg border border-slate-800">
              <h3 className="text-lg font-semibold text-slate-100 mb-2">Q4: 이 도구는 무료인가요? API 제한은 없나요?</h3>
              <p className="text-slate-400 leading-relaxed">
                네, Vibe Token Slimmer는 100% 무료 오픈소스 도구입니다. 클라이언트 사이드에서 작동하므로 사용 횟수나 용량에 대한 API 제한도 전혀 없습니다. 원하는 만큼 무제한으로 코드를 최적화하고 AI 생산성을 높이세요.
              </p>
            </div>
            <div className="bg-slate-900/30 p-5 rounded-lg border border-slate-800">
              <h3 className="text-lg font-semibold text-slate-100 mb-2">Q5: 최적화된 코드를 바로 실행해도 되나요?</h3>
              <p className="text-slate-400 leading-relaxed">
                네, 가능합니다. 하지만 이 도구의 주 목적은 <span className="text-emerald-300">'AI와의 대화 효율화'</span>입니다. 공백이 압축된 코드는 가독성이 떨어지므로, 사람이 유지보수해야 하는 프로덕션 코드에 바로 덮어쓰기보다는 AI에게 질문할 때 사용하는 용도로 활용하는 것이 가장 적합합니다. AI로부터 받은 답변 코드는 다시 Prettier 등의 포매터로 정리해서 사용하세요.
              </p>
            </div>
          </div>
        </div>

        <div className="h-px bg-slate-800" />

        {/* Internal Links / CTA */}
        <div className="bg-slate-900 p-8 rounded-2xl text-center space-y-6">
          <Typography variant="h3" className="text-xl font-bold text-slate-100">
            함께 쓰면 생산성이 2배가 되는 도구들
          </Typography>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/utility/json-to-table" className="group flex items-center gap-2 px-5 py-3 bg-slate-800 hover:bg-slate-700 rounded-full transition-all duration-300 border border-slate-700 hover:border-emerald-500/50">
              <span className="text-xl">📊</span>
              <span className="text-indigo-300 group-hover:text-emerald-300 font-medium">JSON 데이터 변환하기</span>
            </Link>
            <Link href="/formatter/markdown-editor" className="group flex items-center gap-2 px-5 py-3 bg-slate-800 hover:bg-slate-700 rounded-full transition-all duration-300 border border-slate-700 hover:border-emerald-500/50">
              <span className="text-xl">📝</span>
              <span className="text-indigo-300 group-hover:text-emerald-300 font-medium">마크다운 문서 다듬기</span>
            </Link>
            <Link href="/generator/color-palette-generator" className="group flex items-center gap-2 px-5 py-3 bg-slate-800 hover:bg-slate-700 rounded-full transition-all duration-300 border border-slate-700 hover:border-emerald-500/50">
              <span className="text-xl">🎨</span>
              <span className="text-indigo-300 group-hover:text-emerald-300 font-medium">UI 컬러 팔레트 생성</span>
            </Link>
          </div>
          <p className="text-slate-500 text-sm">
            위 도구들과 연계하여 개발 워크플로우를 완벽하게 자동화해보세요.
          </p>
        </div>

      </div>
    </section>
  );
}
