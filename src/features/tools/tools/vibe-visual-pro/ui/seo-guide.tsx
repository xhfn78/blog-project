'use client';

import React from "react";
import { Typography } from "@/shared/ui/typography";
import { ToolSection } from "@/shared/ui/tool-layout";
import Link from 'next/link';

export function SeoGuide() {
  return (
    <div className="pt-16 mt-16 border-t border-gray-100 dark:border-gray-800">
      <ToolSection title="비주얼 커뮤니케이션의 혁신, VibeVisual PRO 완벽 가이드">
        <div className="max-w-4xl mx-auto space-y-12 text-gray-600 dark:text-gray-400">
          
          <section className="space-y-4">
            <Typography variant="h2" className="text-gray-900 dark:text-white text-2xl font-bold">VibeVisual PRO: 텍스트 기반 시각화의 새로운 패러다임</Typography>
            <Typography variant="p" className="leading-relaxed">
              정보의 홍수 속에서 핵심 메시지를 효과적으로 전달하는 것은 현대 개발자와 기획자의 필수 역량입니다. 
              VibeVisual PRO는 복잡한 텍스트 데이터를 직관적인 <strong>비주얼 인포그래픽</strong>으로 즉시 재구성하는 강력한 브라우저 기반 렌더링 엔진입니다. 
              무거운 디자인 소프트웨어를 실행할 필요 없이, 웹 에디터에서 요소를 구성하는 것만으로 전문가 수준의 레이아웃을 생성할 수 있습니다.
            </Typography>
          </section>

          <section className="space-y-4">
            <Typography variant="h2" className="text-gray-900 dark:text-white text-2xl font-bold">주요 핵심 기능 및 아키텍처적 이점</Typography>
            <ul className="list-disc pl-6 space-y-4">
              <li>
                <strong>실시간 하이브리드 렌더링 엔진:</strong>
                입력 데이터의 변화를 밀리초(ms) 단위로 감지하여 캔버스 레이어에 투영합니다. 60fps에 달하는 매끄러운 편집 경험을 제공합니다.
              </li>
              <li>
                <strong>DPI Scaling 기반 고해상도 출력:</strong>
                물리적 디스플레이의 픽셀 밀도를 계산하여 렌더링합니다. 레티나 디스플레이에서도 글자가 깨지지 않는 선명한 무손실 PNG 이미지를 추출할 수 있습니다.
              </li>
              <li>
                <strong>Zero-Cost 서버리스 데이터 보안:</strong>
                사용자의 소중한 아이디어는 서버에 저장되지 않습니다. 모든 설정은 암호화된 상태로 URL 파라미터에 저장되어 데이터 주권을 보장합니다.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <Typography variant="h2" className="text-gray-900 dark:text-white text-2xl font-bold">전문가를 위한 실무 활용 시나리오</Typography>
            <div className="grid grid-cols-1 gap-6">
              <div className="p-6 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-700">
                <Typography variant="h4" className="font-bold mb-2 text-gray-900 dark:text-white text-lg">1. 기술 아키텍처 및 로드맵 설계</Typography>
                <Typography variant="p">
                  개발팀은 복잡한 시스템 구조나 분기별 개발 로드맵을 텍스트로 정리한 후, VibeVisual PRO를 통해 레이어별로 시각화할 수 있습니다.
                </Typography>
              </div>
              <div className="p-6 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-700">
                <Typography variant="h4" className="font-bold mb-2 text-gray-900 dark:text-white text-lg">2. 비즈니스 리포트 요약</Typography>
                <Typography variant="p">
                  방대한 데이터를 정제한 후, 핵심 인사이트만을 추출하여 인포그래픽 카드에 배치함으로써 리포트의 가독성을 높일 수 있습니다.
                </Typography>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <Typography variant="h2" className="text-gray-900 dark:text-white text-2xl font-bold">기술 명세 및 렌더링 원리</Typography>
            <table className="w-full border-collapse rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 mt-6">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white">
                  <th className="p-4 text-left border-b border-gray-200 dark:border-gray-700">기술 지표</th>
                  <th className="p-4 text-left border-b border-gray-200 dark:border-gray-700">설명</th>
                  <th className="p-4 text-left border-b border-gray-200 dark:border-gray-700 text-blue-600 font-bold">상태</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-4 border-b border-gray-200 dark:border-gray-700 font-bold">렌더링 지연</td>
                  <td className="p-4 border-b border-gray-200 dark:border-gray-700">상태 변경 시 화면 반영 속도</td>
                  <td className="p-4 border-b border-gray-200 dark:border-gray-700 text-blue-600 font-bold">60fps 보장</td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-gray-200 dark:border-gray-700 font-bold">데이터 보안</td>
                  <td className="p-4 border-b border-gray-200 dark:border-gray-700">외부 서버 의존성 여부</td>
                  <td className="p-4 border-b border-gray-200 dark:border-gray-700 text-blue-600 font-bold">100% 로컬</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section className="space-y-6">
            <Typography variant="h2" className="text-gray-900 dark:text-white text-2xl font-bold">자주 묻는 질문 (FAQ)</Typography>
            <div className="space-y-6">
              <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                <Typography variant="h4" className="font-bold mb-2 text-primary">Q: 고해상도 모니터에서도 선명하게 보이나요?</Typography>
                <p className="text-sm leading-relaxed">A: 네, 디바이스의 물리 픽셀 비율(DPR)을 자동으로 감지하여 픽셀 밀도에 맞춘 드로잉 방식을 채택하여 선명한 결과물을 보장합니다.</p>
              </div>
              <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                <Typography variant="h4" className="font-bold mb-2 text-primary">Q: 공유 링크의 보안은 어떤가요?</Typography>
                <p className="text-sm leading-relaxed">A: 모든 정보는 사용자 브라우저 내에서 처리되며, 공유 링크는 URL 자체에 데이터를 포함하므로 서버 유출 위협으로부터 자유롭습니다.</p>
              </div>
            </div>
          </section>
        </div>
      </ToolSection>
    </div>
  );
}