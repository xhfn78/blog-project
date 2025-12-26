'use client';

import { ToolLayout, ToolSection } from '@/shared/ui/tool-layout';
import { useWorkflowState } from './hooks/use-workflow-state';
import { ChecklistItem } from './components/checklist-item';
import { ProgressIndicator } from './components/progress-indicator';
import { WorkflowCard } from './components/workflow-card';
import { CostCalculator } from './components/cost-calculator';
import { OptimizationTips } from './components/optimization-tips';
import { WORKFLOW_DETAILS } from './lib/workflow-data';
import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';
import { RotateCcw, Settings, Terminal } from 'lucide-react';
import Link from 'next/link';
import { config } from './tool.config';
import { SeoGuide } from './ui/seo-guide';

export default function ClaudeWorkflowsOptimizationToolPage() {
  const { checklistItems, toggleItem, resetAll, progress } = useWorkflowState();

  return (
    <ToolLayout config={config}>
      <ToolSection title="학습 진행률">
        <div className="space-y-4">
          <ProgressIndicator current={progress.completed} total={progress.total} />
          <div className="flex justify-end">
            <Button variant="outline" size="sm" onClick={resetAll}>
              <RotateCcw className="h-4 w-4 mr-2" /> 진행률 초기화
            </Button>
          </div>
        </div>
      </ToolSection>

      <ToolSection title="워크플로우 체크리스트">
        <div className="space-y-3">
          {checklistItems.map((item) => (
            <ChecklistItem key={item.id} item={item} onToggle={() => toggleItem(item.id)} />
          ))}
        </div>
      </ToolSection>

      <ToolSection title="Claude 가이드 시리즈">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Terminal className="h-5 w-5 mt-0.5 text-primary" />
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">1편: CLI 빠른 시작</h4>
                  <Link href="/tools/claude/quick-start-checklist">
                    <Button variant="outline" size="sm" className="mt-2">가이드 보기</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Settings className="h-5 w-5 mt-0.5 text-primary" />
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">2편: 설정 마스터</h4>
                  <Link href="/tools/claude/claude-config-master">
                    <Button variant="outline" size="sm" className="mt-2">가이드 보기</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </ToolSection>

      <ToolSection title="워크플로우 상세 가이드">
        <div className="space-y-4">
          {WORKFLOW_DETAILS.map((workflow) => (
            <WorkflowCard key={workflow.id} workflow={workflow} />
          ))}
        </div>
      </ToolSection>

      <ToolSection title="비용 계산기">
        <CostCalculator />
      </ToolSection>

      <ToolSection title="최적화 전략">
        <OptimizationTips />
      </ToolSection>

      <div className="my-12" />
      <SeoGuide />
    </ToolLayout>
  );
}
