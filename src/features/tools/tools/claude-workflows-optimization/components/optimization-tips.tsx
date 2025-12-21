import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { Lightbulb, Target, Zap, Shield } from 'lucide-react';

/**
 * 비용 최적화 전략 컴포넌트
 *
 * 토큰 사용량을 줄이고 효율적으로 Claude Code를 사용하는 팁을 제공합니다.
 */
export function OptimizationTips() {
  const tips = [
    {
      icon: <Target className="h-5 w-5" />,
      title: '토큰 모니터링',
      description: '각 요청의 토큰 사용량을 확인하고 패턴을 분석하세요.',
      items: [
        'Claude Code CLI는 자동으로 토큰 사용량을 표시합니다',
        '큰 파일은 필요한 부분만 컨텍스트에 포함하세요',
        '.claudeignore로 불필요한 파일을 제외하세요',
      ],
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: '스마트 컨텍스트 관리',
      description: '효율적인 컨텍스트 관리로 토큰 낭비를 줄이세요.',
      items: [
        '명확하고 구체적인 질문으로 불필요한 반복을 줄이세요',
        '긴 대화는 새 세션으로 시작하여 컨텍스트를 리셋하세요',
        'CLAUDE.md를 활용하여 반복적인 설명을 줄이세요',
      ],
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: '모델 선택 가이드',
      description: '작업에 맞는 모델을 선택하여 비용을 최적화하세요.',
      items: [
        'Haiku: 간단한 코드 리뷰, 문법 수정, 포매팅',
        'Sonnet: 일반적인 개발 작업, 버그 수정, 리팩토링',
        'Opus: 복잡한 아키텍처 설계, 대규모 코드 분석',
      ],
    },
    {
      icon: <Lightbulb className="h-5 w-5" />,
      title: '캐싱 전략',
      description: 'Claude의 캐싱 기능을 활용하여 반복 비용을 절감하세요.',
      items: [
        '프로젝트 구조와 설정은 자주 변하지 않으므로 캐싱 효과가 큽니다',
        '자주 참조하는 파일은 CLAUDE.md에 명시하세요',
        '반복적인 작업은 Skills로 만들어 재사용하세요',
      ],
    },
  ];

  return (
    <div className="space-y-4">
      {tips.map((tip, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {tip.icon}
              {tip.title}
            </CardTitle>
            <CardDescription>{tip.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 list-disc list-inside">
              {tip.items.map((item, itemIndex) => (
                <li key={itemIndex} className="text-sm text-muted-foreground">
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
