"use client";

import { TOOLS_REGISTRY } from "@/shared/config/tools-registry";
import { ToolGrid } from "@/features/tools/ui/tool-grid";
import { Tool } from "@/entities/content/model/types";
import { Button } from "@/shared/ui/button";
import Link from "next/link";
import { Spotlight } from "@/shared/ui/spotlight";
import { BackgroundBeams } from "@/shared/ui/background-beams";
import { BentoGrid, BentoGridItem } from "@/shared/ui/bento-grid";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  RefreshCw,
  ArrowRight,
  Code2,
  Terminal
} from "lucide-react";

export default function Home() {
  const allTools: Tool[] = TOOLS_REGISTRY.map(reg => ({
    id: reg.slug,
    type: 'tool',
    title: reg.name,
    slug: reg.slug,
    description: reg.description,
    createdAt: new Date(),
    updatedAt: new Date(),
    published: true,
    category: reg.category,
    component: reg.slug,
    tags: reg.tags,
    author: reg.author,
    featured: reg.featured ?? false,
    usageCount: 0,
  }));

  const featuredTools = allTools
    .sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    })
    .slice(0, 6);

  const features = [
    {
      title: "즉시 실행되는 도구",
      description: "복잡한 설정 없이 브라우저에서 즉시 실행되는 10개 이상의 전문 도구.",
      header: (
        <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-neutral-100 dark:bg-neutral-900 overflow-hidden relative border border-neutral-200 dark:border-neutral-800 p-2">
          <div className="flex gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <div className="w-2 h-2 rounded-full bg-yellow-500" />
            <div className="w-2 h-2 rounded-full bg-green-500" />
          </div>
          <div className="font-mono text-[10px] text-blue-500">$ npm install vibe-tools</div>
          <div className="font-mono text-[10px] text-neutral-400 mt-1">{">"} Loading 15 utility tools...</div>
          <div className="font-mono text-[10px] text-emerald-500 mt-1">{">"} Ready in 0.2s!</div>
          <div className="absolute bottom-0 right-0 p-2 opacity-10">
            <Terminal size={80} />
          </div>
        </div>
      ),
      icon: <Terminal className="h-4 w-4 text-blue-500" />,
      className: "md:col-span-2",
    },
    {
      title: "Zero-Data Privacy",
      description: "서버 저장 없이 브라우저 내 로컬 환경에서 모든 작업이 완결됩니다.",
      header: (
        <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 flex items-center justify-center">
          <ShieldCheck className="w-12 h-12 text-emerald-500/50 animate-pulse" />
        </div>
      ),
      icon: <ShieldCheck className="h-4 w-4 text-emerald-500" />,
      className: "md:col-span-1",
    },
    {
      title: "개발자 중심 UX",
      description: "불필요한 클릭을 줄이고 단축키와 자동화를 우선시합니다.",
      header: (
        <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-neutral-900 border border-neutral-800 p-3 space-y-2">
          <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-blue-500"
              initial={{ width: "0%" }}
              animate={{ width: "80%" }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <div className="h-1.5 w-2/3 bg-neutral-800 rounded-full" />
          <div className="h-1.5 w-1/2 bg-neutral-800 rounded-full" />
        </div>
      ),
      icon: <Code2 className="h-4 w-4 text-purple-500" />,
      className: "md:col-span-1",
    },
    {
      title: "Continuous Evolution",
      description: "매주 새로운 도구가 업데이트되며, 오픈소스로 모든 로직이 공개됩니다.",
      header: (
        <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-tr from-orange-500/5 to-pink-500/5 border border-orange-500/10 relative overflow-hidden p-4">
          <RefreshCw className="absolute -right-4 -bottom-4 w-24 h-24 text-orange-500/10 animate-spin-slow" />
          <div className="text-xl font-bold text-orange-500/50">v1.2.0 → v2.0.0</div>
          <div className="text-[10px] text-neutral-500 mt-2">New: VibeVisual PRO 🚀</div>
        </div>
      ),
      icon: <RefreshCw className="h-4 w-4 text-orange-500" />,
      className: "md:col-span-2",
    },
  ];

  return (
    <div className="w-full bg-background selection:bg-primary/30">
      {/* Hero Section */}
      <section className="relative w-full h-[85vh] flex flex-col items-center justify-center overflow-hidden border-b border-neutral-200 dark:border-neutral-800">
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="var(--brand-primary)" />
        <BackgroundBeams />
        
        <div className="relative z-10 w-full max-w-7xl px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-6 border border-primary/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Next-Gen Developer Tools
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] pb-4">
              IDE BEYOND <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-500 to-orange-500 animate-gradient-x">
                THE BROWSER
              </span>
            </h1>
            <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed px-4">
              설치 없는 강력함. 바이브코딩은 웹 브라우저를 <br className="hidden md:block" />
              전문 개발 환경으로 변환하는 하이엔드 도구 모음입니다.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-6"
          >
            <Link href="/tools">
              <Button size="lg" className="h-16 rounded-2xl px-10 text-lg font-bold shadow-[0_20px_40px_rgba(59,130,246,0.3)] hover:translate-y-[-4px] transition-all">
                전문 도구 시작하기
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg" className="h-16 rounded-2xl px-10 text-lg font-bold border-2 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-all">
                기술 스택 확인
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* 하단 페이드 */}
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      </section>

      {/* Features Section */}
      <section className="py-32">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between mb-24 gap-10">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
                BUILT FOR <br /> ENGINEERS.
              </h2>
              <p className="text-muted-foreground text-xl leading-relaxed">
                바이브코딩은 단순한 웹사이트가 아닙니다. 
                매일 반복되는 지루한 작업을 0초로 단축하기 위한 엔지니어링의 결과물입니다.
              </p>
            </div>
            <div className="flex-1 w-full max-w-2xl">
              <BentoGrid>
                {features.map((item, i) => (
                  <BentoGridItem
                    key={i}
                    title={item.title}
                    description={item.description}
                    header={item.header}
                    icon={item.icon}
                    className={item.className}
                  />
                ))}
              </BentoGrid>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Preview Section */}
      <section className="py-32 bg-neutral-50 dark:bg-neutral-900/50 border-y border-neutral-200 dark:border-neutral-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-4">
            <div className="text-left">
              <div className="text-primary font-bold mb-2 tracking-widest uppercase text-sm">Most Popular</div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight">
                TOP TOOLS
              </h2>
            </div>
            <Link href="/tools" className="group flex items-center gap-2 bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all">
              EXPLORE ALL
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <ToolGrid tools={featuredTools} />
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-40 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -skew-y-3" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl md:text-8xl font-black mb-12 tracking-tighter">
            READY TO <span className="text-primary underline decoration-wavy">OPTIMIZE?</span>
          </h2>
          <Link href="/tools">
            <Button size="lg" className="h-20 rounded-3xl px-16 text-2xl font-black shadow-2xl hover:scale-105 active:scale-95 transition-all">
              GET STARTED NOW
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}