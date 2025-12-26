'use client';

import React from "react";
import { Typography } from "@/shared/ui/typography";
import { Button } from "@/shared/ui/button";
import { Monitor, Cpu } from "lucide-react";
import Link from "next/link";

export function SeoGuide() {
  return (
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
            디자인과 공학이 결합된 고도의 인터랙션 설계를 지금 시작하십시오. VibeVisual의 도구는 개발자의 생산성을 새로운 차원으로 이끌며, 더 나은 디지털 미래를 구축하는 데 기여합니다.
          </Typography>
          <div className="flex flex-wrap justify-center gap-6 pt-6">
            <Button size="lg" className="rounded-full px-12 h-16 text-lg font-bold bg-white text-indigo-600 hover:bg-white/90 shadow-2xl" asChild>
              <Link href="/utility/tailwind-class-visualizer">Tailwind 시각화 도구</Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-12 h-16 text-lg font-bold border-white/30 text-white hover:bg-white/10" asChild>
              <Link href="/converter/json-to-table">JSON to Table 변환</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
