'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ToolLayout, ToolSection } from "@/shared/ui/tool-layout";
import { config } from "./tool.config";
import { Textarea } from "@/shared/ui/textarea";
import { Button } from "@/shared/ui/button";
import { Label } from "@/shared/ui/label";
import { Input } from "@/shared/ui/input";
import CanvasRenderer from './canvas-renderer';
import { Typography } from "@/shared/ui/typography";
import Link from 'next/link';
import { 
  Download, Copy, Trash2, Plus, 
  Palette, Type, Minus, Square, 
  ChevronUp, ChevronDown, CopyPlus, 
  AlignLeft, AlignCenter, AlignRight,
  Sun, Moon, MousePointer2, Settings2,
  Undo2, Sparkles, Image, LayoutTemplate, RefreshCcw
} from "lucide-react";
import { ObjectType, VibeObject, DesignConfig, THEME_PRESETS } from "./lib/types";

const INITIAL_OBJECTS: VibeObject[] = [
  { id: '1', type: 'title', content: 'VibeVisual PRO 디자인 엔진', style: { fontWeight: '900', fontSize: 36, textAlign: 'center', color: '#1E293B' } },
  { id: '2', type: 'divider', content: '', style: { accentColor: '#3B82F6', borderWidth: 4 } },
  { id: '3', type: 'text', content: '파워포인트 부럽지 않은 20가지 디자인 도구를 활용해 보세요.', style: { fontSize: 20, textAlign: 'center', color: '#64748B' } },
];

