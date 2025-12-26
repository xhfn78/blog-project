'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ToolLayout, ToolSection } from "@/shared/ui/tool-layout";
import { config } from "./tool.config";
import { Textarea } from "@/shared/ui/textarea";
import { Button } from "@/shared/ui/button";
import { Label } from "@/shared/ui/label";
import CanvasRenderer from './canvas-renderer';
import { Typography } from "@/shared/ui/typography";
import { SeoGuide } from "./ui/seo-guide";
import { 
  Download, Copy, Trash2, Plus, 
  Palette, Type, Minus, Square, 
  ChevronUp, ChevronDown, 
  AlignLeft, AlignCenter, AlignRight,
  MousePointer2, Settings2,
  Undo2, LayoutTemplate, Image
} from "lucide-react";
import { ObjectType, VibeObject, DesignConfig } from "./lib/types";

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

  const moveLayer = (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === objects.length - 1)) return;
    const newObjects = [...objects];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newObjects[index], newObjects[targetIndex]] = [newObjects[targetIndex], newObjects[index]];
    setObjects(newObjects);
    setSelectedIndex(targetIndex);
  };

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        
        {/* 🛠 상단 툴바 */}
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

          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="bg-gray-100 dark:bg-gray-950 rounded-[2.5rem] p-8 border-[12px] border-white dark:border-gray-800 shadow-2xl min-h-[600px] flex items-start justify-center overflow-y-auto max-h-[800px] scrollbar-hide">
              <CanvasRenderer objects={objects} config={canvasConfig} selectedIndex={selectedIndex} />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleDownloadPng} className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold shadow-lg">
                <Image className="w-5 h-5 mr-2" /> 고해상도 이미지 저장
              </Button>
              <Button variant="outline" onClick={async () => { await navigator.clipboard.writeText(shareLink); alert('공유 링크가 복사되었습니다!'); }} className="h-12 w-12 rounded-2xl p-0">
                <Copy className="w-5 h-5" />
              </Button>
            </div>
          </div>

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
                  </div>
                </div>
              ) : (
                <div className="text-center py-20 text-gray-400 text-xs italic">
                  레이아웃을 선택하세요.
                </div>
              )}
            </div>
          </div>
        </div>

        <SeoGuide />
      </div>
    </ToolLayout>
  );
}