'use client';

import React, { useRef, useEffect, useCallback } from 'react';
import { DesignConfig, VibeObject } from './lib/types';
import { drawRoundedRect } from './lib/utils';

interface CanvasRendererProps {
  objects: VibeObject[];
  config: DesignConfig;
  selectedIndex: number | null;
}

const CanvasRenderer: React.FC<CanvasRendererProps> = ({ objects, config, selectedIndex }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const render = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    await document.fonts.ready;

    const dpr = window.devicePixelRatio || 1;
    const displayWidth = canvas.offsetWidth || 800;
    
    // 초기 렌더링 설정
    canvas.width = displayWidth * dpr;
    ctx.scale(dpr, dpr);

    const padding = config.globalPadding;
    let currentY = padding;
    const contentWidth = displayWidth - (padding * 2);

    // 1차 패스: 개별 객체 높이 및 레이아웃 계산
    const drawData = objects.map((obj, i) => {
      const style = obj.style;
      const fs = style.fontSize || (obj.type === 'title' ? 32 : 18);
      ctx.font = `${style.fontWeight || 'normal'} ${fs}px "Pretendard Variable", Pretendard, sans-serif`;
      
      const lines = getWrappedLines(ctx, obj.content, contentWidth - (style.padding || 0) * 2);
      const lineHeight = fs * 1.5;
      const textHeight = lines.length * lineHeight;
      const totalItemHeight = textHeight + (style.padding || 0) * 2 + (obj.type === 'divider' ? 20 : 10);

      return { obj, lines, totalItemHeight, lineHeight, fs };
    });

    const finalHeight = drawData.reduce((acc, curr) => acc + curr.totalItemHeight + 15, padding * 2);
    canvas.height = finalHeight * dpr;
    ctx.scale(dpr, dpr);

    // 배경 채우기
    ctx.fillStyle = config.backgroundColor;
    ctx.fillRect(0, 0, displayWidth, finalHeight);

    // 2차 패스: 객체별 그리기
    drawData.forEach(({ obj, lines, totalItemHeight, lineHeight, fs }, i) => {
      const style = obj.style;
      const x = padding;
      const y = currentY;

      // 선택 표시 (에디터 전용)
      if (selectedIndex === i) {
        ctx.strokeStyle = style.accentColor || '#3B82F6';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.strokeRect(x - 5, y - 5, contentWidth + 10, totalItemHeight + 10);
        ctx.setLineDash([]);
      }

      // 타입별 드로잉
      ctx.globalAlpha = style.opacity ?? 1;
      
      if (obj.type === 'shape') {
        drawRoundedRect(ctx, x, y, contentWidth, totalItemHeight, style.borderRadius || 8, style.accentColor || '#CBD5E0', `rgba(0,0,0,${(style.shadow || 0) / 10})`);
      }

      if (obj.type === 'divider') {
        ctx.beginPath();
        ctx.moveTo(x, y + totalItemHeight/2);
        ctx.lineTo(x + contentWidth, y + totalItemHeight/2);
        ctx.strokeStyle = style.accentColor || '#E2E8F0';
        ctx.lineWidth = style.borderWidth || 2;
        ctx.stroke();
      } else {
        // 텍스트 그리기
        ctx.fillStyle = style.color || '#000000';
        ctx.font = `${style.fontWeight || 'normal'} ${fs}px "Pretendard Variable", Pretendard, sans-serif`;
        ctx.textAlign = style.textAlign || 'left';
        ctx.textBaseline = 'top';

        const renderX = style.textAlign === 'center' ? displayWidth / 2 : (style.textAlign === 'right' ? x + contentWidth : x + (style.padding || 0));
        
        lines.forEach((line, li) => {
          ctx.fillText(line, renderX, y + (style.padding || 0) + (li * lineHeight));
        });
      }

      ctx.globalAlpha = 1.0;
      currentY += totalItemHeight + 15;
    });

  }, [objects, config, selectedIndex]);

  function getWrappedLines(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
    const chars = text.split('');
    const lines: string[] = [];
    let currentLine = '';
    for (let i = 0; i < chars.length; i++) {
      const testLine = currentLine + chars[i];
      if (ctx.measureText(testLine).width > maxWidth && i > 0) {
        lines.push(currentLine); currentLine = chars[i];
      } else {
        currentLine = testLine;
      }
    }
    lines.push(currentLine);
    return lines;
  }

  useEffect(() => { render(); }, [render]);
  useEffect(() => {
    const observer = new ResizeObserver(() => render());
    if (canvasRef.current) observer.observe(canvasRef.current);
    return () => observer.disconnect();
  }, [render]);

  return <canvas ref={canvasRef} style={{ width: '100%', height: 'auto', display: 'block' }} />;
};

export default CanvasRenderer;