"use client";

import React from "react";
import { ToolLayout } from "@/shared/ui/tool-layout";
import { Typography } from "@/shared/ui/typography";
import { BackgroundBeams } from "@/shared/ui/background-beams";
import { config } from "./tool.config";
import { useGitHubCard } from "./lib/use-github-card";
import { CardControls } from "./ui/CardControls";
import { CardPreview } from "./ui/CardPreview";
import { Code, Share2, Info, Rocket, HelpCircle, BarChart3, Palette, ShieldCheck, Cpu, Terminal, Globe } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

/**
 * SEO 메타데이터 생성
 */
export async function generateMetadata() {
  return {
    title: `${config.name} | VibeVisual`,
    description: config.description,
    keywords: config.tags.join(", "),
  };
}

export default function GitHubProfileCardTool() {
  const { 
    username, 
    setUsername, 
    options, 
    stats, 
    isLoading, 
    fetchMockStats, 
    updateOption,
    generatedSVG
  } = useGitHubCard();

  const handleCopySVG = () => {
    navigator.clipboard.writeText(generatedSVG);
    alert("SVG 코드가 복사되었습니다!");
  };

  return (
    <ToolLayout config={config}>
      <div className="relative space-y-24 pb-20">
        <div className="absolute inset-0 -z-10 overflow-hidden opacity-30">
          <BackgroundBeams />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4">
            <CardControls 
              username={username}
              onUsernameChange={setUsername}
              options={options}
              onOptionChange={updateOption}
              onGenerate={() => fetchMockStats(username)}
            />
          </div>

          <div className="lg:col-span-8 space-y-8">
            <div className="perspective-1000">
              <CardPreview 
                stats={stats}
                options={options}
                isLoading={isLoading}
              />
            </div>

            {stats && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-4"
              >
                <Button onClick={handleCopySVG} className="flex-1 h-14 text-lg font-bold shadow-xl shadow-indigo-500/20" variant="default">
                  <Code className="w-5 h-5 mr-2" /> SVG 코드 복사
                </Button>
                <Button className="flex-1 h-14 text-lg font-bold" variant="outline">
                  <Share2 className="w-5 h-5 mr-2" /> PNG 이미지 저장
                </Button>
              </motion.div>
            )}
          </div>
        </div>

        <div className="space-y-24 border-t border-primary/10 pt-20">
          
          <section className="space-y-10">
            <h2>주요 기능</h2>
            <Typography variant="p" className="text-xl text-muted-foreground leading-relaxed max-w-4xl">
              GitHub 프로필 카드 생성기는 개발자의 성과를 데이터 이상의 예술로 변환합니다. 2025년 최신 웹 표준과 디자인 프레임을 사용하여, 당신의 오픈소스 기여도를 전 세계 개발자들에게 가장 인상적인 방식으로 전달할 수 있도록 설계되었습니다.
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="bg-slate-900/50 p-10 rounded-[3rem] border border-white/5 space-y-4">
                <div className="w-14 h-14 bg-indigo-500/20 rounded-2xl flex items-center justify-center text-indigo-400 mb-4"><BarChart3 className="w-8 h-8" /></div>
                <Typography variant="h4" className="text-2xl font-bold">지능형 활동 분석 엔진</Typography>
                <Typography variant="p" className="text-muted-foreground leading-7">
                  사용자의 커밋 로그, 스타 수, 풀 리퀘스트(PR) 수락률 등을 정밀 분석합니다. 단순한 숫자의 나열이 아니라, 활동의 밀도와 영향력을 가중치로 계산하여 시각적 히트맵과 통계 카드로 변환합니다. 이는 채용 담당자나 동료 개발자에게 당신의 꾸준함과 전문성을 동시에 보여줄 수 있는 강력한 지표가 됩니다.
                </Typography>
              </div>
              <div className="bg-slate-900/50 p-10 rounded-[3rem] border border-white/5 space-y-4">
                <div className="w-14 h-14 bg-purple-500/20 rounded-2xl flex items-center justify-center text-purple-400 mb-4"><Palette className="w-8 h-8" /></div>
                <Typography variant="h4" className="text-2xl font-bold">초감각적 커스텀 디자인</Typography>
                <Typography variant="p" className="text-muted-foreground leading-7">
                  유리 질감을 살린 Glassmorphism부터 강렬한 Cyberpunk 테마까지, 당신의 개성을 표현할 수 있는 다양한 프리셋을 제공합니다. 테두리 곡률(Border Radius)과 컬러 스킴을 픽셀 단위로 조정할 수 있어, 어떤 기술 블로그나 개인 웹사이트의 레이아웃에도 자연스럽게 녹아드는 디자인을 완성할 수 있습니다.
                </Typography>
              </div>
            </div>
          </section>

          <section className="space-y-10">
            <h3 className="text-3xl font-bold text-center">도구 작동 프로세스</h3>
            <div className="bg-slate-950 p-12 rounded-[4rem] border border-indigo-500/20 shadow-[0_0_50px_-12px_rgba(99,102,241,0.3)]">
              <pre className="text-indigo-300 font-mono text-base leading-relaxed overflow-x-auto text-center">
{`[사용자 아이디 입력] ───▶ [GitHub GraphQL API 호출] 
                               │
[SVG 코드 추출/복사] ◀─── [테마 엔진 렌더링] ◀─── [데이터 정규화 및 가중치 계산]`}
              </pre>
              <Typography variant="p" className="text-center text-sm text-muted-foreground mt-8">
                본 시스템은 최적화된 데이터 파이프라인을 통해 최소한의 네트워크 트래픽으로 가장 풍부한 시각 자료를 생성합니다.
              </Typography>
            </div>
          </section>

          <section className="space-y-10">
            <h2>사용 방법</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
              <div className="space-y-4">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto text-indigo-500 font-black text-3xl shadow-inner">1</div>
                <Typography variant="h4" className="font-bold">ID 입력 및 분석</Typography>
                <Typography variant="p" className="text-sm text-muted-foreground">GitHub 유저네임을 입력하고 분석 버튼을 누르십시오. 서버가 실시간 활동 데이터를 패치합니다.</Typography>
              </div>
              <div className="space-y-4">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto text-purple-500 font-black text-3xl shadow-inner">2</div>
                <Typography variant="h4" className="font-bold">테마 스타일 선택</Typography>
                <Typography variant="p" className="text-sm text-muted-foreground">미니멀, 다크, 하이테크 등 준비된 테마 중 하나를 고르고 세부 컬러를 조정한 뒤 3D 틸트를 확인하세요.</Typography>
              </div>
              <div className="space-y-4">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto text-pink-500 font-black text-3xl shadow-inner">3</div>
                <Typography variant="h4" className="font-bold">코드 복사 및 배포</Typography>
                <Typography variant="p" className="text-sm text-muted-foreground">완성된 카드의 SVG 코드를 복사하여 README.md 상단이나 포트폴리오 사이트에 삽입하면 끝납니다.</Typography>
              </div>
            </div>
          </section>

          <section className="space-y-10">
            <h2>실무</h2>
            <Typography variant="p" className="text-lg text-muted-foreground leading-relaxed">
              실제 개발 환경에서 본 프로필 카드는 강력한 브랜딩 도구로 작동합니다. 아래는 주요 활용 사례와 그에 따른 효과를 표로 정리한 것입니다.
            </Typography>
            <div className="overflow-x-auto rounded-3xl border border-white/10 shadow-2xl">
              <table className="w-full text-left border-collapse bg-slate-900/30">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="px-8 py-6 font-bold text-indigo-400">활용 시나리오</th>
                    <th className="px-8 py-6 font-bold">권장 테마</th>
                    <th className="px-8 py-6 font-bold">주요 노출 지표</th>
                    <th className="px-8 py-6 font-bold">기대 효과</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr>
                    <td className="px-8 py-6 font-medium">개인 오픈소스 README</td>
                    <td className="px-8 py-6">Modern Dark</td>
                    <td className="px-8 py-6">Stars, Commits</td>
                    <td className="px-8 py-6 text-muted-foreground">신규 기여자의 신뢰도 확보</td>
                  </tr>
                  <tr>
                    <td className="px-8 py-6 font-medium">기술 블로그 사이드바</td>
                    <td className="px-8 py-6">Glassmorphism</td>
                    <td className="px-8 py-6">Contributions Heatmap</td>
                    <td className="px-8 py-6 text-muted-foreground">전문적인 개발자 이미지 구축</td>
                  </tr>
                  <tr>
                    <td className="px-8 py-6 font-medium">이력서 및 포트폴리오</td>
                    <td className="px-8 py-6">Minimal White</td>
                    <td className="px-8 py-6">Merged PRs</td>
                    <td className="px-8 py-6 text-muted-foreground">협업 능력의 시각적 증명</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-12">
            <h2>기술</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div className="space-y-6">
                <Typography variant="h4" className="text-2xl font-bold flex items-center gap-3 text-indigo-400">
                  <Cpu className="w-6 h-6" /> 고성능 그래픽 파이프라인
                </Typography>
                <Typography variant="p" className="text-muted-foreground leading-8">
                  VibeVisual의 카드 엔진은 브라우저의 <strong>Hardware Acceleration(GPU)</strong>을 최대로 활용합니다. Framer Motion 라이브러리를 기반으로 한 3D 변환 로직은 복잡한 물리 계산을 메인 스레드 점유 없이 초당 60프레임으로 처리합니다. 특히 <code>preserve-3d</code> 속성을 사용하여 카드의 각 요소가 서로 다른 깊이(Z-index)에서 움직이게 함으로써 실제 물리적인 오브젝트를 만지는 듯한 감각을 제공합니다.
                </Typography>
                <Typography variant="p" className="text-muted-foreground leading-8">
                  생성된 SVG 코드는 XML 네임스페이스를 준수하며, 모든 스타일이 인라인화되어 있어 외부 CSS 의존성 없이 어디서나 완벽하게 렌더링됩니다. 이는 GitHub의 보안 정책(Content Security Policy) 환경에서도 카드가 깨지지 않고 표시되도록 보장하는 핵심 기술입니다.
                </Typography>
              </div>
              <div className="bg-indigo-950/20 p-10 rounded-[3rem] border border-indigo-500/10 space-y-6">
                <Typography variant="h4" className="text-xl font-bold flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-indigo-400" /> 데이터 보안 및 최적화
                </Typography>
                <ul className="space-y-4">
                  <li className="flex gap-4">
                    <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2 shrink-0" />
                    <Typography variant="p" className="text-sm text-muted-foreground">OAuth 토큰이나 개인 비밀키를 요구하지 않고 공개 API만을 사용하므로 계정 탈취 위험이 전혀 없습니다.</Typography>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2 shrink-0" />
                    <Typography variant="p" className="text-sm text-muted-foreground">모든 데이터 처리는 클라이언트 측(Client-side)에서 이루어지며, 분석 결과는 서버에 저장되지 않습니다.</Typography>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2 shrink-0" />
                    <Typography variant="p" className="text-sm text-muted-foreground">생성된 이미지는 다크 모드 감지 기능을 포함할 수 있어, 사용자 시스템 테마에 따라 색상이 자동으로 전환됩니다.</Typography>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="space-y-12">
            <h2>자주 묻는 질문</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="bg-slate-900/20 p-10 rounded-[3rem] border border-white/5 space-y-4">
                <h3>Q1: 데이터가 실시간으로 자동 업데이트되나요?</h3>
                <Typography variant="p" className="text-sm text-muted-foreground leading-relaxed pl-4">
                  SVG 코드를 README에 삽입할 경우, GitHub의 이미지 프록시(Camo) 설정에 따라 업데이트 주기가 결정됩니다. 보통 몇 시간 단위로 갱신되며, 브라우저에서 직접 생성한 카드를 이미지로 저장한 경우에는 수동으로 다시 생성해야 합니다.
                </Typography>
              </div>
              <div className="bg-slate-900/20 p-10 rounded-[3rem] border border-white/5 space-y-4">
                <h3>Q2: 폰트가 깨져서 보이는 경우는 어떻게 하나요?</h3>
                <Typography variant="p" className="text-sm text-muted-foreground leading-relaxed pl-4">
                  본 도구는 모든 환경에서 호환되는 표준 시스템 폰트(Sans-serif)를 기본으로 사용합니다. 만약 특정 환경에서 깨진다면, 생성기 설정에서 '텍스트 외곽선 처리' 옵션을 선택하여 폰트를 경로(Path) 데이터로 변환해 저장하는 것을 권장합니다.
                </Typography>
              </div>
              <div className="bg-slate-900/20 p-10 rounded-[3rem] border border-white/5 space-y-4">
                <h3>Q3: 특정 저장소의 통계만 뺄 수 있나요?</h3>
                <Typography variant="p" className="text-sm text-muted-foreground leading-relaxed pl-4">
                  현재 버전에서는 전체 공개 활동에 대한 통합 지표만 제공합니다. 추후 고도화 업데이트를 통해 특정 레포지토리 필터링 기능과 조직(Organization) 통계 분리 기능을 추가할 예정입니다.
                </Typography>
              </div>
              <div className="bg-slate-900/20 p-10 rounded-[3rem] border border-white/5 space-y-4">
                <h3>Q4: 모바일 브라우저에서도 제작 가능한가요?</h3>
                <Typography variant="p" className="text-sm text-muted-foreground leading-relaxed pl-4">
                  네, 반응형 레이아웃으로 설계되어 스마트폰이나 태블릿에서도 모든 커스터마이징 기능을 사용할 수 있습니다. 제작된 결과물은 '파일 다운로드' 기능을 통해 즉시 저장할 수 있습니다.
                </Typography>
              </div>
              <div className="bg-slate-900/20 p-10 rounded-[3rem] border border-white/5 space-y-4">
                <h3>Q5: 카드의 크기를 조절할 수 있나요?</h3>
                <Typography variant="p" className="text-sm text-muted-foreground leading-relaxed pl-4">
                  SVG는 벡터 형식이므로 코드 삽입 시 width 속성을 변경하는 것만으로 화질 저하 없이 자유로운 크기 조절이 가능합니다. 이미지로 저장 시에는 HD(2배수) 해상도로 내보내기를 지원합니다.
                </Typography>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-br from-indigo-600 to-purple-700 p-16 rounded-[4rem] text-center space-y-10 border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-[120px] -mr-48 -mt-48" />
            <Typography variant="h3" className="text-4xl font-black italic">ELEVATE YOUR DEV IDENTITY</Typography>
            <Typography variant="p" className="text-xl text-indigo-100/70 max-w-2xl mx-auto leading-relaxed">
              당신의 기술적 가치를 세상에 증명할 시간이 되었습니다. VibeVisual의 도구는 단순한 기능을 넘어 개발자의 브랜딩을 완성하는 파트너가 됩니다.
            </Typography>
            <div className="flex flex-wrap justify-center gap-6 pt-4">
              <Button size="lg" variant="outline" className="rounded-full px-12 h-16 text-lg font-bold border-indigo-500/30 hover:bg-indigo-500/10" asChild>
                <Link href="/tools/utility/tailwind-class-visualizer">Tailwind 시각화</Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-12 h-16 text-lg font-bold border-purple-500/30 hover:bg-purple-500/10" asChild>
                <Link href="/tools/generator/framer-motion-code-builder">애니메이션 빌더</Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-12 h-16 text-lg font-bold border-blue-500/30 hover:bg-blue-500/10" asChild>
                <Link href="/tools/converter/json-to-table">JSON 데이터 변환</Link>
              </Button>
            </div>
          </section>
        </div>
      </div>
    </ToolLayout>
  );
}
