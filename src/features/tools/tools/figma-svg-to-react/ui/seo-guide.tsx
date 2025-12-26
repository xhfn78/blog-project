'use client';

import { Typography } from "@/shared/ui/typography";
import { Card } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { CheckCircle2, AlertCircle, ArrowRight, Share2, Rocket, Shield, Code2, Zap, Sparkles } from "lucide-react";

export function SeoGuide() {
  return (
    <div className="mt-20 space-y-24 pb-20 border-t pt-20">
      {/* 1. 도입부: 탄생 배경과 Pain Points */}
      <section className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <Badge variant="outline" className="px-4 py-1 border-primary/30 text-primary bg-primary/5">Deep Insight</Badge>
          <Typography variant="h2" className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
            디자인과 개발의 경계를 허무는 <br />
            <span className="text-primary">Figma SVG to React</span>의 실무 효율
          </Typography>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-slate-600 leading-relaxed">
          <p>
            현대적인 프론트엔드 개발 환경에서 디자인 도구인 피그마(Figma)와 개발 환경인 리액트(React) 사이의 전환은 매일 수십 번 반복됩니다. 하지만 피그마에서 내보낸(Export) 순수 SVG 코드를 리액트 프로젝트에 붙여넣는 과정은 생각보다 번거롭습니다. `stroke-width`와 같은 하이픈 속성을 `strokeWidth`로 일일이 수정해야 하며, 불필요한 XML 네임스페이스와 주석들은 코드 가독성을 해치고 번들 크기를 키우는 주범이 됩니다.
          </p>
          <p>
            V-Log 팀의 Figma SVG to React 변환기는 이러한 반복 작업에서 개발자를 해방시킵니다. 수동 수정 시 발생하는 휴먼 에러를 제거하고 디자인 시스템의 일관성을 유지합니다. 개발자가 로직에만 집중하게 돕는 이 도구는 생산성을 결정짓는 핵심 유틸리티입니다.
          </p>
        </div>
      </section>

      {/* 2. 작동 원리 */}
      <section className="bg-slate-950 rounded-[32px] p-8 md:p-16 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[100px] -z-10" />
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <Typography variant="h3" className="text-2xl md:text-3xl font-bold text-white">
              지능형 변환 프로세스
            </Typography>
            <Typography variant="p" className="text-slate-200">
              입력부터 출력까지, 코드가 정제되는 4단계 메커니즘
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
            {[
              { step: "01", title: "RAW 파싱", desc: "XML 구조 분석 및 메타데이터 제거", icon: <Code2 className="w-6 h-6" /> },
              { step: "02", title: "속성 최적화", desc: "하이픈 속성을 React camelCase로 변환", icon: <Zap className="w-6 h-6" /> },
              { step: "03", title: "테마 주입", desc: "currentColor를 통한 동적 색상 제어", icon: <Sparkles className="w-6 h-6" /> },
              { step: "04", title: "컴포넌트화", desc: "TS 타입 및 Props 인터페이스 생성", icon: <Rocket className="w-6 h-6" /> }
            ].map((item, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-4 hover:bg-white/10 transition-colors">
                <div className="text-primary font-mono text-sm">{item.step}</div>
                <div className="p-2 bg-primary/20 rounded-lg w-fit text-primary">{item.icon}</div>
                <Typography variant="h4" className="text-lg text-white font-bold">{item.title}</Typography>
                <Typography variant="p" className="text-xs text-slate-200 leading-relaxed">{item.desc}</Typography>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. 실무 활용 시나리오 */}
      <section className="max-w-5xl mx-auto space-y-12">
        <Typography variant="h3" className="text-2xl font-bold text-center">실무 도입 전후(Before & After) 비교</Typography>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-8 border-slate-200 hover:shadow-xl transition-shadow space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-500">
              <AlertCircle className="w-6 h-6" />
            </div>
            <Typography variant="h4" className="text-xl font-bold">기존 방식 (Manual)</Typography>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>• SVG 파일 다운로드 및 프로젝트 이동</li>
              <li>• 수동으로 10+개 속성 이름 수정</li>
              <li>• 색상 수정을 위해 코드 내부 하드코딩</li>
              <li>• <span className="text-red-500 font-medium">소요 시간: 아이콘당 약 5~10분</span></li>
            </ul>
          </Card>
          
          <div className="flex items-center justify-center hidden md:flex">
            <ArrowRight className="w-12 h-12 text-slate-200" />
          </div>

          <Card className="p-8 border-primary/20 bg-primary/[0.02] hover:shadow-xl transition-shadow space-y-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <Typography variant="h4" className="text-xl font-bold">V-Log 방식 (Automated)</Typography>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>• 피그마에서 즉시 복사 및 붙여넣기</li>
              <li>• 모든 속성 자동 camelCase 변환</li>
              <li>• currentColor 기반 테마 대응 완비</li>
              <li>• <span className="text-primary font-medium">소요 시간: 아이콘당 약 10초 미만</span></li>
            </ul>
          </Card>
        </div>
      </section>

      {/* 4. 기술적 배경 및 속성 비교 표 */}
      <section className="max-w-4xl mx-auto space-y-8">
        <Typography variant="h3" className="text-2xl font-bold">SVG vs React SVG 속성 비교 가이드</Typography>
        <Typography variant="p" className="text-slate-600 leading-relaxed">
          W3C SVG 표준과 React의 JSX 문법 사이에는 명확한 차이가 존재합니다. 아래 표는 우리 변환기가 자동으로 처리하는 핵심 속성들의 대조표입니다. 이 규칙을 숙지하면 디자인 시스템 구축 시 발생할 수 있는 잠재적 렌더링 오류를 사전에 방지할 수 있습니다.
        </Typography>
        <div className="border rounded-xl overflow-hidden shadow-sm">
          <div className="w-full overflow-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="px-4 py-3 font-bold text-slate-900">표준 SVG 속성 (Kebab-case)</th>
                  <th className="px-4 py-3 font-bold text-slate-900">React JSX 속성 (CamelCase)</th>
                  <th className="px-4 py-3 font-bold text-slate-900">변환 필요성</th>
                </tr>
              </thead>
              <tbody className="divide-y text-slate-600">
                <tr className="hover:bg-slate-50/50">
                  <td className="px-4 py-3 font-mono text-slate-500 text-xs">stroke-width</td>
                  <td className="px-4 py-3 font-mono text-primary font-bold text-xs">strokeWidth</td>
                  <td className="px-4 py-3 italic text-xs">필수 (미변환 시 런타임 경고)</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="px-4 py-3 font-mono text-slate-500 text-xs">fill-opacity</td>
                  <td className="px-4 py-3 font-mono text-primary font-bold text-xs">fillOpacity</td>
                  <td className="px-4 py-3 italic text-xs">필수</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="px-4 py-3 font-mono text-slate-500 text-xs">clip-path</td>
                  <td className="px-4 py-3 font-mono text-primary font-bold text-xs">clipPath</td>
                  <td className="px-4 py-3 italic text-xs">필수</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="px-4 py-3 font-mono text-slate-500 text-xs">#FF0000 (Static)</td>
                  <td className="px-4 py-3 font-mono text-emerald-600 font-bold text-xs">currentColor</td>
                  <td className="px-4 py-3 italic text-xs">권장 (테마 대응 유연성 확보)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. FAQ 섹션 */}
      <section className="max-w-3xl mx-auto space-y-10">
        <Typography variant="h3" className="text-2xl font-bold text-center">자주 묻는 질문 (FAQ)</Typography>
        <div className="space-y-6">
          <div className="space-y-2">
            <Typography variant="h4" className="text-lg font-bold">Q1: 입력한 SVG 소스 코드가 서버에 저장되나요?</Typography>
            <Typography variant="p" className="text-slate-600 leading-relaxed">
              아니요. 본 도구는 100% 클라이언트 사이드에서 작동합니다. 귀하가 붙여넣은 어떠한 디자인 자산도 외부 서버로 전송되거나 기록되지 않으므로, 기업 내부의 중요한 디자인 시스템 자산을 안전하게 처리할 수 있습니다.
            </Typography>
          </div>
          <div className="space-y-2">
            <Typography variant="h4" className="text-lg font-bold">Q2: Figma 외에 Adobe XD나 Sketch에서 만든 SVG도 호환되나요?</Typography>
            <Typography variant="p" className="text-slate-600 leading-relaxed">
              네, 호환됩니다. SVG 표준 규격을 따르는 모든 소스 코드를 지원합니다. 다만, Figma에 최적화된 메타데이터 제거 로직이 포함되어 있어 Figma에서 복사한 코드 사용 시 가장 깨끗한 결과물을 얻으실 수 있습니다.
            </Typography>
          </div>
          <div className="space-y-2">
            <Typography variant="h4" className="text-lg font-bold">Q3: currentColor 옵션을 켜면 무엇이 좋나요?</Typography>
            <Typography variant="p" className="text-slate-600 leading-relaxed">
              `currentColor`는 텍스트의 색상을 SVG의 색상으로 상속받게 해줍니다. 이 옵션을 켜면 컴포넌트의 부모 엘리먼트에서 `text-primary`나 `color: red`를 설정하는 것만으로 아이콘의 색상을 동적으로 제어할 수 있어 매우 편리합니다.
            </Typography>
          </div>
          <div className="space-y-2">
            <Typography variant="h4" className="text-lg font-bold">Q4: TypeScript를 사용하지 않는 프로젝트에서도 쓸 수 있나요?</Typography>
            <Typography variant="p" className="text-slate-600 leading-relaxed">
              네. 옵션에서 TypeScript 사용을 해제하면 순수 JavaScript(JSX) 코드가 생성됩니다. 필요에 따라 언제든지 옵션을 전환하여 프로젝트 성격에 맞는 코드를 획득하세요.
            </Typography>
          </div>
          <div className="space-y-2">
            <Typography variant="h4" className="text-lg font-bold">Q5: 생성된 코드에 className이나 props를 전달할 수 있나요?</Typography>
            <Typography variant="p" className="text-slate-600 leading-relaxed">
              기본적으로 생성되는 컴포넌트는 `{"{...props}"}`를 포함하고 있습니다. 따라서 컴포넌트 사용 시 `className`, `style`, `onClick` 등 모든 표준 SVG 속성을 전달하여 사용할 수 있습니다.
            </Typography>
          </div>
        </div>
      </section>

      {/* 하단 CTA 섹션 */}
      <section className="bg-primary/5 rounded-[40px] p-12 text-center space-y-8 max-w-5xl mx-auto border border-primary/10 shadow-sm">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-primary/20 text-primary text-sm font-medium">
          <Share2 className="w-4 h-4" /> Next Step for Your Project
        </div>
        <Typography variant="h3" className="text-3xl font-bold">디자인 시스템 구축의 마지막 퍼즐</Typography>
        <Typography variant="p" className="text-slate-600 max-w-2xl mx-auto">
          지금 바로 피그마 아이콘을 복사하여 리액트 컴포넌트로 변환해보세요. 
          반복적인 수동 작업은 우리에게 맡기고, 여러분은 더 멋진 사용자 경험을 만드는 데 집중하세요.
        </Typography>
        <div className="flex flex-wrap justify-center gap-4">
          <Card className="p-4 bg-white hover:border-primary/50 transition-colors cursor-pointer flex items-center gap-3">
            <Shield className="w-5 h-5 text-primary" />
            <div className="text-left">
              <p className="text-xs text-slate-400 font-medium">완벽한 보안</p>
              <p className="font-bold text-sm text-slate-800">로컬 브라우저 처리</p>
            </div>
          </Card>
          <Card className="p-4 bg-white hover:border-primary/50 transition-colors cursor-pointer flex items-center gap-3">
            <Zap className="w-5 h-5 text-primary" />
            <div className="text-left">
              <p className="text-xs text-slate-400 font-medium">압도적 속도</p>
              <p className="font-bold text-sm text-slate-800">1초 만에 코드 생성</p>
            </div>
          </Card>
        </div>

        {/* 내부 링크 추천 섹션 */}
        <div className="pt-12 border-t border-primary/10">
          <Typography variant="h4" className="text-lg font-bold mb-6 text-slate-800">함께 쓰면 좋은 개발 도구</Typography>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <a href="/tools/converter/css-to-tailwind" className="p-4 rounded-xl border bg-white hover:border-primary/50 transition-all group">
              <p className="font-bold text-sm group-hover:text-primary transition-colors">CSS to Tailwind</p>
              <p className="text-xs text-slate-500 mt-1">기존 CSS를 Tailwind 클래스로 변환</p>
            </a>
            <a href="/tools/converter/json-to-ts" className="p-4 rounded-xl border bg-white hover:border-primary/50 transition-all group">
              <p className="font-bold text-sm group-hover:text-primary transition-colors">JSON to TS</p>
              <p className="text-xs text-slate-500 mt-1">JSON을 TypeScript 인터페이스로 변환</p>
            </a>
            <a href="/tools/generator/framer-motion-code-builder" className="p-4 rounded-xl border bg-white hover:border-primary/50 transition-all group">
              <p className="font-bold text-sm group-hover:text-primary transition-colors">Framer Motion 빌더</p>
              <p className="text-xs text-slate-500 mt-1">애니메이션 코드를 시각적으로 생성</p>
            </a>
          </div>
        </div>
      </section>
    </div>
    );
  }
  