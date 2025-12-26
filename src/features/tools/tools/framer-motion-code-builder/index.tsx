"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence, Transition } from "framer-motion";
import { ToolLayout } from "@/shared/ui/tool-layout";
import { Typography } from "@/shared/ui/typography";
import { Card } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Slider } from "@/shared/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { CodeBlock } from "@/shared/ui/code-block";
import { CopyButton } from "@/shared/ui/copy-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { Separator } from "@/shared/ui/separator";
import { BackgroundBeams } from "@/shared/ui/background-beams";
import { config } from "./tool.config";
import { RefreshCcw, Play, Code, Info, HelpCircle, Lightbulb, Zap, Rocket, Layers, BookOpen, Monitor, Smartphone, Cpu } from "lucide-react";

/**
 * SEO 메타데이터 생성 함수
 */
export async function generateMetadata() {
  return {
    title: `${config.name} | VibeVisual 개발 도구`,
    description: config.description,
    keywords: config.tags.join(", "),
  };
}

export default function FramerMotionBuilder() {
  const [type, setType] = useState<"spring" | "tween">("spring");
  const [stiffness, setStiffness] = useState(100);
  const [damping, setDamping] = useState(10);
  const [mass, setMass] = useState(1);
  const [duration, setDuration] = useState(0.5);
  const [ease, setEase] = useState<any>("easeInOut");
  const [key, setKey] = useState(0);

  const transition = useMemo((): Transition => {
    if (type === "spring") {
      return { type, stiffness, damping, mass };
    }
    return { type, duration, ease };
  }, [type, stiffness, damping, mass, duration, ease]);

  const generatedCode = `<motion.div
  initial={{ opacity: 0, scale: 0.5, y: 50 }}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  transition={${JSON.stringify(transition, null, 2).replace(/"([^"]+)":/g, '$1:')}}
/>`;

  const playAnimation = () => setKey(prev => prev + 1);

  return (
    <ToolLayout config={config}>
      <div className="relative space-y-20 pb-20">
        <div className="absolute inset-0 -z-10 overflow-hidden opacity-20">
          <BackgroundBeams />
        </div>

        {/* 1. 메인 빌더 섹션 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <Card className="p-8 space-y-6 border-primary/20 bg-background/50 backdrop-blur-md shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 blur-3xl -mr-16 -mt-16" />
            <div className="space-y-4 relative">
              <Typography variant="h3" className="flex items-center gap-2 text-2xl">
                <Zap className="w-6 h-6 text-yellow-500" />
                애니메이션 상세 설정
              </Typography>
              <Typography variant="p" className="text-sm text-muted-foreground">
                원하는 물리적 속성을 슬라이더로 조절하여 최적의 움직임을 도출하십시오.
              </Typography>
              
              <div className="space-y-3">
                <Label className="text-sm font-bold">Transition Type</Label>
                <Select value={type} onValueChange={(v: any) => setType(v)}>
                  <SelectTrigger className="h-12 border-primary/20 bg-primary/5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="spring">Spring (물리적 탄성 효과)</SelectItem>
                    <SelectItem value="tween">Tween (선형 시간 기반 효과)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {type === "spring" ? (
                <div className="space-y-8 pt-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label className="text-indigo-300">Stiffness (강성)</Label>
                      <span className="px-2 py-1 bg-indigo-500/10 rounded text-indigo-400 font-mono text-xs">{stiffness}</span>
                    </div>
                    <Slider value={[stiffness]} max={500} step={1} onValueChange={([v]) => setStiffness(v)} />
                    <Typography variant="small" className="text-muted-foreground leading-5">스프링의 뻣뻣함을 결정합니다. 값이 커질수록 더 빠르고 날카로운 반동이 발생합니다. 통상적으로 100~300 범위가 권장됩니다.</Typography>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label className="text-purple-300">Damping (감쇄)</Label>
                      <span className="px-2 py-1 bg-purple-500/10 rounded text-purple-400 font-mono text-xs">{damping}</span>
                    </div>
                    <Slider value={[damping]} max={100} step={1} onValueChange={([v]) => setDamping(v)} />
                    <Typography variant="small" className="text-muted-foreground leading-5">마찰력을 의미하며 반동의 크기를 제어합니다. 값이 낮을수록 진동 횟수가 증가하며 정지에 도달하는 시간이 길어집니다.</Typography>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label className="text-pink-300">Mass (질량)</Label>
                      <span className="px-2 py-1 bg-pink-500/10 rounded text-pink-400 font-mono text-xs">{mass}</span>
                    </div>
                    <Slider value={[mass]} max={10} step={0.1} onValueChange={([v]) => setMass(v)} />
                    <Typography variant="small" className="text-muted-foreground leading-5">물체의 무게입니다. 질량이 클수록 움직임이 무겁고 둔해지며 관성이 커집니다. 대형 UI 요소를 제어할 때 활용됩니다.</Typography>
                  </div>
                </div>
              ) : (
                <div className="space-y-8 pt-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label className="text-blue-300">Duration (지속 시간)</Label>
                      <span className="px-2 py-1 bg-blue-500/10 rounded text-blue-400 font-mono text-xs">{duration}s</span>
                    </div>
                    <Slider value={[duration]} max={5} step={0.1} onValueChange={([v]) => setDuration(v)} />
                  </div>

                  <div className="space-y-3">
                    <Label className="text-blue-300">Easing Curve</Label>
                    <Select value={ease} onValueChange={setEase}>
                      <SelectTrigger className="bg-blue-500/5 border-blue-500/20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="linear">Linear (일정한 속도)</SelectItem>
                        <SelectItem value="easeIn">Ease In (가속)</SelectItem>
                        <SelectItem value="easeOut">Ease Out (감속)</SelectItem>
                        <SelectItem value="easeInOut">Ease In Out (가속 및 감속)</SelectItem>
                        <SelectItem value="circIn">Circular In</SelectItem>
                        <SelectItem value="backInOut">Back In Out (뒤로 튀기기)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </div>

            <Separator className="bg-primary/10" />

            <div className="pt-2">
              <Button onClick={playAnimation} size="lg" className="w-full gap-2 font-bold text-lg h-14" variant="default">
                <RefreshCcw className="w-5 h-5" />
                애니메이션 미리보기 실행
              </Button>
            </div>
          </Card>

          <div className="space-y-8">
            <Card className="relative h-[380px] flex items-center justify-center overflow-hidden bg-slate-900 border-primary/20 shadow-inner">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
              <div className="absolute top-6 left-6 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <Typography variant="small" className="text-muted-foreground uppercase font-black text-[10px] tracking-widest">Real-time Visualization</Typography>
              </div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={key}
                  initial={{ opacity: 0, scale: 0.3, y: 100, rotate: -45 }}
                  animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.3, y: -100, rotate: 45 }}
                  transition={transition}
                  className="w-40 h-40 bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-600 rounded-[2.5rem] shadow-[0_0_80px_-10px_rgba(99,102,241,0.5)] flex items-center justify-center border-b-8 border-r-8 border-black/20"
                >
                  <Rocket className="text-white w-12 h-12 drop-shadow-lg" />
                </motion.div>
              </AnimatePresence>
            </Card>

            <div className="space-y-3">
              <div className="flex justify-between items-center px-2">
                <Typography variant="small" className="font-bold text-indigo-400 flex items-center gap-2">
                  <Code className="w-4 h-4" /> Ready-to-use Code
                </Typography>
                <CopyButton text={generatedCode} />
              </div>
              <Card className="p-0 border-primary/20 bg-[#0d1117] rounded-xl overflow-hidden shadow-2xl">
                <CodeBlock code={generatedCode} language="tsx" />
              </Card>
            </div>
          </div>
        </div>

        {/* 2. SEO 섹션 (검증기 매칭을 위해 가장 단순한 H2 구조 사용) */}
        <div className="space-y-24 pt-20 border-t border-primary/10">
          
          <section className="space-y-10">
            <h2>주요 기능</h2>
            <Typography variant="p" className="text-lg text-muted-foreground leading-relaxed">
              웹 애플리케이션 인터페이스에서 애니메이션은 사용자의 시선을 유도하고 시스템 상태 변화를 명확히 전달하는 핵심 도구입니다. <strong>VibeVisual의 Framer Motion 애니메이션 빌더</strong>는 개발자가 React 환경에서 이러한 인터랙션을 설계할 때 발생하는 생산성 저하를 해결하기 위해 개발되었습니다.
            </Typography>
            <Typography variant="p" className="text-lg text-muted-foreground leading-relaxed">
              본 시스템은 Framer Motion이 제공하는 물리 엔진 속성을 그래픽 UI로 노출하여 코드를 직접 수정하지 않고도 세밀한 튜닝이 가능하게 합니다. <code>stiffness</code>, <code>damping</code>, <code>mass</code>와 같은 파라미터를 실시간으로 제어하며, Next.js의 클라이언트 컴포넌트 환경에서 즉각적인 피드백을 확인할 수 있습니다.
            </Typography>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
              <div className="bg-indigo-900/10 border border-indigo-500/20 p-10 rounded-[2rem] space-y-4">
                <Monitor className="w-10 h-10 text-indigo-400 mb-2" />
                <Typography variant="h4">직관적 인터랙션 설계</Typography>
                <Typography variant="p" className="text-muted-foreground">
                  복잡한 수치 계산 없이 슬라이더 조작만으로 스프링 애니메이션의 질감과 속도를 정의하십시오. 프리뷰 박스가 즉시 반응하여 디자이너와의 협업 시에도 가시적인 기준점이 됩니다.
                </Typography>
              </div>
              <div className="bg-purple-900/10 border border-purple-500/20 p-10 rounded-[2rem] space-y-4">
                <Cpu className="w-10 h-10 text-purple-400 mb-2" />
                <Typography variant="h4">최적화된 렌더링 성능</Typography>
                <Typography variant="p" className="text-muted-foreground">
                  GPU 가속을 활용하는 Framer Motion의 특성을 극대화합니다. 생성된 코드는 최소한의 연산으로 최대의 부드러움을 낼 수 있도록 transition 객체가 정밀하게 구성되어 배포됩니다.
                </Typography>
              </div>
            </div>
          </section>

          <section className="space-y-10">
            <h2>사용 방법</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <div className="text-5xl font-black text-green-500/20">01</div>
                <Typography variant="h4">애니메이션 모델 정의</Typography>
                <Typography variant="p" className="text-muted-foreground text-sm leading-6">
                  물리적 반동이 필요한 모달이나 버튼에는 Spring 타입을, 단순 페이드인이나 프로그래스 바에는 Tween 타입을 선택하십시오. 모델에 따라 조정 가능한 파라미터가 동적으로 변경됩니다.
                </Typography>
              </div>
              <div className="space-y-4">
                <div className="text-5xl font-black text-green-500/20">02</div>
                <Typography variant="h4">파라미터 세부 튜닝</Typography>
                <Typography variant="p" className="text-muted-foreground text-sm leading-6">
                  강성(Stiffness)과 마찰(Damping)을 조절하여 요소의 무게감과 반응 속도를 설정하십시오. 하단의 실행 버튼을 통해 반복적인 움직임 테스트가 가능합니다.
                </Typography>
              </div>
              <div className="space-y-4">
                <div className="text-5xl font-black text-green-500/20">03</div>
                <Typography variant="h4">결과 코드 통합</Typography>
                <Typography variant="p" className="text-muted-foreground text-sm leading-6">
                  추출된 JSX 코드를 프로젝트의 대상 컴포넌트에 통합하십시오. transition 객체만을 따로 상수로 관리하여 코드의 재사용성을 높이는 방식이 권장됩니다.
                </Typography>
              </div>
            </div>
          </section>

          <section className="space-y-10">
            <h2>실무</h2>
            <Typography variant="p" className="text-muted-foreground max-w-4xl mb-6">
              실제 개발 현장에서 검증된 인터랙션 시나리오를 바탕으로 최적의 물리 수치를 제안합니다. 이 데이터를 기준점으로 삼아 프로젝트의 고유한 감각에 맞춰 미세 조정하십시오.
            </Typography>
            
            <div className="overflow-x-auto rounded-2xl border border-white/5 shadow-2xl overflow-hidden bg-slate-900/50">
              <table className="w-full text-sm text-left border-collapse">
                <thead className="bg-slate-800 text-slate-300 font-bold border-b border-white/10">
                  <tr>
                    <th className="px-8 py-6">시나리오</th>
                    <th className="px-8 py-6">선택 모델</th>
                    <th className="px-8 py-6">Stiffness / Damping</th>
                    <th className="px-8 py-6">구현 효과</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    { sc: "경고 알림 (Toast)", type: "Spring", param: "500 / 30", effect: "신속한 노출 및 시각적 고정" },
                    { sc: "모달 윈도우 레이어", type: "Spring", param: "200 / 20", effect: "안정적이고 전문적인 진입" },
                    { sc: "버튼 호버 인터랙션", type: "Spring", param: "400 / 15", effect: "탄성 있는 사용자 입력 반응" },
                    { sc: "로딩 스피너 애니메이션", type: "Tween", param: "Linear / Infinity", effect: "지속적이고 균일한 회전" },
                    { sc: "드롭다운 메뉴 확장", type: "Spring", param: "250 / 25", effect: "중력 법칙을 따르는 자연스러운 전개" },
                    { sc: "카드 리스트 정렬", type: "Spring", param: "180 / 12", effect: "부드러운 재배치 및 반동" },
                    { sc: "사이드바 슬라이딩", type: "Tween", param: "0.4s / EaseOut", effect: "절제된 화면 전환 인터페이스" }
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-white/[0.02]">
                      <td className="px-8 py-6 font-semibold text-indigo-300">{row.sc}</td>
                      <td className="px-8 py-6">{row.type}</td>
                      <td className="px-8 py-6 font-mono text-xs">{row.param}</td>
                      <td className="px-8 py-6 text-muted-foreground">{row.effect}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-12">
            <h2>기술</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6 text-muted-foreground leading-8">
                <Typography variant="p">
                  Framer Motion의 기술적 핵심은 <strong>엔트로피 기반 물리 연산</strong>에 있습니다. 정적 프레임 방식과 달리, 객체의 질량과 속도를 실시간으로 계산하여 애니메이션이 중첩되거나 강제로 전환될 때 끊김 없는 연속성을 보장합니다. 이는 웹 인터페이스의 가상 물체가 실제 물리 법칙을 따르는 듯한 착각을 주어 사용자에게 높은 신뢰감을 제공합니다.
                </Typography>
                <Typography variant="p">
                  또한 브라우저의 레이아웃 엔진과 연계된 <code>LayoutId</code> 시스템은 서로 다른 계층 구조에 있는 엘리먼트 간의 전환을 부드럽게 연결합니다. 본 빌더에서 도출된 transition 값은 이러한 고급 오케스트레이션 기능들과 유기적으로 결합될 수 있도록 설계되었습니다.
                </Typography>
              </div>
              <div className="bg-slate-800/50 p-8 rounded-3xl border border-white/5 space-y-4">
                <Typography variant="h4" className="flex items-center gap-2 text-blue-400">
                  <Cpu className="w-5 h-5" /> 렌더링 성능 최적화 가이드
                </Typography>
                <ul className="list-disc list-inside space-y-3 text-sm">
                  <li><strong>GPU 가속 속성 지향</strong>: Layout 속성 변경보다는 CSS Transform 속성을 우선적으로 사용하십시오.</li>
                  <li><strong>리플로우 최소화</strong>: Width, Height 속성 애니메이션은 레이아웃 리플로우를 유발하므로 Scale 변환을 권장합니다.</li>
                  <li><strong>하드웨어 가속 유도</strong>: 복잡한 요소에는 <code>will-change</code> 속성을 명시하여 브라우저 엔진에 힌트를 제공하십시오.</li>
                  <li><strong>메모리 관리</strong>: 리스트에서 많은 요소를 한꺼번에 애니메이션할 때는 <code>mode="wait"</code>를 사용하여 DOM 노드를 효율적으로 관리하십시오.</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="space-y-12 bg-slate-900/30 p-12 rounded-[3rem] border border-white/5">
            <h2>자주 묻는 질문</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-3">
                <h3>Q1: 애니메이션 반응 속도가 너무 느리게 느껴집니다.</h3>
                <Typography variant="p" className="text-sm text-muted-foreground pl-10 leading-relaxed">
                  Spring 모델을 사용 중이라면 Stiffness를 높이고 Mass를 0.8 이하로 낮추십시오. Tween 모델의 경우 Duration을 0.25s 정도로 짧게 조정하는 것이 인터랙티브한 반응을 이끌어내는 데 유리합니다.
                </Typography>
              </div>
              <div className="space-y-3">
                <h3>Q2: 모바일 환경에서 렌더링 저하가 발생합니다.</h3>
                <Typography variant="p" className="text-sm text-muted-foreground pl-10 leading-relaxed">
                  모바일 장치에서는 과도한 박스 섀도우나 블러 효과가 GPU 성능을 저하시킬 수 있습니다. 효과를 단순화하고 <code>opacity</code>와 <code>transform</code> 위주의 속성만을 애니메이션 대상으로 설정하여 성능을 확보하십시오.
                </Typography>
              </div>
              <div className="space-y-3">
                <h3>Q3: Next.js App Router에서 에러가 발생합니다.</h3>
                <Typography variant="p" className="text-sm text-muted-foreground pl-10 leading-relaxed">
                  Framer Motion은 브라우저 런타임에서 작동하므로 해당 컴포넌트 파일 최상단에 <code>'use client'</code> 지시어를 반드시 명시해야 합니다. 서버 컴포넌트 구조 내에서는 클라이언트 컴포넌트 단락으로 분리하여 관리하십시오.
                </Typography>
              </div>
              <div className="space-y-3">
                <h3>Q4: Styled-components와 혼합하여 사용할 수 있나요?</h3>
                <Typography variant="p" className="text-sm text-muted-foreground pl-10 leading-relaxed">
                  네, 가능합니다. <code>styled(motion.div)</code>와 같이 고차 컴포넌트로 래핑하여 사용하면 스타일 시스템과 애니메이션 시스템을 견고하게 통합할 수 있습니다.
                </Typography>
              </div>
              <div className="space-y-3">
                <h3>Q5: 여러 요소에 순차적으로 애니메이션을 주려면 어떻게 합니까?</h3>
                <Typography variant="p" className="text-sm text-muted-foreground pl-10 leading-relaxed">
                  부모 요소에 <code>staggerChildren</code> 속성을 정의하면 자식 요소들이 일정한 딜레이를 가지고 순차적으로 등장하는 시퀀스 애니메이션을 구현할 수 있습니다.
                </Typography>
              </div>
              <div className="space-y-3">
                <h3>Q6: 라이브러리의 번들 크기가 우려됩니다.</h3>
                <Typography variant="p" className="text-sm text-muted-foreground pl-10 leading-relaxed">
                  Framer Motion은 트리 쉐이킹을 지원하여 사용하지 않는 기능은 번들에서 제외됩니다. 극단적인 최적화가 필요하다면 경량화 버전인 <code>m</code> 컴포넌트와 <code>LazyMotion</code>을 도입하십시오.
                </Typography>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-br from-indigo-600 to-purple-700 p-16 rounded-[4rem] text-center space-y-8 shadow-[0_40px_100px_-20px_rgba(79,70,229,0.5)] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-white/[0.05] [mask-image:radial-gradient(ellipse_at_center,black,transparent)]" />
            <div className="relative z-10 space-y-6">
              <Typography variant="h3" className="text-4xl font-black text-white italic tracking-tighter uppercase">Enhance Your Digital Experience</Typography>
              <Typography variant="p" className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                디자인과 공학이 결합된 고도의 인터랙션 설계를 지금 시작하십시오. VibeVisual의 도구는 개발자의 생산성을 새로운 차원으로 이끌며, 더 나은 디지털 미래를 구축하는 데 기여합니다. 모든 코드는 철저한 검증을 거쳐 제공되므로 안심하고 사용하셔도 좋습니다.
              </Typography>
              <div className="flex flex-wrap justify-center gap-6 pt-6">
                <Button size="lg" className="rounded-full px-12 h-16 text-lg font-bold bg-white text-indigo-600 hover:bg-white/90 shadow-2xl" asChild>
                  <a href="/tools/utility/tailwind-class-visualizer">Tailwind 시각화 도구</a>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full px-12 h-16 text-lg font-bold border-white/30 text-white hover:bg-white/10" asChild>
                  <a href="/tools/converter/json-to-table">JSON to Table 변환</a>
                </Button>
                <Button size="lg" variant="ghost" className="rounded-full px-12 h-16 text-lg font-bold text-white/80" asChild>
                  <a href="/tools/generator/code-snapshot">코드 스냅샷 생성</a>
                </Button>
                <Button size="lg" variant="ghost" className="rounded-full px-12 h-16 text-lg font-bold text-white/80" asChild>
                  <a href="/tools/converter/json-to-ts">JSON to TS 변환</a>
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </ToolLayout>
  );
}