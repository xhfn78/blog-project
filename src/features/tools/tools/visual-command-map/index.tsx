'use client';

import { useState, useMemo } from 'react';
import { ToolLayout, ToolSection } from '@/shared/ui/tool-layout';
import { Button } from '@/shared/ui/button';
import { Card, CardContent } from '@/shared/ui/card';
import { Badge } from '@/shared/ui/badge';
import { RotateCcw, Expand, Shrink } from 'lucide-react';
import { config } from './tool.config';
import { PHASES, getTotalCommands } from './lib/command-registry';
import { useCommandMap } from './lib/use-command-map';
import { PhaseTree } from './components/PhaseTree';
import { AddCommandModal } from './components/AddCommandModal';
import { SeoGuide } from './ui/seo-guide';

export default function VisualCommandMap() {
  const {
    expandedPhases,
    completedCommands,
    currentPhase,
    customCommands,
    isLoaded,
    togglePhase,
    expandAll,
    collapseAll,
    toggleCommand,
    setPhase,
    addCustomCommand,
    removeCustomCommand,
    resetProgress,
  } = useCommandMap();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPhaseId, setSelectedPhaseId] = useState<string | null>(null);

  const progress = useMemo(() => {
    const totalBuiltIn = getTotalCommands();
    const totalCustom = customCommands.length;
    const total = totalBuiltIn + totalCustom;
    const completed = completedCommands.length;

    return {
      total,
      completed,
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  }, [completedCommands.length, customCommands.length]);

  const phaseProgress = useMemo(() => {
    return PHASES.map((phase) => {
      const phaseCustom = customCommands.filter((c) => c.phaseId === phase.id);
      const total = phase.commands.length + phaseCustom.length;
      const completed = [...phase.commands, ...phaseCustom].filter((c) =>
        completedCommands.includes(c.id)
      ).length;
      return { id: phase.id, total, completed, isCompleted: total > 0 && completed === total };
    });
  }, [completedCommands, customCommands]);

  const completedPhases = phaseProgress.filter((p) => p.isCompleted).length;

  const handleAddCommand = (phaseId: string) => {
    setSelectedPhaseId(phaseId);
    setModalOpen(true);
  };

  const handleModalAdd = (phaseId: string, command: string, description: string) => {
    addCustomCommand(phaseId, command, description);
  };

  const handleExpandAll = () => {
    expandAll(PHASES.map((p) => p.id));
  };

  const handleCollapseAll = () => {
    collapseAll();
  };

  if (!isLoaded) {
    return (
      <ToolLayout config={config}>
        <div className="flex items-center justify-center py-12">
          <div className="text-muted-foreground">로딩 중...</div>
        </div>
      </ToolLayout>
    );
  }

  return (
    <ToolLayout config={config}>
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div className="space-y-1">
              <h3 className="font-medium">Next.js 풀스택 개발 워크플로우</h3>
              <p className="text-sm text-muted-foreground">
                {completedPhases}/{PHASES.length} 단계 완료
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleExpandAll}>
                <Expand className="h-4 w-4 mr-1" /> 펼치기
              </Button>
              <Button variant="outline" size="sm" onClick={handleCollapseAll}>
                <Shrink className="h-4 w-4 mr-1" /> 접기
              </Button>
              <Button variant="outline" size="sm" onClick={resetProgress}>
                <RotateCcw className="h-4 w-4 mr-1" /> 초기화
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">전체 진행률</span>
              <span className="font-medium">
                {progress.completed}/{progress.total} 명령어 ({progress.percentage}%)
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary transition-all duration-300" style={{ width: `${progress.percentage}%` }} />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {PHASES.map((phase, idx) => {
              const pp = phaseProgress.find((p) => p.id === phase.id);
              const isCurrent = currentPhase === phase.id;
              return (
                <Badge
                  key={phase.id}
                  variant={pp?.isCompleted ? 'default' : isCurrent ? 'secondary' : 'outline'}
                  className={`cursor-pointer transition-colors ${pp?.isCompleted ? 'bg-green-500 hover:bg-green-600' : ''}`}
                  onClick={() => { togglePhase(phase.id); setPhase(phase.id); }}
                >
                  {idx + 1}. {phase.name}
                </Badge>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <ToolSection title="개발 단계">
        <PhaseTree
          phases={PHASES}
          expandedPhases={expandedPhases}
          completedCommands={completedCommands}
          currentPhase={currentPhase}
          customCommands={customCommands}
          onTogglePhase={togglePhase}
          onToggleCommand={toggleCommand}
          onSetCurrentPhase={setPhase}
          onRemoveCustomCommand={removeCustomCommand}
          onAddCommand={handleAddCommand}
        />
      </ToolSection>

      <div className="my-12" />
      <SeoGuide />

      <AddCommandModal
        isOpen={modalOpen}
        phaseId={selectedPhaseId}
        onClose={() => { setModalOpen(false); setSelectedPhaseId(null); }}
        onAdd={handleModalAdd}
      />
    </ToolLayout>
  );
}