import { Checkbox } from '@/shared/ui/checkbox';
import { Badge } from '@/shared/ui/badge';
import { CommandBlock } from './command-block';
import { ChecklistItem as ChecklistItemType } from '../lib/checklist-data';
import { cn } from '@/shared/lib/cn';

interface ChecklistItemProps {
  item: ChecklistItemType;
  onToggle: () => void;
}

/**
 * 체크리스트 아이템 컴포넌트
 *
 * 개별 체크리스트 단계를 표시합니다. 체크박스, 제목, 설명, 명령어 블록을 포함합니다.
 */
export function ChecklistItem({ item, onToggle }: ChecklistItemProps) {
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

          {item.commands && item.commands.length > 0 && (
            <div className="space-y-2">
              {item.commands.map((cmd, idx) => (
                <CommandBlock key={idx} command={cmd} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
