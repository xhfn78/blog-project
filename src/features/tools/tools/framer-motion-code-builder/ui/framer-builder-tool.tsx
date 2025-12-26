"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence, Transition } from "framer-motion";
import { Typography } from "@/shared/ui/typography";
import { Card } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Label } from "@/shared/ui/label";
import { Slider } from "@/shared/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { CodeBlock } from "@/shared/ui/code-block";
import { CopyButton } from "@/shared/ui/copy-button";
import { Separator } from "@/shared/ui/separator";
import { RefreshCcw, Code, Zap, Rocket } from "lucide-react";

export function FramerBuilderTool() {
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
  );
}
