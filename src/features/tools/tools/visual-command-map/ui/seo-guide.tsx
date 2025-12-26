'use client';

import React from "react";
import { Typography } from "@/shared/ui/typography";
import Link from "next/link";

export function SeoGuide() {
  return (
    <section className="bg-slate-950 rounded-2xl p-8 border border-slate-800 shadow-2xl overflow-hidden mt-12">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="space-y-6 text-center lg:text-left">
          <Typography variant="h2" className="text-3xl font-extrabold text-slate-100">
            개발 지도의 필요성: <span className="text-emerald-400">길을 잃지 않는 법</span>
          </Typography>
          <Typography variant="p" className="text-lg text-slate-300 leading-relaxed">
            풀스택 개발 프로젝트는 거대한 미로와 같습니다. 환경 설정부터 배포까지 수백 개의 선택지와 명령어가 존재하죠. 
            비주얼 명령어 지도는 단순한 리스트가 아닌, 논리적인 흐름(Workflow)을 시각화하여 현재 위치와 다음 단계를 명확히 제시합니다.
          </Typography>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
            <h4 className="text-lg font-semibold text-emerald-300 mb-2">🌳 인터랙티브 로드맵</h4>
            <p className="text-slate-400 text-sm">Git 브랜치 스타일의 트리 구조를 통해 개발의 맥락을 이해하고, 필요한 명령어를 즉시 클릭하여 복사할 수 있습니다.</p>
          </div>
          <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
            <h4 className="text-lg font-semibold text-emerald-300 mb-2">🚀 전 단계 커버</h4>
            <p className="text-slate-400 text-sm">초기 보일러플레이트 구성부터 데이터베이스 마이그레이션, 클라우드 배포까지의 모든 터미널 커맨드를 수록했습니다.</p>
          </div>
        </div>

        <div className="space-y-6">
          <Typography variant="h3" className="text-2xl font-bold text-slate-100">로드맵 주요 지점</Typography>
          <ul className="list-disc pl-6 space-y-4 text-slate-300">
            <li><strong>Infrastructure:</strong> Next.js, Tailwind, ESLint 초기화</li>
            <li><strong>Feature Core:</strong> API 연동, 전역 상태 관리 구축</li>
            <li><strong>Production:</strong> 도커 빌드, CI/CD 파이프라인 가동</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
