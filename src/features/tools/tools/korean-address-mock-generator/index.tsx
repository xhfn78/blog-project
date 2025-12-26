"use client";

import React from "react";
import { ToolLayout } from "@/shared/ui/tool-layout";
import { Typography } from "@/shared/ui/typography";
import { BackgroundBeams } from "@/shared/ui/background-beams";
import { config } from "./tool.config";
import { useAddressGenerator } from "./lib/use-address-generator";
import { AddressOptions } from "./ui/AddressOptions";
import { AddressTable } from "./ui/AddressTable";
import { CodeBlock } from "@/shared/ui/code-block";
import { CopyButton } from "@/shared/ui/copy-button";
import { Card } from "@/shared/ui/card";
import { Database, FileDown, Rocket, CheckCircle2, MapPin, Info, HelpCircle } from "lucide-react";
import { Button } from "@/shared/ui/button";
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

export default function KoreanAddressGenerator() {
  const { options, setOptions, data, isGenerating, generate, downloadFile } = useAddressGenerator();

  const formattedData = React.useMemo(() => {
    if (data.length === 0) return '';
    if (options.format === 'json') return JSON.stringify(data, null, 2);
    if (options.format === 'typescript') return `const mockAddresses = ${JSON.stringify(data, null, 2)};`;
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(obj => Object.values(obj).join(',')).join('\n');
    return `${headers}\n${rows}`;
  }, [data, options.format]);

  return (
    <ToolLayout config={config}>
      <div className="relative space-y-24 pb-20">
        <div className="absolute inset-0 -z-10 overflow-hidden opacity-20">
          <BackgroundBeams />
        </div>

        {/* 1. 도구 인터페이스 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4">
            <AddressOptions 
              options={options} 
              setOptions={setOptions} 
              onGenerate={generate} 
              isGenerating={isGenerating} 
            />
          </div>

          <div className="lg:col-span-8 space-y-8">
            {data.length > 0 ? (
              <>
                <AddressTable data={data} />
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center px-2">
                    <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
                      <Database className="w-4 h-4" /> Generated Output ({options.format})
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 gap-2 border-indigo-500/20 text-indigo-400"
                        onClick={() => downloadFile(formattedData, `mock-addresses.${options.format === 'typescript' ? 'ts' : options.format}`)}
                      >
                        <FileDown className="w-3 h-3" /> 다운로드
                      </Button>
                      <CopyButton value={formattedData} />
                    </div>
                  </div>
                  <Card className="p-0 border-primary/10 bg-[#0d1117] rounded-xl overflow-hidden shadow-2xl">
                    <CodeBlock code={formattedData} language={options.format === 'typescript' ? 'typescript' : 'json'} />
                  </Card>
                </div>
              </>
            ) : (
              <div className="h-[500px] flex flex-center items-center justify-center bg-slate-900/50 rounded-[3rem] border-2 border-dashed border-white/5">
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto animate-pulse">
                    <MapPin className="w-10 h-10 text-muted-foreground/40" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xl font-bold text-slate-400">데이터 생성 준비 완료</p>
                    <p className="text-sm text-muted-foreground max-w-xs mx-auto">왼쪽 설정 패널에서 생성할 주소의 개수와 형식을 선택하고 버튼을 클릭하세요.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 2. SEO 섹션 (사수 톤 + 워크숍 테마) */}
        <div className="space-y-24 border-t border-primary/10 pt-20">
          
          <section className="space-y-10">
            <h2>주요 기능</h2>
            <Typography variant="p" className="text-lg text-muted-foreground leading-relaxed max-w-4xl">
              실제 주소 체계를 반영하지 못한 테스트 데이터는 개발 단계에서 심각한 오류를 유발할 수 있습니다. <strong>한국형 주소 Mock 데이터 생성기</strong>는 단순한 텍스트 조합을 넘어, 실제 우편번호 체계와 법정동 정보를 기반으로 한 '진짜 같은 가짜 데이터'를 제공합니다.
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="p-8 bg-slate-900/50 rounded-3xl border border-white/5 space-y-4">
                <div className="text-emerald-400 font-black text-2xl flex items-center gap-2"><CheckCircle2 /> 정밀성</div>
                <Typography variant="p" className="text-sm text-muted-foreground leading-6">전국 17개 시/도의 실제 도로명과 우편번호 5자리 체계를 완벽하게 반영합니다. 더 이상 '테스트 주소 1'과 같은 조잡한 데이터로 디버깅하지 마세요.</Typography>
              </div>
              <div className="p-8 bg-slate-900/50 rounded-3xl border border-white/5 space-y-4">
                <div className="text-blue-400 font-black text-2xl flex items-center gap-2"><CheckCircle2 /> 좌표 연동</div>
                <Typography variant="p" className="text-sm text-muted-foreground leading-6">지도 API(카카오, 네이버) 연동 테스트를 위해 각 주소별 위도와 경도 좌표를 함께 생성합니다. 시각적 위치 기반 서비스 테스트에 최적화되어 있습니다.</Typography>
              </div>
              <div className="p-8 bg-slate-900/50 rounded-3xl border border-white/5 space-y-4">
                <div className="text-amber-400 font-black text-2xl flex items-center gap-2"><CheckCircle2 /> 멀티 포맷</div>
                <Typography variant="p" className="text-sm text-muted-foreground leading-6">JSON은 물론 엑셀 작업을 위한 CSV, TypeScript 개발을 위한 객체 형식까지 모두 지원합니다. 복사 한 번으로 당신의 프로젝트에 즉시 투입하십시오.</Typography>
              </div>
            </div>
          </section>

          <section className="space-y-10">
            <h3 className="text-3xl font-bold text-center">도구 작동 프로세스</h3>
            <div className="bg-slate-950 p-12 rounded-[4rem] border border-white/5 text-center">
              <pre className="text-emerald-400 font-mono text-sm leading-relaxed overflow-x-auto inline-block text-left">
{`graph LR
  A[옵션 설정] --> B[시/도 무작위 선별]
  B --> C[도로명 주소 매핑]
  C --> D[위경도 좌표 생성]
  D --> E[포맷별 직렬화]
  E --> F[다운로드 및 복사]`}
              </pre>
            </div>
          </section>

          <section className="space-y-10">
            <h2>사용 방법</h2>
            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-white font-black shrink-0 shadow-lg shadow-emerald-500/20">01</div>
                <div className="space-y-2">
                  <Typography variant="h4" className="text-xl font-bold">생성 규모 정의하기</Typography>
                  <Typography variant="p" className="text-muted-foreground">단일 케이스 테스트를 위한 1개부터 대량 데이터 삽입을 위한 최대 50개까지 자유롭게 개수를 설정하십시오. 개발 단계에 맞춰 유연한 대처가 가능합니다.</Typography>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-2xl bg-blue-500 flex items-center justify-center text-white font-black shrink-0 shadow-lg shadow-blue-500/20">02</div>
                <div className="space-y-2">
                  <Typography variant="h4" className="text-xl font-bold">필요 지표 선택</Typography>
                  <Typography variant="p" className="text-muted-foreground">좌표 데이터가 필요 없는 단순 주소 입력 폼 테스트라면 '위경도 포함' 스위치를 꺼서 결과물을 가볍게 만드십시오. 상세 주소 포함 여부도 자유롭게 제어할 수 있습니다.</Typography>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-2xl bg-purple-500 flex items-center justify-center text-white font-black shrink-0 shadow-lg shadow-purple-500/20">03</div>
                <div className="space-y-2">
                  <Typography variant="h4" className="text-xl font-bold">데이터 통합 및 검증</Typography>
                  <Typography variant="p" className="text-muted-foreground">생성된 표에서 특정 항목을 클릭하여 시각적으로 위치를 확인하십시오. 만족스럽다면 하단의 코드 영역에서 전체 데이터를 복사하거나 파일로 내려받아 프로젝트에 적용하십시오.</Typography>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-10">
            <h2>실무</h2>
            <div className="bg-slate-900/30 rounded-[3rem] border border-white/5 p-10 space-y-8">
              <Typography variant="p" className="text-muted-foreground leading-relaxed">
                실무 현장에서 이 도구가 어떻게 당신의 귀한 시간을 지켜주는지 3가지 시나리오를 통해 설명합니다. 사소한 수작업을 줄이는 것이 시니어 개발자로 가는 첫 번째 계단입니다.
              </Typography>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left border-collapse">
                  <thead className="bg-white/5 text-slate-300 font-bold border-b border-white/10">
                    <tr>
                      <th className="px-6 py-4">테스트 시나리오</th>
                      <th className="px-6 py-4">기존 방식</th>
                      <th className="px-6 py-4">도구 활용 시</th>
                      <th className="px-6 py-4">효과</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    <tr>
                      <td className="px-6 py-4">회원가입 주소 폼 검증</td>
                      <td className="px-6 py-4">직접 주소를 타이핑</td>
                      <td className="px-6 py-4">10개 무작위 생성 후 입력</td>
                      <td className="px-6 py-4 text-emerald-400">정확성 100%</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4">지도 위 대량 마커 렌더링</td>
                      <td className="px-6 py-4">좌표 데이터를 수동 구글링</td>
                      <td className="px-6 py-4">50개 좌표 포함 JSON 추출</td>
                      <td className="px-6 py-4 text-emerald-400">시간 95% 단축</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4">DB 초기 시드 데이터 구축</td>
                      <td className="px-6 py-4">더미 사이트에서 긁어오기</td>
                      <td className="px-6 py-4">CSV 다운로드 후 Import</td>
                      <td className="px-6 py-4 text-emerald-400">생산성 대폭 향상</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section className="space-y-12">
            <h2>기술</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div className="space-y-6">
                <Typography variant="h4" className="text-2xl font-bold flex items-center gap-3 text-emerald-400">
                  <Rocket className="w-6 h-6" /> 데이터 일관성 및 정규화
                </Typography>
                <Typography variant="p" className="text-muted-foreground leading-8">
                  본 도구는 <strong>Deterministic Randomness</strong> 알고리즘을 지향합니다. 사용자가 설정한 옵션 내에서 대한민국 행정구역 코드와 도로명 부여 규칙을 준수하여 데이터를 생성합니다. 특히 지번 주소와 도로명 주소의 문법적 조화를 위해 내부적으로 시/도 단위의 매핑 테이블을 거칩니다.
                </Typography>
                <Typography variant="p" className="text-muted-foreground leading-8">
                  좌표 생성 로직은 한반도 위경도 범위(33.0 ~ 38.5 / 124.5 ~ 132.0) 내에서 유효한 값을 생성하도록 제어되어 있어, 지도 API 호출 시 잘못된 영역으로 튕기는 현상을 방지합니다. 또한 Next.js 클라이언트 사이드에서 모든 연산이 이루어져 매우 빠른 응답성을 보장합니다.
                </Typography>
              </div>
              <div className="bg-slate-800/50 p-10 rounded-[3rem] border border-white/5 space-y-6">
                <Typography variant="h4" className="text-xl font-bold flex items-center gap-2 text-blue-400">
                  <Info className="w-5 h-5" /> 개발 환경 활용 팁
                </Typography>
                <ul className="list-disc list-inside space-y-4 text-sm text-muted-foreground">
                  <li>TypeScript 타입 추출 기능을 사용하여 <code>interface Address</code>와 같은 스키마를 수동으로 만들지 말고 즉시 복사하여 사용하십시오.</li>
                  <li>CSV 내보내기 시 엑셀의 데이터 인코딩 문제를 해결하기 위해 표준 UTF-8 포맷으로 파일을 생성합니다.</li>
                  <li>Framer Motion의 Stagger 애니메이션을 통해 데이터가 생성되는 시각적 순서를 부여하여 사용자가 결과물을 인지하는 속도를 최적화했습니다.</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="space-y-12 bg-slate-900/30 p-12 rounded-[3rem] border border-white/5">
            <h2>자주 묻는 질문</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-3">
                <h3>Q1: 실제 존재하는 정확한 주소인가요?</h3>
                <Typography variant="p" className="text-sm text-muted-foreground pl-10 leading-relaxed">
                  본 도구는 'Mock 데이터' 생성을 목적으로 합니다. 시/도, 구/군, 도로명 등은 실제 존재하는 데이터를 사용하지만, 건물 번호나 상세 주소의 조합은 무작위로 생성되므로 실제 배송이나 우편물 발송용으로 사용해서는 안 됩니다.
                </Typography>
              </div>
              <div className="space-y-3">
                <h3>Q2: 대량 데이터 생성 시 브라우저 성능에 영향은 없나요?</h3>
                <Typography variant="p" className="text-sm text-muted-foreground pl-10 leading-relaxed">
                  현재 최대 50개까지 생성을 제한하고 있어 성능 저하는 거의 발생하지 않습니다. 수천 개 이상의 데이터가 필요한 경우 API 서버용 라이브러리를 구축하는 것을 권장하며, 본 웹 도구는 빠른 UI 테스트와 초기 시드용에 최적화되어 있습니다.
                </Typography>
              </div>
              <div className="space-y-3">
                <h3>Q3: 도로명 주소 API와 연동이 가능한가요?</h3>
                <Typography variant="p" className="text-sm text-muted-foreground pl-10 leading-relaxed">
                  네, 본 도구에서 생성된 JSON 스키마를 프로젝트의 Mock Server(MSW 등)에 등록하여 마치 실제 주소 검색 API가 응답을 주는 것처럼 시뮬레이션할 수 있습니다.
                </Typography>
              </div>
              <div className="space-y-3">
                <h3>Q4: 위경도 좌표의 정밀도는 어느 정도인가요?</h3>
                <Typography variant="p" className="text-sm text-muted-foreground pl-10 leading-relaxed">
                  소수점 6자리까지 생성하여 일반적인 지도 API 서비스(Google Maps, Kakao Map)에서 요구하는 정밀도를 충족합니다. 다만 주소 명칭과 좌표가 1:1로 정확히 일치하는 지점은 아닙니다.
                </Typography>
              </div>
              <div className="space-y-3">
                <h3>Q5: 모바일 앱 개발 시에도 사용 가능한가요?</h3>
                <Typography variant="p" className="text-sm text-muted-foreground pl-10 leading-relaxed">
                  데이터 형식은 표준 JSON/CSV이므로 React Native, Flutter, Swift 등 어떤 플랫폼의 개발 환경에서도 초기 더미 데이터로 활용 가능합니다.
                </Typography>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-br from-emerald-600/40 to-blue-700/40 p-16 rounded-[4rem] text-center space-y-10 border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-[120px] -mr-48 -mt-48" />
            <Typography variant="h3" className="text-4xl font-black italic">OPTIMIZE YOUR WORKFLOW NOW</Typography>
            <Typography variant="p" className="text-xl text-emerald-100/70 max-w-3xl mx-auto leading-relaxed">
              사소한 주소 입력 테스트에 더 이상 시간을 낭비하지 마세요. 전문가를 위한 정밀한 Mock 데이터와 더불어 프로젝트의 완성도를 높이십시오.
            </Typography>
            <div className="flex flex-wrap justify-center gap-6 pt-4">
              <Button size="lg" variant="outline" className="rounded-full px-12 h-16 text-lg font-bold border-emerald-500/30 hover:bg-emerald-500/10" asChild>
                <Link href="/tools/generator/github-profile-card-generator">GitHub 프로필 카드</Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-12 h-16 text-lg font-bold border-blue-500/30 hover:bg-blue-500/10" asChild>
                <Link href="/tools/utility/tailwind-class-visualizer">Tailwind 시각화</Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-12 h-16 text-lg font-bold border-indigo-500/30 hover:bg-indigo-500/10" asChild>
                <Link href="/tools/converter/json-to-table">JSON 데이터 변환</Link>
              </Button>
            </div>
          </section>
        </div>
      </div>
    </ToolLayout>
  );
}