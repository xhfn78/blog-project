"use client";

import React from "react";
import { ToolLayout } from "@/shared/ui/tool-layout";
import { Typography } from "@/shared/ui/typography";
import { Card } from "@/shared/ui/card";
import { Separator } from "@/shared/ui/separator";
import { BackgroundBeams } from "@/shared/ui/background-beams";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { config } from "./tool.config";
import { useCSSToTailwind } from "./lib/use-css-to-tailwind";
import { useHistory } from "./lib/use-history";
import { CSSInput } from "./ui/CSSInput";
import { TailwindOutput } from "./ui/TailwindOutput";
import { PresetSelector } from "./ui/PresetSelector";
import { HistoryPanel } from "./ui/HistoryPanel";
import { Zap, Code, ShieldCheck, Rocket, Info, ChevronRight, HelpCircle, History } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";

export default function CSSToTailwindPage() {
  const { input, setInput, result } = useCSSToTailwind();
  const { history, addToHistory, removeFromHistory, clearHistory } = useHistory("css-to-tailwind-history");

  // 변환 결과가 있고 유효할 때 히스토리에 자동 추가 (Debounced 처리된 result 사용)
  React.useEffect(() => {
    if (result && result.fullClassName && input.trim()) {
      const timer = setTimeout(() => {
        addToHistory(input, result.fullClassName);
      }, 2000); // 사용자가 입력을 멈추고 2초 뒤에 저장
      return () => clearTimeout(timer);
    }
  }, [result, input, addToHistory]);

  return (
    <ToolLayout config={config}>
      <div className="relative space-y-20 pb-20">
        <div className="absolute inset-0 -z-10 overflow-hidden opacity-20">
          <BackgroundBeams />
        </div>

        {/* 1. 메인 변환 영역 */}
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="flex-1 w-full">
              <PresetSelector onSelect={setInput} />
            </div>
          </div>

          <Tabs defaultValue="editor" className="w-full">
            <TabsList className="grid w-[400px] grid-cols-2 mb-4">
              <TabsTrigger value="editor">변환 에디터</TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-2">
                <History className="w-4 h-4" />
                히스토리 {history.length > 0 && `(${history.length})`}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="editor" className="mt-0">
              <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <Card className="p-8 border-primary/20 bg-background/50 backdrop-blur-md shadow-2xl">
                  <CSSInput value={input} onChange={setInput} />
                </Card>

                <Card className="p-8 border-primary/20 bg-background/50 backdrop-blur-md shadow-2xl h-full">
                  <TailwindOutput result={result} />
                </Card>
              </section>
            </TabsContent>

            <TabsContent value="history" className="mt-0">
              <Card className="p-10 border-primary/20 bg-background/50 backdrop-blur-md shadow-2xl min-h-[400px]">
                <HistoryPanel 
                  history={history} 
                  onSelect={(val) => setInput(val)}
                  onRemove={removeFromHistory}
                  onClear={clearHistory}
                />
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* 2. 상세 안내 및 SEO 섹션: VibeVisual Standard Readability Template */}
        <div className="space-y-32 pt-20 border-t border-slate-800">
          
          {/* 도입부: 고대비 매거진 스타일 */}
          <section className="relative overflow-hidden rounded-[3rem] bg-slate-950 p-12 md:p-20 shadow-2xl border border-slate-800">
            <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-indigo-600/10 blur-[150px] -mr-20 -mt-20" />
            <div className="relative z-10 space-y-10 max-w-4xl">
              <Badge className="bg-indigo-500 text-white border-none px-4 py-1 text-sm rounded-full font-bold"> 마이그레이션 가이드 </Badge>
              <Typography variant="h2" className="text-4xl md:text-7xl font-black tracking-tighter leading-[1.1] text-white">
                스타일링의 패러다임 시프트: <br />
                <span className="text-indigo-400">CSS에서 Tailwind로</span>
              </Typography>
              <div className="space-y-6">
                <Typography variant="p" className="text-xl text-slate-100 leading-relaxed font-normal">
                  웹 개발의 역사는 더 효율적이고 유지보수가 용이한 방법을 찾는 과정이었습니다. 전통적인 CSS 방식은 프로젝트가 커질수록 클래스 명명 규칙(BEM 등)의 한계와 스타일 충돌이라는 고질적인 문제에 직면해 왔습니다. <strong>Tailwind CSS</strong>는 이러한 문제를 해결하기 위해 '유틸리티 퍼스트'라는 혁신적인 개념을 도입했습니다.
                </Typography>
                <Typography variant="p" className="text-xl text-slate-100 leading-relaxed font-normal">
                  하지만 이미 구축된 방대한 CSS 코드베이스를 Tailwind로 옮기는 작업은 단순한 복사-붙여넣기 이상의 인내를 요구합니다. 속성 하나하나를 Tailwind의 클래스로 대조하고 변환하는 과정에서 개발자의 창의성은 소모됩니다. VibeVisual의 변환기는 바로 이 지점에서 탄생했습니다. 수작업으로 1시간이 걸릴 작업을 단 1초 만에 해결하여, 개발자가 로직과 사용자 경험에 더 집중할 수 있도록 돕습니다.
                </Typography>
              </div>
            </div>
          </section>

          {/* 주요 기능 및 작동 원리: 고대비 카드 및 다이어그램 */}
          <section className="space-y-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-8">
                <Typography variant="h2" className="text-4xl font-black tracking-tight text-white">지능형 변환 엔진의 메커니즘</Typography>
                <Typography variant="p" className="text-lg text-slate-200 leading-relaxed">
                  본 도구의 핵심은 단순히 텍스트를 치환하는 것이 아니라, CSS의 선언적 구조를 해석하여 Tailwind의 유틸리티 체계로 재구성하는 <strong>Semantic Mapping Engine</strong>에 있습니다. 
                </Typography>
                <div className="space-y-6">
                  <div className="flex gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800">
                    <div className="w-12 h-12 shrink-0 rounded-2xl bg-indigo-500 flex items-center justify-center text-white shadow-lg">
                      <Code className="w-6 h-6" />
                    </div>
                    <div>
                      <Typography variant="h4" className="text-xl font-bold mb-2 text-white">AST 기반 구문 분석</Typography>
                      <Typography variant="p" className="text-sm text-slate-200">입력된 CSS를 속성과 값의 쌍으로 분리하고, 미디어 쿼리 및 의사 클래스(Pseudo-classes)를 감지하여 구조화된 데이터를 생성합니다.</Typography>
                    </div>
                  </div>
                  <div className="flex gap-4 p-6 rounded-3xl bg-slate-900 border border-slate-800">
                    <div className="w-12 h-12 shrink-0 rounded-2xl bg-cyan-500 flex items-center justify-center text-white shadow-lg">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <Typography variant="h4" className="text-xl font-bold mb-2 text-white">수치 정밀도 최적화</Typography>
                      <Typography variant="p" className="text-sm text-slate-200">Tailwind의 4px 단위(1 unit = 0.25rem) 시스템을 완벽히 이해합니다. 17px과 같은 모호한 값은 Arbitrary values([17px])로 변환하여 디자인의 정확도를 유지합니다.</Typography>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-10 rounded-[3rem] bg-black border border-slate-800 shadow-2xl">
                <Typography variant="small" className="text-indigo-400 font-mono mb-6 block text-center uppercase tracking-[0.2em] font-black">System Flow Architecture</Typography>
                <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800">
                  <pre className="mermaid text-sm text-white">
                    {`graph TD
    A[CSS Raw String] --> B{Lexical Analysis}
    B --> C[Property/Value Pairs]
    C --> D{Tailwind Mapper}
    D --> E[Standard Classes]
    D --> F[Arbitrary Values]
    E & F --> G[Prefix Handler]
    G --> H[Final Utility Class String]`}
                  </pre>
                  <Typography variant="small" className="text-slate-400 mt-6 block text-center italic">
                    * Mermaid 다이어그램을 통한 데이터 흐름 가시화 (고대비 렌더링)
                  </Typography>
                </div>
              </div>
            </div>
          </section>

          {/* 실무 활용 시나리오: 고대비 카드 */}
          <section className="space-y-12">
            <Typography variant="h2" className="text-4xl font-black text-center text-white">실무 활용 시나리오</Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { step: "01", title: "레거시 프로젝트 현대화", color: "text-indigo-400", desc: "수만 줄의 CSS 파일로 이루어진 기존 jQuery/PHP 프로젝트를 Next.js로 마이그레이션할 때 가장 큰 벽은 스타일입니다. 각 컴포넌트의 스타일을 복사하여 본 변환기에 입력하면, 즉시 React 컴포넌트에 적용 가능한 Tailwind 클래스를 얻을 수 있어 전체 개발 공기를 30% 이상 단축할 수 있습니다." },
                { step: "02", title: "피그마 디자인 구현", color: "text-cyan-400", desc: "디자이너가 전달한 Figma의 'Inspect' 패널에서 추출되는 CSS는 종종 불필요하게 복잡합니다. 이를 Tailwind로 수동 변환하는 대신, 복사 후 본 도구에 넣으세요. 표준화된 간격과 폰트 크기로 정제된 유틸리티 클래스가 당신의 코드를 훨씬 깔끔하게 만들어줍니다." },
                { step: "03", title: "디자인 시스템 통합", color: "text-purple-400", desc: "여러 프로젝트에서 사용되던 다양한 스타일 가이드를 하나의 Tailwind 설정으로 통합할 때, 기존 수치들이 Tailwind의 단위와 어떻게 매칭되는지 빠르게 파악하는 시뮬레이터로 활용할 수 있습니다. 일관성 없는 픽셀 값들을 표준 rem 단위로 교정하는 가이드라인이 됩니다." }
              ].map((item, i) => (
                <Card key={i} className="p-10 space-y-4 border-slate-800 bg-slate-900 shadow-xl hover:border-indigo-500/50 transition-all">
                  <div className={`${item.color} font-black text-5xl mb-4`}>{item.step}</div>
                  <Typography variant="h4" className="text-xl font-bold text-white">{item.title}</Typography>
                  <Typography variant="p" className="text-slate-200 text-sm leading-relaxed">
                    {item.desc}
                  </Typography>
                </Card>
              ))}
            </div>
          </section>

          {/* 기술적 배경 및 속성 비교 표: 고대비 다크 테마 표 */}
          <section className="space-y-12">
            <Typography variant="h2" className="text-4xl font-black text-white">기술적 배경 및 변환 표준</Typography>
            <Typography variant="p" className="text-lg text-slate-100 max-w-4xl font-medium">
              Tailwind CSS는 CSS의 모든 속성을 1:1로 대체하는 라이브러리가 아닙니다. 오히려 디자인 시스템의 철학을 코드에 녹여낸 프레임워크입니다. 본 변환기는 W3C의 CSS 명세와 Tailwind CSS v3/v4의 최신 사양을 준수합니다.
            </Typography>
            
            <div className="overflow-hidden rounded-3xl border border-slate-800 shadow-2xl">
              <table className="w-full text-left border-collapse bg-black">
                <thead>
                  <tr className="bg-slate-900 text-white border-b border-slate-800">
                    <th className="px-8 py-6 font-black uppercase tracking-wider text-sm">CSS Category</th>
                    <th className="px-8 py-6 font-black uppercase tracking-wider text-sm">Standard CSS</th>
                    <th className="px-8 py-6 font-black uppercase tracking-wider text-sm">Tailwind Output</th>
                    <th className="px-8 py-6 font-black uppercase tracking-wider text-sm">Accuracy</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {[
                    { cat: "Flexbox & Grid", css: "justify-content: center;", tw: "justify-center", acc: "100%", color: "text-green-400" },
                    { cat: "Spacing", css: "padding: 16px;", tw: "p-4", acc: "Calculated", color: "text-blue-400" },
                    { cat: "Colors", css: "border: 1px solid #000;", tw: "border border-black", acc: "Palette Match", color: "text-purple-400" },
                    { cat: "Typography", css: "font-weight: 700;", tw: "font-bold", acc: "Semantic", color: "text-yellow-400" }
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-slate-900/50 transition-colors">
                      <td className="px-8 py-6 font-bold text-indigo-400">{row.cat}</td>
                      <td className="px-8 py-6 font-mono text-xs text-slate-300">{row.css}</td>
                      <td className="px-8 py-6 text-white font-mono"><code>{row.tw}</code></td>
                      <td className="px-8 py-6"><Badge className={`${row.color} bg-white/5 border-none font-bold`}>{row.acc}</Badge></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* FAQ: 고대비 텍스트 조합 */}
          <section className="space-y-12 bg-slate-950 p-12 md:p-20 rounded-[3rem] border border-slate-800 relative">
            <div className="relative z-10 space-y-16">
              <div className="text-center space-y-4">
                <Typography variant="h2" className="text-4xl font-black text-white">자주 묻는 질문 (FAQ)</Typography>
                <Typography variant="p" className="text-slate-300 text-lg">마이그레이션 과정에서 발생하는 궁금증을 해결해 드립니다.</Typography>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                {[
                  { q: "Q1: [17px] 같은 대괄호 문법은 무엇인가요?", a: "이는 Tailwind의 <strong>Arbitrary Values</strong> 기능입니다. 기본 시스템에 없는 수치를 위해 사용되며, JIT 엔진이 이를 안전하게 해석하여 CSS를 생성합니다." },
                  { q: "Q2: !important가 포함된 스타일은요?", a: "클래스 앞에 느낌표(<code>!</code>)를 붙이는 방식으로 변환됩니다 (예: <code>!p-4</code>). 우선순위를 명시적으로 제어할 수 있습니다." },
                  { q: "Q3: 복잡한 그라데이션 지원 여부", a: "기본 그림자와 그라데이션은 지원하나, 복잡한 레이어는 Arbitrary value 구문으로 제안되므로 확인이 필요합니다." },
                  { q: "Q4: 변환된 클래스 정렬 방법", a: "가독성을 위해 본 사이트의 <strong>Tailwind 클래스 정렬 도구</strong>를 함께 활용하시는 것을 강력 추천합니다." },
                  { q: "Q5: 브라우저 보안 및 코드 전송", a: "본 도구는 <strong>100% 클라이언트 사이드</strong>에서 작동합니다. 코드는 서버로 전송되지 않아 매우 안전합니다." },
                  { q: "Q6: @media 쿼리 인식 범위", a: "md:, lg: 등 주요 중단점에 대한 미디어 쿼리 블록을 인식하여 접두사를 자동 부여합니다." }
                ].map((faq, i) => (
                  <div key={i} className="space-y-4 p-6 rounded-2xl bg-slate-900 border border-slate-800">
                    <h3 className="text-indigo-400 font-black text-xl">{faq.q}</h3>
                    <Typography variant="p" className="text-slate-100 leading-relaxed text-sm" dangerouslySetInnerHTML={{ __html: faq.a }} />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA: 강력한 대비의 마지막 섹션 */}
          <section className="space-y-12">
            <div className="p-16 rounded-[3rem] bg-white text-center space-y-8 shadow-2xl relative overflow-hidden">
              <div className="relative z-10 space-y-6">
                <Typography variant="h3" className="text-4xl font-black text-slate-950 italic tracking-tighter uppercase">Enhance Your Digital Experience</Typography>
                <Typography variant="p" className="text-xl text-slate-700 max-w-3xl mx-auto leading-relaxed font-bold">
                  디자인과 공학이 결합된 고도의 스타일링 설계를 지금 시작하십시오. VibeVisual의 도구는 개발자의 생산성을 새로운 차원으로 이끌며, 더 나은 디지털 미래를 구축하는 데 기여합니다.
                </Typography>
                <div className="flex flex-wrap justify-center gap-6 pt-6">
                  <Button size="lg" className="rounded-full px-12 h-16 text-lg font-bold bg-slate-950 text-white hover:bg-slate-800 shadow-2xl" asChild>
                    <a href="/tools/utility/tailwind-class-visualizer">Tailwind 시각화 도구</a>
                  </Button>
                  <Button size="lg" variant="outline" className="rounded-full px-12 h-16 text-lg font-bold border-slate-900 text-slate-900 hover:bg-slate-50" asChild>
                    <a href="/tools/generator/framer-motion-code-builder">Framer Motion 빌더</a>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </ToolLayout>
  );
}
