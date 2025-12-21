import { Badge } from '@/shared/ui/badge';

interface ProgressIndicatorProps {
  current: number;
  total: number;
}

/**
 * 진행률 표시 컴포넌트
 *
 * 완료된 단계 수와 프로그레스 바를 표시합니다.
 */
export function ProgressIndicator({ current, total }: ProgressIndicatorProps) {
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">완료된 단계</span>
          <Badge variant="secondary" className="text-base font-semibold">
            {current} / {total}
          </Badge>
        </div>
        <span className="text-sm text-muted-foreground">
          {percentage}%
        </span>
      </div>

      {/* 프로그레스 바 */}
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* 100% 완료 시 축하 메시지 */}
      {percentage === 100 && (
        <div className="pt-2">
          <p className="text-sm font-semibold text-green-600 dark:text-green-500">
            🎉 축하합니다! 모든 단계를 완료했습니다!
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            이제 Claude Code CLI를 자유롭게 사용할 수 있습니다.
          </p>
        </div>
      )}
    </div>
  );
}
