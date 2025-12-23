'use client';

import { useState } from 'react';
import {
  Check,
  Copy,
  Trash2,
  ChevronDown,
  ChevronRight,
  AlertTriangle,
  Lightbulb,
  Terminal,
  ExternalLink,
  BookOpen,
} from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Checkbox } from '@/shared/ui/checkbox';
import { Badge } from '@/shared/ui/badge';
import { useCopyToClipboard } from '@/shared/lib/hooks/use-copy-to-clipboard';
import { Command, CustomCommand } from '../lib/types';

interface CommandItemProps {
  command: Command | CustomCommand;
  isCompleted: boolean;
  isLast: boolean;
  onToggleComplete: (commandId: string) => void;
  onRemove?: (commandId: string) => void;
}

export function CommandItem({
  command,
  isCompleted,
  isLast,
  onToggleComplete,
  onRemove,
}: CommandItemProps) {
  const { status, copyToClipboard } = useCopyToClipboard();
  const [isExpanded, setIsExpanded] = useState(false);

  const isCustom = 'createdAt' in command;
  const hasDetails =
    !isCustom &&
    (command.detailedDescription ||
      command.tips ||
      command.expectedOutput ||
      command.warning ||
      command.example ||
      command.alternatives ||
      command.docsUrl);

  const handleCopy = () => {
    copyToClipboard(command.command);
  };

  return (
    <div className="group">
      <div className="flex items-start gap-2 py-2 pl-6">
        {/* 트리 라인 */}
        <span className="text-muted-foreground select-none shrink-0 w-4 font-mono">
          {isLast ? '└─' : '├─'}
        </span>

        {/* 체크박스 */}
        <Checkbox
          checked={isCompleted}
          onCheckedChange={() => onToggleComplete(command.id)}
          className="mt-1 shrink-0"
        />

        {/* 명령어 내용 */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            {/* 확장 버튼 */}
            {hasDetails && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
            )}

            {/* 명령어 텍스트 */}
            <code
              className={`text-sm font-mono px-2 py-1 rounded break-all cursor-pointer hover:bg-accent/80 transition-colors ${
                isCompleted
                  ? 'bg-muted text-muted-foreground line-through'
                  : 'bg-accent text-accent-foreground'
              }`}
              onClick={handleCopy}
              title="클릭하여 복사"
            >
              $ {command.command}
            </code>

            {/* 복사 상태 */}
            {status === 'copied' && (
              <span className="text-xs text-green-500 flex items-center gap-1">
                <Check className="h-3 w-3" />
                복사됨
              </span>
            )}

            {/* 필수 표시 */}
            {!isCustom && 'isRequired' in command && command.isRequired && (
              <Badge variant="outline" className="text-xs text-orange-500 border-orange-500/50">
                필수
              </Badge>
            )}

            {/* 커스텀 표시 */}
            {isCustom && (
              <Badge variant="outline" className="text-xs text-blue-500 border-blue-500/50">
                커스텀
              </Badge>
            )}
          </div>

          {/* 설명 */}
          <p className={`text-sm mt-1 ${isCompleted ? 'text-muted-foreground' : 'text-foreground/80'}`}>
            {command.description}
          </p>

          {/* 상세 정보 (확장 시) */}
          {hasDetails && isExpanded && !isCustom && (
            <div className="mt-3 space-y-3 text-sm border-l-2 border-muted pl-4 ml-1">
              {/* 상세 설명 */}
              {command.detailedDescription && (
                <div>
                  <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
                    <BookOpen className="h-3.5 w-3.5" />
                    <span className="font-medium">상세 설명</span>
                  </div>
                  <p className="text-foreground/80 leading-relaxed">
                    {command.detailedDescription}
                  </p>
                </div>
              )}

              {/* 예상 출력 */}
              {command.expectedOutput && (
                <div>
                  <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
                    <Terminal className="h-3.5 w-3.5" />
                    <span className="font-medium">예상 출력</span>
                  </div>
                  <pre className="bg-zinc-900 text-zinc-100 text-xs p-3 rounded-md overflow-x-auto whitespace-pre-wrap">
                    {command.expectedOutput}
                  </pre>
                </div>
              )}

              {/* 예시 */}
              {command.example && (
                <div>
                  <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
                    <Terminal className="h-3.5 w-3.5" />
                    <span className="font-medium">사용 예시</span>
                  </div>
                  <pre className="bg-zinc-900 text-zinc-100 text-xs p-3 rounded-md overflow-x-auto whitespace-pre-wrap">
                    {command.example}
                  </pre>
                </div>
              )}

              {/* 옵션/노트 */}
              {command.notes && command.notes.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
                    <BookOpen className="h-3.5 w-3.5" />
                    <span className="font-medium">옵션 설명</span>
                  </div>
                  <ul className="list-disc list-inside space-y-0.5 text-foreground/80">
                    {command.notes.map((note, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 팁 */}
              {command.tips && command.tips.length > 0 && (
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-md p-3">
                  <div className="flex items-center gap-1.5 text-blue-500 mb-1.5">
                    <Lightbulb className="h-3.5 w-3.5" />
                    <span className="font-medium">초보자 팁</span>
                  </div>
                  <ul className="list-disc list-inside space-y-0.5 text-foreground/80">
                    {command.tips.map((tip, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 주의사항 */}
              {command.warning && (
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-md p-3">
                  <div className="flex items-center gap-1.5 text-yellow-600 dark:text-yellow-500 mb-1">
                    <AlertTriangle className="h-3.5 w-3.5" />
                    <span className="font-medium">주의</span>
                  </div>
                  <p className="text-foreground/80">{command.warning}</p>
                </div>
              )}

              {/* 대안 */}
              {command.alternatives && command.alternatives.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
                    <span className="font-medium">대안</span>
                  </div>
                  <ul className="list-disc list-inside space-y-0.5 text-foreground/80">
                    {command.alternatives.map((alt, idx) => (
                      <li key={idx}>{alt}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 문서 링크 */}
              {command.docsUrl && (
                <a
                  href={command.docsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-primary hover:underline"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  공식 문서 보기
                </a>
              )}
            </div>
          )}
        </div>

        {/* 액션 버튼들 */}
        <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={handleCopy}
            title="복사"
          >
            {status === 'copied' ? (
              <Check className="h-3.5 w-3.5 text-green-500" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </Button>

          {isCustom && onRemove && (
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-destructive hover:text-destructive"
              onClick={() => onRemove(command.id)}
              title="삭제"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
