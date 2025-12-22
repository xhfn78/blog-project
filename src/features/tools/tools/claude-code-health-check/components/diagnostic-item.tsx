import { Checkbox } from '@/shared/ui/checkbox';
import { Badge } from '@/shared/ui/badge';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { CommandBlock } from './command-block';
import { DiagnosticItem as DiagnosticItemType } from '../lib/diagnostic-data';
import { cn } from '@/shared/lib/cn';

interface DiagnosticItemProps {
  item: DiagnosticItemType;
  onToggle: () => void;
}

/**
 * 진단 아이템 컴포넌트
 *
 * 개별 진단 단계를 표시합니다. 체크박스, 제목, 설명, 명령어 블록, 성공 기준, 트러블슈팅 힌트를 포함합니다.
 */
export function DiagnosticItem({ item, onToggle }: DiagnosticItemProps) {
  return (
    <div
      className={cn(
        "border rounded-lg p-4 transition-opacity",
        item.isCompleted && "opacity-60"
      )}
    >
      <div className="flex items-start gap-3">
        <Checkbox
          checked={item.isCompleted}
          onCheckedChange={onToggle}
          className="mt-1"
        />

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h4
              className={cn(
                "font-semibold text-base",
                item.isCompleted && "line-through text-muted-foreground"
              )}
            >
              {item.title}
            </h4>
            {item.isOptional && (
              <Badge variant="outline" className="text-xs">
                선택
              </Badge>
            )}
          </div>

          <p className="text-sm text-muted-foreground mb-3">
            {item.description}
          </p>

          {/* 명령어 블록 */}
          {item.commands && item.commands.length > 0 && (
            <div className="space-y-2 mb-3">
              {item.commands.map((cmd, idx) => (
                <CommandBlock key={idx} command={cmd} />
              ))}
            </div>
          )}

          {/* 성공 기준 */}
          <div className="mb-2 p-3 bg-green-50 dark:bg-green-950/20 rounded-md border border-green-200 dark:border-green-900">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-semibold text-green-900 dark:text-green-100 mb-1">
                  성공 기준
                </p>
                <p className="text-xs text-green-700 dark:text-green-300">
                  {item.successCriteria}
                </p>
              </div>
            </div>
          </div>

          {/* 트러블슈팅 힌트 */}
          {item.troubleshooting && item.troubleshooting.length > 0 && (
            <div className="p-3 bg-amber-50 dark:bg-amber-950/20 rounded-md border border-amber-200 dark:border-amber-900">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-500 mt-0.5 shrink-0" />
                <div className="flex-1">
                  <p className="text-xs font-semibold text-amber-900 dark:text-amber-100 mb-2">
                    문제 해결 힌트
                  </p>
                  <ul className="space-y-1">
                    {item.troubleshooting.map((hint, idx) => (
                      <li key={idx} className="text-xs text-amber-700 dark:text-amber-300">
                        • {hint}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
