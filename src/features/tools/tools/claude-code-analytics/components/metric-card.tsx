import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Badge } from '@/shared/ui/badge';
import { Clock, Wrench, Coins, TrendingUp, AlertTriangle, Database, LucideIcon } from 'lucide-react';
import { MetricDefinition } from '../lib/metrics-data';
import { cn } from '@/shared/lib/cn';

interface MetricCardProps {
  metric: MetricDefinition;
}

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  Clock,
  Wrench,
  Coins,
  TrendingUp,
  AlertTriangle,
  Database,
};

/**
 * 메트릭 카드 컴포넌트
 *
 * 개별 메트릭 정보를 카드 형태로 표시합니다.
 */
export function MetricCard({ metric }: MetricCardProps) {
  const Icon = iconMap[metric.icon] || Clock;

  const importanceColors = {
    high: 'border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/20',
    medium: 'border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/20',
    low: 'border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/20',
  };

  const importanceLabels = {
    high: '높음',
    medium: '중간',
    low: '낮음',
  };

  return (
    <Card className={cn("border-2", importanceColors[metric.importance])}>
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <CardTitle className="text-base">{metric.name}</CardTitle>
              <Badge variant={metric.importance === 'high' ? 'destructive' : 'secondary'} className="text-xs">
                중요도: {importanceLabels[metric.importance]}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {metric.description}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              <strong>단위:</strong> {metric.unit}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 pt-0">
        {/* 해석 가이드 */}
        <div className="space-y-2">
          <h5 className="text-xs font-semibold uppercase text-muted-foreground">해석 가이드</h5>

          <div className="p-2 rounded-md bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900">
            <p className="text-xs text-green-700 dark:text-green-300">
              ✓ {metric.interpretation.good}
            </p>
          </div>

          <div className="p-2 rounded-md bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900">
            <p className="text-xs text-amber-700 dark:text-amber-300">
              ⚠ {metric.interpretation.warning}
            </p>
          </div>

          <div className="p-2 rounded-md bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900">
            <p className="text-xs text-red-700 dark:text-red-300">
              ✕ {metric.interpretation.critical}
            </p>
          </div>
        </div>

        {/* 확인 방법 */}
        <div>
          <h5 className="text-xs font-semibold uppercase text-muted-foreground mb-2">확인 방법</h5>
          <ul className="space-y-1">
            {metric.howToView.map((method, idx) => (
              <li key={idx} className="text-xs text-muted-foreground">
                • {method}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
