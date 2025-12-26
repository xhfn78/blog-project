'use client';

import { ToolLayout, ToolSection } from '@/shared/ui/tool-layout';
import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';
import { Settings, Zap } from 'lucide-react';
import Link from 'next/link';
import { config } from './tool.config';
import { useChecklistState } from './hooks/use-checklist-state';
import { ChecklistItem } from './components/checklist-item';
import { ProgressIndicator } from './components/progress-indicator';
import { TroubleshootingSection } from './components/troubleshooting-section';
import { SeoGuide } from './ui/seo-guide';

export default function QuickStartChecklistToolPage() {
  const { checklistItems, toggleItem, resetAll, progress } = useChecklistState();

  return (
    <ToolLayout config={config}>
      {/* 진행률 섹션 */}
      <ToolSection title="진행률">
        <ProgressIndicator current={progress.completed} total={progress.total} />
      </ToolSection>

      {/* 체크리스트 섹션 */}
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

      {/* 트러블슈팅 섹션 */}
      <ToolSection title="트러블슈팅 & FAQ">
        <TroubleshootingSection />
      </ToolSection>

      {/* 시리즈 네비게이션 */}
      <ToolSection title="Claude Code 가이드 시리즈">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Settings className="h-5 w-5 mt-0.5 text-primary" />
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">2편: 설정 마스터 가이드</h4>
                  <Link href="/tools/claude/claude-config-master">
                    <Button variant="outline" size="sm" className="mt-2">가이드 보기</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Zap className="h-5 w-5 mt-0.5 text-primary" />
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">3편: 실전 워크플로우</h4>
                  <Link href="/tools/claude/claude-workflows-optimization">
                    <Button variant="outline" size="sm" className="mt-2">가이드 보기</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </ToolSection>

      <div className="my-8" />
      <SeoGuide />
    </ToolLayout>
  );
}