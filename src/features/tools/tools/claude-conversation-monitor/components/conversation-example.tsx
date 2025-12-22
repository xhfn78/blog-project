import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Badge } from '@/shared/ui/badge';
import { MessageSquare, User, Bot, Lightbulb, Wrench } from 'lucide-react';
import { ConversationExample } from '../lib/conversation-examples';

interface ConversationExampleProps {
  example: ConversationExample;
}

export function ConversationExampleCard({ example }: ConversationExampleProps) {
  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          {example.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* 사용자 프롬프트 */}
        <div className="p-3 rounded-md bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900">
          <div className="flex items-start gap-2 mb-2">
            <User className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5" />
            <span className="text-xs font-semibold text-blue-900 dark:text-blue-100">사용자</span>
          </div>
          <p className="text-sm text-blue-700 dark:text-blue-300">{example.userPrompt}</p>
        </div>

        {/* Claude 응답 */}
        <div className="p-3 rounded-md bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900">
          <div className="flex items-start gap-2 mb-2">
            <Bot className="h-4 w-4 text-purple-600 dark:text-purple-400 mt-0.5" />
            <span className="text-xs font-semibold text-purple-900 dark:text-purple-100">Claude</span>
          </div>
          <p className="text-sm text-purple-700 dark:text-purple-300">{example.claudeResponse}</p>
        </div>

        {/* 추론 단계 */}
        <div>
          <h5 className="text-xs font-semibold uppercase text-muted-foreground mb-2">추론 단계</h5>
          <div className="space-y-1">
            {example.reasoningSteps.map((step, idx) => (
              <div key={idx} className="text-xs text-muted-foreground pl-4 border-l-2 border-primary/30 py-1">
                {step}
              </div>
            ))}
          </div>
        </div>

        {/* 사용된 도구 */}
        <div>
          <h5 className="text-xs font-semibold uppercase text-muted-foreground mb-2 flex items-center gap-1">
            <Wrench className="h-3 w-3" />
            사용된 도구
          </h5>
          <div className="flex flex-wrap gap-1">
            {example.toolsUsed.map((tool, idx) => (
              <Badge key={idx} variant="secondary" className="text-xs">
                {tool}
              </Badge>
            ))}
          </div>
        </div>

        {/* 인사이트 */}
        <div>
          <h5 className="text-xs font-semibold uppercase text-muted-foreground mb-2 flex items-center gap-1">
            <Lightbulb className="h-3 w-3" />
            핵심 인사이트
          </h5>
          <ul className="space-y-1">
            {example.insights.map((insight, idx) => (
              <li key={idx} className="text-xs text-muted-foreground">
                • {insight}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
