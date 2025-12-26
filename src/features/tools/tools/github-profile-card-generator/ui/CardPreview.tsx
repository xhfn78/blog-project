import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Card } from "@/shared/ui/card";
import { GitHubStats, ProfileCardOptions } from '../model/types';
import { Star, GitCommit, GitPullRequest, Github, Trophy, Zap, Code2 } from 'lucide-react';

interface Props {
  stats: GitHubStats | null;
  options: ProfileCardOptions;
  isLoading: boolean;
}

export const CardPreview = ({ stats, options, isLoading }: Props) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // 3D 틸트용 Motion Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (isLoading) {
    return (
      <div className="h-[320px] flex items-center justify-center bg-indigo-500/5 rounded-[2rem] border-2 border-dashed border-indigo-500/20 animate-pulse">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto">
            <Github className="w-6 h-6 text-indigo-500 animate-bounce" />
          </div>
          <p className="text-sm font-medium text-indigo-400">데이터를 불러오는 중입니다...</p>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="h-[320px] flex items-center justify-center bg-slate-900/50 rounded-[2rem] border-2 border-dashed border-white/5 group hover:border-indigo-500/20 transition-colors">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
            <Zap className="w-8 h-8 text-indigo-400" />
          </div>
          <p className="text-muted-foreground group-hover:text-indigo-300 transition-colors">멋진 프로필 카드를 만들 준비가 되셨나요?</p>
        </div>
      </div>
    );
  }

  const themeStyles = {
    modern: "bg-slate-950 border-white/10 text-white",
    glassmorphism: "bg-white/5 backdrop-blur-2xl border-white/20 text-white shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]",
    cyberpunk: "bg-[#050505] border-[#f0db4f] border-2 shadow-[0_0_20px_rgba(240,219,79,0.2)] text-[#f0db4f]",
    minimal: "bg-white border-slate-200 text-slate-900"
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative w-full cursor-pointer"
    >
      <Card 
        className={`p-10 w-full relative overflow-hidden transition-all duration-300 shadow-2xl ${themeStyles[options.theme]}`}
        style={{ borderRadius: `${options.borderRadius}px` }}
      >
        {/* Glow Effect */}
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{ 
            background: `radial-gradient(circle at center, ${options.colorScheme}, transparent 70%)` 
          }}
        />
        
        <div className="relative z-10 space-y-8" style={{ transform: "translateZ(50px)" }}>
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <h3 className="text-3xl font-black tracking-tight flex items-center gap-2">
                <Github className="w-6 h-6" /> @{stats.username}
              </h3>
              <div className="flex items-center gap-2">
                <span className="h-1 w-8 bg-indigo-500 rounded-full" />
                <p className="text-[10px] opacity-50 font-black uppercase tracking-[0.2em]">Verified Developer 2025</p>
              </div>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center shadow-xl rotate-3">
              <Trophy className="w-8 h-8 text-yellow-500" />
            </div>
          </div>

          {options.showStats && (
            <div className="grid grid-cols-2 gap-6 pt-4">
              <StatItem icon={<Star />} label="Total Stars" value={stats.totalStars} color={options.colorScheme} />
              <StatItem icon={<GitCommit />} label="Commits" value={stats.totalCommits} color={options.colorScheme} />
              <StatItem icon={<GitPullRequest />} label="Merge Requests" value={stats.totalPRs} color={options.colorScheme} />
              <StatItem icon={<Code2 />} label="Solved Issues" value={stats.totalIssues} color={options.colorScheme} />
            </div>
          )}

          {/* Activity Heatmap Simulation */}
          <div className="pt-6 space-y-3" style={{ transform: "translateZ(30px)" }}>
            <p className="text-[10px] font-bold opacity-40 uppercase">Contribution Heatmap</p>
            <div className="flex gap-1.5 h-10 items-end">
              {stats.contributions.map((count, i) => (
                <motion.div 
                  key={i} 
                  initial={{ height: 0 }}
                  animate={{ height: `${(count / 10) * 100}%` }}
                  className="flex-1 rounded-t-md relative group"
                  style={{ backgroundColor: options.colorScheme, opacity: 0.3 + (count / 10) * 0.7 }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {count} commits
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

const StatItem = ({ icon, label, value, color }: { icon: React.ReactNode, label: string, value: number, color: string }) => (
  <div className="flex items-center gap-4 group">
    <div className="p-3 rounded-2xl bg-white/5 border border-white/5 group-hover:scale-110 transition-transform shadow-inner" style={{ color }}>
      {icon}
    </div>
    <div className="space-y-0.5">
      <p className="text-[9px] opacity-40 font-bold uppercase">{label}</p>
      <p className="text-xl font-black tabular-nums tracking-tighter">{value.toLocaleString()}</p>
    </div>
  </div>
);