import { CopyButton } from '@/shared/ui/copy-button';

interface CommandBlockProps {
  command: string;
}

/**
 * 명령어 블록 컴포넌트
 *
 * 코드 블록 형태로 명령어를 표시하고 복사 버튼을 제공합니다.
 */
export function CommandBlock({ command }: CommandBlockProps) {
  return (
    <div className="relative">
      <pre className="bg-secondary p-3 rounded-md overflow-x-auto pr-12">
        <code className="text-sm font-mono">{command}</code>
      </pre>
      <div className="absolute top-2 right-2">
        <CopyButton text={command} />
      </div>
    </div>
  );
}