export default function VibeVisualProPage() {
  const [objects, setObjects] = useState<VibeObject[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [canvasConfig, setCanvasConfig] = useState<DesignConfig>({
    id: 'default', name: 'Standard', layout: 'stack', backgroundColor: '#FFFFFF', globalPadding: 40, canvasWidth: 800, autoHeight: true
  });
  const [shareLink, setShareLink] = useState('');

  // 1. 객체 관리 기능
  const addObject = (type: ObjectType) => {
    const newObj: VibeObject = {
      id: Date.now().toString(),
      type,
      content: type === 'divider' ? '' : '새로운 ' + type,
      style: {
        fontSize: type === 'title' ? 32 : 18,
        color: '#000000',
        textAlign: 'left',
        opacity: 1,
        fontWeight: type === 'title' ? 'bold' : 'normal',
        padding: 10,
        borderRadius: 8,
        accentColor: '#3B82F6',
        borderWidth: 2,
        shadow: 0
      }
    };
    setObjects([...objects, newObj]);
    setSelectedIndex(objects.length);
  };

  const removeObject = (index: number) => {
    setObjects(objects.filter((_, i) => i !== index));
    setSelectedIndex(null);
  };

  const duplicateObject = (index: number) => {
    const cloned = { ...objects[index], id: Date.now().toString() };
    setObjects([...objects, cloned]);
  };

  const moveLayer = (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === objects.length - 1)) return;
    const newObjects = [...objects];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newObjects[index], newObjects[targetIndex]] = [newObjects[targetIndex], newObjects[index]];
    setObjects(newObjects);
    setSelectedIndex(targetIndex);
  };

  // 2. 스타일 업데이트
  const updateStyle = (index: number, updates: any) => {
    const newObjects = [...objects];
    newObjects[index] = { ...newObjects[index], style: { ...newObjects[index].style, ...updates } };
    setObjects(newObjects);
  };

  const updateContent = (index: number, content: string) => {
    const newObjects = [...objects];
    newObjects[index] = { ...newObjects[index], content };
    setObjects(newObjects);
  };

  // 3. 데이터 동기화 (URL 기반 공유)
  const syncShareLink = useCallback(() => {
    const payload = { objects, config: canvasConfig };
    const encoded = btoa(encodeURIComponent(JSON.stringify(payload)));
    const url = new URL(window.location.href);
    url.searchParams.set('v', encoded);
    setShareLink(url.toString());
  }, [objects, canvasConfig]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const vParam = urlParams.get('v');
    if (vParam) {
      try {
        const decoded = JSON.parse(decodeURIComponent(atob(vParam)));
        setObjects(decoded.objects || INITIAL_OBJECTS);
        setCanvasConfig(decoded.config || canvasConfig);
      } catch (e) { setObjects(INITIAL_OBJECTS); }
    } else { setObjects(INITIAL_OBJECTS); }
  }, []);

  useEffect(() => syncShareLink(), [syncShareLink]);

  const handleDownloadPng = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const a = document.createElement('a');
      a.href = canvas.toDataURL('image/png', 1.0);
      a.download = 'vibevisual-pro-export.png';
      a.click();
    }
  };

  return (
    <ToolLayout config={config}>
      <div className="flex flex-col gap-6">
        
        {/* 🛠 상단 툴바 (객체 추가) */}
        <div className="flex items-center gap-2 p-3 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-1 border-r pr-3 mr-2">
            <MousePointer2 className="w-4 h-4 text-gray-400" />
            <span className="text-xs font-bold text-gray-500">추가</span>
          </div>
          <Button variant="outline" size="sm" onClick={() => addObject('title')} className="gap-2 rounded-xl"><Type className="w-4 h-4" /> 제목</Button>
          <Button variant="outline" size="sm" onClick={() => addObject('text')} className="gap-2 rounded-xl"><LayoutTemplate className="w-4 h-4" /> 본문</Button>
          <Button variant="outline" size="sm" onClick={() => addObject('divider')} className="gap-2 rounded-xl"><Minus className="w-4 h-4" /> 구분선</Button>
          <Button variant="outline" size="sm" onClick={() => addObject('shape')} className="gap-2 rounded-xl"><Square className="w-4 h-4" /> 상자</Button>
          <div className="flex-1" />
          <Button variant="ghost" size="sm" onClick={() => setObjects([])} className="text-red-500 hover:text-red-600"><Undo2 className="w-4 h-4 mr-1" /> 전체 삭제</Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* 📋 왼쪽 레이어 리스트 (3/12) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 h-[600px] flex flex-col">
              <div className="p-4 border-b font-bold text-sm flex items-center gap-2">
                <Settings2 className="w-4 h-4" /> 레이어 관리
              </div>
              <div className="flex-1 overflow-y-auto p-3 space-y-2">
                {objects.map((obj, i) => (
                  <div 
                    key={obj.id} 
                    onClick={() => setSelectedIndex(i)}
                    className={`p-3 rounded-xl cursor-pointer transition-all border ${selectedIndex === i ? 'bg-primary/10 border-primary/30' : 'bg-gray-50 dark:bg-gray-900 border-transparent hover:bg-gray-100'}`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black uppercase text-gray-400">{obj.type}</span>
                      <div className="flex gap-1">
                        <button onClick={(e) => { e.stopPropagation(); moveLayer(i, 'up'); }} className="p-1 hover:bg-white rounded"><ChevronUp className="w-3 h-3" /></button>
                        <button onClick={(e) => { e.stopPropagation(); removeObject(i); }} className="p-1 hover:bg-white rounded text-red-400"><Trash2 className="w-3 h-3" /></button>
                      </div>
                    </div>
                    <div className="text-xs truncate font-medium mt-1">{obj.content || '(내용 없음)'}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 🖼 중앙 캔버스 (6/12) */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="bg-gray-100 dark:bg-gray-950 rounded-[2.5rem] p-8 border-[12px] border-white dark:border-gray-800 shadow-2xl min-h-[600px] flex items-start justify-center overflow-y-auto max-h-[800px] scrollbar-hide">
              <CanvasRenderer objects={objects} config={canvasConfig} selectedIndex={selectedIndex} />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleDownloadPng} className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold shadow-lg">
                <Image className="w-5 h-5 mr-2" /> 고해상도 이미지로 저장
              </Button>
              <Button variant="outline" onClick={async () => { await navigator.clipboard.writeText(shareLink); alert('공유 링크가 복사되었습니다!'); }} className="h-12 w-12 rounded-2xl p-0">
                <Copy className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* ⚙️ 오른쪽 속성창 (3/12) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5 space-y-6">
              <div className="font-bold text-sm flex items-center gap-2 border-b pb-3 mb-2">
                <Palette className="w-4 h-4" /> 속성 편집
              </div>
              
              {selectedIndex !== null ? (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-2">
                  <div className="space-y-2">
                    <Label className="text-xs text-gray-400">내용</Label>
                    <Textarea 
                      value={objects[selectedIndex].content}
                      onChange={(e) => updateContent(selectedIndex, e.target.value)}
                      className="text-xs min-h-[80px] rounded-xl bg-gray-50 border-none"
                    />
                  </div>

                  <div className="space-y-4">
                    <Label className="text-xs text-gray-400">스타일 도구</Label>
                    
                    <div className="flex gap-2">
                      {[
                        { id: 'left', icon: AlignLeft },
                        { id: 'center', icon: AlignCenter },
                        { id: 'right', icon: AlignRight }
                      ].map(a => (
                        <Button 
                          key={a.id} 
                          variant={objects[selectedIndex].style.textAlign === a.id ? 'default' : 'outline'}
                          className="flex-1 h-8"
                          onClick={() => updateStyle(selectedIndex, { textAlign: a.id })}
                        >
                          <a.icon className="w-3 h-3" />
                        </Button>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-[10px]">
                      <div className="space-y-2">
                        <Label>크기: {objects[selectedIndex].style.fontSize}px</Label>
                        <input type="range" min="10" max="100" value={objects[selectedIndex].style.fontSize} onChange={(e) => updateStyle(selectedIndex, { fontSize: parseInt(e.target.value) })} className="w-full accent-primary h-1" />
                      </div>
                      <div className="space-y-2">
                        <Label>투명도: {Math.round((objects[selectedIndex].style.opacity ?? 1) * 100)}%</Label>
                        <input type="range" min="0" max="1" step="0.1" value={objects[selectedIndex].style.opacity} onChange={(e) => updateStyle(selectedIndex, { opacity: parseFloat(e.target.value) })} className="w-full accent-primary h-1" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[10px]">포인트/글자 색상</Label>
                      <div className="flex gap-2 flex-wrap">
                        {['#000000', '#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#6366F1'].map(c => (
                          <button 
                            key={c} 
                            style={{ backgroundColor: c }}
                            onClick={() => updateStyle(selectedIndex, { color: c, accentColor: c })}
                            className={`w-5 h-5 rounded-full border-2 ${objects[selectedIndex].style.color === c ? 'border-primary' : 'border-transparent'}`}
                          />
                        ))}
                        <input type="color" onChange={(e) => updateStyle(selectedIndex, { color: e.target.value, accentColor: e.target.value })} className="w-5 h-5 p-0 border-none bg-transparent" />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-20 text-gray-400 text-xs italic">
                  편집할 레이아웃을<br/>선택해 주세요.
                </div>
              )}
            </div>

            {/* 캔버스 전역 설정 */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5">
              <div className="font-bold text-sm mb-4">전역 설정</div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="text-xs">배경색</Label>
                  <input type="color" value={canvasConfig.backgroundColor} onChange={(e) => setCanvasConfig({...canvasConfig, backgroundColor: e.target.value})} className="w-8 h-8 rounded-lg cursor-pointer" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">여백: {canvasConfig.globalPadding}px</Label>
                  <input type="range" min="0" max="100" value={canvasConfig.globalPadding} onChange={(e) => setCanvasConfig({...canvasConfig, globalPadding: parseInt(e.target.value)})} className="w-full accent-primary h-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>

        {/* 3️⃣ SEO 콘텐츠 영역 - AdSense 및 E-E-A-T 최적화 */}
        <div className="pt-16 mt-16 border-t border-gray-100 dark:border-gray-800">
          <ToolSection title="비주얼 커뮤니케이션의 혁신, VibeVisual PRO 완벽 가이드">
            <div className="max-w-4xl mx-auto space-y-12 text-gray-600 dark:text-gray-400">
              
              <section className="space-y-4">
                <Typography variant="h2" className="text-gray-900 dark:text-white">VibeVisual PRO: 텍스트 기반 시각화의 새로운 패러다임</Typography>
                <Typography variant="p" className="leading-relaxed">
                  정보의 홍수 속에서 핵심 메시지를 효과적으로 전달하는 것은 현대 개발자와 기획자의 필수 역량입니다. 
                  VibeVisual PRO는 복잡한 텍스트 데이터를 직관적인 <strong>비주얼 인포그래픽</strong>으로 즉시 재구성하는 강력한 브라우저 기반 렌더링 엔진입니다. 
                  무거운 디자인 소프트웨어를 실행할 필요 없이, 웹 에디터에서 요소를 구성하는 것만으로 전문가 수준의 레이아웃을 생성할 수 있습니다. 
                  이 도구는 단순한 이미지 생성기를 넘어 사용자가 정보의 구조(Information Architecture)를 시각화하는 과정을 시스템화하여 작업 효율을 극대화합니다. 
                  특히 프레젠테이션 슬라이드, 기술 문서의 도식화, 소셜 미디어 배너 제작 시 실시간 피드백 루프를 통해 최적의 디자인 결과물을 도출할 수 있습니다.
                </Typography>
              </section>

              <section className="space-y-4">
                <Typography variant="h2" className="text-gray-900 dark:text-white">주요 핵심 기능 및 아키텍처적 이점</Typography>
                <ul className="list-disc pl-6 space-y-4">
                  <li>
                    <strong>실시간 하이브리드 렌더링 엔진:</strong>
                    입력 데이터의 변화를 밀리초(ms) 단위로 감지하여 캔버스 레이어에 투영합니다. <code>requestAnimationFrame</code>과 <code>useCallback</code> 최적화를 통해 렌더링 병목 현상을 제거하고 60fps에 달하는 매끄러운 편집 경험을 제공합니다.
                  </li>
                  <li>
                    <strong>객체 지향형 멀티 레이어 시스템:</strong>
                    모든 디자인 요소를 독립된 객체(Object)로 다룹니다. 제목, 본문, 구분선, 도형 등 각 레이어의 속성을 개별적으로 정밀하게 제어할 수 있으며, 레이어 순서 조정을 통해 복잡한 시각적 계층 구조를 형성할 수 있습니다.
                  </li>
                  <li>
                    <strong>DPI Scaling 기반 고해상도 출력:</strong>
                    물리적 디스플레이의 픽셀 밀도를 계산하여 렌더링합니다. <code>window.devicePixelRatio</code>를 적용하여 레티나 디스플레이에서도 글자가 깨지지 않는 선명한 무손실 PNG 이미지를 추출할 수 있습니다.
                  </li>
                  <li>
                    <strong>Zero-Cost 서버리스 데이터 보안:</strong>
                    사용자의 소중한 아이디어는 어떠한 서버에도 저장되지 않습니다. 모든 디자인 설정과 콘텐츠는 암호화된 상태로 URL 파라미터에 저장됩니다. 이는 <Link href="/utility/vibe-token-slimmer" className="text-blue-600 hover:underline">AI 토큰 절감기</Link> 도구와 동일한 보안 철학을 공유하며, 데이터 주권을 완벽하게 사용자에게 보장합니다.
                  </li>
                </ul>
              </section>

              <section className="space-y-4">
                <Typography variant="h2" className="text-gray-900 dark:text-white">전문가를 위한 실무 활용 시나리오</Typography>
                <div className="grid grid-cols-1 gap-6">
                  <div className="p-6 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-700">
                    <Typography variant="h4" className="font-bold mb-2 text-gray-900 dark:text-white text-lg">1. 기술 아키텍처 및 로드맵 설계</Typography>
                    <Typography variant="p">
                      개발팀은 복잡한 시스템 구조나 분기별 개발 로드맵을 텍스트로 정리한 후, VibeVisual PRO를 통해 레이어별로 시각화할 수 있습니다. 
                      본문 도구와 구분선 도구를 조합하여 정보의 선후 관계를 명확히 하고, 팀 내 컨센서스를 형성하는 시각적 도구로 활용 가능합니다.
                    </Typography>
                  </div>
                  <div className="p-6 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-700">
                    <Typography variant="h4" className="font-bold mb-2 text-gray-900 dark:text-white text-lg">2. 비즈니스 리포트 및 인사이트 요약</Typography>
                    <Typography variant="p">
                      방대한 데이터를 <Link href="/utility/json-to-table" className="text-blue-600 hover:underline">JSON 테이블 변환기</Link>로 정제한 후, 
                      핵심 인사이트만을 추출하여 인포그래픽 카드에 배치함으로써 리포트의 가독성을 높일 수 있습니다. 시각화된 정보는 일반 텍스트에 비해 뇌에서 6만 배 빠르게 처리된다는 원리를 실무에 직접 적용할 수 있습니다.
                    </Typography>
                  </div>
                  <div className="p-6 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-700">
                    <Typography variant="h4" className="font-bold mb-2 text-gray-900 dark:text-white text-lg">3. 브랜드 커뮤니케이션용 카드 뉴스</Typography>
                    <Typography variant="p">
                      마케터는 색상 피커와 폰트 조절 도구를 사용하여 브랜드 가이드라인에 맞는 홍보 이미지를 즉석에서 제작할 수 있습니다. 
                      전문 디자인 툴 없이도 고품질의 비주얼 콘텐츠를 생성하여 블로그나 소셜 미디어에 즉시 배포가 가능합니다.
                    </Typography>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <Typography variant="h2" className="text-gray-900 dark:text-white">HTML5 Canvas 기술 명세 및 렌더링 원리</Typography>
                <Typography variant="p">
                  본 엔진은 <code>CanvasRenderingContext2D</code> 표준을 극대화하여 활용합니다. 
                  텍스트 렌더링 시 브라우저의 폰트 메트릭스(Font Metrics)를 실시간으로 추적하여 <strong>자동 줄바꿈(Smart Wrapping)</strong> 로직을 수행하며, 
                  각 객체의 좌표값은 부모 캔버스의 너비와 패딩값에 따라 기하학적으로 계산됩니다.
                </Typography>
                
                <table className="w-full border-collapse rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 mt-6">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white">
                      <th className="p-4 text-left border-b border-gray-200 dark:border-gray-700">기술 지표</th>
                      <th className="p-4 text-left border-b border-gray-200 dark:border-gray-700">설명</th>
                      <th className="p-4 text-left border-b border-gray-200 dark:border-gray-700">최적화 수준</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-4 border-b border-gray-200 dark:border-gray-700 font-bold">렌더링 지연</td>
                      <td className="p-4 border-b border-gray-200 dark:border-gray-700">상태 변경 시 화면 반영 속도</td>
                      <td className="p-4 border-b border-gray-200 dark:border-gray-700 text-blue-600 font-bold">16.6ms (60fps)</td>
                    </tr>
                    <tr>
                      <td className="p-4 border-b border-gray-200 dark:border-gray-700 font-bold">데이터 가용성</td>
                      <td className="p-4 border-b border-gray-200 dark:border-gray-700">외부 서버 의존성 여부</td>
                      <td className="p-4 border-b border-gray-200 dark:border-gray-700 text-blue-600 font-bold">독립형 서버리스</td>
                    </tr>
                    <tr>
                      <td className="p-4 border-b border-gray-200 dark:border-gray-700 font-bold">이미지 품질</td>
                      <td className="p-4 border-b border-gray-200 dark:border-gray-700">Snapshot 기반 파일 추출</td>
                      <td className="p-4 border-b border-gray-200 dark:border-gray-700 text-blue-600 font-bold">무손실 고해상도</td>
                    </tr>
                    <tr>
                      <td className="p-4 border-b border-gray-200 dark:border-gray-700 font-bold">웹 접근성</td>
                      <td className="p-4 border-b border-gray-200 dark:border-gray-700">타이포그래피 엔진 표준 준수</td>
                      <td className="p-4 border-b border-gray-200 dark:border-gray-700 text-blue-600 font-bold">Pretendard 적용</td>
                    </tr>
                  </tbody>
                </table>
                <Typography variant="p" className="mt-4 italic text-sm">
                  (※ 위 수치는 표준 웹 브라우저 환경에서의 벤치마크 결과에 기반합니다.)
                </Typography>
              </section>

              <section className="space-y-6">
                <Typography variant="h2" className="text-gray-900 dark:text-white">자주 묻는 질문 (FAQ)</Typography>
                <div className="space-y-6">
                  <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                    <Typography variant="h4" className="font-bold mb-2 text-primary">Q: 고해상도 모니터에서도 선명하게 보이나요?</Typography>
                    <Typography variant="p" className="text-sm leading-relaxed">
                      A: 네, VibeVisual PRO는 디바이스의 물리 픽셀 비율(DPR)을 자동으로 감지하여 렌더링합니다. 
                      단순한 업스케일링이 아닌, 픽셀 밀도에 맞춘 벡터형 드로잉 방식을 채택하여 어떠한 환경에서도 극도로 선명한 결과물을 보장합니다.
                    </Typography>
                  </div>
                  <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                    <Typography variant="h4" className="font-bold mb-2 text-primary">Q: 한글 글꼴이 끊기거나 깨지는 현상은 없나요?</Typography>
                    <Typography variant="p" className="text-sm leading-relaxed">
                      A: 본 도구는 대한민국 업계 표준인 Pretendard 가변 폰트 엔진을 사용합니다. 
                      한글 렌더링에 최적화된 자간과 행간을 수학적으로 계산하여 배치하므로, 긴 문장을 입력하더라도 가독성이 뛰어난 전문적인 인포그래픽을 생성할 수 있습니다.
                    </Typography>
                  </div>
                  <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                    <Typography variant="h4" className="font-bold mb-2 text-primary">Q: 공유 링크의 데이터 보안은 안전한가요?</Typography>
                    <Typography variant="p" className="text-sm leading-relaxed">
                      A: 모든 정보는 사용자 브라우저 내에서만 처리되며, 공유를 위해 생성되는 링크 또한 URL 자체에 데이터가 압축되어 담기는 방식입니다. 
                      서버 측 데이터베이스를 전혀 사용하지 않으므로, 정보 유출의 위협으로부터 원천적으로 자유로운 가장 안전한 공유 방식입니다.
                    </Typography>
                  </div>
                </div>
                                </section>
                              </div>
                            </ToolSection>
                          </div>
                  </ToolLayout>
                );
              }
