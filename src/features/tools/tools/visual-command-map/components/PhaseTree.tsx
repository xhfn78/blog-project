'use client';

import { ChevronDown, ChevronRight, FolderOpen, Plus, Check, Circle } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Badge } from '@/shared/ui/badge';
import { Phase, CustomCommand } from '../lib/types';
import { CommandItem } from './CommandItem';

interface PhaseTreeProps {
  phases: Phase[];
  expandedPhases: string[];
  completedCommands: string[];
  currentPhase: string;
  customCommands: CustomCommand[];
  onTogglePhase: (phaseId: string) => void;
  onToggleCommand: (commandId: string) => void;
  onSetCurrentPhase: (phaseId: string) => void;
  onRemoveCustomCommand: (commandId: string) => void;
  onAddCommand: (phaseId: string) => void;
}

export function PhaseTree({
  phases,
  expandedPhases,
  completedCommands,
  currentPhase,
  customCommands,
  onTogglePhase,
  onToggleCommand,
  onSetCurrentPhase,
  onRemoveCustomCommand,
  onAddCommand,
}: PhaseTreeProps) {
  // 단계별 완료 상태 계산
  const getPhaseStatus = (phase: Phase) => {
    const phaseCustomCommands = customCommands.filter((cmd) => cmd.phaseId === phase.id);
    const allCommands = [...phase.commands.map((c) => c.id), ...phaseCustomCommands.map((c) => c.id)];
    const completedCount = allCommands.filter((id) => completedCommands.includes(id)).length;

    return {
      total: allCommands.length,
      completed: completedCount,
      isCompleted: completedCount === allCommands.length && allCommands.length > 0,
    };
  };

  // 아이콘 매핑
  const iconMap: Record<string, React.ReactNode> = {
    FolderOpen: <FolderOpen className="h-4 w-4" />,
    Database: <LucideIcons.Database className="h-4 w-4" />,
    Server: <LucideIcons.Server className="h-4 w-4" />,
    Layout: <LucideIcons.Layout className="h-4 w-4" />,
    TestTube2: <LucideIcons.TestTube2 className="h-4 w-4" />,
    Rocket: <LucideIcons.Rocket className="h-4 w-4" />,
  };

  const renderIcon = (iconName: string) => {
    return iconMap[iconName] || <FolderOpen className="h-4 w-4" />;
  };

  return (
    <div className="space-y-1 font-mono text-sm">
      {phases.map((phase, phaseIndex) => {
        const isExpanded = expandedPhases.includes(phase.id);
        const isCurrent = currentPhase === phase.id;
        const status = getPhaseStatus(phase);
        const phaseCustomCommands = customCommands.filter((cmd) => cmd.phaseId === phase.id);
        const allPhaseCommands = [...phase.commands, ...phaseCustomCommands];

        return (
          <div key={phase.id} className="select-none">
            {/* 단계 헤더 */}
            <div
              className={`flex items-center gap-2 py-2 px-3 rounded-md cursor-pointer transition-colors ${
                isCurrent
                  ? 'bg-primary/10 border border-primary/30'
                  : 'hover:bg-muted'
              }`}
              onClick={() => {
                onTogglePhase(phase.id);
                onSetCurrentPhase(phase.id);
              }}
            >
              {/* 펼침/접기 아이콘 */}
              <span className="text-muted-foreground">
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </span>

              {/* 단계 아이콘 */}
              <span className={status.isCompleted ? 'text-green-500' : 'text-primary'}>
                {renderIcon(phase.icon)}
              </span>

              {/* 단계 번호 */}
              <span className="text-muted-foreground text-xs">
                {phaseIndex + 1}.
              </span>

              {/* 단계 이름 */}
              <span className={`font-medium ${status.isCompleted ? 'text-green-600' : ''}`}>
                {phase.name}
              </span>

              {/* 명령어 카운트 */}
              <Badge variant="secondary" className="text-xs ml-1">
                {status.completed}/{status.total}
              </Badge>

              {/* 완료 상태 */}
              {status.isCompleted && (
                <Check className="h-4 w-4 text-green-500 ml-1" />
              )}

              {/* 현재 단계 표시 */}
              {isCurrent && !status.isCompleted && (
                <Circle className="h-3 w-3 fill-blue-500 text-blue-500 ml-1" />
              )}

              {/* 명령어 추가 버튼 */}
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 ml-auto opacity-0 group-hover:opacity-100 hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation();
                  onAddCommand(phase.id);
                }}
                title="명령어 추가"
              >
                <Plus className="h-3.5 w-3.5" />
              </Button>
            </div>

            {/* 명령어 목록 */}
            {isExpanded && (
              <div className="ml-2 border-l-2 border-muted pl-2 mt-1">
                {/* 단계 설명 */}
                <p className="text-xs text-muted-foreground py-1 pl-6">
                  {phase.description}
                </p>

                {/* 기본 명령어 + 커스텀 명령어 */}
                {allPhaseCommands.map((command, cmdIndex) => (
                  <CommandItem
                    key={command.id}
                    command={command}
                    isCompleted={completedCommands.includes(command.id)}
                    isLast={cmdIndex === allPhaseCommands.length - 1}
                    onToggleComplete={onToggleCommand}
                    onRemove={'createdAt' in command ? onRemoveCustomCommand : undefined}
                  />
                ))}

                {/* 명령어 추가 링크 */}
                <button
                  className="flex items-center gap-2 py-1.5 pl-6 text-xs text-muted-foreground hover:text-foreground transition-colors w-full"
                  onClick={() => onAddCommand(phase.id)}
                >
                  <span className="w-4">└─</span>
                  <Plus className="h-3 w-3" />
                  <span>명령어 추가...</span>
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
