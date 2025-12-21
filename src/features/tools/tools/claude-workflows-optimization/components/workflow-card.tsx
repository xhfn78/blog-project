import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { WorkflowDetail } from '../lib/workflow-data';
import { CommandBlock } from './command-block';

interface WorkflowCardProps {
  workflow: WorkflowDetail;
}

/**
 * 워크플로우 상세 가이드 카드 (Accordion 형식)
 *
 * 각 워크플로우의 단계, 명령어, 팁을 접고 펼칠 수 있습니다.
 */
export function WorkflowCard({ workflow }: WorkflowCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <CardTitle>{workflow.title}</CardTitle>
            <CardDescription>{workflow.description}</CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="ml-4"
          >
            {isExpanded ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </Button>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="space-y-6">
          {/* 단계 */}
          <div>
            <h4 className="font-semibold text-sm mb-3">📋 단계별 가이드</h4>
            <ol className="space-y-2 list-decimal list-inside">
              {workflow.steps.map((step, index) => (
                <li key={index} className="text-sm text-muted-foreground">
                  {step}
                </li>
              ))}
            </ol>
          </div>

          {/* 명령어 */}
          <div>
            <h4 className="font-semibold text-sm mb-3">💻 실행 명령어</h4>
            <div className="space-y-3">
              {workflow.commands.map((command, index) => (
                <CommandBlock key={index} command={command} />
              ))}
            </div>
          </div>

          {/* 팁 */}
          <div>
            <h4 className="font-semibold text-sm mb-3">💡 실전 팁</h4>
            <ul className="space-y-2 list-disc list-inside">
              {workflow.tips.map((tip, index) => (
                <li key={index} className="text-sm text-muted-foreground">
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
