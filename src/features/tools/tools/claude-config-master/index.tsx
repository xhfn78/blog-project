'use client';

import { ToolLayout, ToolSection } from '@/shared/ui/tool-layout';
import { Button } from '@/shared/ui/button';
import { FileCode, FileText, FileX, Package } from 'lucide-react';
import { config } from './tool.config';
import { useConfigState } from './hooks/use-config-state';
import { ChecklistItem } from './components/checklist-item';
import { ProgressIndicator } from './components/progress-indicator';
import { TemplateCard } from './components/template-card';
import { ConfigExamples } from './components/config-examples';
import { BestPractices } from './components/best-practices';
import { TEMPLATES } from './lib/templates';
import { SeoGuide } from './ui/seo-guide';

export default function ClaudeConfigMasterToolPage() {
  const { checklistItems, toggleItem, resetAll, progress } = useConfigState();

  const handleDownloadAll = () => {
    Object.values(TEMPLATES).forEach((template, index) => {
      setTimeout(() => {
        const blob = new Blob([template.content], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = template.filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, index * 300);
    });
  };

  return (
    <ToolLayout config={config}>
      <ToolSection title="진행률">
        <ProgressIndicator current={progress.completed} total={progress.total} />
      </ToolSection>

      <ToolSection title="설정 단계">
        <div className="space-y-3">
          {checklistItems.map(item => (
            <ChecklistItem key={item.id} item={item} onToggle={() => toggleItem(item.id)} />
          ))}
        </div>
        <div className="mt-6 flex justify-end">
          <Button variant="outline" onClick={resetAll} className="text-sm">전체 초기화</Button>
        </div>
      </ToolSection>

      <ToolSection title="템플릿 다운로드">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <TemplateCard template={TEMPLATES.clauderc} icon={<FileCode className="h-5 w-5" />} />
          <TemplateCard template={TEMPLATES.claudeMd} icon={<FileText className="h-5 w-5" />} />
          <TemplateCard template={TEMPLATES.claudeignore} icon={<FileX className="h-5 w-5" />} />
        </div>
        <div className="mt-4">
          <Button onClick={handleDownloadAll} className="w-full" size="lg">
            <Package className="mr-2 h-4 w-4" /> 전체 템플릿 다운로드
          </Button>
        </div>
      </ToolSection>

      <ToolSection title="설정 예제">
        <ConfigExamples />
      </ToolSection>

      <ToolSection title="CLAUDE.md 가이드">
        <BestPractices />
      </ToolSection>

      <div className="my-12" />
      <SeoGuide />
    </ToolLayout>
  );
}